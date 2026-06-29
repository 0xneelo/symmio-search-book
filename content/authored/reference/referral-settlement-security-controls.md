---
id: "authored-referral-settlement-security-controls"
title: "Referral Settlement Security Controls"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls#8-3-cooldown-and-verification", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-08-security-controls", "section-17-referral-program-17-docs-08-security-controls-8-1-critical-risk-surfaces", "section-17-referral-program-17-docs-08-security-controls-8-2-minimum-control-set", "section-17-referral-program-17-docs-08-security-controls-8-3-cooldown-and-verification", "section-17-referral-program-17-docs-08-security-controls-8-4-operational-readiness"]
---

# Referral Settlement Security Controls

The referral security source names the critical risk surfaces plainly: points-ledger tampering, signer compromise, claim replay, over-issuance, and operational blind spots during launch volatility.

That makes referral security a settlement problem, not only an anti-spam problem. If rewards can become claims, claims can become economic value, and economic value can move, the system needs controls before the growth loop expands.

## Minimum Control Set

The source's minimum control set includes:

- signer isolation with key rotation and approval controls;
- replay-safe claims using nonces and expiry;
- audit trails for tier changes and admin policy overrides;
- anomaly monitoring for reward spikes and attribution outliers.

The architecture source adds the same boundary in another form: deterministic state, policy state, and monitoring state should stay separate. Claim consumption and nonces should not be mutable growth-policy state. Monitoring should detect anomalies without silently rewriting economic history.

## Cooldown And Incident Scope

A cooldown window before transferability can reduce the blast radius of fraudulent reward injections. It is not a complete defense. The source frames it as a circuit breaker that only works when paired with active monitoring.

Launch readiness also needs incident runbooks, explicit freeze scopes, and fail-safe paths for payout and withdrawal anomalies. Without those, the team can know something is wrong but still lack a bounded response path.

## Reader Implication

The public docs should not describe referral settlement as "instant rewards" unless the exact settlement path supports that claim. The safer principle is the source's principle: incentive systems should fail closed on settlement. Growth speed can return after verification; credibility cannot be easily recovered after silent inflation.

## Sources

- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `vibe-papers`: Neelo, "Section 2: Architecture".
- `spec-03`: current points and referral-publication caveats.

## Related Pages

- `authored-referral-metrics-and-integrity`
- `authored-points-claim-bridge-and-vesting`
- `authored-referral-policy-governance`
