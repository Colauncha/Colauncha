from typing import Optional
from fastapi import Query
import pydantic as pyd
from uuid import UUID
from server.schemas import PagedQuery

class RequestSchema(pyd.BaseModel):
    email: str = pyd.Field(examples=["email@example.com"])
    description: str = pyd.Field(min_length=5,
        max_length=1000, description="Description of the project [1000 characters max]",
        examples=["Description of the project"]
    )
    company_name: str = pyd.Field(
        description="Name of the company",
        examples=["Company Name"]
    )
    estimated_budget: int = pyd.Field(
        examples=[1000000],
        description="Estimated budget for the project (in Naira)"
    )
    country: str = pyd.Field(examples=["Nigeria"])
    phone: str = pyd.Field(examples=["08012345678"])
    project_name: Optional[str] = None
    max_project_time: int = pyd.Field(
        examples=[30],
        description="Maximum time to complete the project (in days)"
    )
    required_skills: Optional[list[str]] = pyd.Field(
        examples=[["Python", "Django", "React"]],
        description="List of required skills for the project"
    )


class VolunteerSchema(pyd.BaseModel):
    email: str = pyd.Field(examples=["email@example.com"])
    why_volunteer: str = pyd.Field(min_length=5,
        max_length=1000, description="Description of the volunteer [1000 characters max]",
        examples=["Why do you want to join us?"]
    )
    name: str = pyd.Field(
        description="Talent's name",
        examples=["Michael"]
    )
    education: str = pyd.Field(
        examples=['BSc. Computer science'],
        description="Academic degree (award)"
    )
    country: str = pyd.Field(examples=["Nigeria"])
    phone: str = pyd.Field(examples=["08012345678"])
    role: str = pyd.Field(examples=["Backend engineer"])
    projects: Optional[list[str]] = pyd.Field(
        examples=["Fintech webapp", "Payment gateway app"],
        description="Projects completed"
    )
    certifications: Optional[list[str]] = pyd.Field(
        examples=[["AWS cloud engineering", "ALX Software engineering"]],
        description="List of attained certifications"
    )
    skills: Optional[list[str]] = pyd.Field(
        examples=[["Python", "Django", "React"]],
        description="List of required skills for the project"
    )

      
class GetRequestSchema(pyd.BaseModel):
    estimated_budget: int = pyd.Field(
        examples=[1000000],
        description="Estimated budget for the project (in Naira)"
    )
    project_name: Optional[str] = None
    max_project_time: int = pyd.Field(
        examples=[30],
        description="Maximum time to complete the project (in days)"
    )
    required_skills: Optional[list[str]] = pyd.Field(
        examples=[["Python", "Django", "React"]],
        description="List of required skills for the project"
    )
    description: str = pyd.Field(min_length=5,
        max_length=1000, description="Description of the project [1000 characters max]",
        examples=["Description of the project"]
    )
    company_id: str | UUID

    model_config = {
        "from_attributes": True
    }

class CreateRequestschema(GetRequestSchema):
    model_config = {
        "from_attributes": True
    }


class GetRequestQuery(PagedQuery):
    id: Optional[str] = Query(None, description="Company's ID")
    company_id: Optional[str] = Query(None, description="Company's email address")
    project_name: Optional[str] = Query(None, description="Company's name")


class EnquirySchema(pyd.BaseModel):
    ...