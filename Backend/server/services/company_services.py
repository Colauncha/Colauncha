from datetime import datetime, timedelta, timezone
from jose import jwt
from jose.exceptions import JWTError
from passlib.context import CryptContext
from server.models.company import Company
from server.utils.exception_handler import ErrorMessage
from server.configs import app_configs
from server.repository import DBAdaptor
from sqlalchemy.orm import Session
from server.schemas.Company_schema import (
    GetCompanySchema,
    LoginToken,
    CompanyLoginSchema,
    RegisterCompanySchema,
)


class CompanyServices:
    def __init__(self, db: Session) -> None:
        self.repo = DBAdaptor(db).repo
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    async def __check_password(self, password, hashed_password) -> bool:
        return self.pwd_context.verify(password, hashed_password)

    async def __generate_token(self, company: Company) -> LoginToken:
        expires_at = datetime.now(tz=timezone.utc) + timedelta(
            days=app_configs.security.ACCESS_TOKEN_EXPIRES
        )
        claims = {
            "id": str(company.id),
            "phone": company.phone,
            "email": company.email,
            "exp": expires_at,
        }

        token_type = "bearer"
        try:
            token = jwt.encode(
                claims,
                app_configs.security.SECRET_KEY,
                app_configs.security.ALGORITHM,
            )
        except JWTError as err:
            raise ValueError(err, "Unable to generate token")
        return LoginToken(**{"access_token": token, "token_type": token_type})
    
    async def authenticate(self, cred: CompanyLoginSchema) -> LoginToken:
        company = await self.repo.get_by_email(cred.email)
        if company == None:
            raise ErrorMessage(
                message="Invalid email address",
                status_code=401
            )
        if not await self.__check_password(cred.password, company.password):
            raise ErrorMessage(
                message="Invalid password",
                status_code=401
            )
        token = await self.__generate_token(company)
        return token
        
    async def register(self, data: RegisterCompanySchema) -> GetCompanySchema:
        try:
            company = await self.repo.add(data.model_dump())
            return company
        except Exception as e:
            print(e)
            raise ErrorMessage(
                message="Error registering company",
                status_code=400,
                detail=str(e)
            )

    async def update_company(
            self,
            entity: GetCompanySchema,
            data: dict
        ) -> GetCompanySchema:
        try:
            company = self.repo.update(entity, data)
            return GetCompanySchema.model_validate(company)
        except Exception as e:
            raise ErrorMessage(
                message="Error updating company",
                status_code=400,
                detail=str(e)
            )

    async def get_company(self, id: str) -> GetCompanySchema:
        try:
            company = await self.repo.get_by_id(id)
            return GetCompanySchema.model_validate(company)
        except Exception as e:
            raise ErrorMessage(
                message="Error updating company",
                status_code=400,
                detail=str(e)
            )