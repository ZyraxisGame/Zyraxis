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
    <div style={{ marginBottom: 11 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3, letterSpacing: 1 }}>
        <span style={{ color: c.color }}>{c.icon} <span style={{ color: '#64748b', textTransform: 'uppercase' }}>{c.label}</span></span>
        <span style={{ color: '#94a3b8' }}>{val || 0}</span>
      </div>
      <div style={{ height: 3, background: '#111827', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: c.color, transition: 'width 0.5s ease' }} />
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
    <div style={{ width: 220, borderRight: '1px solid #1e2d40', background: '#05070c', flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 14px', flex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: '#334155', marginBottom: 14 }}>[ OPERATIVE ]</div>
        {(['awareness', 'influence', 'resources', 'intel'] as const).map(k => <Bar key={k} id={k} val={res[k]} />)}
        <div style={{ margin: '12px 0', borderTop: '1px solid #1e2d40' }} />
        <div style={{ fontSize: 10, letterSpacing: 3, color: '#334155', marginBottom: 10 }}>[ THREAT ]</div>
        <Bar id="exposure" val={res.exposure} />
        <Bar id="corruption" val={res.corruption} />
        {res.exposure >= expThreshold && (
          <div style={{ marginTop: 8, padding: '6px 8px', border: '1px solid #7c2d12', background: '#160700', fontSize: 11, color: '#f97316', letterSpacing: 1, lineHeight: 1.6 }}>
            ⚠ THE VEIL SEES YOU
          </div>
        )}
        {res.corruption >= 70 && (
          <div style={{ marginTop: 5, padding: '6px 8px', border: '1px solid #7f1d1d', background: '#160000', fontSize: 11, color: '#ef4444', letterSpacing: 1, lineHeight: 1.6 }}>
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
