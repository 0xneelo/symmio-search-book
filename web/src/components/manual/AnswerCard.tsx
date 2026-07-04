import type { ReactNode } from 'react'
import { Kicker } from './Kicker'

export interface AnswerCardProps {
  /** Mono metadata, left side of the header row, e.g. "routed answer / score question-route:118". */
  meta: string
  /** Mono tag on the right of the header row. */
  figTag?: string
  title: string
  body: ReactNode
  /** Boxed mono source tag, e.g. "vibe-manual / §02 referrals". */
  source?: string
  confidence?: string
  /** Rating row (RatingButtons) rendered under the divider. */
  rating?: ReactNode
}

/** Answer card (DESIGN.MD §5): 2px white/22 border on tinted navy, mono metadata header. */
export function AnswerCard({
  meta,
  figTag = 'FIG.ANS',
  title,
  body,
  source,
  confidence,
  rating,
}: AnswerCardProps) {
  return (
    <div
      data-answer=""
      style={{
        border: '2px solid rgba(255,255,255,0.22)',
        background: 'color-mix(in srgb,var(--paper) 55%,#16276e)',
        marginTop: 18,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
          padding: '9px 16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            letterSpacing: 1,
            color: '#8fa0d8',
          }}
        >
          {meta}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            letterSpacing: 1,
            color: 'var(--ink)',
          }}
        >
          {figTag}
        </span>
      </div>
      <div style={{ padding: '18px 20px 20px' }}>
        <h3
          style={{
            margin: '0 0 12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: -0.3,
            color: '#ffffff',
          }}
        >
          {title}
        </h3>
        <div
          style={{
            margin: '0 0 16px',
            fontSize: 14.5,
            lineHeight: 1.7,
            color: '#d3dbff',
          }}
        >
          {body}
        </div>
        {(source || confidence) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              marginBottom: rating ? 16 : 0,
            }}
          >
            {source && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  border: '1px solid rgba(255,255,255,0.28)',
                  padding: '4px 11px',
                  color: '#cdd8ff',
                }}
              >
                {source}
              </span>
            )}
            {confidence && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: '#8fa0d8',
                }}
              >
                confidence {confidence}
              </span>
            )}
          </div>
        )}
        {rating && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 14 }}>
            <Kicker size={11} tracking={2.5} style={{ marginBottom: 10 }}>
              RATE THIS ANSWER
            </Kicker>
            {rating}
          </div>
        )}
      </div>
    </div>
  )
}
