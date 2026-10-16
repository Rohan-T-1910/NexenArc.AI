from app.schemas.agent_run import AgentRunResponse
from app.schemas.artifact import ArtifactResponse
from app.schemas.base import CamelModel
from app.schemas.finding import FindingResponse
from app.schemas.ioc import IOCResponse
from app.schemas.verdict import VerdictResponse


class InvestigationCreate(CamelModel):
    title: str | None = None
    input_content: str
    priority: str = "medium"


class InvestigationUpdate(CamelModel):
    title: str | None = None
    priority: str | None = None
    status: str | None = None
    overall_severity: str | None = None
    confidence: str | None = None


class InvestigationResponse(CamelModel):
    id: str
    title: str
    input_content: str
    input_type: str
    priority: str
    status: str
    overall_severity: str | None = None
    confidence: str | None = None
    created_at: str
    updated_at: str
    current_step: str | None = None
    progress_percentage: int | None = 0
    verdict: VerdictResponse | None = None
    findings: list[FindingResponse] = []
    suspicious_items: list[IOCResponse] = []
    artifacts: list[ArtifactResponse] = []
    runs: list[AgentRunResponse] = []


class PaginatedInvestigations(CamelModel):
    items: list[InvestigationResponse]
    total: int
    page: int
    per_page: int
    pages: int
