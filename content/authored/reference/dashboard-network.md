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

My network visualizes the referral tree and the points attached to each visible account. The dashboard shell routes `#network` to `DashNetwork`, which loads `/api/me/network` plus `/api/me`, builds a synthetic "you" root, and renders the referral tree in graph or tree mode.

The graph mode includes orientation controls, zoom, free or fixed camera behavior, depth controls up to fifteen levels, keyboard navigation, a minimap, fullscreen mode, and a focus drawer that shows points, invites used, direct referrals, and network size for the selected node. Tree mode exposes the same referral data as a collapsible nested list.

## Reader Implication

This page should distinguish visibility from final reward accounting. The UI can show a graph with up to fifteen levels, while public reward and historical-accounting language still depends on the unresolved referral-depth decision.

## Open Gap

Operator inbox item `#3` must resolve whether final public docs say 5 levels, 15 levels, or configurable/current-depth language, and how historical backfill should be described.

## Sources

- `dashboard-app`: dashboard route registration.
- `dashboard-network`: graph/tree view, camera controls, depth controls, keyboard navigation, minimap, fullscreen mode, and focus drawer.
- `server-me`: current network endpoint and configured-depth behavior.
- `server-points`: referral-depth configuration source.
- `dashboard-volume`: current volume view still carries depth language that must be reconciled.

## Related Pages

- `authored-referral-depth-open-question`
- `authored-dashboard-volume`
- `local-network-depth`
