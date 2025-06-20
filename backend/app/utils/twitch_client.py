from typing import List, Dict, Any

import aiohttp

from app.config import settings, logger


class TwitchAPIClient:
    """Client for interacting with Twitch API."""

    def __init__(self):
        self.access_token = settings.TWITCH_ACCESS_TOKEN
        self.client_id = settings.TWITCH_CLIENT_ID_FOR_CLIENT


    async def get_streams_status(self, usernames: List[str]) -> Dict[str, Dict[str, Any]]:
        """Get live status for multiple streamers."""
        if not usernames:
            return {}

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

            async with aiohttp.ClientSession() as session:
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

        # Add offline status for streamers not in the response
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

    async def get_users_info(self, usernames: List[str]) -> Dict[str, Dict[str, Any]]:
        """Get user information including follower count and verification status."""
        if not usernames:
            return {}

        headers = {
            "Client-Id": self.client_id,
            "Authorization": f"Bearer {self.access_token}"
        }

        users_data = {}

        # Split usernames into chunks of 100
        for i in range(0, len(usernames), 100):
            chunk = usernames[i:i + 100]

            # Get user basic info
            params = [("login", username) for username in chunk]
            url = "https://api.twitch.tv/helix/users"

            async with aiohttp.ClientSession() as session:
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

                # Get follower counts for each user
                for username, user_data in users_data.items():
                    if "id" in user_data:
                        follower_url = f"https://api.twitch.tv/helix/channels/followers"
                        follower_params = {"broadcaster_id": user_data["id"]}

                        async with session.get(follower_url, headers=headers,
                                               params=follower_params) as follower_response:
                            if follower_response.status == 200:
                                follower_data = await follower_response.json()
                                follower_count = follower_data.get("total", 0)
                                users_data[username]["followers"] = follower_count
                            else:
                                users_data[username]["followers"] = 0

        return users_data

twitch_client = TwitchAPIClient()
