from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.schemas.auth import TokenPayload


router = APIRouter(
    prefix="/api/v1/users",
    tags=["Users"],
)


@router.get("/me", response_model=TokenPayload)
def get_my_profile(
    current_user: TokenPayload = Depends(get_current_user),
):
    return current_user