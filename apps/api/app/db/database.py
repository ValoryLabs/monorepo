from collections.abc import AsyncGenerator
from datetime import datetime

from sqlalchemy import TIMESTAMP, Integer, func
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from app.config import database_url

engine = create_async_engine(
    database_url, 
    pool_pre_ping=True, 
    pool_size=20, 
    max_overflow=30,  # Increased overflow capacity
    pool_recycle=3600,  # Recycle connections every hour
    pool_timeout=30,  # Connection timeout
    echo=False,
    # Query optimization settings
    query_cache_size=1000,  # Cache compiled queries
    connect_args={
        "server_settings": {
            "jit": "off",  # Disable JIT for faster simple queries
            "application_name": "valory_api",
            "timezone": "UTC"
        },
        "command_timeout": 30,
        "prepared_statement_cache_size": 100
    }
)

async_session_factory = async_sessionmaker(
    bind=engine, 
    class_=AsyncSession, 
    expire_on_commit=False,
    autoflush=False,  # Disable autoflush for better performance
    query_cls=None  # Use default query class
)


async def get_session() -> AsyncGenerator:
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


class Base(AsyncAttrs, DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())

    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, server_default=func.now(), onupdate=func.now()
    )

    @classmethod
    @property
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s"
