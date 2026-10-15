import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ArrowRight, Shield, FolderOpen } from "lucide-react";
import { useInvestigations } from "@/hooks";
import Card from "@/components/card";
import Badge, { type BadgeVariant } from "@/components/badge";
import Button from "@/components/button";
import EmptyState from "@/components/empty_state";
import Skeleton from "@/components/skeleton";
import type { SeverityLevel } from "@/types";

export function History() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | "all">("all");

  const { data: investigations, isLoading } = useInvestigations({
    query: searchQuery,
    severity: selectedSeverity === "all" ? undefined : selectedSeverity,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Search & Filter Controls */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B9B4C7]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case title, indicator address, or case ID..."
              className="w-full rounded-xl border border-[#5C5470]/50 bg-[#221E2B]/60 pl-10 pr-4 py-2 text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/60 outline-none focus:border-[#B9B4C7]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter size={14} className="text-[#B9B4C7] shrink-0" />
            {(["all", "critical", "high", "medium", "safe"] as const).map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSelectedSeverity(sev)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium capitalize transition cursor-pointer shrink-0 ${
                  selectedSeverity === sev
                    ? "bg-[#FAF0E6] text-[#221E2B] font-semibold"
                    : "bg-[#5C5470]/40 text-[#B9B4C7] hover:text-[#FAF0E6]"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Cases Table */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#FAF0E6]">Past Investigations</h2>
            <p className="text-xs text-[#B9B4C7]">
              Complete archive of past assessments and findings
            </p>
          </div>
          <Button size="sm" variant="primary" onClick={() => navigate("/new-investigation")}>
            New Investigation
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : !investigations || investigations.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No investigations found"
            description="No cases match your active search terms or severity filters."
            actionLabel="Clear filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedSeverity("all");
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#5C5470]/40 text-[11px] uppercase tracking-wider text-[#B9B4C7]/80">
                  <th className="pb-3 font-semibold">Case Title</th>
                  <th className="pb-3 font-semibold">Severity</th>
                  <th className="pb-3 font-semibold">How sure we are</th>
                  <th className="pb-3 font-semibold">Input Type</th>
                  <th className="pb-3 font-semibold">Recorded Date</th>
                  <th className="pb-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5C5470]/30 text-[#FAF0E6]">
                {investigations.map((inv) => {
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
                      className="hover:bg-[#5C5470]/20 transition cursor-pointer"
                      onClick={() => navigate("/active-investigation")}
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-[#FAF0E6] shrink-0" />
                          <div>
                            <p className="font-semibold text-[#FAF0E6] truncate max-w-sm">
                              {inv.title}
                            </p>
                            <p className="text-[11px] text-[#B9B4C7]">{inv.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4">
                        <Badge variant={sevVariant} showDot>
                          {inv.overallSeverity ? inv.overallSeverity.toUpperCase() : "SAFE"}
                        </Badge>
                      </td>
                      <td className="py-3.5 pr-4 text-[#B9B4C7]">
                        {inv.confidence
                          ? `${inv.confidence.charAt(0).toUpperCase() + inv.confidence.slice(1)} confidence`
                          : "High confidence"}
                      </td>
                      <td className="py-3.5 pr-4 text-[#B9B4C7] uppercase text-[11px]">
                        {inv.inputType}
                      </td>
                      <td className="py-3.5 pr-4 text-[#B9B4C7]">{inv.createdAt}</td>
                      <td className="py-3.5 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/active-investigation");
                          }}
                        >
                          <span>Review</span>
                          <ArrowRight size={13} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default History;
