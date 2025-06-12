from fastapi import Query
import pydantic as pyd
import typing as t
from typing import Any, Union


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


class PagedResponse(APIResponse):
    pages: int = 1
    page_number: int = 1
    count: int = 0
    total: int = 0
    per_page: int = 0


class PagedQuery(pyd.BaseModel):
    page: t.Union[int, None] = Query(None, description="Page number")
    per_page: t.Union[int, None] = Query(None, description="Items per page")

    def model_dump(
        self,
        *,
        mode: str = "python",
        include: set[int|str] | dict[int|str, Any] | None = None,
        exclude: set[int|str] | dict[int|str, Any] | None = None,
        by_alias: bool = False,
        exclude_unset: bool = False,
        exclude_defaults: bool = False,
        exclude_none: bool = False,
        round_trip: bool = False,
        warnings: bool = True,
    ) -> dict[str, Any]:
        if not self.page:
            self.page = 1
        if not self.per_page:
            self.per_page = 10
        data = super().model_dump(
            mode=mode,
            include=include,
            exclude=exclude,
            by_alias=by_alias,
            exclude_unset=exclude_unset,
            exclude_defaults=exclude_defaults,
            exclude_none=exclude_none,
            round_trip=round_trip,
            warnings=warnings,
        )
        return data