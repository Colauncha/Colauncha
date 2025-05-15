from server.models.base import ModelBase
from sqlalchemy import UUID, Column, String, Integer, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship


class Request(ModelBase):
    __tablename__ = 'requests'
    __mapper_args__ = {"polymorphic_identity": "requests"}
    project_name = Column(String, nullable=False, index=True)
    max_project_time = Column(Integer, nullable=False)
    estimated_budget = Column(Integer, nullable=False)
    description = Column(Text, nullable=False)
    required_skills = Column(JSON, nullable=True)
    company_id = Column(UUID(as_uuid=True), ForeignKey('company.id', ondelete="CASCADE"), nullable=False)

    company = relationship('Company', back_populates='requests')

