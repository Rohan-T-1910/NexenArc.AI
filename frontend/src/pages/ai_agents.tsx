import { useState } from "react";
import { Users, Sliders, Lock, Activity } from "lucide-react";
import { useAITeam } from "@/hooks";
import Card from "@/components/card";
import Badge from "@/components/badge";
import TechnicalDetails from "@/components/technical_details";
import Skeleton from "@/components/skeleton";

export function AIAgents() {
  const { data: teamMembers, isLoading } = useAITeam();
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#FAF0E6]" />
              <h2 className="text-base font-bold text-[#FAF0E6]">Your AI Team</h2>
            </div>
            <p className="text-xs text-[#B9B4C7]">
              Specialized assistants cooperating to assess suspicious items and generate clear
              action plans.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminView(!isAdminView)}
            className="flex items-center gap-2 rounded-xl border border-[#5C5470]/50 bg-[#221E2B]/50 px-3 py-2 text-xs text-[#B9B4C7] hover:text-[#FAF0E6] hover:bg-[#5C5470]/30 transition cursor-pointer"
          >
            {isAdminView ? <Lock size={14} /> : <Sliders size={14} />}
            <span>{isAdminView ? "Hide Advanced Settings" : "Admin: Advanced Settings"}</span>
          </button>
        </div>
      </Card>

      {/* Team Roster Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-[#352F44] p-5">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-3" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {teamMembers?.map((member) => (
            <Card key={member.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#5C5470]/40">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#5C5470]/40 text-[#FAF0E6] text-xs font-bold">
                      {member.name.charAt(0)}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#FAF0E6]">{member.name}</h3>
                      <p className="text-[10px] text-[#B9B4C7]">
                        Internal role: {member.internalRole}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={member.status === "investigating" ? "high" : "safe"}
                    showDot
                    size="sm"
                  >
                    {member.status === "investigating" ? "Active" : "Ready"}
                  </Badge>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#FAF0E6]">
                  {member.responsibility}
                </p>

                <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#221E2B]/50 p-2.5 text-xs text-[#B9B4C7]">
                  <Activity size={13} className="text-[#34d399] shrink-0 mt-0.5" />
                  <span className="text-[11px]">{member.recentActivity}</span>
                </div>
              </div>

              {/* Admin-only Advanced Configuration Panel */}
              {isAdminView && member.advancedSettings && (
                <div className="mt-4 pt-3 border-t border-[#5C5470]/40 text-[11px] font-mono text-[#B9B4C7] bg-[#1E1928] p-3 rounded-xl">
                  <p className="text-[#FAF0E6] font-semibold text-[10px] uppercase mb-1">
                    AI Assistant Configuration (Admin)
                  </p>
                  <p>Provider Engine: {member.advancedSettings.model}</p>
                  <p>Creativity / Temp: {member.advancedSettings.temperature}</p>
                  <p>Capacity Cap: {member.advancedSettings.maxTokens} units</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Team Cooperation Summary */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-[#FAF0E6] mb-2">How Your Team Works Together</h3>
        <p className="text-xs leading-relaxed text-[#B9B4C7] mb-4">
          Each team member handles a specific part of the investigation. The quick assessment sets
          the direction, indicators are verified against defense feeds, conclusions are
          double-checked for accuracy, and a clear, plain report is generated for your security
          staff.
        </p>

        <TechnicalDetails
          title="Technical details (execution engine and system state)"
          data={{
            activeProcessors: 8,
            workflowProtocol: "LangGraph State Machine (Planned for Phase 4)",
            telemetry: "Fully isolated, in-memory state",
          }}
        />
      </Card>
    </div>
  );
}

export default AIAgents;
