from sqlalchemy import select

from app.dao.base import BaseDAO
from app.models.overlays import Overlay


class OverlaysDAO(BaseDAO):
    model = Overlay

    @classmethod
    async def find_by_user_id(cls, session, user_id):
        query = select(cls.model).filter_by(user_id=user_id)
        result = await session.execute(query)
        return result.scalars().one_or_none()
