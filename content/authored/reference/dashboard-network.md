---
id: "authored-dashboard-network"
title: "Dashboard My Network"
section: "dashboard-reference"
track: "Dashboard Views"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["dashboard-app", "dashboard-network", "server-me", "server-points", "dashboard-volume"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/network.jsx", "server/routes/me.js", "server/points.js", "src/dashboard/volume.jsx"]
relatedGeneratedPages: ["local-network-depth", "local-dashboard-points-distinction"]
---

# Dashboard My Network

My network visualizes the referral tree and the points attached to each visible account. Public referral depth is 15 levels, and historical backfill is additive and never lowers an existing balance. The dashboard shell routes `#network` to `DashNetwork`, which loads `/api/me/network` plus `/api/me`, builds a synthetic "you" root, and renders the referral tree in graph or tree mode.

The graph mode includes orientation controls, zoom, free or fixed camera behavior, depth controls up to 15 levels, keyboard navigation, a minimap, fullscreen mode, and a focus drawer that shows points, invites used, direct referrals, and network size for the selected node. Tree mode exposes the same referral data as a collapsible nested list.

## Reader Implication

This page should distinguish visibility from reward accounting without re-opening the depth decision. The public referral depth is 15 levels. Historical backfill is additive and never lowers an existing balance. If a user asks whether older data can be reduced by the backfill, the answer is no: the migration only adds newly eligible downstream credit.

## Sources

- `dashboard-app`: dashboard route registration.
- `dashboard-network`: graph/tree view, camera controls, depth controls, keyboard navigation, minimap, fullscreen mode, and focus drawer.
- `server-me`: current network endpoint and configured-depth behavior.
- `server-points`: referral-depth configuration source.
- `dashboard-volume`: current volume view uses the same fifteen-level public depth language.

## Related Pages

- `linear-referral-depth-rollout`
- `authored-dashboard-volume`
- `local-network-depth`
