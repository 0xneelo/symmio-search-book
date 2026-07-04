/**
 * Page vote in the wiki register (SYN-369): flat link-blue buttons, optimistic
 * one-shot lock, ✓ confirmation, inline error on revert — same /page-feedback
 * parity behavior as the v2 RatingButtons (parity-checklist §5/§6), no chroma
 * beyond link blue.
 */
import type { VoteState } from '@/app/useVote'

export function WikiPageRating({
  state,
  onRate,
}: {
  state: VoteState & { vote: (dir: 'up' | 'down') => Promise<boolean> }
  onRate?: (dir: 'up' | 'down') => void
}) {
  const rate = (dir: 'up' | 'down') => {
    if (onRate) onRate(dir)
    else void state.vote(dir)
  }
  return (
    <div className="wk-pagerate" data-testid="wk-pagerate">
      {state.locked ? (
        <span className="wk-pagerate-done">✓ logged — thank you</span>
      ) : (
        <>
          Was this page useful?{' '}
          <button type="button" onClick={() => rate('up')} disabled={state.rating !== null}>
            {state.rating === 'up' ? 'Yes…' : 'Yes'}
          </button>
          {' · '}
          <button type="button" onClick={() => rate('down')} disabled={state.rating !== null}>
            {state.rating === 'down' ? 'No…' : 'No'}
          </button>
          {state.error && <span> — {state.error}</span>}
        </>
      )}
    </div>
  )
}
