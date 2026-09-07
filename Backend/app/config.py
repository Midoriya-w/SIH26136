import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "MahaBridge Post-Award Procurement Engine (Team B)"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Database
    DATABASE_URL: str = Field(
        default="sqlite:///./post_award.db",
        description="PostgreSQL or SQLite connection string. Defaults to SQLite for local development."
    )

    # JWT & Auth (aligned with Team A)
    JWT_SECRET_KEY: str = "mahabridge-super-secure-secret-key-2026-sih"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # AES-256 Encryption key for financial/PII fields (32-byte base64 string)
    AES_SECRET_KEY: str = "k7W_q3x1P9t8V6z4B2m0N1c3X5l7J9r2D4f6H8j0L2M="

    # Storage for PDFs and Deliverable Proofs
    STORAGE_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "storage")
    PDF_STORAGE_DIR: str = os.path.join(STORAGE_DIR, "pdfs")
    PROOF_STORAGE_DIR: str = os.path.join(STORAGE_DIR, "proofs")

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]

    # GeM Integration Configuration
    GEM_API_BASE_URL: str = "https://mock-gem.gov.in/api/v1"
    GEM_API_KEY: str = "gem-mock-api-key-sih-2026"
    GEM_MODE: str = "batch_export"  # 'batch_export' or 'direct_api'

    # CERT-In & Compliance
    CERT_IN_REPORTING_EMAIL: str = "incident@cert-in.org.in"
    LOG_LEVEL: str = "INFO"

    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "extra": "ignore"
    }

settings = Settings()

# Ensure directories exist
os.makedirs(settings.PDF_STORAGE_DIR, exist_ok=True)
os.makedirs(settings.PROOF_STORAGE_DIR, exist_ok=True)
