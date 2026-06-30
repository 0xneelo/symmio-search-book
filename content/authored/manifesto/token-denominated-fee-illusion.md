---
id: "authored-token-denominated-fee-illusion"
title: "The Token-Denominated Fee Illusion"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/04-lp-economics-and-leverage"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage", "section-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage-4-2-the-fee-illusion", "authored-token-margined-lp-lose-lose"]
---

# The Token-Denominated Fee Illusion

Neelo's Percolator LP-economics source rejects the simple answer that trading fees and funding compensate token-margined LPs. The problem is the unit of account. In the source model, fees, funding income, collateral, realized profits, and realized losses are all denominated in the volatile token.

That makes "yield" hard to interpret. If the token appreciates, the LP may have been better off holding the token rather than posting it into a vault that pays winning longs in token terms. If the token depreciates, the LP's fee and funding income lose value alongside the collateral base.

## The Contradictory Belief Set

The source's sharper point is that the LP needs two beliefs that conflict:

- the token should stay stable enough that LPing earns usable token-denominated income;
- the token should appreciate enough that holding the token remains attractive.

For assets with meaningful expected return or meaningful downside risk, those are not the same bet. The LP is not simply earning fees. The LP is changing the payoff shape of an existing token position.

## Reader Implication

Docs should not call token-denominated fees "yield" without naming the currency risk of the yield. The answer engine should route fee-compensation questions to this unit-of-account problem before discussing APR or funding.

## Sources

- `vibe-papers`: Neelo, "Section 4: LP Economics and the 1x Leverage Constraint", "4.2 The Fee Illusion".

## Related Pages

- `authored-token-margined-lp-lose-lose`
- `authored-one-x-leverage-ceiling`
- `authored-usdc-opportunity-cost-floor`
