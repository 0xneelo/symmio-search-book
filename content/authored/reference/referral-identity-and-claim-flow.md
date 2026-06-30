---
id: "authored-referral-identity-and-claim-flow"
title: "Referral Identity And Claim Flow"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "neelo-17-referral-program-17-docs-02-architecture", "section-17-referral-program-17-docs-02-architecture-2-2-canonical-flow"]
---

# Referral Identity And Claim Flow

Neelo's referral-program architecture starts by separating identity, attribution, policy, and settlement. A referral NFT or equivalent identity anchor can carry the user's referral identity, but reward-eligible code activation is a separate state governed by policy.

That separation matters because a referral system has to answer more than "who invited whom?" It has to decide when a user becomes eligible to issue codes, how activity is attributed, which tiers apply, who signs claim authorizations, and how claims are consumed without replay or double-credit paths.

## The Stack

The source splits the referral stack across three planes:

- on-chain identity and settlement;
- off-chain attribution and policy logic;
- user-facing access and claims UX.

The canonical flow is: onboard, receive base identity, trade or refer, compute rolling activity windows, activate referral code eligibility through policy thresholds or approved exceptions, issue replay-safe claim authorizations, and settle claims through a contract path.

## Trust Boundary

The key design rule is that fast-changing policy can stay off-chain only if it is versioned and auditable. Claim consumption, nonces, and settlement integrity should be deterministic. Monitoring state should be separate from both, so anomaly detection does not silently mutate economic history.

## Reader Implication

Do not describe referral identity as only a marketing code. In the compendium it is an attribution and settlement primitive. The public referral-depth stance is resolved at 15 levels with additive historical backfill, while identity, activation, and claim-flow implementation details still need their own policy and security boundaries.

## Publication Boundary

This page explains the source-backed identity and claim-flow model. It should not publish final referral NFT metadata, code-activation thresholds, signer topology, claim authorization format, settlement contract path, rollout timing, exception policy, or transferability rules until operator, implementation, security, legal, and accounting review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline".
- `vibe-papers`: Neelo, "Section 2: Architecture".
- `spec-03`: Referral-depth and points-publication caveats.

## Related Pages

- `authored-referral-architecture-as-market-formation`
- `authored-referral-depth-open-question`
- `neelo-17-referral-program-17-docs-02-architecture`
