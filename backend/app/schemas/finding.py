from typing import Any

from app.schemas.base import CamelModel


class FindingResponse(CamelModel):
    id: str
    investigation_id: str
    agent_role: str
    title: str
    plain_summary: str
    severity: str
    confidence: str
    timestamp: str
    evidence_references: list[str] | None = None
    technical_details: dict[str, Any] | None = None
