from app.main import app


def test_openapi_operation_ids_are_unique() -> None:
    schema = app.openapi()

    operation_ids: list[str] = []

    for path_data in schema["paths"].values():
        for method_data in path_data.values():
            if not isinstance(
                method_data,
                dict,
            ):
                continue

            operation_id = method_data.get("operationId")

            if operation_id:
                operation_ids.append(operation_id)

    assert len(operation_ids) == len(set(operation_ids))


def test_job_operations_are_documented() -> None:
    schema = app.openapi()

    jobs = schema["paths"]["/api/demo/v1/jobs"]

    job_detail = schema["paths"]["/api/demo/v1/jobs/{job_id}"]

    assert jobs["post"]["operationId"] == "create_demo_job"

    assert job_detail["get"]["operationId"] == "get_demo_job"


def test_reset_is_not_public_endpoint() -> None:
    schema = app.openapi()

    assert "/api/demo/v1/reset" not in schema["paths"]
