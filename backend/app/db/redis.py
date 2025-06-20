from redis.asyncio import Redis, ConnectionPool
from typing import Optional

from app.config import redis_url


class RedisManager:
    def __init__(self):
        self.redis: Optional[Redis] = None
        self.redis_pool: Optional[ConnectionPool] = None

    async def connect(self):
        """Connect to Redis"""
        self.redis_pool = ConnectionPool.from_url(redis_url, encoding="utf-8", decode_responses=True, max_connections=20)
        self.redis = Redis.from_url(redis_url, encoding="utf-8", decode_responses=True, connection_pool=self.redis_pool)

    async def disconnect(self):
        """Disconnect from Redis"""
        if self.redis:
            await self.redis.close()

    async def get_redis(self) -> Redis:
        """Get Redis instance, connecting if not already connected."""
        return self.redis

async def get_redis() -> Redis:
    return await redis_manager.get_redis()

redis_manager = RedisManager()
