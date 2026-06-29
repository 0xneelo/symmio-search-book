---
id: "authored-referral-primary-chapter-change-policy"
title: "Referral Primary Chapter Change Policy"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/14-meeting-traceability", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/11-conclusion", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-14-meeting-traceability", "section-17-referral-program-17-docs-14-meeting-traceability-change-policy", "neelo-17-referral-program-17-docs-11-conclusion"]
---

# Referral Primary Chapter Change Policy

The design coverage map gives a simple change policy: when chapter scope changes, update the relevant chapter first, update the map second, and keep links relative so repository and docs-site views stay aligned.

That is an editorial control, but it is also a product control. Referral policy touches economics, access, security, market creation, dashboards, and future rewards. If a policy change is introduced only in FAQ copy or dashboard text, the docs can drift away from the source of truth.

## Change Sequence

The safe sequence is:

1. Update the owning chapter or authored page for the concept.
2. Update the coverage map if ownership boundaries changed.
3. Regenerate question routes, FAQ entries, answer chunks, volume maps, and validation reports.
4. Let the answer engine route users to the updated source of truth.

This sequence keeps the living-docs loop from amplifying stale or duplicated policy.

## Publication Boundary

The policy does not decide live referral depth, partner tiers, transferability, TGE weighting, signer controls, or launch dates. It decides how approved changes should enter the compendium once the responsible owner has made them.

## Reader Implication

When public referral wording changes, readers should be able to trace the change back to the owning chapter and source entry. That is how the docs preserve trust while the referral architecture evolves.

## Sources

- `vibe-papers`: Neelo, "Design Coverage Map", "Change policy".
- `vibe-papers`: Neelo, "Section 11: Conclusion".
- `spec-03`: current referral-publication caveats.

## Related Pages

- `authored-referral-design-coverage-routing-map`
- `authored-referral-public-statement-readiness`
- `authored-referral-phase-version-reporting-rules`
