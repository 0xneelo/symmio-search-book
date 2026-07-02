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
- Local preview evidence: latest local launch drill passed against temporary preview `127.0.0.1:46074` plus service `127.0.0.1:45748`, with write-smoke, restore-check, and 15/15 staging launch checks from generatedAt `2026-07-02T11:17:03.738Z`
- Latest strict manual launch/release evidence: launch run `28584884786` and release run `28584885169` passed from commit `70a04e4`; downloaded artifacts under `/tmp/search-book-gh-manual-launch-28584884786` and `/tmp/search-book-gh-manual-release-28584885169` passed strict summary validation without printing secrets, and check-run annotations were empty (`[]`)
- Latest platform-neutral static artifact evidence: manual `Search Book Static Artifact` workflow run `28584885213` passed from commit `70a04e4`; downloaded artifact `/tmp/search-book-gh-static-artifact-28584885213/search-book-static-site` passed checked packet validation plus static and preview-service smokes without loading secrets, and check-run annotations were empty (`[]`)
- Current deterministic evidence: 890 exact routes, 2,884 chunks, 801 authored pages,
  source ingestion `17/17` with 0 partial / 0 parked / 0 missing source families,
  Discord corpus imported internal-only, no-raw Discord editorial queue Markdown/JSON generated,
  Discord editorial queue JSON proof `passed` with `queueReady:true`, 160 routed items, 91 page-fit groups, 13 refusal-review items, and no raw text fields; disposition evidence is reviewer-handoff ready with 91/91 page-fit groups keeping existing source-backed public copy, 13/13 refusal items keeping refusal policy, 0 public-copy changes proposed, and 0 exact Discord/Lafa statements promoted; reviewer workflow evidence is ready with 4 phases, 91 page-fit groups, 13 refusal items, 0 public-copy changes allowed, and 0 exact Discord/Lafa promotions allowed,
  Discord refusal runtime probes `2/2` passing with no LLM credentials loaded,
  publication boundaries passed, living-docs review evidence passed, backup-restore evidence passed,
  quality gates `29/30`

Only these production gates remain:

- OPERATOR-INBOX #11: install production VPS env at
  `/etc/symmio-search-book/search-book.env` (Linear operator task `SYN-281`)
- OPERATOR-INBOX #4: choose public frontend platform, repo owner, and deploy route
  (Linear operator task `SYN-285`)

Open operator Linear task map: `#4=SYN-285`, `#11=SYN-281`.

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
npm run search-book:check-production-env-fixture
npm run search-book:check-deploy-templates
npm run search-book:check-production-packet
npm run search-book:check-backup-restore
npm run search-book:check-github-workflows
npm run search-book:check-living-docs-review
npm run search-book:check-discord-review-artifacts
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-production-env.mjs
sudo cp deploy/symmio-search-book.service /etc/systemd/system/
sudo cp deploy/symmio-search-book-backup.service /etc/systemd/system/
sudo cp deploy/symmio-search-book-backup.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now symmio-search-book.service
sudo systemctl enable --now symmio-search-book-backup.timer
sudo systemctl start symmio-search-book-backup.service
sudo test -s /var/backups/symmio-search-book/latest.manifest.json
```

Pass criteria:

- status is `passed`
- valuesPrinted is `false`
- LLM API key is reported only as configured/not configured
- DB path is absolute and outside the repo
- default mode is `llm`
- CORS origins are exact HTTPS public docs origins, never `*`
- reviewer owner/cadence and backup storage are configured
- no-secret local backup-restore evidence passes before relying on production backup manifests
- no-secret GitHub workflow contract guard passes before relying on CI/manual release artifacts
- no-secret living-docs reviewer evidence reports count-only summary output before enabling reviewer handoffs
- no-secret Discord editorial queue data proof passes before using the committed reviewer queue for operator handoff
- launch/release packet validators require the living-docs reviewer evidence before operator handoff
- launch/release packet validators require Discord editorial queue data evidence before operator handoff
- launch/release packet validators require open-operator Linear task evidence before operator handoff
- backup timer is enabled and the latest manifest exists after the first run

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

node --env-file=/etc/symmio-search-book/search-book.env scripts/build-launch-evidence-packet.mjs \
  --profile production \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --backup-manifest /var/backups/symmio-search-book/latest.manifest.json \
  --run-verify

node --env-file=/etc/symmio-search-book/search-book.env scripts/check-monitoring-evidence.mjs \
  --profile production \
  --service-url https://<answer-engine-host> \
  --metrics-required
```

Production pass criteria:

- production env preflight passes
- deterministic verify runs in the launch gate
- source-ingestion launch check reports `17/17 complete`, 0 partial, 0 parked, and 0 missing source families
- sanitized Discord route-coverage launch check reports 91/91 page-fit groups covered, 0 single-route groups remaining, source-backed triage 91/91 page-fit groups, public-copy ready 91/91 page-fit groups, public-copy review required 0/91 page-fit groups, refusal policy ready 13/13 refusal items, and refusal policy review required 0/13 refusal items
- Discord editorial queue data evidence reports `passed`, `queueReady:true`, 160 routed items, 91 page-fit groups, 13 refusal-review items, 0 raw-key hits, 0 sample leaks, and `valuesPrinted:false`; disposition evidence is reviewer-handoff ready with 91/91 page-fit groups keeping existing source-backed public copy, 13/13 refusal items keeping refusal policy, 0 public-copy changes proposed, and 0 exact Discord/Lafa statements promoted
- Discord refusal runtime evidence reports 2/2 public-safe probes refused with `discord-corpus-review-required`, `G-001`, zero citations, zero answer bytes, no primary page, and no loaded LLM credentials
- deployment smoke passes against non-local HTTPS URLs
- latest backup manifest reports restore-check `passed`
- backup-restore evidence reports 4/4 tables matched, restore `passed`, integrity `ok`, and no raw content printed
- GitHub workflow contract evidence reports 4/4 expected workflows, no unexpected workflows, validator/summary calls present, and no secret-loading fragments
- living-docs reviewer evidence reports raw internal summaries are privacy-flagged, sanitized evidence prints only counts/booleans, no raw content is printed, and no LLM credentials are loaded
- launch/release packet validators report Discord editorial queue data evidence `passed`
- launch/release packet validators report living-docs review evidence `passed`
- launch/release packet validators report open-operator Linear tasks `#4=SYN-285, #11=SYN-281`
- reviewer owner/cadence evidence is configured
- no launch-blocking operator items remain for the chosen release scope
- `launch-evidence.json` and `launch-evidence.md` are attached or linked without secret values
- monitoring evidence reports health `ok`, unauthenticated metrics rejected, authenticated metrics `ok`, and no raw questions/secrets in metrics

## Discord/Lafa Review Follow-Up

Do not reopen OPERATOR-INBOX #2 or #17. The real Discord export is imported in
internal-only mode and the source-ingestion map is `17/17`. Before publishing exact
Discord-derived statements, review the no-raw committed work queue:

```sh
npm run search-book:discord-editorial-queue
sed -n '1,220p' DISCORD-EDITORIAL-QUEUE.md
```

The queue is derived from `data/discord-review-routing.json` and contains only item ids,
page ids, page titles, source keys, route counts, public-route coverage, automated triage
status, public-copy readiness status, refusal policy status, refusal reasons, and automated disposition. For source corpus counts, review:

```sh
node -e 'const fs=require("node:fs"); const d=JSON.parse(fs.readFileSync("data/discord-corpus.json","utf8")); console.log(JSON.stringify(d.totals, null, 2));'
```

Expected review boundary:

- `data/discord-corpus.json` stays `corpusReady:true`
- message text remains omitted from the committed corpus
- question clusters and Lafa candidates are used as demand signals unless a reviewer approves a public paraphrase
- current committed disposition proposes 0 public-copy changes and promotes 0 exact Discord/Lafa statements
- generated routes/gaps/pages incorporate approved Discord/Lafa demand safely

## Release Checklist

Before calling Search Book production-ready:

```sh
npm run search-book:verify
npm run search-book:check-production-packet
npm run search-book:check-backup-restore
npm run search-book:check-github-workflows
npm run search-book:check-living-docs-review
npm run search-book:check-discord-review-artifacts
node scripts/check-readiness-evidence.mjs
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-production-env.mjs
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-launch-readiness.mjs \
  --site-url https://<public-docs-route> \
  --service-url https://<answer-engine-host> \
  --backup-manifest /var/backups/symmio-search-book/latest.manifest.json \
  --run-verify
node --env-file=/etc/symmio-search-book/search-book.env scripts/check-monitoring-evidence.mjs \
  --profile production \
  --service-url https://<answer-engine-host> \
  --metrics-required
git diff --check
```

Do not mark the active Search Book goal complete until the completion audit can prove every
requirement against current evidence.
