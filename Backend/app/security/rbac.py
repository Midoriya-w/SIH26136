from enum import Enum
from typing import List, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.security.jwt import verify_token, TokenPayload

security_scheme = HTTPBearer(auto_error=False)

class UserRole(str, Enum):
    STARTUP = "STARTUP"
    DEPARTMENT_OFFICER = "DEPARTMENT_OFFICER"
    FINANCE_OFFICER = "FINANCE_OFFICER"
    INDEPENDENT_VALIDATOR = "INDEPENDENT_VALIDATOR"
    COMMITTEE_MEMBER = "COMMITTEE_MEMBER"
    ADMIN = "ADMIN"

def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme)
) -> TokenPayload:
    """Dependency to extract and validate the JWT from the Authorization header."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired JWT token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

def require_roles(allowed_roles: List[str]):
    """Role-Based Access Control (RBAC) dependency factory."""
    def role_checker(user: TokenPayload = Depends(get_current_user)) -> TokenPayload:
        if user.role not in allowed_roles and user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied: User role '{user.role}' not permitted for this resource."
            )
        return user
    return role_checker

def require_pilot_scope(contract_id: str, user: TokenPayload = Depends(get_current_user)) -> TokenPayload:
    """Validate that time-boxed independent validator access is scoped to this specific pilot."""
    if user.role == UserRole.INDEPENDENT_VALIDATOR:
        if user.pilotScopeId and user.pilotScopeId != contract_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Validator access is restricted to a different pilot."
            )
    return user
