from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.artifact import Artifact


class ArtifactRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, artifact_id: str) -> Artifact | None:
        stmt = select(Artifact).where(Artifact.id == artifact_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_by_investigation_id(self, investigation_id: str) -> list[Artifact]:
        stmt = (
            select(Artifact)
            .where(Artifact.investigation_id == investigation_id)
            .order_by(Artifact.created_at.desc())
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create(self, artifact: Artifact) -> Artifact:
        self.db.add(artifact)
        await self.db.commit()
        await self.db.refresh(artifact)
        return artifact
