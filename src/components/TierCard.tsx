import { useState } from 'react'
import type { Tier } from '../types'
import type { Faction } from '../data/factions'

interface Props {
  tier: Tier
  unlocked: boolean
  progress: { count: number; total: number; pct: number }
  faction?: Faction | null
  discountUsedTiers?: string[]
  onSelect: (tier: Tier) => void
  onInsideAccess?: (tierId: string) => void
}

export default function TierCard({ tier, unlocked, progress, faction, discountUsedTiers = [], onSelect, onInsideAccess }: Props) {
  const { count, total, pct } = progress
  const complete = count === total && total > 0 && tier.id !== 'zyraxis'
  const [hov, setHov] = useState(false)

  const isArchitects = faction?.id === 'architects'
  const discountAvailable = isArchitects && !unlocked && tier.unlockRequires && !discountUsedTiers.includes(tier.id)
  const discountUsed = discountUsedTiers.includes(tier.id)

  return (
    <div style={{ marginBottom: 4 }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => unlocked && onSelect(tier)}
        style={{
          position: 'relative', padding: '12px 16px',
          border: `1px solid ${hov && unlocked ? tier.accent + '55' : complete ? tier.accent + '25' : unlocked ? '#141c28' : '#0a0f18'}`,
          background: hov && unlocked ? tier.color + '0e' : '#05070c',
          cursor: unlocked ? 'pointer' : 'not-allowed',
          opacity: unlocked ? 1 : 0.4,
          transition: 'all 0.2s', overflow: 'hidden',
        }}
      >
        {unlocked && <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${pct}%`, height: 1, background: tier.accent, transition: 'width 0.8s ease' }} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>{tier.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: unlocked ? '#d1d5db' : '#1f2937', letterSpacing: 2, textTransform: 'uppercase' }}>{tier.name}</span>
              <span style={{ fontSize: 7, color: unlocked ? tier.accent : '#1f2937', letterSpacing: 1 }}>
                {unlocked ? (complete ? 'CLEARED' : `${count}/${total}`) : discountUsed ? 'DISCOUNTED' : 'LOCKED'}
              </span>
            </div>
            <div style={{ fontSize: 7, color: unlocked ? '#2d3748' : '#0a0f18', letterSpacing: 1, marginTop: 2 }}>{tier.subtitle}</div>
          </div>
          {unlocked && <span style={{ fontSize: 9, color: tier.accent, opacity: 0.5 }}>›</span>}
        </div>
        {!unlocked && tier.unlockRequires && (
          <div style={{ marginTop: 5, fontSize: 11, color: '#1e2d40', letterSpacing: 1 }}>
            REQ: {Object.entries(tier.unlockRequires).map(([k, v]) => `${v} ${k}`).join(' · ')}
          </div>
        )}
      </div>

      {/* Inside Access button for Architects on locked tiers */}
      {discountAvailable && onInsideAccess && (
        <div
          onClick={() => onInsideAccess(tier.id)}
          style={{ padding: '5px 16px', background: '#0a0a1a', border: '1px solid #818cf830', borderTop: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
        >
          <span style={{ fontSize: 7, color: '#818cf8', letterSpacing: 2 }}>♟ ACTIVATE INSIDE ACCESS</span>
          <span style={{ fontSize: 11, color: '#475569', letterSpacing: 1 }}>— reduce unlock requirements 20%</span>
        </div>
      )}
    </div>
  )
}
