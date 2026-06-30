---
id: "authored-referral-public-statement-readiness"
title: "Referral Public Statement Readiness"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-10-open-decisions", "section-17-referral-program-17-docs-10-open-decisions-10-5-governance-requirement", "authored-referral-rollout-governance-checklist"]
---

# Referral Public Statement Readiness

Neelo's open-decisions section ends with a governance requirement: every open decision should have an owner, a target milestone, a policy statement, and measurable acceptance criteria.

That requirement is the publication gate for referral economics. A decision is not ready for final docs just because the architecture is clear. It is ready when the accountable owner can state:

- who owns the decision;
- which milestone it belongs to;
- what public policy statement users should see;
- what measurable acceptance criteria prove the decision has been implemented or intentionally deferred.

## Why This Matters For Living Docs

The search-book is supposed to be a living answer engine, not a static campaign page. That changes the editorial workflow. When referral policy changes, the owning page should change first. Then routes, FAQ entries, answer chunks, and Search Insights should regenerate from that source of truth.

Without this gate, unresolved decisions can leak into public copy as confident answers. With the gate, the compendium can publish stable architecture while clearly labeling policy that remains under operator, legal, security, accounting, commercial, or implementation review.

## Readiness Test

A public referral statement is ready when it passes four checks:

1. It names the decision lane: policy, economics, settlement/security, or rollout/capacity.
2. It identifies the owner and milestone.
3. It states the user-facing rule without relying on hidden side terms.
4. It has measurable acceptance criteria that can be checked against implementation, analytics, contracts, or approved operating procedure.

## Reader Implication

When the answer engine cannot find an approved public statement, it should not guess. It should route to the relevant open-decision lane and explain what evidence is missing. That is how the docs stay both useful and honest while the referral system evolves.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions", "Governance Requirement".
- `spec-03`: current referral and public-economics caveats.

## Related Pages

- `authored-referral-rollout-governance-checklist`
- `authored-referral-policy-governance`
- `authored-referral-phase-version-reporting-rules`
