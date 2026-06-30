---
id: "authored-ddq-one-to-one-backing-limit"
title: "DDQ One-To-One Backing Limit"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "authored-ddq-architecture-stack", "authored-slab-isolation-capital-inefficiency"]
---

# DDQ One-To-One Backing Limit

The DDQ introduction criticizes earlier on-chain permissionless margin designs for requiring near one-to-one backing at execution time. The problem is not that collateral is bad. The problem is that full backing can turn leverage into a capital-heavy product that loses the economic advantage users expect from derivatives.

When every dollar of leveraged exposure requires nearly a dollar of immediately parked backing, market depth becomes expensive. The venue has to pay LPs enough to hold capital idle, spreads widen, and small markets struggle to support meaningful size.

## Why It Matters For Permissionless Perps

Long-tail markets need bootstrapping. At launch, they do not have deep natural two-sided flow. A simple fully backed vault can make the system legible, but it scales the capital requirement linearly with open interest and market count.

That creates a trap: the design can be safe only by becoming too expensive for the very markets it wants to unlock. If the protocol wants many permissionless markets, it needs a way to distinguish collateral discipline from permanent full collateralization.

## Reader Implication

For partners and LPs, this page answers why Vibe cannot simply copy a generic margin-vault model. The DDQ points toward a hybrid structure where margin, perpetual lifecycle, solver risk checks, token inventory, netting, and market controls all reduce the need for static one-to-one backing.

For traders, the practical effect is cost. A capital-heavy design usually appears as lower capacity, wider spread, or higher fees. A more efficient design should still preserve solvency controls, but it should not require every early market to rent generic stablecoin capital at punitive rates.

## Publication Boundary

Do not publish final collateral ratios, leverage limits, vault utilization targets, capital-efficiency claims, or comparative cost estimates without operator, risk, and implementation review. The source-backed claim is directional: near one-to-one backing can constrain depth, widen spreads, and limit permissionless leverage scalability.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".

## Related Pages

- `authored-ddq-architecture-stack`
- `authored-slab-isolation-capital-inefficiency`
- `authored-one-x-leverage-ceiling`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`
