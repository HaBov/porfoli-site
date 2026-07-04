from datetime import datetime
from typing import Self
from uuid import UUID

from pydantic import (
    Field,
    JsonValue,
    model_validator,
)

from app.models import JobStatus, JobType
from app.schemas.base import (
    ApiModel,
    RequestModel,
)


class JobCreate(RequestModel):
    type: JobType

    parameters: dict[str, JsonValue] = Field(
        default_factory=dict,
        max_length=8,
    )

    @model_validator(mode="after")
    def validate_parameters(self) -> Self:
        allowed_parameters = {
            JobType.EMPLOYEE_REPORT: {
                "departmentId",
            },
            JobType.DEPARTMENT_SUMMARY: {
                "activeOnly",
            },
            JobType.AUDIT_EXPORT: {
                "entityType",
            },
        }

        unknown_parameters = set(self.parameters) - allowed_parameters[self.type]

        if unknown_parameters:
            names = ", ".join(sorted(unknown_parameters))

            raise ValueError(f"Unsupported job parameters: {names}.")

        for value in self.parameters.values():
            if isinstance(
                value,
                (dict, list),
            ):
                raise ValueError("Nested job parameters are not supported.")

        normalized = dict(self.parameters)

        if self.type == JobType.EMPLOYEE_REPORT:
            department_id = normalized.get("departmentId")

            if department_id is not None:
                try:
                    normalized["departmentId"] = str(UUID(str(department_id)))
                except ValueError as error:
                    raise ValueError("departmentId must be a valid UUID.") from error

        if self.type == JobType.DEPARTMENT_SUMMARY:
            active_only = normalized.get("activeOnly")

            if active_only is not None and not isinstance(
                active_only,
                bool,
            ):
                raise ValueError("activeOnly must be boolean.")

        if self.type == JobType.AUDIT_EXPORT:
            entity_type = normalized.get("entityType")

            if entity_type is not None:
                if not isinstance(
                    entity_type,
                    str,
                ):
                    raise ValueError("entityType must be text.")

                entity_type = entity_type.strip()

                if not entity_type:
                    raise ValueError("entityType cannot be empty.")

                if len(entity_type) > 50:
                    raise ValueError("entityType cannot exceed 50 characters.")

                normalized["entityType"] = entity_type

        self.parameters = normalized

        return self


class JobRead(ApiModel):
    id: UUID
    type: JobType
    status: JobStatus
    parameters: dict[str, JsonValue]
    progress: int
    result: dict[str, JsonValue] | None
    error_code: str | None
    created_at: datetime
    started_at: datetime | None
    completed_at: datetime | None


class JobCreateMetadata(ApiModel):
    poll_url: str


class JobCreateResponse(ApiModel):
    data: JobRead
    meta: JobCreateMetadata
