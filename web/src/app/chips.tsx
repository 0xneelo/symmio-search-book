/** Source/citation chips — mono, boxed, link when an href exists (index.html L2842–2901). */
import type { CSSProperties, ReactNode } from 'react'
import { sourceByKey } from '@/data/loader'
import type { Page, ServiceCitation } from '@/data/types'

const chipStyle: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  border: '1px solid rgba(255,255,255,0.28)',
  padding: '4px 11px',
  color: '#cdd8ff',
  textDecoration: 'none',
  display: 'inline-block',
}

export function SourceChip({
  href,
  title,
  children,
  onClick,
}: {
  href?: string
  title?: string
  children: ReactNode
  onClick?: () => void
}) {
  if (href) {
    return (
      <a
        href={href}
        title={title}
        style={chipStyle}
        onClick={
          onClick
            ? (e) => {
                e.preventDefault()
                onClick()
              }
            : undefined
        }
      >
        {children}
      </a>
    )
  }
  return (
    <span title={title} style={chipStyle} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </span>
  )
}

export function ChipRow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', ...style }}>{children}</div>
  )
}

/** L2842 — registered source key chip with group/use tooltip. */
export function sourceChipsFor(page: Page) {
  return (page.sources || page.sourceKeys || []).slice(0, 5).map((key) => {
    const source = sourceByKey[key]
    const label = source ? source.key : key
    const meta = source ? `${source.group} / ${source.use}` : 'unregistered source key'
    return (
      <SourceChip key={`sk-${key}`} href={source?.href} title={meta}>
        {label}
      </SourceChip>
    )
  })
}

/** L2871 — raw source URLs (max 6). */
export function sourceUrlChipsFor(page: Page) {
  return (page.sourceUrls || []).slice(0, 6).map((url) => (
    <SourceChip key={`su-${url}`} href={url}>
      {url}
    </SourceChip>
  ))
}

/** L2888 — service citations (max 8, chunk ids max 2 in the tooltip). */
export function citationChipsFor(citations: ServiceCitation[] | undefined) {
  return (citations || []).slice(0, 8).map((citation, i) => {
    const label = citation.sourceKey || citation.pageTitle || citation.pageId || 'source'
    const chunkLabel = (citation.chunkIds || []).slice(0, 2).join(', ')
    const title = [citation.pageTitle, chunkLabel].filter(Boolean).join(' / ')
    return (
      <SourceChip key={`cit-${i}-${label}`} href={citation.sourceHref} title={title}>
        {label}
      </SourceChip>
    )
  })
}
