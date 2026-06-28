---
id: "authored-safety-premium-backstop-quotes"
title: "Safety Premium Backstop Quotes"
section: "manifesto"
track: "14 - Information and Trade Convergence"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/14-information-trade-convergence/14-docs/06-hybrid-solver-model"]
relatedGeneratedPages: ["neelo-14-information-trade-convergence-14-docs-06-hybrid-solver-model", "section-14-information-trade-convergence-14-docs-06-hybrid-solver-model-6-1-protocol-owned-solver-pos", "section-14-information-trade-convergence-14-docs-06-hybrid-solver-model-6-2-the-liquidity-waterfall"]
---

# Safety Premium Backstop Quotes

The protocol-owned solver is useful because it can make a market possible when external solvers decline. But the source does not frame that fallback quote as free tight liquidity. It frames it as a wider, risk-priced quote.

That safety premium is the honest cost of cold-start market access. When a market is niche, volatile, or hard to hedge, the backstop is doing work that a mature order book or deep solver network would normally do. A wider quote is not only revenue. It is compensation for adverse selection, inventory risk, hedging uncertainty, and the possibility that the trade reached the backstop because nobody else wanted it.

This page should keep the distinction clear. A backstop quote can preserve access, but it should not be described as a guaranteed best price. The whole point of the waterfall is that external solvers can improve execution when they want the trade, while the safety tier prices the residual risk of availability.

Exact spread formulas, quote floors, solver profitability, and user-facing pricing promises remain implementation-sensitive. The publishable concept is the safety premium: fallback liquidity should reflect fallback risk.

## Reader Implication

If an early-market quote is wider, that can be a market-structure signal rather than a UI defect. The system is pricing the fact that the trade needed a backstop.

## Sources

- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.1 Protocol-Owned Solver (POS)".
- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.2 The Liquidity Waterfall".

## Related Pages

- `authored-protocol-owned-solver-public-option`
- `authored-hybrid-solver-liquidity-waterfall`
- `authored-solver-sustainability-condition`
