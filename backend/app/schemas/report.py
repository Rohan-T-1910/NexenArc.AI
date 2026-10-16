from app.schemas.base import CamelModel
from app.schemas.verdict import VerdictResponse


class ReportSection(CamelModel):
    id: str
    title: str
    content: str
    order: int


class ReportResponse(CamelModel):
    id: str
    investigation_id: str
    investigation_title: str
    generated_at: str
    generated_by: str
    executive_summary: str
    verdict: VerdictResponse | None = None
    sections: list[ReportSection] = []
    ioc_count: int = 0
    artifacts_count: int = 0
