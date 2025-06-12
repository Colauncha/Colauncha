"""Controllers"""

from fastapi import APIRouter
from server.configs import app_configs
from server.controllers import request_controller


router = APIRouter(prefix=app_configs.API_VERSION)

router.include_router(request_controller.routes)
