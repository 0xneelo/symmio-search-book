---
id: "authored-why-bootstrap-trilemma-exists"
title: "Why The Bootstrap Trilemma Exists"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-6-why-the-trilemma-exists"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-6-why-the-trilemma-exists", "authored-bootstrap-trilemma-formal-constraint", "authored-proof-value-four-constituencies"]
---

# Why The Bootstrap Trilemma Exists

The trilemma is not just a protocol-design inconvenience. Neelo traces it to market economics.

First, new markets are adverse-selection environments. The first traders may know more about the asset than outside counterparties. If everyone can see that the early flow is informed or one-sided, an uninformed counterparty will not volunteer to lose. Someone can still take the risk, but they must be paid.

Second, risk cannot be removed by naming a different mechanism. Netted systems keep risk among traders when there is balance. Collateralized systems transfer residual risk to LPs or vaults. Solver systems transfer it to a capitalized pricing and risk layer. During bootstrap, there is not enough natural offset, so residual risk has to go somewhere.

Third, the cold-start loop is circular. Traders want liquidity. Liquidity needs capital. Capital wants returns. Returns need volume. Volume needs traders. A static system breaks the circle either by assuming an existing trader base or by injecting capital. The former weakens permissionless bootstrap; the latter weakens capital efficiency.

This root-cause page is useful because it keeps the docs honest. Vibe is not trying to make the trilemma disappear. It is trying to price and stage the risk transfer until the market earns a more efficient form.

## Sources

- `vibe-papers`: Neelo, "Section 4: The Bootstrap Trilemma: 4.6 Why the Trilemma Exists".

## Related Pages

- `authored-bootstrap-trilemma-formal-constraint`
- `authored-proof-value-four-constituencies`
- `authored-solver-as-initial-network-effect`
