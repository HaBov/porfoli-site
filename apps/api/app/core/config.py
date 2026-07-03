from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="PORTFOLIO_API_",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "Portfolio Demo API"
    app_version: str = "1.0.0"

    environment: Literal[
        "development",
        "test",
        "production",
    ] = "development"

    debug: bool = False
    log_level: str = "INFO"

    database_url: str = (
        "postgresql+asyncpg://portfolio_demo:portfolio_demo_local@127.0.0.1:5433/portfolio_demo"
    )

    database_echo: bool = False

    database_pool_size: int = Field(
        default=5,
        ge=1,
        le=20,
    )

    database_max_overflow: int = Field(
        default=5,
        ge=0,
        le=20,
    )

    cors_origins: list[str] = Field(
        default_factory=lambda: [
            "http://localhost:3000",
        ]
    )

    docs_url: str = "/api/docs"
    openapi_url: str = "/api/openapi.json"


@lru_cache
def get_settings() -> Settings:
    return Settings()
