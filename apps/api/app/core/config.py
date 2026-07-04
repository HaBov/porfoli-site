from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)


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

    demo_json_body_limit_bytes: int = Field(
        default=65_536,
        ge=1_024,
        le=1_048_576,
    )

    demo_read_rate_limit: int = Field(
        default=60,
        ge=1,
        le=1_000,
    )

    demo_write_rate_limit: int = Field(
        default=10,
        ge=1,
        le=1_000,
    )

    demo_job_rate_limit: int = Field(
        default=3,
        ge=1,
        le=100,
    )

    demo_rate_limit_window_seconds: int = Field(
        default=60,
        ge=10,
        le=3_600,
    )

    demo_rate_limit_salt: str = Field(
        default="portfolio-demo-development",
        min_length=16,
        max_length=256,
    )

    demo_idempotency_ttl_hours: int = Field(
        default=24,
        ge=1,
        le=168,
    )

    demo_job_queue_seconds: float = Field(
        default=1.0,
        ge=0.1,
        le=30.0,
    )

    demo_job_completion_seconds: float = Field(
        default=4.0,
        ge=1.0,
        le=120.0,
    )

    docs_url: str = "/api/docs"
    openapi_url: str = "/api/openapi.json"


@lru_cache
def get_settings() -> Settings:
    return Settings()
