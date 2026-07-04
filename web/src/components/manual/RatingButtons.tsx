import type { CSSProperties } from 'react'
import { ThumbIcon } from './ThumbIcon'

export type Rating = 'up' | 'down' | null

export interface RatingButtonsProps {
  rating: Rating
  onRate: (dir: 'up' | 'down') => void
  /** Renders the DISMISS × control on the right when provided. */
  onDismiss?: () => void
  /** One-shot lock: after a vote the buttons stop accepting input. */
  locked?: boolean
  /** Inline error shown when a vote failed to persist (state already reverted). */
  error?: string | null
  style?: CSSProperties
}

const baseBtn: CSSProperties = {
  boxShadow: '0 4px 0 rgba(0,0,0,0.45)',
  fontFamily: 'var(--font-sans)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
  cursor: 'pointer',
  transition: 'all .12s',
  display: 'flex',
  alignItems: 'center',
  gap: 9,
}

/**
 * DESIGN.MD §5 rating row: primary USEFUL (solid ink, presses down on hover),
 * secondary NEEDS WORK (outlined, fills ink on hover). Selected state inverts
 * to white/navy; hovering/selecting one makes the other recede (.raterow CSS).
 */
export function RatingButtons({
  rating,
  onRate,
  onDismiss,
  locked = false,
  error = null,
  style,
}: RatingButtonsProps) {
  const disabled = locked || rating !== null
  return (
    <div
      className="raterow"
      style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', ...style }}
    >
      <button
        type="button"
        className={disabled ? undefined : 'rdown'}
        onClick={() => !disabled && onRate('down')}
        aria-pressed={rating === 'down'}
        style={{
          ...baseBtn,
          background: rating === 'down' ? '#ffffff' : 'transparent',
          color: rating === 'down' ? '#0a1440' : '#ffffff',
          border: '2px solid rgba(255,255,255,0.4)',
          padding: '10px 16px',
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <ThumbIcon down />
        NEEDS WORK
      </button>
      <button
        type="button"
        className={disabled ? undefined : 'rup'}
        onClick={() => !disabled && onRate('up')}
        aria-pressed={rating === 'up'}
        style={{
          ...baseBtn,
          background: rating === 'up' ? '#ffffff' : 'var(--ink)',
          color: rating === 'up' ? '#0a1440' : '#fff',
          border: 'none',
          padding: '12px 16px',
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <ThumbIcon />
        USEFUL
      </button>
      {rating !== null && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 11.5,
            color: 'var(--ink)',
          }}
        >
          ✓ logged — thank you
        </span>
      )}
      {error && (
        <span
          role="alert"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#ff8aa8',
            letterSpacing: 0.3,
          }}
        >
          {error}
        </span>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: 0.5,
            padding: '7px 6px',
            cursor: 'pointer',
            color: '#8fa0d8',
            marginLeft: 'auto',
          }}
        >
          DISMISS ×
        </button>
      )}
    </div>
  )
}
