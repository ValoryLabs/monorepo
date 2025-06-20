from datetime import datetime
from typing import TYPE_CHECKING, List
from sqlalchemy import (
    String,
    Integer,
    DateTime,
    Boolean,
    Index,
    UniqueConstraint,
    CheckConstraint
)
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func

from app.database.database import Base

if TYPE_CHECKING:
    from app.models.overlays import Overlay


class User(Base):
    """
    User model representing application users with gaming platform integrations.

    This model stores user account information including authentication data
    for Twitch and Riot Games platforms, along with overlay configurations
    for streaming purposes.

    Attributes:
        id: Primary key identifier
        username: Unique username for the application
        avatar_url: URL to user's profile picture
        twitch_id: Twitch platform user identifier
        twitch_display_name: Display name on Twitch
        riot_id: Riot Games account identifier (username#tag format)
        hdev_api_key: Henrik Dev API key for VALORANT statistics
        is_active: Account status flag
        created_at: Account creation timestamp
        updated_at: Last modification timestamp
        overlays: Related overlay configurations
        twitch_oauth: OAuth tokens for Twitch integration
    """

    __tablename__ = "users"

    # Primary key with explicit definition
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        comment="Unique identifier for the user"
    )

    # Core user information
    username: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True,
        index=True,
        comment="Unique username for application login"
    )

    broadcaster_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
        comment="Type of broadcaster (e.g., affiliate, partner, etc.)"
    )

    avatar_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
        comment="URL to user's profile picture"
    )

    # Twitch platform integration
    twitch_id: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        unique=True,
        index=True,
        comment="Twitch platform user identifier"
    )

    twitch_display_name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        comment="Display name shown on Twitch platform"
    )

    # Riot Games platform integration
    riot_id: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        comment="Riot Games account identifier (username#tag format)"
    )

    # Third-party API integration
    hdev_api_key: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
        comment="Henrik Dev API key for VALORANT statistics access"
    )

    # Account status and metadata
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        comment="Account status flag - False for suspended/deleted accounts"
    )

    # Timestamp fields with automatic management
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        comment="Account creation timestamp"
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
        comment="Last account modification timestamp"
    )

    # Relationships with related models
    overlays: Mapped[List["Overlay"]] = relationship(
        "Overlay",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="select",
        order_by="Overlay.created_at.desc()",
        doc="User's overlay configurations for streaming"
    )

    # Database constraints and indexes
    __table_args__ = (
        # Unique constraint for Twitch ID (allowing NULL)
        UniqueConstraint(
            'twitch_id',
            name='uq_users_twitch_id'
        ),

        # Check constraint for username format
        CheckConstraint(
            "length(username) >= 3 AND username ~ '^[a-zA-Z0-9_-]+$'",
            name='ck_users_username_format'
        ),

        # Check constraint for avatar URL format
        CheckConstraint(
            "avatar_url IS NULL OR avatar_url ~ '^https?://'",
            name='ck_users_avatar_url_format'
        ),

        # Composite index for efficient queries
        Index('ix_users_active_created', 'is_active', 'created_at'),
        Index('ix_users_twitch_lookup', 'twitch_id', 'twitch_display_name'),

        # Table comment
        {'comment': 'Application users with gaming platform integrations'}
    )

    def __repr__(self) -> str:
        """
        String representation of the User instance.

        Returns:
            Human-readable string representation
        """
        return f"<User(id={self.id}, username='{self.username}', active={self.is_active})>"

    def __str__(self) -> str:
        """
        User-friendly string representation.

        Returns:
            Username string
        """
        return self.username

    @property
    def has_riot_integration(self) -> bool:
        """
        Check if user has Riot Games platform integration configured.

        Returns:
            True if Riot ID is present
        """
        return self.riot_id is not None

    @property
    def has_hdev_integration(self) -> bool:
        """
        Check if user has Henrik Dev API integration configured.

        Returns:
            True if HDEV API key is present
        """
        return self.hdev_api_key is not None

    @property
    def display_name(self) -> str:
        """
        Get the best available display name for the user.

        Returns:
            Twitch display name if available, otherwise username
        """
        return self.twitch_display_name or self.username

    def deactivate(self) -> None:
        """
        Deactivate the user account.

        Sets is_active to False and updates the timestamp.
        """
        self.is_active = False
        self.updated_at = func.now()

    def activate(self) -> None:
        """
        Activate the user account.

        Sets is_active to True and updates the timestamp.
        """
        self.is_active = True
        self.updated_at = func.now()
