# Deployment

How to deploy the Symmio Search Book: the **static site** (`index.html` + `data/`) and the
optional **answer-engine service** (`scripts/serve-answer-engine.mjs`, SQLite-backed).

> Node **>= 22.5.0** is required (experimental `node:sqlite`). No npm dependencies.

## 1. Build the corpus

The build consumes the external Vibe docs export. Provide it via env (see `.env.example`):

```bash
export VIBE_DOCS_PUBLIC=/path/to/Docs/public
export VIBE_DOCS_DATA=/path/to/Website/public/generated/docs-data.json

npm run search-book:build
node scripts/build-all.mjs --verify     # invariants + sensitive-pattern scan; must pass
```

Commit any regenerated `data/` artifacts. The GitHub Actions workflow
`.github/workflows/search-book-verify.yml` clones the public Vibe docs export and runs
`npm run search-book:verify`, `npm run search-book:smoke-static`,
`npm run search-book:smoke-service`, and `npm run search-book:smoke-preview-service`
without loading secrets.

## 2. Secrets & environment

```bash
mkdir -p .secrets
cp .env.example .secrets/search-book.env
# edit .secrets/search-book.env — fill SEARCH_BOOK_* values; for live LLM set SEARCH_BOOK_LLM_API_KEY
chmod 600 .secrets/search-book.env
```

The key is loaded only via `node --env-file=...`. Never commit a filled-in env file
(`.secrets/` and `.env*` are git-ignored) and never echo the key.

For production, do not blindly copy a local `.secrets/search-book.env` if it still contains
localhost URLs, wildcard CORS, repo-local SQLite paths, or extractive default mode. Use
[`PRODUCTION-READINESS-PACKET.md`](./PRODUCTION-READINESS-PACKET.md) to build the VPS env at
`/etc/symmio-search-book/search-book.env` from the approved LLM values plus production-safe
DB, origin, reviewer, metrics, and backup settings.

## 3. Static site

`index.html` + `data/` are fully static. Serve them with any static host/CDN, or locally:

```bash
npm run search-book:check-static     # integrity gate
npm run search-book:serve-static     # http://127.0.0.1:8788
```

To wire the static frontend to a live service, load it as
`index.html?service=https://<answer-engine-host>` — it falls back to `localStorage` and
curated examples when the service is absent.

## 4. Answer-engine service (systemd)

```bash
# Place the repo and env file
sudo mkdir -p /opt/symmio-search-book /etc/symmio-search-book /var/lib/symmio-search-book /var/backups/symmio-search-book
sudo rsync -a --exclude .git --exclude node_modules ./ /opt/symmio-search-book/
# Create /etc/symmio-search-book/search-book.env from PRODUCTION-READINESS-PACKET.md.
# Do not paste or print secret values in logs.
sudo chmod 600 /etc/symmio-search-book/search-book.env
# In that env file, set SEARCH_BOOK_ANSWER_ENGINE_DB=/var/lib/symmio-search-book/search-book-answer-engine.sqlite
# Also set SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR=/var/backups/symmio-search-book
# and SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST=/var/backups/symmio-search-book/latest.manifest.json

# Create the service user
sudo useradd --system --no-create-home --shell /usr/sbin/nologin symmio-search-book || true
sudo chown -R symmio-search-book:symmio-search-book /var/lib/symmio-search-book /var/backups/symmio-search-book

# Install + start the service and daily backup timer
sudo cp deploy/symmio-search-book.service /etc/systemd/system/
sudo cp deploy/symmio-search-book-backup.service /etc/systemd/system/
sudo cp deploy/symmio-search-book-backup.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now symmio-search-book.service
sudo systemctl enable --now symmio-search-book-backup.timer
sudo systemctl status symmio-search-book.service
sudo systemctl list-timers symmio-search-book-backup.timer
```

Health check: `curl -fsS http://127.0.0.1:8787/health`.

After the database exists, run one immediate backup to create the latest manifest used by
the launch gate:

```bash
sudo systemctl start symmio-search-book-backup.service
sudo test -s /var/backups/symmio-search-book/latest.manifest.json
```

For production browser traffic, set
`SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS=https://<public-docs-route>` in the service env.
The local default is `*`; server-to-server health checks without an `Origin` header remain
allowed.

Before enabling public traffic, run the production preflight with the same service env file:

```bash
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-production-env.mjs
```

The preflight validates built artifacts, production SQLite path, LLM-backed default mode,
allowed origins, public service URL, moderation and metrics token rules, reviewer
owner/cadence, backup storage, and live-eval evidence. It reports whether secrets are
configured but never prints secret values.

For a full no-secret localhost rehearsal before touching production infrastructure, run:

```bash
npm run search-book:drill-local-launch
```

The drill starts temporary static and answer-engine services, writes one smoke answer and
rating, creates a restore-checked backup manifest, runs the staging launch gate with fresh
verify and write-smoke enabled, then stops both services.

To package the same evidence into files for an operator handoff or release note, run:

```bash
npm run search-book:launch-evidence
```

For production, load the production env file and pass the final URLs/manifest:

```bash
node --env-file=/etc/symmio-search-book/search-book.env scripts/build-launch-evidence-packet.mjs \
  --profile production \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --backup-manifest /var/backups/symmio-search-book/latest.manifest.json \
  --run-verify
```

The packet writes `launch-evidence.json` and `launch-evidence.md`, records only booleans
for secret presence, and includes launch readiness plus monitoring evidence by default.

The full launch gate composes the production preflight, deterministic verify, URL-driven
deployment smoke, reviewer assignment, backup-storage evidence, and unresolved completion
boundary. Load the same service env file so it can see the production LLM/service settings,
reviewer owner, cadence, backup storage evidence, and the latest restore-checked backup
manifest:

```bash
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-launch-readiness.mjs \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --backup-manifest /var/backups/symmio-search-book/latest.manifest.json \
  --run-verify
```

For staging-only localhost validation, use the staging profile. This permits local URLs but
keeps unresolved production blockers visible as warnings. Pass a staging backup manifest
when validating restore evidence:

```bash
npm run search-book:check-launch -- \
  --profile staging \
  --allow-local \
  --site-url http://127.0.0.1:<preview-port> \
  --service-url http://127.0.0.1:<service-port> \
  --mode extractive \
  --backup-manifest /tmp/search-book-answer-engine.sqlite.manifest.json \
  --skip-production-env \
  --run-verify
```

For operational monitoring, enable the internal metrics export only behind a trusted route:

```bash
SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT=true
SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN=<server-only-token>
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-monitoring-evidence.mjs \
  --profile production \
  --service-url https://<answer-engine-host> \
  --metrics-required
curl -fsS -H "Authorization: Bearer $SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN" \
  http://127.0.0.1:8787/api/search-book/metrics
```

Metrics include endpoint/status counters, answer/rating totals, datastore totals, uptime,
and memory usage. They do not include raw questions, answers, rating notes, or secret values.
For no-secret local validation of the health/metrics contract, run
`npm run search-book:check-monitoring`; it starts a temporary service with metrics enabled,
verifies unauthenticated metrics are rejected, verifies authenticated metrics succeed, and
prints only configured/not-configured booleans for token state.

## 5. Smoke verification

These run isolated localhost servers with temp databases and never call the LLM provider:

```bash
npm run search-book:smoke-static
npm run search-book:smoke-service
npm run search-book:smoke-preview-service
```

Confirm an extractive (no-key) answer end to end:

```bash
node scripts/run-llm-rag-answer.mjs --query "What is Vibe Trading?" --mode extractive
```

After a preview or production URL is available, run the URL-driven deployment smoke. It is
read-only by default:

```bash
npm run search-book:smoke-deployment -- \
  --site-url https://<public-docs-route>
```

To verify the deployed service bridge, add the answer-engine URL. This checks health,
CORS, and Search Insights without writing telemetry:

```bash
npm run search-book:smoke-deployment -- \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host>
```

For launch or staging validation, pass `--write` to create one answer event and one rating.
Use `--mode llm` only after production LLM credentials are installed and the preflight
passes; otherwise use `--mode extractive` to verify deterministic fallback.

```bash
npm run search-book:smoke-deployment -- \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --mode extractive \
  --write
```

## 6. Operations

Backups, retention, the gated moderation export, and the reviewer review loop are documented
in [`LIVING-DOCS-OPERATIONS.md`](./LIVING-DOCS-OPERATIONS.md). Production backups/manifests and
the SQLite datastore are operational artifacts and must not be committed.
