# NexenArc

> AI-powered multi-agent cybersecurity investigation & threat intelligence platform.

NexenArc delivers an effortless cybersecurity investigation experience. Instead of forcing analysts and users to decipher fragmented logs and complex backend pipelines, NexenArc answers three fundamental questions up front:
1. **What happened?**
2. **How serious is it?**
3. **What should I do next?**

Expert-level forensics, IOC telemetry, and raw agent execution trails remain available on demand under a collapsed **Technical details** disclosure.

---

## Repository Structure

```text
.
├── backend/            # FastAPI REST API, database models, agent state machines
├── frontend/           # React 19 + TypeScript + Vite + Tailwind CSS + Recharts
├── data/               # Uploads, threat intelligence caches, and evaluation datasets
├── docs/               # System architecture, roadmap, and design documentation
└── docker-compose.yml  # Local PostgreSQL 16 and Redis 7 services
```

---

## Prerequisites

- **Node.js**: >= 20.x
- **Python**: >= 3.11 (Python 3.13 recommended)
- **Docker & Docker Compose**: For local PostgreSQL and Redis

---

## Quickstart

### 1. Start Infrastructure (PostgreSQL & Redis)

```bash
# Copy root env example if needed
cp .env.example .env

# Start database and queue
docker compose up -d
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -e ".[dev]"

# Copy environment variables
cp .env.example .env

# Run development server
uvicorn app.main:app --reload --port 8000
```
Health endpoint is available at `http://localhost:8000/health`. API documentation is accessible at `http://localhost:8000/docs`.

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev
```
Frontend runs locally on `http://localhost:5173`.

---

## Testing & Quality Assurance

### Frontend
```bash
cd frontend
npm run lint         # Run linter
npm run format:check # Verify formatting
npm run build        # Type check & build bundle
```

### Backend
```bash
cd backend
source .venv/bin/activate
pytest               # Run test suite
ruff check .         # Linting
ruff format --check .# Format verification
mypy app tests       # Static type checking
```

---

## Ground Rules

- **Phased development**: Always adhere strictly to the currently assigned phase in [docs/roadmap.md](file:///Users/rohantripathi/Documents/NexenArc/docs/roadmap.md).
- **Plain-language UI**: Never display internal terms (`agent`, `LLM`, `token`, `RAG`, `JSON`, `API`, `queue`, `worker`, etc.) in the default UI. Use the glossary in [docs/roadmap.md](file:///Users/rohantripathi/Documents/NexenArc/docs/roadmap.md).
- **Strict typing**: TypeScript `strict` on frontend; full type annotations and Pydantic v2 on backend.
- **Layer separation**: Keep routes, services, and repositories distinct.
