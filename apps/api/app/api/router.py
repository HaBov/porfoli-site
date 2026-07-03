from fastapi import APIRouter

from app.api.routes import (
    demo,
    departments,
    health,
)

api_router = APIRouter()

api_router.include_router(health.router)

api_router.include_router(demo.router)

api_router.include_router(departments.router)
