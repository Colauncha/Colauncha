from typing import Optional
from uuid import UUID
from fastapi import Query
from pydantic import BaseModel, Field, ConfigDict
from server.models.company import Company
from server.configs import app_configs
from server.schemas import PagedQuery


class GetCompanySchema(BaseModel):
    id: UUID = Field(
        description="Unique identifier for the company"
    )
    name: str = Field(
        description="Name of the company",
        examples=["Company Name"]
    )
    country: Optional[str] = Field(
        description="Country where the company is located",
        examples=["Nigeria"]
    )
    phone: Optional[str] = Field(
        description="Phone number of the company",
        examples=["08012345678"]
    )
    email: str = Field(
        description="Email of the company",
        examples=["email@example.com"]
    )

    model_config = {
        "from_attributes": True
    }


class CompanyLoginSchema(BaseModel):
    email: str = Field(
        min_length=3, max_length=255, examples=[app_configs.test_company.EMAIL]
    )
    password: str = Field(
        min_length=8, max_length=128, examples=[app_configs.test_company.PASSWRD]
    )

    model_config = {
        "from_attributes": True
    }


class RegisterCompanySchema(BaseModel):
    name: str = Field(
        description="Name of the company",
        examples=["Company Name"]
    )
    email: str = Field(
        description="Email of the company",
        examples=["email@example.com"]
    )
    password: str = Field(
        description="Password for the company account",
        examples=[app_configs.test_company.PASSWRD]
    )

    model_config = ConfigDict(from_attributes=True)


class LoginToken(BaseModel):
    access_token: str
    token_type: str

    model_config = {
        "from_attributes": True
    }


class UpdateCompanySchema(BaseModel):
    name: Optional[str] = Field(
        description="Name of the company",
        examples=["Company Name"],
        default=None
    )
    country: Optional[str] = Field(
        description="Country where the company is located",
        examples=["Nigeria"],
        default=None
    )
    phone: Optional[str] = Field(
        description="Phone number of the company",
        examples=["08012345678"],
        default=None
    )
    email: Optional[str] = Field(
        description="Email of the company",
        examples=["email@example.com"],
        default=None
    )
    model_config = {
        'from_atributes': True
    }

class GetCompanyQuery(PagedQuery):
    id: Optional[str] = Query(None, description="Company's ID")
    email: Optional[str] = Query(None, description="Company's email address")
    name: Optional[str] = Query(None, description="Company's name")