import hashlib
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.artifact import Artifact
from app.repositories.artifact_repo import ArtifactRepository
from app.repositories.investigation_repo import InvestigationRepository
from app.schemas.artifact import ArtifactResponse


class ArtifactService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        self.repo = ArtifactRepository(db)
        self.inv_repo = InvestigationRepository(db)

    @staticmethod
    def detect_artifact_type(filename: str, mime_type: str) -> str:
        fn = filename.lower()
        if fn.endswith((".log", ".txt")):
            return "log"
        if fn.endswith((".eml", ".msg")):
            return "email_file"
        if fn.endswith((".pcap", ".pcapng", ".cap")):
            return "pcap"
        if fn.endswith((".pdf", ".doc", ".docx", ".csv", ".json")):
            return "document"
        if fn.endswith((".exe", ".dll", ".bin", ".elf", ".sh")):
            return "binary"
        if "text" in mime_type:
            return "text"
        return "document"

    async def upload(self, investigation_id: str, file: UploadFile) -> ArtifactResponse:
        inv = await self.inv_repo.get_by_id(investigation_id)
        if not inv:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Investigation with ID '{investigation_id}' not found",
            )

        content = await file.read()
        file_size = len(content)

        if file_size > settings.MAX_UPLOAD_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_BYTES // (1024 * 1024)}MB",
            )

        sha256_hash = hashlib.sha256(content).hexdigest()
        filename = file.filename or "unknown_file"
        mime_type = file.content_type or "application/octet-stream"
        artifact_type = self.detect_artifact_type(filename, mime_type)

        upload_dir = Path(settings.UPLOAD_DIR)
        upload_dir.mkdir(parents=True, exist_ok=True)

        storage_filename = f"{uuid.uuid4().hex}_{filename}"
        storage_path = upload_dir / storage_filename

        with open(storage_path, "wb") as f:
            f.write(content)

        artifact = Artifact(
            investigation_id=investigation_id,
            filename=filename,
            file_size_bytes=file_size,
            mime_type=mime_type,
            type=artifact_type,
            sha256=sha256_hash,
            storage_path=str(storage_path),
        )
        created = await self.repo.create(artifact)
        return ArtifactResponse.model_validate(created)

    async def list_for_investigation(
        self, investigation_id: str
    ) -> list[ArtifactResponse]:
        artifacts = await self.repo.list_by_investigation_id(investigation_id)
        return [ArtifactResponse.model_validate(a) for a in artifacts]
