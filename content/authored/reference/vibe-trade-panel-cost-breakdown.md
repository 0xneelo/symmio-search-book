---
id: "authored-vibe-trade-panel-cost-breakdown"
title: "Vibe Trade Panel Cost Breakdown"
section: "product-reference"
track: "Fees"
status: "publication-candidate-needs-publication-date-review"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-fees", "vibe-simple-trade", "vibe-funding"]
sourceUrls: ["https://docs.vibe.trading/trading/fees.md", "https://docs.vibe.trading/getting-started/placing-a-simple-trade.md", "https://docs.vibe.trading/trading/funding.md"]
relatedGeneratedPages: ["vibe-fees", "vibe-simple-trade", "vibe-funding", "authored-vibe-fees-and-funding"]
---

# Vibe Trade Panel Cost Breakdown

The practical answer to "what will this trade cost?" starts in the trade panel, not in a static fee table.

The official fee guide says platform fees apply when opening and closing trades. It also says hedger or solver fees can vary by token pair and that the trade panel shows a cost breakdown before confirmation. That makes the trade panel the current source for the user's pre-click cost view.

## What To Check Before Confirming

The user should separate four ideas:

- platform fees on entry and exit;
- solver or hedger fees that can vary by market;
- funding effects that accrue while a perpetual position remains open;
- any future or placeholder fee numbers that require publication-date review before being presented as live values.

The current fee source is category-useful but not sufficient for final exact percentages because it contains placeholder values. The docs should route users to the live ticket breakdown for current trade-specific costs and keep final public percentage claims under review.

## Sources

- `vibe-fees`: official fee categories, open/close platform-fee framing, variable solver or hedger fee caveat, and trade-panel cost-breakdown instruction.
- `vibe-simple-trade`: official trade-ticket flow.
- `vibe-funding`: official funding-cost context for open perpetual positions.

## Related Pages

- `authored-vibe-fees-and-funding`
- `authored-vibe-simple-trade-flow`
- `authored-vibe-funding-payment-direction`
