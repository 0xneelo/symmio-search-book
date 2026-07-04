import type { CSSProperties, FormEvent } from 'react'
import { GhostTyping } from './GhostTyping'

export interface AskFieldProps {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  /** Show the cross-field ghost instead of the value (another field owns the query). */
  ghost?: boolean
  inputWidth?: number | string
  buttonSize?: number
  ariaLabel?: string
  style?: CSSProperties
}

/** Compact fused ask-field: square input + magenta submit (sidebar/top-bar variant). */
export function AskField({
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  placeholder,
  ghost = false,
  inputWidth = 248,
  buttonSize = 34,
  ariaLabel = 'Ask',
  style,
}: AskFieldProps) {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', gap: 0, ...style }}>
      <span style={{ position: 'relative', display: 'flex' }}>
        <input
          className="askinput"
          value={ghost ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={ghost ? '' : placeholder}
          style={{
            width: inputWidth,
            background: 'rgba(2,4,14,0.55)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRight: 'none',
            padding: '7px 12px',
            fontFamily: 'var(--font-sans)',
            fontSize: 12.5,
            color: '#f2f4ff',
            outline: 'none',
          }}
        />
        <GhostTyping visible={ghost} fontSize={11.5} style={{ padding: '0 12px' }} />
      </span>
      <button
        type="submit"
        aria-label={ariaLabel}
        style={{
          background: 'var(--ink)',
          border: '1.5px solid var(--ink)',
          color: '#fff',
          width: buttonSize,
          height: buttonSize,
          cursor: 'pointer',
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        →
      </button>
    </form>
  )
}
