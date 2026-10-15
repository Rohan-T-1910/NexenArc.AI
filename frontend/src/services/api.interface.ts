import type {
  DashboardMetrics,
  Investigation,
  InvestigationPriority,
  InvestigationStatus,
  Report,
  SeverityLevel,
  TeamMemberStatus,
  ThreatLookupResult,
  User,
} from "@/types";

export interface InvestigationFilters {
  query?: string;
  severity?: SeverityLevel;
  status?: InvestigationStatus;
}

export interface CreateInvestigationInput {
  title?: string;
  inputContent: string;
  priority?: InvestigationPriority;
}

export interface ApiClient {
  getDashboardMetrics(): Promise<DashboardMetrics>;
  getInvestigations(filters?: InvestigationFilters): Promise<Investigation[]>;
  getInvestigation(id: string): Promise<Investigation>;
  createInvestigation(input: CreateInvestigationInput): Promise<Investigation>;
  lookupThreat(indicator: string): Promise<ThreatLookupResult>;
  getTeamMembers(): Promise<TeamMemberStatus[]>;
  getReports(): Promise<Report[]>;
  getUserProfile(): Promise<User>;
}
