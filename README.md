# symmio-search-book

The **Symmio Search Book** — a deterministic answer-engine corpus, static site, and
SQLite-backed living-docs service for the Vibe / Symmio documentation. Extracted from
`onboarding-app` (`src/search-book/`) into its own standalone repo with full history
preserved (Linear SYN-253).

The corpus build is deterministic and the answer engine has an **extractive** mode that
needs no network or API key. Live LLM answers (`--mode llm`) are optional and gated behind
`SEARCH_BOOK_LLM_*` env loaded only via `node --env-file`.

## Requirements

- Node **>= 22.5.0** (uses the experimental `node:sqlite` built-in; no npm dependencies).

## Layout

| Path | What |
| --- | --- |
| `scripts/` | ~36 build/serve/smoke scripts (Node built-ins only). |
| `data/` | Deterministic generated artifacts (manifest, routes, chunks, audits…). |
| `content/` | Authored + generated corpus markdown. |
| `index.html` | Static Search Book frontend (talks to the answer-engine service when configured). |
| `.github/workflows/search-book-verify.yml` | No-secret CI gate for deterministic verify and localhost smoke tests. |
| `_specs/app-docs/` | Product specs + operator inbox (SYN-209). |
| `*.md` | Living docs: `FINAL-REPORT.md`, `DECISIONS.md`, `GAPS.md`, `STYLEGUIDE.md`, `LLM-RAG-CONTRACT.md`, `LIVING-DOCS-OPERATIONS.md`, etc. |

## Build inputs

`build-all` consumes the external Vibe docs export (the website's generated `docs-data.json`
plus the public docs markdown root). Point these at your local export:

```bash
export VIBE_DOCS_PUBLIC=/tmp/vibe_docs/Docs/public
export VIBE_DOCS_DATA=/tmp/vibe_docs/Website/public/generated/docs-data.json
```

## Common commands

```bash
# Regenerate the full corpus + data artifacts
npm run search-book:build

# Build, then run invariant checks + sensitive-pattern scan (CI gate)
node scripts/build-all.mjs --verify     # == npm run search-book:verify

# Inspect / resume build steps
node scripts/build-all.mjs --list
node scripts/build-all.mjs --from <step-id>
node scripts/build-all.mjs --only <step-id>

# Static integrity + static preview server (default 127.0.0.1:8788)
npm run search-book:check-static
npm run search-book:serve-static

# Answer-engine service (SQLite-backed, default 127.0.0.1:8787)
npm run search-book:serve-service

# Smoke tests (none call the LLM provider)
npm run search-book:smoke-static
npm run search-book:smoke-service
npm run search-book:smoke-preview-service

# Production env/deploy preflight (validates env shape; no provider call)
npm run search-book:check-production-env

# Ask a grounded, cited question with NO model call (extractive):
node scripts/run-llm-rag-answer.mjs --query "What is Vibe Trading?" --mode extractive
```

## CI

`.github/workflows/search-book-verify.yml` runs on `main` pushes and pull requests. It uses
Node 22, clones the public `0xneelo/vibe_docs` export into `/tmp/vibe_docs`, then runs:

```bash
npm run search-book:verify
npm run search-book:smoke-static
npm run search-book:smoke-service
npm run search-book:smoke-preview-service
```

The workflow does not load LLM credentials, production env files, moderation tokens, metrics
tokens, or Discord tokens.

## Answer-engine service

`scripts/serve-answer-engine.mjs` exposes `POST /api/search-book/answer`,
`POST /api/search-book/rating`, `GET /api/search-book/insights`,
`GET /api/search-book/examples`, `GET /api/search-book/moderation`,
`GET /api/search-book/metrics`, and `GET /health`,
persisting to SQLite (`node:sqlite`). Point the static frontend at it with
`index.html?service=http://127.0.0.1:8787`; ratings, Search Insights, and dynamic example
chips use the service while keeping `localStorage` + curated-example fallback. Retention,
the browser CORS allowlist (`SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS`, default `*`),
the disabled-by-default token-gated moderation and metrics exports, the reviewer gap-summary
job (`npm run search-book:living-docs-summary`), and the backup/restore-check utility
(`npm run search-book:backup-db`) are documented in `LIVING-DOCS-OPERATIONS.md`. Before
production launch, run `npm run search-book:check-production-env` with the service env
loaded; it fails local defaults such as wildcard CORS, extractive default mode, repo-local
SQLite paths, and missing LLM credentials without printing secret values.

## Environment

Copy `.env.example` → `.secrets/search-book.env`, fill in values, and load with `--env-file`:

```bash
node --env-file=.secrets/search-book.env scripts/serve-answer-engine.mjs
```

Secrets (`SEARCH_BOOK_LLM_API_KEY`, moderation tokens, Discord tokens) are **never** committed
— `.secrets/` and `.env*` are git-ignored. API keys are read from `process.env` only and are
never printed or persisted.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) and the systemd unit at
[`deploy/symmio-search-book.service`](./deploy/symmio-search-book.service).

## Non-goals

This is the corpus + runtime harness, not yet a deployed production docs site. Production
service env, the selected public frontend route, production moderation/backup access, an
assigned reviewer owner/cadence, and the Discord corpus import remain production follow-ups
(tracked under Linear SYN-209 and its children).
