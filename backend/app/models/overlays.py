import uuid

from sqlalchemy import UUID, Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Overlay(Base):
    __tablename__ = "overlays"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False
    )
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    overlay_style  = Column(String, default="old", nullable=False)
    background_color = Column(String, default="#07090E", nullable=False)
    disabled_background = Column(Boolean, default=False, nullable=False)
    disabled_border = Column(Boolean, default=False, nullable=False)
    disabled_background_gradient = Column(Boolean, default=False, nullable=False)
    disabled_glow_effect = Column(Boolean, default=False, nullable=False)
    disabled_peak_rank_icon = Column(Boolean, default=False, nullable=False)
    disabled_leaderboard_place= Column(Boolean, default=False, nullable=False)
    disabled_peak_rr= Column(Boolean, default=False, nullable=False)

    text_color = Column(String, default="#f2f2f2", nullable=False)
    primary_color = Column(String, default="#f2f2f2", nullable=False)
    overlay_font = Column(String, default="Inter", nullable=False)
    win_color = Column(String, default="#00FFE3", nullable=False)
    lose_color = Column(String, default="#FF7986", nullable=False)

    disabled_win_lose = Column(Boolean, default=False, nullable=False)
    disabled_last_match_points = Column(Boolean, default=False, nullable=False)
    disabled_progress = Column(Boolean, default=False, nullable=False)

    progress_color = Column(String, default="#00FFE3", nullable=False)
    progress_bg_color = Column(String, default="#f2f2f2", nullable=False)

    user = relationship("User", back_populates="overlays")
