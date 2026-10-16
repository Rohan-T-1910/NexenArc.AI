from typing import Any

from app.schemas.base import CamelModel


class VerdictResponse(CamelModel):
    id: str
    investigation_id: str
    what_happened: str
    how_serious_is_it: str
    what_to_do_next: list[str]
    overall_severity: str
    confidence: str
    confidence_score: float
    verdict_time: str
    analyst_override: dict[str, Any] | None = None
