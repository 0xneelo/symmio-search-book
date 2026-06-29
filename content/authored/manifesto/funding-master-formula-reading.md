---
id: "authored-funding-master-formula-reading"
title: "Funding Master Formula Reading"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#master-formula"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-01-abstract-master-formula", "authored-funding-master-optimization-equation", "authored-funding-full-objective"]
---

# Funding Master Formula Reading

The funding model's master formula should be read as an objective function for market control. It names markets, per-market controls, per-market state, raw profit, local risk, residual stress, flattening, insurance cost, and ADL cost. The interpretation is simple: maximize profit after flattening while subtracting risk, insurance cost, and ADL or UX penalties, under hard budget and safety constraints.

That does not make the formula a production config. It is the highest-level map of the control problem.

## What The Formula Connects

The formula connects four families of ideas:

- **profit:** spreads, funding, borrow, liquidations, market-making, and other revenue channels after costs;
- **risk:** local market risk, systemic coupling, exposure, volatility, and stress;
- **insurance:** local and global buffers with eligibility and spend limits;
- **ADL:** last-resort deleveraging when stress exceeds safety budgets or exposure limits.

The point is not that every term is final. The point is that profit, risk, insurance, and deleveraging must be optimized together rather than in separate silos.

## Publication Boundary

Do not treat the master formula as a live guarantee about rates, thresholds, eligibility, or ADL behavior. Public product docs need implementation-specific values and operator-approved risk language before exposing operational parameters.

## Sources

- `vibe-papers`: Neelo, "Abstract", "Master Formula".

## Related Pages

- `authored-funding-master-optimization-equation`
- `authored-funding-full-objective`
- `authored-funding-local-risk-score-penalties`
