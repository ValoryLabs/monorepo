from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scalar_fastapi import Layout, Theme, get_scalar_api_reference
import uvicorn

from app.config import logger, settings
from app.db.redis import redis_manager
from app.middlewares.permormance import PerformanceMiddleware
from app.routers import api_router
from app.schedule import streamer_scheduler


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan events."""
    # Startup
    try:
        # Connect to Redis
        await redis_manager.connect()
        logger.info("Redis connection established")

        # Start the streamer update scheduler
        streamer_scheduler.start()
        logger.info("Streamer scheduler started")

    except Exception as e:
        logger.error(f"Error during startup: {str(e)}")

    yield

    # Shutdown
    try:
        # Stop the scheduler first
        streamer_scheduler.stop()
        logger.info("Streamer scheduler stopped")

        # Disconnect from Redis
        await redis_manager.disconnect()
        logger.info("Redis connection closed")

    except Exception as e:
        logger.error(f"Error during shutdown: {str(e)}")


app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"https://{settings.APP_FRONTEND}"] if not settings.DEBUG else ["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=[
        "Authorization",
        "Content-Type",
        "Accept",
        "Origin",
        "X-Requested-With",
    ],
)

app.add_middleware(PerformanceMiddleware)

app.include_router(api_router, prefix="/api")


@app.get("/sdocs", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url, title=app.title, theme=Theme.ALTERNATE, layout=Layout.MODERN
    )


if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        port=8000,
        reload=settings.DEBUG,
        workers=1,
        limit_concurrency=100,
        limit_max_requests=1000,
        timeout_keep_alive=5,
        access_log=settings.DEBUG,
    )
