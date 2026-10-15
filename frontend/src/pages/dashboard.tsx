import { useNavigate } from "react-router-dom";
import {
  Shield,
  TriangleAlert,
  ShieldCheck,
  Zap,
  ArrowRight,
  Plus,
  Clock,
  Sparkles,
} from "lucide-react";
import { useDashboardMetrics } from "@/hooks";
import MetricCard from "@/components/metric_card";
import ThreatTrend from "@/components/threat_trend";
import ThreatCategories from "@/components/threat_categories";
import Card from "@/components/card";
import Badge, { type BadgeVariant } from "@/components/badge";
import Button from "@/components/button";
import Skeleton from "@/components/skeleton";

export function Dashboard() {
  const navigate = useNavigate();
  const { data: metrics, isLoading, isError } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-[#352F44] p-5">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-80 rounded-2xl bg-[#352F44] p-5 lg:col-span-2">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-56 w-full" />
          </div>
          <div className="h-80 rounded-2xl bg-[#352F44] p-5">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-56 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !metrics) {
    return (
      <div className="rounded-2xl border border-[#fb7185]/30 bg-[#352F44] p-8 text-center text-[#FAF0E6]">
        <p className="text-sm font-semibold">
          We could not load your latest overview metrics right now.
        </p>
        <p className="mt-1 text-xs text-[#B9B4C7]">Please try refreshing this view in a moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#5C5470]/50 bg-[#352F44] p-5">
        <div>
          <h2 className="text-base font-bold text-[#FAF0E6]">Operational Overview</h2>
          <p className="mt-0.5 text-xs text-[#B9B4C7]">
            Continuous assessment across suspicious items and case findings
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button size="sm" variant="secondary" onClick={() => navigate("/active-investigation")}>
            <Sparkles size={14} />
            <span>Try sample case</span>
          </Button>

          <Button size="sm" variant="primary" onClick={() => navigate("/new-investigation")}>
            <Plus size={14} />
            <span>New Investigation</span>
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Cases"
          value={metrics.activeInvestigationsCount}
          description="In progress right now"
          footer="Continuous background assessment"
          icon={<Shield size={18} />}
          variant="linen"
        />

        <MetricCard
          title="High Risk Alerts"
          value={metrics.highRiskCount}
          description="Immediate action recommended"
          footer="Requires defense review"
          icon={<TriangleAlert size={18} />}
          variant="rose"
        />

        <MetricCard
          title="Verified Safe"
          value={metrics.verifiedSafeCount}
          description="Confirmed harmless this week"
          footer="False alarms prevented"
          icon={<ShieldCheck size={18} />}
          variant="emerald"
        />

        <MetricCard
          title="Team Response Rate"
          value={`${metrics.teamResponseRate}%`}
          description="Assessment completion rate"
          footer="Average completion under 2 mins"
          icon={<Zap size={18} />}
          variant="amber"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#FAF0E6]">Threat Trend</h3>
              <p className="text-xs text-[#B9B4C7]">Detections by severity over the last 7 days</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#B9B4C7]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#fb7185]" />
                <span>Critical</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#fb923c]" />
                <span>High</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#facc15]" />
                <span>Medium</span>
              </span>
            </div>
          </div>
          <ThreatTrend data={metrics.severityTrends} />
        </Card>

        <Card>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#FAF0E6]">Incident Distribution</h3>
            <p className="text-xs text-[#B9B4C7]">Proportion of detected categories</p>
          </div>
          <ThreatCategories categories={metrics.threatCategories} />
          <div className="mt-4 space-y-2.5">
            {metrics.threatCategories.map((item) => (
              <div key={item.category} className="flex items-center justify-between text-xs">
                <span className="text-[#B9B4C7] truncate max-w-[190px]">{item.category}</span>
                <span className="font-semibold text-[#FAF0E6]">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Investigations Table */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#FAF0E6]">Recent Investigations</h3>
            <p className="text-xs text-[#B9B4C7]">Most recently updated security cases</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate("/history")}
            className="text-xs text-[#B9B4C7]"
          >
            <span>View all cases</span>
            <ArrowRight size={13} />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#5C5470]/40 text-[11px] uppercase tracking-wider text-[#B9B4C7]/80">
                <th className="pb-3 font-semibold">Case Title</th>
                <th className="pb-3 font-semibold">Severity</th>
                <th className="pb-3 font-semibold">How sure we are</th>
                <th className="pb-3 font-semibold">Progress</th>
                <th className="pb-3 font-semibold">Updated</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C5470]/30 text-[#FAF0E6]">
              {metrics.recentInvestigations.map((inv) => {
                const sevVariant: BadgeVariant =
                  inv.overallSeverity === "critical"
                    ? "critical"
                    : inv.overallSeverity === "high"
                      ? "high"
                      : inv.overallSeverity === "medium"
                        ? "medium"
                        : "safe";

                return (
                  <tr
                    key={inv.id}
                    className="transition hover:bg-[#5C5470]/20 cursor-pointer"
                    onClick={() => navigate("/active-investigation")}
                  >
                    <td className="py-3.5 pr-4">
                      <p className="font-medium text-[#FAF0E6] truncate max-w-sm">{inv.title}</p>
                      <p className="text-[11px] text-[#B9B4C7]">
                        {inv.id} · {inv.inputType}
                      </p>
                    </td>
                    <td className="py-3.5 pr-4">
                      <Badge variant={sevVariant} showDot>
                        {inv.overallSeverity ? inv.overallSeverity.toUpperCase() : "ASSESSING"}
                      </Badge>
                    </td>
                    <td className="py-3.5 pr-4 text-[#B9B4C7]">
                      {inv.confidence
                        ? `${inv.confidence.charAt(0).toUpperCase() + inv.confidence.slice(1)} confidence`
                        : "Calculating"}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#FAF0E6]">
                        <Clock size={12} className="text-[#34d399]" />
                        <span>{inv.currentStep || "Completed"}</span>
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-[#B9B4C7]">{inv.updatedAt}</td>
                    <td className="py-3.5 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/active-investigation");
                        }}
                      >
                        <span>Open</span>
                        <ArrowRight size={13} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
