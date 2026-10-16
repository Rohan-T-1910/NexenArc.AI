from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.investigation import Investigation
from app.models.report import Report


class ReportRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, report_id: str) -> Report | None:
        stmt = (
            select(Report)
            .where(Report.id == report_id)
            .options(
                selectinload(Report.investigation).selectinload(Investigation.verdict)
            )
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_all(self, offset: int = 0, limit: int = 50) -> list[Report]:
        stmt = (
            select(Report)
            .options(
                selectinload(Report.investigation).selectinload(Investigation.verdict)
            )
            .order_by(Report.created_at.desc())
            .offset(offset)
            .limit(limit)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create(self, report: Report) -> Report:
        self.db.add(report)
        await self.db.commit()
        await self.db.refresh(report)
        return (await self.get_by_id(report.id)) or report
