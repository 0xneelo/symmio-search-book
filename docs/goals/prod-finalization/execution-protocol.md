# Execution Protocol — Agent Work Block (prod-finalization)

Binding for every agent working this goal. Project tags for this goal: `project:onboarding-app`, `subproject:search-book` (both labels exist on the Synchronicity team).

## 1. Claim an identity and a project

- On start, claim an agent tag from `docs/agents/registry.md`: `agent-<name|number>` (suggested: `agent-fable-001`). Add your row (tag, runtime, project, sub-project, goal SYN-304, status active, started, last-seen) and include it in your first checkpoint commit.
- Record your tag and project/sub-project in your first Linear comment on SYN-304.
- One tag per running agent; reuse your tag if you resume.

## 2. Scan before you act

- Before each subtask, list open + in-progress issues labeled `subproject:search-book`.
- Do not pick up work another agent has In Progress (the codex agent under SYN-292 may hold items). Claim by assigning yourself before starting.

## 3. Task lifecycle — one Linear issue per subtask

1. Claim the seeded sub-issue for the step (SYN-305..SYN-309, plus SYN-301 for step 2) or create one if missing. Work order: SYN-305 → SYN-301 → SYN-306 → SYN-309 → SYN-307 → SYN-308.
2. Label it `agent:<your-tag>` (create the label if needed) + `project:onboarding-app` + `subproject:search-book`; assign yourself.
3. Set In Progress.
4. Work in small steps.
5. **Commit each milestone**, referencing the issue id in the subject or body (e.g. `(SYN-305)`).
6. On completion: set Done, write a report comment (what changed, where, how verified — counts and run ids, never secret values), push the done commit.

## 4. Commit cadence

- Commit at every milestone. Match house style: short imperative subjects (see `git log --oneline`). Do not bypass hooks. Push early and often — a concurrent codex agent also pushes to `main`; small pushed checkpoints minimize conflict surface.

## 5. Blockers — close the loop

A blocker that isn't a Linear issue doesn't exist. Keep blocker issues tagged with the same project labels.

- Operator needed → issue + label `needs:operator`, set Blocked, link to your current issue, then continue other in-scope work. (Expected only for #11/#4-shaped surprises — those are out of scope anyway.)
- Specific agent needed → `needs:agent:<their-tag>`, Blocked, link.
- Anyone → `needs:general`, Blocked, link.
- Never silently stall and never wait for a human overnight.

## 6. Reporting

- Milestone report comment on each issue you close.
- Final report on SYN-304: what's done, what's left (#11/#4 only, expected), commit shas, run ids, acceptance status against `goal.md`.

## 7. Hard rules for this repo

- Never print or persist secrets; `.secrets/*` loads only via `--env-file`; evidence must show `valuesPrinted:false`.
- Never touch `~/projects/onboarding-app/src/search-book` (frozen).
- Never promote Discord/Lafa-derived copy (0-promotion evidence is guard-checked).
- Do not reopen resolved operator items; only #11/#4 may remain open.
- Quality gate target is exactly 29/30 (operator-inbox open by design) — do not force 30/30.
