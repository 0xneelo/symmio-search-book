---
id: "authored-referral-reliable-incentives-under-scale"
title: "Referral Reliable Incentives Under Scale"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#15-design-requirement", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/00-abstract", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "section-17-referral-program-17-docs-01-system-baseline-1-5-design-requirement", "neelo-17-referral-program-17-docs-00-abstract"]
---

# Referral Reliable Incentives Under Scale

The system-baseline source states the architectural transition plainly: move from "features that work" to "incentives that remain reliable under scale and adversarial behavior."

That is the difference between an early referral feature and a market-formation layer. A feature can work for a controlled cohort because operators can patch policy manually. A scaled incentive has to remain explainable when many users, partners, markets, points, private overlays, and settlement events interact.

## What Scale Changes

Scale increases the cost of ambiguity. A hidden trust assumption that is manageable during beta can become a public dispute once the program is open:

- a referral graph becomes harder to reconcile;
- a private partner overlay can distort public expectations;
- provisional points can become economically meaningful;
- reward-eligible code activation can become contested;
- and weak attribution can turn fee flow into a claims problem.

That is why the source does not treat reliability as a later polish pass. It is the design requirement for the next architecture.

## Reader Implication

When the docs explain referral roadmap, they should not frame the next phase as only adding more perks. The next phase is about preserving speed and flexibility while reducing hidden trust assumptions. More incentives are only credible if attribution, accounting, anti-gaming, settlement, and reporting become more reliable at the same time.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline", "Design Requirement".
- `vibe-papers`: Neelo, "Abstract".
- `spec-03`: current referral and rewards-publication caveats.

## Related Pages

- `authored-referral-adversarial-trust-constraints`
- `authored-referral-sustainable-fee-flow-objective`
- `authored-referral-phase-version-reporting-rules`
