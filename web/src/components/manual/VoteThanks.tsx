import { useEffect, useRef, useState } from 'react'
import { Kicker } from './Kicker'

export interface VoteThanksProps {
  open: boolean
  /** Seconds before the dialog auto-closes (operator spec: 5). */
  seconds?: number
  /** ASK NEXT QUESTION — caller clears the answer and refocuses the ask field. */
  onAskNext: () => void
  /** Countdown end / backdrop / Escape. Caller decides whether the answer stays. */
  onClose: () => void
}

/**
 * Post-vote thank-you dialog (SYN-364, operator amendment to DESIGN.MD §8):
 * confirms the logged rating, counts down from `seconds` in mono, auto-closes
 * at zero, and offers ASK NEXT QUESTION to close immediately.
 */
export function VoteThanks({ open, seconds = 5, onAskNext, onClose }: VoteThanksProps) {
  const [left, setLeft] = useState(seconds)
  // Ref'd so parent re-renders (new handler identities) can't reset the countdown.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    setLeft(seconds)
    const iv = setInterval(() => setLeft((s) => s - 1), 1000)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearInterval(iv)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, seconds])

  useEffect(() => {
    if (open && left <= 0) onCloseRef.current()
  }, [open, left])

  if (!open) return null

  return (
    <div
      onClick={onClose}
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
        role="dialog"
        aria-modal="true"
        aria-label="Rating logged — thank you"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'color-mix(in srgb,var(--paper) 55%,#16276e)',
          border: '2px solid #2e6bff',
          boxShadow: '0 6px 0 rgba(0,0,0,0.45),0 28px 70px rgba(0,0,0,0.55)',
          maxWidth: 460,
          width: '100%',
          padding: '26px 28px 24px',
        }}
      >
        <Kicker size={11} tracking={2.5} style={{ marginBottom: 10 }}>
          THANK YOU —
        </Kicker>
        <h3
          style={{
            margin: '0 0 8px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 21,
            letterSpacing: -0.4,
            color: '#ffffff',
          }}
        >
          Logged — your rating is in.
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.65, color: '#d3dbff' }}>
          Every rating routes straight back into the manual&rsquo;s index and sharpens the next
          answer.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={onAskNext}
            style={{
              background: 'var(--ink)',
              color: '#ffffff',
              border: '2px solid var(--ink)',
              boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
              padding: '12px 18px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1.5,
              cursor: 'pointer',
            }}
          >
            ASK NEXT QUESTION
          </button>
          <span
            data-thanks-countdown=""
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              letterSpacing: 1.5,
              color: '#8fa0d8',
            }}
          >
            AUTO-CLOSING IN {Math.max(left, 0)}s
          </span>
        </div>
      </div>
    </div>
  )
}
