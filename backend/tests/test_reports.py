import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.investigation import Investigation
from app.models.report import Report


@pytest.mark.asyncio
async def test_list_and_get_report(
    analyst_client: AsyncClient, db_session: AsyncSession
) -> None:
    # Seed an investigation and report directly
    inv = Investigation(
        id="case_rep_test",
        title="Report Test Case",
        input_content="malicious.link",
        input_type="url",
        priority="high",
        status="completed",
    )
    rep = Report(
        id="rep_test_01",
        investigation_id="case_rep_test",
        investigation_title="Report Test Case",
        generated_at="Just now",
        generated_by="Writing your report",
        executive_summary="Summary of findings and containment advice.",
        sections=[
            {"id": "sec_1", "title": "Overview", "content": "Details here", "order": 1}
        ],
        ioc_count=1,
        artifacts_count=0,
    )
    db_session.add_all([inv, rep])
    await db_session.commit()

    # List reports
    list_res = await analyst_client.get("/api/v1/reports/")
    assert list_res.status_code == 200
    reports = list_res.json()
    assert len(reports) >= 1
    found = next((r for r in reports if r["id"] == "rep_test_01"), None)
    assert found is not None
    assert found["investigationTitle"] == "Report Test Case"

    # Get single report
    get_res = await analyst_client.get("/api/v1/reports/rep_test_01")
    assert get_res.status_code == 200
    assert get_res.json()["id"] == "rep_test_01"


@pytest.mark.asyncio
async def test_get_nonexistent_report(analyst_client: AsyncClient) -> None:
    res = await analyst_client.get("/api/v1/reports/rep_missing")
    assert res.status_code == 404
