import hashlib
import json
from datetime import datetime, date
from decimal import Decimal

import uuid
from typing import Any, Optional, Type, TypeVar, Sequence, Union, Dict

from redis.asyncio.client import Redis
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql.expression import delete, update

from app.config import settings, logger

T = TypeVar('T')


class BaseDAO:
    """
    Base Data Access Object (DAO) class with Redis caching support.
    Provides basic methods for database operations with intelligent caching layer.

    Attributes:
        model: SQLAlchemy model that this DAO works with
        cache_ttl: Default cache TTL in seconds
        cache_prefix: Prefix for cache keys
    """
    model: Optional[Type[T]] = None
    cache_ttl: int = getattr(settings, 'cache_ttl', 300)  # Default 5 minutes
    cache_prefix: str = ""

    @classmethod
    def _get_cache_prefix(cls) -> str:
        """Get cache prefix for the model."""
        if cls.cache_prefix:
            return cls.cache_prefix
        return cls.model.__name__.lower() if cls.model else "unknown"

    @classmethod
    def _generate_cache_key(cls, operation: str, **kwargs) -> str:
        """
        Generate a unique cache key based on model name, operation and parameters.

        Args:
            operation: Cache operation type (find_by_id, find_one_or_none, etc.)
            **kwargs: Parameters to include in cache key

        Returns:
            Generated cache key
        """
        prefix = cls._get_cache_prefix()

        # Create a deterministic hash from parameters
        params_str = json.dumps(kwargs, sort_keys=True, ensure_ascii=False, default=str)
        params_hash = hashlib.md5(params_str.encode()).hexdigest()[:12]

        return f"{prefix}:{operation}:{params_hash}"

    @classmethod
    def _serialize_for_cache(cls, obj: Any) -> str:
        """
        Serialize object for Redis storage with proper type handling.

        Args:
            obj: Object to serialize

        Returns:
            JSON string representation
        """

        def json_serializer(obj):
            """Custom JSON serializer for various Python types."""
            if isinstance(obj, uuid.UUID):
                return str(obj)
            elif isinstance(obj, (datetime, date)):
                return obj.isoformat()
            elif isinstance(obj, Decimal):
                return float(obj)
            elif hasattr(obj, '__dict__'):
                return cls._model_to_dict(obj)
            return str(obj)

        return json.dumps(obj, ensure_ascii=False, default=json_serializer)

    @classmethod
    def _deserialize_from_cache(cls, data: str) -> Any:
        """
        Deserialize object from Redis storage.

        Args:
            data: JSON string from cache

        Returns:
            Deserialized object
        """
        try:
            return json.loads(data)
        except (json.JSONDecodeError, TypeError) as e:
            logger.warning(f"Failed to deserialize cache data: {str(e)}")
            return None

    @classmethod
    def _model_to_dict(cls, instance: T) -> Dict[str, Any]:
        """
        Convert SQLAlchemy model instance to dictionary with proper serialization.

        Args:
            instance: Model instance

        Returns:
            Dictionary representation of the instance
        """
        if not instance:
            return {}

        result = {}
        for column in instance.__table__.columns:
            value = getattr(instance, column.name)

            # Handle different data types for JSON serialization
            if isinstance(value, uuid.UUID):
                result[column.name] = str(value)
            elif isinstance(value, (datetime, date)):
                result[column.name] = value.isoformat()
            elif isinstance(value, Decimal):
                result[column.name] = float(value)
            else:
                result[column.name] = value

        return result

    @classmethod
    def _dict_to_model(cls, data: Dict[str, Any]) -> Optional[T]:
        """
        Convert dictionary to SQLAlchemy model instance.

        Args:
            data: Dictionary with model data

        Returns:
            Model instance or None if conversion fails
        """
        if not data or not cls.model:
            return None

        try:
            return cls.model(**data)
        except Exception as e:
            logger.warning(f"Failed to convert dict to model: {str(e)}")
            return None

    @classmethod
    async def _get_from_cache(cls, cache: Optional[Redis], cache_key: str) -> Optional[Any]:
        """
        Get data from Redis cache with error handling.

        Args:
            cache: Redis client instance
            cache_key: Cache key to retrieve

        Returns:
            Cached data or None if not found or error occurred
        """
        if not cache:
            return None

        try:
            cached_data = await cache.get(cache_key)
            if cached_data:
                return cls._deserialize_from_cache(cached_data)
        except Exception as e:
            logger.warning(f"Cache get error for key {cache_key}: {str(e)}")

        return None

    @classmethod
    async def _set_cache(cls, cache: Optional[Redis], cache_key: str, data: Any, ttl: Optional[int] = None) -> None:
        """
        Set data in Redis cache with error handling.

        Args:
            cache: Redis client instance
            cache_key: Cache key to set
            data: Data to cache
            ttl: Time to live in seconds
        """
        if not cache:
            return

        try:
            ttl = ttl or cls.cache_ttl
            serialized_data = cls._serialize_for_cache(data)
            await cache.setex(cache_key, ttl, serialized_data)
            logger.debug(f"Cached data with key: {cache_key}")
        except Exception as e:
            logger.warning(f"Cache set error for key {cache_key}: {str(e)}")

    @classmethod
    async def _invalidate_cache_pattern(cls, cache: Optional[Redis], pattern: str) -> None:
        """
        Invalidate cache keys matching pattern.

        Args:
            cache: Redis client instance
            pattern: Pattern to match cache keys
        """
        if not cache:
            return

        try:
            keys = await cache.keys(pattern)
            if keys:
                await cache.delete(*keys)
                logger.debug(f"Invalidated {len(keys)} cache keys matching pattern: {pattern}")
        except Exception as e:
            logger.warning(f"Cache invalidation error for pattern {pattern}: {str(e)}")

    @classmethod
    async def _invalidate_model_cache(cls, cache: Optional[Redis]) -> None:
        """
        Invalidate all cache entries for this model.

        Args:
            cache: Redis client instance
        """
        if not cache:
            return

        prefix = cls._get_cache_prefix()
        pattern = f"{prefix}:*"
        await cls._invalidate_cache_pattern(cache, pattern)

    @classmethod
    async def find_by_id(cls, session: AsyncSession, cache: Optional[Redis], model_id: Union[int, str, uuid.UUID]) -> \
    Optional[T]:
        """
        Find a record by its ID with caching support.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            model_id: ID of the record to find

        Returns:
            Found record or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        # Generate cache key
        cache_key = cls._generate_cache_key("find_by_id", id=model_id)

        # Try to get from cache first
        cached_data = await cls._get_from_cache(cache, cache_key)
        if cached_data:
            instance = cls._dict_to_model(cached_data)
            if instance:
                logger.debug(f"Cache hit for {cls.model.__name__} ID: {model_id}")
                return instance

        try:
            # Query database
            query = select(cls.model).filter_by(id=model_id)
            result = await session.execute(query)
            instance = result.scalars().one_or_none()

            # Cache the result
            if instance:
                model_dict = cls._model_to_dict(instance)
                await cls._set_cache(cache, cache_key, model_dict)
                logger.debug(f"Database hit for {cls.model.__name__} ID: {model_id}")

            return instance

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in find_by_id: {str(e)}")
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def find_one_or_none(cls, session: AsyncSession, cache: Optional[Redis], **kwargs: Any) -> Optional[T]:
        """
        Find a single record by given criteria with caching support.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            **kwargs: Filter parameters

        Returns:
            Found record or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        # Generate cache key
        cache_key = cls._generate_cache_key("find_one_or_none", **kwargs)

        # Try to get from cache first
        cached_data = await cls._get_from_cache(cache, cache_key)
        if cached_data:
            instance = cls._dict_to_model(cached_data)
            if instance:
                logger.debug(f"Cache hit for {cls.model.__name__} with filters: {kwargs}")
                return instance

        try:
            # Query database
            query = select(cls.model).filter_by(**kwargs)
            result = await session.execute(query)
            instance = result.scalars().one_or_none()

            # Cache the result
            if instance:
                model_dict = cls._model_to_dict(instance)
                await cls._set_cache(cache, cache_key, model_dict)
                logger.debug(f"Database hit for {cls.model.__name__} with filters: {kwargs}")

            return instance

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in find_one_or_none: {str(e)}")
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def find_all(cls, session: AsyncSession, cache: Optional[Redis], limit: Optional[int] = None,
                       offset: Optional[int] = None) -> Sequence[T]:
        """
        Retrieve all records with caching support and pagination.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            limit: Maximum number of records to return
            offset: Number of records to skip

        Returns:
            Sequence of records

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        # Generate cache key
        cache_key = cls._generate_cache_key("find_all", limit=limit, offset=offset)

        # Try to get from cache first
        cached_data = await cls._get_from_cache(cache, cache_key)
        if cached_data and isinstance(cached_data, list):
            instances = [cls._dict_to_model(item) for item in cached_data if item]
            instances = [inst for inst in instances if inst is not None]
            if instances:
                logger.debug(f"Cache hit for {cls.model.__name__} find_all")
                return instances

        try:
            # Query database
            query = select(cls.model)
            if offset:
                query = query.offset(offset)
            if limit:
                query = query.limit(limit)

            result = await session.execute(query)
            instances = result.scalars().all()

            # Cache the result (with shorter TTL for lists)
            if instances:
                models_data = [cls._model_to_dict(instance) for instance in instances]
                await cls._set_cache(cache, cache_key, models_data, ttl=min(cls.cache_ttl, 60))
                logger.debug(f"Database hit for {cls.model.__name__} find_all")

            return instances

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in find_all: {str(e)}")
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def add(cls, session: AsyncSession, cache: Optional[Redis], **data: Any) -> Optional[T]:
        """
        Add a new record and invalidate related cache.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            **data: Data for creating the record

        Returns:
            Created record or None if creation fails

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        try:
            # Insert into database
            query = insert(cls.model).values(**data).returning(cls.model)
            result = await session.execute(query)
            await session.commit()
            instance = result.scalars().first()

            # Invalidate related caches
            await cls._invalidate_model_cache(cache)

            if instance:
                logger.info(f"Created new {cls.model.__name__} record")

            return instance

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in add: {str(e)}")
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def update_by_id(cls, session: AsyncSession, cache: Optional[Redis], model_id: Union[int, str, uuid.UUID],
                           **data: Any) -> Optional[T]:
        """
        Update a record by ID and invalidate related cache.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            model_id: ID of the record to update
            **data: Data to update

        Returns:
            Updated record or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        try:
            # Update in database
            query = update(cls.model).where(cls.model.id == model_id).values(**data).returning(cls.model)
            result = await session.execute(query)
            await session.commit()
            instance = result.scalars().first()

            # Invalidate related caches
            await cls._invalidate_model_cache(cache)

            if instance:
                logger.info(f"Updated {cls.model.__name__} record ID: {model_id}")

            return instance

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in update_by_id: {str(e)}")
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def delete_by_id(cls, session: AsyncSession, cache: Optional[Redis],
                           model_id: Union[int, str, uuid.UUID]) -> bool:
        """
        Delete a record by ID and invalidate related cache.

        Args:
            session: Async SQLAlchemy session
            cache: Redis cache instance
            model_id: ID of the record to delete

        Returns:
            True if record was deleted, False if not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        try:
            # Delete from database
            query = delete(cls.model).where(cls.model.id == model_id)
            result = await session.execute(query)
            await session.commit()

            deleted = result.rowcount > 0

            # Invalidate related caches
            if deleted:
                await cls._invalidate_model_cache(cache)
                logger.info(f"Deleted {cls.model.__name__} record ID: {model_id}")

            return deleted

        except SQLAlchemyError as e:
            await session.rollback()
            logger.error(f"Database error in delete_by_id: {str(e)}")
            raise SQLAlchemyError(f"Database error: {str(e)}")
