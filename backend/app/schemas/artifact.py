from app.schemas.base import CamelModel


class ArtifactResponse(CamelModel):
    id: str
    investigation_id: str
    filename: str
    file_size_bytes: int
    mime_type: str
    type: str
    uploaded_at: str
    sha256: str | None = None
