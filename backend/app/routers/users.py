import logging
from typing import Optional

from fastapi import APIRouter, Cookie, Depends, HTTPException, status
from jose import ExpiredSignatureError, JWTError, jwt
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.dao.overlays import OverlaysDAO
from app.dao.users import UsersDAO
from app.db.database import get_session
from app.models.users import User

router = APIRouter()

logger = logging.getLogger(__name__)

class HdevApiKeyRequest(BaseModel):
    hdev_api_key: str

class RiotIDRequest(BaseModel):
    riot_id: str

class OverlaySettingsRequest(BaseModel):
    overlayStyle: Optional[str] = None
    backgroundColor: Optional[str] = None
    disabledBackground: Optional[bool] = None
    disabledBorder: Optional[bool] = None
    disabledBackgroundGradient: Optional[bool] = None
    disabledGlowEffect: Optional[bool] = None
    disabledPeakRankIcon: Optional[bool] = None
    disabledLeaderboardPlace: Optional[bool] = None
    disabledPeakRR: Optional[bool] = None
    textColor: Optional[str] = None
    primaryTextColor: Optional[str] = None
    overlayFont: Optional[str] = None
    winColor: Optional[str] = None
    loseColor: Optional[str] = None
    disabledWinLose: Optional[bool] = None
    disabledLastMatchPoints: Optional[bool] = None
    disabledProgress: Optional[bool] = None
    progressColor: Optional[str] = None
    progressBgColor: Optional[str] = None

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
        "broadcaster_type": current_user.broadcaster_type,
        "twitch_display_name": current_user.twitch_display_name,
        "username": current_user.username,
        "avatar_url": current_user.avatar_url,
        "overlay_id": overlay.id
    }

@router.post("/me/riotid", summary="Установить Riot ID")
async def set_riot_id(
        request: RiotIDRequest,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_session)
):
    if not request.riot_id:
        logger.warning("Riot ID is empty")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Riot ID is empty"
        )

    set_riot_id = await UsersDAO.set_riot_id(session, current_user.id, request.riot_id)
    if set_riot_id:
        return {"message": "Riot ID set successfully"}
    else:
        logger.warning("Failed to set Riot ID")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to set Riot ID. User not  found"
        )

@router.post("/me/hdev_api_key", summary="Установить HDEV API key")
async def set_hdev_api_key(
        request: HdevApiKeyRequest,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_session)
):
    if not request.hdev_api_key:
        logger.warning("HDEV API key is empty")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="HDEV API key is empty"
        )

    set_hdev_api_key = await UsersDAO.set_hdev_api_key(session, current_user.id, request.hdev_api_key)
    if set_hdev_api_key:
        return {"message": "HDEV API key set successfully"}
    else:
        logger.warning("Failed to set HDEV API key")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to set HDEV API key. User not found"
        )

@router.post("/me/overlay", summary="Сохранить настройки оверлея")
async def save_overlay_settings(
        request: OverlaySettingsRequest,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_session)
):
    try:
        settings_data = request.dict(exclude_none=True)

        if not settings_data:
            logger.warning("No overlay settings provided")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No overlay settings provided"
            )

        saved_settings = await OverlaysDAO.save_overlay_settings(
            session,
            current_user.id,
            settings_data
        )

        if saved_settings:
            logger.info(f"Overlay settings saved for user {current_user.id}")
            return {
                "message": "Overlay settings saved successfully",
                "settings": saved_settings
            }
        else:
            logger.warning(f"Failed to save overlay settings for user {current_user.id}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save overlay settings. User not found"
            )

    except Exception as e:
        logger.error(f"Error saving overlay settings: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while saving overlay settings"
        )
