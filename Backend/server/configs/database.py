from typing import Iterator
from sqlalchemy import create_engine, schema
from server.configs import app_configs
from sqlalchemy.orm import (
    declarative_base,
    sessionmaker,
    scoped_session,
    Session,
)


env = app_configs.ENVIRONMENT

engine = (
    create_engine(app_configs.storages.TEST_DATABASE_URL)
    if env == "test"
    else create_engine(
        app_configs.storages.SQLALCHEMY_DATABASE_URL,
        pool_size=10,
        max_overflow=5,
        pool_recycle=3600,
        isolation_level="READ COMMITTED",
    )
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = (
    declarative_base()
    if env == "test"
    else declarative_base(
        metadata=schema.MetaData(schema=app_configs.storages.DB_SCHEMA)
    )
)
Base.query = scoped_session(SessionLocal).query_property()

def get_db() -> Iterator[Session]:
    """
    Creates and returns a new database session.
    """
    try:
        db: Session = SessionLocal()
        yield db
    except Exception as exc:
        raise exc
    finally:
        db.expire_on_commit
        db.close()