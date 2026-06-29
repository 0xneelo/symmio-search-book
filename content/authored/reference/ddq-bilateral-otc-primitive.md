---
id: "authored-ddq-bilateral-otc-primitive"
title: "DDQ Bilateral OTC Derivatives Primitive"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers", "symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "symmio-core-concepts", "symmio-intent-lifecycle", "authored-bilateral-intent-lifecycle"]
---

# DDQ Bilateral OTC Derivatives Primitive

The DDQ introduction names bilateral OTC derivatives primitives as part of the Vibe stack. That phrase is important because it explains how a long-tail market can begin before it has a deep public order book.

In a bilateral model, a trader expresses a desired derivative exposure and a counterparty evaluates whether to accept the other side. The first trade does not require a full pool or synchronous matching venue. It requires a priced relationship between PartyA and PartyB under enforceable settlement rules.

## Why Bilateral Matters For Long-Tail Markets

Long-tail assets often do not have enough immediate flow for an order book to be useful. A bilateral OTC primitive lowers the minimum viable market: one trader can request exposure, and one solver can decide whether the terms are acceptable.

This does not remove risk. It names the counterparty path. If the solver accepts, it becomes responsible for the other side of the position subject to collateral, lifecycle, and risk rules. If the solver cannot price or hedge the request, it can refuse or widen terms before the market pretends there is deeper liquidity than actually exists.

## How It Fits With Symmio Language

Symmio's core vocabulary helps make the DDQ primitive precise. PartyA is the requester or trader side. PartyB is the counterparty or solver side. The protocol can track collateral, margin, CVA, quote lifecycle, close requests, force-close paths, and liquidation state without needing a central order book to match every trade synchronously.

That is why the docs should teach "bilateral" as a protocol property, not as a private-dealing metaphor. The trade is still rule-bound; it is just not born from a public book's crossing event.

## Publication Boundary

Do not publish final PartyA/PartyB permissions, OTC eligibility rules, whitelisting rules, quote lifecycle timing, or enforceability claims beyond the confirmed protocol documentation. The source-backed claim is that bilateral OTC primitives let Vibe model long-tail derivatives as accepted counterparty relationships.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".
- `symmio-core`: PartyA/PartyB and bilateral settlement vocabulary.
- `symmio-intent-lifecycle`: intent submission, solver monitoring, locking, and lifecycle events.

## Related Pages

- `authored-bilateral-intent-lifecycle`
- `authored-symmio-party-a-party-b`
- `authored-intent-otc-long-tail-verification`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`
