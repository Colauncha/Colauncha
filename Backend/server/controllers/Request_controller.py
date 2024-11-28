from typing import Optional
from fastapi import APIRouter, BackgroundTasks, File, Form, UploadFile
from server.schemas import APIResponse, RequestSchema, ServiceResultModel
from server.utils.exception_handler import ErrorMessage
from server.services.request_form_services import RequestFormServices
from pydantic import ValidationError


routes = APIRouter(prefix="/requests", tags=["Service Requests"])

@routes.post("/form-submit")
async def form_submit(
    background_tasks: BackgroundTasks,
    required_skills: Optional[str] = Form(None),
    estimated_budget: int = Form(...),
    company_name: str = Form(...),
    phone: str = Form(...),
    max_project_time: int = Form(...),
    project_name: str = Form(...),
    country: str = Form(...),
    email: str = Form(...),
    description: str = Form(...),
    attachment: Optional[UploadFile] = File(None),
) -> APIResponse:

    result = ServiceResultModel()

    if not required_skills: required_skills = None
    elif "," in required_skills and len(required_skills) > 0:
        required_skills = [skill.strip(", ") for skill in required_skills.split(",")]
    else: [required_skills.strip()]

    file_content = None
    file_name = None
    file_type = None
    allowed_content_types = ["application/pdf", "image/jpeg", "image/png"]

    try:
        request_data = RequestSchema(
            required_skills=required_skills,
            estimated_budget=estimated_budget,
            company_name=company_name,
            phone=phone,
            max_project_time=max_project_time,
            project_name=project_name,
            country=country,
            email=email,
            description=description
        )
        request_data = RequestSchema.model_validate(request_data)
    except ValidationError as e:
        raise ErrorMessage(
            status_code=422,
            detail=e.errors(),
            message="Validation error in request data"
        )

    if attachment and attachment.content_type in allowed_content_types:
        try:
            file_name = attachment.filename
            file_type = attachment.content_type
            file_content = await attachment.read()
        except Exception as e:
            error_msg = "Failed to process attachment."
            raise ErrorMessage(
                status_code=500,
                detail=str(e),
                message=error_msg
            )

    RequestFormServices().form_submit(
    request_data,
    file_content,
    file_name, file_type
    )
    # background_tasks.add_task(RequestFormServices().form_submit, request_data, file_content, file_name, file_type)
    return APIResponse(
        data=result.data,
        message="Request submitted successfully"
    )
