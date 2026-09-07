from datetime import datetime, timedelta, timezone
from typing import Optional, List, Dict, Any
from jose import JWTError, jwt
from pydantic import BaseModel
from app.config import settings

class TokenPayload(BaseModel):
    userId: str
    role: str
    departmentId: Optional[str] = None
    orgId: Optional[str] = None
    permissions: List[str] = []
    pilotScopeId: Optional[str] = None  # For time-boxed pilot-scoped access
    exp: Optional[int] = None

def create_access_token(
    user_id: str,
    role: str,
    department_id: Optional[str] = None,
    org_id: Optional[str] = None,
    permissions: Optional[List[str]] = None,
    pilot_scope_id: Optional[str] = None,
    expires_delta: Optional[timedelta] = None
) -> str:
    """Create a signed JWT token matching Team A's agreed claims shape."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    claims: Dict[str, Any] = {
        "userId": user_id,
        "role": role,
        "departmentId": department_id or org_id,
        "orgId": org_id or department_id,
        "permissions": permissions or [],
        "pilotScopeId": pilot_scope_id,
        "exp": int(expire.timestamp())
    }

    encoded_jwt = jwt.encode(claims, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[TokenPayload]:
    """Verify and parse JWT token into TokenPayload."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return TokenPayload(**payload)
    except JWTError:
        return None
