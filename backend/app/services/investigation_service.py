import re
import uuid
from datetime import UTC, datetime

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.agent_run import AgentRun
from app.models.finding import Finding
from app.models.investigation import Investigation
from app.models.verdict import Verdict
from app.repositories.investigation_repo import InvestigationRepository
from app.schemas.agent_run import AgentRunResponse
from app.schemas.artifact import ArtifactResponse
from app.schemas.finding import FindingResponse
from app.schemas.investigation import (
    InvestigationCreate,
    InvestigationResponse,
    InvestigationUpdate,
    PaginatedInvestigations,
)
from app.schemas.ioc import IOCResponse
from app.schemas.verdict import VerdictResponse


class InvestigationService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        self.repo = InvestigationRepository(db)

    @staticmethod
    def detect_input_type(content: str) -> str:
        trimmed = content.strip()
        if trimmed.startswith("http://") or trimmed.startswith("https://"):
            return "url"
        if re.match(r"^(?:\d{1,3}\.){3}\d{1,3}$", trimmed):
            return "ip"
        if "@" in trimmed and "." in trimmed:
            return "email"
        if re.match(r"^[a-fA-F0-9]{32,64}$", trimmed):
            return "hash"
        if "log" in trimmed.lower() or ":" in trimmed:
            return "log"
        return "mixed"

    @classmethod
    def to_response(cls, inv: Investigation) -> InvestigationResponse:
        verdict_resp = None
        if inv.verdict:
            verdict_resp = VerdictResponse.model_validate(inv.verdict)

        findings_resp = [FindingResponse.model_validate(f) for f in inv.findings]
        iocs_resp = [IOCResponse.model_validate(ioc) for ioc in inv.suspicious_items]
        artifacts_resp = [ArtifactResponse.model_validate(art) for art in inv.artifacts]
        runs_resp = [AgentRunResponse.model_validate(run) for run in inv.runs]

        created_str = (
            inv.created_at.strftime("%Y-%m-%d %H:%M:%S")
            if inv.created_at
            else datetime.now(UTC).strftime("%Y-%m-%d %H:%M:%S")
        )
        updated_str = (
            inv.updated_at.strftime("%Y-%m-%d %H:%M:%S")
            if inv.updated_at
            else datetime.now(UTC).strftime("%Y-%m-%d %H:%M:%S")
        )

        return InvestigationResponse(
            id=inv.id,
            title=inv.title,
            input_content=inv.input_content,
            input_type=inv.input_type,
            priority=inv.priority,
            status=inv.status,
            overall_severity=inv.overall_severity,
            confidence=inv.confidence,
            created_at=created_str,
            updated_at=updated_str,
            current_step=inv.current_step,
            progress_percentage=inv.progress_percentage or 0,
            verdict=verdict_resp,
            findings=findings_resp,
            suspicious_items=iocs_resp,
            artifacts=artifacts_resp,
            runs=runs_resp,
        )

    async def create(self, data: InvestigationCreate) -> InvestigationResponse:
        detected_type = self.detect_input_type(data.input_content)
        title = data.title
        if not title or not title.strip():
            title = f"Investigation of suspicious {detected_type}"

        new_id = f"case_{uuid.uuid4().hex[:8]}"
        investigation = Investigation(
            id=new_id,
            title=title,
            input_content=data.input_content,
            input_type=detected_type,
            priority=data.priority,
            status="pending",
            overall_severity=None,
            confidence=None,
            current_step="Pending intake",
            progress_percentage=0,
        )
        created = await self.repo.create(investigation)
        return self.to_response(created)

    async def get(self, investigation_id: str) -> InvestigationResponse:
        inv = await self.repo.get_by_id(investigation_id)
        if not inv:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Investigation with ID '{investigation_id}' not found",
            )
        return self.to_response(inv)

    async def list(
        self,
        query: str | None = None,
        severity: str | None = None,
        status_filter: str | None = None,
        page: int = 1,
        per_page: int = 20,
    ) -> PaginatedInvestigations:
        offset = (page - 1) * per_page
        total = await self.repo.count_with_filters(
            query=query,
            severity=severity,
            status=status_filter,
        )
        items = await self.repo.list_with_filters(
            query=query,
            severity=severity,
            status=status_filter,
            offset=offset,
            limit=per_page,
        )
        pages = (total + per_page - 1) // per_page if total > 0 else 1

        return PaginatedInvestigations(
            items=[self.to_response(inv) for inv in items],
            total=total,
            page=page,
            per_page=per_page,
            pages=pages,
        )

    async def update(
        self,
        investigation_id: str,
        data: InvestigationUpdate,
    ) -> InvestigationResponse:
        inv = await self.repo.get_by_id(investigation_id)
        if not inv:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Investigation with ID '{investigation_id}' not found",
            )

        if data.title is not None:
            inv.title = data.title
        if data.priority is not None:
            inv.priority = data.priority
        if data.status is not None:
            inv.status = data.status
        if data.overall_severity is not None:
            inv.overall_severity = data.overall_severity
        if data.confidence is not None:
            inv.confidence = data.confidence

        updated = await self.repo.update(inv)
        return self.to_response(updated)

    async def delete(self, investigation_id: str) -> None:
        inv = await self.repo.get_by_id(investigation_id)
        if not inv:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Investigation with ID '{investigation_id}' not found",
            )
        await self.repo.delete(inv)

    async def run_stub(self, investigation_id: str) -> InvestigationResponse:
        inv = await self.repo.get_by_id(investigation_id)
        if not inv:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Investigation with ID '{investigation_id}' not found",
            )

        # Stub implementation per prompt: only sets status without AI logic
        inv.status = "completed"
        inv.progress_percentage = 100
        inv.current_step = "Investigation complete"
        inv.overall_severity = inv.overall_severity or "medium"
        inv.confidence = inv.confidence or "high"

        if not inv.verdict:
            verdict = Verdict(
                investigation_id=inv.id,
                what_happened="Baseline security assessment completed on submitted content.",
                how_serious_is_it="Analysis completed with standard risk profile.",
                what_to_do_next=[
                    "Review indicators against internal network logs.",
                    "Verify sender address authenticity.",
                ],
                overall_severity=inv.overall_severity,
                confidence="high",
                confidence_score=0.88,
                verdict_time="Just now",
            )
            self.db.add(verdict)

        if not inv.runs:
            run = AgentRun(
                investigation_id=inv.id,
                agent_id="triage",
                agent_name="Quick assessment",
                role="Triage",
                status="completed",
                started_at="Just now",
                completed_at="Just now",
                findings_count=1,
            )
            self.db.add(run)

        if not inv.findings:
            finding = Finding(
                investigation_id=inv.id,
                agent_role="Quick assessment",
                title="Input processed by triage stub",
                plain_summary="Format validated and queued for downstream enrichment.",
                severity="medium",
                confidence="high",
                timestamp="Just now",
            )
            self.db.add(finding)

        updated = await self.repo.update(inv)
        return self.to_response(updated)
