import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.core.demo_safety import (
    DemoBodyLimitMiddleware,
    DemoRateLimitMiddleware,
)
from app.core.errors import register_exception_handlers
from app.core.logging import configure_logging
from app.core.request_id import RequestIdMiddleware
from app.db.session import dispose_engine


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    settings = get_settings()
    logger = logging.getLogger("portfolio.api")

    logger.info(
        "API started",
        extra={
            "environment": settings.environment,
            "version": settings.app_version,
        },
    )

    try:
        yield
    finally:
        await dispose_engine()
        logger.info("API stopped")


def create_application() -> FastAPI:
    settings = get_settings()

    configure_logging(settings.log_level)

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description=(
            "A public FastAPI demonstration using synthetic data only. "
            "The role header used by later endpoints demonstrates "
            "authorization behavior and is not a production "
            "authentication system."
        ),
        debug=settings.debug,
        docs_url=settings.docs_url,
        redoc_url=None,
        openapi_url=settings.openapi_url,
        lifespan=lifespan,
        openapi_tags=[
            {
                "name": "Health",
                "description": "Liveness and readiness checks.",
            },
            {
                "name": "Demo Metadata",
                "description": ("Public information about the synthetic demonstration API."),
            },
            {
                "name": "Departments",
                "description": ("Synthetic department management endpoints."),
            },
            {
                "name": "Employees",
                "description": ("Synthetic employee management endpoints."),
            },
            {
                "name": "Audit Events",
                "description": ("Read-only synthetic audit history."),
            },
            {
                "name": "Background Jobs",
                "description": (
                    "Database-backed simulated background processing with polling and idempotency."
                ),
            },
        ],
    )

    app.add_middleware(
        DemoBodyLimitMiddleware,
        max_bytes=settings.demo_json_body_limit_bytes,
    )

    app.add_middleware(
        DemoRateLimitMiddleware,
        read_limit=settings.demo_read_rate_limit,
        write_limit=settings.demo_write_rate_limit,
        job_limit=settings.demo_job_rate_limit,
        window_seconds=settings.demo_rate_limit_window_seconds,
        salt=settings.demo_rate_limit_salt,
    )

    app.add_middleware(RequestIdMiddleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=False,
        allow_methods=[
            "GET",
            "POST",
            "PATCH",
            "OPTIONS",
        ],
        allow_headers=[
            "Content-Type",
            "X-Demo-Role",
            "X-Request-ID",
            "Idempotency-Key",
        ],
        expose_headers=[
            "X-Request-ID",
            "X-RateLimit-Limit",
            "X-RateLimit-Remaining",
            "Retry-After",
            "Idempotency-Replayed",
        ],
    )

    app.add_middleware(RequestIdMiddleware)

    register_exception_handlers(app)

    app.include_router(api_router)

    return app


app = create_application()
