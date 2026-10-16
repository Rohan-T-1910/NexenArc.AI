import uuid
from typing import TYPE_CHECKING, Any

from sqlalchemy import JSON, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.investigation import Investigation


class AgentRun(Base, TimestampMixin):
    __tablename__ = "agent_runs"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: f"run_{uuid.uuid4().hex[:8]}",
    )
    investigation_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("investigations.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    agent_id: Mapped[str] = mapped_column(String(100), nullable=False)
    agent_name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    started_at: Mapped[str] = mapped_column(String(100), nullable=False)
    completed_at: Mapped[str | None] = mapped_column(String(100), nullable=True)
    findings_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    technical_metadata: Mapped[dict[str, Any] | None] = mapped_column(
        JSON, nullable=True
    )

    investigation: Mapped["Investigation"] = relationship(
        "Investigation",
        back_populates="runs",
    )
