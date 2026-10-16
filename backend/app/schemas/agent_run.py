from typing import Any

from app.schemas.base import CamelModel


class AgentRunResponse(CamelModel):
    id: str
    investigation_id: str
    agent_id: str
    agent_name: str
    role: str
    status: str
    started_at: str
    completed_at: str | None = None
    findings_count: int = 0
    technical_metadata: dict[str, Any] | None = None


class AdvancedSettings(CamelModel):
    model: str
    temperature: float
    max_tokens: int


class TeamMemberResponse(CamelModel):
    id: str
    name: str
    internal_role: str
    responsibility: str
    status: str = "ready"
    recent_activity: str
    advanced_settings: AdvancedSettings | None = None
