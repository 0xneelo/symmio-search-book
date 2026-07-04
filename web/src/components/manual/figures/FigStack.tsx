import { useEffect, useState } from 'react'
import { FigurePlate } from '../FigurePlate'
import { mixHex, isHex6 } from '@/lib/color'

export interface StackTile {
  name: string
  sub: string
}

const DEFAULT_TILES: StackTile[] = [
  { name: 'TRADER', sub: '01 / you, signing intents' },
  { name: 'VIBE FRONTEND', sub: '02 / what you click' },
  { name: 'REFERRAL GRAPH', sub: '03 / who brought whom' },
  { name: 'SYMM CLEARING', sub: '04 / where fills settle' },
  { name: 'SOLVER / LP', sub: '05 / best bid wins' },
  { name: 'SETTLEMENT', sub: '06 / on-chain finality' },
]

/** Reads the theme accent/paper vars once (they are static per DESIGN.MD §9). */
function themeHex(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return isHex6(v) ? v : fallback
}

/**
 * FIG_001 network stack (DESIGN.MD §6): six isometric diamond tiles on a dashed
 * baseline, auto-cycling ink highlight every 1.5s, float loop, assemble-in.
 * Static highlight under prefers-reduced-motion.
 */
export function FigStack({ tiles = DEFAULT_TILES }: { tiles?: StackTile[] }) {
  const [hl, setHl] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHl(3)
      return
    }
    const t = setInterval(() => setHl((h) => (h + 1) % tiles.length), 1500)
    return () => clearInterval(t)
  }, [tiles.length])

  const ink = themeHex('--ink', '#f04fd6')
  const paper = themeHex('--paper', '#05070f')

  const tileColors = (on: boolean) =>
    on
      ? {
          f1: mixHex(ink, '#000000', 0.3),
          f2: mixHex(ink, '#000000', 0.48),
          f3: ink,
          stroke: '#ffffff',
          sw: '2',
          nameFill: '#ffffff',
          nameW: '700',
          subFill: ink,
        }
      : {
          f1: mixHex(paper, '#2e6bff', 0.2),
          f2: mixHex(paper, '#2e6bff', 0.12),
          f3: mixHex(paper, '#2e6bff', 0.36),
          stroke: '#7ea0ff',
          sw: '1.6',
          nameFill: '#aebaf0',
          nameW: '400',
          subFill: '#6f7fc9',
        }

  return (
    <FigurePlate
      fig="FIG_001"
      tag="[ VIBE NETWORK STACK ]"
      padding="44px 28px 34px"
      style={{ marginTop: 40, overflow: 'hidden' }}
    >
      <svg viewBox="0 0 1560 400" style={{ display: 'block', width: '100%', margin: '0 auto', overflow: 'visible' }}>
        <line
          x1="60"
          y1="230"
          x2="1500"
          y2="230"
          style={{ stroke: 'var(--ink)' }}
          strokeWidth="1"
          strokeDasharray="2 5"
          opacity="0.4"
        />
        {tiles.map((tile, i) => {
          const c = tileColors(hl === i)
          // Tile i occupies a 176px-wide diamond starting at x = 52 + 256*i (from the comp).
          const x = 52 + 256 * i
          const cx = x + 88
          return (
            <g key={tile.name} className="stk-layer" style={{ animationDelay: `${0.26 + i * 0.095}s` }}>
              <g className="stk-float" style={{ animationDelay: `${i * 0.4}s` }}>
                <path
                  className="stk-face"
                  d={`M${x},230 L${cx},276 L${cx},292 L${x},246 Z`}
                  fill={c.f1}
                  stroke={c.stroke}
                  strokeWidth={c.sw}
                  strokeLinejoin="round"
                />
                <path
                  className="stk-face"
                  d={`M${x + 176},230 L${cx},276 L${cx},292 L${x + 176},246 Z`}
                  fill={c.f2}
                  stroke={c.stroke}
                  strokeWidth={c.sw}
                  strokeLinejoin="round"
                />
                <path
                  className="stk-face"
                  d={`M${cx},184 L${x + 176},230 L${cx},276 L${x},230 Z`}
                  fill={c.f3}
                  stroke={c.stroke}
                  strokeWidth={c.sw}
                  strokeLinejoin="round"
                />
              </g>
              <circle cx={cx} cy="230" r="3" style={{ fill: 'var(--ink)' }} />
              <text
                className="stk-lname"
                x={cx}
                y="150"
                textAnchor="middle"
                fontFamily="'Poppins',sans-serif"
                fontSize="14"
                fontWeight={c.nameW}
                fill={c.nameFill}
              >
                {tile.name}
              </text>
              <text
                className="stk-lsub"
                x={cx}
                y="332"
                textAnchor="middle"
                fontFamily="'Space Mono',monospace"
                fontSize="12"
                fill={c.subFill}
              >
                {tile.sub}
              </text>
            </g>
          )
        })}
      </svg>
    </FigurePlate>
  )
}
