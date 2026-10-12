# Startup Validator

Full-stack app that runs a **six-agent LangChain.js pipeline** on a submitted startup idea and returns a numeric scorecard plus recommendations. Backend is **NestJS (TypeScript)** only—**no Python** agent service.

---

## Architecture

| Piece | Implementation |
|--------|----------------|
| API | NestJS (`backend/`), default port **3001**, Swagger at `/api/docs` |
| Agents | `backend/src/agents/` — one service per role + `pipeline.service.ts` |
| LLM | Groq via LangChain `ChatGroq` (`groq-model.ts`); model ID in `agent.constants.ts` (`GROQ_MODEL`) |
| Web search | Tavily (`TavilySearchAPIRetriever`) in **Research** only |
| Persistence | Supabase: `ideas`, `reports`; live run state in `ideas.progress` (**jsonb**) |
| UI | React 18, Tailwind, `react-router-dom`, axios, **recharts**, **framer-motion** (processing UI) |

### Pipeline (sequential)

```
research → market → investor → pm → pitch → validation
```

- Each step uses **Zod** + `withStructuredOutput(...)`.
- **Context** flows forward (e.g. market sees research output).
- **Citations**: system rule in `agent.constants.ts` — factual claims about competitors, funding, or market size must include a **source URL** (or state unverified).
- **Checkpoints**: after each agent, `ideas.progress` is updated to  
  `{ completed: [{ name, output }], current: string | null }`  
  where `output` is that agent’s full structured JSON. `current` is the agent running, or `null` when the pipeline step queue is idle.
- **429 handling**: `pipeline.service.ts` retries Groq rate limits (up to 3 attempts, backoff from `Retry-After` / message hints).

On success, a row is inserted into `reports` with `scorecard` (dimension scores, `overall`, `recommendations`, and a copy of non-validation agent outputs under `scorecard.agents`). `ideas.status` becomes `completed`. On failure, `ideas.status` is `failed`.

### Eval harness

```bash
cd backend && npm run eval
```

Runs `src/eval/run-eval.ts`: executes the pipeline (no HTTP) on three fixture ideas and prints, per idea:

- **Overall score** (`validation.overall`)
- **Citation coverage** — count of URLs vs. claim-like tokens in serialized pipeline JSON (heuristic, not human-labeled accuracy)
- **Wall-clock** seconds

---

## API (validation)

| Method | Path | Notes |
|--------|------|--------|
| `POST` | `/validation/submit-idea` | Body: `{ title, description, domain?, stage?, type? }` → `{ id, status: 'processing', ... }`; pipeline runs in background |
| `GET` | `/validation/results/:id` | See status below |

**`GET /validation/results/:id`**

| `status` | Response |
|----------|----------|
| `processing` | `progress` (`completed[]` with per-agent `output`, `current`), `submittedAt` |
| `completed` | `results` (dimension scores + `overall`), `recommendations[]`, `agents` (research, market, investor, pm, pitch outputs) |
| `failed` | `{ id, status: 'failed' }` |

Per-agent JSON is returned on **`completed`** as `agents` (also available during **`processing`** via `progress`).

---

## Frontend

**Routes:** `/` (landing), `/submit`, `/results/:id`

**Flow**

1. Submit form → `POST /validation/submit-idea`
2. Navigate to `/results/:id`
3. Poll `GET /validation/results/:id` every **3s**
4. **`processing`** — live agent feed (progress bar, per-agent status, one-line summaries from each finished agent’s `output`)
5. **`completed`** — overall score, recharts **radar** of dimensions, recommendations list
6. **`failed`** — error state + link back to submit

`REACT_APP_API_URL` points at the Nest API (see `frontend/.env.example`).

---

## Project layout

```text
Startup_validator/
├── backend/
│   ├── src/agents/          # agents, pipeline, groq-model, agent.constants
│   ├── src/validation/      # submit + results
│   ├── src/supabase/        # client + database.types
│   ├── src/eval/            # run-eval.ts
│   └── supabase/migrations/ # ideas, reports, progress column
└── frontend/
    └── src/pages/           # SubmitIdea.jsx, Results.jsx
```

---

## Local setup

### Backend

```bash
cd backend
cp env.example .env   # SUPABASE_*, GROQ_API_KEY, TAVILY_API_KEY, JWT_* (auth mock)
npm install
npm run start:dev      # http://localhost:3001
```

Apply Supabase migrations under `backend/supabase/migrations/` to your project (includes `ideas.progress`).

### Frontend

```bash
cd frontend
cp .env.example .env   # REACT_APP_API_URL=http://localhost:3001
npm install
npm start              # http://localhost:3000
```

---

## Not built (or mock only)

| Area | Status |
|------|--------|
| **Auth** | Mock endpoints in `auth/`; validation routes are not gated on real Supabase Auth |
| **Dashboard** | No user dashboard or idea history UI |
| **Completed UI** | Full report view with agent accordions; older reports without `agents` in scorecard show empty deep-dive sections |
| **Uploads** | Submit is text fields only (no PDF / Notion on the live path) |
| **`reports` extras** | `tam` / `sam` / `som`, `gtm_strategy`, etc. largely unused in the current write path |

---

## License

MIT
