from typing import Literal

from app.domain.roles import DemoRole
from app.schemas.base import ApiModel


class HealthResponse(ApiModel):
    status: Literal[
        "ok",
        "ready",
        "unavailable",
    ]

    service: str
    version: str
    checks: dict[str, str]


class ApiResourceLinks(ApiModel):
    departments: str
    employees: str
    audit_events: str
    jobs: str


class ApiMetadataResponse(ApiModel):
    name: str
    version: str
    data_policy: str
    documentation: str
    resources: ApiResourceLinks


class PermissionAction(ApiModel):
    action: str
    viewer: bool
    manager: bool
    admin: bool


class PermissionsResponse(ApiModel):
    header: str
    disclaimer: str
    roles: list[DemoRole]
    actions: list[PermissionAction]
