---
id: "authored-dashboard-overview"
title: "Dashboard Overview"
section: "dashboard-reference"
track: "Dashboard Views"
status: "published"
sourceKeys: ["dashboard-app", "dashboard-overview", "dashboard-revenue-doc", "server-pulse", "spec-03"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/overview.jsx", "src/dashboard/revenue-hero.jsx", "src/dashboard/revenue-doc.jsx", "server/pulse.js", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-network-revenue", "local-revenue-pulse", "local-dashboard-points-distinction"]
---

# Dashboard Overview

The Overview view is the dashboard's compression layer: estimated network revenue, onboarding progress, referral link sharing, invite inventory, and points ledger all appear before the user drills into a dedicated tab.

The shell routes `#overview` to `DashOverview`. That view loads `/api/me`, renders the revenue hero, shows the core task checklist, exposes the user's referral link through a copyable field, summarizes invite states, and lists the points ledger. The revenue hero and hidden `#revenue` reference page explain that the USD number is a Phase A estimate derived from network volume, the platform fee rate, and the referrer platform share, not a final settlement balance.

## Reader Implication

Users should treat Overview as a status console, not an accounting source of truth. It answers "what is happening in my network right now?" and then routes deeper: revenue to the hidden revenue page, invites to My invites, network growth to My network, and unfinished onboarding to Tasks.

## Publication Boundary

The Overview can publish the Phase A revenue formula and fifteen-level referral-depth stance. It should still avoid turning the estimate into a payable balance, and it should leave Phase B economics out of v1.

## Sources

- `dashboard-app`: dashboard shell and route list.
- `dashboard-overview`: Overview cards for revenue, tasks, referral link, invites, and points ledger.
- `dashboard-revenue-doc`: hidden revenue route and revenue copy.
- `server-pulse`: current revenue pulse implementation.
- `spec-03`: reference-layer grounding for revenue, volume, points, and dashboard views.

## Related Pages

- `authored-estimated-network-revenue`
- `authored-dashboard-tasks`
- `authored-dashboard-invites`
- `local-network-revenue`
