import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_ioc(analyst_client: AsyncClient) -> None:
    inv_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={"title": "IOC Host Case", "inputContent": "sample", "priority": "high"},
    )
    inv_id = inv_res.json()["id"]

    ioc_payload = {
        "investigationId": inv_id,
        "type": "domain",
        "value": "phishing-bank-update.com",
        "severity": "critical",
        "confidence": "high",
        "reputationScore": 95,
        "threatActors": ["TA505"],
        "mitreTechniques": ["T1566"],
    }
    res = await analyst_client.post("/api/v1/iocs/", json=ioc_payload)
    assert res.status_code == 201
    data = res.json()
    assert data["value"] == "phishing-bank-update.com"
    assert data["type"] == "domain"
    assert data["severity"] == "critical"
    assert data["investigationId"] == inv_id
    assert "TA505" in data["threatActors"]


@pytest.mark.asyncio
async def test_list_iocs_for_investigation(analyst_client: AsyncClient) -> None:
    inv_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={"title": "Multi-IOC Case", "inputContent": "sample", "priority": "high"},
    )
    inv_id = inv_res.json()["id"]

    await analyst_client.post(
        "/api/v1/iocs/",
        json={
            "investigationId": inv_id,
            "type": "ip",
            "value": "185.220.101.5",
            "severity": "high",
            "confidence": "high",
        },
    )
    await analyst_client.post(
        "/api/v1/iocs/",
        json={
            "investigationId": inv_id,
            "type": "hash",
            "value": "44d88612fea8a8f36de82e1278abb02f",
            "severity": "critical",
            "confidence": "high",
        },
    )

    list_res = await analyst_client.get(f"/api/v1/iocs/investigation/{inv_id}")
    assert list_res.status_code == 200
    items = list_res.json()
    assert len(items) == 2


@pytest.mark.asyncio
async def test_viewer_cannot_create_ioc(viewer_client: AsyncClient) -> None:
    res = await viewer_client.post(
        "/api/v1/iocs/",
        json={
            "investigationId": "case_123",
            "type": "ip",
            "value": "1.1.1.1",
            "severity": "low",
            "confidence": "low",
        },
    )
    assert res.status_code == 403
