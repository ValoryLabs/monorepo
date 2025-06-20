from typing import Optional, List, Dict, Any
import logging
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from redis.asyncio import Redis

from app.dao.base import BaseDAO
from app.models.users import User

logger = logging.getLogger(__name__)


class UsersDAO(BaseDAO):
    """
    Data Access Object for managing User entities with Redis caching support.
    Provides methods for user-related database operations with intelligent caching.
    """
    model = User
    cache_prefix = "user"

    @classmethod
    async def find_by_twitch_id(cls, session: AsyncSession, cache: Optional[Redis], twitch_id: str) -> Optional[User]:
        """
        Find a user by their Twitch ID with caching support.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            twitch_id: Twitch user identifier

        Returns:
            User instance if found, None otherwise

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid twitch_id provided
        """
        if not isinstance(twitch_id, str) or not twitch_id.strip():
            raise ValueError("twitch_id must be a non-empty string")

        twitch_id = twitch_id.strip()

        # Generate cache key
        cache_key = cls._generate_cache_key("find_by_twitch_id", twitch_id=twitch_id)

        # Try to get from cache first
        cached_data = await cls._get_from_cache(cache, cache_key)
        if cached_data:
            user = cls._dict_to_model(cached_data)
            if user:
                logger.debug(f"Cache hit for user with Twitch ID: {twitch_id}")
                return user

        try:
            # Query database
            query = select(cls.model).filter_by(twitch_id=twitch_id)
            result = await session.execute(query)
            user = result.scalars().one_or_none()

            # Cache the result
            if user:
                user_dict = cls._model_to_dict(user)
                await cls._set_cache(cache, cache_key, user_dict)
                logger.debug(f"Database hit for user with Twitch ID: {twitch_id}")

            return user

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in find_by_twitch_id: {str(e)}")
            raise SQLAlchemyError(f"Failed to find user by Twitch ID: {str(e)}")

    @classmethod
    async def find_by_username(cls, session: AsyncSession, cache: Optional[Redis], username: str) -> Optional[User]:
        """
        Find a user by their username with caching support.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            username: Username to search for

        Returns:
            User instance if found, None otherwise

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid username provided
        """
        if not isinstance(username, str) or not username.strip():
            raise ValueError("username must be a non-empty string")

        username = username.strip().lower()

        # Generate cache key
        cache_key = cls._generate_cache_key("find_by_username", username=username)

        # Try to get from cache first
        cached_data = await cls._get_from_cache(cache, cache_key)
        if cached_data:
            user = cls._dict_to_model(cached_data)
            if user:
                logger.debug(f"Cache hit for user with username: {username}")
                return user

        try:
            # Query database (case-insensitive search)
            query = select(cls.model).filter(cls.model.username.ilike(username))
            result = await session.execute(query)
            user = result.scalars().one_or_none()

            # Cache the result
            if user:
                user_dict = cls._model_to_dict(user)
                await cls._set_cache(cache, cache_key, user_dict)
                logger.debug(f"Database hit for user with username: {username}")

            return user

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in find_by_username: {str(e)}")
            raise SQLAlchemyError(f"Failed to find user by username: {str(e)}")


    @classmethod
    async def set_riot_id(cls, session: AsyncSession, cache: Optional[Redis], user_id: int, riot_id: str) -> bool:
        """
        Update user's Riot ID with cache invalidation.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
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

        riot_id = riot_id.strip()

        try:
            # Update in database using BaseDAO method
            updated_user = await cls.update_by_id(session, cache, user_id, riot_id=riot_id)

            if updated_user:
                # Additional cache invalidation for user-specific keys
                await cls._invalidate_user_specific_cache(cache, user_id, updated_user.twitch_id, updated_user.username)
                logger.info(f"Updated Riot ID for user {user_id}: {riot_id}")
                return True

            return False

        except SQLAlchemyError as e:
            logger.error(f"Failed to update Riot ID for user {user_id}: {str(e)}")
            raise SQLAlchemyError(f"Failed to update Riot ID: {str(e)}")

    @classmethod
    async def set_hdev_api_key(cls, session: AsyncSession, cache: Optional[Redis], user_id: int,
                               hdev_api_key: str) -> bool:
        """
        Update user's HenrikDev API key with cache invalidation.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
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

        hdev_api_key = hdev_api_key.strip()

        try:
            # Update in database using BaseDAO method
            updated_user = await cls.update_by_id(session, cache, user_id, hdev_api_key=hdev_api_key)

            if updated_user:
                # Additional cache invalidation for user-specific keys
                await cls._invalidate_user_specific_cache(cache, user_id, updated_user.twitch_id, updated_user.username)
                logger.info(f"Updated HenrikDev API key for user {user_id}")
                return True

            return False

        except SQLAlchemyError as e:
            logger.error(f"Failed to update HenrikDev API key for user {user_id}: {str(e)}")
            raise SQLAlchemyError(f"Failed to update HenrikDev API key: {str(e)}")

    @classmethod
    async def update_user_profile(cls, session: AsyncSession, cache: Optional[Redis], user_id: int,
                                  **profile_data: Any) -> Optional[User]:
        """
        Update user profile data with cache invalidation.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            user_id: User's database identifier
            **profile_data: Profile data to update

        Returns:
            Updated User instance or None if user not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid parameters provided
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError("Invalid user ID provided")

        if not profile_data:
            raise ValueError("No profile data provided")

        # Filter allowed fields for security
        allowed_fields = {
            'username', 'avatar_url', 'twitch_display_name',
            'broadcaster_type', 'riot_id', 'hdev_api_key'
        }

        filtered_data = {
            key: value for key, value in profile_data.items()
            if key in allowed_fields and value is not None
        }

        if not filtered_data:
            raise ValueError("No valid profile data provided")

        try:
            # Get current user for cache invalidation
            current_user = await cls.find_by_id(session, cache, user_id)
            if not current_user:
                return None

            # Update in database using BaseDAO method
            updated_user = await cls.update_by_id(session, cache, user_id, **filtered_data)

            if updated_user:
                # Additional cache invalidation for user-specific keys
                await cls._invalidate_user_specific_cache(
                    cache, user_id, current_user.twitch_id, current_user.username
                )
                logger.info(f"Updated profile for user {user_id}")

            return updated_user

        except SQLAlchemyError as e:
            logger.error(f"Failed to update user profile for user {user_id}: {str(e)}")
            raise SQLAlchemyError(f"Failed to update user profile: {str(e)}")


    @classmethod
    async def _invalidate_user_specific_cache(cls, cache: Optional[Redis], user_id: int,
                                              twitch_id: Optional[str] = None, username: Optional[str] = None) -> None:
        """
        Invalidate all cache entries for a specific user.

        Args:
            cache: Redis cache instance
            user_id: User ID to invalidate cache for
            twitch_id: Optional Twitch ID for additional cache invalidation
            username: Optional username for additional cache invalidation
        """
        if not cache:
            return

        try:
            # Invalidate general model cache
            await cls._invalidate_model_cache(cache)

            # Invalidate specific user caches
            patterns_to_invalidate = [
                f"{cls._get_cache_prefix()}:find_by_id:*{user_id}*",
                f"{cls._get_cache_prefix()}:user_stats:*{user_id}*",
            ]

            if twitch_id:
                patterns_to_invalidate.append(f"{cls._get_cache_prefix()}:find_by_twitch_id:*{twitch_id}*")

            if username:
                patterns_to_invalidate.append(f"{cls._get_cache_prefix()}:find_by_username:*{username.lower()}*")

            for pattern in patterns_to_invalidate:
                await cls._invalidate_cache_pattern(cache, pattern)

            logger.debug(f"Invalidated user-specific cache for user {user_id}")

        except Exception as e:
            logger.warning(f"Failed to invalidate user-specific cache: {str(e)}")

