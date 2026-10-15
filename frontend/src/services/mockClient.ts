import type { ApiClient, CreateInvestigationInput, InvestigationFilters } from "./api.interface";
import type {
  DashboardMetrics,
  Investigation,
  Report,
  TeamMemberStatus,
  ThreatLookupResult,
  User,
} from "@/types";
import {
  mockCurrentUser,
  mockDashboardMetrics,
  mockInvestigationsList,
  mockReportsList,
  mockTeamMembers,
  mockThreatLookupSamples,
  sampleActiveInvestigation,
} from "./mockData";

// Artificial delay helper for realistic UI loading states
const delay = (ms = 150): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export class MockApiClient implements ApiClient {
  private investigations: Investigation[] = [...mockInvestigationsList];

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    await delay(120);
    return {
      ...mockDashboardMetrics,
      recentInvestigations: [...this.investigations],
    };
  }

  async getInvestigations(filters?: InvestigationFilters): Promise<Investigation[]> {
    await delay(150);
    let results = [...this.investigations];

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(
        (inv) =>
          inv.title.toLowerCase().includes(q) ||
          inv.inputContent.toLowerCase().includes(q) ||
          inv.id.toLowerCase().includes(q)
      );
    }

    if (filters?.severity) {
      results = results.filter((inv) => inv.overallSeverity === filters.severity);
    }

    if (filters?.status) {
      results = results.filter((inv) => inv.status === filters.status);
    }

    return results;
  }

  async getInvestigation(id: string): Promise<Investigation> {
    await delay(100);
    const found = this.investigations.find((inv) => inv.id === id);
    if (found) return found;
    if (id === sampleActiveInvestigation.id || id === "active") {
      return sampleActiveInvestigation;
    }
    // Return first investigation if not found as graceful fallback
    return this.investigations[0];
  }

  async createInvestigation(input: CreateInvestigationInput): Promise<Investigation> {
    await delay(250);
    const newId = `case_${Math.floor(10000 + Math.random() * 90000)}`;

    // Detect input type
    let detectedType: Investigation["inputType"] = "text" as unknown as Investigation["inputType"];
    const content = input.inputContent.trim();
    if (content.startsWith("http://") || content.startsWith("https://")) {
      detectedType = "url";
    } else if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(content)) {
      detectedType = "ip";
    } else if (content.includes("@") && content.includes(".")) {
      detectedType = "email";
    } else if (/^[a-fA-F0-9]{32,64}$/.test(content)) {
      detectedType = "hash";
    } else if (content.toLowerCase().includes("log") || content.includes(":")) {
      detectedType = "log";
    }

    const title =
      input.title && input.title.trim().length > 0
        ? input.title
        : `Investigation of suspicious ${detectedType}`;

    const newCase: Investigation = {
      id: newId,
      title,
      inputContent: input.inputContent,
      inputType: detectedType,
      priority: input.priority || "medium",
      status: "completed",
      overallSeverity: "high",
      confidence: "high",
      createdAt: "Just now",
      updatedAt: "Just now",
      currentStep: "Investigation complete",
      progressPercentage: 100,
      verdict: {
        id: `vrd_${Date.now()}`,
        investigationId: newId,
        whatHappened: `Analysis completed on submitted ${detectedType}. High risk patterns were recognized and verified against known defense records.`,
        howSeriousIsIt:
          "High risk. The submitted item exhibits markers consistent with unauthorized access attempts.",
        whatToDoNext: [
          "Block inbound communication from the submitted address.",
          "Inspect local host event records for associated activity.",
          "Document this finding in the team case notes.",
        ],
        overallSeverity: "high",
        confidence: "high",
        confidenceScore: 0.89,
        verdictTime: "Just now",
      },
      findings: [
        {
          id: `fnd_${Date.now()}_1`,
          investigationId: newId,
          agentRole: "Quick assessment",
          title: "Initial pattern identified",
          plainSummary: "Input was categorized and flagged for immediate defense review.",
          severity: "high",
          confidence: "high",
          timestamp: "Just now",
        },
      ],
      runs: sampleActiveInvestigation.runs,
    };

    this.investigations.unshift(newCase);
    return newCase;
  }

  async lookupThreat(indicator: string): Promise<ThreatLookupResult> {
    await delay(180);
    const trimmed = indicator.trim().toLowerCase();
    if (mockThreatLookupSamples[trimmed]) {
      return mockThreatLookupSamples[trimmed];
    }

    // Default synthesized lookup for any query
    const isIp = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(trimmed);
    const isUrl =
      trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.includes(".");

    return {
      query: indicator,
      detectedType: isIp ? "ip" : isUrl ? "domain" : "hash",
      reputation: "suspicious",
      confidenceScore: 0.82,
      firstSeen: "4 days ago",
      lastSeen: "Today at 09:14 AM",
      sourceCitations: ["Global Threat Registry", "Community Threat Feeds"],
      plainSummary: `The suspicious item ${indicator} matches recent telemetry associated with targeted distribution campaigns.`,
      howAttackWorks: [
        {
          tactic: "Reconnaissance & Initial Contact",
          technique: "Network Probing",
          explanation:
            "Automated routines reach out to identify open or vulnerable service endpoints.",
        },
      ],
      technicalDetails: {
        queriedItem: indicator,
        reputationGrade: "Flagged (82/100)",
      },
    };
  }

  async getTeamMembers(): Promise<TeamMemberStatus[]> {
    await delay(120);
    return [...mockTeamMembers];
  }

  async getReports(): Promise<Report[]> {
    await delay(120);
    return [...mockReportsList];
  }

  async getUserProfile(): Promise<User> {
    await delay(50);
    return { ...mockCurrentUser };
  }
}
