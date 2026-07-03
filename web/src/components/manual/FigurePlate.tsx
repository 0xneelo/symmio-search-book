import type { CSSProperties, ReactNode } from 'react'

export interface FigurePlateProps {
  /** Corner label, e.g. "FIG_001" or "FIG_010 — THE EPOCH". */
  fig: string
  /** Bracketed mono tag rendered top-right, e.g. "[ VIBE NETWORK STACK ]". */
  tag?: string
  /** Mono caption/footnote below the figure body. */
  footnote?: ReactNode
  maxWidth?: number | string
  padding?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * The signature element (DESIGN.MD §5): dashed 1.5px border, 22×22 graph-paper
 * grid from --gridc, mono corner labels. All diagrams live in plates.
 */
export function FigurePlate({
  fig,
  tag,
  footnote,
  maxWidth,
  padding = '34px 40px 30px',
  style,
  children,
}: FigurePlateProps) {
  return (
    <div
      style={{
        position: 'relative',
        border: '1.5px dashed rgba(255,255,255,0.3)',
        backgroundImage:
          'linear-gradient(var(--gridc) 1px,transparent 1px),linear-gradient(90deg,var(--gridc) 1px,transparent 1px)',
        backgroundSize: '22px 22px',
        padding,
        maxWidth,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 2,
          color: '#8fa0d8',
        }}
      >
        {fig}
      </div>
      {tag && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 2,
            color: '#5f6cb0',
          }}
        >
          {tag}
        </div>
      )}
      {children}
      {footnote && (
        <p
          style={{
            margin: '22px 0 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#8fa0d8',
            letterSpacing: 0.3,
          }}
        >
          {footnote}
        </p>
      )}
    </div>
  )
}
