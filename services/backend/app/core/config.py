"""
SWISS-CONNECT Backend Configuration
====================================
Zentrale Konfiguration über Environment-Variablen.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # App
    app_name: str = "SWISS-CONNECT API"
    app_version: str = "1.0.0"
    environment: str = "development"
    debug: bool = True

    # Database
    database_url: str = "postgresql://swissconnect:swissconnect_dev@localhost:5432/swissconnect"

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Security
    secret_key: str = "dev-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24

    # MinIO
    minio_endpoint: str = "localhost:9000"
    minio_access_key: str = "minioadmin"
    minio_secret_key: str = "minioadmin123"
    minio_bucket: str = "documents"

    # SMTP
    smtp_host: str = "localhost"
    smtp_port: int = 1025
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = "noreply@swiss-connect.ch"

    # External APIs
    swiss21_api_key: str = ""
    swiss21_api_url: str = ""
    bexio_api_key: str = ""
    bexio_api_url: str = ""
    superchat_api_key: str = ""
    superchat_webhook_secret: str = ""
    openai_api_key: str = ""
    openai_model: str = "gpt-4"

    # Celery
    celery_broker_url: str = "redis://localhost:6379/1"
    celery_result_backend: str = "redis://localhost:6379/2"

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()
