import uuid
from typing import TYPE_CHECKING, Any

from sqlalchemy import JSON, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.investigation import Investigation


class IOC(Base, TimestampMixin):
    __tablename__ = "iocs"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: f"ioc_{uuid.uuid4().hex[:8]}",
    )
    investigation_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("investigations.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    type: Mapped[str] = mapped_column(String(50), nullable=False)
    value: Mapped[str] = mapped_column(String(1024), nullable=False)
    normalized_value: Mapped[str] = mapped_column(String(1024), nullable=False)
    severity: Mapped[str] = mapped_column(String(50), default="medium", nullable=False)
    confidence: Mapped[str] = mapped_column(
        String(50), default="medium", nullable=False
    )
    reputation_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    first_seen: Mapped[str | None] = mapped_column(String(100), nullable=True)
    last_seen: Mapped[str | None] = mapped_column(String(100), nullable=True)
    threat_actors: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    malware_families: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    mitre_techniques: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    details: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)

    investigation: Mapped["Investigation"] = relationship(
        "Investigation",
        back_populates="suspicious_items",
    )
