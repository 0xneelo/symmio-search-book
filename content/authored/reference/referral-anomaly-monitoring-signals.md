---
id: "authored-referral-anomaly-monitoring-signals"
title: "Referral Anomaly Monitoring Signals"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-08-security-controls", "neelo-17-referral-program-17-docs-09-metrics-framework", "authored-referral-metrics-and-integrity"]
---

# Referral Anomaly Monitoring Signals

The security source requires anomaly monitoring for reward spikes and attribution outliers. The metrics source gives the broader reason: a referral system should measure quality, not only growth.

Useful monitoring targets include:

- sudden reward spikes by account, code, market, or cohort;
- attribution patterns that concentrate value without corresponding real activity;
- claim attempts that exceed finalized source buckets;
- referral volume that diverges from fee-producing or listing-quality signals;
- vesting, cooldown, or transfer events that cluster around suspicious accounts.

Monitoring should not silently rewrite settlement. It should generate investigation signals, freeze recommendations, or operator review queues while deterministic claim state remains auditable.

## Publication Boundary

The docs can name anomaly categories at a high level. They should not publish abuse thresholds, detection weights, sybil heuristics, investigation playbooks, or false-positive handling in enough detail to help attackers tune around them.

## Sources

- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `spec-03`: dashboard and referral metric caveats.

## Related Pages

- `authored-referral-metrics-and-integrity`
- `authored-referral-dashboard-reporting-standards`
- `authored-referral-abuse-patterns`
