import { useState } from 'react'
import { FACTIONS, type FactionId, type Faction } from '../data/factions'

interface Props {
  onSelect: (id: FactionId) => void
}

function FactionCard({ faction, selected, onHover, onSelect }: {
  faction: Faction
  selected: boolean
  onHover: (f: Faction | null) => void
  onSelect: (id: FactionId) => void
}) {
  return (
    <div
      onMouseEnter={() => onHover(faction)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(faction.id)}
      style={{
        padding: '14px 16px',
        border: `1px solid ${selected ? faction.accent : '#1a2030'}`,
        background: selected ? faction.color + '18' : '#06080f',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${faction.accent}, transparent)` }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 22, opacity: selected ? 1 : 0.5 }}>{faction.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: selected ? faction.accent : '#6b7280', letterSpacing: 2, textTransform: 'uppercase' }}>{faction.name}</span>
            <span style={{ fontSize: 7, color: '#374151', letterSpacing: 1 }}>{faction.naturalEnding.split('—')[0].trim()}</span>
          </div>
          <div style={{ fontSize: 8, color: selected ? '#9ca3af' : '#374151', marginTop: 2, letterSpacing: 1 }}>{faction.subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export default function FactionSelect({ onSelect }: Props) {
  const [hovered, setHovered] = useState<Faction | null>(null)
  const [selected, setSelected] = useState<FactionId | null>(null)

  const active = hovered || (selected ? FACTIONS.find(f => f.id === selected) || null : null)

  function confirm() {
    if (selected) onSelect(selected)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#030508',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Courier New', monospace", padding: 24, zIndex: 300,
    }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.05) 0px,rgba(0,0,0,0.05) 1px,transparent 1px,transparent 2px)' }} />

      <div style={{ maxWidth: 820, width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 7, letterSpacing: 6, color: '#1f2937', marginBottom: 8 }}>ZYRAXIS — OPERATIVE CLASSIFICATION</div>
          <div style={{ fontSize: 28, letterSpacing: 6, color: '#818cf8', marginBottom: 8 }}>CHOOSE YOUR FACTION</div>
          <div style={{ fontSize: 9, color: '#374151', letterSpacing: 2 }}>Your faction determines how you fight. Choose the one you can live with.</div>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          {/* Left — faction list */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {FACTIONS.map(f => (
              <FactionCard
                key={f.id}
                faction={f}
                selected={selected === f.id}
                onHover={setHovered}
                onSelect={id => setSelected(id)}
              />
            ))}
          </div>

          {/* Right — detail panel */}
          <div style={{ width: 320, background: '#06080f', border: '1px solid #0d1018', padding: 20, flexShrink: 0 }}>
            {active ? (
              <>
                <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${active.accent}, transparent)`, marginBottom: 14 }} />
                <div style={{ fontSize: 7, letterSpacing: 4, color: active.accent, marginBottom: 4 }}>{active.icon} {active.name.toUpperCase()}</div>
                <div style={{ fontSize: 9, color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>{active.philosophy}</div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 7, letterSpacing: 3, color: '#374151', marginBottom: 6 }}>[ UNIQUE ABILITY ]</div>
                  <div style={{ fontSize: 9, color: active.accent, marginBottom: 4, letterSpacing: 1 }}>{active.uniqueMechanic}</div>
                  <div style={{ fontSize: 8, color: '#6b7280', lineHeight: 1.6 }}>{active.uniqueMechanicDesc}</div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 7, letterSpacing: 3, color: '#374151', marginBottom: 6 }}>[ WEAKNESS ]</div>
                  <div style={{ fontSize: 8, color: '#6b7280', lineHeight: 1.6 }}>{active.weakness}</div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 7, letterSpacing: 3, color: '#374151', marginBottom: 6 }}>[ ALIGNMENT ]</div>
                  <div style={{ fontSize: 8, color: '#4b5563', lineHeight: 1.6, marginBottom: 4 }}>
                    <span style={{ color: '#6b7280' }}>RISES: </span>{active.alignmentRaisedBy}
                  </div>
                  <div style={{ fontSize: 8, color: '#4b5563', lineHeight: 1.6 }}>
                    <span style={{ color: '#6b7280' }}>DROPS: </span>{active.alignmentLoweredBy}
                  </div>
                </div>

                <div style={{ padding: '8px 10px', border: `1px solid ${active.accent}20`, background: active.color + '0a' }}>
                  <div style={{ fontSize: 7, color: active.accent, letterSpacing: 2, marginBottom: 4 }}>NATURAL PATH</div>
                  <div style={{ fontSize: 8, color: '#6b7280' }}>{active.naturalEnding}</div>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 300 }}>
                <div style={{ fontSize: 8, color: '#1f2937', letterSpacing: 2, textAlign: 'center', lineHeight: 2 }}>
                  HOVER A FACTION<br />TO SEE DETAILS
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirm */}
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button
            onClick={confirm}
            disabled={!selected}
            style={{
              padding: '10px 40px',
              fontSize: 9, letterSpacing: 4, textTransform: 'uppercase',
              background: selected ? (FACTIONS.find(f => f.id === selected)?.accent || '#818cf8') : '#0d1018',
              color: selected ? '#000' : '#1f2937',
              border: 'none',
              cursor: selected ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              fontFamily: "'Courier New', monospace",
            }}
          >
            {selected ? `COMMIT TO ${FACTIONS.find(f => f.id === selected)?.name.toUpperCase()}` : 'SELECT A FACTION'}
          </button>
          {selected && (
            <div style={{ marginTop: 8, fontSize: 7, color: '#374151', letterSpacing: 1 }}>
              This choice persists for the entire run. It cannot be changed.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
