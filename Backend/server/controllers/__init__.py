"""Controllers"""

from fastapi import APIRouter
from server.configs import app_configs
from server.controllers import request_controller
from server.controllers import company_controller
# from server.schemas import BadRequest, NotFound, ServerError


router = APIRouter(prefix=app_configs.API_VERSION)

router.include_router(request_controller.routes)
router.include_router(company_controller.routes)