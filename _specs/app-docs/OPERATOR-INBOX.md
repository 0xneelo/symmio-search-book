# Operator Inbox — blockers, access & decisions

The agent logs anything it needs the operator to resolve here, then continues other work (protocol: `10-operating-protocol.md`).

**Operator:** resolve items inline — fill the `Resolution` field and flip `[OPEN]` → `[RESOLVED]`. The agent re-checks at each checkpoint and resumes parked work. One entry per issue; newest at the top.

## 2026-07-01 Reconciliation

Canonical operator ground truth after reconciliation: only two production operator gates remain, #11 and #4. The local LLM env file is complete; #11 is only the production VPS env install. #2, #5, #6, #7, and #12 must not be re-opened. New post-reconciliation runtime/file-access issues may be logged as new scoped items.

## Open

### [OPEN] #11 — Production VPS LLM/service env install
- Need: Install the complete Search Book production service environment at `/etc/symmio-search-book/search-book.env`, including the OpenAI-compatible LLM settings already present locally plus production DB/default-mode/origin settings. · Why/impact: Local `.secrets/search-book.env` is complete and live evals can run from it; production readiness is still false until the VPS service env is installed without printing secrets. · Blocks: `llmProductionReady`, production model-backed answer synthesis, production prompt-injection execution against live model responses, and production launch preflight. · Meanwhile: Use local env-file only via `node --env-file`, deterministic corpus scanning, grounded extractive fallback, strict validation, and launch/preflight checks. · Linear operator task: SYN-281. · Resolution (operator): Local env complete 2026-06-30/2026-07-01; only production VPS env install remains.

### [OPEN] #4 — Final docs platform and repository owner decision
- Need: Decide the public frontend platform/repo owner and deploy route for production docs. · Why/impact: Backend architecture is decided as a standalone service with SQLite under SYN-217, but the public frontend home, repository ownership, deploy route, allowed origins, IA packaging, and release workflow depend on this decision. · Blocks: Final production frontend scaffold, deploy automation, public preview URL, and production CORS origin configuration. · Meanwhile: Build against the standalone `symmio-search-book` repo, static prototype, generated data assets, and platform-neutral answer-engine service boundary. · Linear operator task: SYN-285. · Resolution (operator): Partial update 2026-06-29: backend decided as standalone service + SQLite in SYN-217; public frontend platform/repo/deploy route remains open.

## Resolved

### [RESOLVED] #17 — Release readable Discord export file for ingestion
- Need: Close or finish the Windows DiscordChatExporter process so `/mnt/c/Users/tabor/Music/symmio-discord-exports/SYMMIO - ... symm-chat [1106198412124237855].json` can be read or copied into WSL, or provide a readable copy of that export in `/tmp` or the repo's gitignored local area. · Why/impact: The export now exists and #2 remains resolved, but WSL and PowerShell reads/copies had returned permission/locked-file errors because `DiscordChatExporter` still had the file open. · Blocks: Nothing now. · Meanwhile: Continue production env/deploy-route work under #11/#4. · Linear operator task: SYN-289. · Resolution (operator): Resolved 2026-07-01; the Windows export became readable from WSL. The agent imported the real corpus with `scripts/build-discord-corpus.mjs --publication-mode internal-only --lafa-author-id <resolved from the single lafachief author in the export>`, producing 5,000 imported messages, 723 question clusters, and 837 configured Lafa answer candidates without storing raw message text in the committed corpus. Do not re-open #2.

### [RESOLVED] #12 — Checkpoint commit approval timed out for search-book fifteenth pass
- Need: Explicit operator approval or a refreshed commit attempt path for the scoped staged checkpoint `Refine search-book home actions parity fifteenth pass`. · Why/impact: This was a false blocker after reconciliation. · Blocks: Nothing now. · Meanwhile: No parked follow-up remains for this item. · Linear operator task: SYN-287. · Resolution (operator): Resolved 2026-07-01; commit `e7f6973` already exists and the related worktree was clean. Do not re-open.

### [RESOLVED] #7 — SuperFlow / SSHE source identification
- Need: Identify or exclude the remaining SSHE source family. · Why/impact: Needed to avoid false source-completeness claims. · Blocks: Nothing for v1 source completeness. · Meanwhile: Registered SHE API plus Symmio Foundation Meta-Solvers/Clearing Layers as the v1 SSHE boundary. · Linear operator task: SYN-283. · Resolution (operator): Resolved 2026-07-01; SSHE source is provided and sufficient for v1 as the operator-provided SuperFlow/SHE OpenAPI source plus Symmio Foundation Meta-Solvers/clearing-layer context. Do not re-open.

### [RESOLVED] #6 — Original/oldest Symmio whitepaper artifact
- Need: Scrape or otherwise recover the exact original/oldest Symmio whitepaper and earliest-docs source. · Why/impact: Helpful for a full origin-story comparison, but not a v1 production requirement after reconciliation. · Blocks: Nothing for v1. · Meanwhile: Use the registered official GitHub/current-docs boundary and avoid claiming an exact original artifact. · Linear operator task: SYN-284. · Resolution (operator): Resolved 2026-07-01; original/oldest whitepaper recovery is out of scope for v1 and must not be treated as a launch blocker.

### [RESOLVED] #5 — Vibe Trading Notion export or read access
- Need: Ingest the provided Vibe Trading Notion workspace link and public-use boundary. · Why/impact: Required Vibe working source for product narrative completeness. · Blocks: Nothing now. · Meanwhile: Notion-derived public content is paraphrase-only and signed-media/static commercial details stay excluded. · Linear operator task: SYN-282. · Resolution (operator): Resolved 2026-07-01; Notion MCP access is installed. Agent fetched the Vibe Trading workspace root plus the Perpetual Bid child pages through Claude's Notion MCP and registered `vibe-trading-notion` with a paraphrase-only boundary.

### [RESOLVED] #2 — Discord export and Lafa answer corpus
- Need: Provide relevant Discord export/API access, channel scope/date range, Lafa identity/public-use boundary. · Why/impact: Needed for Discord-seeded FAQ and living-docs demand mining. · Blocks: Nothing as an operator decision after reconciliation; a separate file-release issue is tracked as #17 if the local export is locked. · Meanwhile: Use `scripts/build-discord-corpus.mjs` once the provided export is readable. · Linear operator task: SYN-286. · Resolution (operator): Resolved 2026-07-01; Discord export/access is provided. Do not re-open #2. If the local export is locked or needs a fresh readable copy, track that as a new scoped item.

### [RESOLVED] #16 — Linear handoff comment approval timed out for production-readiness handoff
- Need: Explicit operator approval or a refreshed Linear comment attempt path for posting the Search Book production-readiness handoff summary to Linear epic SYN-209. · Why/impact: The handoff doc and local register entry can be completed, but the `$linear-handoff` skill's third artifact requires a Linear comment/issue pointer; two `save_comment` attempts timed out in the automatic permission approval review. · Blocks: Nothing now; the refreshed production-readiness handoff is linked from Linear. · Meanwhile: No parked follow-up remains for this item. · Resolution (operator): Resolved 2026-06-30 by refreshed `$linear-handoff`; SYN-209 comment `5391923b-d7e4-421a-8a48-57d81531d5d1` points to `/tmp/handoff-search-book-production-readiness-20260630-2237.md`, and `_local/handoff-register.md` has the matching entry.

### [RESOLVED] #15 — Missing local Vibe docs source tree for Search Book rebuild
- Need: Restore `/tmp/vibe_docs/Docs/public` and `/tmp/vibe_docs/Website/public/generated/docs-data.json`, or provide alternate `VIBE_DOCS_PUBLIC` / `VIBE_DOCS_DATA` paths. · Why/impact: `node scripts/build-all.mjs --verify` requires these source inputs before regenerating deterministic Search Book data after content status changes. · Blocks: Nothing now; deterministic Search Book rebuilds can run again against the restored source tree. · Meanwhile: Resume the remaining Volume 04 Percolator publication batch verification and checkpoint flow. · Resolution (operator): Resolved 2026-06-30 by restoring the public `0xneelo/vibe_docs` source tree at `/tmp/vibe_docs` from `https://github.com/0xneelo/vibe_docs.git`, commit `c6a6a78`; required paths `/tmp/vibe_docs/Docs/public` and `/tmp/vibe_docs/Website/public/generated/docs-data.json` are present.

### [RESOLVED] #14 — Checkpoint staging approval timed out for Volume 01 reading-order pass
- Need: Explicit operator approval or a refreshed staging/commit attempt path for the scoped verified Volume 01 checkpoint `Add Volume 01 reading order overview`. · Why/impact: The Volume 01 compendium overview work was implemented and verified, but `git add` required escalated git index writes and the automatic approval review timed out twice before allowing the command. · Blocks: Nothing now; the checkpoint exists. · Meanwhile: No parked follow-up remains for this item. · Resolution (operator): Resolved 2026-06-30 by refreshed scoped staging/commit attempt; checkpoint commit is `bd38e49` (`Add Volume 01 reading order overview`).

### [RESOLVED] #9 — Vibe add-token-info source fetch approval/access
- Need: Fetch the official Markdown contents for `https://docs.vibe.trading/more-info/add-token-info.md`, or confirm a reachable canonical replacement URL for the Add Token Info page. · Why/impact: Add Token Info remained a source-ingestion task under SYN-226; the page could not be promoted from generated companion material without primary-source text. · Blocks: Nothing for v1 Add Token Info reference coverage. · Meanwhile: Authored Add Token Info is now sourced from official Markdown; current fee, USDC token, chain, and treasury address details remain routed to the live in-app form. · Resolution (operator): Resolved 2026-06-29; official Markdown fetched from `https://docs.vibe.trading/more-info/add-token-info.md` and synthesized into `authored-vibe-add-token-info`. Do not publish static payment details.

### [RESOLVED] #10 — Linear issue creation approval for private repo handoffs
- Need: Explicit approval to send scoped private repository context to Linear for handoff/issues, or confirmation that local handoff docs plus direct subagent delegation are the preferred tracking path. · Why/impact: The Linear issue creation attempt for the search-book design-parity handoff was rejected by the safety layer as private repo context disclosure to external SaaS. · Blocks: Nothing for current local execution; future scoped Linear filing is approved. · Meanwhile: SYN-209 and children SYN-210 through SYN-226 are filed; continue to avoid secrets and overbroad private context in external tools. · Resolution (operator): Resolved 2026-06-29 in SYN-209; operator approved Linear filing and filed SYN-209 plus children SYN-210 through SYN-226.

### [RESOLVED] #8 — Opyn official docs access or exclusion decision
- Need: Provide an accessible official Opyn docs source for the competitive documentation sweep, or confirm Opyn should be excluded/replaced in the final benchmark set. · Why/impact: The returned sweep and a follow-up web check could not use the official `https://opyn.gitbook.io/opyn/` source, and using mirrors or third-party snippets would weaken source integrity. · Blocks: Nothing for v1 benchmark completeness; sweep stays 49/50 with Opyn documented as excluded. · Meanwhile: Continue the competitive synthesis from the 49 verified official docs and do not use mirrors or third-party snippets for Opyn. · Resolution (operator): Resolved 2026-06-29 in SYN-213; Opyn is excluded because it shut down. Competitive sweep remains 49/50 and documented.

### [RESOLVED] #3 — Public stance on referral depth and historical accounting
- Need: Confirm the public answer for referral depth today: whether users should see 5 levels, 15 levels, configurable/current-depth language, and how historical backfill should be described. · Why/impact: Local code, dashboard copy, and Linear rollout notes conflicted; publishing the wrong answer would mislead users about rewards and network volume. · Blocks: Nothing for v1 public copy. · Meanwhile: Update docs, eval fixtures, dashboard copy, and answer routing to 15-level wording; keep unrelated referral economics under their own source/review gates. · Resolution (operator): Resolved 2026-06-29 in SYN-212; public referral depth is 15 levels. Backfill is additive and never lowers a balance.

### [RESOLVED] #1 — Current public revenue disclosure boundary
- Need: Confirm which current and planned revenue inputs can be published: Phase A estimated network revenue formula, fee/share defaults, Phase B components, per-venue revenue, VibeCaps LP profit share, liquidations, funding, and points farmed. · Why/impact: Local implementation and Linear research distinguish implemented estimates from planned revenue sources; public docs need a precise disclosure boundary. · Blocks: Nothing for v1 Phase-A revenue explanation. · Meanwhile: Publish Phase-A estimate only; keep Phase B out of v1 public answer scope. · Resolution (operator): Resolved 2026-06-29 in SYN-212; publish Phase-A formula `networkVolume × platformFeeRate × referrerPlatformShare` with defaults `0.05%` / `5 bps` platform fee and `30%` referrer platform share. Phase B is out of scope for v1.

### [RESOLVED] #13 — Checkpoint staging approval timed out for search-book industry implications pass
- Need: Explicit operator approval or a refreshed staging/commit attempt path for the scoped search-book content checkpoint covering the industry-implications exact pages. · Why/impact: The implementation and verification passed, but two `git add` attempts for the exact scoped files timed out in the automatic approval review before writing the git index. · Blocks: Creating the required scoped checkpoint commit for the industry-implications content slice. · Meanwhile: Keeping the verified worktree changes in place, leaving Sartre's forty-second-pass design artifacts and unrelated dashboard/spec/deploy/demo/launcher WIP unstaged, and continuing non-checkpoint-dependent search-book work. · Resolution (operator): Resolved by a later scoped staging attempt succeeding on 2026-06-29; no operator action remains for this item.

---

### Entry template
```
### [OPEN] #1 — <title>
- Need: …
- Why / impact: …
- Blocks: …
- Meanwhile: …
- Resolution (operator): …
```
