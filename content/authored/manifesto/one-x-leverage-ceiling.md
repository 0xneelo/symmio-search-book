---
id: "authored-one-x-leverage-ceiling"
title: "The 1x Leverage Ceiling"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/04-lp-economics-and-leverage"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage", "section-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage-4-1-the-lp-lose-lose-quadrant", "section-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage-4-2-the-fee-illusion"]
---

# The 1x Leverage Ceiling

The Percolator LP-economics source argues that token-margined perps face a leverage ceiling that attacks the point of perpetuals.

The example is stark: if an LP has `1,000,000` tokens and traders open `10,000,000` tokens of long exposure, a relatively small price increase can make the LP owe its whole collateral in token terms. To survive that kind of move, the LP must keep collateral close to open interest.

## Why This Breaks Capital Efficiency

Perpetuals are useful because they let traders express leveraged exposure while the system manages margin, liquidation, and counterparty risk. If a token-margined LP must maintain roughly one-to-one collateral against open interest, the system has lost much of that capital-efficiency advantage.

The source's practical point is not that a single utilization ratio is universal. It is that same-asset collateral plus inverse payout risk force conservative utilization. Higher open interest may look like growth, but it can move the market closer to LP insolvency if the token pumps and longs win.

## Why Fees Do Not Solve It

Fees and funding do not remove the leverage ceiling if they are also token-denominated. The LP is still paid in the same volatile object that creates the liability. If the token appreciates, LPing can underperform holding. If the token depreciates, fee income falls with collateral value.

## Reader Implication

When a reader asks whether token-margined systems can scale long-tail leverage, the answer should focus on collateral-to-OI safety, not only headline listing count. A market that must stay near 1x collateralization is closer to spot with extra liquidation and oracle risk than to a robust leveraged venue.

## Sources

- `vibe-papers`: Neelo, "Section 4: LP Economics and the 1x Leverage Constraint".

## Related Pages

- `authored-token-margined-lp-lose-lose`
- `authored-risk-adjusted-capital-efficiency`
- `authored-slab-isolation-capital-inefficiency`
