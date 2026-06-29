---
id: "authored-referral-fail-closed-incident-operations"
title: "Fail-Closed Referral Incident Operations"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls#8-5-design-principle", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-08-security-controls", "section-17-referral-program-17-docs-08-security-controls-8-5-design-principle", "authored-referral-settlement-security-controls", "authored-referral-access-phasing-operating-model"]
---

# Fail-Closed Referral Incident Operations

Neelo's design principle is the security north star: incentive systems should fail closed on settlement, not fail open on growth.

Failing closed means suspicious settlement paths can pause before value moves. It does not mean the whole product must freeze forever. A good incident plan defines which scopes can pause, which actions continue, which claims require review, and how users are told the difference between a temporary verification hold and a permanent denial.

The security source names the launch-readiness pieces: incident runbooks, clear freeze scopes, and fail-safe paths for payout and withdrawal anomalies. Cooldowns before transferability give the operator time to detect fraudulent reward injections before they leave the controlled state.

## Publication Boundary

The docs can promise the principle, not the exact emergency procedure. Final freeze scopes, runbook owners, user notification copy, payout hold rules, withdrawal anomaly paths, and restart criteria need security, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `spec-03`: referral, points, and reward-publication caveats.

## Related Pages

- `authored-referral-settlement-security-controls`
- `authored-points-claim-bridge-and-vesting`
- `authored-referral-access-phasing-operating-model`
