---
id: "section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-2-the-four-transitions"
title: "Section 5: Vibe Trading Architecture: 5.2 The Four Transitions"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-2-the-four-transitions"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-05-vibe-architecture"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/05-Vibe-Architecture.md"
headingId: "5-2-the-four-transitions"
---

# Section 5: Vibe Trading Architecture: 5.2 The Four Transitions

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-2-the-four-transitions

## Extracted Section Draft

## 5.2 The Four Transitions

### 5.2.1 Transition 1: Collateralization Spectrum

**At Bootstrap (Fully Collateralized)**:
- Solver provides collateral for all positions
- Maximum payouts fully backed by LP vault
- Similar to GMX model

**During Growth (Hybrid)**:
- Some trader positions net against each other
- Solver covers remaining imbalance
- Collateral requirements decrease as netting increases

**At Maturity (Fully Netted)**:
- Traders primarily trade against each other
- Solver provides minimal backstop
- Near-zero collateral requirements for balanced flow

### 5.2.2 Transition 2: Matching Synchronicity

**At Bootstrap (Fully Asynchronous)**:
- Traders execute against solver at any time
- No requirement for counterparty presence
- Oracle-based pricing

**During Growth (Hybrid)**:
- Mix of solver execution and trader matching
- Some trades wait for natural counterparty
- Improved price discovery

**At Maturity (Fully Synchronous)**:
- Order book operation possible
- Real-time matching of traders
- Full price discovery

### 5.2.3 Transition 3: Counterparty Mix

**At Bootstrap (Solver-Operated)**:
- Solver (protocol-owned market maker) is primary counterparty
- Takes all directional risk
- Compensated through spreads and fees

**During Growth (Mixed)**:
- Solver handles overflow/imbalance
- Traders increasingly match with each other
- Solver exposure decreases

**At Maturity (Trader-to-Trader)**:
- Traders are primary counterparties
- Solver acts as market maker, not counterparty
- Traditional exchange dynamics

### 5.2.4 Transition 4: Insurance Topology

**At Bootstrap (Isolated)**:
- Each market has independent risk parameters
- No cross-subsidization
- New market failure doesn't affect others

**During Growth (Hybrid)**:
- Proven markets may share insurance benefits
- Risk parameters relax for mature markets
- Portfolio effects begin

**At Maturity (Cross-Integrated)**:
- Cross-margin available for mature markets
- Unified insurance fund participation
- Maximum capital efficiency

---
