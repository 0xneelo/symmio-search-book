# Gaps And Contradictions

## G-001: Discord Source Mining Is Blocked

The prompt asks to mine Discord, especially Lafa answers and repeated support questions. This environment does not have Discord export access. The prototype seeds a question list from local FAQ and source docs only.

**Needed:** Discord export, channel list, date range, and permission to cite or paraphrase.

## G-002: 25-Agent Competitive Sweep Is Not Complete

The prompt requests a 25-sub-agent competitive sweep. This package contains the local/source-led first dossier and a prototype, not the full competitive sweep.

**Needed:** Dedicated sub-agent runbook, target list, and final synthesis.

## G-002A: 500-800 Page Manifest Is Mapped, Not Authored

The manifest now maps 794 pages, mostly from Neelo's vision corpus plus protocol/product companions. These are planned compendium pages, not fully written pages.

**Needed:** Session 2 authoring pipeline, page templates, source blocks, answer-engine ingestion, and progressive publication plan.

## G-003: Referral Depth Is Contradictory

Evidence found:

- `server/points.js` has a default referral depth of 5 and supports config values up to 15.
- `server/routes/me.js` uses configured depth for network and volume aggregation.
- `src/dashboard/volume.jsx` still carries 5-level language.
- `src/dashboard/faq.jsx` says referral points and rewards count across 15 levels.
- Linear rollout notes describe a 15-level schedule and backfill.

**Needed:** Product decision on what a public user sees today, what the system currently runs in production, and how historical points are treated.

## G-004: Revenue Phase A Versus Phase B Needs Public Wording

Phase A is implemented as estimated revenue from network volume, configurable platform fee, and referrer share. Phase B issues describe per-venue platform revenue, VibeCaps LP profit share, liquidation display, funding, solver data, and points farmed.

**Needed:** Decide which Phase B items are public roadmap, internal roadmap, or already live but not surfaced.

## G-005: Subgraph Migration Is Not Implemented In This Repo

Linear research says Goldsky subgraphs should become the more accurate network-volume source than the current Vibe backend wallet-volume endpoint. Current local code still uses the backend REST source and daily snapshots.

**Needed:** Implementation status, exact public query docs, and whether docs should describe the future subgraph source or the current production source.

## G-006: Exact Vibe Market Counts Need Fresh Verification Before Publication

Vibe docs claim Binance perp market coverage and 390+ markets. Since market counts change, exact counts should be verified on the intended publication date.

**Needed:** Current Vibe product source or live market index snapshot.

## G-007: Symmio Whitepaper History Is Not Fully Mined

The public GitBook page points to the whitepaper and protocol docs, but a full oldest-to-current whitepaper comparison was not completed in this pass.

**Needed:** Whitepaper PDF, version history, GitHub commits, and any archived docs.

## G-008: Options And Vault-Backed Inventory Need More Primary Sources

The prompt frames Vibe x Symmio around options intents, vault-backed inventory, PartyA buyers, solvers, and Symmio settlement. Current Symmio docs include options contract documentation links, but this pass did not deeply mine each options page.

**Needed:** Symmio options pages, contract docs, product owner confirmation, and example lifecycle.

## G-009: Public Versus Internal Terminology Needs Owner Review

Terms like VibeCaps, network revenue, referral commission, Vibe points, trading points, onboarding points, PartyA, PartyB, solver, and MM are all used across sources. Some are protocol terms, some product terms, and some campaign terms.

**Needed:** Canonical glossary approval.

## G-010: Production Answer Engine Needs A Build/Buy Decision

The prototype proves the interaction pattern only. Production still needs retrieval strategy, source chunking, answer citations, rate limits, abuse controls, analytics retention, and gap triage workflow.

**Needed:** Platform decision and implementation plan.

## G-011: Vibe Trading Notion Is Not Ingested

The source spec names the Vibe Trading Notion workspace as a required working source. This repository has public Vibe docs, Neelo's GitHub corpus, local code, and Linear-derived facts, but no Notion export or readable local copy.

**Needed:** Notion export or shared read access, plus publication rules for quoting, paraphrasing, or internal-only synthesis.
