from uuid import UUID


class DepartmentNotFound(Exception):
    def __init__(self, department_id: UUID) -> None:
        self.department_id = department_id
        super().__init__("Department was not found.")


class DuplicateDepartmentCode(Exception):
    def __init__(self, code: str) -> None:
        self.code = code
        super().__init__("A department with this code already exists.")
