import { FigurePlate } from '../FigurePlate'

export interface LifecycleStep {
  label: string
  sub: string
  /** Solid-blue emphasized step (the auction). */
  emphasized?: boolean
  flex?: number
}

const DEFAULT_STEPS: LifecycleStep[] = [
  { label: 'INTENT', sub: 'signed by you' },
  { label: 'SOLVER AUCTION', sub: 'best bid wins', emphasized: true, flex: 1.3 },
  { label: 'SETTLEMENT', sub: 'on-chain finality' },
]

/** FIG_041 intent lifecycle (DESIGN.MD §6): hard-shadow boxes joined by ink mono arrows. */
export function FigIntentLifecycle({
  steps = DEFAULT_STEPS,
  footnote = 'Counter advances only after SETTLEMENT reaches finality.',
}: {
  steps?: LifecycleStep[]
  footnote?: string
}) {
  return (
    <FigurePlate fig="FIG_041 — INTENT LIFECYCLE" maxWidth={880} padding="34px 40px 34px" footnote={footnote}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 20, flexWrap: 'nowrap' }}>
        {steps.map((s, i) => (
          <span key={s.label} style={{ display: 'contents' }}>
            {i > 0 && (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--ink)',
                  padding: '0 14px',
                  fontSize: 16,
                }}
              >
                →
              </div>
            )}
            <div
              style={{
                flex: s.flex ?? 1,
                border: s.emphasized ? '2px solid #2e6bff' : '2px solid rgba(255,255,255,0.3)',
                background: s.emphasized
                  ? '#2e6bff'
                  : 'color-mix(in srgb,var(--paper) 70%,#2e6bff)',
                boxShadow: s.emphasized
                  ? '0 4px 0 rgba(0,0,0,0.45)'
                  : '0 4px 0 rgba(0,0,0,0.4)',
                padding: '20px 12px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: '#ffffff',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: s.emphasized ? 'rgba(255,255,255,0.85)' : '#aebaf0',
                  marginTop: 6,
                }}
              >
                {s.sub}
              </div>
            </div>
          </span>
        ))}
      </div>
    </FigurePlate>
  )
}
