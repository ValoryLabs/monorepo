import json
from typing import List, Optional, Any, Dict
from fastapi import APIRouter, Depends, Query, HTTPException

from redis.asyncio import Redis

from app.config import logger
from app.db.redis import get_redis
from app.schemas.streamers import StreamerResponse, SortBy, SortOrder
from app.utils.twitch_client import twitch_client

router = APIRouter()
STREAMER_USERNAMES = [
    "hardywtffell", "akakiryuuu", "akaira", "samuraj", "pa1ka", "hiemo0",
    "averash1", "MAGICXcmd", "TimoshkaXgenius", "kirisaa", "mplatooo",
    "sharrny", "Sindics", "asyouwisxh", "hytaim", "d3nzvlr", "keilaqt",
    "poluvme", "kkkayten", "ssshapa", "pyrolll", "batujnax", "q1ngvl",
    "4min21sec", "ka1davl", "kospa1n", "callmeakumu", "yoh7zzz", "pholmys",
    "dukynho", "digisaka"
]


def format_follower_count(count: int) -> str:
    """Format follower count to human readable string."""
    if count >= 1000000:
        return f"{count / 1000000:.1f}M"
    elif count >= 1000:
        return f"{count / 1000:.1f}k"
    else:
        return str(count)


async def update_streamers_cache(cache: Redis | None) -> list[Any]:
    """Update streamers data in cache by fetching from Twitch API."""
    try:
        logger.info("Updating streamers cache from Twitch API")

        # Get streams status
        streams_data = await twitch_client.get_streams_status(STREAMER_USERNAMES)

        # Get users info
        users_data = await twitch_client.get_users_info(STREAMER_USERNAMES)

        # Combine data
        combined_data = []
        for username in STREAMER_USERNAMES:
            stream_info = streams_data.get(username, {})
            user_info = users_data.get(username, {})

            streamer_data = {
                "username": username,
                "followers": format_follower_count(user_info.get("followers", 0)),
                "img": user_info.get("profile_image_url", ""),
                "live": stream_info.get("live", False),
                "verified": user_info.get("verified", False),
                "viewers": stream_info.get("viewers"),
                "game": stream_info.get("game"),
                "title": stream_info.get("title")
            }
            combined_data.append(streamer_data)

        # Cache the data for 5 minutes
        if cache:
            import json
            await cache.setex(
                "streamers:live_data",
                300,  # 5 minutes
                json.dumps(combined_data, ensure_ascii=False)
            )
            logger.info(f"Updated cache with {len(combined_data)} streamers")

        return combined_data

    except Exception as e:
        logger.error(f"Failed to update streamers cache: {str(e)}")
        return []


async def get_cached_streamers_data(cache: Redis, refresh_cache: bool = False) -> List[Dict[str, Any]]:
    """Get streamers data from cache or fetch from API if not cached or refresh requested."""
    if not cache:
        return await update_streamers_cache(None)

    try:
        import json

        # If refresh is requested, skip cache and fetch fresh data
        if refresh_cache:
            logger.info("Cache refresh requested, fetching fresh data from Twitch API")
            return await update_streamers_cache(cache)

        cached_data = await cache.get("streamers:live_data")

        if cached_data:
            logger.debug("Cache hit for streamers data")
            return json.loads(cached_data)
        else:
            logger.debug("Cache miss, fetching from Twitch API")
            return await update_streamers_cache(cache)

    except Exception as e:
        logger.error(f"Cache error: {str(e)}")
        return await update_streamers_cache(cache)


@router.get("/online", response_model=List[StreamerResponse], summary="Get online streamers")
async def get_online_streamers(
        limit: Optional[int] = Query(None, ge=1, le=100, description="Limit number of streamers returned"),
        verified_only: bool = Query(False, description="Return only verified streamers"),
        refresh_cache: bool = Query(False, description="Force refresh cache from Twitch API"),
        cache: Redis = Depends(get_redis)
) -> List[StreamerResponse]:
    """
    Get list of streamers who are currently live streaming.
    Data is fetched in real-time from Twitch API.

    Args:
        limit: Maximum number of streamers to return
        verified_only: Return only verified streamers
        refresh_cache: Force refresh cache from Twitch API
        cache: Redis cache instance
    """
    try:
        # Get fresh data from cache or API
        streamers_data = await get_cached_streamers_data(cache, refresh_cache)

        # Filter online streamers
        online_streamers = [s for s in streamers_data if s["live"]]

        # Filter by verified status if requested
        if verified_only:
            online_streamers = [s for s in online_streamers if s["verified"]]

        # Sort by viewer count (descending) for live streamers
        online_streamers.sort(key=lambda x: x.get("viewers", 0), reverse=True)

        # Apply limit if specified
        if limit:
            online_streamers = online_streamers[:limit]

        return [StreamerResponse(**streamer) for streamer in online_streamers]

    except Exception as e:
        logger.error(f"Error getting online streamers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get online streamers")


@router.get("/", response_model=List[StreamerResponse], summary="Get all streamers")
async def get_all_streamers(
        live_only: bool = Query(False, description="Return only live streamers"),
        verified_only: bool = Query(False, description="Return only verified streamers"),
        limit: Optional[int] = Query(None, ge=1, le=100, description="Limit number of streamers returned"),
        refresh_cache: bool = Query(False, description="Force refresh cache from Twitch API"),
        cache: Redis = Depends(get_redis)
) -> List[StreamerResponse]:
    """
    Get list of all streamers with real-time data from Twitch API.

    Args:
        live_only: Return only live streamers
        verified_only: Return only verified streamers
        limit: Maximum number of streamers to return
        refresh_cache: Force refresh cache from Twitch API
        cache: Redis cache instance
    """
    try:
        # Get fresh data from cache or API
        streamers_data = await get_cached_streamers_data(cache, refresh_cache)

        # Apply filters
        filtered_streamers = streamers_data

        if live_only:
            filtered_streamers = [s for s in filtered_streamers if s["live"]]

        if verified_only:
            filtered_streamers = [s for s in filtered_streamers if s["verified"]]

        # Sort by live status first, then by viewers/followers
        def sort_key(streamer):
            if streamer["live"]:
                return (1, streamer.get("viewers", 0))
            else:
                # Parse follower count for sorting offline streamers
                followers_str = streamer["followers"]
                if followers_str.endswith('k'):
                    return (0, float(followers_str[:-1]) * 1000)
                elif followers_str.endswith('M'):
                    return (0, float(followers_str[:-1]) * 1000000)
                else:
                    return (0, int(followers_str) if followers_str.isdigit() else 0)

        filtered_streamers.sort(key=sort_key, reverse=True)

        # Apply limit if specified
        if limit:
            filtered_streamers = filtered_streamers[:limit]

        return [StreamerResponse(**streamer) for streamer in filtered_streamers]

    except Exception as e:
        logger.error(f"Error getting streamers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get streamers")


@router.get("/stats", summary="Get streamers statistics")
async def get_streamers_stats(
        refresh_cache: bool = Query(False, description="Force refresh cache from Twitch API"),
        cache: Redis = Depends(get_redis)
) -> dict:
    """
    Get real-time statistics about streamers.

    Args:
        refresh_cache: Force refresh cache from Twitch API
        cache: Redis cache instance
    """
    try:
        # Get fresh data from cache or API
        streamers_data = await get_cached_streamers_data(cache, refresh_cache)

        total_streamers = len(streamers_data)
        online_streamers = len([s for s in streamers_data if s["live"]])
        verified_streamers = len([s for s in streamers_data if s["verified"]])
        verified_online = len([s for s in streamers_data if s["live"] and s["verified"]])

        # Calculate total viewers for online streams
        total_viewers = sum(s.get("viewers", 0) for s in streamers_data if s["live"] and s.get("viewers"))

        stats = {
            "total_streamers": total_streamers,
            "online_streamers": online_streamers,
            "offline_streamers": total_streamers - online_streamers,
            "verified_streamers": verified_streamers,
            "verified_online": verified_online,
            "total_viewers": total_viewers,
            "online_percentage": round((online_streamers / total_streamers) * 100, 2) if total_streamers > 0 else 0,
            "verified_percentage": round((verified_streamers / total_streamers) * 100, 2) if total_streamers > 0 else 0,
            "last_updated": "real-time",
            "cache_refreshed": refresh_cache
        }

        return stats

    except Exception as e:
        logger.error(f"Error getting streamers stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get streamers statistics")


def parse_follower_count(followers_str: str) -> int:
    """Parse follower count string to integer for sorting."""
    if not followers_str:
        return 0

    try:
        if followers_str.endswith('M'):
            return int(float(followers_str[:-1]) * 1000000)
        elif followers_str.endswith('k'):
            return int(float(followers_str[:-1]) * 1000)
        else:
            return int(followers_str) if followers_str.isdigit() else 0
    except (ValueError, TypeError):
        return 0


def sort_streamers(streamers_data: List[Dict[str, Any]], sort_by: SortBy, sort_order: SortOrder) -> List[
    Dict[str, Any]]:
    """Sort streamers data by specified criteria."""

    def get_sort_key(streamer):
        if sort_by == SortBy.followers:
            return parse_follower_count(streamer.get("followers", "0"))
        elif sort_by == SortBy.viewers:
            return streamer.get("viewers", 0) or 0
        elif sort_by == SortBy.username:
            return streamer.get("username", "").lower()
        elif sort_by == SortBy.live_status:
            # Live streamers first (1), then offline (0)
            return int(streamer.get("live", False))
        else:
            return 0

    reverse = sort_order == SortOrder.desc
    return sorted(streamers_data, key=get_sort_key, reverse=reverse)


@router.get("/sorted", response_model=List[StreamerResponse], summary="Get sorted streamers")
async def get_sorted_streamers(
        sort_by: SortBy = Query(SortBy.followers, description="Sort streamers by field"),
        sort_order: SortOrder = Query(SortOrder.desc, description="Sort direction"),
        live_only: bool = Query(False, description="Return only live streamers"),
        verified_only: bool = Query(False, description="Return only verified streamers"),
        limit: Optional[int] = Query(None, ge=1, le=100, description="Limit number of streamers returned"),
        refresh_cache: bool = Query(False, description="Force refresh cache from Twitch API"),
        cache: Redis = Depends(get_redis)
) -> List[StreamerResponse]:
    """
    Get list of streamers sorted by specified criteria.

    Args:
        sort_by: Field to sort by (followers, viewers, username, live_status)
        sort_order: Sort direction (asc, desc)
        live_only: Return only live streamers
        verified_only: Return only verified streamers
        limit: Maximum number of streamers to return
        refresh_cache: Force refresh cache from Twitch API
        cache: Redis cache instance
    """
    try:
        # Get fresh data from cache or API
        streamers_data = await get_cached_streamers_data(cache, refresh_cache)

        # Apply filters
        filtered_streamers = streamers_data

        if live_only:
            filtered_streamers = [s for s in filtered_streamers if s.get("live", False)]

        if verified_only:
            filtered_streamers = [s for s in filtered_streamers if s.get("verified", False)]

        # Sort streamers
        sorted_streamers = sort_streamers(filtered_streamers, sort_by, sort_order)

        # Apply limit if specified
        if limit:
            sorted_streamers = sorted_streamers[:limit]

        return [StreamerResponse(**streamer) for streamer in sorted_streamers]

    except Exception as e:
        logger.error(f"Error getting sorted streamers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get sorted streamers")


@router.get("/top", response_model=List[StreamerResponse], summary="Get top streamers")
async def get_top_streamers(
        by: SortBy = Query(SortBy.followers, description="Criteria for top streamers"),
        limit: int = Query(10, ge=1, le=50, description="Number of top streamers to return"),
        live_only: bool = Query(False, description="Consider only live streamers"),
        verified_only: bool = Query(False, description="Consider only verified streamers"),
        refresh_cache: bool = Query(False, description="Force refresh cache from Twitch API"),
        cache: Redis = Depends(get_redis)
) -> List[StreamerResponse]:
    """
    Get top streamers by specified criteria.

    Args:
        by: Criteria for ranking (followers, viewers, etc.)
        limit: Number of top streamers to return
        live_only: Consider only live streamers
        verified_only: Consider only verified streamers
        refresh_cache: Force refresh cache from Twitch API
        cache: Redis cache instance
    """
    try:
        # Get fresh data from cache or API
        streamers_data = await get_cached_streamers_data(cache, refresh_cache)

        # Apply filters
        filtered_streamers = streamers_data

        if live_only:
            filtered_streamers = [s for s in filtered_streamers if s.get("live", False)]

        if verified_only:
            filtered_streamers = [s for s in filtered_streamers if s.get("verified", False)]

        # Sort by specified criteria (always descending for "top")
        sorted_streamers = sort_streamers(filtered_streamers, by, SortOrder.desc)

        # Return top N streamers
        top_streamers = sorted_streamers[:limit]

        return [StreamerResponse(**streamer) for streamer in top_streamers]

    except Exception as e:
        logger.error(f"Error getting top streamers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get top streamers")


@router.get("/mixed-sort", response_model=List[StreamerResponse], summary="Get streamers with mixed sorting")
async def get_mixed_sorted_streamers(
        primary_sort: SortBy = Query(SortBy.live_status, description="Primary sort criteria"),
        secondary_sort: SortBy = Query(SortBy.followers, description="Secondary sort criteria"),
        sort_order: SortOrder = Query(SortOrder.desc, description="Sort direction"),
        verified_only: bool = Query(False, description="Return only verified streamers"),
        limit: Optional[int] = Query(None, ge=1, le=100, description="Limit number of streamers returned"),
        refresh_cache: bool = Query(False, description="Force refresh cache from Twitch API"),
        cache: Redis = Depends(get_redis)
) -> List[StreamerResponse]:
    """
    Get streamers with mixed sorting (e.g., live status first, then by followers).

    Args:
        primary_sort: Primary sort criteria
        secondary_sort: Secondary sort criteria
        sort_order: Sort direction
        verified_only: Return only verified streamers
        limit: Maximum number of streamers to return
        refresh_cache: Force refresh cache from Twitch API
        cache: Redis cache instance
    """
    try:
        # Get fresh data from cache or API
        streamers_data = await get_cached_streamers_data(cache, refresh_cache)

        # Filter by verified status if requested
        if verified_only:
            streamers_data = [s for s in streamers_data if s.get("verified", False)]

        # Mixed sorting function
        def mixed_sort_key(streamer):
            primary_val = 0
            secondary_val = 0

            # Primary sort value
            if primary_sort == SortBy.live_status:
                primary_val = int(streamer.get("live", False))
            elif primary_sort == SortBy.followers:
                primary_val = parse_follower_count(streamer.get("followers", "0"))
            elif primary_sort == SortBy.viewers:
                primary_val = streamer.get("viewers", 0) or 0
            elif primary_sort == SortBy.username:
                primary_val = streamer.get("username", "").lower()

            # Secondary sort value
            if secondary_sort == SortBy.live_status:
                secondary_val = int(streamer.get("live", False))
            elif secondary_sort == SortBy.followers:
                secondary_val = parse_follower_count(streamer.get("followers", "0"))
            elif secondary_sort == SortBy.viewers:
                secondary_val = streamer.get("viewers", 0) or 0
            elif secondary_sort == SortBy.username:
                secondary_val = streamer.get("username", "").lower()

            return (primary_val, secondary_val)

        reverse = sort_order == SortOrder.desc
        sorted_streamers = sorted(streamers_data, key=mixed_sort_key, reverse=reverse)

        # Apply limit if specified
        if limit:
            sorted_streamers = sorted_streamers[:limit]

        return [StreamerResponse(**streamer) for streamer in sorted_streamers]

    except Exception as e:
        logger.error(f"Error getting mixed sorted streamers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get mixed sorted streamers")

