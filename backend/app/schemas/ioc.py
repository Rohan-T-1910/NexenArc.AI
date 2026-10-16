from typing import Any

from app.schemas.base import CamelModel


class IOCCreate(CamelModel):
    investigation_id: str
    type: str
    value: str
    normalized_value: str | None = None
    severity: str = "medium"
    confidence: str = "medium"
    reputation_score: int | None = None
    threat_actors: list[str] | None = None
    malware_families: list[str] | None = None
    mitre_techniques: list[str] | None = None
    details: dict[str, Any] | None = None


class IOCResponse(CamelModel):
    id: str
    investigation_id: str
    type: str
    value: str
    normalized_value: str
    severity: str
    confidence: str
    reputation_score: int | None = None
    first_seen: str | None = None
    last_seen: str | None = None
    threat_actors: list[str] | None = None
    malware_families: list[str] | None = None
    mitre_techniques: list[str] | None = None
    details: dict[str, Any] | None = None
