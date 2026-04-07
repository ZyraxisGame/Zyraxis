import type { Resources } from '../types'
import type { Faction } from '../data/factions'
import FactionPanel from './FactionPanel'

const RES_CONFIG = {
  awareness:  { label: 'Awareness',   icon: '◎', color: '#fbbf24', max: 600 },
  influence:  { label: 'Influence',   icon: '◈', color: '#818cf8', max: 600 },
  resources:  { label: 'Resources',   icon: '◆', color: '#34d399', max: 600 },
  intel:      { label: 'Intel',       icon: '◉', color: '#38bdf8', max: 600 },
  exposure:   { label: 'Exposure',    icon: '⚠', color: '#f97316', max: 100 },
  corruption: { label: 'Corruption',  icon: '☣', color: '#dc2626', max: 100 },
} as const

function Bar({ id, val }: { id: keyof typeof RES_CONFIG; val: number }) {
  const c = RES_CONFIG[id]
  const pct = Math.min(100, ((val || 0) / c.max) * 100)
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, marginBottom: 2, letterSpacing: 1 }}>
        <span style={{ color: c.color }}>{c.icon} <span style={{ color: '#4b5563', textTransform: 'uppercase' }}>{c.label}</span></span>
        <span style={{ color: '#9ca3af' }}>{val || 0}</span>
      </div>
      <div style={{ height: 2, background: '#111827', borderRadius: 1 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: c.color, transition: 'width 0.5s ease', boxShadow: `0 0 4px ${c.color}50` }} />
      </div>
    </div>
  )
}

interface Props {
  res: Resources
  faction?: Faction | null
  alignment?: number
  hiddenChoicesActive?: boolean
  expThreshold?: number
}

export default function ResourcePanel({ res, faction, alignment = 100, hiddenChoicesActive = false, expThreshold = 70 }: Props) {
  return (
    <div style={{ width: 210, borderRight: '1px solid #0d1018', background: '#05070c', flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 14px', flex: 1 }}>
        <div style={{ fontSize: 7, letterSpacing: 4, color: '#1f2937', marginBottom: 14 }}>[ OPERATIVE ]</div>
        {(['awareness', 'influence', 'resources', 'intel'] as const).map(k => <Bar key={k} id={k} val={res[k]} />)}
        <div style={{ margin: '12px 0', borderTop: '1px solid #0d1018' }} />
        <div style={{ fontSize: 7, letterSpacing: 4, color: '#1f2937', marginBottom: 10 }}>[ THREAT ]</div>
        <Bar id="exposure" val={res.exposure} />
        <Bar id="corruption" val={res.corruption} />
        {res.exposure >= expThreshold && (
          <div style={{ marginTop: 8, padding: '5px 7px', border: '1px solid #7c2d12', background: '#160700', fontSize: 7, color: '#f97316', letterSpacing: 1, lineHeight: 1.6 }}>
            ⚠ THE VEIL SEES YOU
          </div>
        )}
        {res.corruption >= 70 && (
          <div style={{ marginTop: 5, padding: '5px 7px', border: '1px solid #7f1d1d', background: '#160000', fontSize: 7, color: '#ef4444', letterSpacing: 1, lineHeight: 1.6 }}>
            ☣ YOU ARE CHANGING
          </div>
        )}
      </div>
      {faction && (
        <FactionPanel faction={faction} alignment={alignment} hiddenChoicesActive={hiddenChoicesActive} />
      )}
    </div>
  )
}
