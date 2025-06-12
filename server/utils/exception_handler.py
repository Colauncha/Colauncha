import json
from typing import Any
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError


class ErrorMessage(Exception):
    def __init__(self, message: str, status_code: int, detail: str | Any = None) -> None:
        self.message = message
        self.status_code = status_code
        self.detail = detail


async def error_handler(request: Request, exc: ErrorMessage):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message, "detail": exc.detail, "status_code": exc.status_code},
    )


async def request_validation_error_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"message": "Validation error", "detail": exc.__repr__(), "status_code": 422},
    )


async def HTTP_error_handler(request: Request, exc: HTTPException):
    if exc.status_code >= 500:
        print(f'Status:{exc.status_code}\nDetail: {exc.__repr__()}')
        return JSONResponse(
            status_code=exc.status_code,
            content={"message": "Don't Panic, the error is from us", "status_code": exc.status_code},
        )
    return JSONResponse(
            status_code=exc.status_code,
            content={"message": exc.detail, "detail": exc.__repr__(), "status_code": exc.status_code},
        )