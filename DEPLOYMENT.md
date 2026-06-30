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

Commit any regenerated `data/` artifacts. CI should run `npm run search-book:verify`.

## 2. Secrets & environment

```bash
mkdir -p .secrets
cp .env.example .secrets/search-book.env
# edit .secrets/search-book.env — fill SEARCH_BOOK_* values; for live LLM set SEARCH_BOOK_LLM_API_KEY
chmod 600 .secrets/search-book.env
```

The key is loaded only via `node --env-file=...`. Never commit a filled-in env file
(`.secrets/` and `.env*` are git-ignored) and never echo the key.

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
sudo mkdir -p /opt/symmio-search-book /etc/symmio-search-book /var/lib/symmio-search-book
sudo rsync -a --exclude .git --exclude node_modules ./ /opt/symmio-search-book/
sudo cp .secrets/search-book.env /etc/symmio-search-book/search-book.env
sudo chmod 600 /etc/symmio-search-book/search-book.env
# In that env file, set SEARCH_BOOK_ANSWER_ENGINE_DB=/var/lib/symmio-search-book/search-book-answer-engine.sqlite

# Create the service user
sudo useradd --system --no-create-home --shell /usr/sbin/nologin symmio-search-book || true
sudo chown -R symmio-search-book:symmio-search-book /var/lib/symmio-search-book

# Install + start the unit
sudo cp deploy/symmio-search-book.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now symmio-search-book.service
sudo systemctl status symmio-search-book.service
```

Health check: `curl -fsS http://127.0.0.1:8787/health`.

For production browser traffic, set
`SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS=https://<public-docs-route>` in the service env.
The local default is `*`; server-to-server health checks without an `Origin` header remain
allowed.

Before enabling public traffic, run the production preflight with the same service env file:

```bash
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-production-env.mjs
```

The preflight validates built artifacts, production SQLite path, LLM-backed default mode,
allowed origins, public service URL, moderation token rules, and live-eval evidence. It
reports whether secrets are configured but never prints secret values.

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

## 6. Operations

Backups, retention, the gated moderation export, and the reviewer review loop are documented
in [`LIVING-DOCS-OPERATIONS.md`](./LIVING-DOCS-OPERATIONS.md). Production backups/manifests and
the SQLite datastore are operational artifacts and must not be committed.
