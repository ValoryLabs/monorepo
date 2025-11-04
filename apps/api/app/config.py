import logging
from pathlib import Path
import os

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


if os.getenv("DOCKER_ENV"):
    BASE_DIR = Path("/app")
else:
    BASE_DIR = Path(__file__).resolve().parents[3]

ENV_FILE = BASE_DIR / ".env"
LOG_FILE_PATH = BASE_DIR / "log.txt"


class Settings(BaseSettings):
    DEBUG: bool = False

    DOMAIN: str
    API_DOMAIN: str

    DATABASE_HOST: str = "localhost"
    DATABASE_USER: str = "user"
    DATABASE_PASSWORD: str = "password"
    DATABASE_PORT: int = 5432
    DATABASE_NAME: str = "database"

    REDIS_HOST: str = "localhost"
    REDIS_USER: str = "default"
    REDIS_PASSWORD: str = "password"
    REDIS_PORT: int = 6379

    TWITCH_CLIENT_ID: str
    TWITCH_CLIENT_SECRET: str
    TWITCH_CLIENT_ID_FOR_CLIENT: str
    TWITCH_ACCESS_TOKEN: str

    SECRET_KEY: str
    ALGORITHM: str

    CACHE_TTL: int = 60 * 60 * 24 * 31

    SCHEDULER_UPDATE_INTERVAL: int = 30
    SCHEDULER_ENABLED: bool = True

    model_config = SettingsConfigDict(env_file=ENV_FILE, extra="ignore")

    @computed_field
    @property
    def REDIRECT_URI(self) -> str:
        return f"{self.API_DOMAIN}/api/auth/callback"

    @computed_field
    @property
    def DB_URL(self) -> str:
        return f"postgresql+asyncpg://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

    @computed_field
    @property
    def REDIS_URL(self) -> str:
        if self.DEBUG or (self.REDIS_PASSWORD and self.REDIS_USER and self.REDIS_HOST):
            return f"redis://{self.REDIS_USER}:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}/0"
        else:
            raise ValueError("REDIS_PASSWORD or REDIS_USER or REDIS_HOST is not set")


def setup_logging():
    """Setup logging configuration."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(LOG_FILE_PATH),
            logging.StreamHandler(),
        ],
    )

    # Set specific log levels
    logging.getLogger("apscheduler").setLevel(logging.WARNING)
    logging.getLogger("aiohttp").setLevel(logging.WARNING)


setup_logging()
logger = logging.getLogger(__name__)
settings = Settings()
database_url = settings.DB_URL
redis_url = settings.REDIS_URL
