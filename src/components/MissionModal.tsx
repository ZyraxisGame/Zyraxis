import { useState } from 'react'
import type { Tier, Resources, Mission, MissionChoice } from '../types'
import type { Faction } from '../data/factions'
import { canAfford, applyCost, applyEffect } from '../hooks/useGameState'
import { applyFactionGains, getEffectiveCostForFaction } from '../data/factions'

interface Props {
  tier: Tier
  res: Resources
  done: string[]
  faction: Faction | null
  alignment: number
  hiddenChoicesActive: boolean
  canUseForceOfWill: boolean
  onClose: () => void
  onExecutingChange: (v: boolean) => void
  onExecute: (mission: Mission, choice: MissionChoice, after: Resources | null, usedFree?: boolean) => void
}

export default function MissionModal({
  tier, res, done, faction, alignment, hiddenChoicesActive, canUseForceOfWill,
  onClose, onExecutingChange, onExecute
}: Props) {
  const [activeMission, setActive] = useState<Mission | null>(null)
  const [choice, setChoice] = useState<MissionChoice | null>(null)
  const [outcome, setOutcome] = useState<string | null>(null)
  const [executing, setExecuting] = useState(false)
  const [useForceOfWill, setUseForceOfWill] = useState(false)
  const [previewedChoice, setPreviewedChoice] = useState<string | null>(null)
  const [previewConsumed, setPreviewConsumed] = useState(false)

  const isGreyNetwork = faction?.id === 'grey_network'
  const isUnbound = faction?.id === 'unbound'
  const foreknowledgeActive = isGreyNetwork && alignment > 0

  function execute(free = false) {
    if (!choice || !activeMission || executing) return
    if (choice.effect?.ending) {
      onExecute(activeMission, choice, null, false)
      return
    }
    const actualFree = free && isUnbound && canUseForceOfWill
    setExecuting(true)
    onExecutingChange(true)
    // Apply faction modifiers to effect for accurate resource computation
    const modifiedEffect = applyFactionGains(choice.effect, faction, alignment)
    const costRes = actualFree ? res : applyCost(res, choice.cost)
    const after = applyEffect(costRes, modifiedEffect)
    setOutcome(choice.outcome)
    setTimeout(() => onExecute(activeMission, choice, after, actualFree), 2200)
  }

  function getVisibleChoices(mission: Mission): MissionChoice[] {
    return mission.choices.filter(c => {
      if (c.factionOnly && c.factionOnly !== faction?.id) return false
      if (c.effect?.isHidden && !hiddenChoicesActive) return false
      return true
    })
  }

  // Show faction-modified cost for display purposes
  function getDisplayCost(c: MissionChoice, isFree: boolean): string {
    if (isFree) return 'FREE (Force of Will)'
    const effectiveCost = getEffectiveCostForFaction(c.cost, faction)
    const hasCorruption = Object.keys(effectiveCost).some(k => k === 'corruption')
    if (hasCorruption) {
      const corruptPart = Object.entries(effectiveCost).filter(([k]) => k === 'corruption').map(([k, v]) => `${v} ${k}`).join(' · ')
      const otherPart = Object.entries(effectiveCost).filter(([k]) => k !== 'corruption').map(([k, v]) => `${v} ${k}`).join(' · ')
      return `REQUIRES: ${corruptPart}${otherPart ? ` · COST: ${otherPart}` : ''}`
    }
    return `COST: ${Object.entries(effectiveCost).map(([k, v]) => `${v} ${k}`).join(' · ') || '—'}`
  }

  // Show faction-modified effect gains for display
  function getDisplayGains(c: MissionChoice): string {
    if (c.effect?.ending) return ''
    const modified = applyFactionGains(c.effect, faction, alignment)
    const gains = Object.entries(modified)
      .filter(([k, v]) => k !== 'ending' && k !== 'isHidden' && (v as number) !== 0)
      .map(([k, v]) => `${(v as number) > 0 ? '+' : ''}${v} ${k}`)
      .join(' · ')
    return gains
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={() => !executing && onClose()}
    >
      <div
        style={{ background: '#07090f', border: `1px solid ${tier.accent}25`, maxWidth: 580, width: '100%', maxHeight: '88vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'sticky', top: 0, background: '#07090f', borderBottom: '1px solid #0d1018', padding: '14px 18px' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${tier.accent},transparent)`, marginBottom: 10 }} />
          <div style={{ fontSize: 7, letterSpacing: 4, color: tier.accent, marginBottom: 2 }}>TIER {tier.tier} — {tier.name.toUpperCase()}</div>
          <div style={{ fontSize: 9, color: '#4b5563', lineHeight: 1.7, maxHeight: 80, overflow: 'hidden' }}>{tier.lore}</div>
        </div>

        <div style={{ padding: '14px 18px' }}>
          {!activeMission ? (
            <>
              <div style={{ fontSize: 7, letterSpacing: 3, color: '#1f2937', marginBottom: 10 }}>SELECT OPERATION</div>
              {tier.missions.map(m => {
                const isDone = done.includes(m.id)
                return (
                  <div key={m.id} onClick={() => !isDone && setActive(m)}
                    style={{ marginBottom: 6, padding: '11px 13px', border: `1px solid ${isDone ? '#0d1018' : '#1a2030'}`, background: '#060810', cursor: isDone ? 'default' : 'pointer', opacity: isDone ? 0.35 : 1, transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10, color: isDone ? '#374151' : '#d1d5db', letterSpacing: 1 }}>{isDone ? '✓ ' : ''}{m.name}</span>
                      {!isDone && <span style={{ color: tier.accent, fontSize: 9 }}>›</span>}
                    </div>
                    <div style={{ fontSize: 8, color: '#374151', marginTop: 2, lineHeight: 1.4 }}>{m.desc}</div>
                  </div>
                )
              })}
            </>
          ) : outcome ? (
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 7, letterSpacing: 4, color: tier.accent, marginBottom: 12 }}>[ OPERATION COMPLETE ]</div>
              <div style={{ fontSize: 10, color: '#9ca3af', lineHeight: 1.9, fontStyle: 'italic' }}>{outcome}</div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => { setActive(null); setChoice(null); setUseForceOfWill(false); setPreviewedChoice(null); setPreviewConsumed(false) }}
                  style={{ fontSize: 8, color: '#4b5563', background: 'transparent', border: '1px solid #1a2030', cursor: 'pointer', padding: '2px 10px', letterSpacing: 2, fontFamily: 'inherit' }}>
                  ← BACK
                </button>
                <span style={{ fontSize: 10, color: '#e5e7eb', letterSpacing: 1 }}>{activeMission.name}</span>
              </div>
              <div style={{ fontSize: 9, color: '#4b5563', marginBottom: 14, lineHeight: 1.6 }}>{activeMission.desc}</div>

              {/* Faction ability banners */}
              {isUnbound && canUseForceOfWill && (
                <div style={{ marginBottom: 12, padding: '8px 12px', border: '1px solid #fbbf2440', background: '#100a00' }}>
                  <div style={{ fontSize: 7, color: '#fbbf24', letterSpacing: 2, marginBottom: 4 }}>☀ FORCE OF WILL AVAILABLE</div>
                  <div style={{ fontSize: 8, color: '#6b7280', marginBottom: 8 }}>Execute any choice at zero resource cost this tier.</div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={useForceOfWill} onChange={e => setUseForceOfWill(e.target.checked)} style={{ accentColor: '#fbbf24' }} />
                    <span style={{ fontSize: 8, color: '#fbbf24', letterSpacing: 1 }}>USE FORCE OF WILL (free action)</span>
                  </label>
                </div>
              )}
              {isUnbound && !canUseForceOfWill && (
                <div style={{ marginBottom: 12, padding: '8px 12px', border: '1px solid #1f293740', background: '#06080f' }}>
                  <div style={{ fontSize: 7, color: '#374151', letterSpacing: 2 }}>☀ FORCE OF WILL — USED THIS TIER</div>
                </div>
              )}

              {foreknowledgeActive && !previewConsumed && (
                <div style={{ marginBottom: 12, padding: '8px 12px', border: '1px solid #38bdf840', background: '#00080f' }}>
                  <div style={{ fontSize: 7, color: '#38bdf8', letterSpacing: 2, marginBottom: 4 }}>◉ FOREKNOWLEDGE AVAILABLE</div>
                  <div style={{ fontSize: 8, color: '#6b7280' }}>Hover a choice to preview its outcome before committing.</div>
                </div>
              )}

              {hiddenChoicesActive && (
                <div style={{ marginBottom: 12, padding: '8px 12px', border: '1px solid #ef444440', background: '#0f0000' }}>
                  <div style={{ fontSize: 7, color: '#ef4444', letterSpacing: 2 }}>☣ HIDDEN CHOICES UNLOCKED</div>
                </div>
              )}

              <div style={{ fontSize: 7, letterSpacing: 3, color: '#1f2937', marginBottom: 10 }}>CHOOSE APPROACH</div>

              {getVisibleChoices(activeMission).map(c => {
                const isFree = useForceOfWill && isUnbound && canUseForceOfWill
                const effectiveCost = isFree ? {} : getEffectiveCostForFaction(c.cost, faction)
                const affordable2 = canAfford(res, isFree ? {} : c.cost, faction)
                const sel = choice?.label === c.label
                const isHidden = !!c.effect?.isHidden
                const isPreviewed = foreknowledgeActive && !previewConsumed && previewedChoice === c.label
                const displayGains = getDisplayGains(c)

                return (
                  <div key={c.label}
                    onMouseEnter={() => { if (foreknowledgeActive && !previewConsumed) setPreviewedChoice(c.label) }}
                    onMouseLeave={() => { if (foreknowledgeActive && !previewConsumed) setPreviewedChoice(null) }}
                    onClick={() => {
                      if (!affordable2) return
                      setChoice(c)
                      if (foreknowledgeActive && !previewConsumed && previewedChoice === c.label) setPreviewConsumed(true)
                    }}
                    style={{ marginBottom: 7, padding: '10px 12px', border: `1px solid ${isHidden ? '#ef444460' : sel ? tier.accent + '60' : affordable2 ? '#1a2030' : '#0d1018'}`, background: isHidden ? '#0f0000' : sel ? tier.accent + '10' : '#060810', cursor: affordable2 ? 'pointer' : 'not-allowed', opacity: affordable2 ? 1 : 0.35, transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <div style={{ fontSize: 10, color: isHidden ? '#ef4444' : sel ? tier.accent : '#d1d5db', letterSpacing: 1 }}>
                        {isHidden ? '☣ ' : ''}{c.label}
                      </div>
                      {isFree && <span style={{ fontSize: 7, color: '#fbbf24', letterSpacing: 1 }}>FREE</span>}
                    </div>
                    <div style={{ fontSize: 8, color: '#4b5563', lineHeight: 1.5, marginBottom: 5 }}>{c.desc}</div>
                    {/* Grey Network outcome preview */}
                    {isPreviewed && (
                      <div style={{ fontSize: 8, color: '#38bdf8', lineHeight: 1.5, marginBottom: 5, fontStyle: 'italic', borderLeft: '2px solid #38bdf840', paddingLeft: 8 }}>
                        FOREKNOWLEDGE: {c.outcome}
                      </div>
                    )}
                    <div style={{ fontSize: 7, letterSpacing: 1, color: '#374151', marginBottom: displayGains ? 3 : 0 }}>
                      {getDisplayCost(c, !!isFree)}
                    </div>
                    {displayGains && (
                      <div style={{ fontSize: 7, letterSpacing: 1, color: '#4b5563' }}>
                        GAIN: {displayGains}
                      </div>
                    )}
                  </div>
                )
              })}

              {choice && (
                <button onClick={() => execute(useForceOfWill)}
                  style={{ marginTop: 12, width: '100%', padding: '9px', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', background: tier.accent, color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  EXECUTE OPERATION
                </button>
              )}
            </>
          )}
        </div>

        <div style={{ padding: '8px 18px', borderTop: '1px solid #0d1018' }}>
          <button onClick={() => !executing && onClose()}
            style={{ fontSize: 7, letterSpacing: 3, background: 'transparent', border: '1px solid #1a2030', color: executing ? '#1f2937' : '#374151', cursor: executing ? 'not-allowed' : 'pointer', padding: '3px 12px', fontFamily: 'inherit' }}>
            {executing ? 'EXECUTING...' : 'CLOSE'}
          </button>
        </div>
      </div>
    </div>
  )
}
