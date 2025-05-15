from typing import Annotated
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import JWTClaimsError, ExpiredSignatureError, JWTError
from server.configs.database import get_db
from server.schemas import ServiceResultModel
from server.configs import app_configs
from server.services.company_services import CompanyServices
from server.schemas.Company_schema import (
    CompanyLoginSchema,
    GetCompanySchema,
    LoginToken
)
from server.models.company import Company
from server.utils.exception_handler import ErrorMessage
from sqlalchemy.orm import Session



company_oauth2_bearer = OAuth2PasswordBearer(tokenUrl=f"{app_configs.API_VERSION}/company/login")

def get_curent_company(
        token: Annotated[str, Depends(company_oauth2_bearer)],
        db: Session = Depends(get_db),
    ) -> ServiceResultModel:
    result = ServiceResultModel(GetCompanySchema | None)
    try:
        claims = jwt.decode(
            token=token,
            key=app_configs.security.SECRET_KEY,
            algorithms=app_configs.security.ALGORITHM
        )
        company_id = claims.get('id')
        company = db.query(Company).filter_by(id=company_id).first()
        if not company:
            result.add_error("Invalid Token [Company not found]")
            return result
        result.data =  GetCompanySchema.model_validate(company)
        return result
    except (ExpiredSignatureError, JWTClaimsError, JWTError, Exception) as e:
        print(e.__str__())
        result.add_error(e.__repr__())
        return result


company_dependency = Annotated[ServiceResultModel, Depends(get_curent_company)]
__all__ = ['company_dependency']
