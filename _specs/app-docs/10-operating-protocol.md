# 10 — Operating protocol: never block, never shortcut

**You are never blocked.** If you hit anything you cannot resolve yourself — missing access or credentials (Discord export, API keys, repo/deploy access), a decision that is the operator's to make, an external dependency, an ambiguity, a missing tool, an account/login, *anything* — **do NOT take a shortcut, workaround, mock, stub, or guess, and do NOT stop.** Instead:

1. **Log it.** Append a clear, self-contained entry to **`_specs/app-docs/OPERATOR-INBOX.md`** (create it if missing) with everything the operator needs to resolve it cold.
2. **Park & continue.** Park that thread and **immediately move on** to other goal work that doesn't depend on it. Never idle waiting.
3. **Re-check at checkpoints.** At every phase checkpoint, re-read `OPERATOR-INBOX.md`. When the operator marks an item **RESOLVED** (answer/credential/decision filled in inline), resume that work.

The operator resolves inbox items **during** the session, asynchronously. **Treat everything as resolvable — there are no dead-ends, only parked items.** This replaces silent assumptions, mocks, and guessing: surface the need and keep moving toward the goal.

## Rules
- **One entry per issue.** Don't re-ask or re-litigate; check status before re-raising.
- **No shortcuts to "look done."** A mock/stub/guess that hides a real need is a failure; logging the need is success.
- **Self-contained entries.** The operator should be able to act with zero extra context.
- **Stable location.** Keep the inbox at `_specs/app-docs/OPERATOR-INBOX.md` even after scaffolding the build repo, so the operator watches one place.

## Entry format
```
### [OPEN] #<n> — <short title>
- Need: <exactly what you need>
- Why / impact: <what it unblocks>
- Blocks: <which page/phase/feature is parked>
- Meanwhile: <what you're doing instead>
- Resolution (operator): <blank — the operator fills this in and flips [OPEN] → [RESOLVED]>
```
