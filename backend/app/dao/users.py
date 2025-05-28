from typing import Optional
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.dao.base import BaseDAO
from app.models.users import User


class UsersDAO(BaseDAO):
    """
    Data Access Object for managing User entities.
    Provides methods for user-related database operations.
    """
    model = User

    @classmethod
    async def find_by_twitch_id(cls, session: AsyncSession, twitch_id: str) -> Optional[User]:
        """
        Find a user by their Twitch ID.

        Args:
            session: Async SQLAlchemy session
            twitch_id: Twitch user identifier

        Returns:
            User instance if found, None otherwise

        Raises:
            SQLAlchemyError: If database operation fails
        """
        if not isinstance(twitch_id, str):
            raise ValueError("twitch_id must be a string")

        try:
            query = select(cls.model).filter_by(twitch_id=twitch_id)
            result = await session.execute(query)
            return result.scalars().one_or_none()
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Failed to find user by Twitch ID: {str(e)}")

    @classmethod
    async def find_by_id(cls, session: AsyncSession, id: int) -> Optional[User]:
        """
        Find a user by their database ID.

        Args:
            session: Async SQLAlchemy session
            id: User's database identifier

        Returns:
            User instance if found, None otherwise

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid ID provided
        """
        if not isinstance(id, int) or id <= 0:
            raise ValueError("Invalid user ID provided")

        try:
            query = select(cls.model).filter_by(id=id)
            result = await session.execute(query)
            return result.scalars().one_or_none()
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Failed to find user by ID: {str(e)}")

    @classmethod
    async def set_riot_id(cls, session: AsyncSession, user_id: int, riot_id: str) -> bool:
        """
        Update user's Riot ID.

        Args:
            session: Async SQLAlchemy session
            user_id: User's database identifier
            riot_id: New Riot ID to set

        Returns:
            True if update successful, False if user not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid parameters provided
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError("Invalid user ID provided")

        if not isinstance(riot_id, str) or not riot_id.strip():
            raise ValueError("Invalid Riot ID provided")

        try:
            user = await cls.find_by_id(session, user_id)
            if user:
                user.riot_id = riot_id.strip()
                await session.commit()
                return True
            return False
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Failed to update Riot ID: {str(e)}")

    @classmethod
    async def set_hdev_api_key(cls, session: AsyncSession, user_id: int, hdev_api_key: str) -> bool:
        """
        Update user's HenrikDev API key.

        Args:
            session: Async SQLAlchemy session
            user_id: User's database identifier
            hdev_api_key: New HenrikDev API key to set

        Returns:
            True if update successful, False if user not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid parameters provided
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError("Invalid user ID provided")

        if not isinstance(hdev_api_key, str) or not hdev_api_key.strip():
            raise ValueError("Invalid API key provided")

        try:
            user = await cls.find_by_id(session, user_id)
            if user:
                user.hdev_api_key = hdev_api_key.strip()
                await session.commit()
                return True
            return False
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Failed to update HenrikDev API key: {str(e)}")
