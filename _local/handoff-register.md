# Handoff Register

Newest first. Each entry links a temp handoff doc, its Linear issue, and the receiving agent.

## 2026-07-04 — RAG quality goal pack (engram-derived retriever upgrades)

- Created: 2026-07-04
- Handoff path: doc pack in-repo at `docs/goals/rag-quality/` (README = contract; goal-*.md per agent; launch-prompts.md incl. short 2-liners)
- Focus: Package 6 parallel worker-agent goals + 1 research issue to upgrade the deterministic RAG retriever, derived from an engram/IR reading of the pipeline. Binding constraint: retrieval path stays pure (same query+data+code → byte-identical JSON); time/usage state lives at build time (committed artifact) or the reuse cache, never in scoreChunk()/retrieve().
- Summary: Packaging session, no runtime code changed. Linear epic **SYN-375** (related SYN-209) → goals SYN-376 fable-10 (SNR cutoff, do first), SYN-377 fable-9 (associative expansion+two-tier), SYN-378 fable-6 (cue index/flagship), SYN-379 fable-7 (supersession), SYN-380 fable-8 (prioritized replay, parallel), SYN-382 fable-11 (negative-cue index, parallel); SYN-381 research/backlog; SYN-389 confirmed reuse-cache stale-citation bug (split from SYN-381); SYN-388 operator dispatch tracker. Merge order 10→9→6→7, 8+11 anytime; ownership map partitions run-llm-rag-answer.mjs into regions A–E so agents don't collide. Doc pack committed to local `main`: `7c391c6` + `85b0f90` + `ac0efaf` (un-pushed — see SYN-385 for the merge/rescue). Agent labels agent:agent-fable-6..11 pre-exist/created. New Linear project "symmio-search-book" created by operator but not yet team-associated to Synchronicity, so issues carry the project:* labels only for now.
- Receiving agent: six workers agent-fable-6/7/8/9/10/11 (pull via kickoff prompts in each goal issue / launch-prompts.md; operator dispatches per SYN-388)
- Linear: SYN-375 — https://linear.app/synchronicity/issue/SYN-375/rag-quality-engram-derived-retrieval-upgrades-rag-quality-epic

## 2026-07-04 — Merge & clean up the symmio-search-book worktrees

- Created: 2026-07-04
- Handoff path: `/tmp/handoff-merge-symmio-search-book-20260704.md`
- Focus: "Merge everything" so the operator can clean up. The four `symmio-search-book*` folders are one repo = 1 clone + 3 worktrees, not four copies. Only PR #5 `fix/answer-page-design` is genuinely unmerged; `feat/operator-s-mark` (PR #4) and `feat/field-manual-v2` (PR #1) are already merged and need worktree cleanup only. Rescue the 2 local-only `main` commits, finish + merge PR #5, prune the two merged worktrees + their branches, then sync `main`.
- Summary: Captured 2026-07-04 (read-only recon). PR #5 = +1/−0 vs `origin/main` (worktree `-answerfix`, 10 dirty files). Local `main` is −41 behind origin and carries 2 un-pushed commits `85b0f90` (SYN-382) + `7c391c6` (SYN-375) — on no remote and in no PR, must not be lost on a sync/reset. Dirty worktrees (67 main / 25 `-v3` / 10 `-answerfix`) may belong to other live agents — no blind-discard. Repo merges via `gh pr merge`, not direct push-to-main (may be operator-gated).
- Receiving agent: unassigned (pull via kickoff prompt in SYN-385)
- Linear: SYN-385 — https://linear.app/synchronicity/issue/SYN-385/session-handoff-merge-and-clean-up-the-symmio-search-book-worktrees

## 2026-07-04 — Field Manual v2 finish + production cutover

- Created: 2026-07-04
- Handoff path: `/tmp/handoff-search-book-field-manual-v2-cutover-20260704.md`
- Focus: Drive Field Manual v2 from "complete on `feat/field-manual-v2`, awaiting operator sign-off (SYN-358)" to live in production: facilitate sign-off, retire old index.html, merge to main, prep the SYN-359 cutover push-button, and file the operator gates (SYN-281 VPS env incl. new admin token, SYN-285 DNS/route).
- Summary: v2 complete + audited at head `aaf9060` (worktree `~/projects/symmio-search-book-v2`): all 9 milestones plus operator rounds SYN-360/361/362/364; Playwright 19/19; verify + smokes green; public surface = §00 + reader pages, ops views admin-gated, post-vote dialog shipped. Parked: SYN-363 (v2.1 redesigns), SYN-365 (v3 Wikipedia-clone idea). Main clone dirty with another agent's reorg — worktree only.
- Receiving agent: agent-fable-4 (pull via kickoff prompt in SYN-366)
- Linear: SYN-366 — https://linear.app/synchronicity/issue/SYN-366/session-handoff-finish-field-manual-v2-production-cutover

## 2026-07-02 — Search Book production finalization (every pre-VPS gap)

- Created: 2026-07-02
- Handoff path: `/tmp/handoff-search-book-prod-finalization-20260702.md`
- Focus: Finish everything automatable before the VPS deployment: checkpoint the staged advice-disclaimer work, resolve SYN-301 gap events, make the sensitive-pattern scan fail-closed, refresh launch/release/static evidence, final verify sweep — so only operator items #11 (SYN-281) and #4 (SYN-285) remain.
- Summary: Post-audit finalization sweep. All claims reproduced locally on 2026-07-02 (verify green, live eval 44/44); working tree holds the verified answered-with-disclaimer change awaiting checkpoint. Codex agent (SYN-292) pushes to main concurrently.
- Receiving agent: Claude Fable 5 worker (pull via kickoff prompt in SYN-304)
- Linear: SYN-304 — https://linear.app/synchronicity/issue/SYN-304/search-book-production-finalization-complete-every-pre-vps-gap-so

## 2026-07-02 — Search Book undocumented-fact gap events

- Created: 2026-07-02
- Handoff path: `/tmp/handoff-search-book-unanswered-fact-gap-events-20260702.md`
- Focus: LLM answers for facts absent from the corpus return status `answered` with no gap event; the living-docs loop loses the missing-fact demand signal. Implement fact-coverage self-report → typed gap event (or refusal), eval fixtures, evidence reconciliation.
- Summary: Found in the 2026-07-02 local audit (SYMM-address repro). Extractive off-corpus lane gaps correctly; the LLM synthesis lane leaks. Recommendation: answer honestly + create gap event, consistent with the answer-with-disclaimer advice-lane decision.
- Receiving agent: unassigned (pull via kickoff prompt in SYN-301)
- Linear: SYN-301 — https://linear.app/synchronicity/issue/SYN-301/search-book-llm-answers-for-undocumented-facts-skip-gap-events-capture

## 2026-07-02 — Search Book production-readiness blockers/gaps

- Created: 2026-07-02
- Handoff path: `/tmp/handoff-search-book-production-readiness-20260702.md`
- Focus: Delegate remaining Search Book production readiness work: production VPS env install (#11/SYN-281), public frontend/deploy route (#4/SYN-285), and final production evidence.
- Summary: Search Book is preview-ready with source ingestion 17/17, 794 manifest pages, 801 authored pages, 890 exact routes, local/live LLM eval evidence, local living-docs service boundary, and quality 29/30. Production remains open only on OPERATOR-INBOX #11 and #4; Discord/Notion/SSHE/whitepaper/source blockers are resolved for v1 and must not be reopened.
- Receiving agent: Search Book production-readiness agent
- Linear: SYN-292 — https://linear.app/synchronicity/issue/SYN-292/search-book-production-readiness-handoff-remaining-blockers-and-gaps
