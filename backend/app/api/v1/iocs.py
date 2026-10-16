from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user, require_roles
from app.db.session import get_db
from app.models.ioc import IOC
from app.models.user import User
from app.repositories.ioc_repo import IOCRepository
from app.schemas.ioc import IOCCreate, IOCResponse

router = APIRouter(prefix="/iocs", tags=["Suspicious Items"])


@router.post("/", response_model=IOCResponse, status_code=status.HTTP_201_CREATED)
async def create_ioc(
    data: IOCCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(require_roles(["admin", "analyst"]))],
) -> IOCResponse:
    repo = IOCRepository(db)
    ioc = IOC(
        investigation_id=data.investigation_id,
        type=data.type,
        value=data.value,
        normalized_value=data.normalized_value or data.value,
        severity=data.severity,
        confidence=data.confidence,
        reputation_score=data.reputation_score,
        threat_actors=data.threat_actors,
        malware_families=data.malware_families,
        mitre_techniques=data.mitre_techniques,
        details=data.details,
    )
    created = await repo.create(ioc)
    return IOCResponse.model_validate(created)


@router.get("/investigation/{investigation_id}", response_model=list[IOCResponse])
async def list_iocs_for_investigation(
    investigation_id: str,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(get_current_user)],
) -> list[IOCResponse]:
    repo = IOCRepository(db)
    items = await repo.list_by_investigation_id(investigation_id)
    return [IOCResponse.model_validate(item) for item in items]
