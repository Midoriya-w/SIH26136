from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.schemas.auth import Token, UserCreate, UserResponse


router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


# Temporary in-memory store.
# MongoDB will replace this during database integration.
users_db: dict[str, dict] = {}


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(user: UserCreate):
    if user.username in users_db:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists",
        )

    user_id = str(uuid4())

    users_db[user.username] = {
        "user_id": user_id,
        "username": user.username,
        "password_hash": hash_password(user.password),
        "role": user.role,
        "department_id": user.department_id,
        "organization_id": user.organization_id,
    }

    return UserResponse(
        user_id=user_id,
        username=user.username,
        role=user.role,
        department_id=user.department_id,
        organization_id=user.organization_id,
    )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = users_db.get(form_data.username)

    if not user or not verify_password(
        form_data.password,
        user["password_hash"],
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        user_id=user["user_id"],
        role=user["role"],
        department_id=user["department_id"],
        organization_id=user["organization_id"],
        permissions=[],
    )

    refresh_token = create_refresh_token(
        user_id=user["user_id"],
        role=user["role"],
    )

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
    )