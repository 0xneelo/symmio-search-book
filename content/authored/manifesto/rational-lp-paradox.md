---
id: "authored-rational-lp-paradox"
title: "The Rational LP Paradox"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/04-lp-economics-and-leverage"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage", "authored-token-denominated-fee-illusion", "authored-token-margined-lp-lose-lose"]
---

# The Rational LP Paradox

Neelo's Section 4 source turns token-margined LPing into a decision tree. If the holder is bullish, the simple position is to hold the token. LPing can cap that upside because winning longs are paid in tokens from the LP side. If the holder is bearish, depositing the token as collateral is unattractive because the collateral unit is expected to weaken. If the holder is neutral, the rational alternative may be to convert to stables instead of taking token-denominated vault risk.

That creates the rational LP paradox: the ordinary directional views do not naturally produce a scalable passive LP base.

## Who Might Still LP?

The source names two edge cases. A holder may use LPing as a slow distribution path, effectively selling into demand over time. A project treasury may also post inventory for strategic market-formation reasons.

Those cases matter, but they are not the same as generic public liquidity. They are inventory-management or treasury-strategy cases. They can support a specific market under a specific motive, but they do not prove that token-margined perps have a broad, self-sustaining LP supply.

## Reader Implication

When a reader asks "who supplies liquidity here?", the docs should not stop at "token holders." The better question is why that token holder would choose LPing over holding, selling, or converting. Vibe's broader architecture should make the capital provider's motive explicit.

## Sources

- `vibe-papers`: Neelo, "Section 4: LP Economics and the 1x Leverage Constraint", "4.3 The Rational LP Paradox".

## Related Pages

- `authored-token-holder-inventory-alignment`
- `authored-proof-value-liquidity-role-separation`
- `authored-token-denominated-fee-illusion`
