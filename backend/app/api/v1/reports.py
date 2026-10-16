from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.repositories.report_repo import ReportRepository
from app.schemas.report import ReportResponse, ReportSection
from app.schemas.verdict import VerdictResponse

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/", response_model=list[ReportResponse])
async def list_reports(
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(get_current_user)],
    offset: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 50,
) -> list[ReportResponse]:
    repo = ReportRepository(db)
    reports = await repo.list_all(offset=offset, limit=limit)
    res: list[ReportResponse] = []
    for r in reports:
        verdict_resp = None
        if r.investigation and r.investigation.verdict:
            verdict_resp = VerdictResponse.model_validate(r.investigation.verdict)

        sections = [
            ReportSection.model_validate(s) if isinstance(s, dict) else s
            for s in r.sections
        ]
        res.append(
            ReportResponse(
                id=r.id,
                investigation_id=r.investigation_id,
                investigation_title=r.investigation_title,
                generated_at=r.generated_at,
                generated_by=r.generated_by,
                executive_summary=r.executive_summary,
                verdict=verdict_resp,
                sections=sections,
                ioc_count=r.ioc_count,
                artifacts_count=r.artifacts_count,
            )
        )
    return res


@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(
    report_id: str,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[User, Depends(get_current_user)],
) -> ReportResponse:
    repo = ReportRepository(db)
    r = await repo.get_by_id(report_id)
    if not r:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Report with ID '{report_id}' not found",
        )

    verdict_resp = None
    if r.investigation and r.investigation.verdict:
        verdict_resp = VerdictResponse.model_validate(r.investigation.verdict)

    sections = [
        ReportSection.model_validate(s) if isinstance(s, dict) else s
        for s in r.sections
    ]
    return ReportResponse(
        id=r.id,
        investigation_id=r.investigation_id,
        investigation_title=r.investigation_title,
        generated_at=r.generated_at,
        generated_by=r.generated_by,
        executive_summary=r.executive_summary,
        verdict=verdict_resp,
        sections=sections,
        ioc_count=r.ioc_count,
        artifacts_count=r.artifacts_count,
    )
