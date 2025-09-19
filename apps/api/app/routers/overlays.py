import uuid

from fastapi import APIRouter, Depends, HTTPException
from redis.asyncio.client import Redis
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.dao.overlays import OverlaysDAO
from app.dao.users import UsersDAO
from app.db.database import get_session
from app.db.redis import get_redis
from app.models.overlays import Overlay
from app.schemas.overlays import SOverlayResponse, SOverlay

router = APIRouter()


@router.get("/{overlay_id}", response_model=SOverlayResponse)
async def get_overlay(
        overlay_id: uuid.UUID,
        session: AsyncSession = Depends(get_session),
        cache: Redis = Depends(get_redis)
) -> SOverlayResponse:
    """
    Retrieves a specific overlay by its ID.
    """
    overlay = await OverlaysDAO.get_overlay_by_id(session, cache, overlay_id)

    if not overlay:
        raise HTTPException(status_code=404, detail="Overlay not found")

    user = await UsersDAO.find_by_id(session, cache, overlay.user_id)

    overlay_data = {
        **{field: getattr(overlay, field) for field in SOverlay.model_fields.keys()},
        "id": overlay.id,
        "riot_id": user.riot_id if user else None,
        "hdev_api_key": user.hdev_api_key if user else None
    }

    return SOverlayResponse(**overlay_data)

