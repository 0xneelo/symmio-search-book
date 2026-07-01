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
| `scripts/` | ~59 build/serve/smoke/evidence scripts (Node built-ins only). |
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

# Build, then run invariant checks, monitoring evidence, and sensitive-pattern scan (CI gate)
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
npm run search-book:smoke-preview-service -- --static-root /tmp/search-book-static-site

# URL-driven staging/production smoke; read-only unless -- --write is passed
npm run search-book:smoke-deployment -- --site-url https://docs.example.com
npm run search-book:smoke-deployment -- --site-url https://docs.example.com --service-url https://answers.example.com --mode extractive --write

# Production env/deploy preflight (validates env shape; no provider call)
npm run search-book:drill-local-launch
npm run search-book:launch-evidence
npm run search-book:release-dry-run
npm run search-book:check-launch-evidence-packet -- --packet /tmp/search-book-launch-evidence/launch-evidence.json
npm run search-book:check-release-dry-run-packet -- --packet /tmp/search-book-release-dry-run/release-dry-run.json
npm run search-book:check-monitoring
npm run search-book:check-status-evidence
npm run search-book:check-completion-audit
npm run search-book:check-operator-inbox
npm run search-book:check-spec-reconciliation
npm run search-book:check-publication-boundaries
npm run search-book:check-production-env-fixture
npm run search-book:check-deploy-templates
npm run search-book:check-production-env
npm run search-book:check-launch -- --site-url https://docs.example.com --service-url https://answers.example.com --backup-manifest /path/to/latest.manifest.json --run-verify

# Publication-day source freshness check for exact Vibe market/leverage wording
npm run search-book:check-source-freshness

# Local-only Discord/Lafa editorial packet; writes raw excerpts outside the repo
npm run search-book:discord-review -- --input /path/to/discord-export.json --lafa-author-id <id> --out-dir /tmp/search-book-discord-review
npm run search-book:discord-route-review -- --review-json /tmp/search-book-discord-review/discord-review-queue.json --out-dir /tmp/search-book-discord-routing
npm run search-book:discord-routing-summary -- --routing-json /tmp/search-book-discord-routing/discord-review-routing.json
npm run search-book:discord-editorial-queue
npm run search-book:check-discord-review-artifacts -- --review-json /tmp/search-book-discord-review/discord-review-queue.json --routing-json /tmp/search-book-discord-routing/discord-review-routing.json

# SQLite backup with restore-check manifest
npm run search-book:backup-db

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

The `search-book:verify` step includes the no-secret local monitoring evidence probe for
`/health` and token-gated `/api/search-book/metrics`. The workflow does not load LLM
credentials, production env files, moderation tokens, metrics tokens, or Discord tokens.

## Answer-engine service

`scripts/serve-answer-engine.mjs` exposes `POST /api/search-book/answer`,
`POST /api/search-book/rating`, `POST /api/search-book/page-feedback`,
`GET /api/search-book/insights`,
`GET /api/search-book/examples`, `GET /api/search-book/moderation`,
`GET /api/search-book/metrics`, and `GET /health`,
persisting to SQLite (`node:sqlite`). Point the static frontend at it with
`index.html?service=http://127.0.0.1:8787`; answer ratings, reader page feedback,
Search Insights, and dynamic example chips use the service while keeping `localStorage`
and curated-example fallback. Retention,
the browser CORS allowlist (`SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS`, default `*`),
the disabled-by-default token-gated moderation and metrics exports, the reviewer gap-summary
job (`npm run search-book:living-docs-summary`), and the backup/restore-check utility
(`npm run search-book:backup-db`) are documented in `LIVING-DOCS-OPERATIONS.md`. Before
production launch, run `npm run search-book:check-production-env` with the service env
loaded; it fails local defaults such as wildcard CORS, extractive default mode, repo-local
SQLite paths, missing production VPS LLM env, missing reviewer/cadence assignment, and missing
backup storage without printing secret values.
For launch evidence, run `npm run search-book:check-launch -- --site-url <public-docs-route> --service-url <answer-engine-route> --backup-manifest <latest-manifest> --run-verify`;
it composes the production env preflight, deterministic verify, URL-driven deployment
smoke, reviewer assignment, backup-storage evidence, latest restore-checked backup
manifest evidence, and unresolved completion-boundary checks without printing secret values.
For a no-secret localhost rehearsal of the same staging path, run
`npm run search-book:drill-local-launch`; it starts temporary local services, records one
smoke answer, answer rating, and reader page-feedback event, creates a restore-checked
backup manifest, runs the staging launch gate with fresh verify, and tears the services down.
To create attachable operator evidence, run `npm run search-book:launch-evidence`; it writes
`launch-evidence.json` and `launch-evidence.md` under `/tmp` by default, using the local
drill, monitoring probe, and Vibe public-docs source-freshness check when no deployment URLs
are supplied. The packet includes the current sanitized Discord route-coverage snapshot for
Search Insights, Discord review-artifact evidence for the no-raw editorial queue including
source-backed existing-page triage, public-copy readiness state, and refusal-policy readiness state,
Discord refusal-runtime evidence proving the public-safe Discord/Lafa probes remain refusal-only
without loaded LLM credentials,
source-freshness evidence as statuses, hashes, and booleans only, publication-boundary
evidence as public/source/internal counts only, and status-document evidence proving
current report counts match generated data.
Validate a saved packet with `npm run search-book:check-launch-evidence-packet -- --packet <launch-evidence.json>`;
the validator requires the packet to come from a clean repository state.
Render the same count-only Markdown summary used by GitHub Actions with
`npm run search-book:evidence-summary -- --kind launch --packet <launch-evidence.json>`.
Validate the renderer's no-raw/no-secret boundary with `npm run search-book:check-evidence-summary`.
The manual GitHub workflow `Search Book Launch Evidence` runs the same no-secret packet
path and uploads those files as a short-lived artifact for review handoffs.
To run the full local release rehearsal, run `npm run search-book:release-dry-run`; it
builds the static artifact, smoke-tests the copied artifact both statically and with the
answer-engine bridge, builds launch evidence, and writes `release-dry-run.json` plus
`release-dry-run.md` under `/tmp` by default. Its release and launch-evidence packets
include source-freshness, status-document, Discord review-artifact, Discord refusal-runtime,
and evidence-summary renderer no-raw/no-secret evidence, plus publication-boundary evidence proving source
companions stay out of public navigation/routes and internal drafts stay out of runtime
context, while
release, static-artifact, and launch-evidence readiness snapshots all include the same
Discord route-coverage counts, source-backed triage counts, public-copy readiness counts,
refusal-policy readiness counts, runtime refusal probe counts, and
living-docs control flags, including service-backed page feedback.
Validate a saved dry-run packet with `npm run search-book:check-release-dry-run-packet -- --packet <release-dry-run.json>`;
the validator requires clean release and nested launch repository state from the same commit.
Render the same count-only Markdown summary used by GitHub Actions with
`npm run search-book:evidence-summary -- --kind release --packet <release-dry-run.json>`.
To build a platform-neutral static preview bundle, run
`npm run search-book:build-static-artifact`; the manual GitHub workflow
`Search Book Static Artifact` uploads the same `index.html`/data/content bundle for
review or platform handoff without choosing the final deploy route.
To smoke-test a copied bundle directly, run
`npm run search-book:smoke-static -- --root /tmp/search-book-static-site`.
To verify the copied bundle can also bridge to the standalone answer-engine service, run
`npm run search-book:smoke-preview-service -- --static-root /tmp/search-book-static-site`.
Before publishing exact freshness-sensitive Vibe market-count or leverage wording, run
`npm run search-book:check-source-freshness`; it fetches the registered official Vibe
Markdown sources and reports only statuses, hashes, and claim booleans. It verifies current
public-docs wording, not a live exchange market-index count.
To review imported Discord/Lafa material, run `npm run search-book:discord-review` with a
local export and a `/tmp` output directory. It writes raw review excerpts outside the repo,
prints only summary paths/counts, and refuses repository output by default; the checked-in
Discord corpus stays text-redacted. Then run `npm run search-book:discord-route-review`
against that packet to produce a sanitized routing report with item ids, hashes, statuses,
page ids, and source keys only. Run `npm run search-book:discord-routing-summary` with that
routing report to publish the no-raw summary into static Search Insights as hashes, page ids,
source keys, statuses, and counts only. Run `npm run search-book:discord-editorial-queue`
to refresh `DISCORD-EDITORIAL-QUEUE.md`, a committed no-raw reviewer queue derived from
the same sanitized summary, including automated triage status, public-copy readiness status, and
refusal-policy readiness status.
Validate either the committed no-raw summary alone or the full local review/routing path with
`npm run search-book:check-discord-review-artifacts`; it prints only counts, booleans, and
paths, and checks for raw-field or sample-text leakage without echoing excerpts. The same
check validates `DISCORD-EDITORIAL-QUEUE.md` against the sanitized routing summary so the
Markdown reviewer handoff cannot silently drift.
Validate the public-safe runtime refusal boundary with `npm run search-book:check-discord-refusals`;
it runs extractive-mode answer probes for the Discord/Lafa refusal lanes and requires refusal,
`G-001`, zero citations, zero answer bytes, no primary page, and no loaded LLM credentials.

## Environment

Copy `.env.example` → `.secrets/search-book.env`, fill in values, and load with `--env-file`:

```bash
node --env-file=.secrets/search-book.env scripts/serve-answer-engine.mjs
```

Secrets (`SEARCH_BOOK_LLM_API_KEY`, moderation tokens, Discord tokens) are **never** committed
— `.secrets/` and `.env*` are git-ignored. API keys are read from `process.env` only and are
never printed or persisted.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) and the systemd units at
[`deploy/symmio-search-book.service`](./deploy/symmio-search-book.service),
[`deploy/symmio-search-book-backup.service`](./deploy/symmio-search-book-backup.service),
and [`deploy/symmio-search-book-backup.timer`](./deploy/symmio-search-book-backup.timer). The no-secret
operator packet for the remaining VPS env and public deploy-route gates is
[`PRODUCTION-READINESS-PACKET.md`](./PRODUCTION-READINESS-PACKET.md).

## Non-goals

This is the corpus + runtime harness, not yet a deployed production docs site. Production
service env, the selected public frontend route, production moderation/backup access, an
assigned reviewer owner/cadence, and exact Discord/Lafa claim review remain production follow-ups
(tracked under Linear SYN-209 and its children).
