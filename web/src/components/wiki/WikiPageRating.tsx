/**
 * Page vote in the wiki register (SYN-369): flat link-blue buttons, optimistic
 * one-shot lock, ✓ confirmation, inline error on revert — same /page-feedback
 * parity behavior as the v2 RatingButtons (parity-checklist §5/§6), no chroma
 * beyond link blue. Counts (favorites QA round): running Yes/No tallies from
 * /page-stats render in brackets, YouTube-style.
 */
import type { VoteState } from '@/app/useVote'
import type { PageUsefulCounts } from '@/lib/pageStats'

export function WikiPageRating({
  state,
  onRate,
  counts = null,
}: {
  state: VoteState & { vote: (dir: 'up' | 'down') => Promise<boolean> }
  onRate?: (dir: 'up' | 'down') => void
  /** Global useful-vote tallies; null until loaded → plain Yes · No. */
  counts?: PageUsefulCounts | null
}) {
  const rate = (dir: 'up' | 'down') => {
    if (onRate) onRate(dir)
    else void state.vote(dir)
  }
  const tally = (n: number) => (counts ? ` (${n})` : '')
  return (
    <div className="wk-pagerate" data-testid="wk-pagerate">
      {state.locked ? (
        <span className="wk-pagerate-done">
          ✓ logged — thank you
          {counts ? ` · Yes (${counts.yes}) · No (${counts.no})` : ''}
        </span>
      ) : (
        <>
          Was this page useful?{' '}
          <button type="button" onClick={() => rate('up')} disabled={state.rating !== null}>
            {state.rating === 'up' ? 'Yes…' : `Yes${tally(counts?.yes ?? 0)}`}
          </button>
          {' · '}
          <button type="button" onClick={() => rate('down')} disabled={state.rating !== null}>
            {state.rating === 'down' ? 'No…' : `No${tally(counts?.no ?? 0)}`}
          </button>
          {state.error && <span> — {state.error}</span>}
        </>
      )}
    </div>
  )
}
