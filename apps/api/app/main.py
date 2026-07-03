import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.core.errors import register_exception_handlers
from app.core.logging import configure_logging
from app.core.request_id import RequestIdMiddleware


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

    yield

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
        ],
    )

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
        ],
    )

    app.add_middleware(RequestIdMiddleware)

    register_exception_handlers(app)

    app.include_router(api_router)

    return app


app = create_application()
