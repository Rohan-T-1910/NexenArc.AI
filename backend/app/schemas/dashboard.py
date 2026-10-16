from app.schemas.base import CamelModel
from app.schemas.investigation import InvestigationResponse


class SeverityTrendItem(CamelModel):
    date: str
    critical: int
    high: int
    medium: int
    low: int
    safe: int


class ThreatCategoryItem(CamelModel):
    category: str
    count: int
    percentage: int


class DashboardMetricsResponse(CamelModel):
    active_investigations_count: int
    high_risk_count: int
    verified_safe_count: int
    team_response_rate: float
    severity_trends: list[SeverityTrendItem]
    threat_categories: list[ThreatCategoryItem]
    recent_investigations: list[InvestigationResponse]
