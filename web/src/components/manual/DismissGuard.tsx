import { useEffect } from 'react'
import { Kicker } from './Kicker'
import { RatingButtons, type Rating } from './RatingButtons'

export interface DismissGuardProps {
  open: boolean
  rating: Rating
  /** Rating from the modal; caller should auto-dismiss the answer after 850ms (DESIGN.MD §8). */
  onRate: (dir: 'up' | 'down') => void
  /** Backdrop click / Escape — keeps the answer. */
  onCancel: () => void
  /** The underlined escape hatch — dismisses without rating. */
  onDismiss: () => void
}

/**
 * Dismiss-guard modal (DESIGN.MD §5): dismissing an unrated answer opens a
 * centered "HOLD ON —" dialog re-offering the rating.
 */
export function DismissGuard({ open, rating, onRate, onCancel, onDismiss }: DismissGuardProps) {
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
    <div
      onClick={onCancel}
      style={{
        display: 'flex',
        position: 'fixed',
        inset: 0,
        background: 'rgba(2,4,14,0.7)',
        zIndex: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        data-answer=""
        role="dialog"
        aria-modal="true"
        aria-label="Dismiss without rating?"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'color-mix(in srgb,var(--paper) 55%,#16276e)',
          border: '2px solid #2e6bff',
          boxShadow: '0 6px 0 rgba(0,0,0,0.45),0 28px 70px rgba(0,0,0,0.55)',
          maxWidth: 540,
          width: '100%',
          padding: '26px 28px 22px',
        }}
      >
        <Kicker size={11} tracking={2.5} style={{ marginBottom: 10 }}>
          HOLD ON —
        </Kicker>
        <h3
          style={{
            margin: '0 0 10px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 21,
            letterSpacing: -0.4,
            color: '#ffffff',
          }}
        >
          Dismiss without rating?
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.65, color: '#d3dbff' }}>
          Ratings route straight back into the manual&rsquo;s index and genuinely improve answer
          quality — one click really helps us.
        </p>
        <Kicker size={10.5} tracking={2.5} style={{ marginBottom: 10 }}>
          RATE NOW
        </Kicker>
        <RatingButtons rating={rating} onRate={onRate} style={{ marginBottom: 18 }} />
        <button
          type="button"
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            color: '#aebaf0',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          No, I really just want to dismiss this answer.
        </button>
      </div>
    </div>
  )
}
