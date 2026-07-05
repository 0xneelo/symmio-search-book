# Operator Tasks

Durable human-only handoffs for Search Book. This file mirrors the currently open
operator gates from `_specs/app-docs/OPERATOR-INBOX.md`; it does not reopen
resolved source-ingestion or checkpoint items.

## 2026-07-02 - Search Book production VPS LLM/service env install

- **Why this is yours** - Human-only gate. The local `.secrets/search-book.env`
  is complete, but production still needs the service environment installed on
  the VPS at `/etc/symmio-search-book/search-book.env`. The agent must not print
  or commit API keys and cannot safely install production secrets from chat.
- **Do this**
  1. On the production VPS, create `/etc/symmio-search-book/search-book.env`
     with service-readable, non-world-readable permissions.
  2. Populate the production Search Book service variables from the secure
     operator source, including the OpenAI-compatible LLM settings, service DB
     path, default answer mode, allowed origin, retention, moderation, metrics,
     and backup settings needed for the production preflight.
  3. Restart or reload the Search Book service without printing the environment
     file contents.
  4. Run the production preflight/launch-evidence command from the deployed repo
     and confirm it reports no secret printing and no local-only defaults.
- **Blocked until you do** - `llmProductionReady`, production model-backed answer
  synthesis, production live prompt-injection execution, and launch preflight.
- **Verify** - `OPERATOR-INBOX.md` item #11 is marked `[RESOLVED]`; Linear
  `SYN-281` is updated with the VPS install evidence; production preflight passes
  without exposing the key or env values.
- **Source** - `_specs/app-docs/OPERATOR-INBOX.md` #11; Linear `SYN-281`;
  `PROGRESS.md`; `PRODUCTION-READINESS-PACKET.md`.

## 2026-07-02 - Search Book public frontend platform and deploy route

- **Why this is yours** - Blocking decision. The backend is decided as a
  standalone Search Book service with SQLite, but the public frontend platform,
  repository owner, deploy route, allowed production origins, and release
  workflow still need an operator call.
- **Do this**
  1. Pick the production frontend platform and repository ownership model.
  2. Pick the public route/domain and deploy workflow for the Search Book static
     UI and answer widget.
  3. Provide the production service origin/CORS pairing that should be wired into
     the service environment and launch preflight.
  4. Record the decision in `OPERATOR-INBOX.md` #4 and Linear `SYN-285`.
- **Decision needed** - Recommended path: keep `symmio-search-book` as the
  canonical repo, deploy the static Search Book UI from that repo, point it at
  the standalone answer-engine service, and configure a narrow production origin
  rather than a wildcard.
- **Blocked until you do** - Final production frontend scaffold, deploy
  automation, public preview/production URL, and production CORS configuration.
- **Verify** - `OPERATOR-INBOX.md` item #4 is marked `[RESOLVED]`; Linear
  `SYN-285` records the chosen platform/repo owner/route/origin; the static
  artifact and launch-evidence workflows pass against the chosen route.
- **Source** - `_specs/app-docs/OPERATOR-INBOX.md` #4; Linear `SYN-285`;
  `_specs/app-docs/11-production-readiness-roadmap.md`; `FINAL-REPORT.md`.
