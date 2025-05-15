from pydantic import EmailStr
from pydantic_settings import BaseSettings
from dotenv import load_dotenv



__all__ = ["app_configs", "AppConfigs"]

load_dotenv()


class DatabaseSettings(BaseSettings):
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    DB_SCHEMA: str
    DB_DRIVER: str
    SQLALCHEMY_DATABASE_URL: str = ""
    TEST_DATABASE_URL: str = ""


class JWTSettings(BaseSettings):
    ACCESS_TOKEN_EXPIRES: int = 6
    ALGORITHM: str = "HS512"
    SECRET_KEY: str = ""


class EmailSettings(BaseSettings):
    MAIL_SERVER: str = ""
    MAIL_PORT: int = 465
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_TO: str = ""


class TestCompany(BaseSettings):
    COMPANY_NAME: str = ""
    EMAIL: EmailStr = ""
    PASSWRD: str = ""


class AppConfigs(BaseSettings):
    API_VERSION: str = "/api"
    APP_NAME: str = ""
    storages: DatabaseSettings = DatabaseSettings()
    HOME: str = ""
    security: JWTSettings = JWTSettings()
    SWAGGER_DOCS_URL: str = API_VERSION + "/docs"
    test_company: TestCompany = TestCompany()
    email_settings: EmailSettings = EmailSettings()
    DEBUG: bool = True
    ENVIRONMENT: str = ""
    ALLOWED_ORIGINS: list[str] = []


app_configs = AppConfigs()