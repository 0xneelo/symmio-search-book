# 04 — Sources to ingest (read deeply; cite)

## 2026-07-01 reconciliation note

This file lists the original source-ingestion target. Current source-ingestion truth is `17/17` complete in `data/source-ingestion.json` and `12-search-book-to-100-percent.md`. Do not re-open resolved access/source items: Discord export/access is provided and imported internal-only; Vibe Trading Notion is registered through MCP with a paraphrase-only public-use boundary; original/oldest Symmio whitepaper recovery is out of scope for v1; SuperFlow/SHE/SSHE is bounded to the provided SHE OpenAPI plus Symmio Foundation meta-solver/clearing-layer context; Opyn is excluded from the v1 competitive sweep. The only operator gates that remain are #11 production VPS env install and #4 public frontend platform/repo/deploy route.

Every page that draws on a source cites it; maintain `SOURCES.md` (claim → source).

## Ours (the reference / product layer)
- **`onboarding-app` repo:** revenue/volume/points code (`server/pulse.js`, `server/volume.js`, `server/volume-snapshots.js`, `server/routes/me.js`, `src/dashboard/*`) + `README.md`, `DESIGN.md`, `CLAUDE_MAX.md`.
- **Synchronicity (SYN) Linear project:** revenue SYN-166 / 200 / 201 / 203 / 204; volume SYN-163; FAQ SYN-56; referral depth SYN-118; volume-adjust SYN-192; calculators SYN-98 / 73; deploy SYN-205. Read descriptions + comments.
- **Our revenue docs:** `docs/network-revenue.md` + the in-app `#revenue` page (`src/dashboard/revenue-doc.jsx`) — the explicit **"massively improve"** target.

## Symmio & Vibe (the manifesto / protocol layer)

> **Heaviest source by far — `0xneelo/vibe_docs`: ~400 pages of insanely dense, high-value content.** It is *under-structured*, not *under-written* — most of the compendium's substance already exists here. The core job is to **read it exhaustively and restructure / surface it** into the IA, not to generate from scratch. Budget the most reading time here.
- **`github.com/0xneelo/vibe_docs`** — the ~400-page primary source above; read *all* of it and restructure it into the IA. The single biggest input.
- **Notion — "Vibe Trading"** — Vibe's working Notion source is registered through MCP as `vibe-trading-notion` with a paraphrase-only public-use boundary. Do not quote Notion text or publish signed media/static commercial details unless a later operator decision changes the boundary.
- `docs.vibe.trading`
- `docs.symm.io`
- `docs.symmio.foundation`
- **Symmio whitepaper history boundary** — use the current whitepaper plus official Git/current-docs evidence for launch-safe history claims. Original/oldest whitepaper recovery is out of scope for v1; do not claim an exact original artifact.
- `github.com/symm-io/` (org repos + docs)
- **SuperFlow / SSHE** docs
- **Hyperliquid** docs (for the gamma / HIP-3 argument) and **Goldsky** (subgraph data).

## Community (the demand signal — see `06` + `07`)
- **Symmio Discord** — provided and imported internal-only. Use the committed no-raw corpus counts plus local `/tmp` review/routing packets to seed FAQ demand, the answer engine, and the gaps queue. Do not quote raw Discord text or exact Lafa statements in public copy until editorial review promotes a specific claim.
- Any researcher write-ups / threads the team points to (this is a *jointly authored* manifesto — credit contributors).
