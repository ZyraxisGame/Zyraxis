import { useState, useEffect, useCallback, useRef } from 'react'
import type { Resources, GameState, Mission, MissionChoice, EventChoice, RandomEvent } from '../types'
import { TIERS } from '../data/tiers'
import { RANDOM_EVENTS } from '../data/events'
import {
  type FactionId,
  type Faction,
  FACTION_MAP,
  getEffectiveCostForFaction,
  checkAlignmentDrop,
  getTierUnlockWithDiscount,
} from '../data/factions'

const SAVE_KEY = 'zyraxis_v1'
const ALIGNMENT_MAX = 100
const ALIGNMENT_DROP = 15
const ALIGNMENT_RISE = 5

const INITIAL_RESOURCES: Resources = {
  awareness: 15,
  influence: 10,
  resources: 20,
  intel: 5,
  exposure: 0,
  corruption: 0,
}

// ============================================================
// PURE HELPERS
// ============================================================
export function canAfford(
  res: Resources,
  cost: Partial<Resources>,
  faction: Faction | null = null
): boolean {
  // Apply faction corruption multiplier before affordability check
  const effectiveCost = getEffectiveCostForFaction(cost, faction)
  return Object.entries(effectiveCost).every(([k, v]) => {
    const key = k as keyof Resources
    const val = v as number
    if (key === 'corruption') return (res.corruption || 0) >= val
    if (key === 'exposure') return true
    return (res[key] || 0) >= val
  })
}

export function applyCost(res: Resources, cost: Partial<Resources>): Resources {
  const n = { ...res }
  Object.entries(cost).forEach(([k, v]) => {
    const key = k as keyof Resources
    const val = v as number
    if (key === 'exposure') return
    if (key === 'corruption') { n.corruption = Math.max(0, (n.corruption || 0) - val); return }
    n[key] = Math.max(0, (n[key] || 0) - val) as never
  })
  return n
}

export function applyEffect(res: Resources, effect: Partial<Resources> & { ending?: string; isHidden?: boolean }): Resources {
  const n = { ...res }
  Object.entries(effect).forEach(([k, v]) => {
    if (k === 'ending' || k === 'isHidden') return
    const key = k as keyof Resources
    const val = v as number
    const cap = key === 'exposure' || key === 'corruption' ? 100 : 9999
    n[key] = Math.max(0, Math.min(cap, (n[key] || 0) + val)) as never
  })
  return n
}

export function isTierUnlocked(
  tierId: string,
  res: Resources,
  faction: Faction | null = null,
  discountUsedTiers: string[] = [],
  alignment: number = 100
): boolean {
  const tier = TIERS.find(t => t.id === tierId)
  if (!tier?.unlockRequires) return true
  const highAlignment = alignment >= 70
  const requirements = getTierUnlockWithDiscount(
    tier.unlockRequires,
    faction,
    discountUsedTiers.includes(tierId),
    highAlignment
  )
  return Object.entries(requirements).every(([k, v]) => (res[k as keyof Resources] || 0) >= (v as number))
}

export function getTierProgress(tierId: string, done: string[]): { count: number; total: number; pct: number } {
  const tier = TIERS.find(t => t.id === tierId)
  if (!tier) return { count: 0, total: 0, pct: 0 }
  const total = tier.missions.length
  const count = tier.missions.filter(m => done.includes(m.id)).length
  return { count, total, pct: total ? Math.round((count / total) * 100) : 0 }
}

function pickEvent(tierId: string, seen: string[], res: Resources): RandomEvent | null {
  const tier = TIERS.find(t => t.id === tierId)
  if (!tier?.randomEventPool?.length) return null
  const pool = RANDOM_EVENTS.filter(e =>
    tier.randomEventPool.includes(e.id) &&
    !seen.includes(e.id) &&
    (!e.triggerCondition || e.triggerCondition(res))
  )
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null
}

function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveGame(state: GameState) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)) } catch {}
}

// ============================================================
// MAIN HOOK
// ============================================================
export function useGameState() {
  const savedRef = useRef<GameState | null>(undefined as unknown as null)
  if (savedRef.current === (undefined as unknown as null)) savedRef.current = loadGame()
  const saved = savedRef.current

  const [res, setRes] = useState<Resources>(() => saved?.res || { ...INITIAL_RESOURCES })
  const [done, setDone] = useState<string[]>(() => saved?.done || [])
  const [seen, setSeen] = useState<string[]>(() => saved?.seen || [])
  const [ending, setEnding] = useState<string | null>(() => saved?.ending || null)
  const [log, setLog] = useState<string[]>(() => saved?.log || ['[ ZYRAXIS — INITIALIZED ]', 'Choose your faction.'])
  const [tick, setTick] = useState(0)
  const [activeEvent, setActiveEvent] = useState<RandomEvent | null>(null)
  const [factionId, setFactionId] = useState<FactionId | null>(() => (saved?.factionId as FactionId) || null)
  const [alignment, setAlignment] = useState<number>(() => saved?.alignment ?? ALIGNMENT_MAX)
  const [factionUniqueState, setFactionUniqueState] = useState<Record<string, unknown>>(
    () => saved?.factionUniqueState || {}
  )
  // Reinvest prompt state — shown after tier clear
  const [pendingReinvest, setPendingReinvest] = useState<{ tierId: string; bonus: Partial<Resources> } | null>(null)

  const faction = factionId ? FACTION_MAP[factionId] : null

  // Alignment ref — lets the tick effect read alignment without it being a dep
  const alignmentRef = useRef(alignment)
  useEffect(() => { alignmentRef.current = alignment }, [alignment])

  useEffect(() => {
    saveGame({ res, done, seen, ending, log, factionId, alignment, factionUniqueState })
  }, [res, done, seen, ending, log, factionId, alignment, factionUniqueState])

  // Passive tick — faction-aware, deps are [faction] only to avoid restart loop
  useEffect(() => {
    let intelTick = 0
    const iv = setInterval(() => {
      intelTick++
      const currentAlignment = alignmentRef.current
      setRes(r => {
        const m = faction?.modifier
        const awareMult = m?.passiveAwarenessMult ?? 1
        const next = { ...r, awareness: Math.min(9999, r.awareness + awareMult) }

        const resFloor = (currentAlignment > 0 && m?.passiveResourceFloor) ? m.passiveResourceFloor : 60
        next.resources = Math.min(9999, next.resources + (r.resources < resFloor ? 1 : 0))

        if (intelTick % 2 === 0) {
          next.intel = Math.min(9999, next.intel + (r.intel < 60 ? 1 : 0))
        }

        const expThreshold = m?.exposureBleedThreshold ?? 70
        if (r.exposure >= expThreshold) {
          next.influence = Math.max(0, next.influence - 2)
        }

        // Collapse Collective — passive corruption (stops at zero alignment)
        if (m?.corruptionPerTick && currentAlignment > 0) {
          next.corruption = Math.min(100, next.corruption + m.corruptionPerTick)
        }

        return next
      })
      setAlignment(a => Math.min(ALIGNMENT_MAX, a + 1))
      setTick(t => t + 1)
    }, 8000)
    return () => clearInterval(iv)
  }, [faction])

  const selectFaction = useCallback((id: FactionId) => {
    setFactionId(id)
    setAlignment(ALIGNMENT_MAX)
    setFactionUniqueState({
      freeMissionsUsedTiers: [],
      discountUsedTiers: [],
      previewUsed: false,
      previewChoice: null,
      hiddenChoicesUnlocked: false,
      reinvestAvailable: false,
      reinvestTier: null,
    })
    setLog(['[ FACTION SELECTED ]', `You are ${FACTION_MAP[id].name}. The mission begins.`])
  }, [])

  // Force of Will check — once per tier, locked at zero alignment
  const canUseForceOfWill = useCallback((tierId: string): boolean => {
    if (faction?.id !== 'unbound') return false
    if (alignment === 0) return false
    const usedTiers = (factionUniqueState.freeMissionsUsedTiers as string[]) || []
    // High alignment bonus: unlimited per tier
    if (alignment >= 70) return true
    return !usedTiers.includes(tierId)
  }, [faction, factionUniqueState, alignment])

  // Inside Access — activate discount for a tier
  const activateInsideAccess = useCallback((tierId: string): boolean => {
    if (faction?.id !== 'architects') return false
    if (alignment === 0) return false
    const usedTiers = (factionUniqueState.discountUsedTiers as string[]) || []
    if (usedTiers.includes(tierId)) return false
    setFactionUniqueState(s => ({
      ...s,
      discountUsedTiers: [...(s.discountUsedTiers as string[] || []), tierId]
    }))
    setLog(p => [`[♟] Inside Access activated — ${tierId} unlock requirements reduced`, ...p.slice(0, 28)])
    return true
  }, [faction, factionUniqueState, alignment])

  // Reinvest — confirm doubling after tier clear
  const confirmReinvest = useCallback(() => {
    if (!pendingReinvest) return
    const { bonus } = pendingReinvest
    const doubled: Partial<Resources> = {}
    if (bonus.resources) doubled.resources = bonus.resources * (alignment >= 70 ? 4 : 2)
    if (bonus.intel && alignment >= 70) doubled.intel = (bonus.intel || 0) * 2
    setRes(r => applyEffect(r, doubled))
    setLog(p => [`[◆] Reinvestment confirmed — bonus doubled`, ...p.slice(0, 28)])
    setPendingReinvest(null)
    setFactionUniqueState(s => ({ ...s, reinvestAvailable: false, reinvestTier: null }))
  }, [pendingReinvest, alignment])

  const dismissReinvest = useCallback(() => {
    setPendingReinvest(null)
  }, [])

  const executeMission = useCallback((
    mission: Mission,
    choice: MissionChoice,
    after: Resources | null,
    usedFreeAction = false
  ) => {
    if (choice.effect?.ending) {
      setEnding(choice.effect.ending)
      return
    }
    if (!after) return

    const tier = TIERS.find(t => t.missions.some(m => m.id === mission.id))
    const newDone = [...done, mission.id]

    setDone(newDone)
    setRes(after)
    setLog(p => [`[✓] ${mission.name} — ${choice.label}${usedFreeAction ? ' [FORCE OF WILL]' : ''}`, ...p.slice(0, 28)])

    // Track Force of Will usage (non-high-alignment Unbound)
    if (usedFreeAction && tier && alignment < 70) {
      setFactionUniqueState(s => ({
        ...s,
        freeMissionsUsedTiers: [...(s.freeMissionsUsedTiers as string[] || []), tier.id]
      }))
    }

    // Alignment
    const drops = checkAlignmentDrop(choice, faction)
    if (drops) {
      setAlignment(a => Math.max(0, a - ALIGNMENT_DROP))
    } else {
      setAlignment(a => Math.min(ALIGNMENT_MAX, a + ALIGNMENT_RISE))
    }

    if (tier) {
      const allDone = tier.missions.every(m => newDone.includes(m.id))
      if (allDone && tier.completionBonus) {
        setTimeout(() => {
          setRes(r => applyEffect(r, tier.completionBonus!))
          setLog(p => [`[⬆] ${tier.name} — tier cleared. Bonus received.`, ...p.slice(0, 28)])
          // Silent Economy reinvest prompt
          if (faction?.id === 'silent_economy' && alignment > 0) {
            setPendingReinvest({ tierId: tier.id, bonus: tier.completionBonus! })
          }
        }, 500)
      }

      const ev = pickEvent(tier.id, seen, after)
      if (ev && Math.random() < 0.7) {
        setSeen(s => [...s, ev.id])
        setTimeout(() => setActiveEvent(ev), 700)
      }
    }
  }, [done, seen, faction, alignment])

  const resolveEvent = useCallback((choice: EventChoice, after: Resources) => {
    setRes(after)
    setLog(p => [`[⚡] ${activeEvent?.title} — ${choice.label}`, ...p.slice(0, 28)])
    setActiveEvent(null)
  }, [activeEvent])

  const reset = useCallback(() => {
    localStorage.removeItem(SAVE_KEY)
    setRes({ ...INITIAL_RESOURCES })
    setDone([])
    setSeen([])
    setEnding(null)
    setFactionId(null)
    setAlignment(ALIGNMENT_MAX)
    setFactionUniqueState({})
    setLog(['[ ZYRAXIS — RESET ]', 'Choose your faction.'])
    setActiveEvent(null)
    setPendingReinvest(null)
  }, [])

  const collapseHiddenThreshold = alignment >= 70 ? 40 : 50
  const hiddenChoicesActive = faction?.id === 'collapse' && res.corruption >= collapseHiddenThreshold && alignment > 0

  return {
    res, done, seen, ending, log, tick, activeEvent,
    faction, factionId, alignment, factionUniqueState,
    hiddenChoicesActive, pendingReinvest,
    executeMission, resolveEvent, reset,
    selectFaction,
    canUseForceOfWill,
    activateInsideAccess,
    confirmReinvest,
    dismissReinvest,
    isTierUnlocked: (id: string) => isTierUnlocked(
      id, res, faction,
      (factionUniqueState.discountUsedTiers as string[]) || [],
      alignment
    ),
    getTierProgress: (id: string) => getTierProgress(id, done),
  }
}
