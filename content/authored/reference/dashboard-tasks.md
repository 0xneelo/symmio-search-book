---
id: "authored-dashboard-tasks"
title: "Dashboard Tasks"
section: "dashboard-reference"
track: "Dashboard Views"
status: "published"
sourceKeys: ["dashboard-app", "dashboard-tasks", "dashboard-faq"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/tasks.jsx", "src/dashboard/faq.jsx"]
relatedGeneratedPages: ["local-points-engine", "local-dashboard-points-distinction", "local-dashboard-faq"]
---

# Dashboard Tasks

Tasks is the onboarding workflow inside the dashboard. It is routed as `#tasks`, reads `/api/me`, summarizes completion, and renders a five-step checklist: verified dashboard access, earn education path, mechanics education path, post on X, and watch the explainer.

The shell also uses task state to show a badge on the Tasks tab when unfinished tasks remain. The task cards expose points where a task carries a bonus, collapse completed or non-current steps, and emit local task-progress events so the shell can update the tab badge without waiting for a full reload.

## Reader Implication

The docs should explain that tasks are not just UI chores. They are the local campaign actions that unlock onboarding points, referral-slot chances, and a cleaner referral record for later Vibe rewards.

## Sources

- `dashboard-app`: route registration and task-tab badge.
- `dashboard-tasks`: five-step checklist, bonus task flows, task-progress event, and funnel bridges.
- `dashboard-faq`: user-facing explanation of tasks, invites, and referral completion.

## Related Pages

- `authored-points-and-vibe-points`
- `authored-dashboard-overview`
- `local-points-engine`
