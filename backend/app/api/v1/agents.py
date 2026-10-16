from typing import Annotated

from fastapi import APIRouter, Depends

from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.agent_run import AdvancedSettings, TeamMemberResponse

router = APIRouter(prefix="/agents", tags=["Your AI Team"])

TEAM_MEMBERS_ROSTER = [
    TeamMemberResponse(
        id="tm_1",
        name="Quick assessment",
        internal_role="Triage Agent",
        responsibility="Inspects incoming clues, figures out the source format, and establishes immediate severity.",
        status="ready",
        recent_activity="Categorized 14 incoming items in the past hour.",
        advanced_settings=AdvancedSettings(
            model="Fast Core", temperature=0.1, max_tokens=1000
        ),
    ),
    TeamMemberResponse(
        id="tm_2",
        name="Checking suspicious items",
        internal_role="IOC Analysis Agent",
        responsibility="Pulls apart suspicious addresses, links, and file signatures to uncover anomalies.",
        status="ready",
        recent_activity="Investigating suspicious lookalike links.",
        advanced_settings=AdvancedSettings(
            model="Reasoning Core", temperature=0.0, max_tokens=2000
        ),
    ),
    TeamMemberResponse(
        id="tm_3",
        name="Known-threat check",
        internal_role="Threat Intelligence Agent",
        responsibility="Cross-checks suspicious items with external threat databases and defense feeds.",
        status="ready",
        recent_activity="Enriched 42 indicators against threat feeds.",
        advanced_settings=AdvancedSettings(
            model="Enrichment Engine", temperature=0.0, max_tokens=1500
        ),
    ),
    TeamMemberResponse(
        id="tm_4",
        name="Writing your report",
        internal_role="Report Agent",
        responsibility="Compiles plain-language explanations, danger levels, and next steps for your team.",
        status="ready",
        recent_activity="Produced executive summary for recent cases.",
        advanced_settings=AdvancedSettings(
            model="Synthesis Core", temperature=0.2, max_tokens=3000
        ),
    ),
    TeamMemberResponse(
        id="tm_5",
        name="Connecting the dots",
        internal_role="Correlation Agent",
        responsibility="Links separate evidence into a unified timeline of how the suspicious event unfolded.",
        status="ready",
        recent_activity="Standby for complex multi-source cases.",
    ),
    TeamMemberResponse(
        id="tm_6",
        name="Risk level",
        internal_role="Risk Assessment Agent",
        responsibility="Calculates overall threat urgency with clear rationale.",
        status="ready",
        recent_activity="Assigned high severity rating to recent phishing campaign.",
    ),
    TeamMemberResponse(
        id="tm_7",
        name="Double-checking",
        internal_role="Verification Agent",
        responsibility="Validates proof and challenges preliminary assumptions to avoid false alarms.",
        status="ready",
        recent_activity="Confirmed 99.1% verdict accuracy on recent triage batch.",
    ),
    TeamMemberResponse(
        id="tm_8",
        name="File & log inspection",
        internal_role="Artifact Analysis Agent",
        responsibility="Inspects internal structure of suspicious attachments without ever executing them.",
        status="ready",
        recent_activity="Static inspection on document formats and logs.",
    ),
]


@router.get("/", response_model=list[TeamMemberResponse])
async def list_team_members(
    _: Annotated[User, Depends(get_current_user)],
) -> list[TeamMemberResponse]:
    return TEAM_MEMBERS_ROSTER
