from fastapi import APIRouter

from app.api.routes import (
    audit_events,
    demo,
    departments,
    employees,
    health,
)

api_router = APIRouter()

api_router.include_router(health.router)

api_router.include_router(demo.router)

api_router.include_router(departments.router)

api_router.include_router(employees.router)

api_router.include_router(audit_events.router)
