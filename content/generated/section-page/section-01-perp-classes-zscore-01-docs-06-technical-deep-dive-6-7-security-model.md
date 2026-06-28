---
id: "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-7-security-model"
title: "Section 6: Technical Deep Dive: 6.7 Security Model"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-7-security-model"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/06-Technical-Deep-Dive.md"
headingId: "6-7-security-model"
---

# Section 6: Technical Deep Dive: 6.7 Security Model

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-7-security-model

## Extracted Section Draft

## 6.7 Security Model

### 6.7.1 Trust Assumptions

**Trustless (on-chain)**:
- Position ownership
- Collateral custody
- Settlement finality
- Insurance fund access

**Trust in Solver (off-chain)**:
- Quote fairness (bounded by oracle)
- Execution quality
- Risk parameter setting
- Graduation decisions

### 6.7.2 Solver Constraints

Solver power is bounded:
```
Solver CAN:
- Set spreads (within bounds)
- Adjust risk parameters (within bounds)
- Execute trades at oracle-derived prices
- Trigger liquidations (verifiable on-chain)

Solver CANNOT:
- Steal user funds
- Execute at arbitrary prices
- Prevent withdrawals
- Modify past settlements
```

### 6.7.3 Security Mechanisms

| Risk | Mitigation |
|------|------------|
| Oracle manipulation | Multi-source aggregation, circuit breakers |
| Solver misconduct | On-chain verification, bounded parameters |
| Smart contract bugs | Audits, formal verification, gradual rollout |
| Economic attacks | Position limits, OI caps, insurance fund |

> **TO:DO**: Add detailed threat model and specific security audit requirements.

---
