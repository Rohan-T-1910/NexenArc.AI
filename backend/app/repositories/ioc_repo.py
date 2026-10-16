from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ioc import IOC


class IOCRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, ioc_id: str) -> IOC | None:
        stmt = select(IOC).where(IOC.id == ioc_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_by_investigation_id(self, investigation_id: str) -> list[IOC]:
        stmt = (
            select(IOC)
            .where(IOC.investigation_id == investigation_id)
            .order_by(IOC.created_at.desc())
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create(self, ioc: IOC) -> IOC:
        self.db.add(ioc)
        await self.db.commit()
        await self.db.refresh(ioc)
        return ioc
