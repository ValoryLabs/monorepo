import asyncio
from typing import List, Dict, Any

import aiohttp

from app.config import settings, logger


class TwitchAPIClient:
    """Client for interacting with Twitch API."""

    def __init__(self):
        self.access_token = settings.TWITCH_ACCESS_TOKEN
        self.client_id = settings.TWITCH_CLIENT_ID_FOR_CLIENT

    async def _create_session(self) -> aiohttp.ClientSession:
        """Create a new HTTP session with proper timeout and connector settings."""
        timeout = aiohttp.ClientTimeout(total=30, connect=10)
        connector = aiohttp.TCPConnector(
            limit=10,
            limit_per_host=5,
            ttl_dns_cache=300,
            use_dns_cache=True,
            keepalive_timeout=30,
            enable_cleanup_closed=True
        )

        return aiohttp.ClientSession(
            timeout=timeout,
            connector=connector,
            headers={'User-Agent': 'Valory-API/1.0'}
        )

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

                session = await self._create_session()
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
                    await session.close()
                    # Small delay between chunks to avoid rate limiting
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

                # Create new session for each chunk
                session = await self._create_session()
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
                    await session.close()
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

            session = await self._create_session()
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
                await session.close()
                await asyncio.sleep(0.05)  # Small delay to avoid rate limiting

twitch_client = TwitchAPIClient()
