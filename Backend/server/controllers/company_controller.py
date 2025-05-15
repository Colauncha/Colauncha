from fastapi import APIRouter, Depends
from server.utils.exception_handler import ErrorMessage
from server.configs import app_configs
from server.configs.database import get_db
from server.middleware.auth import company_dependency
from server.schemas import (
    APIResponse,
    PagedQuery,
    PagedResponse,
)
from server.schemas.Company_schema import (
    CompanyLoginSchema,
    GetCompanySchema,
    LoginToken,
    RegisterCompanySchema,
    UpdateCompanySchema,
    GetCompanyQuery
)
from server.services.company_services import CompanyServices
from sqlalchemy.orm import Session


routes = APIRouter(prefix='/company', tags=['Company'])


@routes.post('/login')
async def login(
    cred: CompanyLoginSchema,
    db: Session = Depends(get_db)
) -> APIResponse[LoginToken]:
    result = await CompanyServices(db).authenticate(cred)
    return APIResponse(data=result)
    

@routes.post('/register')
async def register_company(
    data: RegisterCompanySchema,
    db: Session = Depends(get_db)
) -> APIResponse[GetCompanySchema]:
    result = await CompanyServices(db).register(data)
    return APIResponse(data=result, status_code=201)


@routes.get('/profile')
async def get_company(
    *, db: Session = Depends(get_db),
    company: company_dependency
) -> APIResponse[GetCompanySchema]:
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
    result = await CompanyServices(db).get_company(company.data.id)
    return APIResponse(data=result)


@routes.put('/update')
async def update_company(
    data: UpdateCompanySchema,
    company: company_dependency,
    db: Session = Depends(get_db),
) -> APIResponse:
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
    result = await CompanyServices(db).update_company(
        company.data,
        data.model_dump(exclude_none=True))
    return APIResponse(data='OK')


@routes.get('/')
async def get_all(
    company: company_dependency,
    query: GetCompanyQuery = Depends(),
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
    result = await CompanyServices(db).get_all(
        query.model_dump(exclude_none=True)
    )
    print(result)
    return result.data