import type { ReactNode } from 'react'

/** Suggested-question chip: transparent, 2px blueprint border, inverts to ink on hover. */
export function Chip({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className="chip"
      onClick={onClick}
      style={{
        background: 'transparent',
        border: '2px solid #2e6bff',
        color: '#cdd8ff',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 12,
        padding: '8px 14px',
        cursor: 'pointer',
        transition: 'all .12s',
      }}
    >
      {children}
    </button>
  )
}
