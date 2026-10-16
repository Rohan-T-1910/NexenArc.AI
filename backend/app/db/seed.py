import asyncio
import logging

from app.core.security import hash_password
from app.db.base import Base
from app.db.session import AsyncSessionLocal, engine
from app.models.agent_run import AgentRun
from app.models.finding import Finding
from app.models.investigation import Investigation
from app.models.ioc import IOC
from app.models.report import Report
from app.models.user import User
from app.models.verdict import Verdict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def seed_database() -> None:
    logger.info("Initializing database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # 1. Seed Users
        from app.repositories.user_repo import UserRepository

        user_repo = UserRepository(session)

        admin = await user_repo.get_by_email("admin@nexenarc.internal")
        if not admin:
            admin = User(
                id="usr_admin_01",
                email="admin@nexenarc.internal",
                name="System Administrator",
                role="admin",
                hashed_password=hash_password("AdminPassword123!"),
            )
            session.add(admin)

        analyst = await user_repo.get_by_email("analyst@nexenarc.internal")
        if not analyst:
            analyst = User(
                id="usr_01hqz7",
                email="analyst@nexenarc.internal",
                name="Morgan Vance",
                role="analyst",
                hashed_password=hash_password("AnalystPassword123!"),
            )
            session.add(analyst)

        viewer = await user_repo.get_by_email("viewer@nexenarc.internal")
        if not viewer:
            viewer = User(
                id="usr_viewer_01",
                email="viewer@nexenarc.internal",
                name="Alex Auditor",
                role="viewer",
                hashed_password=hash_password("ViewerPassword123!"),
            )
            session.add(viewer)

        await session.commit()
        logger.info("Users seeded successfully.")

        # 2. Seed Hero Investigation (Case #98214)
        from app.repositories.investigation_repo import InvestigationRepository

        inv_repo = InvestigationRepository(session)
        case_hero = await inv_repo.get_by_id("case_98214")
        if not case_hero:
            case_hero = Investigation(
                id="case_98214",
                title="Suspicious payment invoice email with external download link",
                input_content=(
                    "From: accounting-billing@verify-securepay-portal.com\n"
                    "Subject: Overdue Invoice INV-8921\n"
                    "Please download your reconciliation statement from "
                    "https://storage-verify-portal.top/invoice-8921.zip"
                ),
                input_type="email",
                priority="high",
                status="completed",
                overall_severity="critical",
                confidence="high",
                current_step="Writing your report",
                progress_percentage=100,
            )
            session.add(case_hero)
            await session.commit()

            # Add Verdict
            verdict = Verdict(
                id="vrd_104",
                investigation_id="case_98214",
                what_happened=(
                    "A spear-phishing email impersonated an accounting partner "
                    "to deliver an info-stealing payload disguised as an overdue invoice archive."
                ),
                how_serious_is_it=(
                    "Critical severity. The domain is newly registered and the linked download "
                    "attempts to harvest session credentials."
                ),
                what_to_do_next=[
                    "Block the sender domain verify-securepay-portal.com at your email gateway.",
                    "Block outbound traffic to 194.26.29.112 across perimeter firewalls.",
                    "Reset browser sessions and passwords for staff who opened the message.",
                    "Purge the message from all internal inboxes immediately.",
                ],
                overall_severity="critical",
                confidence="high",
                confidence_score=0.94,
                verdict_time="2 minutes ago",
            )
            session.add(verdict)

            # Add IOCs
            ioc1 = IOC(
                id="ioc_1",
                investigation_id="case_98214",
                type="email",
                value="accounting-billing@verify-securepay-portal.com",
                normalized_value="accounting-billing@verify-securepay-portal.com",
                severity="critical",
                confidence="high",
                reputation_score=92,
                threat_actors=["Storm-0914"],
                details={"dkimPass": False, "spfPass": False},
            )
            ioc2 = IOC(
                id="ioc_2",
                investigation_id="case_98214",
                type="url",
                value="https://storage-verify-portal.top/invoice-8921.zip",
                normalized_value="storage-verify-portal.top",
                severity="critical",
                confidence="high",
                reputation_score=96,
                threat_actors=["RedLine Stealer Distribution"],
                mitre_techniques=[
                    "T1566.002 Spearphishing Link",
                    "T1204 User Execution",
                ],
                details={"registrar": "NameCheap", "domainAgeDays": 2},
            )
            ioc3 = IOC(
                id="ioc_3",
                investigation_id="case_98214",
                type="ip",
                value="194.26.29.112",
                normalized_value="194.26.29.112",
                severity="high",
                confidence="high",
                reputation_score=88,
                details={"country": "NL", "asn": "AS44592"},
            )
            session.add_all([ioc1, ioc2, ioc3])

            # Add Findings
            f1 = Finding(
                id="fnd_01",
                investigation_id="case_98214",
                agent_role="Quick assessment",
                title="Suspicious message header mismatch",
                plain_summary="The sender display name does not match the actual mail origin server.",
                severity="high",
                confidence="high",
                timestamp="11 mins ago",
                evidence_references=["Email header analysis"],
            )
            f2 = Finding(
                id="fnd_02",
                investigation_id="case_98214",
                agent_role="Checking suspicious items",
                title="Newly registered lookalike domain",
                plain_summary="The domain in the download link was created only 48 hours ago and impersonates a payroll brand.",
                severity="critical",
                confidence="high",
                timestamp="8 mins ago",
                evidence_references=["Domain registry check"],
            )
            f3 = Finding(
                id="fnd_03",
                investigation_id="case_98214",
                agent_role="Known-threat check",
                title="Destination host flagged on multiple threat feeds",
                plain_summary="Three independent intelligence providers identify the hosting server as an active credential collector.",
                severity="critical",
                confidence="high",
                timestamp="4 mins ago",
                evidence_references=["Community threat sources"],
            )
            session.add_all([f1, f2, f3])

            # Add Runs
            r1 = AgentRun(
                id="run_1",
                investigation_id="case_98214",
                agent_id="triage",
                agent_name="Quick assessment",
                role="Triage",
                status="completed",
                started_at="12m ago",
                completed_at="11m ago",
                findings_count=1,
            )
            r2 = AgentRun(
                id="run_2",
                investigation_id="case_98214",
                agent_id="ioc_analysis",
                agent_name="Checking suspicious items",
                role="Indicator Analysis",
                status="completed",
                started_at="11m ago",
                completed_at="8m ago",
                findings_count=1,
            )
            session.add_all([r1, r2])

            # Add Report
            rep = Report(
                id="rep_98214",
                investigation_id="case_98214",
                investigation_title="Suspicious payment invoice email with external download link",
                generated_at="Today at 11:32 AM",
                generated_by="Writing your report",
                executive_summary=(
                    "A deceptive invoice email attempted to deceive employees into downloading "
                    "an info-stealing package. All indicators have been verified and containment steps outlined."
                ),
                sections=[
                    {
                        "id": "sec_1",
                        "title": "Executive Summary",
                        "content": "On October 13, 2026, an urgent payment notification was intercepted.",
                        "order": 1,
                    },
                    {
                        "id": "sec_2",
                        "title": "Action Plan",
                        "content": "1. Block sender domain.\n2. Add firewall rule for IP 194.26.29.112.",
                        "order": 2,
                    },
                ],
                ioc_count=3,
                artifacts_count=1,
            )
            session.add(rep)

            await session.commit()
            logger.info("Hero investigation and report seeded.")

        # Seed additional cases
        case2 = await inv_repo.get_by_id("case_98215")
        if not case2:
            case2 = Investigation(
                id="case_98215",
                title="Repeated outbound connection to unknown cloud storage IP",
                input_content="185.220.101.5:443 - 82 attempts from workstation-fin-04",
                input_type="ip",
                priority="medium",
                status="completed",
                overall_severity="high",
                confidence="high",
                current_step="Investigation complete",
                progress_percentage=100,
            )
            session.add(case2)

            case3 = Investigation(
                id="case_98216",
                title="Internal authentication failure threshold exceeded",
                input_content="auth.log: 420 failed SSH logins for user admin from 10.0.4.12",
                input_type="log",
                priority="medium",
                status="completed",
                overall_severity="medium",
                confidence="medium",
                current_step="Investigation complete",
                progress_percentage=100,
            )
            session.add(case3)

            await session.commit()
            logger.info("Additional investigations seeded.")

    logger.info("Seeding completed successfully!")


if __name__ == "__main__":
    asyncio.run(seed_database())
