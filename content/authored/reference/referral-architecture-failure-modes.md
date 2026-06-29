---
id: "authored-referral-architecture-failure-modes"
title: "Referral Architecture Failure Modes"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture#2-5-failure-modes-to-design-against", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-02-architecture", "section-17-referral-program-17-docs-02-architecture-2-5-failure-modes-to-design-against", "authored-referral-three-plane-architecture", "authored-referral-settlement-security-controls"]
---

# Referral Architecture Failure Modes

Neelo's referral architecture names the failure modes the system has to design against before referral economics become public, value-bearing, or transferable.

The list is concrete: signer key compromise, stale or inconsistent index data, referral graph mutation without audit trails, and claim replay or double-credit paths. Those are not edge cases around a marketing campaign. They are the basic ways an attribution and rewards system can lose economic credibility.

## Why These Failures Are Architectural

Signer compromise turns an authorization path into an over-issuance path. Stale index data turns a dashboard or claim calculation into a disputed source of truth. Referral graph mutation without audit trails lets policy changes rewrite history. Claim replay and double-credit paths let a valid reward event become more than one payout.

The three-plane architecture exists to narrow those failures. Deterministic settlement state should own nonces, claim consumption, and identity anchors. Policy state should own tier tables, eligibility rules, and private overlays. Monitoring state should detect anomalies and reconciliation breaks without silently changing either settlement or policy history.

## Reader Implication

When the docs explain referral safety, they should name these failure modes directly. A credible referral program is not only generous; it is auditable under compromised signers, delayed data, disputed graph changes, and repeated claim attempts.

## Publication Boundary

This page explains the source-level threat model. It should not publish final signer topology, indexer SLAs, graph-edit permissions, admin override rules, nonce schemas, dispute windows, or incident thresholds until implementation, security, legal, accounting, and operator review approve them.

## Sources

- `vibe-papers`: Neelo, "Section 2: Architecture", "Failure Modes to Design Against".
- `spec-03`: referral-depth and public economics caveats.

## Related Pages

- `authored-referral-three-plane-architecture`
- `authored-referral-settlement-security-controls`
- `authored-referral-replay-safe-claim-authorizations`
