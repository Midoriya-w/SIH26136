from typing import List, Optional
from pydantic import BaseModel

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    userId: str
    role: str
    departmentId: Optional[str] = None
    permissions: List[str] = []

class LoginRequest(BaseModel):
    userId: str
    role: str
    departmentId: Optional[str] = None
    orgId: Optional[str] = None
