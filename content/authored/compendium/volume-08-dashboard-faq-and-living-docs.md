---
id: "authored-volume-08-dashboard-faq-and-living-docs"
title: "Volume 08: Dashboard, FAQ, And Living Docs"
section: "compendium"
track: "Volume 08"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-08-dashboard-faq-and-living-docs"
sourceKeys: ["spec-03", "spec-06", "spec-09", "dashboard-app", "local-revenue-doc", "dashboard-revenue-doc"]
sourceUrls: ["_specs/app-docs/03-grounding.md", "_specs/app-docs/06-answer-engine.md", "_specs/app-docs/09-design-reference.md", "src/dashboard/app.jsx", "docs/network-revenue.md", "src/dashboard/revenue-doc.jsx"]
relatedGeneratedPages: ["authored-dashboard-route-inventory", "authored-dashboard-overview", "authored-dashboard-network", "authored-dashboard-volume", "authored-estimated-network-revenue", "authored-dashboard-revenue-pulse", "authored-points-taxonomy", "authored-search-insights-loop", "authored-discord-lafa-ingestion-boundary", "authored-dashboard-faq"]
---

# Volume 08: Dashboard, FAQ, And Living Docs

The compendium ends where the user actually operates: the dashboard, the FAQ, and the answer-engine feedback loop. This is the reference layer that turns the manifesto into a self-serve product surface.

The dashboard pages need special discipline because they sit closest to current implementation. Revenue, volume, points, invite states, and tasks must cite code and local docs, and they must keep configurable or unresolved claims labeled. The FAQ layer remains local until the Discord and Lafa corpus is provided.

## What This Volume Does

- It documents every dashboard view as a first-class page.
- It gives the answer engine exact routes for revenue, volume, points, invites, settings, tasks, and FAQ questions.
- It explains the living-docs loop: question tracking, answer ratings, gaps, and demand-driven improvement.
- It keeps open operator decisions visible in the gap queue instead of hiding them in polished copy.

## Reading Order

Start with `authored-dashboard-route-inventory`. That page is the coverage map for the visible dashboard routes, the hidden revenue route, and the Search Book pages that own each view-level answer.

Then read the view path: `authored-dashboard-overview`, `authored-dashboard-invites`, `authored-dashboard-network`, `authored-dashboard-volume`, `authored-dashboard-tasks`, `authored-dashboard-faq`, and `authored-dashboard-settings`. This path answers what each screen shows before moving into formula or policy details. It also keeps the current 15-level referral depth and additive backfill wording attached to the network view rather than buried in old reconciliation notes.

Use the economics and points path for dashboard numbers: `authored-estimated-network-revenue`, `authored-dashboard-revenue-pulse`, `authored-dashboard-volume`, `authored-volume-snapshot-cadence`, `authored-barometer-subgraph-upgrade`, `authored-points-taxonomy`, `authored-points-and-vibe-points`, and `authored-tge-settlement-multiplier`. This path separates v1 Phase A revenue from Phase B economics, current backend volume snapshots from the tracked Barometer/subgraph upgrade, and onboarding points from Vibe trading points.

Next read the FAQ and support boundary: `authored-dashboard-faq` and `authored-discord-lafa-ingestion-boundary`. The dashboard FAQ is a local seed, not the final community-support corpus. Discord and Lafa answers remain parked until export/API access, author identity, and public-use boundaries are supplied.

Finish with `authored-search-insights-loop`. This is the living-docs operating model: questions route to pages, answers collect ratings, low-rated or unanswered questions become gaps, and editors use demand to deepen the compendium. It also names what production still needs beyond the static prototype: datastore, retention, moderation, service env, and deploy integration.

## Reader Implication

If you are using the dashboard, this volume should answer what each number means and why it can be trusted. If it cannot answer, the question should become a tracked gap.

## Publication Boundary

Treat this volume as the compendium's dashboard and living-docs operating spine, not as proof that the public docs platform, Discord corpus, production datastore, or deployed answer-engine service is complete. V1 Phase A revenue, 15-level public referral depth, and current backend volume snapshots are publishable with their stated boundaries. Discord/Lafa ingestion, production LLM service env, Notion ingestion, public frontend platform/deploy route, Barometer endpoint details, FAQ canonicalization, rating moderation, retention policy enforcement, and final analytics/storage operations remain parked or implementation-review items before production launch.

## Sources

- `spec-03`: Dashboard and economics grounding.
- `spec-06`: Answer-engine and living-docs loop.
- `spec-09`: Mockup and visual IA target.
- `dashboard-app`: Current dashboard shell.
- `local-revenue-doc`: Local network-revenue explanation.
- `dashboard-revenue-doc`: In-app revenue documentation.

## Related Pages

- `authored-dashboard-route-inventory`
- `authored-dashboard-overview`
- `authored-dashboard-network`
- `authored-dashboard-volume`
- `authored-estimated-network-revenue`
- `authored-dashboard-revenue-pulse`
- `authored-points-taxonomy`
- `authored-search-insights-loop`
- `authored-discord-lafa-ingestion-boundary`
- `authored-dashboard-faq`
