from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.config import settings
from app.middlewares.permormance import PerformanceMiddleware
from app.routers import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.APP_FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=[
        "Authorization",
        "Content-Type",
        "Accept",
        "Origin",
        "X-Requested-With"
    ],
)

app.add_middleware(PerformanceMiddleware)

app.include_router(api_router, prefix="/api")

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
