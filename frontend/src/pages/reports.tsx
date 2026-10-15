import { useState } from "react";
import { FileText, Download, Eye, X } from "lucide-react";
import { useReports } from "@/hooks";
import Card from "@/components/card";
import Badge from "@/components/badge";
import Button from "@/components/button";
import Skeleton from "@/components/skeleton";
import type { Report } from "@/types";

export function Reports() {
  const { data: reports, isLoading } = useReports();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-[#FAF0E6]">Incident Reports</h2>
            <p className="text-xs text-[#B9B4C7]">
              Stakeholder-ready summaries with clear conclusions and defense recommendations.
            </p>
          </div>
          <Badge variant="subtle">1 Published Report</Badge>
        </div>
      </Card>

      {/* Reports List */}
      <Card className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {reports?.map((rep) => (
              <div
                key={rep.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/50 p-4 transition hover:border-[#B9B4C7]/40"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-[#FAF0E6]" />
                    <h3 className="text-xs font-bold text-[#FAF0E6]">{rep.investigationTitle}</h3>
                  </div>
                  <p className="text-xs text-[#B9B4C7] line-clamp-1">{rep.executiveSummary}</p>
                  <p className="text-[11px] text-[#B9B4C7]/80">
                    Compiled by {rep.generatedBy} · {rep.generatedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Button size="sm" variant="secondary" onClick={() => setSelectedReport(rep)}>
                    <Eye size={13} />
                    <span>Preview</span>
                  </Button>

                  <div className="relative group">
                    <Button size="sm" variant="outline" disabled>
                      <Download size={13} />
                      <span>Export PDF</span>
                    </Button>
                    <div className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block rounded bg-[#221E2B] border border-[#5C5470] px-2 py-1 text-[10px] text-[#FAF0E6] whitespace-nowrap z-10">
                      PDF export ships in Phase 9
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Report Preview Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#5C5470]/60 bg-[#352F44] p-6 shadow-2xl text-[#FAF0E6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#5C5470]/40">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#FAF0E6]" />
                <h3 className="text-sm font-bold text-[#FAF0E6]">Report Preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-1 text-[#B9B4C7] hover:bg-[#5C5470]/40 hover:text-[#FAF0E6] transition cursor-pointer"
                aria-label="Close report preview"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-xs leading-relaxed">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#B9B4C7]">
                  Case Title
                </span>
                <h4 className="text-base font-bold text-[#FAF0E6] mt-0.5">
                  {selectedReport.investigationTitle}
                </h4>
                <p className="text-[11px] text-[#B9B4C7] mt-0.5">
                  Generated {selectedReport.generatedAt}
                </p>
              </div>

              <div className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/50 p-4">
                <p className="font-semibold text-[#FAF0E6] uppercase text-[10px] tracking-wider mb-1">
                  Executive Summary
                </p>
                <p className="text-[#FAF0E6]">{selectedReport.executiveSummary}</p>
              </div>

              {selectedReport.sections.map((sec) => (
                <div key={sec.id} className="space-y-1.5">
                  <h5 className="font-bold text-[#FAF0E6] uppercase text-[11px] tracking-wider">
                    {sec.title}
                  </h5>
                  <p className="text-[#B9B4C7] whitespace-pre-line bg-[#221E2B]/40 p-3 rounded-xl border border-[#5C5470]/30">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#5C5470]/40 flex justify-end">
              <Button size="sm" variant="secondary" onClick={() => setSelectedReport(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
