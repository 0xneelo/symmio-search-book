import type { ReactNode } from 'react'

/**
 * Chapter prose (DESIGN.MD §4): 2-column flow, 46px gap, max 880px.
 * Give the first <p> className="dropcap" for the ink drop cap.
 */
export function ProseColumns({
  children,
  maxWidth = 880,
  marginBottom,
}: {
  children: ReactNode
  maxWidth?: number
  marginBottom?: number
}) {
  return (
    <div style={{ columns: 2, columnGap: 46, maxWidth, marginBottom }}>{children}</div>
  )
}

/** Body paragraph matching the comp: 15.5px / 1.75. */
export function Prose({
  children,
  dropcap = false,
  last = false,
}: {
  children: ReactNode
  dropcap?: boolean
  last?: boolean
}) {
  return (
    <p
      className={dropcap ? 'dropcap' : undefined}
      style={{
        margin: last ? 0 : '0 0 16px',
        fontSize: 15.5,
        lineHeight: 1.75,
        color: '#d3dbff',
      }}
    >
      {children}
    </p>
  )
}
