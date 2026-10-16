from collections.abc import AsyncGenerator

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.pool import StaticPool

from app.core.security import create_access_token, hash_password
from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models.user import User

# In-memory SQLite with static pool so all async connections share the same in-memory DB
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = async_sessionmaker(
    bind=test_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


@pytest_asyncio.fixture(scope="function", autouse=True)
async def setup_test_db() -> AsyncGenerator[None, None]:
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    # Seed baseline users
    async with TestingSessionLocal() as session:
        admin_user = User(
            id="usr_admin",
            email="admin@nexenarc.internal",
            name="Admin User",
            role="admin",
            hashed_password=hash_password("AdminPassword123!"),
            is_active=True,
        )
        analyst_user = User(
            id="usr_analyst",
            email="analyst@nexenarc.internal",
            name="Analyst User",
            role="analyst",
            hashed_password=hash_password("AnalystPassword123!"),
            is_active=True,
        )
        viewer_user = User(
            id="usr_viewer",
            email="viewer@nexenarc.internal",
            name="Viewer User",
            role="viewer",
            hashed_password=hash_password("ViewerPassword123!"),
            is_active=True,
        )
        session.add_all([admin_user, analyst_user, viewer_user])
        await session.commit()

    yield

    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    async with TestingSessionLocal() as session:
        yield session


@pytest_asyncio.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        async with TestingSessionLocal() as session:
            yield session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def admin_token() -> str:
    return create_access_token(
        {"sub": "usr_admin", "email": "admin@nexenarc.internal", "role": "admin"}
    )


@pytest_asyncio.fixture
async def analyst_token() -> str:
    return create_access_token(
        {"sub": "usr_analyst", "email": "analyst@nexenarc.internal", "role": "analyst"}
    )


@pytest_asyncio.fixture
async def viewer_token() -> str:
    return create_access_token(
        {"sub": "usr_viewer", "email": "viewer@nexenarc.internal", "role": "viewer"}
    )


@pytest_asyncio.fixture
async def admin_client(client: AsyncClient, admin_token: str) -> AsyncClient:
    client.headers["Authorization"] = f"Bearer {admin_token}"
    return client


@pytest_asyncio.fixture
async def analyst_client(client: AsyncClient, analyst_token: str) -> AsyncClient:
    client.headers["Authorization"] = f"Bearer {analyst_token}"
    return client


@pytest_asyncio.fixture
async def viewer_client(client: AsyncClient, viewer_token: str) -> AsyncClient:
    client.headers["Authorization"] = f"Bearer {viewer_token}"
    return client
