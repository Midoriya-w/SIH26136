from enum import Enum

from pydantic import BaseModel, Field


class UserRole(str, Enum):
    GOVERNMENT_OFFICER = "government_officer"
    STARTUP = "startup"
    EXPERT_VALIDATOR = "expert_validator"
    AUDITOR = "auditor"


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=8, max_length=128)
    role: UserRole
    department_id: str | None = None
    organization_id: str | None = None


class UserResponse(BaseModel):
    user_id: str
    username: str
    role: UserRole
    department_id: str | None = None
    organization_id: str | None = None


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    user_id: str
    role: UserRole
    department_id: str | None = None
    organization_id: str | None = None
    permissions: list[str] = []