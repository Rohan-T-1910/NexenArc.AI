import uuid
from typing import TYPE_CHECKING, Any

from sqlalchemy import JSON, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.investigation import Investigation


class Finding(Base, TimestampMixin):
    __tablename__ = "findings"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: f"fnd_{uuid.uuid4().hex[:8]}",
    )
    investigation_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("investigations.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    agent_role: Mapped[str] = mapped_column(String(100), nullable=False)
    title: Mapped[str] = mapped_column(String(512), nullable=False)
    plain_summary: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(50), default="medium", nullable=False)
    confidence: Mapped[str] = mapped_column(
        String(50), default="medium", nullable=False
    )
    timestamp: Mapped[str] = mapped_column(String(100), nullable=False)
    evidence_references: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    technical_details: Mapped[dict[str, Any] | None] = mapped_column(
        JSON, nullable=True
    )

    investigation: Mapped["Investigation"] = relationship(
        "Investigation",
        back_populates="findings",
    )
