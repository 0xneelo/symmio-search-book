# Search Book Living-Docs Operations

This runbook is the internal reviewer workflow for the Search Book answer-engine loop. It assumes the standalone service, SQLite datastore, Search Insights bridge, retention policy, CORS allowlist, gated moderation export, gated metrics export, helpful-answer reuse cache, dynamic examples endpoint, gap-summary job, and backup/restore-check utility are implemented. It does not make the system production-deployed by itself; production still needs the selected public route, production VPS service environment, and Discord readable-export import.

## Operating Boundary

The living-docs loop exists to turn real questions into better docs without weakening source rules.

- Every public answer must stay grounded in Search Book pages and citations.
- Raw user questions, rating notes, moderation exports, and summary outputs are internal reviewer material until privacy review approves publication.
- The moderation and metrics tokens are server-only. Never place them in `index.html`, static data files, Linear comments, screenshots, docs, or browser-visible config.
- Operator-blocked topics stay blocked. Do not turn Discord/Lafa messages, production VPS credential setup, or deploy-route gaps into public claims until the matching `OPERATOR-INBOX.md` item is resolved. Notion, oldest-whitepaper v1 scope, and SSHE v1 boundary are resolved; keep their documented public-use boundaries instead of re-opening blockers.
- Guardrail refusals are product behavior, not content bugs: secret requests, prompt injection, source-family-missing questions, internal-draft requests, financial advice, and Phase B economics should continue refusing unless the approved source boundary changes.

## Prerequisites

Production service setup:

```sh
SEARCH_BOOK_ANSWER_ENGINE_DB=/path/to/search-book-answer-engine.sqlite
SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS=180
SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS=https://<public-docs-route>
SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT=false
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN=
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT=50
SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT=false
SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN=
SEARCH_BOOK_REVIEWER_OWNER=<owner or rotation>
SEARCH_BOOK_REVIEW_CADENCE=daily
SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR=/path/to/approved/backups
SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST=/path/to/approved/backups/latest.manifest.json
SEARCH_BOOK_BACKUP_MAX_AGE_HOURS=24
```

LLM synthesis setup remains separate:

```sh
SEARCH_BOOK_LLM_API_STYLE=openai-compatible
SEARCH_BOOK_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
SEARCH_BOOK_LLM_MODEL=
SEARCH_BOOK_LLM_API_KEY=
SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true
```

The model and API key must be installed only in the service environment. Do not print or commit them.

Before public launch or a production env rotation, run the preflight with the same service
environment file:

```sh
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-production-env.mjs
```

The preflight must pass before public traffic is enabled. It validates that local defaults
were replaced by production paths/origins, that the default answer mode is LLM-backed, and
that required secrets, reviewer ownership/cadence, and backup storage evidence are present
without printing secret values.

For launch evidence, run the combined launch gate. It composes the production env preflight,
fresh deterministic verify, URL-driven deployment smoke, reviewer owner/cadence evidence,
backup-storage evidence, and unresolved completion-boundary checks:

```sh
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-launch-readiness.mjs \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-route> \
  --backup-manifest /path/to/approved/backups/latest.manifest.json \
  --run-verify
```

Run the local launch drill before production or staging handoffs when you need one
reproducible no-secret proof:

```sh
npm run search-book:drill-local-launch
```

It starts temporary localhost services, writes one answer/rating, creates a
restore-checked SQLite backup manifest, runs staging `check-launch-readiness` with fresh
verify and write-smoke, and then stops the services. The output reports only local paths
and booleans; it does not load or print LLM keys.

For handoff evidence that does not depend on terminal scrollback, write the packet files:

```sh
npm run search-book:launch-evidence
```

The packet command writes `launch-evidence.json` and `launch-evidence.md` under `/tmp` by
default. In production, run it with `node --env-file=/etc/symmio-search-book/search-book.env`
and the same public URLs plus backup manifest used by the launch gate.

Helpful-answer reuse needs embeddings:

```sh
SEARCH_BOOK_EMBED_ENDPOINT=
SEARCH_BOOK_EMBED_MODEL=text-embedding-3-small
SEARCH_BOOK_REUSE_THRESHOLD=0.9
SEARCH_BOOK_REUSE_MAX_CANDIDATES=250
SEARCH_BOOK_EXAMPLE_LIMIT=4
```

If embeddings are unavailable, the service should skip reuse and answer through the normal path.

## Daily Review Loop

1. Confirm service health.

```sh
curl -sS "$SEARCH_BOOK_ANSWER_ENGINE_URL/health"
```

2. Check Search Insights from the public frontend or service-backed preview. Confirm recent questions, low-rated answers, and gaps are updating.

3. Generate the internal summary from the SQLite datastore.

```sh
SEARCH_BOOK_ANSWER_ENGINE_DB=/path/to/search-book-answer-engine.sqlite \
npm run search-book:living-docs-summary -- --format markdown --since-days 1 --limit 50 --out /tmp/search-book-living-docs-summary.md
```

4. Triage each summary section:

- `gapBacklog`: decide whether the item needs a content edit, source import, operator decision, or product/runtime issue.
- `lowRatedAnswers`: inspect the answer page, citations, and query wording before editing docs.
- `unansweredQuestions`: separate true source gaps from expected refusals.
- `repeatedQuestions`: add or tune exact routes only when the current corpus already supports a grounded answer.
- `recommendations`: convert only verified, source-backed recommendations into content or Linear work.

5. Do not publish summary output directly. It can include raw questions, personal data, notes, and source-sensitive requests.

## Moderation Export

Enable moderation export only for internal reviewer sessions.

```sh
SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT=true
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN=<server-only-token>
```

Fetch the export with a server-side or trusted internal client:

```sh
curl -sS \
  -H "Authorization: Bearer $SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN" \
  "$SEARCH_BOOK_ANSWER_ENGINE_URL/api/search-book/moderation" \
  > /tmp/search-book-moderation.json
```

Review queues:

- `gapBacklog`: content/source gaps grouped by reason and page.
- `lowRatedAnswers`: answers marked `no` or `not-useful`.
- `unansweredQuestions`: refused or ungrounded questions.
- `repeatedQuestions`: demand signals that may need a route, FAQ entry, or page edit.

After review, keep exports only in approved internal storage. Do not commit moderation JSON or paste raw export bodies into Linear.

## Metrics Export

Enable metrics export only for trusted internal monitoring.

```sh
SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT=true
SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN=<server-only-token>
```

Fetch metrics with a server-side or trusted internal client:

```sh
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-monitoring-evidence.mjs \
  --profile production \
  --service-url "$SEARCH_BOOK_ANSWER_ENGINE_URL" \
  --metrics-required

curl -sS \
  -H "Authorization: Bearer $SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN" \
  "$SEARCH_BOOK_ANSWER_ENGINE_URL/api/search-book/metrics"
```

Metrics include uptime, route/status counters, answer/rating counters, datastore totals,
runtime counts, and memory usage. They deliberately exclude raw questions, answers, rating
notes, moderation queues, API keys, and tokens.

For local contract validation, run `npm run search-book:check-monitoring`. It starts a
temporary local service with metrics enabled and prints health/metrics evidence without
printing the metrics token.

## Backup And Restore Check

Back up the SQLite datastore before deploys, source-corpus migrations, retention-policy changes, and any production incident response that may alter stored questions, ratings, gaps, or helpful-answer cache rows.

```sh
SEARCH_BOOK_ANSWER_ENGINE_DB=/path/to/search-book-answer-engine.sqlite \
SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR=/path/to/backups \
SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST=/path/to/backups/latest.manifest.json \
npm run search-book:backup-db
```

The command creates a SQLite-consistent timestamped backup with `VACUUM INTO`, writes an immutable manifest beside that backup, updates the latest-manifest pointer when configured, records table counts and SHA-256, and reopens the backup read-only for `PRAGMA integrity_check` plus table-count verification by default.

Production hosts should install `deploy/symmio-search-book-backup.service` and
`deploy/symmio-search-book-backup.timer`. The timer runs daily, loads the same
`/etc/symmio-search-book/search-book.env` file as the answer service, writes under
`SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR`, and refreshes
`SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST` for launch readiness.

Operational rules:

- Store production backups and manifests only in approved internal storage.
- Do not commit SQLite DB files, backup manifests from production, raw question exports, API keys, or moderation tokens.
- Treat backup manifests as internal if they reveal production paths, table counts, or operating cadence.
- Point `SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST` at the latest restore-checked manifest before running launch readiness; the launch gate validates manifest status, recency, restore-check status, integrity, table-count match, and checksum presence without printing DB paths or raw counts.
- Check `systemctl list-timers symmio-search-book-backup.timer` during weekly review and after host restarts.
- Run `--dry-run` first when validating a new production DB path.
- Use `--no-restore-check` only when restore-check storage is temporarily unavailable; record the exception in Linear and rerun with restore check as soon as possible.

## Triage Rules

| Signal | First action | Allowed outcome |
| --- | --- | --- |
| Low-rated but cited answer | Re-run extractive/LLM answer locally and inspect cited page text. | Improve the cited page, route, or answer fixture if the corpus supports it. |
| `no-grounded-page` | Check whether a public page already answers it. | Add route/FAQ only if grounded; otherwise keep or create a gap. |
| `source-family-missing` | Check `OPERATOR-INBOX.md` for the source family. | Leave parked unless resolved; do not infer missing source facts. |
| `operator-access-required` | Check the exact inbox item and Linear epic status. | Resume only after `[RESOLVED]` appears inline. |
| Prompt injection or secret request | Confirm refusal still fires. | Keep refusal; add regression fixture if a new attack pattern appears. |
| Financial advice | Confirm refusal or neutral educational answer boundary. | Keep no-advice boundary; do not publish investment instructions. |
| Repeated grounded question | Search `QUESTIONS.md`, `question-routes.json`, and authored pages. | Add exact route or FAQ seed if it improves answerability without duplicating content. |

## Content Change Workflow

1. Re-read the relevant source page, authored page, `SOURCES.md`, `STYLEGUIDE.md`, and `OPERATOR-INBOX.md`.
2. If a needed source, decision, or credential is missing, append one `_specs/app-docs/OPERATOR-INBOX.md` item only if it is genuinely new; otherwise reuse the existing item and keep working elsewhere.
3. Edit the smallest authored page or route needed.
4. Regenerate deterministic data:

```sh
node scripts/build-all.mjs --verify
```

5. Probe the affected question:

```sh
node scripts/run-llm-rag-answer.mjs --mode extractive --query "QUESTION" --json
```

6. If prompt/runtime behavior changed, rerun the live eval with service credentials loaded through `--env-file` and never print the API key.
7. Update `PROGRESS.md`, `GAPS.md`, `FINAL-REPORT.md`, and Linear when the change affects readiness evidence.

## Weekly Cadence

Run a wider summary:

```sh
SEARCH_BOOK_ANSWER_ENGINE_DB=/path/to/search-book-answer-engine.sqlite \
npm run search-book:living-docs-summary -- --format markdown --since-days 7 --limit 100 --out /tmp/search-book-living-docs-weekly.md
```

Weekly reviewer checklist:

- Confirm top repeated questions still map to exact public pages.
- Confirm low-rated answers are either fixed, parked, or explicitly accepted as refusal behavior.
- Confirm helpful answer-cache reuse does not serve operator-blocked or source-family-missing topics.
- Confirm dynamic example chips are helpful-rated questions, not private support text.
- Confirm retention is pruning question, rating, gap, and answer-cache rows according to policy.
- Confirm metrics export is either disabled or reachable only through an internal token-gated monitoring path.
- Confirm the latest SQLite backup manifest reports restore-check `passed`.
- Confirm no moderation tokens, metrics tokens, API keys, DB files, or raw exports are committed.
- File or update Linear issues for source imports, deploy tasks, runtime bugs, or content batches.

## Launch Gate

Before calling the living-docs loop production-ready, verify all of this is true:

- Public frontend route is selected and deployed.
- Standalone answer service is deployed with production SQLite path and backup policy.
- Latest production/staging backup restore check has passed.
- `SEARCH_BOOK_LLM_MODEL` and `SEARCH_BOOK_LLM_API_KEY` are installed in service env.
- Retention days are set and approved.
- `SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS` is set to the public docs route, not the local wildcard default.
- `npm run search-book:check-production-env` passes with the production service env loaded.
- `npm run search-book:smoke-deployment -- --site-url <public-route> --service-url <answer-engine-route>` passes in read-only mode; staging or launch validation may add `--write` to create one answer event and rating.
- `npm run search-book:check-launch -- --site-url <public-route> --service-url <answer-engine-route> --backup-manifest <latest-manifest> --run-verify` passes with the production service env loaded.
- Moderation export is disabled by default and token-gated when enabled.
- Metrics export is disabled by default and token-gated when enabled.
- Reviewer owner and cadence are assigned.
- Discord/Lafa import is either completed or explicitly launch-parked.
- `npm run search-book:smoke-service` passes against an isolated database.
- `npm run search-book:smoke-preview-service` passes against local preview/service ports.
- `node scripts/build-all.mjs --verify` passes.
- Latest live LLM eval passes strict citation validation.

## Incident Handling

If a public answer appears unsupported, unsafe, or source-leaking:

1. Disable LLM mode or switch the public service to extractive fallback if needed.
2. Preserve the query, request id, page id, citations, response status, and timestamp internally.
3. Check whether it is a source issue, route issue, prompt/runtime issue, cache-reuse issue, or operator-boundary issue.
4. If reuse-cache is involved, confirm the original helpful-rated answer and embedding match were eligible and post-guardrail.
5. Add or update a regression fixture before re-enabling the affected path.
6. Record the fix in `PROGRESS.md` and Linear.
