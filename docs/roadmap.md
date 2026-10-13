# NexenArc — End-to-End Roadmap (Frontend → Backend → Agents → Production)

> **Product:** AI-powered multi-agent cybersecurity investigation & threat intelligence platform (a simplified AI-powered SOC).
> **Stack:** React + TypeScript + Vite + Tailwind + Recharts · FastAPI · PostgreSQL · Agent orchestration layer.
> **How to use this file with Antigravity:** work one phase at a time. Point Antigravity at this file (`docs/roadmap.md`) and tell it which phase to build; the phase prompts are kept separately. Verify every item in **Definition of Done** before merging and moving on. Never skip a phase's DoD.

---

## 0. Ground Rules

### Engineering rules (apply to every phase)
- Work only on the current phase; do not build later-phase features early.
- Strict typing: TypeScript strict on the frontend; type hints + Pydantic v2 on the backend.
- Keep layers separate: routes → services → repositories (backend); pages → hooks → services → API client (frontend).
- No secrets in code; everything via `.env` with a committed `.env.example`.
- Every phase ships tests for new code and must not break earlier tests.
- Small, reviewable commits with conventional messages (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).

### Product & UX principles (apply to every screen)
**NexenArc should feel effortless.** A user should get from "I have something suspicious" to "I know what happened and what to do" without learning any technical vocabulary about how the platform works inside.

1. **Outcome first.** Every result starts with three plain answers: *What happened? How serious is it? What should I do next?* Details come after.
2. **No backend language in the default UI.** Users never see words like agent, orchestration, LLM, token, embedding, RAG, vector, JSON, API, queue, worker, status code, or stack traces. Errors are human ("We couldn't reach one of our threat sources. Results may be less complete.").
3. **Progressive disclosure.** Simple view by default. A **"Technical details"** toggle (off by default, shown mainly to admins/advanced users) reveals raw logs, evidence, timings and the step-by-step trail for experts.
4. **One obvious action per screen.** Smart defaults, minimal required input, auto-detection of what the user provides, undo instead of "are you sure?" wherever possible.
5. **Calm, premium visual identity.** Not a generic admin template.
   - Dark-first with an optional light theme; one signature accent color plus a restrained severity palette (critical / high / medium / low / safe) that also works for color-blind users (icons + labels, not color alone).
   - A signature "arc" motif drawn from the product name — used in the logo, loading states, and the investigation progress visual.
   - Expressive but readable type pairing (a distinctive display face for headings, a clean sans for body, mono only inside the technical-details view), generous spacing on an 8px grid, soft depth instead of heavy borders.
   - Purposeful motion (subtle transitions, progress that feels alive); respect "reduce motion".
6. **Friendly empty, loading and error states** that tell the user what's happening and what to do.
7. **Accessible by default:** keyboard navigation, focus rings, WCAG AA contrast, screen-reader labels.

### Plain-language glossary (use these labels in the UI)

| Internal concept | What the user sees |
|---|---|
| Investigation | Investigation (or "Case") |
| IOC (indicators) | Suspicious items (IPs, links, files, emails) |
| Triage Agent | Quick assessment |
| IOC Analysis Agent | Checking suspicious items |
| Threat Intelligence Agent | Known-threat check |
| Artifact Analysis Agent | File & log inspection |
| Correlation Agent | Connecting the dots |
| Risk Assessment Agent | Risk level |
| Verification Agent | Double-checking |
| Report Agent | Writing your report |
| Orchestration / pipeline | "Investigation progress" (a simple step view) |
| Confidence score | "How sure we are" — High / Medium / Low |
| False positive | "Likely harmless" |
| MITRE ATT&CK tactics | "How the attack works" (details under "Learn more") |
| RAG sources / citations | "Where this comes from" |
| Verdict | "Our conclusion" |
| LLM provider / model settings | "AI assistant" (advanced options admin-only) |
| Agents page | "Your AI Team" |

> The agent roster below uses internal names for developers. The glossary above governs what appears on screen.

### Git workflow (matches your current `module/0.x-...` branching)

| Phase | Branch name |
|---|---|
| 0 | `module/0.1-foundation` |
| 1 | `module/0.2-react-components` (current) → `module/0.3-frontend-complete` |
| 2 | `module/1.0-backend-core` |
| 3 | `module/1.1-integration` |
| 4 | `module/2.0-agent-framework` |
| 5 | `module/2.1-async-realtime` |
| 6 | `module/3.0-threat-intel` |
| 7 | `module/3.1-ingestion-ml` |
| 8 | `module/4.0-rag-knowledge` |
| 9 | `module/4.1-reports-chat` |
| 10 | `module/5.0-security-quality` |
| 11 | `module/5.1-deploy` |

Merge each module branch into `develop` via PR; `main` only gets tagged, stable releases (`v0.1.0`, …).

---

## Target Architecture (final state)

```
React (Vite, TS, Tailwind, Recharts, TanStack Query)
        │  REST + SSE (live agent progress)
        ▼
FastAPI  ── Auth (JWT) · Investigations · IOCs · Artifacts · Reports · Chat
        │
        ▼
Orchestration Layer (LangGraph state machine)
   Triage → [IOC ∥ ThreatIntel ∥ Artifact] → Correlation → Risk → Verification ⟲ → Report
        │                         │
        ▼                         ▼
PostgreSQL (+pgvector)      External intel APIs (VirusTotal, AbuseIPDB, OTX, URLhaus, MITRE…)
Redis (queue/cache)         LLM provider (swappable: Claude / Gemini / OpenAI / Grok / local)
```

### Agent roster (8 agents — minimum 4 are delivered in Phase 4)

| # | Agent | Responsibility | Ships in |
|---|---|---|---|
| 1 | **Triage Agent** | Classifies input type, sets initial severity & investigation plan | Phase 4 |
| 2 | **IOC Analysis Agent** | Extracts & analyzes IPs, domains, URLs, hashes | Phase 4 |
| 3 | **Threat Intelligence Agent** | Enriches IOCs from intel feeds, maps to MITRE ATT&CK | Phase 4 (mock) → Phase 6 (real) |
| 4 | **Report Agent** | Generates the human-readable investigation report | Phase 4 |
| 5 | **Correlation Agent** | Links evidence across sources/agents into a timeline & attack story | Phase 5 |
| 6 | **Risk Assessment Agent** | Computes overall severity score with explanation | Phase 5 |
| 7 | **Verification Agent** | Challenges conclusions, reduces false positives, can send work back | Phase 5 |
| 8 | **Artifact Analysis Agent** | Static analysis of files/logs (no execution of malware) | Phase 7 |

---

# PHASE 0 — Foundation & Repo Hygiene
**Goal:** a clean monorepo that any phase can build on.

**Tasks**
- Verify folder structure: `backend/ data/ docs/ frontend/`; add root `README.md`, `.editorconfig`, root `.gitignore` (node_modules, `.env`, `__pycache__`, `.venv`, uploads).
- `frontend/`: enable TS strict, add ESLint + Prettier, path alias `@/` → `src/`, `.env.example` (`VITE_API_BASE_URL`).
- `backend/`: create FastAPI skeleton with `uv` or `venv`; `ruff` + `black` + `mypy` + `pytest`; `pyproject.toml`.
- `docker-compose.yml` with PostgreSQL (and Redis, unused until Phase 5).
- `docs/architecture.md` — copy the architecture diagram + agent roster.
- Pre-commit hooks (lint + format).

**Definition of Done**
- [ ] `docker compose up -d` starts Postgres + Redis
- [ ] `npm run dev` and `uvicorn app.main:app --reload` both run; `/health` works
- [ ] Lint, format, type-check pass in both apps

---

# PHASE 1 — Frontend Completion (with mock data)
**Goal:** a fully navigable, polished UI that runs on typed mock data, so backend contracts can be derived from it.

**Where you are now:** Dashboard, `MetricCard`, `ThreatTrend`, `ThreatCategories`, sidebar/topbar, and page files exist. Finish and standardize.


**Design direction for this phase:** build a distinctive NexenArc look (see *Product & UX principles*): arc motif, signature accent, refined type pairing, soft depth, purposeful motion. Create a short `docs/design-system.md` (tokens, components, tone of voice, glossary usage). Add a first-run onboarding (3 short steps) and a one-click **"Try a sample investigation"** so new users see value immediately. Add a lint-style test that fails if banned technical terms appear in default UI strings.

**Tasks**
1. **Design system:** finalize tokens (colors for severity: critical/high/medium/low/info), reusable `Badge`, `Button`, `Card`, `Table`, `Modal`, `Tabs`, `EmptyState`, `Skeleton`, `Toast`.
2. **Routing & layouts:** React Router; `AppLayout` (sidebar + topbar), `AuthLayout` (login/register). Protected-route wrapper (stubbed).
3. **Types first:** create `src/types/` — `Investigation`, `IOC`, `Artifact`, `AgentRun`, `AgentResult`, `Finding`, `Verdict`, `Report`, `User`. These become the backend contract.
4. **Mock API layer:** `src/services/` with an API client interface + `mock` implementation (MSW or in-memory). Components must never import mock data directly.
5. **Data fetching:** add TanStack Query; hooks in `src/hooks/` (`useInvestigations`, `useInvestigation(id)`, `useDashboardMetrics`, …).
6. **Pages to complete:**
   - `dashboard` — metric cards, threat trend, threat categories, recent investigations, agent status panel
   - `new_investigation` — one large smart input: drop a file or paste anything (log, link, IP, email text); the type is auto-detected; title is auto-generated and editable; everything else sits under "More options"
   - `active_investigation` — **the hero page**: a live, arc-themed progress view using the plain-language step names, a streaming "what we're finding" feed, an outcome card (what happened / how serious / what to do), and a collapsed "Technical details" panel
   - `history` — searchable/filterable/sortable table, pagination, status/severity filters
   - `threat_intelligence` (labelled "Threat Lookup") — suspicious-item lookup, IOC detail drawer, ATT&CK tactic breakdown
   - `ai_agents` — presented as **"Your AI Team"**: friendly cards with a one-line description and recent activity; model/provider/temperature settings live in an admin-only "Advanced" section
   - `reports` — list, preview, export buttons (disabled until Phase 9)
   - `settings` — profile, API keys placeholder, LLM provider selection, theme
7. **UX quality:** loading skeletons, error boundaries, empty states, responsive down to tablet, keyboard-accessible, consistent dark theme.
8. **Frontend tests:** Vitest + React Testing Library for core components & hooks.

**Definition of Done**
- [ ] Every sidebar link opens a complete page; no dead buttons
- [ ] No banned technical term appears anywhere in the default UI (checked by test); technical info appears only under "Technical details"
- [ ] A first-time user can start a sample investigation and understand the result without help
- [ ] Switching mock → real client requires changing only one file
- [ ] `npm run build` and `npm test` pass
- [ ] Types in `src/types` reviewed and frozen (they drive Phase 2)

---

# PHASE 2 — Backend Core (API, Database, Auth)
**Goal:** a production-style REST API with persistence — no AI yet.

**Backend structure**
```
backend/app/
  main.py
  core/        config.py, security.py, logging.py, deps.py
  db/          base.py, session.py, migrations (alembic)
  models/      user, investigation, ioc, artifact, agent_run, finding, verdict, report, audit_log
  schemas/     pydantic request/response models (mirror frontend types)
  repositories/
  services/
  api/v1/      auth.py, investigations.py, iocs.py, artifacts.py, dashboard.py, reports.py, agents.py
  tests/
```

**Tasks**
- SQLAlchemy 2.0 (async) + Alembic migrations; models for all entities (UUID PKs, `created_at/updated_at`, soft delete where useful).
- Core tables: `users`, `investigations`, `iocs`, `artifacts`, `agent_runs`, `findings`, `verdicts`, `reports`, `audit_logs`.
- Auth: register/login, password hashing (argon2/bcrypt), JWT access + refresh tokens, `get_current_user` dependency, roles (`admin`, `analyst`, `viewer`).
- Endpoints (all under `/api/v1`): auth, investigations CRUD + list with filters/pagination, IOC add/list, artifact upload (size/type validation, stored in `data/uploads` or S3-compatible), dashboard metrics aggregation (counts, trend by severity over 7 days, category split), agents list/config.
- Consistent error format, request validation, CORS config, structured logging with request IDs.
- Seed script producing realistic demo data (matches frontend mocks).
- Tests: pytest + httpx AsyncClient + a test database; ≥ 80% coverage on services.

**Definition of Done**
- [ ] `alembic upgrade head` builds the schema from scratch
- [ ] OpenAPI docs at `/docs` show every endpoint with schemas
- [ ] Protected routes reject missing/invalid tokens; role checks work
- [ ] Tests green, seed script works

---

# PHASE 3 — Frontend ↔ Backend Integration
**Goal:** replace the mock layer with the real API.

**Tasks**
- Generate TS types/client from OpenAPI (`openapi-typescript`) or hand-align; add the real `ApiClient` (axios/fetch) with base URL, auth header injection, refresh-token flow, 401 handling.
- Real login/register pages, protected routes, token storage strategy (httpOnly cookie preferred; otherwise memory + refresh).
- Wire every page to real endpoints; map backend errors to toasts.
- File upload with progress.
- Remove dead mock code (keep it for Storybook/tests only).
- Add Playwright smoke tests: login → create investigation → see it in history.

**Definition of Done**
- [ ] Full flow works against real DB: register → login → create investigation → upload file → view in history
- [ ] Dashboard shows real aggregated numbers
- [ ] E2E smoke test passes

---

# PHASE 4 — Agent Framework & Orchestration (first 4 agents)
**Goal:** the heart of the project — a real multi-agent pipeline running end to end.

**Backend additions**
```
backend/app/agents/
  base.py            BaseAgent (abstract): name, description, run(context) -> AgentResult
  schemas.py         AgentContext, AgentResult, Finding, Evidence, Confidence
  registry.py        agent registration & lookup
  llm/               provider abstraction: LLMClient interface + adapters (Claude, Gemini, OpenAI, Grok, Ollama)
  prompts/           versioned prompt templates per agent (.md/.jinja)
  tools/             deterministic tools agents may call (ioc_extractor, hash_validator, geoip, whois…)
  triage.py  ioc_analysis.py  threat_intel.py  report.py
backend/app/orchestrator/
  graph.py           workflow definition
  state.py           InvestigationState (typed)
  runner.py          executes a graph run & persists agent_runs/findings
```

**Design decisions**
- **LLM abstraction first.** One `LLMClient` interface with structured-output support (JSON schema / Pydantic). Agents never import a vendor SDK directly.
- **Orchestration via LangGraph** (state machine with typed shared state, conditional edges, parallel fan-out, retries, checkpointing). Keep your own thin `BaseAgent` — don't bury logic inside LangChain abstractions.
- **Structured outputs everywhere:** every agent returns a validated `AgentResult` (summary, findings[], confidence 0–1, evidence references, tokens, duration). Reject & retry on schema violations.
- **Deterministic tools + LLM reasoning:** extract IOCs with regex/validators (not the LLM); use the LLM to reason about them.
- **Persistence:** every agent run, input, output, latency, and token cost saved to `agent_runs`/`findings` so the UI can replay it.

**Agents shipped in this phase (meets the "minimum 4" requirement)**
1. **Triage Agent** — input type detection, initial severity, picks which downstream agents run.
2. **IOC Analysis Agent** — extracts and normalizes IPs/domains/URLs/hashes, flags obvious anomalies (private ranges, typosquatting patterns, DGA-like domains).
3. **Threat Intelligence Agent** — uses a **mock intel provider** now (local JSON in `/data/intel_samples`), same interface the real feeds will use in Phase 6.
4. **Report Agent** — compiles all findings into a structured markdown report (summary, timeline, IOCs, recommendations).

Pipeline for now: `Triage → [IOC ∥ ThreatIntel] → Report`.

**Endpoints**
- `POST /api/v1/investigations/{id}/run` — start analysis
- `GET /api/v1/investigations/{id}/agent-runs` — per-agent results
- `GET /api/v1/investigations/{id}/verdict`

**Definition of Done**
- [ ] Creating an investigation and calling `/run` produces 4 persisted agent runs and a report
- [ ] Swapping LLM provider requires only an env var change
- [ ] Malformed LLM output is retried then fails gracefully (status `failed`, error stored)
- [ ] Tests pass with the mock LLM (no network needed)

---

# PHASE 5 — Async Execution, Real-Time Updates & Remaining Core Agents
**Goal:** investigations run in the background and the UI shows them live; complete the reasoning chain.

**Tasks**
- **Background jobs:** Redis + ARQ (or Celery). `/run` enqueues a job and returns immediately with `status=queued`.
- **Live progress:** Server-Sent Events endpoint `GET /investigations/{id}/stream` emitting events: `agent_started`, `agent_completed`, `finding_added`, `verdict_ready`, `error`. (WebSocket is optional; SSE is simpler and enough.)
- **Add 3 agents:**
  5. **Correlation Agent** — merges findings/IOCs across agents, builds a timeline & relationships (IOC ↔ host ↔ user ↔ technique).
  6. **Risk Assessment Agent** — hybrid scoring: deterministic rubric (severity of IOCs, intel reputation, number of corroborating sources) + LLM explanation → score 0–100 and level.
  7. **Verification Agent** — red-team style check: does evidence actually support the verdict? Flags unsupported claims, lowers confidence, and can **loop back** to earlier agents once (max 1–2 loops) when confidence < threshold.
- Updated graph: `Triage → [IOC ∥ Intel] → Correlation → Risk → Verification ⟲ → Report`.
- Job controls: cancel, retry-failed-agent, idempotency, timeouts, concurrency limits.
- Frontend: consume SSE in `active_investigation` (hook `useInvestigationStream`) — pipeline stepper animates live; findings appear as they stream.

**Definition of Done**
- [ ] UI shows agents lighting up in real time during a run
- [ ] Killing the worker mid-run leaves the investigation recoverable (retry works)
- [ ] Verification loop-back is bounded and tested
- [ ] 7 agents operational

---

# PHASE 6 — Real Threat Intelligence Integrations
**Goal:** replace mock intel with real enrichment.

**Tasks**
- Provider interface `IntelProvider.lookup(ioc) -> IntelResult` with adapters: **VirusTotal, AbuseIPDB, AlienVault OTX, URLhaus/MalwareBazaar, GreyNoise (optional), Shodan (optional), WHOIS/GeoIP**.
- Free-tier friendly: **rate limiting, retry with backoff, circuit breaker, Redis caching** (TTL per IOC type), request budgets per provider.
- Normalize all provider responses to one internal schema (verdict, score, tags, first/last seen, references).
- **MITRE ATT&CK mapping:** ingest ATT&CK STIX data into `/data/mitre`, map findings → technique IDs; show ATT&CK tags in UI.
- Provider health dashboard on `threat_intelligence`/`settings` pages; per-provider enable toggle and API-key management (encrypted at rest).
- Graceful degradation: if providers are down, the Threat Intel Agent reports reduced confidence instead of failing.

**Definition of Done**
- [ ] A real IP/domain/hash returns enrichment from ≥ 3 providers
- [ ] Repeated lookups hit cache; rate limits respected
- [ ] ATT&CK technique badges visible in the investigation view

---

# PHASE 7 — Log/Artifact Ingestion, Normalization & ML Classifier
**Goal:** analyze real files and logs, building on your existing SIH prototype logic (normalize → ML rules → LLM fallback → classify).

**Tasks**
- **Ingestion pipeline:** parsers for `.csv`, `.log`, `.json`, `.txt`, syslog, Apache/Nginx, Windows Event (`.evtx` → text), `.pcap` summary (optional), `.eml`, `.docx/.pdf` (text extraction). Detect type by content, not just extension.
- **Normalization:** one canonical `LogEvent` schema (timestamp, source, host, user, action, src_ip, dst_ip, process, message, raw).
- **Detection stack (tiered, cheap → expensive):**
  1. Rule engine (Sigma-style rules in `/data/rules`)
  2. Trained ML model (scikit-learn/XGBoost; e.g., trained on CICIDS / UNSW-NB15 / LANL-style public datasets) for malicious vs normal
  3. LLM fallback only for ambiguous/low-confidence events
- **Artifact Analysis Agent (#8):** static analysis only — file type, entropy, strings, suspicious indicators, hashes, embedded URLs/macros flags. **Never execute uploaded files.** (Optional later: integrate an external sandbox API.)
- Model lifecycle: training notebook in `/docs` or `/backend/ml`, versioned model artifacts, evaluation metrics (precision/recall/F1, confusion matrix) stored in the repo.
- Large-file handling: streaming parse, chunking, size caps, per-investigation sampling.
- Frontend: log viewer with virtualized table, filter by classification, highlight malicious rows, show rule/ML/LLM source for each verdict.

**Definition of Done**
- [ ] Uploading a mixed-format log file yields normalized events + classifications
- [ ] Model metrics documented; LLM fallback rate is measured and logged
- [ ] 8 agents operational; uploaded files are never executed

---

# PHASE 8 — RAG & Knowledge Base (and where LangChain fits)
**Goal:** ground agents in trusted security knowledge to cut hallucinations and improve recommendations.

**What goes into the knowledge base**
- MITRE ATT&CK (techniques, mitigations, detections), CWE/CVE/CISA KEV summaries, OWASP guidance, NIST incident-response playbooks, your own org playbooks, and **past investigations** (so the system learns from history).

**Tasks**
- **Vector store:** `pgvector` extension in the existing PostgreSQL (no extra infra). Tables: `kb_documents`, `kb_chunks(embedding vector)`, metadata (source, type, technique_id, date).
- **Embeddings:** provider-abstracted embedding client (cloud or local `bge`/`e5`).
- **Ingestion CLI/job:** load → clean → chunk (semantic/heading-aware, ~500–800 tokens, overlap) → embed → upsert; re-runnable & idempotent.
- **Retrieval:** hybrid search (vector + Postgres full-text/BM25) with metadata filters + optional reranker; return citations.
- **Agent integration:** `KnowledgeTool.search(query, filters)` available to Threat Intel, Correlation, Risk, Verification, and Report agents; answers must carry **source citations** stored with findings.
- **Verification Agent upgrade:** checks claims against retrieved sources.
- **RAG evaluation:** a small golden set of questions (`/data/eval/rag_golden.jsonl`); measure retrieval hit-rate and answer faithfulness; run in CI.
- **UI:** "Sources" accordion on findings and reports; knowledge base admin page (upload docs, re-index, status).

**Definition of Done**
- [ ] Findings and reports show clickable source citations
- [ ] Retrieval hit-rate on the golden set meets an agreed target (e.g., ≥ 80% top-5)
- [ ] Re-running ingestion creates no duplicates

### ❓ LangChain & RAG — the direct answer
- **RAG: Yes**, definitely. It's introduced in **Phase 8**, built on pgvector inside your existing PostgreSQL.
- **LangChain: use it selectively.** Recommended approach:
  - **LangGraph** (from the LangChain team) for orchestration in **Phase 4** — it fits your agent graph, parallel branches, loops, and checkpointing perfectly.
  - Optionally `langchain-core` / text splitters / document loaders as **utilities** for RAG ingestion.
  - **Avoid** wrapping everything in LangChain "chains/agents" abstractions. Keep your own `BaseAgent`, `LLMClient`, and `KnowledgeTool` interfaces so you control prompts, retries, logging, and can swap frameworks later. This also demonstrates real engineering understanding in interviews.

---

# PHASE 9 — Reports, Exports & Analyst Chat
**Goal:** polished deliverables and an interactive assistant.

**Tasks**
- **Report generation:** structured sections — executive summary, severity & confidence, timeline, IOC table, ATT&CK mapping, evidence, recommendations/containment steps, agent audit trail, citations. Stored as versioned records.
- **Exports:** PDF (WeasyPrint/Playwright), Markdown, JSON; STIX 2.1 bundle export for IOCs (nice industry touch).
- **Analyst chat:** context-aware chatbot per investigation ("why was this marked critical?", "show related IOCs", "what should I do next?") using RAG + investigation state; streaming responses; guarded tools (read-only by default).
- **Human-in-the-loop:** analyst can confirm/override verdict, add notes; overrides are audit-logged and feed the "Verification success rate" metric on the dashboard.
- **Notifications (optional):** email/Slack/webhook on critical verdicts.
- Frontend: report viewer with export buttons, chat drawer in `active_investigation`, verdict override dialog.

**Definition of Done**
- [ ] A completed investigation exports a clean PDF
- [ ] Chat answers cite evidence from this investigation
- [ ] Overrides appear in the audit log and dashboard metrics

---

# PHASE 10 — Security, Quality & Observability (the "industry-grade" phase)
**Goal:** make it trustworthy, measurable, and safe — this is what separates a demo from a product.

**Security**
- **LLM-specific threats:** treat all logs/artifacts/intel text as **untrusted input** → prompt-injection defenses (delimiters, instruction hierarchy, output schema validation, no tool access derived from log content, content truncation), PII/secret redaction before sending to external LLMs.
- RBAC enforcement on every route; per-user data isolation (multi-tenant `org_id` if needed).
- Rate limiting, request size limits, secure headers, CORS lockdown, dependency scanning (`pip-audit`, `npm audit`), secret scanning, file-upload hardening (MIME sniffing, AV scan optional, sandboxed storage path).
- Audit logs for auth events, verdict changes, config changes, exports.
- Encrypt API keys at rest; rotate JWT secrets.

**Quality**
- Test pyramid: unit (agents with mock LLM), integration (graph + DB), E2E (Playwright). CI gates on coverage.
- **Agent evaluation harness:** labeled scenarios in `/data/eval/scenarios/` (known-malicious, benign, tricky false-positive) → measure verdict accuracy, false-positive rate, latency, cost per investigation. Track results per prompt/model version.
- Prompt versioning & regression tests.

**Observability**
- Structured JSON logs with `investigation_id`/`agent_run_id`; OpenTelemetry traces across API → worker → agents → LLM; Prometheus metrics (job duration, queue depth, token usage, provider error rates); LLM tracing with Langfuse (or LangSmith) for prompt/response inspection; cost dashboard.
- Error tracking (Sentry).

**Performance**
- DB indexes, pagination everywhere, query profiling; LLM response caching for identical inputs; concurrency limits & cost guardrails (max tokens/investigation, budget alerts).

**Definition of Done**
- [ ] UI copy audit passed: no backend jargon, errors are human-readable
- [ ] A malicious log line saying "ignore previous instructions…" does **not** change agent behavior (tested)
- [ ] Eval report exists with baseline metrics
- [ ] Traces show a full investigation end to end
- [ ] CI blocks merges on lint, type, test, and audit failures

---

# PHASE 11 — Deployment, CI/CD & Documentation
**Goal:** one-command deploy and a presentable project.

**Tasks**
- Dockerfiles (multi-stage) for frontend, backend API, and worker; production `docker-compose.prod.yml`; Nginx/Caddy reverse proxy with HTTPS.
- GitHub Actions: lint → type-check → test → build → scan → push images → deploy. Environments: dev / staging / prod; DB migrations run automatically and safely.
- Hosting options: single VPS with Docker Compose (simplest), or AWS (ECS Fargate + RDS + ElastiCache + S3) to leverage your AWS basics.
- Backups for Postgres, health checks, readiness probes, graceful shutdown of workers.
- **Docs:** README with architecture diagrams, quickstart, `.env` reference, API docs, agent catalog, threat model, evaluation results, screenshots/GIF demo, `CONTRIBUTING.md`, ADRs (architecture decision records) in `/docs/adr`.
- Demo mode: seeded dataset + scripted scenarios so a viva/interview demo works offline with the mock LLM.

**Definition of Done**
- [ ] `docker compose -f docker-compose.prod.yml up` brings up the full system
- [ ] Push to `main` triggers CI/CD successfully
- [ ] A new developer can run the project from the README in < 15 minutes

---

## Suggested Timeline (adjust to your college deadlines)

| Phase | Focus | Rough effort |
|---|---|---|
| 0 | Foundation | 1 day |
| 1 | Frontend + mocks | 1–1.5 weeks |
| 2 | Backend core | 1–1.5 weeks |
| 3 | Integration | 3–4 days |
| 4 | Agent framework + 4 agents | 1.5–2 weeks |
| 5 | Async + live + 3 more agents | 1–1.5 weeks |
| 6 | Real threat intel | 1 week |
| 7 | Ingestion + ML | 1–1.5 weeks |
| 8 | RAG | 1 week |
| 9 | Reports + chat | 1 week |
| 10 | Security/quality/observability | 1–1.5 weeks |
| 11 | Deploy + docs | 4–5 days |

**Minimum impressive version (if time is short): Phases 0–5 + Phase 9 reports.** That alone gives a working multi-agent platform with live UI and 7 agents. Phases 6–8 add depth; 10–11 add "industry-grade" polish.

---

## Working Agreement for Each Phase (checklist to run with Antigravity)

1. Create the phase branch from `develop`.
2. Give Antigravity the project rules (first time) and the phase prompt (kept separately from this file), pointing it to `docs/roadmap.md`.
3. Ask Antigravity to produce a **plan first**, review it, then let it implement task by task.
4. Run tests/lint locally; verify **Definition of Done** manually in the UI/API; check any new UI text against the plain-language glossary.
5. Update `docs/` (architecture, ADR if you made a major decision).
6. Open PR → self-review the diff → merge → tag when a milestone is reached.
