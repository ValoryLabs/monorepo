import asyncio
from typing import List, Dict, Any, Optional
import time
import json

import aiohttp

from app.config import settings, logger


class TwitchAPIClient:
    """Client for interacting with Twitch API with enhanced caching and performance."""

    def __init__(self):
        self.access_token = settings.TWITCH_ACCESS_TOKEN
        self.client_id = settings.TWITCH_CLIENT_ID_FOR_CLIENT
        self._session_cache: Optional[aiohttp.ClientSession] = None
        self._cache_expiry = 0
        self._session_ttl = 300  # 5 minutes session reuse

    async def _create_session(self) -> aiohttp.ClientSession:
        """Create a new HTTP session with optimized performance settings."""
        timeout = aiohttp.ClientTimeout(total=30, connect=10, sock_read=15)
        connector = aiohttp.TCPConnector(
            limit=30,  # Increased connection pool
            limit_per_host=10,  # More connections per host
            ttl_dns_cache=600,  # Cache DNS longer
            use_dns_cache=True,
            keepalive_timeout=60,  # Keep connections alive longer
            enable_cleanup_closed=True,
            force_close=False,  # Reuse connections
            # Performance optimizations
            ssl=False if "localhost" in self.client_id else None,  # Skip SSL for local
            tcp_nodelay=True,  # Disable Nagle's algorithm for lower latency
        )

        return aiohttp.ClientSession(
            timeout=timeout,
            connector=connector,
            headers={
                'User-Agent': 'Valory-API/1.0',
                'Connection': 'keep-alive',  # Explicitly request keep-alive
                'Accept-Encoding': 'gzip, deflate'  # Enable compression
            },
            # Session-level optimizations
            auto_decompress=True,
            trust_env=False,  # Don't check environment for proxy settings
            read_bufsize=65536  # Larger read buffer for better performance
        )

    async def _get_cached_session(self) -> aiohttp.ClientSession:
        """Get a cached session or create a new one if expired."""
        current_time = time.time()
        
        if (self._session_cache is None or 
            current_time > self._cache_expiry or 
            self._session_cache.closed):
            
            # Close old session if it exists
            if self._session_cache and not self._session_cache.closed:
                await self._session_cache.close()
            
            # Create new session
            self._session_cache = await self._create_session()
            self._cache_expiry = current_time + self._session_ttl
            
        return self._session_cache

    async def get_streams_status(self, usernames: List[str]) -> Dict[str, Dict[str, Any]]:
        """Get live status for multiple streamers."""
        if not usernames:
            return {}
        try:
            headers = {
                "Client-Id": self.client_id,
                "Authorization": f"Bearer {self.access_token}"
            }

            # Twitch API allows up to 100 user_login parameters
            streams_data = {}

            # Split usernames into chunks of 100
            for i in range(0, len(usernames), 100):
                chunk = usernames[i:i + 100]

                # Build query parameters
                params = [("user_login", username) for username in chunk]
                url = "https://api.twitch.tv/helix/streams"

                session = await self._get_cached_session()
                try:
                    async with session.get(url, headers=headers, params=params) as response:
                        if response.status == 200:
                            data = await response.json()

                            # Process live streams
                            for stream in data.get("data", []):
                                username = stream["user_login"]
                                streams_data[username] = {
                                    "live": True,
                                    "viewers": stream["viewer_count"],
                                    "game": stream["game_name"],
                                    "title": stream["title"],
                                    "started_at": stream["started_at"]
                                }
                        else:
                            logger.error(f"Failed to get streams data: {response.status}")
                except asyncio.TimeoutError:
                    logger.error(f"Timeout getting streams for chunk {i // 100 + 1}")
                except Exception as e:
                    logger.error(f"Error getting streams for chunk {i // 100 + 1}: {str(e)}")
                finally:
                    # Don't close cached session, just add delay
                    await asyncio.sleep(0.1)

            for username in usernames:
                if username not in streams_data:
                    streams_data[username] = {
                        "live": False,
                        "viewers": None,
                        "game": None,
                        "title": None,
                        "started_at": None
                    }

            return streams_data

        except Exception as e:
            logger.error(f"Error in get_streams_status: {str(e)}")
            return {}

    async def get_users_info(self, usernames: List[str]) -> Dict[str, Dict[str, Any]]:
        """Get user information with proper connection handling."""
        if not usernames:
            return {}

        try:
            headers = {
                "Client-ID": self.client_id,
                "Authorization": f"Bearer {self.access_token}"
            }

            users_data = {}

            # Process in chunks of 100
            for i in range(0, len(usernames), 100):
                chunk = usernames[i:i + 100]

                # Use cached session for better performance
                session = await self._get_cached_session()
                try:
                    # Get user basic info
                    params = [("login", username) for username in chunk]
                    url = "https://api.twitch.tv/helix/users"

                    async with session.get(url, headers=headers, params=params) as response:
                        if response.status == 200:
                            data = await response.json()

                            for user in data.get("data", []):
                                username = user["login"]
                                users_data[username] = {
                                    "id": user["id"],
                                    "display_name": user["display_name"],
                                    "profile_image_url": user["profile_image_url"],
                                    "broadcaster_type": user.get("broadcaster_type", ""),
                                    "verified": user.get("broadcaster_type") in ["partner"]
                                }
                        else:
                            error_text = await response.text()
                            logger.error(f"Failed to get users data: {response.status} - {error_text}")

                except asyncio.TimeoutError:
                    logger.error(f"Timeout getting users for chunk {i // 100 + 1}")
                except Exception as e:
                    logger.error(f"Error getting users for chunk {i // 100 + 1}: {str(e)}")
                finally:
                    # Don't close cached session
                    await asyncio.sleep(0.1)

            # Get follower counts (separate requests due to API limitations)
            await self._get_follower_counts(users_data, headers)

            return users_data

        except Exception as e:
            logger.error(f"Error in get_users_info: {str(e)}")
            return {}

    async def _get_follower_counts(self, users_data: Dict[str, Dict[str, Any]], headers: Dict[str, str]):
        """Get follower counts for users."""
        for username, user_data in users_data.items():
            if "id" not in user_data:
                continue

            session = await self._get_cached_session()
            try:
                follower_url = "https://api.twitch.tv/helix/channels/followers"
                follower_params = {"broadcaster_id": user_data["id"]}

                async with session.get(follower_url, headers=headers, params=follower_params) as response:
                    if response.status == 200:
                        follower_data = await response.json()
                        follower_count = follower_data.get("total", 0)
                        users_data[username]["followers"] = follower_count
                    else:
                        users_data[username]["followers"] = 0

            except Exception as e:
                logger.warning(f"Failed to get followers for {username}: {str(e)}")
                users_data[username]["followers"] = 0
            finally:
                # Don't close cached session
                await asyncio.sleep(0.05)  # Small delay to avoid rate limiting

    async def cleanup(self):
        """Clean up cached session resources."""
        if self._session_cache and not self._session_cache.closed:
            await self._session_cache.close()
            self._session_cache = None

twitch_client = TwitchAPIClient()
