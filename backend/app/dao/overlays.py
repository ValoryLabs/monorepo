from sqlalchemy import insert, select, update
from sqlalchemy.exc import IntegrityError

from app.dao.base import BaseDAO
from app.models.overlays import Overlay


class OverlaysDAO(BaseDAO):
    model = Overlay

    @classmethod
    async def find_by_user_id(cls, session, user_id):
        query = select(cls.model).filter_by(user_id=user_id)
        result = await session.execute(query)
        return result.scalars().one_or_none()



    @classmethod
    async def save_overlay_settings(cls, session, user_id, settings_data):
        try:
            stmt = select(Overlay).where(Overlay.user_id == user_id)
            result = await session.execute(stmt)
            existing_overlay = result.scalar_one_or_none()

            converted_data = {}
            field_mapping = {
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

            for frontend_key, db_key in field_mapping.items():
                if frontend_key in settings_data:
                    converted_data[db_key] = settings_data[frontend_key]

            if existing_overlay:
                stmt = update(Overlay).where(
                    Overlay.user_id == user_id
                ).values(**converted_data)

                result = await session.execute(stmt)
                await session.commit()

                if result.rowcount > 0:
                    updated_stmt = select(Overlay).where(Overlay.user_id == user_id)
                    updated_result = await session.execute(updated_stmt)
                    updated_overlay = updated_result.scalar_one()
                    return cls._overlay_to_dict(updated_overlay)
                else:
                    return None
            else:
                converted_data['user_id'] = user_id
                stmt = insert(Overlay).values(**converted_data)

                result = await session.execute(stmt)
                await session.commit()

                if result.rowcount > 0:
                    new_stmt = select(Overlay).where(Overlay.user_id == user_id)
                    new_result = await session.execute(new_stmt)
                    new_overlay = new_result.scalar_one()
                    return cls._overlay_to_dict(new_overlay)
                else:
                    return None

        except IntegrityError as e:
            await session.rollback()
            return None
        except Exception as e:
            await session.rollback()
            return None

    @classmethod
    def _overlay_to_dict(cls, overlay):
        return {
            'overlayStyle': overlay.overlay_style,
            'backgroundColor': overlay.background_color,
            'disabledBackground': overlay.disabled_background,
            'disabledBorder': overlay.disabled_border,
            'disabledBackgroundGradient': overlay.disabled_background_gradient,
            'disabledGlowEffect': overlay.disabled_glow_effect,
            'disabledPeakRankIcon': overlay.disabled_peak_rank_icon,
            'disabledLeaderboardPlace': overlay.disabled_leaderboard_place,
            'disabledPeakRR': overlay.disabled_peak_rr,
            'textColor': overlay.text_color,
            'primaryTextColor': overlay.primary_color,
            'overlayFont': overlay.overlay_font,
            'winColor': overlay.win_color,
            'loseColor': overlay.lose_color,
            'disabledWinLose': overlay.disabled_win_lose,
            'disabledLastMatchPoints': overlay.disabled_last_match_points,
            'disabledProgress': overlay.disabled_progress,
            'progressColor': overlay.progress_color,
            'progressBgColor': overlay.progress_bg_color
        }
