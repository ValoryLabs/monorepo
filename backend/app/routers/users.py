from fastapi import Cookie, APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, ExpiredSignatureError, jwt
import logging

from app.config import settings
from app.dao.users import UsersDAO
from app.dao.overlays import OverlaysDAO
from app.database import get_session
from app.models.users import User

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
            detail="Token is missing in cookies"
        )
    else:
        token = str(token)

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except ExpiredSignatureError:
        logger.warning("JWT token has expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="JWT token has expired"
        )
    except JWTError as e:
        logger.warning(f"JWT decode error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="JWT decode error"
        )

    user_id: str | None = payload.get("sub")
    if user_id is None:
        logger.warning("Token payload does not contain 'sub' field")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload does not contain 'sub' field"
        )

    user_db = await UsersDAO.find_by_id(session, int(user_id))
    if user_db is None:
        logger.warning(f"User with id {user_id} not found in database")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user_db

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
