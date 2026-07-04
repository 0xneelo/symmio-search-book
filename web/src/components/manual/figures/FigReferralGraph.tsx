import { FigurePlate } from '../FigurePlate'

/**
 * FIG_021 referral graph (DESIGN.MD §6): YOU (ink, 30r) ← L1 (24r) ← L2 (20r),
 * dashed ink edges, +pts labels, pulse dots flowing inward (rgFlow).
 */
export function FigReferralGraph({
  footnote = 'L1 direct invitees · L2 second-hop · points attenuate per hop',
}: {
  footnote?: string
}) {
  return (
    <FigurePlate fig="FIG_021 — REFERRAL GRAPH" padding="26px 8px 18px">
      <svg
        viewBox="0 0 540 440"
        style={{ display: 'block', width: '100%', margin: '14px auto 0', overflow: 'visible' }}
      >
        <g style={{ stroke: 'var(--ink)' }} strokeWidth="1.4" strokeDasharray="3 4" fill="none">
          <line x1="90" y1="220" x2="250" y2="100" />
          <line x1="90" y1="220" x2="250" y2="220" />
          <line x1="90" y1="220" x2="250" y2="340" />
          <line x1="250" y1="100" x2="440" y2="142" />
          <line x1="250" y1="340" x2="440" y2="298" />
        </g>
        <g fontFamily="'Space Mono',monospace" fontSize="10" style={{ fill: 'var(--ink)' }}>
          <text x="168" y="150" textAnchor="middle">
            +pts
          </text>
          <text x="172" y="200" textAnchor="middle">
            +pts
          </text>
          <text x="168" y="298" textAnchor="middle">
            +pts
          </text>
        </g>
        <g>
          <circle
            cx="440"
            cy="142"
            r="20"
            style={{ fill: 'color-mix(in srgb,var(--paper) 68%,#2e6bff)', stroke: '#7ea0ff' }}
            strokeWidth="1.6"
          />
          <text x="440" y="146" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="10" fill="#cdd8ff">
            L2
          </text>
          <circle
            cx="440"
            cy="298"
            r="20"
            style={{ fill: 'color-mix(in srgb,var(--paper) 68%,#2e6bff)', stroke: '#7ea0ff' }}
            strokeWidth="1.6"
          />
          <text x="440" y="302" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="10" fill="#cdd8ff">
            L2
          </text>
          <circle
            cx="250"
            cy="100"
            r="24"
            style={{ fill: 'color-mix(in srgb,var(--paper) 55%,#2e6bff)', stroke: '#7ea0ff' }}
            strokeWidth="2"
          />
          <text x="250" y="104" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="11" fill="#ffffff">
            L1
          </text>
          <circle
            cx="250"
            cy="220"
            r="24"
            style={{ fill: 'color-mix(in srgb,var(--paper) 55%,#2e6bff)', stroke: '#7ea0ff' }}
            strokeWidth="2"
          />
          <text x="250" y="224" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="11" fill="#ffffff">
            L1
          </text>
          <circle
            cx="250"
            cy="340"
            r="24"
            style={{ fill: 'color-mix(in srgb,var(--paper) 55%,#2e6bff)', stroke: '#7ea0ff' }}
            strokeWidth="2"
          />
          <text x="250" y="344" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="11" fill="#ffffff">
            L1
          </text>
          <circle cx="90" cy="220" r="30" style={{ fill: 'var(--ink)', stroke: '#ffffff' }} strokeWidth="2" />
          <text
            x="90"
            y="224"
            textAnchor="middle"
            fontFamily="'Poppins',sans-serif"
            fontWeight="700"
            fontSize="11"
            fill="#fff"
          >
            YOU
          </text>
        </g>
        <circle
          className="rg-pulse"
          r="4"
          cx="250"
          cy="100"
          style={{ '--tx': '-160px', '--ty': '120px', animationDelay: '0s', fill: 'var(--ink)' } as React.CSSProperties}
        />
        <circle
          className="rg-pulse"
          r="4"
          cx="250"
          cy="220"
          style={{ '--tx': '-160px', '--ty': '0px', animationDelay: '0.3s', fill: 'var(--ink)' } as React.CSSProperties}
        />
        <circle
          className="rg-pulse"
          r="4"
          cx="250"
          cy="340"
          style={{ '--tx': '-160px', '--ty': '-120px', animationDelay: '0.6s', fill: 'var(--ink)' } as React.CSSProperties}
        />
        <circle
          className="rg-pulse"
          r="4"
          cx="440"
          cy="142"
          style={{ '--tx': '-190px', '--ty': '-42px', animationDelay: '0.15s', fill: 'var(--ink)' } as React.CSSProperties}
        />
        <circle
          className="rg-pulse"
          r="4"
          cx="440"
          cy="298"
          style={{ '--tx': '-190px', '--ty': '42px', animationDelay: '0.45s', fill: 'var(--ink)' } as React.CSSProperties}
        />
      </svg>
      <p style={{ margin: '6px 14px 4px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8fa0d8' }}>
        {footnote}
      </p>
    </FigurePlate>
  )
}
