import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.agent_run import AgentRun
    from app.models.artifact import Artifact
    from app.models.finding import Finding
    from app.models.ioc import IOC
    from app.models.report import Report
    from app.models.verdict import Verdict


class Investigation(Base, TimestampMixin):
    __tablename__ = "investigations"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: f"case_{uuid.uuid4().hex[:8]}",
    )
    title: Mapped[str] = mapped_column(String(512), nullable=False)
    input_content: Mapped[str] = mapped_column(Text, nullable=False)
    input_type: Mapped[str] = mapped_column(String(50), default="mixed", nullable=False)
    priority: Mapped[str] = mapped_column(String(50), default="medium", nullable=False)
    status: Mapped[str] = mapped_column(
        String(50), default="pending", index=True, nullable=False
    )
    overall_severity: Mapped[str | None] = mapped_column(
        String(50), index=True, nullable=True
    )
    confidence: Mapped[str | None] = mapped_column(String(50), nullable=True)
    current_step: Mapped[str | None] = mapped_column(String(255), nullable=True)
    progress_percentage: Mapped[int | None] = mapped_column(
        Integer, default=0, nullable=True
    )

    # Relationships
    verdict: Mapped["Verdict | None"] = relationship(
        "Verdict",
        back_populates="investigation",
        uselist=False,
        cascade="all, delete-orphan",
    )
    suspicious_items: Mapped[list["IOC"]] = relationship(
        "IOC",
        back_populates="investigation",
        cascade="all, delete-orphan",
    )
    findings: Mapped[list["Finding"]] = relationship(
        "Finding",
        back_populates="investigation",
        cascade="all, delete-orphan",
    )
    artifacts: Mapped[list["Artifact"]] = relationship(
        "Artifact",
        back_populates="investigation",
        cascade="all, delete-orphan",
    )
    runs: Mapped[list["AgentRun"]] = relationship(
        "AgentRun",
        back_populates="investigation",
        cascade="all, delete-orphan",
    )
    reports: Mapped[list["Report"]] = relationship(
        "Report",
        back_populates="investigation",
        cascade="all, delete-orphan",
    )
