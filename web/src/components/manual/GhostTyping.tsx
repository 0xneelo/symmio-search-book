import type { CSSProperties } from 'react'

/**
 * Cross-field ghost (DESIGN.MD §5): while another ask-field owns the shared
 * query, this overlay shows animated "typing into another…" dots.
 */
export function GhostTyping({
  visible,
  fontSize = 11,
  style,
}: {
  visible: boolean
  fontSize?: number
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        display: visible ? 'flex' : 'none',
        position: 'absolute',
        inset: '1px 0 1px 1px',
        alignItems: 'center',
        padding: '0 10px',
        pointerEvents: 'none',
        fontFamily: 'var(--font-sans)',
        fontSize,
        color: '#5f6cb0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        ...style,
      }}
    >
      typing into another<span className="tdot">.</span>
      <span className="tdot" style={{ animationDelay: '.2s' }}>
        .
      </span>
      <span className="tdot" style={{ animationDelay: '.4s' }}>
        .
      </span>
    </span>
  )
}
