from typing import Any, Optional, Type, TypeVar, Sequence
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

T = TypeVar('T')

class BaseDAO:
    """
    Base Data Access Object (DAO) class.
    Provides basic methods for database operations.

    Attributes:
        model: SQLAlchemy model that this DAO works with
    """
    model: Optional[Type[T]] = None

    @classmethod
    async def find_by_id(cls, session: AsyncSession, model_id: int) -> Optional[T]:
        """
        Find a record by its ID.

        Args:
            session: Async SQLAlchemy session
            model_id: ID of the record to find

        Returns:
            Found record or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        try:
            query = select(cls.model).filter_by(id=model_id)
            result = await session.execute(query)
            return result.scalars().one_or_none()
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def find_one_or_none(cls, session: AsyncSession, **kwargs: Any) -> Optional[T]:
        """
        Find a single record by given criteria.

        Args:
            session: Async SQLAlchemy session
            **kwargs: Filter parameters

        Returns:
            Found record or None if not found

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        try:
            query = select(cls.model).filter_by(**kwargs)
            result = await session.execute(query)
            return result.scalars().one_or_none()
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def find_all(cls, session: AsyncSession) -> Sequence[T]:
        """
        Retrieve all records.

        Args:
            session: Async SQLAlchemy session

        Returns:
            Sequence of all records

        Raises:
            SQLAlchemyError: If database operation fails
            ValueError: If model is not defined
        """
        if not cls.model:
            raise ValueError("Model is not defined")

        try:
            query = select(cls.model)
            result = await session.execute(query)
            return result.scalars().all()
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Database error: {str(e)}")

    @classmethod
    async def add(cls, session: AsyncSession, **data: Any) -> Optional[T]:
        """
        Add a new record.

        Args:
            session: Async SQLAlchemy session
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
            query = insert(cls.model).values(**data).returning(cls.model)
            result = await session.execute(query)
            await session.commit()
            return result.scalars().first()
        except SQLAlchemyError as e:
            await session.rollback()
            raise SQLAlchemyError(f"Database error: {str(e)}")
