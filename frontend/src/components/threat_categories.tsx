import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Phishing", value: 42 },
  { name: "Malware", value: 27 },
  { name: "Malicious URL", value: 18 },
  { name: "Insider / Other", value: 13 },
]

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#f59e0b",
  "#10b981",
]

function ThreatCategories() {
    return (
        <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={entry.name}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ThreatCategories