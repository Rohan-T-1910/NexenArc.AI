import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_team_members_authenticated(viewer_client: AsyncClient) -> None:
    response = await viewer_client.get("/api/v1/agents/")
    assert response.status_code == 200
    agents = response.json()
    assert len(agents) >= 5

    names = [a["name"] for a in agents]
    assert "Quick assessment" in names
    assert "Checking suspicious items" in names
    assert "Writing your report" in names

    # Plain language check: public names should not be internal jargon like "TriageAgentLLM"
    for a in agents:
        assert "LLM" not in a["name"]
        assert "Agent" not in a["name"]
        assert "id" in a
        assert "responsibility" in a


@pytest.mark.asyncio
async def test_list_team_members_unauthenticated(client: AsyncClient) -> None:
    response = await client.get("/api/v1/agents/")
    assert response.status_code == 401
