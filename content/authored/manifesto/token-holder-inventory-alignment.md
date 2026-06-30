---
id: "authored-token-holder-inventory-alignment"
title: "Token Holders Are Natural Inventory Providers"
section: "manifesto"
track: "13 — Proof of Value Framework"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition", "https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/06-comparative-advantage"]
relatedGeneratedPages: ["neelo-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition", "neelo-13-framework-value-permissionless-perps-13-docs-06-comparative-advantage", "authored-token-vault-perps-versus-usdc-pools"]
---

# Token Holders Are Natural Inventory Providers

The Proof of Value framework separates two jobs that are often collapsed: stable settlement liquidity and token inventory.

The source argues that Vibe should not ask generic external USDC LPs to back every long-tail market. Stablecoin LPs are being asked to underwrite low-cap token risk they may not understand, do not already hold, and would price very expensively. That can force a bad loop: high perceived risk, high yield demand, higher fees, lower trader activity, and weaker market sustainability.

Token holders are different. A project treasury, founder, whale, or committed holder already has directional exposure to the asset. If that holder contributes a bounded portion of inventory to help a perp market exist, the incremental risk is closer to risk they already accepted. The deposit can add utility, signal support, and potentially earn yield from real market activity.

## The Architecture Claim

The architecture claim is not that token inventory is risk-free. It is that token inventory and USDC settlement should not be confused.

Token-side inventory can help a solver manage residual exposure in the market being created. Stable settlement and trader margin remain separate. That separation lets the system use market-specific capital without turning the trader's settlement unit into the same volatile asset that is being traded.

This is why the source frames token inventory as capital efficiency. The system is not trying to make every early market look like a mature USDC vault. It is matching the capital source to the risk it is best positioned to bear.

## Publication Boundary

The source includes example revenue-share and capital-efficiency claims. Those examples should stay under operator review until current public economics, vault terms, and disclosure boundaries are confirmed.

## Sources

- `vibe-papers`: Neelo, "Section 3: LP Value Proposition".
- `vibe-papers`: Neelo, "Section 6: Comparative Advantage".

## Related Pages

- `authored-token-vault-perps-versus-usdc-pools`
- `authored-usdc-settlement-inventory-separation`
- `authored-lp-yield-capital-efficiency-pillar`
