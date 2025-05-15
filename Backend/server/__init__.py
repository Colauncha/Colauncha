from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from server.configs import init_db, app_configs
from server.configs import app_configs
from server.controllers import router
from server.utils.exception_handler import  (
    ErrorMessage,
    error_handler,
    RequestValidationError,
    request_validation_error_handler,
    HTTPException,
    HTTP_error_handler
)


# Creat ASGI app
def create_app():
    app = FastAPI(
        title=app_configs.APP_NAME.capitalize(),
        version="1.0",
        description=f"{app_configs.APP_NAME.capitalize()}'s Api Documentation",
        docs_url=app_configs.SWAGGER_DOCS_URL,
        redoc_url=f'{app_configs.SWAGGER_DOCS_URL}/2',
    )

    @app.get("/", include_in_schema=False)
    def redirect():
        return RedirectResponse(url=app_configs.SWAGGER_DOCS_URL, status_code=302)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=app_configs.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(router)
    # app.exception_handler(ErrorMessage)(error_handler)
    app.exception_handlers = {
        ErrorMessage: error_handler,
        RequestValidationError: request_validation_error_handler,
        HTTPException: HTTP_error_handler,
    }
    init_db()
    return app
