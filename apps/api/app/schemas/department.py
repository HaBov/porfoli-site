from datetime import datetime
from enum import StrEnum
from typing import Self
from uuid import UUID

from pydantic import (
    Field,
    field_validator,
    model_validator,
)

from app.schemas.base import (
    ApiModel,
    PaginationMetadata,
    RequestModel,
)


class DepartmentSort(StrEnum):
    NAME = "name"
    NAME_DESC = "-name"
    CODE = "code"
    CODE_DESC = "-code"
    CREATED_AT = "createdAt"
    CREATED_AT_DESC = "-createdAt"


class DepartmentCreate(RequestModel):
    name: str = Field(
        min_length=2,
        max_length=80,
    )

    code: str = Field(
        min_length=2,
        max_length=10,
        pattern=r"^[A-Z]+$",
    )

    description: str | None = Field(
        default=None,
        max_length=300,
    )

    @field_validator(
        "name",
        mode="before",
    )
    @classmethod
    def normalize_name(
        cls,
        value: object,
    ) -> object:
        if isinstance(value, str):
            return " ".join(value.split())

        return value

    @field_validator(
        "code",
        mode="before",
    )
    @classmethod
    def normalize_code(
        cls,
        value: object,
    ) -> object:
        if isinstance(value, str):
            return value.strip()

        return value

    @field_validator(
        "description",
        mode="before",
    )
    @classmethod
    def normalize_description(
        cls,
        value: object,
    ) -> object:
        if isinstance(value, str):
            normalized = " ".join(value.split())

            return normalized or None

        return value


class DepartmentUpdate(RequestModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=80,
    )

    code: str | None = Field(
        default=None,
        min_length=2,
        max_length=10,
        pattern=r"^[A-Z]+$",
    )

    description: str | None = Field(
        default=None,
        max_length=300,
    )

    active: bool | None = None

    @field_validator(
        "name",
        "code",
        "active",
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
        "name",
        mode="before",
    )
    @classmethod
    def normalize_name(
        cls,
        value: object,
    ) -> object:
        if isinstance(value, str):
            return " ".join(value.split())

        return value

    @field_validator(
        "code",
        mode="before",
    )
    @classmethod
    def normalize_code(
        cls,
        value: object,
    ) -> object:
        if isinstance(value, str):
            return value.strip()

        return value

    @field_validator(
        "description",
        mode="before",
    )
    @classmethod
    def normalize_description(
        cls,
        value: object,
    ) -> object:
        if isinstance(value, str):
            normalized = " ".join(value.split())

            return normalized or None

        return value

    @model_validator(mode="after")
    def require_at_least_one_field(
        self,
    ) -> Self:
        if not self.model_fields_set:
            raise ValueError("Provide at least one field to update.")

        return self


class DepartmentRead(ApiModel):
    id: UUID
    name: str
    code: str
    description: str | None
    active: bool
    created_at: datetime
    updated_at: datetime


class DepartmentListResponse(ApiModel):
    items: list[DepartmentRead]
    pagination: PaginationMetadata
