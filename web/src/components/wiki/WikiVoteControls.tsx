/**
 * Answer-vote controls in the wiki register (SYN-370, DESIGN.MD Part A):
 * flat link-blue buttons only — no chroma, no shadows. The behavioral
 * contract is identical to the v2 RatingButtons/DismissGuard/VoteThanks set
 * (parity-checklist §5): optimistic one-shot lock, error revert, dismiss-guard
 * on unrated dismissal, post-vote thank-you dialog with a 15s countdown where
 * cancel/backdrop/Escape keep the answer readable (SYN-364).
 */
import { useEffect, useRef, useState } from 'react'
import type { VoteState } from '@/app/useVote'

export function WikiAnswerRating({
  state,
  onRate,
  onDismiss,
}: {
  state: VoteState
  onRate: (dir: 'up' | 'down') => void
  onDismiss?: () => void
}) {
  return (
    <div className="wk-answer-rate" data-testid="wk-answer-rate">
      {state.locked ? (
        <span className="wk-pagerate-done">✓ logged — thank you</span>
      ) : (
        <>
          Was this answer useful?{' '}
          <button type="button" onClick={() => onRate('up')} disabled={state.rating !== null}>
            {state.rating === 'up' ? 'Useful…' : 'Useful'}
          </button>
          {' · '}
          <button type="button" onClick={() => onRate('down')} disabled={state.rating !== null}>
            {state.rating === 'down' ? 'Needs work…' : 'Needs work'}
          </button>
          {state.error && <span className="wk-muted"> — {state.error}</span>}
        </>
      )}
      {onDismiss && (
        <>
          {' '}
          <button type="button" className="wk-answer-dismiss" onClick={onDismiss}>
            Dismiss ×
          </button>
        </>
      )}
    </div>
  )
}

export function WikiDismissGuard({
  open,
  state,
  onRate,
  onCancel,
  onDismiss,
}: {
  open: boolean
  state: VoteState
  onRate: (dir: 'up' | 'down') => void
  /** Backdrop click / Escape — keeps the answer. */
  onCancel: () => void
  /** The underlined escape hatch — dismisses without rating. */
  onDismiss: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div className="wk-modal-backdrop" onClick={onCancel}>
      <div
        className="wk-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Dismiss without rating?"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wk-modal-kicker">Hold on —</div>
        <h3>Dismiss without rating?</h3>
        <p>
          Ratings route straight back into the encyclopedia&rsquo;s index and genuinely improve
          answer quality — one click really helps.
        </p>
        <WikiAnswerRating state={state} onRate={onRate} />
        <button type="button" className="wk-modal-escape" onClick={onDismiss}>
          No, I really just want to dismiss this answer.
        </button>
      </div>
    </div>
  )
}

export function WikiVoteThanks({
  open,
  seconds = 15,
  onAskNext,
  onCancel,
  onTimeout,
}: {
  open: boolean
  /** Seconds before auto-close (operator spec: 15, for slow readers). */
  seconds?: number
  /** Ask next question — caller clears the answer and refocuses the ask field. */
  onAskNext: () => void
  /** Cancel ×, the underlined link, backdrop, or Escape — keep the answer readable. */
  onCancel: () => void
  /** Countdown reached zero — caller clears the answer back to the ask form. */
  onTimeout: () => void
}) {
  const [left, setLeft] = useState(seconds)
  // Ref'd so parent re-renders (new handler identities) can't reset the countdown.
  const onCancelRef = useRef(onCancel)
  onCancelRef.current = onCancel
  const onTimeoutRef = useRef(onTimeout)
  onTimeoutRef.current = onTimeout

  useEffect(() => {
    if (!open) return
    setLeft(seconds)
    const iv = setInterval(() => setLeft((s) => s - 1), 1000)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearInterval(iv)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, seconds])

  useEffect(() => {
    if (open && left <= 0) onTimeoutRef.current()
  }, [open, left])

  if (!open) return null
  return (
    <div className="wk-modal-backdrop" onClick={onCancel}>
      <div
        className="wk-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Rating logged — thank you"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="wk-modal-cancel" aria-label="Cancel and keep reading" onClick={onCancel}>
          Cancel ×
        </button>
        <div className="wk-modal-kicker">Thank you —</div>
        <h3>Logged — your rating is in.</h3>
        <p>Every rating routes straight back into the encyclopedia&rsquo;s index and sharpens the next answer.</p>
        <div className="wk-modal-actions">
          <button type="button" className="wk-modal-primary" onClick={onAskNext}>
            Ask next question
          </button>
          <span className="wk-muted" data-thanks-countdown="">
            auto-closing in {Math.max(left, 0)}s
          </span>
        </div>
        <button type="button" className="wk-modal-escape" onClick={onCancel}>
          Cancel — read the answer again.
        </button>
      </div>
    </div>
  )
}
