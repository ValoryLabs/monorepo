from datetime import datetime, timedelta
from typing import Optional, Literal
from pydantic import BaseModel, Field, field_validator, computed_field
import re


class STwitchOauth(BaseModel):
    """
    Base Twitch OAuth token schema containing core authentication data.

    This schema represents OAuth2 tokens received from Twitch API
    for user authentication and authorization purposes.
    """

    access_token: Optional[str] = Field(
        default=None,
        min_length=30,
        max_length=500,
        description="OAuth2 access token for API requests"
    )
    refresh_token: Optional[str] = Field(
        default=None,
        min_length=30,
        max_length=500,
        description="OAuth2 refresh token for token renewal"
    )
    expires_in: Optional[int] = Field(
        default=None,
        gt=0,
        le=86400,  # Maximum 24 hours
        description="Token expiration time in seconds from issuance"
    )
    token_type: Optional[Literal["Bearer", "bearer"]] = Field(
        default="Bearer",
        description="Type of the access token (typically 'Bearer')"
    )
    scope: Optional[str] = Field(
        default=None,
        max_length=500,
        description="Space-separated list of granted OAuth scopes"
    )

    @field_validator('access_token', 'refresh_token')
    @classmethod
    def validate_token_format(cls, v: Optional[str]) -> Optional[str]:
        """
        Validate OAuth token format and security requirements.

        Args:
            v: Token string to validate

        Returns:
            Validated token or None

        Raises:
            ValueError: If token format is invalid or insecure
        """
        if v is None:
            return v

        # Remove any whitespace
        v = v.strip()

        # Basic token format validation (alphanumeric + common OAuth chars)
        if not re.match(r'^[A-Za-z0-9\-._~+/]+=*$', v):
            raise ValueError('Token contains invalid characters')

        # Ensure minimum entropy (basic check)
        if len(set(v)) < 10:
            raise ValueError('Token appears to have insufficient entropy')

        return v

    @field_validator('token_type')
    @classmethod
    def normalize_token_type(cls, v: Optional[str]) -> Optional[str]:
        """
        Normalize token type to standard format.

        Args:
            v: Token type string

        Returns:
            Normalized token type
        """
        if v is None:
            return "Bearer"
        return v.capitalize()

    @field_validator('scope')
    @classmethod
    def validate_scope(cls, v: Optional[str]) -> Optional[str]:
        """
        Validate OAuth scope format and content.

        Args:
            v: Scope string to validate

        Returns:
            Validated scope string

        Raises:
            ValueError: If scope format is invalid
        """
        if v is None:
            return v

        # Validate scope format (space-separated identifiers)
        scopes = v.split()
        for scope in scopes:
            if not re.match(r'^[a-z:_]+$', scope):
                raise ValueError(f'Invalid scope format: {scope}')

        # Remove duplicates and sort for consistency
        unique_scopes = sorted(set(scopes))
        return ' '.join(unique_scopes)

    @computed_field
    @property
    def is_expired(self) -> bool:
        """
        Check if the token is expired based on expires_in value.

        Note: This is a simplified check. In practice, you should store
        the token issuance timestamp for accurate expiration checking.

        Returns:
            True if token appears to be expired
        """
        if self.expires_in is None:
            return False

        # This is a basic check - in real implementation,
        # you'd compare against stored issuance timestamp
        return self.expires_in <= 0

    model_config = {
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid",
        "json_schema_extra": {
            "example": {
                "access_token": "krjst3hsj6k4l2j3h4k5l6m7n8o9p0q1",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                "expires_in": 3600,
                "token_type": "Bearer",
                "scope": "user:read:email chat:read"
            }
        }
    }


class STwitchOauthCreate(STwitchOauth):
    """
    Schema for creating new Twitch OAuth token records.

    Used when storing OAuth tokens received from Twitch authorization flow.
    Inherits all validation rules from the base STwitchOauth schema.
    """

    # Override to make access_token required for creation
    access_token: str = Field(
        ...,
        min_length=30,
        max_length=500,
        description="Required OAuth2 access token for API requests"
    )

    # Override to make expires_in required for creation
    expires_in: int = Field(
        ...,
        gt=0,
        le=86400,
        description="Required token expiration time in seconds"
    )

    model_config = {
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid",
        "json_schema_extra": {
            "example": {
                "access_token": "krjst3hsj6k4l2j3h4k5l6m7n8o9p0q1",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                "expires_in": 3600,
                "token_type": "Bearer",
                "scope": "user:read:email chat:read"
            }
        }
    }


class STwitchOauthResponse(STwitchOauth):
    """
    Schema for Twitch OAuth token responses from API endpoints.

    Extends the base OAuth schema with database-specific fields
    and additional metadata for API responses.
    """

    user_id: int = Field(
        ...,
        gt=0,
        description="Database ID of the user associated with this OAuth token"
    )
    created_at: Optional[datetime] = Field(
        default=None,
        description="Timestamp when the OAuth token was first created"
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        description="Timestamp when the OAuth token was last updated"
    )

    @computed_field
    @property
    def expires_at(self) -> Optional[datetime]:
        """
        Calculate the absolute expiration timestamp.

        Returns:
            Datetime when the token expires, or None if no expiration data
        """
        if self.expires_in is None or self.created_at is None:
            return None

        return self.created_at + timedelta(seconds=self.expires_in)

    @computed_field
    @property
    def is_valid(self) -> bool:
        """
        Check if the OAuth token is currently valid.

        Returns:
            True if token exists and is not expired
        """
        if not self.access_token:
            return False

        expires_at = self.expires_at
        if expires_at is None:
            return True  # No expiration data, assume valid

        return datetime.utcnow() < expires_at

    model_config = {
        "from_attributes": True,  # Enable ORM mode for SQLAlchemy models
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid",
        "json_schema_extra": {
            "example": {
                "user_id": 1,
                "access_token": "krjst3hsj6k4l2j3h4k5l6m7n8o9p0q1",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                "expires_in": 3600,
                "token_type": "Bearer",
                "scope": "user:read:email chat:read",
                "created_at": "2025-05-31T03:23:00Z",
                "updated_at": "2025-05-31T03:23:00Z"
            }
        }
    }


class STwitchOauthUpdate(BaseModel):
    """
    Schema for updating existing Twitch OAuth token information.

    All fields are optional to allow partial updates.
    Used for PATCH operations on OAuth token endpoints.
    """

    access_token: Optional[str] = Field(
        default=None,
        min_length=30,
        max_length=500,
        description="Updated OAuth2 access token"
    )
    refresh_token: Optional[str] = Field(
        default=None,
        min_length=30,
        max_length=500,
        description="Updated OAuth2 refresh token"
    )
    expires_in: Optional[int] = Field(
        default=None,
        gt=0,
        le=86400,
        description="Updated token expiration time in seconds"
    )
    scope: Optional[str] = Field(
        default=None,
        max_length=500,
        description="Updated OAuth scopes"
    )

    # Apply same validators as base schema
    @field_validator('access_token', 'refresh_token')
    @classmethod
    def validate_token_format(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v

        v = v.strip()
        if not re.match(r'^[A-Za-z0-9\-._~+/]+=*$', v):
            raise ValueError('Token contains invalid characters')

        if len(set(v)) < 10:
            raise ValueError('Token appears to have insufficient entropy')

        return v

    @field_validator('scope')
    @classmethod
    def validate_scope(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v

        scopes = v.split()
        for scope in scopes:
            if not re.match(r'^[a-z:_]+$', scope):
                raise ValueError(f'Invalid scope format: {scope}')

        unique_scopes = sorted(set(scopes))
        return ' '.join(unique_scopes)

    model_config = {
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid"
    }
