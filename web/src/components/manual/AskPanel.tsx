import type { FormEvent, ReactNode } from 'react'
import { Kicker } from './Kicker'
import { GhostTyping } from './GhostTyping'
import { Chip } from './Chip'

export interface AskPanelProps {
  query: string
  onQuery: (v: string) => void
  onSubmit: () => void
  onFocus?: () => void
  onBlur?: () => void
  /** Cross-field ghost: another ask-field owns the shared query. */
  ghost?: boolean
  placeholder?: string
  subtitle?: string
  /** Suggested-question chips. */
  chips?: { label: string; onClick: () => void }[]
  /** When answered, the form/chips hide and the echoed question + answer show instead. */
  answered?: boolean
  /** The asked question, echoed above the answer. */
  echoedQuery?: string
  /** AnswerCard (with rating row) rendered when answered. */
  answer?: ReactNode
}

/** Cover "Ask the Manual" panel (DESIGN.MD §5): 2px blueprint border, tinted navy, hard shadow. */
export function AskPanel({
  query,
  onQuery,
  onSubmit,
  onFocus,
  onBlur,
  ghost = false,
  placeholder = 'Ask anything — points, invites, revenue, payouts…',
  subtitle = 'Routes your question to the nearest indexed figure.',
  chips = [],
  answered = false,
  echoedQuery,
  answer,
}: AskPanelProps) {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <div
      style={{
        padding: '34px 34px 30px',
        border: '2px solid #2e6bff',
        background: 'color-mix(in srgb,var(--paper) 62%,#12246e)',
        boxShadow: '0 6px 0 rgba(0,0,0,0.4)',
      }}
    >
      <Kicker size={14} tracking={3} style={{ marginBottom: 6 }}>
        ASK THE MANUAL
      </Kicker>
      {!answered && (
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12.5,
            color: '#8fa0d8',
            marginBottom: 18,
          }}
        >
          {subtitle}
        </div>
      )}
      {answered && (
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12.5,
            color: '#c9d4ff',
            marginBottom: 16,
          }}
        >
          Q — &ldquo;{echoedQuery}&rdquo;
        </div>
      )}
      {!answered && (
        <>
          <form
            onSubmit={submit}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid rgba(255,255,255,0.3)',
              marginBottom: 18,
              background: 'rgba(2,4,14,0.5)',
            }}
          >
            <span
              style={{
                padding: '0 16px',
                color: 'var(--ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: 18,
              }}
            >
              /
            </span>
            <span style={{ flex: 1, position: 'relative', display: 'flex' }}>
              <input
                className="askinput"
                value={ghost ? '' : query}
                onChange={(e) => onQuery(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={ghost ? '' : placeholder}
                style={{
                  flex: 1,
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '18px 6px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  color: '#f2f4ff',
                  outline: 'none',
                }}
              />
              <GhostTyping
                visible={ghost}
                fontSize={13.5}
                style={{ inset: 0, padding: '0 6px' }}
              />
            </span>
            <button
              type="submit"
              aria-label="Ask"
              style={{
                background: 'var(--ink)',
                border: 'none',
                color: '#fff',
                alignSelf: 'stretch',
                width: 60,
                cursor: 'pointer',
                fontSize: 20,
              }}
            >
              →
            </button>
          </form>
          {chips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 8 }}>
              {chips.map((c) => (
                <Chip key={c.label} onClick={c.onClick}>
                  {c.label}
                </Chip>
              ))}
            </div>
          )}
        </>
      )}
      {answered && answer}
    </div>
  )
}
