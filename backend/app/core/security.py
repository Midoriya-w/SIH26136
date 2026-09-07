from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash

from app.core.config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    ALGORITHM,
    SECRET_KEY,
)
from app.schemas.auth import TokenPayload, UserRole


password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login"
)

REFRESH_TOKEN_EXPIRE_DAYS = 7


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(
    password: str,
    hashed_password: str,
) -> bool:
    return password_hash.verify(
        password,
        hashed_password,
    )


def create_access_token(
    user_id: str,
    role: UserRole,
    department_id: str | None = None,
    organization_id: str | None = None,
    permissions: list[str] | None = None,
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "user_id": user_id,
        "role": role.value,
        "department_id": department_id,
        "organization_id": organization_id,
        "permissions": permissions or [],
        "token_type": "access",
        "exp": expire,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def create_refresh_token(
    user_id: str,
    role: UserRole,
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        days=REFRESH_TOKEN_EXPIRE_DAYS
    )

    payload = {
        "user_id": user_id,
        "role": role.value,
        "token_type": "refresh",
        "exp": expire,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def decode_access_token(token: str) -> TokenPayload:
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        if payload.get("token_type") != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid access token",
            )

        return TokenPayload(
            user_id=payload["user_id"],
            role=payload["role"],
            department_id=payload.get("department_id"),
            organization_id=payload.get("organization_id"),
            permissions=payload.get("permissions", []),
        )

    except (jwt.PyJWTError, KeyError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(
    token: str = Depends(oauth2_scheme),
) -> TokenPayload:
    return decode_access_token(token)


def require_role(required_role: UserRole):
    def role_checker(
        current_user: TokenPayload = Depends(
            get_current_user
        ),
    ) -> TokenPayload:

        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )

        return current_user

    return role_checker