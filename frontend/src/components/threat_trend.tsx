import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ThreatTrendProps {
  data?: {
    date: string;
    critical: number;
    high: number;
    medium: number;
    low?: number;
    safe: number;
  }[];
}

const defaultData = [
  { date: "Mon", critical: 2, high: 4, medium: 7, safe: 18 },
  { date: "Tue", critical: 1, high: 5, medium: 9, safe: 22 },
  { date: "Wed", critical: 4, high: 3, medium: 6, safe: 24 },
  { date: "Thu", critical: 2, high: 7, medium: 8, safe: 19 },
  { date: "Fri", critical: 5, high: 6, medium: 10, safe: 25 },
  { date: "Sat", critical: 1, high: 2, medium: 4, safe: 15 },
  { date: "Sun", critical: 3, high: 4, medium: 5, safe: 18 },
];

export function ThreatTrend({ data = defaultData }: ThreatTrendProps) {
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
            <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#fb7185" stopOpacity={0.02} />
            </linearGradient>

            <linearGradient id="highGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#fb923c" stopOpacity={0.02} />
            </linearGradient>

            <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#facc15" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#facc15" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#5C5470" strokeOpacity={0.3} />

          <XAxis
            dataKey="date"
            stroke="#B9B4C7"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#5C5470", strokeOpacity: 0.4 }}
          />

          <YAxis
            stroke="#B9B4C7"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#5C5470", strokeOpacity: 0.4 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#352F44",
              borderColor: "rgba(92, 84, 112, 0.7)",
              borderRadius: "12px",
              color: "#FAF0E6",
              fontSize: "12px",
              boxShadow: "0 8px 24px rgba(34, 30, 43, 0.5)",
            }}
          />

          <Area
            type="monotone"
            dataKey="critical"
            stroke="#fb7185"
            strokeWidth={2}
            fill="url(#criticalGradient)"
            name="Critical"
          />

          <Area
            type="monotone"
            dataKey="high"
            stroke="#fb923c"
            strokeWidth={2}
            fill="url(#highGradient)"
            name="High"
          />

          <Area
            type="monotone"
            dataKey="medium"
            stroke="#facc15"
            strokeWidth={2}
            fill="url(#mediumGradient)"
            name="Medium"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatTrend;
