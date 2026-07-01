---
id: "authored-competitive-docs-benchmark"
title: "What Vibe x Symmio Should Borrow From The Best Docs"
section: "competitive-context"
track: "Competitive Benchmark"
status: "published"
sourceKeys: ["competitive-sweep-batch-01", "spec-05", "spec-06", "spec-07"]
sourceUrls: ["data/competitive-sweep.json", "_specs/app-docs/05-architecture.md", "_specs/app-docs/06-answer-engine.md", "_specs/app-docs/07-research-session.md"]
relatedGeneratedPages: ["authored-volume-01-orientation-and-thesis", "authored-search-insights-loop", "authored-vibe-as-discovery-layer", "hyperliquid-hip3"]
---

# What Vibe x Symmio Should Borrow From The Best Docs

The competitive benchmark is useful only if it changes the shape of the compendium. The first official-docs batch reviewed 49 of 50 targeted docs across derivatives, DeFi, infrastructure, data tooling, wallet/account, and product surfaces. Opyn is the single excluded target because the operator marked it shut down; mirrors and third-party copies were not used.

The result is not "copy a docs platform." It is a sharper product requirement: Vibe x Symmio should behave like a source-cited answer engine wrapped around a serious derivatives reference.

## The Front Door Should Be A Job Router

The strongest docs did not make readers guess the taxonomy before getting help. They started with the reader's job, then revealed reference depth. For Vibe x Symmio, the front door should route five jobs without ceremony:

- sign or understand a PartyA intent;
- quote or operate as a solver/MM;
- deposit or manage vault-backed inventory;
- settle, monitor, or debug Symmio lifecycle states;
- fix a wallet, account, chain, quote, or dashboard state.

This matters because the product crosses several mental models at once. A project treasury, a solver, a vault LP, and an options buyer should not begin in the same generic tree. The tree can exist, but the first interaction should route the user to the exact page and the next action.

## AI-Readable Docs Are A Trust Surface

The benchmark repeatedly surfaced the same pattern: best-in-class docs now serve both humans and answer engines. The compendium should publish `llms.txt`, full markdown, raw page markdown, copy-page affordances, source/edit links, last-updated metadata, and exact citations.

That is not a novelty feature. Vibe x Symmio makes claims about intents, collateral, premiums, solvers, settlement, and dashboard economics. Those claims must be inspectable by a reader, by an internal support agent, and by an external AI assistant. If an answer cannot cite the exact page and source block, it should not pretend to be authoritative.

## Risk Needs Its Own Architecture

Derivative docs become weak when risk appears as a warning banner instead of an information architecture. The compendium should make risk navigable:

- margin, collateral, haircuts, and liquidation;
- funding, premiums, and fee assumptions;
- solver exposure, hedging, and quote expiry;
- vault exhaustion, stale oracle data, and indexer lag;
- settlement failure, rejected settlement, stuck settlement, and incident paths.

Each risk page should show who owns the risk, which state changes reveal it, which source proves it, and what the reader can do next. That is the difference between a product FAQ and infrastructure documentation.

## Data Lineage Is Part Of The Product

The data and devtool docs were clearest when they separated raw chain state, indexed data, oracle data, derived analytics, and operational dashboards. Vibe x Symmio needs the same discipline. A dashboard metric is not just a number; it has an owner, source, freshness window, fallback behavior, and failure mode.

For the compendium, that means every oracle, quote, vault metric, settlement state, revenue estimate, volume number, and derived analytic should state:

- source system;
- update cadence;
- finality or reorg assumption;
- stale-data behavior;
- user-facing implication;
- page or issue that tracks unresolved implementation work.

This is especially important for the current backend-vs-subgraph volume gap and for any future revenue or settlement dashboards.

## Living Docs Should Be Visible

Most docs hide their improvement loop. Vibe x Symmio should expose it. Page ratings, unanswered questions, gap queues, edit links, changelog entries, and source-ingestion state should be visible enough that users trust the system is maintained.

The existing Search insights prototype is the right direction. It should not become an internal-only admin panel. If a user asks a question the docs cannot answer, that fact should become a first-class gap with sources, owner, and status. That is how a living compendium remains credible at 500-800 pages.

## Borrow This, Avoid This

Borrow job-first routing, AI-readable source packages, page-level citations, source/edit links, role-specific journeys, risk taxonomies, data lineage tables, and visible feedback loops.

Avoid broad product sprawl, stale archived pages with unclear version boundaries, API-dense first contact, AI answers without citations, and docs that require the reader to already know whether they are in product, protocol, solver, or wallet-account territory.

## Implication For The Book

The compendium should not merely be bigger than a normal docs site. It should be more inspectable. The 500-800 page scale is justified only if each page participates in one of four jobs:

- explain the thesis;
- resolve an operational question;
- define a source-backed term or state;
- route an unanswered question into the improvement loop.

If a page does none of those things, it is filler. If it does one of them with exact citations and cross-links, it belongs.

## Publication Boundary

Treat this page as a design benchmark from a source-checked official-docs sweep, not as a live ranking of protocols or a claim that every borrowed pattern is already shipped. The source-backed claim is narrower: the Search Book should use job-first routing, source packages, citations, risk taxonomy, data lineage, and visible feedback loops because those patterns match the compendium's own IA and answer-engine requirements.

## Sources

- `competitive-sweep-batch-01`: generated official-docs benchmark over 50 targets, 25 lanes, five explorer batches, 49 verified official docs, and one documented Opyn exclusion.
- `spec-05`: answer-first IA and guided journey requirements.
- `spec-06`: answer engine, citations, rating, and living-docs loop requirements.
- `spec-07`: research-session competitive sweep requirement.

## Related Pages

- `authored-volume-01-orientation-and-thesis`
- `authored-search-insights-loop`
- `authored-vibe-as-discovery-layer`
- `hyperliquid-hip3`
