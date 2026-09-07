from fastapi import APIRouter, Depends, Query
from app.schemas.auth_dto import TokenResponse, LoginRequest
from app.security.jwt import create_access_token
from app.security.rbac import get_current_user, TokenPayload

router = APIRouter(prefix="/auth", tags=["Auth & JWT Stub (Aligned with Team A)"])

@router.post("/token", response_model=TokenResponse)
def generate_token(request: LoginRequest):
    """Generate a JWT token adhering to the agreed Day-1 JWT claims shape."""
    # Assign standard role-based permissions
    role_permissions = {
        "STARTUP": ["read:contract", "write:proof", "sign:contract", "write:gem"],
        "DEPARTMENT_OFFICER": ["read:contract", "verify:milestone", "sign:contract", "read:kpi"],
        "FINANCE_OFFICER": ["read:contract", "release:payment", "export:ledger"],
        "INDEPENDENT_VALIDATOR": ["read:pilot", "write:kpi", "issue:certificate"],
        "COMMITTEE_MEMBER": ["read:proposal", "sign:scale_up"],
        "ADMIN": ["*"]
    }

    perms = role_permissions.get(request.role.upper(), ["read:contract"])
    token = create_access_token(
        user_id=request.userId,
        role=request.role.upper(),
        department_id=request.departmentId or "DEPT-MAHA-IT",
        org_id=request.orgId or "ORG-STARTUP-01",
        permissions=perms
    )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        userId=request.userId,
        role=request.role.upper(),
        departmentId=request.departmentId or "DEPT-MAHA-IT",
        permissions=perms
    )

@router.get("/me", response_model=TokenPayload)
def get_current_user_profile(current_user: TokenPayload = Depends(get_current_user)):
    """Return verified claims of current JWT bearer token."""
    return current_user
