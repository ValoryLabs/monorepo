from enum import Enum
from typing import Optional
from pydantic import BaseModel

class SortBy(str, Enum):
    """Enum for sorting options."""
    followers = "followers"
    viewers = "viewers"
    username = "username"
    live_status = "live_status"

class SortOrder(str, Enum):
    """Enum for sort direction."""
    asc = "asc"
    desc = "desc"

class StreamerResponse(BaseModel):
    username: str
    followers: str
    img: str
    live: bool
    verified: bool
    viewers: Optional[int] = None