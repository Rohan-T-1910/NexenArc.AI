import MetricCard from "../components/metric_card"

function Dashboard() {
    return (
        <div>
            <h1 className="mb-6 text-2xl font-semibold">
                Security Operations Dashboard
            </h1>
            
            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    title="Active Investigations"
                    value={38}
                    description="+6 today"
                />

                <MetricCard
                    title="High Risk Alerts"
                    value={9}
                    description="+3 in last hour"
                />

                <MetricCard
                    title="Threats Detected today"
                    value={142}
                    description="+18% v/s yesterday"
                />

                <MetricCard
                    title="Average Trust Score"
                    value={87}
                    description="+2.1 v/s last week"
                />
            </div>
        </div>
    )
}
export default Dashboard