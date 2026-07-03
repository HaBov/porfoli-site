from typing import Literal

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class ApiModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        serialize_by_alias=True,
    )


class HealthResponse(ApiModel):
    status: Literal["ok", "ready"]
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
