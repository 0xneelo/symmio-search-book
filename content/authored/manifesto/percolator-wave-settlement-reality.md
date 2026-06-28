---
id: "authored-percolator-wave-settlement-reality"
title: "The Percolator Wave Meets Settlement Reality"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/03-percolator-wave-perc-fund", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/09-vibe-vs-percolator"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-docs-03-percolator-wave-perc-fund", "neelo-07-token-margined-issues-perculator-07-docs-09-vibe-vs-percolator", "authored-percolator-engineering-vs-economics"]
---

# The Percolator Wave Meets Settlement Reality

The listing notes treat the Percolator wave as a serious attempt to reopen permissionless perp listing. The interesting part is not whether the contracts can create markets quickly. It is whether the markets have an economic path to pay winners when flow is one-sided.

Percolator-style systems can make entry asynchronous: a trader can open exposure before a deep book exists. But settlement still requires an economic counterparty. If many traders are long and there are no shorts, no deep LP layer, and no inventory path sized for the risk, then open interest can exist while payout reliability remains fragile.

That is the settlement reality. The UI may show a market. The contract may accept positions. The trader may think they bought exposure to the underlying. The economic object can still be a claim on future contra-flow or a thin internal balance sheet.

## Reader Implication

The docs should separate permissionless market creation from permissionless market solvency. Fast listing is valuable only if the design also explains who pays, what collateral backs the payout, how imbalance is priced, and what happens when the other side never arrives.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Percolator Wave, Perk.fund, and Settlement Reality".
- `vibe-papers`: Neelo, "Vibe vs Percolator".

## Related Pages

- `authored-percolator-engineering-vs-economics`
- `authored-token-margined-reflexivity-risk`
- `authored-usdc-settlement-inventory-separation`
