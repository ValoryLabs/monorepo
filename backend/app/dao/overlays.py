from typing import Optional, Dict, Any
from sqlalchemy import insert, select, update
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.dao.base import BaseDAO
from app.models.overlays import Overlay


class OverlaysDAO(BaseDAO):
    """
    Data Access Object for managing Overlay settings.
    Handles CRUD operations for user overlay configurations.
    """
    model = Overlay

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
    async def find_by_user_id(cls, session: AsyncSession, user_id: int) -> Optional[Overlay]:
        """
        Find overlay settings for a specific user.

        Args:
            session: Async SQLAlchemy session
            user_id: ID of the user to find overlay settings for

        Returns:
            Overlay settings or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
        """
        try:
            query = select(cls.model).filter_by(user_id=user_id)
            result = await session.execute(query)
            return result.scalars().one_or_none()
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Failed to find overlay settings: {str(e)}")

    @classmethod
    async def save_overlay_settings(
        cls,
        session: AsyncSession,
        user_id: int,
        settings_data: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """
        Save or update overlay settings for a user.

        Args:
            session: Async SQLAlchemy session
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

        try:
            # Convert frontend field names to database field names
            converted_data = {
                cls.FIELD_MAPPING[frontend_key]: value
                for frontend_key, value in settings_data.items()
                if frontend_key in cls.FIELD_MAPPING
            }

            # Check if overlay settings exist for the user
            existing_overlay = await cls.find_by_user_id(session, user_id)

            if existing_overlay:
                # Update existing settings
                stmt = update(cls.model).where(
                    cls.model.user_id == user_id
                ).values(**converted_data)
                await session.execute(stmt)
            else:
                # Create new settings
                converted_data['user_id'] = user_id
                stmt = insert(cls.model).values(**converted_data)
                await session.execute(stmt)

            await session.commit()

            # Fetch and return updated settings
            updated_overlay = await cls.find_by_user_id(session, user_id)
            return cls._overlay_to_dict(updated_overlay) if updated_overlay else None

        except IntegrityError:
            await session.rollback()
            raise SQLAlchemyError("Database integrity error")
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Failed to save overlay settings: {str(e)}")

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

        return result
