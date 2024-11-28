from sqlalchemy.orm import relationship
from sqlalchemy import Column,  String
from server.models.base import ModelBase
from passlib.context import CryptContext


class Company(ModelBase):
    __tablename__ = "company"
    __mapper_args__ = {"polymorphic_identity": "company"}
    name = Column(String, nullable=False, unique=True)
    country = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    requests = relationship("Request", back_populates="company", cascade="all, delete-orphan")

    def __init__(
            self,
            name: str,
            email: str,
            password: str
        ) -> None:
        self.name = name
        self.email = email
        self.password = self.__hash_password(password)
    
    def __hash_password(self, password) -> str:
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.hash(password)