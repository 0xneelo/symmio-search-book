import type { CSSProperties, ReactNode } from 'react'

/** Uppercase kicker label: Poppins 700, wide tracking, ink by default. */
export function Kicker({
  children,
  color = 'var(--ink)',
  size = 11,
  tracking = 2.5,
  style,
}: {
  children: ReactNode
  color?: string
  size?: number
  tracking?: number
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: size,
        letterSpacing: tracking,
        color,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
