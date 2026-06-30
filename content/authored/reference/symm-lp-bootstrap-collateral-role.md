---
id: "authored-symm-lp-bootstrap-collateral-role"
title: "SYMM LP Bootstrap Collateral Role"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/02-case-context-and-setup#2-5-mechanism-design-framing"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-02-case-context-and-setup-2-5-mechanism-design-framing", "authored-symm-lp-case-setup"]
---

# SYMM LP Bootstrap Collateral Role

The SYMM LP case frames the LP as bootstrap collateral. In the early phase, LP capital helps initialize the perp market. As the market matures and two-sided trader flow improves, trader-to-trader netting can absorb more of the flow. The LP can still participate in revenue flows even when the intensity of collateral usage declines.

That mechanism is central to the Vibe thesis. Long-tail markets often cannot start with mature order-book depth. Someone must provide early risk capacity. The SYMM case studies one form of that capacity: token-aligned inventory placed into a structure that can let traders express directional views while the LP bears and prices residual risk.

## Phase Logic

The source-backed mechanism has two phases:

- **Early phase:** LP collateral is closer to market bootstrapping infrastructure. It helps a market exist before organic two-sided liquidity is reliable.
- **Mature phase:** as trader flow becomes more balanced, more positions can net against each other, reducing dependence on the LP as the immediate counterparty of last resort.

The LP does not disappear in the mature phase. The role changes from pure bootstrap capacity toward recurring capacity, risk absorption, and revenue participation, subject to market design and actual terms.

## Publication Boundary

This is a mechanism-design framing, not a live promise about collateral intensity, fee share, or future yield. Public docs need current product terms, vault constraints, and accounting review before turning this into user-facing LP instructions.

## Sources

- `vibe-papers`: Neelo, "Case Context and Setup", Section 2.5, "Mechanism Design Framing".

## Related Pages

- `authored-symm-lp-case-setup`
- `authored-symm-lp-replication-framework`
- `authored-yield-as-market-survival-constraint`
