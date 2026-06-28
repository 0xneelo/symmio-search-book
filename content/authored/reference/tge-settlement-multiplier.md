---
id: "authored-tge-settlement-multiplier"
title: "TGE Settlement Multiplier"
section: "rewards-referrals"
track: "Points"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["dashboard-app", "spec-03", "server-points", "dashboard-overview"]
sourceUrls: ["src/dashboard/app.jsx", "_specs/app-docs/03-grounding.md", "server/points.js", "src/dashboard/overview.jsx"]
relatedGeneratedPages: ["local-dashboard-points-distinction", "local-points-engine", "section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-9-tge-allocation-rule"]
---

# TGE Settlement Multiplier

The dashboard footer currently tells users that onboarding points are tallied off-chain during the GTM push and will be settled at TGE with a multiplier on the network's Vibecaps trading volume. It also warns that these onboarding points are not the same thing as trading points on `beta.vibe.trading`.

That makes the TGE multiplier a public-facing concept, but it still needs careful documentation because the exact formula is not implemented as a final public settlement calculator in this search-book source set.

## What The Current Sources Prove

The current sources prove three things:

- The onboarding app keeps an off-chain points ledger.
- The dashboard user interface tells users the onboarding points will interact with network Vibecaps trading volume at TGE.
- The docs spec requires this distinction to be documented separately from Vibe protocol/trading points.

They do not prove the final settlement formula, the exact multiplier schedule, claim mechanics, TGE timing, eligibility cutoff, anti-sybil adjustments, or whether historical backfill changes the final public explanation.

## How To Explain It Safely

Use this wording until a product owner approves the final formula:

```text
Onboarding points are off-chain campaign points. The current dashboard says they are intended to settle at TGE with a multiplier tied to the network's Vibecaps trading volume. The final settlement formula, eligibility rules, and claim mechanics need product-owner confirmation before publication as a promise.
```

That wording preserves the user-facing concept without pretending the docs have the final economic schedule.

## Reader Implication

If a user asks "what are my points worth?", the docs should not answer with a token value or a fixed conversion. The correct answer is rail-first:

1. Identify whether the user means onboarding points, Vibe points, referral points, or network/trading points.
2. Explain that onboarding points are tracked off-chain now.
3. Explain that the dashboard frames TGE settlement as multiplier-based.
4. State that final settlement mechanics are pending public confirmation.

## Sources

- `dashboard-app`: Footer language separating onboarding points from trading points and naming the TGE multiplier concept.
- `spec-03`: Required TGE settlement note and points taxonomy.
- `server-points`: Off-chain local points ledger.
- `dashboard-overview`: Points ledger display.

## Related Pages

- `authored-points-taxonomy`
- `authored-points-and-vibe-points`
- `authored-vibe-points-program`
