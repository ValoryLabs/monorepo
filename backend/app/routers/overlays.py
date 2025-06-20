import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.database import get_session
from app.models.overlays import Overlay
from app.schemas.overlays import SOverlayResponse

router = APIRouter()


@router.get("/{overlay_id}", response_model=SOverlayResponse)
async def get_overlay(
    overlay_id: uuid.UUID, session: AsyncSession = Depends(get_session)
) -> Overlay:
    """
    Retrieves a specific overlay by its ID.

    This endpoint returns the details of a single overlay, identified by the provided overlay ID.

    :param overlay_id: UUID of the overlay to retrieve.
    :param session: AsyncSession dependency for database operations.
    :return: The overlay (OverlayResponse schema).
    :raises HTTPException: If the overlay is not found.
    """
    statement = select(Overlay).where(Overlay.id == overlay_id)
    result = await session.execute(statement)
    overlay = result.scalars().first()

    if not overlay:
        raise HTTPException(status_code=404, detail="Overlay not found")
    return overlay
