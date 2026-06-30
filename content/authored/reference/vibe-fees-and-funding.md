---
id: "authored-vibe-fees-and-funding"
title: "Vibe Fees And Funding"
section: "product-reference"
track: "Fees"
status: "published"
sourceKeys: ["vibe-fees", "vibe-funding"]
sourceUrls: ["https://docs.vibe.trading/trading/fees.md", "https://docs.vibe.trading/trading/funding.md"]
relatedGeneratedPages: ["vibe-fees", "vibe-funding", "symmio-funding-rates", "symmio-trading-fees"]
---

# Vibe Fees And Funding

Vibe trading costs have two distinct layers: explicit fees around opening or closing trades, and funding payments that affect the cost of holding a perpetual position over time.

The current official fee guide is useful for categories but not final numeric publication. It states that platform fees apply on opening and closing trades, that hedger or solver fees vary by token pair, and that the trade panel shows a cost breakdown before confirmation. It also contains placeholder percentage values, so final docs must not invent fee numbers from that page.

## Fee Categories

The fee page separates majors trading from lowcaps trading. In both cases it describes a Vibe platform fee on open and close. For majors, it says hedger or solver fees vary by token pair and are typically competitive with centralized-exchange structures. For lowcaps, it describes a solver fee on each lowcap trade but leaves the exact percentage as a placeholder.

For publication, the safe answer is: check the trade-panel breakdown before confirming, and verify the current public fee schedule before publishing exact percentages.

## Funding

The funding guide explains why perpetuals have recurring payments. When perpetual prices are above spot, long traders pay short-side solvers. When perpetual prices are below spot, short-side solvers pay long traders. The point is to keep the perpetual price aligned with the underlying spot market.

Funding affects holding cost and profitability, so it belongs in strategy and risk pages, not only in an advanced glossary.

## Minimum Payment Threshold

The funding page says Vibe relies on solver quotes and real-time trader/solver interaction for funding-rate inputs. It also states that if the amount owed is lower than blockchain gas cost, the funding payment is not processed because each update requires an on-chain interaction.

## Reader Implication

When answering "what will this trade cost?", show both layers: fees around the trade and funding over time. Exact percentages require current product confirmation; funding direction depends on market conditions and position side.

## Publication Boundary

Do not publish exact fee percentages, solver/hedger charges, funding amounts, minimum-payment thresholds, or trade-cost totals as universal values without current product confirmation. The source-backed public answer is categorical: the trade panel is the authoritative pre-confirmation cost breakdown, and funding depends on market conditions and position side.

## Sources

- `vibe-fees`: official fee categories and trade-panel cost-breakdown caveat.
- `vibe-funding`: official funding-rate direction, solver-pricing, and minimum-payment threshold.

## Related Pages

- `authored-vibe-simple-trade-flow`
- `authored-vibe-order-types`
- `authored-vibe-oi-and-liquidity`
- `symmio-funding-rates`
