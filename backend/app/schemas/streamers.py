from pydantic import BaseModel

class StreamerResponse(BaseModel):
    """Response model for streamer data."""
    username: str
    followers: str
    img: str
    live: bool
    verified: bool