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
