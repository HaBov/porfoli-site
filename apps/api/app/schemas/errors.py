from app.schemas.base import ApiModel


class ErrorDetail(ApiModel):
    code: str
    message: str
    request_id: str
    fields: dict[str, str] | None = None


class ErrorResponse(ApiModel):
    error: ErrorDetail
