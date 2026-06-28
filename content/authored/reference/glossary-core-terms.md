---
id: "authored-glossary-core-terms"
title: "Core Glossary"
section: "reference"
track: "Glossary"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["symmio-core", "vibe-architecture", "vibe-points", "spec-03", "styleguide"]
sourceUrls: ["https://docs.symm.io/getting-started/core-concepts.md", "https://docs.vibe.trading/architectural-overview.md", "https://docs.vibe.trading/trading/vibe-points.md", "_specs/app-docs/03-grounding.md", "src/search-book/STYLEGUIDE.md"]
relatedGeneratedPages: ["symmio-glossary", "symmio-core-concepts", "vibe-architecture-amfq"]
---

# Core Glossary

This glossary is a terminology lock for the first publication pass. It should be reviewed by the operator before final docs ship.

| Term | Working Definition |
| --- | --- |
| Intent | A user's expressed desired trade or action before a final counterparty has accepted it. |
| Solver | A professional counterparty or routing actor that prices, accepts, hedges, monitors, and settles intent flow. |
| PartyA | Symmio's trader/requester side. |
| PartyB | Symmio's solver/counterparty side. |
| VibeCaps | Vibe's lowcap perpetuals surface; use with margin and isolated-market context. |
| Network volume | Descendant wallet trading volume used by the onboarding dashboard; exact depth remains open until resolved. |
| Estimated revenue | Dashboard estimate from network volume, configurable fee inputs, and referrer share; not final realized protocol accounting. |
| Onboarding points | Campaign/accounting points in this onboarding app. |
| Vibe points | Public Vibe trading-program points; keep separate from onboarding points. |
| Referral depth | Number of referral levels included in a calculation; currently an unresolved public-docs decision. |

## Reader Implication

Most confusion comes from overloaded words. The docs should define the rail before explaining the number: trading point or onboarding point, solver or PartyB, estimate or realized accounting, current source or planned source.

## Sources

- `symmio-core`: Symmio protocol vocabulary.
- `vibe-architecture`: Vibe intent/solver architecture.
- `vibe-points`: Vibe points categories.
- `spec-03`: Product grounding and terminology constraints.
- `styleguide`: Local terminology lock.

## Related Pages

- `authored-symmio-party-a-party-b`
- `authored-points-and-vibe-points`
- `authored-referral-depth-open-question`
