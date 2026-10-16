from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.core.config import settings


class HealthResponse(BaseModel):
    status: str


def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    if settings.cors_origins_list:
        application.add_middleware(
            CORSMiddleware,
            allow_origins=settings.cors_origins_list,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    @application.get("/health", response_model=HealthResponse, tags=["Health"])
    async def health_check() -> HealthResponse:
        return HealthResponse(status="ok")

    @application.get("/", tags=["Root"])
    async def root_index() -> dict[str, str]:
        return {
            "name": "NexenArc Backend API",
            "version": "0.1.0",
            "docs": "/docs",
            "health": "/health",
            "frontend_ui": "http://localhost:5173",
            "message": "NexenArc API is active. Open http://localhost:5173 in your browser for the web application hero page.",
        }

    from app.api.v1.router import api_v1_router

    application.include_router(api_v1_router)

    return application


app = create_application()
