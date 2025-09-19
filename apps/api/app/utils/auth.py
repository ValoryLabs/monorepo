import datetime
from typing import Optional, Dict, Any

from jose import jwt
from jose.exceptions import JWTError
from passlib.context import CryptContext
from redis.asyncio.client import Redis
from sqlalchemy.ext.asyncio.session import AsyncSession

from app.config import settings, logger
from app.dao.overlays import OverlaysDAO
from app.dao.users import UsersDAO
from app.models.users import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



async def create_user_session(user: User, remember_me: bool = False) -> Dict[str, Any]:
    """
    Create user session with JWT token and optional extended expiration.

    Args:
        user: User instance to create session for
        remember_me: Whether to extend token expiration time

    Returns:
        Dictionary containing access token and user information

    Raises:
        ValueError: If user is invalid
    """
    if not user or not user.id:
        raise ValueError("Valid user instance required")

    # Set token expiration based on remember_me flag
    if remember_me:
        expire_delta = datetime.timedelta(days=30)  # 30 days for "remember me"
    else:
        expire_delta = datetime.timedelta(hours=24)  # 24 hours default

    expire = datetime.datetime.utcnow() + expire_delta

    # Create token payload
    token_data = {
        "sub": str(user.id),
        "username": user.username,
        "twitch_id": user.twitch_id,
        "type": "access_token"
    }

    access_token = await create_access_token(token_data, expire)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": int(expire_delta.total_seconds()),
        "user": {
            "id": user.id,
            "username": user.username,
            "twitch_id": user.twitch_id,
            "display_name": user.twitch_display_name,
            "avatar_url": user.avatar_url,
            "broadcaster_type": user.broadcaster_type
        }
    }


async def get_password_hash(password: str) -> str:
    """
    Generate password hash using bcrypt algorithm.

    Args:
        password: Plain text password to hash

    Returns:
        Hashed password string

    Raises:
        ValueError: If password is empty or invalid
    """
    if not password or not password.strip():
        raise ValueError("Password cannot be empty")

    return pwd_context.hash(password)


async def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify plain password against hashed password.

    Args:
        plain_password: Plain text password to verify
        hashed_password: Hashed password to compare against

    Returns:
        True if password matches, False otherwise

    Raises:
        ValueError: If either password is empty or invalid
    """
    if not plain_password or not hashed_password:
        raise ValueError("Both passwords must be provided")

    return pwd_context.verify(plain_password, hashed_password)


async def create_access_token(data: dict, expire: datetime.datetime) -> str:
    """
    Create JWT access token with expiration time.

    Args:
        data: Payload data to encode in token
        expire: Token expiration datetime

    Returns:
        Encoded JWT token string

    Raises:
        ValueError: If data is empty or expire time is invalid
        JWTError: If token encoding fails
    """
    if not data:
        raise ValueError("Token data cannot be empty")

    if expire <= datetime.datetime.utcnow():
        raise ValueError("Expiration time must be in the future")

    try:
        to_encode = data.copy()
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    except Exception as e:
        raise JWTError(f"Failed to create access token: {str(e)}")


async def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Decode and validate JWT access token.

    Args:
        token: JWT token string to decode

    Returns:
        Decoded token payload or None if invalid

    Raises:
        JWTError: If token decoding fails
    """
    if not token:
        return None

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None


async def authenticate_user(session: AsyncSession, cache: Optional[Redis], user_info: dict) -> Optional[User]:
    """
    Authenticate user from Twitch OAuth data with Redis caching support.
    Creates new user and default overlay settings if user doesn't exist.

    Args:
        session: SQLAlchemy async session
        cache: Redis cache instance
        user_info: Dictionary containing Twitch user information

    Returns:
        User instance if authentication successful, None otherwise

    Raises:
        ValueError: If user_info is invalid or missing required fields
        SQLAlchemyError: If database operations fail
    """
    if not isinstance(user_info, dict):
        raise ValueError("user_info must be a dictionary")

    user_id = user_info.get("id")
    if not user_id:
        return None

    # Required fields for user creation
    required_fields = ["login", "profile_image_url", "broadcaster_type", "display_name"]
    missing_fields = [field for field in required_fields if field not in user_info]

    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

    try:
        # Try to find existing user with caching
        user_db = await UsersDAO.find_by_twitch_id(session, cache, user_id)

        if not user_db:
            # Create new user if doesn't exist
            user_db = await UsersDAO.add(
                session,
                cache,
                username=user_info["login"],
                avatar_url=user_info["profile_image_url"],
                twitch_id=user_info["id"],
                broadcaster_type=user_info["broadcaster_type"],
                twitch_display_name=user_info["display_name"],
            )

            # Create default overlay settings for new user
            if user_db:
                await OverlaysDAO.add(session, cache, user_id=user_db.id)

        return user_db

    except Exception as e:
        # Log error in production
        raise ValueError(f"Authentication failed: {str(e)}")


async def get_current_user_from_token(session: AsyncSession, token: str) -> Optional[User]:
    """
    Get current user from JWT token with Redis caching.

    Args:
        session: SQLAlchemy async session
        token: JWT access token

    Returns:
        User instance if token is valid, None otherwise
    """
    payload = await decode_access_token(token)
    if not payload:
        return None

    user_id = payload.get("sub")
    if not user_id:
        return None

    try:
        from app.config import redis_connection
        redis_client = await redis_connection.get_redis()
        user = await UsersDAO.find_by_id(session, redis_client, int(user_id))
        return user
    except (ValueError, TypeError):
        return None


async def invalidate_user_sessions(user_id: int) -> None:
    """
    Invalidate all user sessions by adding user to Redis blacklist.

    Args:
        user_id: ID of user whose sessions should be invalidated

    Note:
        This function adds the user to a Redis-based session blacklist.
        Tokens will be checked against this blacklist during validation.
    """
    try:
        from app.config import redis_connection
        redis_client = await redis_connection.get_redis()
        blacklist_key = f"user_session_blacklist:{user_id}"

        # Add user to blacklist with 30 days expiration (max token lifetime)
        await redis_client.setex(blacklist_key, 30 * 24 * 60 * 60, "invalidated")

    except Exception:
        # If Redis is unavailable, fail silently
        # In production, you might want to log this
        pass


async def is_user_session_valid(user_id: int) -> bool:
    """
    Check if user session is valid (not blacklisted).

    Args:
        user_id: ID of user to check

    Returns:
        True if session is valid, False if blacklisted
    """
    try:
        from app.config import redis_connection
        redis_client = await redis_connection.get_redis()
        blacklist_key = f"user_session_blacklist:{user_id}"

        # Check if user is in blacklist
        blacklisted = await redis_client.get(blacklist_key)
        return blacklisted is None

    except Exception:
        # If Redis is unavailable, assume session is valid
        return True


async def refresh_user_cache(session: AsyncSession, user_id: int) -> None:
    """
    Refresh user data in Redis cache after profile updates.

    Args:
        session: SQLAlchemy async session
        user_id: ID of user whose cache should be refreshed
    """
    try:
        from app.config import redis_connection
        redis_client = await redis_connection.get_redis()

        # Invalidate existing cache
        await UsersDAO._invalidate_user_specific_cache(redis_client, user_id)

        # Pre-warm cache with fresh data
        await UsersDAO.find_by_id(session, redis_client, user_id)

    except Exception:
        # If Redis is unavailable, fail silently
        pass

