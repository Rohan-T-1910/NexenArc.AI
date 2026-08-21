import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    time: "08:00",
    opened: 8,
    closed: 5,
  },
  {
    time: "10:00",
    opened: 12,
    closed: 9,
  },
  {
    time: "12:00",
    opened: 18,
    closed: 14,
  },
  {
    time: "14:00",
    opened: 16,
    closed: 12,
  },
  {
    time: "16:00",
    opened: 20,
    closed: 17,
  },
]

function InvestigationTimeline() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#273244"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />

          <YAxis
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />

          <Tooltip
            cursor={{
              fill: "rgba(255,255,255,0.03)",
            }}
            contentStyle={{
              backgroundColor: "#151a23",
              border: "1px solid #2a3444",
              borderRadius: "10px",
              color: "#ffffff",
            }}
          />

          <Bar
            dataKey="opened"
            fill="#4f8cff"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="closed"
            fill="#18b98a"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InvestigationTimeline