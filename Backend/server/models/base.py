from datetime import datetime, timezone
import uuid
from sqlalchemy import Column, DateTime, UUID
from server.configs.database import Base


class ModelBase(Base):
    """Model Base class for all models

    Returns:
        ModelBase: Base class for all models
    """
    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), default=datetime.now(tz=timezone.utc))
    updated_at = Column(DateTime(timezone=True), onupdate=datetime.now(tz=timezone.utc))

    def to_dict(self) -> dict[any, any]:
        dict = {}
        for attr in self.__dict__:
            if not attr.startswith("_"):
                dict[attr] = getattr(self, attr)
        return dict
