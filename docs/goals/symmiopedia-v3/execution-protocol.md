# Execution Protocol — Agent Work Block (field-manual-v2)

Binding for every agent working this goal. Project tags: `project:onboarding-app`, `subproject:search-book` (both labels exist on the Synchronicity team). Goal issue: **SYN-347**. Milestones: **SYN-348 … SYN-356**.

## 1. Claim an identity and a project
- Claim a tag in `docs/agents/registry.md`: suggested **`agent-fable-3`** (runtime `claude-opus-4-8`, owner `neelo`, project `onboarding-app`, sub-project `search-book`, goal SYN-347). Add your row and include it in your first checkpoint commit.
- Record your tag + project/sub-project in your first Linear comment on SYN-347.
- One tag per running agent; reuse it if you resume.

## 2. Scan before you act
- Before each milestone, list open + in-progress issues labeled `subproject:search-book`.
- Do not pick up work another agent has In Progress. Claim by assigning yourself before starting.

## 3. Task lifecycle — one Linear issue per milestone
1. Claim the milestone issue (SYN-348 → SYN-356 in order; create one if a needed subtask is missing).
2. Label it `agent:<your-tag>` (create the label if needed) + `project:onboarding-app` + `subproject:search-book`; assign yourself.
3. Set **In Progress**.
4. Work in small steps.
5. **Commit each milestone** to git on `feat/field-manual-v2` — small conventional commits, each referencing the issue id (e.g. `(SYN-348)`).
6. On completion: set **Done**, write a report comment (what changed, where, how verified — counts/run-ids/commit shas, never secret values), push.

## 4. Commit cadence & branch
- Branch `feat/field-manual-v2`. `git pull --rebase origin main` before every work block (codex agent pushes `main`).
- Commit at every milestone, not just the end. Use the repo's canonical committer + existing hooks; do not bypass hooks.
- Additive only until M9 cutover — never delete/replace the old `index.html` before M8 parity + operator design sign-off.

## 5. Blockers — close the loop
A blocker that isn't a Linear issue doesn't exist. Keep it tagged `project:`/`subproject:`.
- Need the **operator** (design sign-off, VPS env, DNS/platform decision) → issue labeled `needs:operator`, set **Blocked**, link to the current issue. This is the mechanism for the M8 design sign-off and the M9 cutover.
- Need **anyone** → `needs:general`, set **Blocked**.
- Never wait idle — file the blocker, then continue other in-scope milestones.

## 6. Reporting
- Milestone report on each issue you close.
- Final report on **SYN-347**: what shipped, links to commits + issues, acceptance status against `goal.md` §Definition of done.

## 7. Hard rules (this goal)
- Keep `main` green; work on the branch. Keep the `/api/search-book/*` contract unchanged.
- Never touch `~/projects/onboarding-app/src/search-book` (frozen legacy).
- Never print/persist secrets (`.secrets/search-book.env` loads only via `--env-file`).
- Honor DESIGN.MD hard rules (square corners, hard offset shadows, two typefaces, no emoji).

## 8. Label vocabulary
`project:onboarding-app` · `subproject:search-book` · `agent:<tag>` · `needs:operator` · `needs:general` · `blocked`
