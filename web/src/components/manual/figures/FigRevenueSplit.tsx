import type { ReactNode } from 'react'
import { FigurePlate } from '../FigurePlate'

export interface SplitSegment {
  label: string
  /** Relative share — used as flex weight. */
  share: number
  /** hatched = de-emphasized; ink = where value lands; blue = structural. */
  fill: 'hatched' | 'ink' | 'blue'
}

const DEFAULT_SEGMENTS: SplitSegment[] = [
  { label: 'PROTOCOL OPS', share: 34, fill: 'hatched' },
  { label: 'NETWORK REVENUE POOL', share: 30, fill: 'ink' },
  { label: 'REFERRER SHARE', share: 22, fill: 'blue' },
  { label: 'TRADER REBATE', share: 14, fill: 'hatched' },
]

const HATCH = 'repeating-linear-gradient(45deg,rgba(255,255,255,0.12) 0 1px,transparent 1px 8px)'

/** FIG_031 revenue split (DESIGN.MD §6): hatched gross bar → proportional segments → mono formula. */
export function FigRevenueSplit({
  segments = DEFAULT_SEGMENTS,
  grossLabel = 'GROSS TRADING FEE  /  100%',
  formula,
  formulaNote = 'Pool share is tier-weighted; settled fills only. Proportions illustrative.',
}: {
  segments?: SplitSegment[]
  grossLabel?: string
  formula?: ReactNode
  formulaNote?: string
}) {
  return (
    <FigurePlate fig="FIG_031 — NETWORK REVENUE SPLIT" maxWidth={980}>
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          height: 42,
          border: '2px solid rgba(255,255,255,0.35)',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'repeating-linear-gradient(45deg,rgba(255,255,255,0.14) 0 1px,transparent 1px 8px)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: 1,
            color: '#ffffff',
            background: 'var(--paper)',
            padding: '2px 12px',
          }}
        >
          {grossLabel}
        </span>
      </div>
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          color: '#8fa0d8',
          margin: '6px 0',
        }}
      >
        ↓
      </div>
      <div style={{ display: 'flex', border: '2px solid rgba(255,255,255,0.35)' }}>
        {segments.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: `${s.share} 1 0`,
              minHeight: 64,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 8,
              borderRight: i < segments.length - 1 ? '2px solid rgba(255,255,255,0.35)' : undefined,
              background: s.fill === 'ink' ? 'var(--ink)' : s.fill === 'blue' ? '#2e6bff' : undefined,
              backgroundImage: s.fill === 'hatched' ? HATCH : undefined,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: '#ffffff',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
      {(formula || formulaNote) && (
        <div style={{ marginTop: 26, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
          {formula && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                letterSpacing: 0.3,
                color: '#ffffff',
              }}
            >
              {formula}
            </div>
          )}
          {formulaNote && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8fa0d8', marginTop: 10 }}>
              {formulaNote}
            </div>
          )}
        </div>
      )}
    </FigurePlate>
  )
}
