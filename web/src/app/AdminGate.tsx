import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Kicker } from '@/components/manual'
import { clearAdminToken, getAdminToken, setAdminToken, verifyAdmin } from '@/lib/admin'

type GateState = 'checking' | 'locked' | 'open'

/**
 * Server-verified operator gate for the admin area (SYN-362). The token is
 * checked by the answer-engine (POST /api/search-book/admin/verify); nothing
 * secret lives in the bundle. Shared-token gate for user testing, not
 * multi-user auth.
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GateState>('checking')
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let alive = true
    verifyAdmin(getAdminToken()).then((result) => {
      if (!alive) return
      if (result.ok) {
        setState('open')
      } else {
        clearAdminToken()
        setState('locked')
      }
    })
    return () => {
      alive = false
    }
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const candidate = input.trim()
    if (!candidate || busy) return
    setBusy(true)
    setError(null)
    const result = await verifyAdmin(candidate)
    setBusy(false)
    if (result.ok) {
      setAdminToken(candidate)
      setInput('')
      setState('open')
    } else {
      setError('Token rejected by the answer-engine.')
    }
  }

  if (state === 'open') return <>{children}</>

  if (state === 'checking') {
    return (
      <div
        style={{
          margin: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: 2,
          color: '#8fa0d8',
        }}
      >
        CHECKING ACCESS —
      </div>
    )
  }

  return (
    <div data-page="admin-gate" style={{ width: 480, maxWidth: '100%', margin: 'auto', alignSelf: 'center' }}>
      <div
        style={{
          padding: '30px 30px 26px',
          border: '2px solid #2e6bff',
          background: 'color-mix(in srgb,var(--paper) 62%,#12246e)',
          boxShadow: '0 6px 0 rgba(0,0,0,0.4)',
        }}
      >
        <Kicker size={13} tracking={3} style={{ marginBottom: 6 }}>
          ADMIN ACCESS
        </Kicker>
        <p style={{ margin: '0 0 18px', fontSize: 13.5, lineHeight: 1.6, color: '#c9d4ff' }}>
          This area hosts the ops views. Enter the operator token — it is verified by the
          answer-engine, never stored in this page.
        </p>
        <form
          onSubmit={submit}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '2px solid rgba(255,255,255,0.3)',
            background: 'rgba(2,4,14,0.5)',
          }}
        >
          <span
            style={{ padding: '0 14px', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: 16 }}
          >
            /
          </span>
          <input
            className="askinput"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Operator token —"
            autoComplete="current-password"
            style={{
              flex: 1,
              width: '100%',
              background: 'transparent',
              border: 'none',
              padding: '14px 6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              color: '#f2f4ff',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            aria-label="Unlock"
            disabled={busy}
            style={{
              background: 'var(--ink)',
              border: 'none',
              color: '#fff',
              alignSelf: 'stretch',
              width: 52,
              cursor: busy ? 'default' : 'pointer',
              fontSize: 18,
              opacity: busy ? 0.6 : 1,
            }}
          >
            →
          </button>
        </form>
        {error && (
          <p
            role="alert"
            style={{
              margin: '12px 0 0',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: 0.3,
              color: '#ff8aa8',
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
