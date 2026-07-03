import type { ReactNode } from 'react'

export interface TopBarProps {
  breadcrumb: string
  /** §NN SECTION NAME mono indicator, e.g. { num: '03', name: 'REWARDS & REFERRALS' }. */
  section: { num: string; name: string }
  /** Compact ask-field (AskField) in the middle; hidden while an answer is showing. */
  children?: ReactNode
}

/** 61px top bar (DESIGN.MD §4): breadcrumb left, ask-field center, section indicator right. */
export function TopBar({ breadcrumb, section, children }: TopBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        height: 61,
        padding: '0 40px',
        borderBottom: '1px solid rgba(255,255,255,0.14)',
        background: 'rgba(3,5,16,0.3)',
        flex: 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 1.5,
          color: '#8fa0d8',
          whiteSpace: 'nowrap',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {breadcrumb}
      </div>
      {children}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 1,
          color: '#5f6cb0',
          whiteSpace: 'nowrap',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'right',
        }}
      >
        §{section.num} {section.name}
      </div>
    </div>
  )
}
