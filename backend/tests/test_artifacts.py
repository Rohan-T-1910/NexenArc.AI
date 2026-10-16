import io

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_upload_artifact(analyst_client: AsyncClient) -> None:
    # First create an investigation
    inv_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={
            "title": "Artifact Target Case",
            "inputContent": "sample",
            "priority": "medium",
        },
    )
    inv_id = inv_res.json()["id"]

    file_bytes = b"2026-10-16 01:00:00 Failed password for root from 192.168.1.100 port 22 ssh2\n"
    files = {"file": ("auth.log", io.BytesIO(file_bytes), "text/plain")}
    data = {"investigation_id": inv_id}

    response = await analyst_client.post(
        "/api/v1/artifacts/upload", data=data, files=files
    )
    assert response.status_code == 201
    artifact = response.json()
    assert artifact["filename"] == "auth.log"
    assert artifact["type"] == "log"
    assert artifact["investigationId"] == inv_id
    assert artifact["fileSizeBytes"] == len(file_bytes)
    assert len(artifact["sha256"]) == 64


@pytest.mark.asyncio
async def test_upload_artifact_nonexistent_investigation(
    analyst_client: AsyncClient,
) -> None:
    files = {"file": ("test.txt", io.BytesIO(b"hello world"), "text/plain")}
    data = {"investigation_id": "case_nonexistent"}

    response = await analyst_client.post(
        "/api/v1/artifacts/upload", data=data, files=files
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_viewer_cannot_upload_artifact(viewer_client: AsyncClient) -> None:
    files = {"file": ("test.txt", io.BytesIO(b"hello"), "text/plain")}
    data = {"investigation_id": "case_123"}

    response = await viewer_client.post(
        "/api/v1/artifacts/upload", data=data, files=files
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_artifacts_for_investigation(analyst_client: AsyncClient) -> None:
    inv_res = await analyst_client.post(
        "/api/v1/investigations/",
        json={
            "title": "List Artifacts Case",
            "inputContent": "sample",
            "priority": "medium",
        },
    )
    inv_id = inv_res.json()["id"]

    # Upload two files
    f1 = ("log1.log", io.BytesIO(b"line 1"), "text/plain")
    f2 = ("dump.pcap", io.BytesIO(b"pcap binary data"), "application/vnd.tcpdump.pcap")
    await analyst_client.post(
        "/api/v1/artifacts/upload",
        data={"investigation_id": inv_id},
        files={"file": f1},
    )
    await analyst_client.post(
        "/api/v1/artifacts/upload",
        data={"investigation_id": inv_id},
        files={"file": f2},
    )

    list_res = await analyst_client.get(f"/api/v1/artifacts/investigation/{inv_id}")
    assert list_res.status_code == 200
    items = list_res.json()
    assert len(items) == 2
    types = {item["type"] for item in items}
    assert "log" in types
    assert "pcap" in types
