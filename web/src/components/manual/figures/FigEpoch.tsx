import { FigurePlate } from '../FigurePlate'

export interface EpochNode {
  label: string
  /** Solid ink node (the CLOSE 00:00 UTC moment). */
  accent?: boolean
  /** Relative width of the segment this node anchors. */
  flex?: number
}

const DEFAULT_NODES: EpochNode[] = [
  { label: 'OPEN' },
  { label: 'ACCRUE VOLUME', flex: 2 },
  { label: 'CLOSE 00:00 UTC', accent: true },
  { label: 'FINALIZE' },
]

/** FIG_010 epoch timeline (DESIGN.MD §6): circle nodes on a rule; accent node solid ink. */
export function FigEpoch({
  nodes = DEFAULT_NODES,
  footnote = 'Provisional balances revise until CLOSE; they are immutable after FINALIZE.',
}: {
  nodes?: EpochNode[]
  footnote?: string
}) {
  return (
    <FigurePlate fig="FIG_010 — THE EPOCH" maxWidth={880} style={{ marginTop: 40 }} footnote={footnote}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 0,
          marginTop: 18,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 18,
            height: 1.5,
            background: 'rgba(255,255,255,0.5)',
          }}
        />
        {nodes.map((n) => (
          <div
            key={n.label}
            style={{
              position: 'relative',
              flex: n.flex ?? 1,
              textAlign: 'center',
              paddingBottom: 30,
            }}
          >
            {/* The only sanctioned circles: timeline nodes are geometry, not chrome. */}
            <div
              data-round=""
              style={{
                width: 13,
                height: 13,
                border: n.accent ? '2px solid var(--ink)' : '2px solid #7ea0ff',
                background: n.accent ? 'var(--ink)' : 'var(--paper)',
                borderRadius: '50%',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: n.accent ? 700 : 400,
                color: n.accent ? 'var(--ink)' : '#cdd8ff',
                marginTop: 14,
              }}
            >
              {n.label}
            </div>
          </div>
        ))}
      </div>
    </FigurePlate>
  )
}
