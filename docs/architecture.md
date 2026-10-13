# NexenArc — Architecture & Agent Roster

> **Product:** AI-powered multi-agent cybersecurity investigation & threat intelligence platform.
> **Reference:** [docs/roadmap.md](file:///Users/rohantripathi/Documents/NexenArc/docs/roadmap.md)

---

## 1. System Architecture

```text
React (Vite, TS, Tailwind, Recharts, TanStack Query)
        │  REST + SSE (live investigation progress)
        ▼
FastAPI  ── Auth (JWT) · Investigations · IOCs · Artifacts · Reports · Chat
        │
        ▼
Orchestration Layer (LangGraph state machine)
   Triage → [IOC ∥ ThreatIntel ∥ Artifact] → Correlation → Risk → Verification ⟲ → Report
        │                         │
        ▼                         ▼
PostgreSQL (+pgvector)      External intel APIs (VirusTotal, AbuseIPDB, OTX, URLhaus, MITRE…)
Redis (queue/cache)         LLM provider (Claude / Gemini / OpenAI / Grok / local)
```

---

## 2. Layer Separation Principles

### Backend
- **Routes (`api/v1/`)**: Request validation, status codes, route authentication.
- **Services (`services/`)**: Business logic, workflow execution, agent coordination.
- **Repositories (`repositories/` / `db/`)**: Database access, queries, persistence.

### Frontend
- **Pages (`pages/`)**: Route views and view compositions.
- **Hooks (`hooks/`)**: TanStack Query abstractions, local UI state management.
- **Services (`services/`)**: API abstraction layer (swappable mock vs. real client).
- **API Client (`api/`)**: HTTP client configuration, auth token injection, error handling.

---

## 3. Agent Roster

| # | Agent (Internal) | User-Facing Display Name | Responsibility | Introduced In |
|---|---|---|---|---|
| 1 | **Triage Agent** | Quick assessment | Classifies input type, sets initial severity & investigation plan | Phase 4 |
| 2 | **IOC Analysis Agent** | Checking suspicious items | Extracts & normalizes IPs, domains, URLs, hashes | Phase 4 |
| 3 | **Threat Intelligence Agent** | Known-threat check | Enriches suspicious items from threat feeds, maps to MITRE ATT&CK | Phase 4 (mock) → Phase 6 (real) |
| 4 | **Report Agent** | Writing your report | Compiles findings into clear human-readable executive summaries & recommendations | Phase 4 |
| 5 | **Correlation Agent** | Connecting the dots | Links evidence across sources/agents into a timeline & attack story | Phase 5 |
| 6 | **Risk Assessment Agent** | Risk level | Hybrid scoring (rubric + rationale) producing severity level (0–100) | Phase 5 |
| 7 | **Verification Agent** | Double-checking | Challenges conclusions, identifies unsupported claims, bounds false positives | Phase 5 |
| 8 | **Artifact Analysis Agent** | File & log inspection | Static inspection of logs/files/telemetry (never executes files) | Phase 7 |

---

## 4. Plain-Language Presentation Rule
Per the UX principles in [docs/roadmap.md](file:///Users/rohantripathi/Documents/NexenArc/docs/roadmap.md), internal system concepts like agents, tokens, pipelines, and JSON are never shown in default user views. All technical logs, raw indicators, and debug telemetry remain strictly isolated within the collapsible **Technical details** panel.
