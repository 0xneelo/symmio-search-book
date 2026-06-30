Build the **Vibe × Symmio documentation compendium** — a **unified manifesto of the intent-based derivatives revolution**, jointly authored by both teams + researchers: the best documentation in web3. The front door is an **answer engine** (ask a question → routed to the exact page → rate it → ask again); the docs **onboard you into the system**; and they're **living** (every question tracked, every answer rated, gaps drive improvement). **500-800 cited pages.**

Run this as **two sessions: full research, then implementation.**

**Read the full spec in `_specs/app-docs/` before doing anything, and follow it.** Files (in order):
- `01-mission.md` — mission (the manifesto), definition of done, principles, the Symmio×Vibe joint framing.
- `02-narrative-thesis.md` — THE content spine: origin/vision (2021, the old whitepaper), the thesis (derivatives, perps, swaps, tokenization, permissionless derivatives for any token), intents vs order books, bootstrapping + Hyperliquid/HIP-3 + Vibe as the discovery layer, intents & solvers (protocol vs third-party), inside Symmio (Party A/B, isolation, cross-margin, capital efficiency, UX, long-term vision), and guided journeys.
- `03-grounding.md` — verified product facts + the AUTHORITATIVE revenue venue/chain/phase matrix.
- `04-sources.md` — everything to ingest: our code + Linear, Symmio/Vibe docs, **original + current whitepapers**, the **~400-page `0xneelo/vibe_docs`** (the heaviest source — read all of it, restructure it), the **"Vibe Trading" Notion**, `github.com/symm-io`, SuperFlow (SSHE), Hyperliquid/Goldsky, and the **Symmio Discord** (community questions + Lafa's answers).
- `05-architecture.md` — the IA (manifesto + reference) + the answer-engine front door + guided journeys.
- `06-answer-engine.md` — the answer engine + the living-docs loop (question tracking, ratings, gaps queue, demand-driven improvement; Discord-seeded).
- `07-research-session.md` — **Session 1 (Research):** mine our truth + the Symmio Discord, run **25 sub-agents** over the top ~50 crypto docs, gap analysis → dossier (IA, style guide, page manifest, Q&A dataset).
- `08-implementation-session.md` — **Session 2 (Build):** scaffold, write the manifesto + reference, build the answer engine + living docs, journeys, QA, deploy — plus the 3 Phase-0 decisions to confirm with the operator (platform, repo, transparency).
- `09-design-reference.md` — the operator's front-door **mockup** (`design/vibe-docs-mockup.html`): the Google-like "Ask & search" home, example-question chips, the "Search insights" (living-docs) page, on the Vibe brand. **Match it.**
- `10-operating-protocol.md` — **never block, never shortcut:** log anything needing the operator (access, credentials, decisions, ambiguities) to `OPERATOR-INBOX.md`, then continue other work; the operator resolves items live during the session.

**Non-negotiables:** primary sources only; cite every claim; argue *and* document (manifesto + reference); reconcile contradictions (incl. the 5-vs-15 referral-level one); leak no secrets; **never block or take shortcuts — log anything needing the operator to `OPERATOR-INBOX.md` and keep moving (`10`)**; ONE IA + ONE style guide; let real questions (tracked + Discord) shape the docs. Checkpoint + commit after every phase; maintain `DECISIONS` / `SOURCES` / `STYLEGUIDE` / `GAPS` / `QUESTIONS` / `OPERATOR-INBOX` + the page manifest.

**Done =** a deployed/preview docs site of **500-800 cited pages** (the manifesto + the full Symmio/Vibe reference incl. revenue/volume/points/vibe-points + every dashboard view), a working **answer-engine front door** with citations, the **living-docs loop**, a Discord-seeded FAQ, and a final report. Begin with Session 1 (`07`).
