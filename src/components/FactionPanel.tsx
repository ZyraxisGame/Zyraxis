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
    <div style={{ padding: '14px 14px 10px', borderTop: '1px solid #0d1018', background: '#05070c' }}>
      <div style={{ fontSize: 7, letterSpacing: 3, color: '#1f2937', marginBottom: 10 }}>[ FACTION ]</div>

      {/* Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 16, color: faction.accent }}>{faction.icon}</span>
        <div>
          <div style={{ fontSize: 8, color: faction.accent, letterSpacing: 2, textTransform: 'uppercase' }}>{faction.name}</div>
          <div style={{ fontSize: 7, color: '#374151', letterSpacing: 1 }}>{faction.subtitle}</div>
        </div>
      </div>

      {/* Alignment meter */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, marginBottom: 3, letterSpacing: 1 }}>
          <span style={{ color: '#374151' }}>ALIGNMENT</span>
          <span style={{ color: alignColor }}>{alignLabel}</span>
        </div>
        <div style={{ height: 3, background: '#111827', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${alignPct}%`, background: alignColor, borderRadius: 2, transition: 'width 0.5s ease, background 0.3s ease' }} />
        </div>
      </div>

      {/* Unique mechanic status */}
      <div style={{ fontSize: 7, color: '#1f2937', letterSpacing: 1, lineHeight: 1.8 }}>
        <div style={{ color: faction.accent + '80' }}>{faction.uniqueMechanic}</div>
        {hiddenChoicesActive && (
          <div style={{ color: '#ef4444', marginTop: 3, letterSpacing: 1 }}>
            ☣ HIDDEN CHOICES ACTIVE
          </div>
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
