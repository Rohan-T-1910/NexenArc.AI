import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  FileText,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { useInvestigation } from "@/hooks";
import Card from "@/components/card";
import Badge, { type BadgeVariant } from "@/components/badge";
import Button from "@/components/button";
import ArcProgress from "@/components/arc_progress";
import TechnicalDetails from "@/components/technical_details";
import Skeleton from "@/components/skeleton";

const investigationSteps = [
  { id: "step_1", label: "Quick assessment", description: "Format identified" },
  { id: "step_2", label: "Checking suspicious items", description: "Indicators checked" },
  { id: "step_3", label: "Known-threat check", description: "Feeds cross-referenced" },
  { id: "step_4", label: "Writing your report", description: "Report ready" },
];

export function ActiveInvestigation() {
  const navigate = useNavigate();
  const { data: investigation, isLoading, isError } = useInvestigation("case_98214");
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="h-28 rounded-2xl bg-[#352F44] p-6">
          <Skeleton className="h-6 w-48 mb-3" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="h-64 rounded-2xl bg-[#352F44] p-5">
            <Skeleton className="h-44 w-full" />
          </div>
          <div className="h-64 rounded-2xl bg-[#352F44] p-5 md:col-span-2">
            <Skeleton className="h-44 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !investigation) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-[#fb7185]/30 bg-[#352F44] p-8 text-center text-[#FAF0E6]">
        <AlertTriangle size={32} className="mx-auto text-[#fb7185] mb-3" />
        <h3 className="text-sm font-bold">Investigation could not be loaded</h3>
        <p className="mt-1 text-xs text-[#B9B4C7]">
          We could not locate this investigation file. It may have been archived.
        </p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate("/dashboard")}
          className="mt-4"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const verdict = investigation.verdict;
  const findings = investigation.findings || [];
  const suspiciousItems = investigation.suspiciousItems || [];

  const toggleAction = (idx: number) => {
    setCompletedActions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-[#B9B4C7]">{investigation.id}</span>
              <Badge variant="critical" showDot>
                CRITICAL THREAT
              </Badge>
              <Badge variant="subtle">{investigation.priority.toUpperCase()} PRIORITY</Badge>
              <span className="flex items-center gap-1 text-xs text-[#B9B4C7]">
                <Clock size={12} />
                <span>{investigation.createdAt}</span>
              </span>
            </div>

            <h1 className="text-lg font-bold text-[#FAF0E6] leading-snug">{investigation.title}</h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button size="sm" variant="secondary" onClick={() => navigate("/reports")}>
              <FileText size={14} />
              <span>View Report</span>
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate("/new-investigation")}>
              <RotateCcw size={14} />
              <span>Re-check</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Hero Grid: Arc Progress Stepper & Outcome Card */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Arc Progress Stepper */}
        <Card className="flex flex-col justify-between p-6">
          <div>
            <div className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FAF0E6]">
                Investigation Progress
              </h3>
              <p className="text-[11px] text-[#B9B4C7]">All stages completed successfully</p>
            </div>

            <div className="my-2 flex justify-center">
              <ArcProgress
                percentage={investigation.progressPercentage || 100}
                size={150}
                strokeWidth={10}
                label="100%"
                sublabel="Complete"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2 border-t border-[#5C5470]/40 pt-4">
            {investigationSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-between rounded-xl bg-[#221E2B]/50 px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#34d399]/20 text-[#34d399]">
                    <CheckCircle2 size={13} />
                  </span>
                  <div>
                    <p className="font-medium text-[#FAF0E6]">{step.label}</p>
                    <p className="text-[10px] text-[#B9B4C7]">{step.description}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#34d399]">Done</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Outcome Card: Answers the 3 Fundamental Questions */}
        {verdict && (
          <Card className="lg:col-span-2 p-6 border-l-4 border-l-[#fb7185]">
            <div className="flex items-center justify-between pb-3 border-b border-[#5C5470]/40">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-[#fb7185]" />
                <h2 className="text-sm font-bold text-[#FAF0E6]">Our Conclusion</h2>
              </div>
              <Badge variant="critical" showDot>
                High confidence ({Math.round(verdict.confidenceScore * 100)}% sure)
              </Badge>
            </div>

            <div className="mt-4 space-y-4">
              {/* Question 1: What happened? */}
              <div className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/60 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FAF0E6] flex items-center gap-1.5">
                  <span>1. What happened?</span>
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#FAF0E6]">
                  {verdict.whatHappened}
                </p>
              </div>

              {/* Question 2: How serious is it? */}
              <div className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/60 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#fb7185] flex items-center gap-1.5">
                  <span>2. How serious is it?</span>
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#FAF0E6]">
                  {verdict.howSeriousIsIt}
                </p>
              </div>

              {/* Question 3: What should I do next? */}
              <div className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/60 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#34d399] flex items-center gap-1.5">
                  <span>3. What should I do next?</span>
                </h3>
                <div className="mt-2 space-y-2">
                  {verdict.whatToDoNext.map((step, idx) => {
                    const isDone = completedActions[idx];
                    return (
                      <label
                        key={idx}
                        className={`flex items-start gap-2.5 rounded-lg p-2 transition cursor-pointer text-xs ${
                          isDone
                            ? "bg-[#34d399]/10 text-[#34d399] line-through"
                            : "hover:bg-[#5C5470]/30 text-[#FAF0E6]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(isDone)}
                          onChange={() => toggleAction(idx)}
                          className="mt-0.5 rounded border-[#5C5470] text-[#34d399] focus:ring-0 cursor-pointer"
                        />
                        <span className="leading-snug">{step}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Suspicious Items Table */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#FAF0E6]">Suspicious Items Detected</h3>
            <p className="text-xs text-[#B9B4C7]">
              Addresses, links, and indicators evaluated during this case
            </p>
          </div>
          <span className="rounded-full bg-[#5C5470]/40 px-2.5 py-0.5 text-xs text-[#FAF0E6]">
            {suspiciousItems.length} items flagged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#5C5470]/40 text-[11px] uppercase tracking-wider text-[#B9B4C7]/80">
                <th className="pb-3 font-semibold">Indicator</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Threat Level</th>
                <th className="pb-3 font-semibold">Danger Rating</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C5470]/30 text-[#FAF0E6]">
              {suspiciousItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#5C5470]/20 transition">
                  <td className="py-3.5 pr-4 font-mono text-xs text-[#FAF0E6]">{item.value}</td>
                  <td className="py-3.5 pr-4 text-[#B9B4C7] uppercase text-[11px]">{item.type}</td>
                  <td className="py-3.5 pr-4">
                    <Badge variant={item.severity as BadgeVariant} showDot>
                      {item.severity.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-[#5C5470]/50 overflow-hidden">
                        <div
                          className="h-full bg-[#fb7185] rounded-full"
                          style={{ width: `${item.reputationScore || 90}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#fb7185]">
                        {item.reputationScore || 90}/100
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate("/threat-intelligence")}
                    >
                      <span>Lookup</span>
                      <ExternalLink size={12} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Streaming "What We're Finding" Feed */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#FAF0E6]">What We Found</h3>
          <p className="text-xs text-[#B9B4C7]">
            Chronological evidence gathered across all stages
          </p>
        </div>

        <div className="space-y-3">
          {findings.map((finding) => (
            <div
              key={finding.id}
              className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/50 p-4 transition hover:border-[#B9B4C7]/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={finding.severity as BadgeVariant} size="sm">
                    {finding.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-semibold text-[#FAF0E6]">{finding.title}</span>
                </div>
                <p className="text-xs leading-relaxed text-[#B9B4C7]">{finding.plainSummary}</p>
                {finding.evidenceReferences && (
                  <p className="text-[11px] text-[#FAF0E6]/70">
                    Source: {finding.evidenceReferences.join(", ")}
                  </p>
                )}
              </div>

              <span className="shrink-0 text-[11px] text-[#B9B4C7]">{finding.timestamp}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Collapsed Technical Details Panel (Rule 6 compliant) */}
      <TechnicalDetails
        title="Technical details (raw indicators, execution timings, and metadata)"
        data={{
          caseId: investigation.id,
          inputType: investigation.inputType,
          indicatorsCount: suspiciousItems.length,
          findingsCount: findings.length,
          stages: investigation.runs?.map((r) => ({
            stageName: r.agentName,
            status: r.status,
            latencyMs: r.technicalMetadata?.latencyMs,
            tokensUsed: r.technicalMetadata?.tokensUsed,
            model: r.technicalMetadata?.modelUsed,
          })),
          rawFindings: findings.map((f) => ({
            id: f.id,
            stage: f.agentRole,
            technicalDetails: f.technicalDetails,
          })),
        }}
      />
    </div>
  );
}

export default ActiveInvestigation;
