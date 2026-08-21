import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    day: "Mon",
    medium: 44,
    high: 28,
    critical: 12,
  },
  {
    day: "Tue",
    medium: 50,
    high: 32,
    critical: 18,
  },
  {
    day: "Wed",
    medium: 47,
    high: 26,
    critical: 8,
  },
  {
    day: "Thu",
    medium: 58,
    high: 41,
    critical: 22,
  },
  {
    day: "Fri",
    medium: 62,
    high: 37,
    critical: 16,
  },
  {
    day: "Sat",
    medium: 35,
    high: 19,
    critical: 6,
  },
  {
    day: "Sun",
    medium: 40,
    high: 24,
    critical: 11,
  },
]

function ThreatTrend() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -15,
            bottom: -5,
          }}
        >
          <defs>
            <linearGradient
              id="mediumGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#4f8cff"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="#4f8cff"
                stopOpacity={0.02}
              />
            </linearGradient>

            <linearGradient
              id="highGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#f5a623"
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor="#f5a623"
                stopOpacity={0.02}
              />
            </linearGradient>

            <linearGradient
              id="criticalGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#ef4444"
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor="#ef4444"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#273244"
            vertical={true}
          />

          <XAxis
            dataKey="day"
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            dy={4}
          />

          <YAxis
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            width={35}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#151a23",
              border: "1px solid #2a3444",
              borderRadius: "10px",
              color: "#ffffff",
              padding: "10px 12px",
            }}
            labelStyle={{
              color: "#cbd5e1",
              marginBottom: "6px",
            }}
          />

          <Area
            type="monotone"
            dataKey="medium"
            stroke="#4f8cff"
            strokeWidth={2}
            fill="url(#mediumGradient)"
          />

          <Area
            type="monotone"
            dataKey="high"
            stroke="#f5a623"
            strokeWidth={2}
            fill="url(#highGradient)"
          />

          <Area
            type="monotone"
            dataKey="critical"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#criticalGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ThreatTrend