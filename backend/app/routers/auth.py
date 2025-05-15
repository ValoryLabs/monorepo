import random
import string
from urllib.parse import urlencode

import aiohttp
from fastapi import Cookie, APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, ExpiredSignatureError, jwt
import logging

from app.config import settings
from app.dao.users import UsersDAO
from app.dao.overlays import OverlaysDAO
from app.database import get_session
from app.models.users import User
from app.utils.auth import authenticate_user, create_access_token

router = APIRouter()

logger = logging.getLogger(__name__)

async def get_current_user(
        token: str | None = Cookie(default=None, alias="Authorization"),
        session: AsyncSession = Depends(get_session)
) -> User:
    if not token:
        logger.warning("Token is missing in cookies")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Токен отсутствует в cookies"
        )
    else:
        token = str(token)

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except ExpiredSignatureError:
        logger.warning("JWT token has expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Срок действия токена истёк"
        )
    except JWTError as e:
        logger.warning(f"JWT decode error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Ошибка декодирования токена"
        )

    user_id: str | None = payload.get("sub")
    if user_id is None:
        logger.warning("Token payload does not contain 'sub' field")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="В токене отсутствует идентификатор пользователя ('sub')"
        )

    user_db = await UsersDAO.find_by_id(session, int(user_id))
    if user_db is None:
        logger.warning(f"User with id {user_id} not found in database")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден"
        )

    return user_db


async def generate_random_string(length: int) -> str:
    """
    Generates a random alphanumeric string of the given length.
    """
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))


async def make_request(
    method: str, url: str, headers: dict | None = None, data: dict | None = None
) -> dict:
    """
    Sends an asynchronous HTTP request.
    """
    async with aiohttp.ClientSession() as session:
        async with session.request(method, url, headers=headers, data=data) as response:
            if response.status != 200:
                raise HTTPException(
                    status_code=response.status, detail=f"Failed request to {url}"
                )
            return await response.json()


async def fetch_user_info(access_token: str) -> dict | None:
    """
    Fetches Twitch user information using the provided access token.
    """
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Client-Id": settings.TWITCH_CLIENT_ID,
    }
    data = await make_request(
        "GET", "https://api.twitch.tv/helix/users", headers=headers
    )
    return data.get("data", [{}])[0] if data.get("data") else None


async def fetch_twitch_token(code: str) -> dict:
    """
    Fetches an OAuth2 token from the Twitch API.
    """
    token_data = {
        "client_id": settings.TWITCH_CLIENT_ID,
        "client_secret": settings.TWITCH_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": settings.REDIRECT_URI,
    }

    return await make_request("POST", "https://id.twitch.tv/oauth2/token", data=token_data)


@router.get("/login/twitch", summary="Initiate Twitch OAuth login")
async def twitch_login() -> RedirectResponse:
    """
    Redirects the user to the Twitch authorization page with a generated state parameter.
    """
    state = await generate_random_string(16)
    query_params = {
        "response_type": "code",
        "client_id": settings.TWITCH_CLIENT_ID,
        "redirect_uri": settings.REDIRECT_URI,
        "state": state,
    }
    response = RedirectResponse(
        url=f"https://id.twitch.tv/oauth2/authorize?{urlencode(query_params)}"
    )
    response.set_cookie("twitch_state", state)
    return response


@router.get("/callback", summary="Handle Twitch OAuth callback", response_model=None)
async def callback(request: Request, session: AsyncSession = Depends(get_session)) -> HTTPException | RedirectResponse:
    """
    Handles the Twitch OAuth callback, exchanges code for tokens, fetches user info, and stores it.
    """
    code, state = request.query_params.get("code"), request.query_params.get("state")
    if not code or state != request.cookies.get("twitch_state"):
        print('Error')
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    api_response = await fetch_twitch_token(code)
    user_info = await fetch_user_info(api_response.get("access_token"))

    user = await authenticate_user(session, user_info)

    if not user:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    access_token = await create_access_token({"sub": str(user.id)})

    response = RedirectResponse(url=settings.APP_FRONTEND_URL + "/callback")
    response.set_cookie(
        "Authorization",
        value=access_token,
        max_age=1800,
        expires=1800,
        samesite="lax",
        secure=not settings.DEBUG,
    )
    response.delete_cookie("twitch_state")
    return response

@router.get("/me", summary="Получить информацию о текущем пользователе")
async def read_users_me(current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    overlay = await OverlaysDAO.find_by_user_id(session, int(current_user.id))

    return {
        "id": current_user.id,
        "twitch_id": current_user.twitch_id,
        "twitch_display_name": current_user.twitch_display_name,
        "username": current_user.username,
        "avatar_url": current_user.avatar_url,
        "overlay_id": overlay.id
    }
