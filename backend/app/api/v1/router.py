from fastapi import APIRouter

from app.api.v1.agents import router as agents_router
from app.api.v1.artifacts import router as artifacts_router
from app.api.v1.auth import router as auth_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.investigations import router as investigations_router
from app.api.v1.iocs import router as iocs_router
from app.api.v1.reports import router as reports_router

api_v1_router = APIRouter(prefix="/api/v1")

api_v1_router.include_router(auth_router)
api_v1_router.include_router(investigations_router)
api_v1_router.include_router(iocs_router)
api_v1_router.include_router(artifacts_router)
api_v1_router.include_router(dashboard_router)
api_v1_router.include_router(agents_router)
api_v1_router.include_router(reports_router)
