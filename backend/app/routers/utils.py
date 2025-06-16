from fastapi import APIRouter
from datetime import datetime
import time

router = APIRouter()

@router.get("/ping")
async def ping():
    return {
        "ping": "pong!",
        "timestamp": datetime.now().isoformat(),
        "uptime": time.time(),
        "status": "healthy"
    }