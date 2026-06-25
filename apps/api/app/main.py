from fastapi import FastAPI

from app.api.router import api_router


def create_application() -> FastAPI:
    application = FastAPI(
        title="Khasandjon Babadzhanov — Portfolio API",
        description=(
            "Backend service for the portfolio contact form and synthetic demonstration API."
        ),
        version="0.1.0",
        docs_url="/api/docs",
        openapi_url="/api/openapi.json",
        redoc_url=None,
    )

    application.include_router(api_router)

    return application


app = create_application()
