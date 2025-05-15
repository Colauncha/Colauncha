import math
from typing import Type, Union
from sqlalchemy.orm import Session
from server.utils.helper import paginator
from server.schemas import PagedResponse
from server.models.company import Company
from server.models.request import Request
from server.models.base import ModelBase
from server.schemas.Company_schema import GetCompanySchema
from server.schemas.Request_schema import GetRequestSchema


Models = Union[Company, Request]
GetSchemas = Union[GetCompanySchema, GetRequestSchema]

class Repository:
    """Store access"""
    def __init__(self, db: Session, model: Type[Models]) -> None:
        self.db = db
        self._Model = model
    
    async def add(self, data: dict, schema: Type[GetSchemas]) -> Type[GetSchemas]:
        """Adds an object of type self._Model to db"""
        try:
            entity = self._Model(**data)
            self.db.add(entity)
            self.db.commit()
            self.db.refresh(entity)
            return schema.model_validate(entity)
        except Exception as e:
            self.db.rollback()
            raise e

    async def get_by_id(self, id: str, schema: Type[GetSchemas]) -> Type[GetSchemas]:
        """Get db entry by id"""
        try:
            result = self.db.query(self._Model).filter_by(id=id).first()
            result = schema.model_validate(result)
            return result if result else None
        except Exception as e:
             raise e
    
    async def get_by_email(self, email: str) -> Company:
        """Get db entry by id"""
        try:
            result = self.db.query(
                self._Model
            ).filter_by(email=email).first()
            return result if result else None
        except Exception as e:
             raise e
        
    async def update(
            self,
            entity: GetCompanySchema,
            data: dict = None
        ) -> GetCompanySchema:
        """Updates entity"""
        try:
            company = self.db.query(self._Model).filter_by(id=entity.id)
            if company is None:
                return None
            # data = data.model_dump(exclude_none = True)
            company.update(data, synchronize_session="evaluate")
            self.db.commit()
            return GetCompanySchema.model_validate(company.first())
        except Exception as e:
            self.db.rollback()
            raise e
        
    async def delete(self, entity: Type[Models]) -> bool:
        """Delete entity from db"""
        try:
            self.db.delete(entity)
            self.db.commit()
        except Exception as e:
            raise e
        return True
    
    async def get_all(self, filter: dict = None) -> PagedResponse:
    
        page = filter.pop('page') if (filter and filter.get('page')) else 1
        per_page = filter.pop('per_page') if (filter and filter.get('per_page')) else 10
        limit = per_page
        offset = paginator(page, per_page)
        QueryModel = self._Model

        try:
            if filter:
                query = self.db.query(QueryModel).filter_by(**filter)
                total = query.count()
            else:
                query = self.db.query(QueryModel)
                total = query.count()
            results = query.limit(limit).offset(offset).all()
        except Exception as e:
            raise e
        count = len(results)
        pages = math.ceil(total / limit) or 1
        return PagedResponse(
            data=results,
            pages=pages,
            page_number=page,
            per_page=limit,
            count=count,
            total=total,
        )