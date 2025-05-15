from fastapi import APIRouter

from app.routers import auth, overlays, users

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Auth & Tokens"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(overlays.router, prefix="/overlay", tags=["Overlay"])

