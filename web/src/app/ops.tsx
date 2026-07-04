/**
 * Shared field-manual primitives for the index/ops views (design-mapping):
 * plates with kicker headers, mono status rows, stat tiles, filter inputs.
 * Convention: ink = accent/value, blue = structure, hatching = de-emphasized.
 */
import type { CSSProperties, ReactNode } from 'react'
import { Kicker } from '@/components/manual'

export const HATCH = 'repeating-linear-gradient(45deg,rgba(255,255,255,0.10) 0 1px,transparent 1px 8px)'

/** Row status → visual treatment. */
export type RowTone = 'pass' | 'priority' | 'blocked' | 'local' | 'plain'

export function PlateSection({
  title,
  aside,
  children,
  style,
}: {
  title: string
  aside?: string
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <section
      style={{
        position: 'relative',
        border: '1.5px dashed rgba(255,255,255,0.3)',
        backgroundImage:
          'linear-gradient(var(--gridc) 1px,transparent 1px),linear-gradient(90deg,var(--gridc) 1px,transparent 1px)',
        backgroundSize: '22px 22px',
        padding: '40px 24px 24px',
        marginBottom: 34,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 2,
          color: '#8fa0d8',
        }}
      >
        {title}
      </div>
      {aside && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 2,
            color: '#5f6cb0',
          }}
        >
          {aside}
        </div>
      )}
      {children}
    </section>
  )
}

export function OpsRow({
  tone = 'plain',
  meta,
  title,
  detail,
  children,
}: {
  tone?: RowTone
  meta: string
  title: ReactNode
  detail?: ReactNode
  children?: ReactNode
}) {
  const borderLeft =
    tone === 'pass'
      ? '3px solid #2e6bff'
      : tone === 'priority'
        ? '3px solid var(--ink)'
        : tone === 'local'
          ? '3px dashed rgba(255,255,255,0.35)'
          : '3px solid transparent'
  return (
    <div
      style={{
        borderLeft,
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        padding: '12px 14px',
        backgroundImage: tone === 'blocked' ? HATCH : undefined,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10.5,
          letterSpacing: 1,
          color: tone === 'priority' ? 'var(--ink)' : '#8fa0d8',
          marginBottom: 5,
        }}
      >
        {meta}
      </div>
      <div style={{ fontSize: 14.5, lineHeight: 1.5, color: '#ffffff', fontWeight: 500 }}>{title}</div>
      {detail && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8fa0d8', marginTop: 5 }}>{detail}</div>
      )}
      {children}
    </div>
  )
}

export function StatTile({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div
      style={{
        border: '2px solid rgba(255,255,255,0.22)',
        background: 'color-mix(in srgb,var(--paper) 62%,#12246e)',
        boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
        padding: '14px 18px',
        minWidth: 130,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: 2,
          color: '#8fa0d8',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 26, color: '#ffffff' }}>{value}</div>
    </div>
  )
}

export function FilterInput({
  value,
  onChange,
  placeholder,
  count,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  count: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
      <input
        className="askinput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: 320,
          maxWidth: '100%',
          background: 'rgba(2,4,14,0.55)',
          border: '1.5px solid rgba(255,255,255,0.25)',
          padding: '9px 12px',
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#f2f4ff',
          outline: 'none',
        }}
      />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, color: '#8fa0d8' }}>{count}</span>
    </div>
  )
}

/** Bordered index plate (cards / authored cards / collections / volumes). */
export function IndexPlate({
  meta,
  title,
  body,
  children,
}: {
  meta: string
  title: string
  body?: string
  children?: ReactNode
}) {
  return (
    <article
      style={{
        border: '2px solid rgba(255,255,255,0.22)',
        background: 'color-mix(in srgb,var(--paper) 62%,#12246e)',
        boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
        padding: '16px 18px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 9,
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: 1, color: '#8fa0d8' }}>{meta}</div>
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: -0.3,
          color: '#ffffff',
        }}
      >
        {title}
      </h3>
      {body && <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#d3dbff' }}>{body}</p>}
      {children}
    </article>
  )
}

export function CardGrid({ children, min = 300 }: { children: ReactNode; min?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        // min(…, 100%) keeps track minimums from forcing horizontal scroll on
        // narrow viewports (SYN-362 mobile audit).
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}px, 100%), 1fr))`,
        gap: 20,
      }}
    >
      {children}
    </div>
  )
}

export function MonoList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', padding: '10px 0' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: 1.5,
              color: '#8fa0d8',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 4,
            }}
          >
            {item.label}
          </span>
          <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#d3dbff' }}>{item.value}</span>
        </li>
      ))}
    </ul>
  )
}

export function ViewIntro({ title, punctuation = '.', lead }: { title: string; punctuation?: '.' | '?'; lead?: string }) {
  return (
    <>
      <h1 className="fm-h1-section">
        {title}
        <span style={{ color: 'var(--ink)' }}>{punctuation}</span>
      </h1>
      <div
        style={{
          height: 6,
          backgroundImage:
            'repeating-linear-gradient(90deg,rgba(126,160,255,0.55) 0 12px,transparent 12px 24px)',
          margin: '22px 0 30px',
        }}
      />
      {lead && (
        <p style={{ margin: '0 0 30px', fontSize: 15.5, lineHeight: 1.75, color: '#c9d4ff', maxWidth: 720 }}>{lead}</p>
      )}
    </>
  )
}

export { Kicker }
