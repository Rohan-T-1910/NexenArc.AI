from datetime import datetime

from pydantic import EmailStr, Field

from app.schemas.base import CamelModel


class Token(CamelModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: "UserResponse | None" = None


class TokenPayload(CamelModel):
    sub: str
    role: str
    exp: int
    type: str


class UserRegister(CamelModel):
    email: EmailStr
    password: str = Field(min_length=8)
    name: str = Field(min_length=2)
    role: str = "analyst"
    avatar_url: str | None = None


class UserLogin(CamelModel):
    email: EmailStr
    password: str


class RefreshRequest(CamelModel):
    refresh_token: str


class UserResponse(CamelModel):
    id: str
    email: EmailStr
    name: str
    role: str
    avatar_url: str | None = None
    is_active: bool = True
    created_at: datetime
