from typing import Annotated

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user, require_roles
from app.db.session import get_db
from app.models.user import User
from app.schemas.investigation import (
    InvestigationCreate,
    InvestigationResponse,
    InvestigationUpdate,
    PaginatedInvestigations,
)
from app.services.investigation_service import InvestigationService

router = APIRouter(prefix="/investigations", tags=["Investigations"])


@router.post(
    "/", response_model=InvestigationResponse, status_code=status.HTTP_201_CREATED
)
async def create_investigation(
    data: InvestigationCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(require_roles(["admin", "analyst"]))],
) -> InvestigationResponse:
    service = InvestigationService(db)
    return await service.create(data)


@router.get("/", response_model=PaginatedInvestigations)
async def list_investigations(
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(get_current_user)],
    query: Annotated[str | None, Query(description="Search title or content")] = None,
    severity: Annotated[
        str | None, Query(description="Filter by severity level")
    ] = None,
    status_filter: Annotated[
        str | None, Query(alias="status", description="Filter by status")
    ] = None,
    page: Annotated[int, Query(ge=1)] = 1,
    per_page: Annotated[int, Query(ge=1, le=100)] = 20,
) -> PaginatedInvestigations:
    service = InvestigationService(db)
    return await service.list(
        query=query,
        severity=severity,
        status_filter=status_filter,
        page=page,
        per_page=per_page,
    )


@router.get("/{investigation_id}", response_model=InvestigationResponse)
async def get_investigation(
    investigation_id: str,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(get_current_user)],
) -> InvestigationResponse:
    service = InvestigationService(db)
    return await service.get(investigation_id)


@router.patch("/{investigation_id}", response_model=InvestigationResponse)
async def update_investigation(
    investigation_id: str,
    data: InvestigationUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(require_roles(["admin", "analyst"]))],
) -> InvestigationResponse:
    service = InvestigationService(db)
    return await service.update(investigation_id, data)


@router.delete("/{investigation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_investigation(
    investigation_id: str,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(require_roles(["admin"]))],
) -> None:
    service = InvestigationService(db)
    await service.delete(investigation_id)


@router.post("/{investigation_id}/run", response_model=InvestigationResponse)
async def run_investigation_stub(
    investigation_id: str,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(require_roles(["admin", "analyst"]))],
) -> InvestigationResponse:
    """Stub runner for Phase 2: transitions investigation status to completed without AI execution."""
    service = InvestigationService(db)
    return await service.run_stub(investigation_id)
