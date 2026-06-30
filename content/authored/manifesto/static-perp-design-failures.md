---
id: "authored-static-perp-design-failures"
title: "Why Static Perp Designs Fail At Bootstrap"
section: "manifesto"
track: "01 — Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-03-landscape", "neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma", "section-01-perp-classes-zscore-01-docs-03-landscape-3-7-the-gap-in-the-market"]
---

# Why Static Perp Designs Fail At Bootstrap

The perp landscape section is useful because it shows that each static architecture fails for a different reason at market birth.

Order books are efficient once both sides exist, but they cannot create the missing side. A new market can have traders who want to long or short, but without resting liquidity, market makers, and enough two-sided flow, the book does not produce execution.

Vault protocols solve the availability problem by letting traders execute against a collateral pool. That works for one-sided flow, but it moves the risk and capital burden to LPs. Fees, spreads, leverage limits, and open-interest caps reflect that burden.

Asynchronous netted systems appear attractive because they promise permissionless listing and capital efficiency at the same time. The source's critique is direct: if a trader wins and there is no opposing side, there is no defined payer. Funding incentives cannot force a rational counterparty to appear during an adverse bootstrap regime.

## Reader Implication

Do not explain Vibe by saying "order books are bad" or "vaults are bad." The sharper point is stage fit. Static designs optimize for one market state. Vibe's thesis is that a protocol has to change shape as the market moves from empty to balanced.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Landscape of Existing Protocols".
- `vibe-papers`: Neelo, "Section 4: The Bootstrap Trilemma".

## Related Pages

- `authored-perp-protocol-framework`
- `authored-bootstrap-trilemma`
- `neelo-01-perp-classes-zscore-01-docs-03-landscape`
