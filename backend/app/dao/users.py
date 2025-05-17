from sqlalchemy import select

from app.dao.base import BaseDAO
from app.models.users import User


class UsersDAO(BaseDAO):
    model = User

    @classmethod
    async def find_by_twitch_id(cls, session, twitch_id):
        query = select(cls.model).filter_by(twitch_id=twitch_id)
        result = await session.execute(query)
        return result.scalars().one_or_none()

    @classmethod
    async def find_by_id(cls, session, id):
        query = select(cls.model).filter_by(id=id)
        result = await session.execute(query)
        return result.scalars().one_or_none()

    @classmethod
    async def set_riot_id(cls, session, user_id, riot_id):
        user = await cls.find_by_id(session, user_id)
        if user:
            user.riot_id = riot_id
            await session.commit()
            return True
        return False

    @classmethod
    async def set_hdev_api_key(cls, session, user_id, hdev_api_key):
        user = await cls.find_by_id(session, user_id)
        if user:
            user.hdev_api_key = hdev_api_key
            await session.commit()
            return True
        return False
