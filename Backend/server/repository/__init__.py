from typing import Type, Union
from server.models.request import Request
from server.repository.repository import Repository
from server.models.company import Company
from sqlalchemy.orm import Session


Models = Union[Company, Request]

class DBAdaptor:
    def __init__(self, db: Session, model: Type[Models]):
        self.repo = Repository(db, model)
    