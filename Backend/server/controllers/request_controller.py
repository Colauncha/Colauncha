from typing import Optional
from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, UploadFile
from server.configs.database import get_db
from server.schemas import APIResponse, PagedResponse, ServiceResultModel
from server.schemas.Request_schema import GetRequestQuery, RequestSchema, GetRequestSchema
from server.utils.exception_handler import ErrorMessage
from server.services.request_form_services import RequestFormServices, RequestService
from sqlalchemy.orm import Session
from pydantic import ValidationError
from server.middleware.auth import company_dependency


routes = APIRouter(prefix="/requests", tags=["Service Requests"])

@routes.post("/form-submit")
async def form_submit(
    company: company_dependency,
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
    db: Session = Depends(get_db)
) -> APIResponse:

    if not company:
        raise ErrorMessage(
            message="Unauthorized",
            status_code=401,
            detail="Login to submit request"
        )
    
    if company.has_errors:
        raise ErrorMessage(
            message="Unauthorized",
            status_code=401,
            detail=company.errors
        )

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
            company_name=company_name.capitalize(),
            phone=phone,
            max_project_time=max_project_time,
            project_name=project_name.capitalize(),
            country=country.capitalize(),
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

    background_tasks.add_task(
        RequestFormServices().form_submit_company,
        request_data,
        file_name
    )

    await RequestService(db).add_request(
        company.data.id, request_data
    )

    return APIResponse(
        data=result.data,
        message="Request submitted successfully"
    )


@routes.get("/")
async def get_req(
    id: str,
    company: company_dependency,
    db: Session = Depends(get_db)
) -> APIResponse[GetRequestSchema]:
    if not company:
        raise ErrorMessage(
            message="Unauthorized",
            status_code=401,
            detail="Login to view request"
        )
    
    if company.has_errors:
        raise ErrorMessage(
            message="Unauthorized",
            status_code=401,
            detail=company.errors
        )
    
    request = await RequestService(db).get_requests(id)
    if request.company_id != company.data.id:
        raise ErrorMessage(
            message="Unauthorized",
            status_code=401,
            detail="Permission denied"
        )
    return APIResponse(data=request)


@routes.get('/all-requests')
async def get_all(
    company: company_dependency,
    query: GetRequestQuery = Depends(),
    db: Session = Depends(get_db)
) -> PagedResponse:
    if not company:
        raise ErrorMessage(
            message="Authorization Failed",
            status_code=401,
            detail="Not logged in"
        )
    
    if company.has_errors:
        raise ErrorMessage(
            message="Authorization Failed",
            status_code=401,
            detail=company.errors
        )
    result = await RequestService(db).get_all(
        query.model_dump(exclude_none=True)
    )
    print(result)
    return result.data

# @routes.delete("/")
# async def delete_request(

# )