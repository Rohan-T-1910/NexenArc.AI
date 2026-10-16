from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user, require_roles
from app.db.session import get_db
from app.models.user import User
from app.schemas.artifact import ArtifactResponse
from app.services.artifact_service import ArtifactService

router = APIRouter(prefix="/artifacts", tags=["File & Log Inspection"])


@router.post(
    "/upload",
    response_model=ArtifactResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_artifact(
    investigation_id: Annotated[str, Form()],
    file: Annotated[UploadFile, File()],
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(require_roles(["admin", "analyst"]))],
) -> ArtifactResponse:
    service = ArtifactService(db)
    return await service.upload(investigation_id, file)


@router.get(
    "/investigation/{investigation_id}",
    response_model=list[ArtifactResponse],
)
async def list_artifacts(
    investigation_id: str,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(get_current_user)],
) -> list[ArtifactResponse]:
    service = ArtifactService(db)
    return await service.list_for_investigation(investigation_id)
