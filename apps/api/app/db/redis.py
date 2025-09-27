from redis.asyncio import Redis, ConnectionPool
from typing import Optional
import logging

from app.config import redis_url

logger = logging.getLogger(__name__)


class RedisManager:
    def __init__(self):
        self.redis: Optional[Redis] = None
        self.connection_pool: Optional[ConnectionPool] = None

    async def connect(self):
        """Connect to Redis with optimized connection pool"""
        try:
            # Create connection pool with optimized settings
            self.connection_pool = ConnectionPool.from_url(
                redis_url,
                encoding="utf-8", 
                decode_responses=True,
                max_connections=20,  # Pool size
                retry_on_timeout=True,
                retry_on_error=[ConnectionError, TimeoutError],
                health_check_interval=30,  # Health check every 30 seconds
                socket_keepalive=True,
                socket_keepalive_options={
                    1: 1,  # TCP_KEEPIDLE
                    2: 3,  # TCP_KEEPINTVL  
                    3: 5   # TCP_KEEPCNT
                },
                socket_connect_timeout=5,
                socket_timeout=5
            )
            
            self.redis = Redis(connection_pool=self.connection_pool)
            
            # Test connection
            await self.redis.ping()
            logger.info("Redis connection established successfully")
            
        except Exception as e:
            logger.error(f"Failed to connect to Redis: {str(e)}")
            raise

    async def disconnect(self):
        """Disconnect from Redis and close connection pool"""
        try:
            if self.redis:
                await self.redis.close()
                logger.info("Redis connection closed")
                
            if self.connection_pool:
                await self.connection_pool.disconnect()
                logger.info("Redis connection pool closed")
                
        except Exception as e:
            logger.error(f"Error closing Redis connection: {str(e)}")

    async def get_redis(self) -> Redis:
        """Get Redis instance, connecting if not already connected."""
        if not self.redis:
            await self.connect()
        return self.redis

    async def health_check(self) -> bool:
        """Check if Redis connection is healthy"""
        try:
            if self.redis:
                await self.redis.ping()
                return True
        except Exception as e:
            logger.warning(f"Redis health check failed: {str(e)}")
            return False
        return False

async def get_redis() -> Redis:
    return await redis_manager.get_redis()

redis_manager = RedisManager()
