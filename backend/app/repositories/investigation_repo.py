from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.investigation import Investigation


class InvestigationRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, investigation_id: str) -> Investigation | None:
        stmt = (
            select(Investigation)
            .where(Investigation.id == investigation_id)
            .options(
                selectinload(Investigation.verdict),
                selectinload(Investigation.findings),
                selectinload(Investigation.suspicious_items),
                selectinload(Investigation.artifacts),
                selectinload(Investigation.runs),
            )
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_with_filters(
        self,
        query: str | None = None,
        severity: str | None = None,
        status: str | None = None,
        offset: int = 0,
        limit: int = 20,
    ) -> list[Investigation]:
        stmt = (
            select(Investigation)
            .options(
                selectinload(Investigation.verdict),
                selectinload(Investigation.findings),
                selectinload(Investigation.suspicious_items),
                selectinload(Investigation.artifacts),
                selectinload(Investigation.runs),
            )
            .order_by(Investigation.created_at.desc())
        )

        if query:
            q_like = f"%{query}%"
            stmt = stmt.where(
                or_(
                    Investigation.title.ilike(q_like),
                    Investigation.input_content.ilike(q_like),
                    Investigation.id.ilike(q_like),
                )
            )

        if severity:
            stmt = stmt.where(Investigation.overall_severity == severity)

        if status:
            stmt = stmt.where(Investigation.status == status)

        stmt = stmt.offset(offset).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def count_with_filters(
        self,
        query: str | None = None,
        severity: str | None = None,
        status: str | None = None,
    ) -> int:
        stmt = select(func.count(Investigation.id))

        if query:
            q_like = f"%{query}%"
            stmt = stmt.where(
                or_(
                    Investigation.title.ilike(q_like),
                    Investigation.input_content.ilike(q_like),
                    Investigation.id.ilike(q_like),
                )
            )

        if severity:
            stmt = stmt.where(Investigation.overall_severity == severity)

        if status:
            stmt = stmt.where(Investigation.status == status)

        result = await self.db.execute(stmt)
        return result.scalar_one() or 0

    async def create(self, investigation: Investigation) -> Investigation:
        self.db.add(investigation)
        await self.db.commit()
        await self.db.refresh(investigation)
        return (await self.get_by_id(investigation.id)) or investigation

    async def update(self, investigation: Investigation) -> Investigation:
        await self.db.commit()
        await self.db.refresh(investigation)
        return (await self.get_by_id(investigation.id)) or investigation

    async def delete(self, investigation: Investigation) -> None:
        await self.db.delete(investigation)
        await self.db.commit()
