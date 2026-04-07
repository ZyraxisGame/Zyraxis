import type { Faction } from '../data/factions'

interface Props {
  faction: Faction
  alignment: number
  hiddenChoicesActive: boolean
}

export default function FactionPanel({ faction, alignment, hiddenChoicesActive }: Props) {
  const alignPct = Math.max(0, Math.min(100, alignment))
  const alignColor = alignPct >= 70 ? '#34d399' : alignPct >= 40 ? '#fbbf24' : '#ef4444'
  const alignLabel = alignPct >= 70 ? 'ALIGNED' : alignPct >= 40 ? 'DRIFTING' : 'BETRAYED'

  return (
    <div style={{ padding: '14px 14px 12px', borderTop: '1px solid #1e2d40', background: '#05070c' }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: '#334155', marginBottom: 10 }}>[ FACTION ]</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 18, color: faction.accent }}>{faction.icon}</span>
        <div>
          <div style={{ fontSize: 12, color: faction.accent, letterSpacing: 2, textTransform: 'uppercase' }}>{faction.name}</div>
          <div style={{ fontSize: 11, color: '#475569', letterSpacing: 1, marginTop: 2 }}>{faction.subtitle}</div>
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4, letterSpacing: 1 }}>
          <span style={{ color: '#475569' }}>ALIGNMENT</span>
          <span style={{ color: alignColor }}>{alignLabel}</span>
        </div>
        <div style={{ height: 3, background: '#111827', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${alignPct}%`, background: alignColor, borderRadius: 2, transition: 'width 0.5s ease, background 0.3s ease' }} />
        </div>
      </div>

      <div style={{ fontSize: 11, color: '#334155', letterSpacing: 1, lineHeight: 1.8 }}>
        <div style={{ color: faction.accent + '99' }}>{faction.uniqueMechanic}</div>
        {hiddenChoicesActive && (
          <div style={{ color: '#ef4444', marginTop: 3, letterSpacing: 1 }}>☣ HIDDEN CHOICES ACTIVE</div>
        )}
        {alignPct === 0 && (
          <div style={{ color: '#ef4444', marginTop: 3 }}>⚠ ABILITY LOCKED</div>
        )}
        {alignPct >= 70 && (
          <div style={{ color: '#34d399', marginTop: 3 }}>◎ BONUS ACTIVE</div>
        )}
      </div>
    </div>
  )
}
