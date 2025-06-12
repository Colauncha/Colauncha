from pydantic import EmailStr
from pydantic_settings import BaseSettings
from dotenv import load_dotenv



__all__ = ["app_configs", "AppConfigs"]

load_dotenv()


class EmailSettings(BaseSettings):
    MAIL_SERVER: str = ""
    MAIL_PORT: int = 465
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_TO: str = ""


class AppConfigs(BaseSettings):
    API_VERSION: str = "/api"
    APP_NAME: str = ""
    HOME: str = ""
    SWAGGER_DOCS_URL: str = API_VERSION + "/docs"
    email_settings: EmailSettings = EmailSettings()
    DEBUG: bool = True
    ENVIRONMENT: str = ""
    ALLOWED_ORIGINS: list[str] = ["http://localhost"]


app_configs = AppConfigs()