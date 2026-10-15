/**
 * NexenArc Domain Types
 * Strict contracts representing system entities and backend API models.
 */

export type SeverityLevel = "critical" | "high" | "medium" | "low" | "safe";
export type ConfidenceLevel = "high" | "medium" | "low";
export type InvestigationStatus = "pending" | "running" | "completed" | "failed";
export type InvestigationPriority = "low" | "medium" | "high" | "critical";

export type IOCType = "ip" | "domain" | "url" | "hash" | "email";
export type ArtifactType = "log" | "email_file" | "pcap" | "document" | "binary" | "text";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "analyst" | "viewer";
  avatarUrl?: string;
  createdAt: string;
}

export interface IOC {
  id: string;
  investigationId: string;
  type: IOCType;
  value: string;
  normalizedValue: string;
  severity: SeverityLevel;
  confidence: ConfidenceLevel;
  firstSeen?: string;
  lastSeen?: string;
  threatActors?: string[];
  malwareFamilies?: string[];
  reputationScore?: number; // 0 - 100
  mitreTechniques?: string[]; // e.g. T1566 Phishing
  details?: Record<string, unknown>;
}

export interface Artifact {
  id: string;
  investigationId: string;
  filename: string;
  fileSizeBytes: number;
  mimeType: string;
  type: ArtifactType;
  uploadedAt: string;
  sha256?: string;
}

export interface Finding {
  id: string;
  investigationId: string;
  agentRole: string;
  title: string;
  plainSummary: string; // Plain-language explanation for users
  severity: SeverityLevel;
  confidence: ConfidenceLevel;
  timestamp: string;
  evidenceReferences?: string[];
  technicalDetails?: Record<string, unknown>; // Shown ONLY in Technical Details panel
}

export interface Verdict {
  id: string;
  investigationId: string;
  whatHappened: string; // Plain language: What happened?
  howSeriousIsIt: string; // Plain language: How serious is it?
  whatToDoNext: string[]; // Plain language: What should I do next?
  overallSeverity: SeverityLevel;
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0.0 - 1.0
  verdictTime: string;
  analystOverride?: {
    overriddenBy: string;
    originalSeverity: SeverityLevel;
    overrideReason: string;
    timestamp: string;
  };
}

export interface AgentRun {
  id: string;
  investigationId: string;
  agentId: string;
  agentName: string; // Plain-language team member name (e.g., "Quick assessment")
  role: string;
  status: "pending" | "running" | "completed" | "failed";
  startedAt: string;
  completedAt?: string;
  findingsCount: number;
  technicalMetadata?: {
    latencyMs?: number;
    tokensUsed?: number;
    modelUsed?: string;
    stepIndex?: number;
  };
}

export interface AgentResult {
  runId: string;
  summary: string;
  findings: Finding[];
  confidence: number;
  evidence: string[];
  durationMs: number;
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Report {
  id: string;
  investigationId: string;
  investigationTitle: string;
  generatedAt: string;
  generatedBy: string;
  executiveSummary: string;
  verdict: Verdict;
  sections: ReportSection[];
  iocCount: number;
  artifactsCount: number;
}

export interface Investigation {
  id: string;
  title: string;
  inputContent: string;
  inputType: "url" | "ip" | "domain" | "hash" | "file" | "email" | "log" | "mixed";
  priority: InvestigationPriority;
  status: InvestigationStatus;
  overallSeverity?: SeverityLevel;
  confidence?: ConfidenceLevel;
  createdAt: string;
  updatedAt: string;
  currentStep?: string; // Plain language label of current progress
  progressPercentage?: number;
  verdict?: Verdict;
  findings?: Finding[];
  suspiciousItems?: IOC[];
  artifacts?: Artifact[];
  runs?: AgentRun[];
}

export interface DashboardMetrics {
  activeInvestigationsCount: number;
  highRiskCount: number;
  verifiedSafeCount: number;
  teamResponseRate: number; // percentage e.g. 98.4
  severityTrends: {
    date: string;
    critical: number;
    high: number;
    medium: number;
    low: number;
    safe: number;
  }[];
  threatCategories: {
    category: string;
    count: number;
    percentage: number;
  }[];
  recentInvestigations: Investigation[];
}

export interface ThreatLookupResult {
  query: string;
  detectedType: IOCType;
  reputation: "malicious" | "suspicious" | "benign" | "unknown";
  confidenceScore: number;
  firstSeen: string;
  lastSeen: string;
  sourceCitations: string[];
  plainSummary: string;
  howAttackWorks: {
    tactic: string;
    technique: string;
    explanation: string;
  }[];
  technicalDetails?: Record<string, unknown>;
}

export interface TeamMemberStatus {
  id: string;
  name: string; // Plain language display name (e.g., "Quick assessment")
  internalRole: string; // e.g. Triage Agent
  responsibility: string; // Plain language description
  status: "idle" | "investigating" | "ready";
  recentActivity: string;
  advancedSettings?: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
}
