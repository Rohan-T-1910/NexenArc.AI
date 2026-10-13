# NexenArc Backend

FastAPI backend service for NexenArc.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Running

```bash
uvicorn app.main:app --reload
```

## Testing & Quality

```bash
pytest
ruff check .
ruff format --check .
mypy app tests
```
