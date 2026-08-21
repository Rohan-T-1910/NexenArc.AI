import MetricCard from "../components/metric_card"
import PageHeader from "../components/page_header"
import {
    Activity,
    Bot,
    Gauge,
    Shield,
    ShieldCheck,
    TriangleAlert,
} from "lucide-react"
import ThreatTrend from "../components/threat_trend"
import ThreatCategories from "../components/threat_categories"
import Card from "../components/card"
import InvestigationTimeline from "../components/investigation_timeline"
import AgentUtilisation from "../components/agent_utilisation";

function Dashboard() {
    return (
        <div>
            <PageHeader
                title="Security Operations Dashboard"
                description="Real-time posture across agents, artifacts and incidents"
            />

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    title="Active Investigations"
                    value={38}
                    description="+6 today"
                    footer="12 waiting analyst review"
                    icon={<Shield size={18} />}
                    variant="blue"
                />

                <MetricCard
                    title="High Risk Alerts"
                    value={9}
                    description="+3 in last hour"
                    footer="4 escalated to tier 3"
                    icon={<TriangleAlert size={18} />}
                    variant="red"
                />

                <MetricCard
                    title="AI Agent Health"
                    value="98.4%"
                    description="7/7 agents online"
                    footer="Avg latency 1.8s"
                    icon={<Bot size={18} />}
                    variant="green"
                />

                <MetricCard
                    title="Average Trust Score"
                    value={87}
                    description="+2.1 vs last week"
                    footer="Confidence across verdicts"
                    icon={<Gauge size={18} />}
                    variant="blue"
                />


                <MetricCard
                    title="Threats Detected today"
                    value={142}
                    description="+18% v/s yesterday"
                    footer="63 phishing · 41 malware"
                    icon={<Activity size={18} />}
                    variant="yellow"
                />

                <MetricCard
                    title="Verification Success Rate"
                    value="94.2%"
                    description="+0.8 pts"
                    footer="Human-confirmed verdicts"
                    icon={<ShieldCheck size={18} />}
                    variant="green"
                />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-white">
                            Threat Trend
                        </h2>
                        <p className="text-sm text-gray-500">
                            Detections by severity over the last 7 days
                        </p>
                    </div>
                    <ThreatTrend />
                </Card>

                <Card>
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-white">
                            Threat Categories
                        </h2>
                        <p className="text-sm text-gray-500">
                            Share of today's detections
                        </p>
                    </div>
                    <ThreatCategories />
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">🔵 Phishing</span>
                            <span className="text-white">42%</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">🔴 Malware</span>
                            <span className="text-white">27%</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">🟡 Malicious URL</span>
                            <span className="text-white">18%</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">🟢 Insider / Other</span>
                            <span className="text-white">13%</span>
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-2">
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-white">
                            Investigation Timeline
                        </h2>

                        <p className="text-sm text-gray-500">
                            Cases opened vs. closed across today
                        </p>
                    </div>

                    <InvestigationTimeline />
                </Card>

                <Card>
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-white">
                            Agent Utilisation
                        </h2>

                        <p className="text-sm text-gray-500">
                            Workload across the active agent mesh
                        </p>
                    </div>

                    <AgentUtilisation />
                </Card>
            </div>
            

        </div>
    )
}
export default Dashboard