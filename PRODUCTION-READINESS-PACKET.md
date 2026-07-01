# Search Book Production Readiness Packet

Date: 2026-07-01

This packet turns the remaining production gates into executable operator work. It does not
contain secrets and does not choose the public hosting platform. Keep it in sync with
`_specs/app-docs/OPERATOR-INBOX.md`.

## Current Boundary

The standalone Search Book repo is the canonical working copy:

- Repo: `~/apps/symmio-search-book`
- Runtime: static `index.html` plus standalone SQLite answer-engine service
- Local LLM env: complete in `.secrets/search-book.env`; do not print it
- Local preview evidence: passed against `127.0.0.1:8798` plus service `127.0.0.1:8797`
- Current deterministic evidence: 799 exact routes, 2,883 chunks, 801 authored pages,
  quality gates `27/30`

Only these production gates remain:

- OPERATOR-INBOX #11: install production VPS env at
  `/etc/symmio-search-book/search-book.env`
- OPERATOR-INBOX #4: choose public frontend platform, repo owner, and deploy route
- OPERATOR-INBOX #17: release readable Discord export for ingestion; this is a source-import
  follow-up, not a reopened #2 operator decision

## #11 Production Env Install

Install the service env on the VPS at:

```sh
/etc/symmio-search-book/search-book.env
```

The file must be owned/readable only by the deploy operator and service path:

```sh
sudo install -d -m 750 /etc/symmio-search-book /var/lib/symmio-search-book /var/backups/symmio-search-book
sudo touch /etc/symmio-search-book/search-book.env
sudo chmod 600 /etc/symmio-search-book/search-book.env
```

Populate it from the known-good local LLM values plus production-safe service values. Do not
commit it, echo it, paste it into chat, or include it in launch logs.

Required production values:

```dotenv
VIBE_DOCS_PUBLIC=/tmp/vibe_docs/Docs/public
VIBE_DOCS_DATA=/tmp/vibe_docs/Website/public/generated/docs-data.json

SEARCH_BOOK_ANSWER_ENGINE_HOST=127.0.0.1
SEARCH_BOOK_ANSWER_ENGINE_PORT=8787
SEARCH_BOOK_ANSWER_ENGINE_URL=https://<answer-engine-host>
SEARCH_BOOK_DEPLOYMENT_SITE_URL=https://<public-docs-route>
SEARCH_BOOK_ANSWER_ENGINE_DB=/var/lib/symmio-search-book/search-book-answer-engine.sqlite
SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE=llm
SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS=180
SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS=https://<public-docs-route>
SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE=60
SEARCH_BOOK_ANSWER_ENGINE_MAX_BODY_BYTES=65536
SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS=500

SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT=false
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN=<server-only-if-enabled>
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT=200

SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT=true
SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN=<server-only-token>

SEARCH_BOOK_LLM_API_STYLE=openai-compatible
SEARCH_BOOK_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
SEARCH_BOOK_LLM_MODEL=gpt-4.1-mini
SEARCH_BOOK_LLM_API_KEY=<server-only-openai-key>
SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true

SEARCH_BOOK_REVIEWER_OWNER=<owner-or-rotation>
SEARCH_BOOK_REVIEW_CADENCE=daily
SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR=/var/backups/symmio-search-book
SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST=/var/backups/symmio-search-book/latest.manifest.json
SEARCH_BOOK_BACKUP_MAX_AGE_HOURS=24
```

Optional reuse-cache embeddings can remain unset for launch unless a provider is approved:

```dotenv
SEARCH_BOOK_EMBED_ENDPOINT=
SEARCH_BOOK_EMBED_MODEL=
SEARCH_BOOK_REUSE_THRESHOLD=0.92
SEARCH_BOOK_REUSE_MAX_CANDIDATES=20
SEARCH_BOOK_EXAMPLE_LIMIT=6
SEARCH_BOOK_TEST_EMBEDDINGS=
```

Validation for #11:

```sh
cd /opt/symmio-search-book
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-production-env.mjs
```

Pass criteria:

- status is `passed`
- valuesPrinted is `false`
- LLM API key is reported only as configured/not configured
- DB path is absolute and outside the repo
- default mode is `llm`
- CORS origins are exact HTTPS public docs origins, never `*`
- reviewer owner/cadence and backup storage are configured

## #4 Public Frontend And Deploy Route Decision

The backend decision is already locked: standalone answer-engine service plus SQLite. The open
#4 decision is the public docs surface.

Operator must provide:

- Public docs URL, for example `https://docs.<domain>`
- Public answer-engine URL, for example `https://answers.<domain>`
- Static hosting platform and repo owner
- Service host owner and reverse-proxy/TLS route
- Release workflow owner: who merges, who deploys, and how rollback works
- Production CORS origin list for `SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS`
- Monitoring owner for `/health`, `/api/search-book/metrics`, and service logs
- Backup owner and restore-check cadence
- Living-docs reviewer owner/cadence

Deploy route must satisfy:

- static site serves `index.html` and `data/*`
- answer-engine route serves `/health` and `/api/search-book/*`
- static site uses the service URL through `?service=<answer-engine-url>` or equivalent
  platform wiring
- answer-engine service is behind HTTPS in production
- service only allows the selected public docs origin in browser CORS
- production SQLite DB and backups live outside the repo

Validation for #4:

```sh
npm run search-book:smoke-deployment -- \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host>
```

For launch evidence, include a write smoke and the launch gate:

```sh
npm run search-book:smoke-deployment -- \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --mode llm \
  --write

node --env-file=/etc/symmio-search-book/search-book.env scripts/check-launch-readiness.mjs \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --backup-manifest /var/backups/symmio-search-book/latest.manifest.json \
  --run-verify
```

Production pass criteria:

- production env preflight passes
- deterministic verify runs in the launch gate
- deployment smoke passes against non-local HTTPS URLs
- latest backup manifest reports restore-check `passed`
- reviewer owner/cadence evidence is configured
- no launch-blocking operator items remain for the chosen release scope

## #17 Discord Import Follow-Up

Do not reopen OPERATOR-INBOX #2. When #17 is resolved, run:

```sh
node scripts/build-discord-corpus.mjs \
  --input <readable-discord-export.json> \
  --publication-mode paraphrase

npm run search-book:verify
```

Expected completion evidence:

- `data/discord-corpus.json` imports real messages
- question clusters and Lafa candidates are reviewed
- `data/source-ingestion.json` moves from `16/17` to `17/17`
- generated routes/gaps/pages incorporate approved Discord/Lafa demand safely

## Release Checklist

Before calling Search Book production-ready:

```sh
npm run search-book:verify
node scripts/check-readiness-evidence.mjs
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-production-env.mjs
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-launch-readiness.mjs \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --backup-manifest /var/backups/symmio-search-book/latest.manifest.json \
  --run-verify
git diff --check
```

Do not mark the active Search Book goal complete until the completion audit can prove every
requirement against current evidence.
