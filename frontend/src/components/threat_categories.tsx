import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface CategoryItem {
  category: string;
  count: number;
  percentage: number;
}

interface ThreatCategoriesProps {
  categories?: CategoryItem[];
}

const defaultCategories: CategoryItem[] = [
  { category: "Phishing & Fake Invoices", count: 28, percentage: 42 },
  { category: "Suspicious Network Destinations", count: 18, percentage: 27 },
  { category: "Untrusted Downloads", count: 12, percentage: 18 },
  { category: "Authentication Anomaly", count: 9, percentage: 13 },
];

const PALETTE = ["#FAF0E6", "#fb7185", "#fb923c", "#34d399"];

export function ThreatCategories({ categories = defaultCategories }: ThreatCategoriesProps) {
  const chartData = categories.map((c) => ({
    name: c.category,
    value: c.percentage,
    count: c.count,
  }));

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={48}
            outerRadius={74}
            paddingAngle={3}
            stroke="#352F44"
            strokeWidth={2}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#352F44",
              borderColor: "rgba(92, 84, 112, 0.7)",
              borderRadius: "12px",
              color: "#FAF0E6",
              fontSize: "12px",
            }}
            formatter={(value: unknown) => [`${value}% of incidents`, "Proportion"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatCategories;
