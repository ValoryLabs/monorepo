import uuid
from datetime import datetime
from typing import TYPE_CHECKING
from enum import Enum

from sqlalchemy import (
    UUID,
    Boolean,
    ForeignKey,
    Integer,
    String,
    DateTime,
    CheckConstraint,
    Index,
    text
)
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func

from app.database.database import Base

if TYPE_CHECKING:
    from app.models.users import User


class OverlayStyle(str, Enum):
    """
    Enumeration of available overlay style variants.

    Defines the visual presentation modes for streaming overlays
    with different layouts and design approaches.
    """
    OLD = "old"
    NEW = "new"
    MINIMAL = "minimal"
    NEW_V2 = "new_v2"


class Overlay(Base):
    """
    Overlay model representing customizable streaming overlay configurations.

    This model stores visual and functional settings for VALORANT statistics
    overlays used in streaming applications. Each overlay belongs to a user
    and contains comprehensive styling and display preferences.

    The overlay system supports multiple visual themes, color customization,
    and granular control over which statistics are displayed to viewers.

    Attributes:
        id: Unique UUID identifier for the overlay
        user_id: Foreign key reference to the owning user
        overlay_style: Visual style variant (old, new, minimal, new_v2)

        Background styling:
        - background_color: Primary background color in hex format
        - disabled_background: Toggle for background visibility
        - disabled_border: Toggle for border visibility
        - disabled_background_gradient: Toggle for gradient effects
        - disabled_glow_effect: Toggle for glow visual effects

        Rank display settings:
        - disabled_peak_rank_icon: Toggle for peak rank icon display
        - disabled_leaderboard_place: Toggle for leaderboard position
        - disabled_peak_rr: Toggle for peak rating display

        Text styling:
        - text_color: Primary text color in hex format
        - primary_color: Secondary text color in hex format
        - overlay_font: Font family for text rendering

        Match result styling:
        - win_color: Color for win indicators in hex format
        - lose_color: Color for loss indicators in hex format
        - disabled_win_lose: Toggle for win/loss indicators
        - disabled_last_match_points: Toggle for recent match points

        Progress visualization:
        - disabled_progress: Toggle for progress bar display
        - progress_color: Progress bar fill color in hex format
        - progress_bg_color: Progress bar background color in hex format

        Metadata:
        - created_at: Overlay creation timestamp
        - updated_at: Last modification timestamp
        - is_active: Overlay status flag
    """

    __tablename__ = "overlays"

    # Primary key with UUID for better security and distribution
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
        comment="Unique identifier for the overlay configuration"
    )

    # Foreign key relationship to user
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Reference to the user who owns this overlay"
    )

    # Core overlay configuration
    overlay_style: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default=OverlayStyle.OLD.value,
        comment="Visual style variant for the overlay presentation"
    )

    # Background styling configuration
    background_color: Mapped[str] = mapped_column(
        String(7),  # Hex color format #RRGGBB
        nullable=False,
        default="#07090E",
        comment="Primary background color in hexadecimal format"
    )

    disabled_background: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to disable background rendering"
    )

    disabled_border: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to disable border rendering around overlay elements"
    )

    disabled_background_gradient: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to disable gradient effects on background"
    )

    disabled_glow_effect: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to disable glow visual effects"
    )

    # Rank and statistics display configuration
    disabled_peak_rank_icon: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to hide peak rank icon display"
    )

    disabled_leaderboard_place: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to hide leaderboard position display"
    )

    disabled_peak_rr: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to hide peak rating (RR) display"
    )

    # Text styling configuration
    text_color: Mapped[str] = mapped_column(
        String(7),
        nullable=False,
        default="#f2f2f2",
        comment="Primary text color in hexadecimal format"
    )

    primary_color: Mapped[str] = mapped_column(
        String(7),
        nullable=False,
        default="#f2f2f2",
        comment="Secondary text color for highlights in hexadecimal format"
    )

    overlay_font: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="Inter",
        comment="Font family name for text rendering"
    )

    # Match result styling configuration
    win_color: Mapped[str] = mapped_column(
        String(7),
        nullable=False,
        default="#00FFE3",
        comment="Color for win indicators in hexadecimal format"
    )

    lose_color: Mapped[str] = mapped_column(
        String(7),
        nullable=False,
        default="#FF7986",
        comment="Color for loss indicators in hexadecimal format"
    )

    disabled_win_lose: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to hide win/loss indicator display"
    )

    disabled_last_match_points: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to hide recent match points display"
    )

    # Progress visualization configuration
    disabled_progress: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        comment="Flag to hide progress bar display"
    )

    progress_color: Mapped[str] = mapped_column(
        String(7),
        nullable=False,
        default="#00FFE3",
        comment="Progress bar fill color in hexadecimal format"
    )

    progress_bg_color: Mapped[str] = mapped_column(
        String(7),
        nullable=False,
        default="#f2f2f2",
        comment="Progress bar background color in hexadecimal format"
    )

    # Metadata and status tracking
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        comment="Flag indicating if overlay is currently active"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        comment="Timestamp when overlay was created"
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
        comment="Timestamp when overlay was last modified"
    )

    # Relationship to user model
    user: Mapped["User"] = relationship(
        "User",
        back_populates="overlays",
        lazy="select",
        doc="User who owns this overlay configuration"
    )

    # Database constraints and indexes for data integrity and performance
    __table_args__ = (
        # Validate hex color format for all color fields
        CheckConstraint(
            "background_color ~ '^#[0-9A-Fa-f]{6}$'",
            name='ck_overlay_background_color_hex'
        ),
        CheckConstraint(
            "text_color ~ '^#[0-9A-Fa-f]{6}$'",
            name='ck_overlay_text_color_hex'
        ),
        CheckConstraint(
            "primary_color ~ '^#[0-9A-Fa-f]{6}$'",
            name='ck_overlay_primary_color_hex'
        ),
        CheckConstraint(
            "win_color ~ '^#[0-9A-Fa-f]{6}$'",
            name='ck_overlay_win_color_hex'
        ),
        CheckConstraint(
            "lose_color ~ '^#[0-9A-Fa-f]{6}$'",
            name='ck_overlay_lose_color_hex'
        ),
        CheckConstraint(
            "progress_color ~ '^#[0-9A-Fa-f]{6}$'",
            name='ck_overlay_progress_color_hex'
        ),
        CheckConstraint(
            "progress_bg_color ~ '^#[0-9A-Fa-f]{6}$'",
            name='ck_overlay_progress_bg_color_hex'
        ),

        # Validate overlay style enum values
        CheckConstraint(
            f"overlay_style IN ('{OverlayStyle.OLD.value}', '{OverlayStyle.NEW.value}', "
            f"'{OverlayStyle.MINIMAL.value}', '{OverlayStyle.NEW_V2.value}')",
            name='ck_overlay_style_enum'
        ),

        # Validate font name format
        CheckConstraint(
            "overlay_font ~ '^[a-zA-Z0-9\\s-]+$' AND length(overlay_font) >= 2",
            name='ck_overlay_font_format'
        ),

        # Performance indexes for common query patterns
        Index('ix_overlays_user_active', 'user_id', 'is_active'),
        Index('ix_overlays_style_created', 'overlay_style', 'created_at'),
        Index('ix_overlays_updated_desc', text('updated_at DESC')),

        # Table metadata
        {'comment': 'Streaming overlay configurations with visual and functional settings'}
    )

    def __repr__(self) -> str:
        """
        Developer-friendly string representation of the Overlay instance.

        Returns:
            String containing key identifying information
        """
        return (
            f"<Overlay(id={self.id}, user_id={self.user_id}, "
            f"style='{self.overlay_style}', active={self.is_active})>"
        )

    def __str__(self) -> str:
        """
        User-friendly string representation.

        Returns:
            Human-readable overlay description
        """
        return f"Overlay {self.overlay_style} for User {self.user_id}"
