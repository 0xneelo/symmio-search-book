import type { ReactNode } from 'react'
import { GhostTyping } from './GhostTyping'

export interface NavItem {
  id: string
  num: string
  name: string
}

export interface SidebarProps {
  items: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  /** Shared ask-field wiring (optional — omitted in the gallery). */
  search?: {
    value: string
    onChange: (v: string) => void
    onSubmit: () => void
    onFocus?: () => void
    onBlur?: () => void
    ghost?: boolean
  }
  revStamp?: string
  backLink?: { label: string; href: string }
  /** Extra content between nav and footer (e.g. secondary nav groups in M7). */
  children?: ReactNode
}

/**
 * Collapsible sidebar (DESIGN.MD §4): 64px rail expanding to 272px on hover.
 * .sc elements show when collapsed, .sx when expanded (CSS in index.css).
 */
export function Sidebar({
  items,
  activeId,
  onNavigate,
  search,
  revStamp = 'REV 2026.07 / OPEN',
  backLink,
  children,
}: SidebarProps) {
  return (
    <aside
      className="snav"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 40,
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.12)',
        background: 'color-mix(in srgb,var(--paper) 80%,#12246e)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Wordmark block: monogram when collapsed, full mark when expanded */}
      <div
        style={{
          height: 105,
          flex: 'none',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 20px',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div
          className="sc"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: -1,
              color: '#ffffff',
            }}
          >
            V
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              background: 'var(--ink)',
              display: 'inline-block',
              marginTop: 12,
            }}
          />
        </div>
        <div className="sx" style={{ width: 232, flex: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: -1,
                color: '#ffffff',
              }}
            >
              Vibe
            </span>
            <span
              style={{
                width: 11,
                height: 11,
                background: 'var(--ink)',
                display: 'inline-block',
                marginTop: 10,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: 2,
              color: '#8fa0d8',
              marginTop: 9,
              whiteSpace: 'nowrap',
            }}
          >
            VIBE × SYMM
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: 2,
              color: '#5f6cb0',
              whiteSpace: 'nowrap',
            }}
          >
            FIELD MANUAL
          </div>
        </div>
      </div>

      {/* Search row: "/" glyph when collapsed, fused field when expanded */}
      {search && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            search.onSubmit()
          }}
          style={{
            position: 'relative',
            width: 272,
            flex: 'none',
            display: 'flex',
            alignItems: 'stretch',
            gap: 0,
            padding: '14px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <span
            className="sc"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 15,
              color: '#8fa0d8',
            }}
          >
            /
          </span>
          <span className="sx" style={{ flex: 1, minWidth: 0, position: 'relative', display: 'flex' }}>
            <input
              className="askinput"
              value={search.ghost ? '' : search.value}
              onChange={(e) => search.onChange(e.target.value)}
              onFocus={search.onFocus}
              onBlur={search.onBlur}
              placeholder={search.ghost ? '' : 'Search —'}
              style={{
                flex: 1,
                minWidth: 0,
                width: '100%',
                background: 'rgba(2,4,14,0.55)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRight: 'none',
                padding: '7px 10px',
                fontFamily: 'var(--font-sans)',
                fontSize: 12.5,
                color: '#f2f4ff',
                outline: 'none',
              }}
            />
            <GhostTyping visible={!!search.ghost} />
          </span>
          <button
            type="submit"
            aria-label="Search"
            className="sx"
            style={{
              background: 'var(--ink)',
              border: '1.5px solid var(--ink)',
              color: '#fff',
              width: 32,
              flex: 'none',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            →
          </button>
        </form>
      )}

      {/* INDEX nav */}
      <div style={{ padding: '18px 0 8px' }}>
        <div
          className="sx"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: 2.5,
            color: '#5f6cb0',
            padding: '0 20px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          INDEX
        </div>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className="navrow"
            data-active={it.id === activeId ? 'true' : 'false'}
            onClick={() => onNavigate(it.id)}
          >
            <span className="navnum">{it.num}</span>
            <span className="navname">{it.name}</span>
          </button>
        ))}
      </div>

      {children}

      {/* Footer */}
      <div
        style={{
          marginTop: 'auto',
          padding: '16px 20px',
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div
          className="sx"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#8fa0d8',
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
          }}
        >
          {revStamp}
        </div>
        {backLink && (
          <a
            href={backLink.href}
            className="sx"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 11,
              color: '#aebaf0',
              letterSpacing: 0.5,
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: 6,
              whiteSpace: 'nowrap',
            }}
          >
            ← {backLink.label}
          </a>
        )}
      </div>
    </aside>
  )
}
