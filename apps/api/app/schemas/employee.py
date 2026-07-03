from datetime import date, datetime
from enum import StrEnum
from typing import Self
from uuid import UUID

from pydantic import (
    EmailStr,
    Field,
    field_validator,
    model_validator,
)

from app.models import EmployeeStatus
from app.schemas.base import (
    ApiModel,
    PaginationMetadata,
    RequestModel,
)

APPROVED_DEMO_EMAIL_DOMAINS = frozenset(
    {
        "example.com",
        "example.org",
        "example.net",
    }
)


def normalize_text(value: object) -> object:
    if isinstance(value, str):
        return " ".join(value.split())

    return value


def normalize_email(value: object) -> object:
    if isinstance(value, str):
        return value.strip().lower()

    return value


def validate_demo_email_domain(
    value: EmailStr,
) -> EmailStr:
    domain = (
        str(value)
        .rsplit(
            "@",
            maxsplit=1,
        )[-1]
        .lower()
    )

    if domain not in APPROVED_DEMO_EMAIL_DOMAINS:
        raise ValueError("Use an approved demonstration email domain.")

    return value


class EmployeeSort(StrEnum):
    CREATED_AT = "createdAt"
    CREATED_AT_DESC = "-createdAt"
    LAST_NAME = "lastName"
    LAST_NAME_DESC = "-lastName"
    START_DATE = "startDate"
    START_DATE_DESC = "-startDate"


class EmployeeCreate(RequestModel):
    first_name: str = Field(
        min_length=1,
        max_length=80,
    )

    last_name: str = Field(
        min_length=1,
        max_length=80,
    )

    email: EmailStr
    department_id: UUID

    job_title: str = Field(
        min_length=2,
        max_length=120,
    )

    status: EmployeeStatus = EmployeeStatus.ONBOARDING

    start_date: date
    manager_id: UUID | None = None

    @field_validator(
        "first_name",
        "last_name",
        "job_title",
        mode="before",
    )
    @classmethod
    def normalize_required_text(
        cls,
        value: object,
    ) -> object:
        return normalize_text(value)

    @field_validator(
        "email",
        mode="before",
    )
    @classmethod
    def normalize_email_value(
        cls,
        value: object,
    ) -> object:
        return normalize_email(value)

    @field_validator("email")
    @classmethod
    def require_demo_email_domain(
        cls,
        value: EmailStr,
    ) -> EmailStr:
        return validate_demo_email_domain(value)


class EmployeeUpdate(RequestModel):
    first_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=80,
    )

    last_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=80,
    )

    email: EmailStr | None = None
    department_id: UUID | None = None

    job_title: str | None = Field(
        default=None,
        min_length=2,
        max_length=120,
    )

    status: EmployeeStatus | None = None
    start_date: date | None = None

    # Explicit null removes the manager.
    manager_id: UUID | None = None

    @field_validator(
        "first_name",
        "last_name",
        "email",
        "department_id",
        "job_title",
        "status",
        "start_date",
        mode="before",
    )
    @classmethod
    def reject_null_values(
        cls,
        value: object,
    ) -> object:
        if value is None:
            raise ValueError("This field cannot be null.")

        return value

    @field_validator(
        "first_name",
        "last_name",
        "job_title",
        mode="before",
    )
    @classmethod
    def normalize_optional_text(
        cls,
        value: object,
    ) -> object:
        return normalize_text(value)

    @field_validator(
        "email",
        mode="before",
    )
    @classmethod
    def normalize_email_value(
        cls,
        value: object,
    ) -> object:
        return normalize_email(value)

    @field_validator("email")
    @classmethod
    def require_demo_email_domain(
        cls,
        value: EmailStr | None,
    ) -> EmailStr | None:
        if value is None:
            return None

        return validate_demo_email_domain(value)

    @model_validator(mode="after")
    def require_at_least_one_field(
        self,
    ) -> Self:
        if not self.model_fields_set:
            raise ValueError("Provide at least one field to update.")

        return self


class EmployeeDeactivate(RequestModel):
    reason: str = Field(
        min_length=5,
        max_length=200,
    )

    @field_validator(
        "reason",
        mode="before",
    )
    @classmethod
    def normalize_reason(
        cls,
        value: object,
    ) -> object:
        return normalize_text(value)


class EmployeeRead(ApiModel):
    id: UUID
    first_name: str
    last_name: str
    email: EmailStr
    department_id: UUID
    job_title: str
    status: EmployeeStatus
    start_date: date
    manager_id: UUID | None
    created_at: datetime
    updated_at: datetime


class EmployeeListResponse(ApiModel):
    items: list[EmployeeRead]
    pagination: PaginationMetadata
