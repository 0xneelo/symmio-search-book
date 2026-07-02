# Launch Prompt: Production Finalization (paste into a fresh Claude session)

Project: onboarding-app / search-book.
Goal: finish every Search Book production gap that does not need the VPS or operator decisions, so when the operator wakes up the ONLY remaining work is OPERATOR-INBOX #11 (SYN-281 VPS env) and #4 (SYN-285 route/platform decisions) and launch is push-button.

Repo: cd ~/projects/symmio-search-book (operator-Mac clone of 0xneelo/symmio-search-book). The working tree already holds verified, UNCOMMITTED work — do not reset, stash-drop, or discard anything.

Read first (in order):
1. docs/goals/prod-finalization/goal.md (contract: scope, acceptance, constraints)
2. docs/goals/prod-finalization/plan.md (the five ordered steps with commands)
3. docs/goals/prod-finalization/execution-protocol.md (MANDATORY work protocol)
4. Briefs: /tmp/handoff-search-book-prod-finalization-20260702.md and /tmp/handoff-search-book-unanswered-fact-gap-events-20260702.md

Linear: goal issue SYN-304 — assign yourself and set it In Progress. Seeded subtasks, work them in THIS order: SYN-305 (checkpoint+push the staged work, CI green), SYN-301 (undocumented-fact answers must create typed gap events), SYN-306 (fail-closed sensitive-pattern scan), SYN-309 (Lafa verbatim answers: lafa-cite ingestion from the local gitignored raw-discord-exports/, contradiction screen, quote-with-attribution runtime, guard migration — operator decided: no disclaimers, non-Lafa text stays out of the repo), SYN-307 (refresh launch/release/static evidence workflows), SYN-308 (final sweep + goal report).

Done when: goal.md §Definition of done — all six steps complete; SYN-301, SYN-309, SYN-304 Done with evidence comments; "what did Lafa say about X" answers verbatim with discord-lafa citations while non-Lafa quoting still refuses; local verify AND pushed-head CI green; quality exactly 29/30 (operator-inbox open by design — do not force 30/30); fresh validated evidence run ids recorded in the status docs; only #11/#4 left open in _specs/app-docs/OPERATOR-INBOX.md.

Work protocol (MANDATORY — full text in execution-protocol.md): claim an agent tag in docs/agents/registry.md (suggested agent-fable-001) and commit the row; for each subtask label the issue agent:<tag> + project:onboarding-app + subproject:search-book, assign yourself, set In Progress; commit every milestone referencing the issue id (e.g. "(SYN-305)"); on completion set Done, write a report comment (counts, run ids, commit shas — never secret values), and push. Blocked? File a Linear issue (needs:operator / needs:general), set Blocked, link it, and continue other in-scope work — this is an unattended overnight run, never wait for a human.

Hard rules: never print or persist secrets (.secrets/search-book.env loads only via --env-file; all evidence must report valuesPrinted:false). Never touch ~/projects/onboarding-app/src/search-book (frozen legacy). Never promote Discord/Lafa-derived copy (0-promotion evidence is guard-checked). Do not attempt #11/#4 — operator-only. A codex agent pushes to main concurrently: git pull --rebase before every work block; conflicts concentrate in PROGRESS.md and _local/agent-worklog.md (append-style, keep both sides, newest-first). Full verify needs a 0xneelo/vibe_docs clone (defaults to /tmp/vibe_docs — clone it if missing). Read goal.md's guard-web constraints before editing any prose/status doc.

Start now: claim your tag, scan open/in-progress subproject:search-book issues, then open SYN-305.
