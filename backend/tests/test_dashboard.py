import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_dashboard_metrics_authenticated(viewer_client: AsyncClient) -> None:
    response = await viewer_client.get("/api/v1/dashboard/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "activeInvestigationsCount" in data
    assert "highRiskCount" in data
    assert "verifiedSafeCount" in data
    assert "teamResponseRate" in data
    assert "severityTrends" in data
    assert "threatCategories" in data
    assert "recentInvestigations" in data
    assert isinstance(data["severityTrends"], list)
    assert isinstance(data["threatCategories"], list)
    assert isinstance(data["recentInvestigations"], list)


@pytest.mark.asyncio
async def test_dashboard_metrics_unauthenticated(client: AsyncClient) -> None:
    response = await client.get("/api/v1/dashboard/metrics")
    assert response.status_code == 401
