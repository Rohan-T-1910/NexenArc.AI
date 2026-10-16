import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "analyst@nexenarc.internal", "password": "AnalystPassword123!"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "accessToken" in data
    assert "refreshToken" in data
    assert data["tokenType"] == "bearer"
    assert data["user"]["email"] == "analyst@nexenarc.internal"
    assert data["user"]["role"] == "analyst"


@pytest.mark.asyncio
async def test_login_invalid_password(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "analyst@nexenarc.internal", "password": "WrongPassword999!"},
    )
    assert response.status_code == 401
    assert "Incorrect email or password" in response.json()["detail"]


@pytest.mark.asyncio
async def test_login_nonexistent_user(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "nobody@nexenarc.internal", "password": "Password123!"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_register_new_user(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/auth/register",
        json={
            "email": "newanalyst@nexenarc.internal",
            "password": "SecurePassword123!",
            "name": "Jordan Lee",
            "role": "analyst",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newanalyst@nexenarc.internal"
    assert data["name"] == "Jordan Lee"
    assert data["role"] == "analyst"
    assert data["isActive"] is True


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/auth/register",
        json={
            "email": "analyst@nexenarc.internal",
            "password": "AnotherPassword123!",
            "name": "Duplicate User",
            "role": "analyst",
        },
    )
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]


@pytest.mark.asyncio
async def test_refresh_token(client: AsyncClient) -> None:
    login_resp = await client.post(
        "/api/v1/auth/login",
        json={"email": "analyst@nexenarc.internal", "password": "AnalystPassword123!"},
    )
    refresh_token = login_resp.json()["refreshToken"]

    response = await client.post(
        "/api/v1/auth/refresh",
        json={"refreshToken": refresh_token},
    )
    assert response.status_code == 200
    data = response.json()
    assert "accessToken" in data
    assert "refreshToken" in data


@pytest.mark.asyncio
async def test_get_me(analyst_client: AsyncClient) -> None:
    response = await analyst_client.get("/api/v1/auth/me")
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "analyst@nexenarc.internal"
    assert data["name"] == "Analyst User"
    assert data["role"] == "analyst"


@pytest.mark.asyncio
async def test_get_me_unauthenticated(client: AsyncClient) -> None:
    response = await client.get("/api/v1/auth/me")
    assert response.status_code == 401
