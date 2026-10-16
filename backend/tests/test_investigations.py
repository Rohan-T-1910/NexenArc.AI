import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_investigation_auto_detect_url(
    analyst_client: AsyncClient,
) -> None:
    payload = {
        "title": "Suspicious login portal report",
        "inputContent": "https://malicious-payroll-portal.fake/login.php",
        "priority": "high",
    }
    response = await analyst_client.post("/api/v1/investigations/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Suspicious login portal report"
    assert data["inputContent"] == "https://malicious-payroll-portal.fake/login.php"
    assert data["inputType"] == "url"
    assert data["status"] == "pending"
    assert data["currentStep"] == "Pending intake"
    assert data["progressPercentage"] == 0
    assert "id" in data


@pytest.mark.asyncio
async def test_create_investigation_auto_detect_ip(analyst_client: AsyncClient) -> None:
    payload = {
        "title": "",
        "inputContent": "194.26.29.112",
        "priority": "medium",
    }
    response = await analyst_client.post("/api/v1/investigations/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["inputType"] == "ip"
    # Auto-generated title when blank
    assert "Investigation of suspicious ip" in data["title"]


@pytest.mark.asyncio
async def test_viewer_cannot_create_investigation(viewer_client: AsyncClient) -> None:
    payload = {
        "title": "Unauthorized attempt",
        "inputContent": "test@domain.com",
        "priority": "low",
    }
    response = await viewer_client.post("/api/v1/investigations/", json=payload)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_and_filter_investigations(analyst_client: AsyncClient) -> None:
    # Create two investigations
    await analyst_client.post(
        "/api/v1/investigations/",
        json={
            "title": "Phishing email case",
            "inputContent": "attacker@evil.com",
            "priority": "high",
        },
    )
    await analyst_client.post(
        "/api/v1/investigations/",
        json={
            "title": "Ransomware host query",
            "inputContent": "10.0.0.99",
            "priority": "critical",
        },
    )

    # List all
    res = await analyst_client.get("/api/v1/investigations/")
    assert res.status_code == 200
    data = res.json()
    assert data["total"] == 2
    assert len(data["items"]) == 2

    # Query search
    res_search = await analyst_client.get("/api/v1/investigations/?query=Ransomware")
    assert res_search.status_code == 200
    search_data = res_search.json()
    assert search_data["total"] == 1
    assert "Ransomware" in search_data["items"][0]["title"]


@pytest.mark.asyncio
async def test_get_investigation_by_id(analyst_client: AsyncClient) -> None:
    create_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={"title": "Case to fetch", "inputContent": "8.8.8.8", "priority": "low"},
    )
    inv_id = create_res.json()["id"]

    get_res = await analyst_client.get(f"/api/v1/investigations/{inv_id}")
    assert get_res.status_code == 200
    assert get_res.json()["id"] == inv_id
    assert get_res.json()["title"] == "Case to fetch"


@pytest.mark.asyncio
async def test_get_nonexistent_investigation(analyst_client: AsyncClient) -> None:
    res = await analyst_client.get("/api/v1/investigations/case_doesnotexist")
    assert res.status_code == 404


@pytest.mark.asyncio
async def test_update_investigation(analyst_client: AsyncClient) -> None:
    create_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={
            "title": "Initial Title",
            "inputContent": "suspicious.com",
            "priority": "low",
        },
    )
    inv_id = create_res.json()["id"]

    update_res = await analyst_client.patch(
        f"/api/v1/investigations/{inv_id}",
        json={
            "title": "Updated Title",
            "priority": "high",
            "overallSeverity": "critical",
        },
    )
    assert update_res.status_code == 200
    assert update_res.json()["title"] == "Updated Title"
    assert update_res.json()["priority"] == "high"
    assert update_res.json()["overallSeverity"] == "critical"


@pytest.mark.asyncio
async def test_run_investigation_stub(analyst_client: AsyncClient) -> None:
    create_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={
            "title": "Run Stub Case",
            "inputContent": "https://test.example/phish",
            "priority": "high",
        },
    )
    inv_id = create_res.json()["id"]

    run_res = await analyst_client.post(f"/api/v1/investigations/{inv_id}/run")
    assert run_res.status_code == 200
    data = run_res.json()
    assert data["status"] == "completed"
    assert data["progressPercentage"] == 100
    assert data["currentStep"] == "Investigation complete"
    assert data["verdict"] is not None
    assert len(data["findings"]) >= 1
    assert len(data["runs"]) >= 1


@pytest.mark.asyncio
async def test_delete_investigation_as_admin(admin_client: AsyncClient) -> None:
    create_res = await admin_client.post(
        "/api/v1/investigations/",
        json={"title": "To be deleted", "inputContent": "trash.com", "priority": "low"},
    )
    inv_id = create_res.json()["id"]

    del_res = await admin_client.delete(f"/api/v1/investigations/{inv_id}")
    assert del_res.status_code == 204

    get_res = await admin_client.get(f"/api/v1/investigations/{inv_id}")
    assert get_res.status_code == 404


@pytest.mark.asyncio
async def test_analyst_cannot_delete_investigation(analyst_client: AsyncClient) -> None:
    create_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={
            "title": "Cannot delete",
            "inputContent": "nodelete.com",
            "priority": "low",
        },
    )
    inv_id = create_res.json()["id"]

    del_res = await analyst_client.delete(f"/api/v1/investigations/{inv_id}")
    assert del_res.status_code == 403
