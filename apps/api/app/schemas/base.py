from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class ApiModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        serialize_by_alias=True,
        from_attributes=True,
    )


class RequestModel(ApiModel):
    model_config = ConfigDict(
        extra="forbid",
    )


class PaginationMetadata(ApiModel):
    page: int
    page_size: int
    total_items: int
    total_pages: int
