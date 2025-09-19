from typing import Optional, Dict, Any
import logging

import uuid
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from redis.asyncio import Redis

from app.dao.base import BaseDAO
from app.models.overlays import Overlay

logger = logging.getLogger(__name__)


class OverlaysDAO(BaseDAO):
    """
    Data Access Object for managing Overlay settings with Redis caching.
    Handles CRUD operations for user overlay configurations with intelligent caching.
    """
    model = Overlay
    cache_ttl = 1800  # 30 minutes for overlay settings
    cache_prefix = "overlay"

    # Mapping between frontend and database field names
    FIELD_MAPPING: Dict[str, str] = {
        'overlayStyle': 'overlay_style',
        'backgroundColor': 'background_color',
        'disabledBackground': 'disabled_background',
        'disabledBorder': 'disabled_border',
        'disabledBackgroundGradient': 'disabled_background_gradient',
        'disabledGlowEffect': 'disabled_glow_effect',
        'disabledPeakRankIcon': 'disabled_peak_rank_icon',
        'disabledLeaderboardPlace': 'disabled_leaderboard_place',
        'disabledPeakRR': 'disabled_peak_rr',
        'textColor': 'text_color',
        'primaryTextColor': 'primary_color',
        'overlayFont': 'overlay_font',
        'winColor': 'win_color',
        'loseColor': 'lose_color',
        'disabledWinLose': 'disabled_win_lose',
        'disabledLastMatchPoints': 'disabled_last_match_points',
        'disabledProgress': 'disabled_progress',
        'progressColor': 'progress_color',
        'progressBgColor': 'progress_bg_color'
    }

    @classmethod
    async def find_by_user_id(cls, session: AsyncSession, cache: Optional[Redis], user_id: int) -> Optional[Overlay]:
        """
        Find overlay settings for a specific user with caching support.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            user_id: ID of the user to find overlay settings for

        Returns:
            Overlay settings or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid user_id provided
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError("Invalid user_id provided")

        # Generate cache key
        cache_key = cls._generate_cache_key("find_by_user_id", user_id=user_id)

        # Try to get from cache first
        cached_data = await cls._get_from_cache(cache, cache_key)
        if cached_data:
            overlay = cls._dict_to_model(cached_data)
            if overlay:
                logger.debug(f"Cache hit for overlay settings for user: {user_id}")
                return overlay

        try:
            # Query database
            query = select(cls.model).filter_by(user_id=user_id)
            result = await session.execute(query)
            overlay = result.scalars().one_or_none()

            # Cache the result
            if overlay:
                overlay_dict = cls._model_to_dict(overlay)
                await cls._set_cache(cache, cache_key, overlay_dict)
                logger.debug(f"Database hit for overlay settings for user: {user_id}")

            return overlay

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in find_by_user_id: {str(e)}")
            raise SQLAlchemyError(f"Failed to find overlay settings: {str(e)}")

    @classmethod
    async def save_overlay_settings(
            cls,
            session: AsyncSession,
            cache: Optional[Redis],
            user_id: int,
            settings_data: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """
        Save or update overlay settings for a user with cache invalidation.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            user_id: ID of the user to save settings for
            settings_data: Dictionary containing overlay settings

        Returns:
            Dictionary with saved overlay settings or None if operation failed

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If invalid settings data provided
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError("Invalid user_id provided")

        if not isinstance(settings_data, dict):
            raise ValueError("settings_data must be a dictionary")

        if not settings_data:
            raise ValueError("settings_data cannot be empty")

        try:
            # Convert frontend field names to database field names
            converted_data = {
                cls.FIELD_MAPPING[frontend_key]: value
                for frontend_key, value in settings_data.items()
                if frontend_key in cls.FIELD_MAPPING
            }

            if not converted_data:
                raise ValueError("No valid settings data provided")

            # Check if overlay settings exist for the user
            existing_overlay = await cls.find_by_user_id(session, cache, user_id)

            if existing_overlay:
                # Update existing settings using BaseDAO method
                updated_overlay = await cls.update_by_id(session, cache, existing_overlay.id, **converted_data)
            else:
                # Create new settings using BaseDAO method
                converted_data['user_id'] = user_id
                updated_overlay = await cls.add(session, cache, **converted_data)

            # Additional cache invalidation for user-specific keys
            await cls._invalidate_user_overlay_cache(cache, user_id)

            if updated_overlay:
                logger.info(f"Saved overlay settings for user {user_id}")
                return cls._overlay_to_dict(updated_overlay)

            return None

        except IntegrityError as e:
            await session.rollback()
            logger.error(f"Integrity error saving overlay settings: {str(e)}")
            raise SQLAlchemyError("Database integrity error")
        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error saving overlay settings: {str(e)}")
            raise SQLAlchemyError(f"Failed to save overlay settings: {str(e)}")

    @classmethod
    async def get_overlay_by_id(cls, session: AsyncSession, cache: Optional[Redis], overlay_id: uuid.UUID) -> Optional[
        Overlay]:
        """
        Get overlay by its ID with caching support.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            overlay_id: UUID of the overlay to retrieve

        Returns:
            Overlay instance or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
        """
        return await cls.find_by_id(session, cache, overlay_id)


    @classmethod
    async def _invalidate_user_overlay_cache(cls, cache: Optional[Redis], user_id: int) -> None:
        """
        Invalidate all cache entries for a specific user's overlay.

        Args:
            cache: Redis cache instance
            user_id: User ID to invalidate cache for
        """
        if not cache:
            return

        try:
            # Invalidate general model cache
            await cls._invalidate_model_cache(cache)

            # Invalidate specific user overlay caches
            patterns_to_invalidate = [
                f"{cls._get_cache_prefix()}:find_by_user_id:*{user_id}*",
                f"{cls._get_cache_prefix()}:*user_id*{user_id}*",
            ]

            for pattern in patterns_to_invalidate:
                await cls._invalidate_cache_pattern(cache, pattern)

            logger.debug(f"Invalidated overlay cache for user {user_id}")

        except Exception as e:
            logger.warning(f"Failed to invalidate user overlay cache: {str(e)}")

    @staticmethod
    def _overlay_to_dict(overlay: Overlay) -> Dict[str, Any]:
        """
        Convert Overlay model instance to dictionary with frontend field names.

        Args:
            overlay: Overlay model instance

        Returns:
            Dictionary with overlay settings using frontend field names
        """
        if not overlay:
            return {}

        # Reverse mapping from database to frontend field names
        reverse_mapping = {v: k for k, v in OverlaysDAO.FIELD_MAPPING.items()}

        result = {}
        for db_field, value in overlay.__dict__.items():
            if db_field in reverse_mapping and not db_field.startswith('_'):
                result[reverse_mapping[db_field]] = value
            elif db_field in ['id', 'user_id', 'created_at', 'updated_at'] and not db_field.startswith('_'):
                # Include system fields as-is
                result[db_field] = value

        return result

    @classmethod
    def _dict_to_model(cls, data: Dict[str, Any]) -> Optional[Overlay]:
        """
        Convert dictionary to Overlay model instance.

        Args:
            data: Dictionary with overlay data

        Returns:
            Overlay model instance or None if conversion fails
        """
        if not data:
            return None

        try:
            return cls.model(**data)
        except Exception as e:
            logger.warning(f"Failed to convert dict to Overlay model: {str(e)}")
            return None
