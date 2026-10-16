import uuid
from typing import TYPE_CHECKING, Any

from sqlalchemy import JSON, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.investigation import Investigation


class Report(Base, TimestampMixin):
    __tablename__ = "reports"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: f"rep_{uuid.uuid4().hex[:8]}",
    )
    investigation_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("investigations.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    investigation_title: Mapped[str] = mapped_column(String(512), nullable=False)
    generated_at: Mapped[str] = mapped_column(String(100), nullable=False)
    generated_by: Mapped[str] = mapped_column(
        String(255), default="Writing your report", nullable=False
    )
    executive_summary: Mapped[str] = mapped_column(Text, nullable=False)
    sections: Mapped[list[dict[str, Any]]] = mapped_column(
        JSON, default=list, nullable=False
    )
    ioc_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    artifacts_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    investigation: Mapped["Investigation"] = relationship(
        "Investigation",
        back_populates="reports",
    )
