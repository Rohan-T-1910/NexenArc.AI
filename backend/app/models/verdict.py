import uuid
from typing import TYPE_CHECKING, Any

from sqlalchemy import JSON, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.investigation import Investigation


class Verdict(Base, TimestampMixin):
    __tablename__ = "verdicts"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: f"vrd_{uuid.uuid4().hex[:8]}",
    )
    investigation_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("investigations.id", ondelete="CASCADE"),
        unique=True,
        index=True,
        nullable=False,
    )
    what_happened: Mapped[str] = mapped_column(Text, nullable=False)
    how_serious_is_it: Mapped[str] = mapped_column(Text, nullable=False)
    what_to_do_next: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    overall_severity: Mapped[str] = mapped_column(
        String(50), default="medium", nullable=False
    )
    confidence: Mapped[str] = mapped_column(String(50), default="high", nullable=False)
    confidence_score: Mapped[float] = mapped_column(Float, default=0.9, nullable=False)
    verdict_time: Mapped[str] = mapped_column(String(100), nullable=False)
    analyst_override: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)

    investigation: Mapped["Investigation"] = relationship(
        "Investigation",
        back_populates="verdict",
    )
