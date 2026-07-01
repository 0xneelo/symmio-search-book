# 07 — Session 1: Research & Architecture

## 2026-07-01 reconciliation note

Session 1 is complete for v1. The compendium has a 794-page manifest, 801 authored pages, a registered source catalog, 17/17 source-ingestion requirements complete, a Discord/Lafa internal-only corpus, and a 49/50 competitive sweep with Opyn excluded by operator decision. Treat this file as the historical research-session brief; do not re-run access/blocker loops for Discord, Notion, SSHE, or original-whitepaper recovery unless a new source-refresh task is explicitly opened.

A dedicated **full research session** that precedes implementation. Output: a complete research dossier + the locked plan to build. Do not start writing pages until this is done.

## Inputs
Everything in `04-sources.md` — our code + Linear, the Symmio/Vibe docs + original & current whitepapers, neelo_docs, GitHub, SuperFlow/SSHE, Hyperliquid/Goldsky, and the **Symmio Discord**.

## 1. Mine our own truth
Read the product code + Linear → a verified fact base (seed: `03-grounding.md`). Read and dissect the Symmio/Vibe docs + **both** whitepapers (original + current) → the manifesto fact base (seed: `02-narrative-thesis.md`). Capture into `SOURCES.md`.

## 2. Mine the Symmio Discord (demand signal)
Ingest the Symmio Discord: extract **community questions** and **Lafa's answers** to any question. Normalize into a structured Q&A dataset (question, answer, topic, links). Seeds the FAQ, the answer engine, and the initial gaps queue (`06`). Requires a Discord export or read access — flag in `DECISIONS.md` if unavailable, and proceed.

## 3. The 25-sub-agent competitive sweep
Spin up **25 parallel research sub-agents**; each returns a **structured report** (IA tree, navigation & search UX, quickstart pattern, glossary approach, API-reference style, diagram usage, AI-assist UX, "what to steal"):
- **15 → top ~50 crypto projects' docs** (3–4 each): perps DEXs (Hyperliquid, dYdX, GMX, Vertex, Aevo, Drift, Jupiter, gTrade/Gains, ApeX, Levana), L1/L2s (Ethereum, Solana, Arbitrum, Optimism, Base, Sui, Aptos, Cosmos), lending (Aave, Compound, Morpho, Spark), LST/restaking (Lido, EigenLayer, ether.fi), stables (Sky/Maker, Ethena, Frax), AMMs (Uniswap, Curve, Balancer), infra (Chainlink, The Graph, Pyth).
- **4 → docs-platform & AI-assist patterns** (Mintlify, GitBook AI, Docusaurus, Fumadocs/Nextra, Kapa.ai, Inkeep) → recommend our stack + answer-engine approach.
- **3 → deep reads of OUR external sources** — Symmio docs + both whitepapers; Vibe docs + the "Vibe Trading" Notion; and **`0xneelo/vibe_docs` (~400 pages — give this the most coverage; the compendium is largely a restructuring of it)**.
- **2 → cross-industry gold standard** (Stripe, Twilio) + a **synthesis / gap-analysis** agent → `GAPS.md`.

## Outputs (the dossier — the gate to Session 2)
- `STYLEGUIDE.md` (voice, components, terminology lock) · the **IA** (validated/expanded from `05`) · `GAPS.md` · the **Discord Q&A dataset** · the **page manifest** (500-800 pages, each with a one-line brief + sources) · `SOURCES.md`.
- Confirm the 3 Phase-0 decisions with the operator (platform, repo, transparency — see `08`). Then proceed to Session 2.
