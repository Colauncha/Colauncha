import pydantic as pyd
import typing as t
from server.schemas.Request_schema import *


T = t.TypeVar("T")


class ServiceResultModel(t.Generic[T]):
    def __init__(self, data=None) -> None:
        self.data: t.Union[T, None] = data
        self.errors: t.List[str] = []
        self.has_errors: bool = False

    def add_error(self, error: str | list[str]):
        self.has_errors = True
        if (type(error) == list or type(error) == tuple) and len(error) > 0:
            for err in error:
                self.errors.append(err)
        else:
            self.errors.append(error)
        return self


class APIResponse(pyd.BaseModel, t.Generic[T]):
    message: t.Optional[str] = pyd.Field(default="Success", examples=["Success"])
    success: bool = True
    status_code: int = 200
    data: t.Optional[T] = None

    model_config = {"from_attributes": True}