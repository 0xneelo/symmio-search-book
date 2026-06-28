---
id: "section-15-funding-model-15-docs-01-abstract-master-formula"
title: "Abstract: Master Formula"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#master-formula"]
parentPageId: "neelo-15-funding-model-15-docs-01-abstract"
sourcePath: "Docs/public/15_funding_model/15_docs/01_abstract.md"
headingId: "master-formula"
---

# Abstract: Master Formula

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#master-formula

## Extracted Section Draft

## Master Formula

### Let markets be

$$
m = 1, \dots, M
$$

### Controls per market and time window

$$
c_m = \{\text{spread}_m,\ \text{funding}_m,\ \text{borrow}_m,\ \text{buyback}_m,\ \text{ins}^{loc}_m,\ \text{ins}^{glob}_m,\ \text{ADL}_m\}
$$

### State per market

$$
x_m \;\; \text{(OI, netting, exposure, inventory, volatility, etc.)}
$$

### Definitions

$$
\begin{aligned}
\Pi_m(x_m, c_m) &:\ \text{raw per-market profit} \\
R_m(x_m, c_m) &:\ \text{local risk} \\
D_m(x_m, c_m) &:\ \text{residual stress / uncovered loss} \\
\mathcal{F}(\cdot) &:\ \text{bell-curve flattening operator} \\
C^{ins}_m(\cdot),\ C^{adl}_m(\cdot) &:\ \text{cost / penalty functions}
\end{aligned}
$$

### The Objective

$$
\begin{aligned}
\operatorname*{maximize}_{\{c_m\}_{m=1}^{M}}\quad
& \Bigg\{
\sum_{m=1}^{M}\Pi'_m
-\lambda_{\mathrm{sys}}\,R_{\mathrm{sys}}(\mathbf{x},\mathbf{c};\Sigma)
-\lambda_{\mathrm{micro}}\sum_{m=1}^{M}S_m(x_m,c_m)
-\sum_{m=1}^{M}C^{ins}_m(ins_m)
\Bigg\} \\
\text{s.t.}\quad
& (\boldsymbol{\Pi}',\mathbf{ins}^{glob})=\mathcal{F}(\boldsymbol{\Pi},\mathbf{D}) \\
& D_m \le ins_m,\quad ins_m \le B_m \\
& \mathrm{ADL}\ \text{only if}\ \big(D_m>ins_m\ \text{or}\ |E_m|>\bar E_m\big) \\
& \mathrm{Fair}(\mathrm{ADL})
\end{aligned}
$$


### Subject to

- Budget constraints (local/global insurance caps)
- Eligibility constraints (global insurance per token/market)
- Exposure/coverage constraints
- ADL safety constraints

### Interpretation

**Profit (after flattening) − Risk − Insurance cost − ADL/UX penalty**, under hard safety/budget constraints.

---
