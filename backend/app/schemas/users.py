from typing import Optional
from pydantic import BaseModel, Field, field_validator
import re

from app.schemas.overlays import SOverlayResponse
from app.schemas.twitch import STwitchOauthResponse


class SUser(BaseModel):
    """
    Base user schema containing core user information.

    This schema represents the fundamental user data structure
    used across the application for user-related operations.
    """

    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
        description="Unique username for the user account"
    )
    broadcaster_type: Optional[str] = Field(
        default=None,
        max_length=500,
        description="Type of broadcaster (e.g., affiliate, partner, etc.)"
    )
    avatar_url: Optional[str] = Field(
        default=None,
        max_length=500,
        description="URL to the user's avatar image"
    )
    twitch_id: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Twitch platform user identifier"
    )
    twitch_display_name: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Display name shown on Twitch platform"
    )
    riot_id: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Riot Games account identifier (username#tag format)"
    )
    hdev_api_key: Optional[str] = Field(
        default=None,
        max_length=200,
        description="Henrik Dev API key for VALORANT statistics"
    )

    @field_validator('username')
    @classmethod
    def validate_username(cls, v: str) -> str:
        """
        Validate username format and characters.

        Args:
            v: Username string to validate

        Returns:
            Validated username

        Raises:
            ValueError: If username contains invalid characters
        """
        if not re.match(r'^[a-zA-Z0-9_-]+$', v):
            raise ValueError('Username can only contain letters, numbers, underscores, and hyphens')
        return v.lower()

    @field_validator('riot_id')
    @classmethod
    def validate_riot_id(cls, v: Optional[str]) -> Optional[str]:
        """
        Validate Riot ID using the enhanced Unicode pattern.

        Format: username#tag where username supports Unicode characters
        and spaces, tag is 3-5 alphanumeric characters.
        """
        if v is None:
            return v

        # Enhanced Riot ID pattern supporting Unicode and spaces
        riot_pattern = re.compile(
            r'^[\p{L}\p{N}]+(?: [\p{L}\p{N}]+)*#[\p{L}\p{N}]{3,5}$',
            re.UNICODE
        )

        if not riot_pattern.match(v):
            raise ValueError(
                'Riot ID must be in format "username#tag" where username can contain '
                'Unicode letters, numbers, and spaces, and tag is 3-5 characters'
            )

        # Additional validation for reasonable length
        username_part = v.split('#')[0]
        if len(username_part) < 3 or len(username_part) > 16:
            raise ValueError('Riot ID username part must be between 3 and 16 characters')

        return v

    @field_validator('hdev_api_key')
    @classmethod
    def validate_hdev_api_key(cls, v: Optional[str]) -> Optional[str]:
        """
        Validate Henrik Dev API key using the exact UUID format.

        Format: HDEV-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        """
        if v is None:
            return v

        # Enhanced HDEV API key pattern
        hdev_pattern = re.compile(
            r'^HDEV-[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$',
            re.IGNORECASE
        )

        if not hdev_pattern.match(v):
            raise ValueError(
                'HDEV API key must be in format "HDEV-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" '
                'where x is a hexadecimal digit'
            )

        return v.upper()

    model_config = {
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid",
        "json_schema_extra": {
            "example": {
                "username": "player123",
                "avatar_url": "https://example.com/avatar.jpg",
                "twitch_id": "123456789",
                "twitch_display_name": "Player123",
                "riot_id": "PlayerName#1234",
                "hdev_api_key": "HDEV-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            }
        }
    }


class SUserCreate(SUser):
    """
    Schema for creating new user accounts.

    Inherits all validation rules from SUser base schema.
    Used specifically for user registration and account creation endpoints.
    """

    # Inherit all fields from SUser
    # Additional creation-specific validation can be added here if needed
    pass


class SUserResponse(SUser):
    """
    Schema for user data responses from API endpoints.

    Extends the base user schema with additional fields that are
    populated when retrieving user information from the database.
    Includes related data like overlays and OAuth information.
    """

    id: int = Field(
        ...,
        gt=0,
        description="Unique database identifier for the user"
    )
    overlays: list[SOverlayResponse] = Field(
        default_factory=list,
        description="List of overlay configurations associated with the user"
    )
    twitch_oauth: Optional[STwitchOauthResponse] = Field(
        default=None,
        description="Twitch OAuth authentication information"
    )

    model_config = {
        "from_attributes": True,  # Enable ORM mode for SQLAlchemy models
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid",
        "json_schema_extra": {
            "example": {
                "id": 1,
                "username": "player123",
                "avatar_url": "https://example.com/avatar.jpg",
                "twitch_id": "123456789",
                "twitch_display_name": "Player123",
                "riot_id": "PlayerName#1234",
                "hdev_api_key": "HDEV-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "overlays": [],
                "twitch_oauth": None
            }
        }
    }


class SUserUpdate(BaseModel):
    """
    Schema for updating existing user information.

    All fields are optional to allow partial updates.
    Used for PATCH operations on user endpoints.
    """

    username: Optional[str] = Field(
        default=None,
        min_length=3,
        max_length=50,
        description="Updated username"
    )
    avatar_url: Optional[str] = Field(
        default=None,
        max_length=500,
        description="Updated avatar URL"
    )
    twitch_display_name: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Updated Twitch display name"
    )
    riot_id: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Updated Riot ID"
    )
    hdev_api_key: Optional[str] = Field(
        default=None,
        max_length=200,
        description="Updated Henrik Dev API key"
    )

    # Apply same validators as base schema
    @field_validator('username')
    @classmethod
    def validate_username(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        if not re.match(r'^[a-zA-Z0-9_-]+$', v):
            raise ValueError('Username can only contain letters, numbers, underscores, and hyphens')
        return v.lower()

    @field_validator('avatar_url')
    @classmethod
    def validate_avatar_url(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v

        url_pattern = re.compile(
            r'^https?://'
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'
            r'localhost|'
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
            r'(?::\d+)?'
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)

        if not url_pattern.match(v):
            raise ValueError('Invalid avatar URL format')
        return v

    @field_validator('riot_id')
    @classmethod
    def validate_riot_id(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        if not re.match(r'^[a-zA-Z0-9\s]{3,16}#[a-zA-Z0-9]{3,5}$', v):
            raise ValueError('Riot ID must be in format "username#tag"')
        return v

    model_config = {
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid"
    }
