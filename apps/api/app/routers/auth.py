import json
from datetime import datetime, timedelta, timezone
import random
import string
from urllib.parse import urlencode

import aiohttp
from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import RedirectResponse
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings, logger
from app.db.database import get_session
from app.db.redis import get_redis
from app.utils.auth import authenticate_user, create_user_session

router = APIRouter()


async def generate_random_string(length: int) -> str:
    """
    Generate a cryptographically secure random alphanumeric string.
    """
    if length <= 0 or length > 128:
        raise ValueError("Length must be between 1 and 128 characters")

    characters = string.ascii_letters + string.digits
    return "".join(random.SystemRandom().choices(characters, k=length))


async def cache_oauth_state(cache: Redis, state: str, ttl: int = 600) -> None:
    """
    Cache OAuth state parameter to prevent CSRF attacks.
    """
    try:
        cache_key = f"oauth_state:{state}"
        await cache.setex(cache_key, ttl, "valid")
        logger.debug(f"OAuth state cached: {state}")
    except Exception as e:
        logger.warning(f"Failed to cache OAuth state: {str(e)}")


async def make_request(
    method: str, url: str, headers: dict | None = None, data: dict | None = None, timeout: int = 30
) -> dict:
    """
    Send an asynchronous HTTP request with improved error handling.
    """
    if not url:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="URL cannot be empty")

    try:
        timeout_config = aiohttp.ClientTimeout(total=timeout)
        async with aiohttp.ClientSession(timeout=timeout_config) as session:
            async with session.request(method, url, headers=headers, data=data) as response:
                response_text = await response.text()

                if response.status != 200:
                    logger.error(f"HTTP {response.status} error for {url}: {response_text}")
                    raise HTTPException(
                        status_code=response.status, detail=f"External API request failed: {response.status}"
                    )

                try:
                    return await response.json()
                except Exception:
                    logger.error(f"Failed to parse JSON response from {url}: {response_text}")
                    raise HTTPException(
                        status_code=status.HTTP_502_BAD_GATEWAY, detail="Invalid response format from external API"
                    )

    except aiohttp.ClientError as e:
        logger.error(f"Client error for {url}: {str(e)}")
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Failed to connect to external service")
    except Exception as e:
        logger.error(f"Unexpected error for {url}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error during external request"
        )


async def fetch_user_info(access_token: str) -> dict | None:
    """
    Fetch Twitch user information using the provided access token.
    """
    if not access_token or not access_token.strip():
        raise ValueError("Access token cannot be empty")

    headers = {
        "Authorization": f"Bearer {access_token.strip()}",
        "Client-Id": settings.TWITCH_CLIENT_ID,
    }

    try:
        data = await make_request("GET", "https://api.twitch.tv/helix/users", headers=headers)
        users_data = data.get("data", [])

        if not users_data:
            logger.warning("No user data returned from Twitch API")
            return None

        user_info = users_data[0]
        logger.info(f"Successfully fetched user info for Twitch ID: {user_info.get('id')}")
        return user_info

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error fetching user info: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch user information"
        )


async def fetch_twitch_token(code: str) -> dict:
    """
    Exchange authorization code for OAuth2 token from Twitch API.
    """
    if not code or not code.strip():
        raise ValueError("Authorization code cannot be empty")

    token_data = {
        "client_id": settings.TWITCH_CLIENT_ID,
        "client_secret": settings.TWITCH_CLIENT_SECRET,
        "code": code.strip(),
        "grant_type": "authorization_code",
        "redirect_uri": settings.REDIRECT_URI,
    }

    try:
        response = await make_request("POST", "https://id.twitch.tv/oauth2/token", data=token_data)

        if not response.get("access_token"):
            logger.error("No access token in Twitch API response")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid authorization code")

        logger.info("Successfully exchanged code for Twitch token")
        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error fetching Twitch token: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to exchange authorization code"
        )


@router.get("/login/twitch", summary="Initiate Twitch OAuth login")
async def twitch_login(cache: Redis = Depends(get_redis)) -> RedirectResponse:
    """
    Redirect user to Twitch authorization page with enhanced security.
    Generates and caches a secure state parameter to prevent CSRF attacks.
    """
    try:
        # Generate cryptographically secure state parameter
        state = await generate_random_string(32)

        # Cache state in Redis for validation
        if cache:
            await cache_oauth_state(cache, state, ttl=600)  # 10 minutes
        else:
            logger.warning("Redis cache not available, continuing without state caching")

        query_params = {
            "response_type": "code",
            "client_id": settings.TWITCH_CLIENT_ID,
            "redirect_uri": settings.REDIRECT_URI,
            "state": state,
            "scope": "user:read:email",
        }

        auth_url = f"https://id.twitch.tv/oauth2/authorize?{urlencode(query_params)}"
        response = RedirectResponse(url=auth_url, status_code=status.HTTP_302_FOUND)

        # Set secure cookie with state
        response.set_cookie(
            "twitch_state",
            value=state,
            max_age=600,  # 10 minutes
            secure=not settings.DEBUG,
            samesite="lax",
            domain="valory.localhost" if settings.DEBUG else ".valory.su",
        )

        logger.info(f"Initiated Twitch OAuth login with state: {state}")
        return response

    except Exception as e:
        logger.error(f"Failed to initiate Twitch login: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to initiate OAuth login")


@router.get("/callback", summary="Handle Twitch OAuth callback")
async def callback(
    request: Request, session: AsyncSession = Depends(get_session), cache: Redis = Depends(get_redis)
) -> RedirectResponse:
    """
    Handle Twitch OAuth callback with enhanced security and Redis caching.
    """
    try:
        # Extract parameters
        code = request.query_params.get("code")
        state = request.query_params.get("state")
        error = request.query_params.get("error")

        # Handle OAuth errors
        if error:
            logger.warning(f"OAuth error received: {error}")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"OAuth authorization failed: {error}")

        # Validate required parameters
        if not code or not state:
            logger.warning("Missing code or state parameter in OAuth callback")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing required OAuth parameters")

        # Validate state parameter against cookie
        cookie_state = request.cookies.get("twitch_state")
        if not cookie_state or state != cookie_state:
            logger.warning(f"State mismatch: cookie={cookie_state}, param={state}")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid state parameter")

        # Validate state parameter against Redis cache (if available)
        if cache:
            state_cache_key = f"oauth_state:{state}"
            cached_state = await cache.get(state_cache_key)

            if not cached_state:
                logger.warning(f"OAuth state not found in cache or expired: {state}")
                # Don't fail if Redis is unavailable, but log the warning
                logger.info("Continuing without Redis state validation")
            else:
                # Remove state from cache to prevent replay attacks
                await cache.delete(state_cache_key)
                logger.debug(f"OAuth state validated and removed from cache: {state}")
        else:
            logger.warning("Redis cache not available, skipping state validation")

        # Check if we have cached token for this code (prevent duplicate processing)
        code_cache_key = f"oauth_code:{code}"
        cached_token = None

        if cache:
            cached_token = await cache.get(code_cache_key)

        if cached_token:
            logger.info(f"Using cached token for code: {code[:10]}...")
            api_response = json.loads(cached_token)
        else:
            # Exchange code for token
            api_response = await fetch_twitch_token(code)

            # Cache the token response for 5 minutes to prevent duplicate requests
            if cache:
                await cache.setex(
                    code_cache_key,
                    300,  # 5 minutes
                    json.dumps(api_response, ensure_ascii=False),
                )
                logger.debug(f"Token response cached for code: {code[:10]}...")

        access_token = api_response.get("access_token")
        if not access_token:
            logger.error("No access token received from Twitch")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to obtain access token")

        # Check if we have cached user info for this token
        user_cache_key = f"twitch_user:{access_token[:20]}"
        cached_user_info = None

        if cache:
            cached_user_info = await cache.get(user_cache_key)

        if cached_user_info:
            logger.debug("Using cached user info")
            user_info = json.loads(cached_user_info)
        else:
            # Fetch user information
            user_info = await fetch_user_info(access_token)
            if not user_info:
                logger.error("Failed to fetch user information from Twitch")
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to fetch user information")

            # Cache user info for 10 minutes
            if cache:
                await cache.setex(
                    user_cache_key,
                    600,  # 10 minutes
                    json.dumps(user_info, ensure_ascii=False),
                )
                logger.debug("User info cached")

        # Authenticate or create user with Redis caching
        user = await authenticate_user(session, cache, user_info)

        if not user:
            logger.error("User authentication failed")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")

        # Cache Twitch access token for potential future use
        if cache:
            twitch_token_key = f"twitch_token:{user.id}"
            await cache.setex(
                twitch_token_key,
                3600,  # 1 hour
                access_token,
            )
            logger.debug(f"Twitch token cached for user {user.id}")

        # Create user session with extended expiration
        session_data = await create_user_session(user, remember_me=True)

        # Cache user session info
        if cache:
            session_cache_key = f"user_session:{user.id}"
            session_info = {
                "user_id": user.id,
                "username": user.username,
                "twitch_id": user.twitch_id,
                "login_time": datetime.now(timezone.utc).isoformat(),
            }
            await cache.setex(
                session_cache_key, session_data["expires_in"], json.dumps(session_info, ensure_ascii=False)
            )

        # Create response
        frontend_url = f"https://{settings.DOMAIN}/callback"
        response = RedirectResponse(url=frontend_url, status_code=status.HTTP_302_FOUND)

        # Set authentication cookie
        expires_time = datetime.now(timezone.utc) + timedelta(seconds=session_data["expires_in"])

        response.set_cookie(
            "Authorization",
            value=session_data["access_token"],
            max_age=session_data["expires_in"],
            expires=expires_time.strftime("%a, %d %b %Y %H:%M:%S GMT"),
            domain="valory.localhost" if settings.DEBUG else ".valory.su",
            path="/",
            samesite="lax",
            secure=not settings.DEBUG,
        )

        # Clean up state cookie
        response.delete_cookie("twitch_state", domain=".valory.su" if not settings.DEBUG else None, path="/")

        # Log successful authentication
        logger.info(f"Successfully authenticated user {user.id} via Twitch OAuth")

        # Increment login counter in cache
        if cache:
            login_counter_key = f"login_count:{user.id}"
            await cache.incr(login_counter_key)
            await cache.expire(login_counter_key, 86400)  # Reset daily

        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in OAuth callback: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error during authentication"
        )
