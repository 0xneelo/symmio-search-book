---
id: "authored-ddq-source-table-of-contents"
title: "DDQ Source Table Of Contents"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/overview"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-overview", "authored-ddq-architecture-stack", "authored-ddq-execution-netting-risk-split", "authored-ddq-ongoing-position-lifecycle-risk", "authored-solver-worst-case-scenarios-source-map", "authored-ddq-bootstrapped-market-stage"]
---

# DDQ Source Table Of Contents

The DDQ overview is a source-navigation page. It does not introduce a new mechanic by itself; it tells reviewers how the due-diligence packet is organized and where each risk question should route.

The source bundle has five major lanes:

- the general introduction, which defines the architecture stack;
- the economic-outcomes walkthrough, which traces who bears risk at each trade state;
- the risk walkthrough and bearer-of-losses analysis, which separates trader, solver, LP, and insurance exposure;
- the solver-as-residual-counterparty and worst-case-scenarios material, which covers un-netted exposure, operational failure, hedging constraints, and default;
- the LP attractiveness notes, which frame bootstrapped, maturing, and mature market stages.

That structure matters because DDQ readers are usually not asking one generic question. They are trying to decide where a specific concern belongs: architecture, lifecycle, counterparty risk, tail loss, or LP participation.

## Recommended Reading Order

Start with the architecture stack if the reader asks what Vibe is built from. That page explains why margin trading, perpetuals, request-based settlement, bilateral OTC primitives, proprietary solver technology, and token vault inventory belong together.

Move to the economic-outcomes walkthrough when the reader asks who bears risk. The right answer changes by lifecycle step: order submission starts with trader margin, execution may split risk between netted trader flow and solver residual exposure, ongoing position life adds funding and hedge state, and closeout realizes PnL against the party or resource stack that carried the offsetting exposure.

Use the worst-case-scenarios map when the reader asks what happens if the solver fails, cannot hedge, or becomes undercollateralized. That topic should not be flattened into "the solver defaults." Operational downtime, hedging failure, and solvency default are different states with different controls.

Use the LP attractiveness pages when the reader asks why LPs or projects would provide inventory. Those pages explain market-stage transitions, token vault roles, and why early market capital is ignition capital rather than a generic passive pool.

## Publication Boundary

The DDQ source is a design and diligence packet. It should guide the public documentation, but it should not publish final production thresholds, leverage bands, Force Close timers, vault rights, compensation percentages, insurance allocations, solver flags, or market-graduation rules without operator, implementation, risk, legal, and accounting review.

This table of contents is therefore a routing layer. It helps Ask send readers to the right authored page while preserving review boundaries for live market promises.

## Sources

- `vibe-papers`: Neelo DDQ overview.

## Related Pages

- `authored-ddq-architecture-stack`
- `authored-ddq-execution-netting-risk-split`
- `authored-ddq-ongoing-position-lifecycle-risk`
- `authored-solver-worst-case-scenarios-source-map`
- `authored-ddq-bootstrapped-market-stage`
