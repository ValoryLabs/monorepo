from fastapi import APIRouter
from datetime import datetime
from app.db.redis import redis_manager
import time

from app.schedule import streamer_scheduler

router = APIRouter()

@router.get("/ping")
async def ping():
    return {
        "ping": "pong!",
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "uptime": time.time(),
        "scheduler_running": streamer_scheduler.is_running,
        "redis_connected": redis_manager.redis is not None
    }