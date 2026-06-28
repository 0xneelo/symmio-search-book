---
id: "authored-ddq-local-insurance-tail-buffer"
title: "DDQ Local Insurance Tail Buffer"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/i-bearer-of-losses", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/ii-balancing-ux-vs-risk"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-i-bearer-of-losses", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-ii-balancing-ux-vs-risk", "authored-funding-local-insurance-fund", "authored-loss-waterfall-and-profit-caps"]
---

# DDQ Local Insurance Tail Buffer

The DDQ places local insurance after trader margin and solver hedging resources, but before global insurance. That position is the key idea.

Local insurance is market-specific protection. The source describes it as a fund primarily formed from liquidation flows in the same market. In a severe dislocation, if losing-side trader balances and solver hedging resources are depleted, the local insurance fund can absorb losses before the market asks for any shared global protection.

## Why Local Comes Before Global

Local insurance keeps responsibility near the market that generated the risk. A permissionless market should build its own buffer from its own trading, liquidation, and risk activity before drawing on shared system reserves.

That ordering also reduces contagion. If a low-quality or manipulated market reaches a tail event, local insurance limits the first explicit insurance spend to that market. Global insurance can remain conditional and capped rather than acting as an automatic subsidy.

## How To Explain It To Readers

For traders, local insurance is not a guarantee that every profitable position will be paid in full under every gap event. It is a tail buffer in a waterfall whose earlier layers are trader margin and solver resources.

For LPs and project teams, it is evidence that the market is developing its own risk budget. A healthier local fund can support better terms over time, while a new or suspicious market may remain tighter because it has not built enough local protection.

## Publication Boundary

Do not publish live local-insurance inflows, liquidation routing percentages, spend caps, withdrawal effects, governance controls, or per-market fund balances without implementation and operator review. The source-backed claim is that local insurance is market-specific and comes before global insurance in the DDQ waterfall.

## Sources

- `vibe-papers`: Neelo DDQ, "Bearer of Losses".
- `vibe-papers`: Neelo DDQ, "Balancing UX vs Risk".

## Related Pages

- `authored-funding-local-insurance-fund`
- `authored-conditional-global-insurance-allocation`
- `authored-loss-waterfall-and-profit-caps`
