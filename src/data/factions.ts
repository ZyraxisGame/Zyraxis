import type { Resources } from '../types'

export type FactionId = 'unbound' | 'architects' | 'grey_network' | 'collapse' | 'silent_economy'

export interface FactionModifier {
  awarenessGain?: number
  influenceGain?: number
  resourcesGain?: number
  intelGain?: number
  corruptionCostMultiplier?: number
  passiveResourceFloor?: number
  passiveAwarenessMult?: number
  exposureBleedThreshold?: number
  tierUnlockDiscount?: number
  corruptionPerTick?: number
}

export interface FactionUniqueState {
  freeMissionsUsedTiers?: string[]
  discountUsedTiers?: string[]
  previewUsed?: boolean
  previewChoice?: string | null
  hiddenChoicesUnlocked?: boolean
  reinvestAvailable?: boolean
  reinvestTier?: string | null
}

export interface Faction {
  id: FactionId
  name: string
  subtitle: string
  icon: string
  color: string
  accent: string
  philosophy: string
  uniqueMechanic: string
  uniqueMechanicDesc: string
  weakness: string
  naturalEnding: string
  modifier: FactionModifier
  alignmentRaisedBy: string
  alignmentLoweredBy: string
  alignmentDropTriggers: {
    corruptionGain?: number
    exposureGain?: number
    endingPaths?: string[]
  }
  alignmentBonusDesc: string
  alignmentPenaltyDesc: string
}

export const FACTIONS: Faction[] = [
  {
    id: 'unbound',
    name: 'The Unbound',
    subtitle: 'Pure Liberation',
    icon: '☀',
    color: '#b45309',
    accent: '#fbbf24',
    philosophy: 'No deals. No compromise. No corruption. The truth requires clean hands — anything else is just a slower version of what you are fighting against. You do not negotiate with the system. You expose it.',
    uniqueMechanic: 'FORCE OF WILL',
    uniqueMechanicDesc: 'Once per tier, execute any mission at zero resource cost. Pure conviction, no compromise. Resets at each new tier.',
    weakness: 'Any choice that adds corruption requires double the corruption threshold. Corruption-gated endings are effectively locked unless you farm corruption deliberately.',
    naturalEnding: 'Liberation — The Unfiltered Truth',
    modifier: {
      passiveAwarenessMult: 2,
      corruptionCostMultiplier: 2,
    },
    alignmentRaisedBy: 'Completing missions without taking corruption. Choosing exposure over compromise.',
    alignmentLoweredBy: 'Any choice that adds 5+ corruption.',
    alignmentDropTriggers: { corruptionGain: 5 },
    alignmentBonusDesc: 'High alignment: Force of Will available on every mission in a tier, not just once.',
    alignmentPenaltyDesc: 'Zero alignment: Force of Will locked for remainder of run.',
  },
  {
    id: 'architects',
    name: 'The Architects',
    subtitle: 'System Replacement',
    icon: '♟',
    color: '#1e1b4b',
    accent: '#818cf8',
    philosophy: 'The system is not the problem. The wrong people are running it. Power does not disappear when you destroy it — it just moves. Better that it moves to someone who understands what it costs.',
    uniqueMechanic: 'INSIDE ACCESS',
    uniqueMechanicDesc: 'Once per tier, activate Inside Access to reduce that tier\'s unlock requirement by 20% across all stats. Opens locked tiers before you\'ve hit the threshold. One use per tier.',
    weakness: 'Awareness grows 25% slower passively. They are not trying to wake the population — they are positioning for control.',
    naturalEnding: 'Assimilation — The New Architect or The Long Dismantling',
    modifier: {
      influenceGain: 1.25,
      passiveAwarenessMult: 0.75,
      tierUnlockDiscount: 0.20,
    },
    alignmentRaisedBy: 'Choices that gain influence. Taking leverage over exposure.',
    alignmentLoweredBy: 'Any choice that moves toward a Liberation ending. Choices with 25+ exposure gain.',
    alignmentDropTriggers: { exposureGain: 25, endingPaths: ['liberation_full', 'liberation_measured'] },
    alignmentBonusDesc: 'High alignment: Inside Access discount increases to 30%.',
    alignmentPenaltyDesc: 'Zero alignment: Inside Access locked. Influence gains return to normal.',
  },
  {
    id: 'grey_network',
    name: 'The Grey Network',
    subtitle: 'Information Supremacy',
    icon: '◉',
    color: '#0c4a6e',
    accent: '#38bdf8',
    philosophy: 'Information is the only real weapon. Everything else — force, money, ideology — is just information wearing a costume. You do not need to be seen. You need to know.',
    uniqueMechanic: 'FOREKNOWLEDGE',
    uniqueMechanicDesc: 'During any random event, hover any choice to preview its outcome before committing. One preview per event.',
    weakness: 'Resources generation is 20% slower. They invest in knowledge, not infrastructure.',
    naturalEnding: 'Liberation — Truth With Mercy',
    modifier: {
      intelGain: 2.0,
      resourcesGain: 0.8,
      passiveResourceFloor: 160,  // trickle fills late-game resource gap to Zyraxis threshold
    },
    alignmentRaisedBy: 'Choices that gain intel. Staying below 40 exposure.',
    alignmentLoweredBy: 'Any choice that adds 20+ exposure. Being seen breaks the network.',
    alignmentDropTriggers: { exposureGain: 20 },
    alignmentBonusDesc: 'High alignment: Foreknowledge remains active. Intel gains fully maintained.',
    alignmentPenaltyDesc: 'Zero alignment: Foreknowledge locked. Intel gains return to normal.',
  },
  {
    id: 'collapse',
    name: 'The Collapse Collective',
    subtitle: 'Total Destruction',
    icon: '🜏',
    color: '#7f1d1d',
    accent: '#ef4444',
    philosophy: 'The structure cannot be reformed. Every attempt to fix it from inside just makes it stronger. It has to burn — all of it — and whatever grows from the ash will at least be honest about what it is.',
    uniqueMechanic: 'CORRUPTION AS FUEL',
    uniqueMechanicDesc: 'Corruption generates passively every tick. At 50+ corruption, hidden fourth choices unlock on select missions — options no other faction can see. Destruction has its own momentum.',
    weakness: 'Influence grows 12% slower. They do not build coalitions. They detonate things.',
    naturalEnding: 'Collapse — Controlled Demolition or The World Unmade',
    modifier: {
      influenceGain: 0.95,  // FIXED: was 0.88, now 0.95 — sim-verified winnable with Zyraxis threshold 330
      exposureBleedThreshold: 85,
      corruptionPerTick: 1,
    },
    alignmentRaisedBy: 'Choices that increase corruption. High-exposure decisive actions.',
    alignmentLoweredBy: 'Any choice that moves toward assimilation endings. Reform betrays the mission.',
    alignmentDropTriggers: { endingPaths: ['assimilation_cold', 'assimilation_reform'] },
    alignmentBonusDesc: 'High alignment: Hidden choices appear at 40 corruption instead of 50.',
    alignmentPenaltyDesc: 'Zero alignment: Passive corruption gain stops. Hidden choices locked.',
  },
  {
    id: 'silent_economy',
    name: 'The Silent Economy',
    subtitle: 'Parallel Systems',
    icon: '◆',
    color: '#065f46',
    accent: '#34d399',
    philosophy: 'You do not fight the system by destroying it. You make it irrelevant. Build parallel structures — trade networks, supply chains, communication channels — until the old system is talking to itself in an empty room.',
    uniqueMechanic: 'REINVESTMENT',
    uniqueMechanicDesc: 'After clearing any tier, a Reinvest button appears. Click it to double the resources from that tier\'s completion bonus. One use per tier.',
    weakness: 'Intel gains are 15% slower. They build supply chains, not intelligence networks.',
    naturalEnding: 'Collapse — Controlled Demolition or Assimilation — The Long Dismantling',
    modifier: {
      resourcesGain: 1.4,
      intelGain: 0.92,      // FIXED: was 0.85, now 0.92 — sim-verified winnable
      passiveResourceFloor: 100,
    },
    alignmentRaisedBy: 'Choices that gain resources. Operating below 60 exposure.',
    alignmentLoweredBy: 'Any choice that pushes exposure above 60. Silence is the strategy.',
    alignmentDropTriggers: { exposureGain: 15 },
    alignmentBonusDesc: 'High alignment: Reinvestment doubles intel bonus as well as resources.',
    alignmentPenaltyDesc: 'Zero alignment: Reinvestment locked. Resources floor returns to 60.',
  },
]

export const FACTION_MAP = Object.fromEntries(FACTIONS.map(f => [f.id, f])) as Record<FactionId, Faction>

// ============================================================
// MODIFIER HELPERS
// ============================================================

export function applyFactionGains(
  effect: Partial<Resources> & { ending?: string; isHidden?: boolean },
  faction: Faction | null,
  alignment: number = 100
): Partial<Resources> & { ending?: string; isHidden?: boolean } {
  if (!faction) return effect
  const m = faction.modifier
  const n = { ...effect }

  if (n.awareness && n.awareness > 0 && m.awarenessGain) n.awareness = Math.round(n.awareness * m.awarenessGain)

  // Architects: influence bonus reverts to normal at zero alignment
  const effectiveInfluenceGain = (faction.id === 'architects' && alignment === 0) ? undefined : m.influenceGain
  if (n.influence && n.influence > 0 && effectiveInfluenceGain) n.influence = Math.round(n.influence * effectiveInfluenceGain)

  if (n.resources && n.resources > 0 && m.resourcesGain) n.resources = Math.round(n.resources * m.resourcesGain)
  if (n.intel && n.intel > 0 && m.intelGain) n.intel = Math.round(n.intel * m.intelGain)

  return n
}

// Unbound corruption gate: requires double corruption to access corruption-gated endings
export function getEffectiveCostForFaction(
  cost: Partial<Resources>,
  faction: Faction | null
): Partial<Resources> {
  if (!faction?.modifier.corruptionCostMultiplier) return cost
  const n = { ...cost }
  if (n.corruption) {
    n.corruption = Math.round(n.corruption * faction.modifier.corruptionCostMultiplier)
  }
  return n
}

export function checkAlignmentDrop(
  choice: { effect: Partial<Resources> & { ending?: string } },
  faction: Faction | null
): boolean {
  if (!faction) return false
  const triggers = faction.alignmentDropTriggers
  const effect = choice.effect

  if (triggers.corruptionGain && (effect.corruption || 0) >= triggers.corruptionGain) return true
  if (triggers.exposureGain && (effect.exposure || 0) >= triggers.exposureGain) return true
  if (triggers.endingPaths && effect.ending && triggers.endingPaths.includes(effect.ending)) return true

  return false
}

export function getTierUnlockWithDiscount(
  unlockRequires: Partial<Resources>,
  faction: Faction | null,
  discountUsed: boolean,
  highAlignment: boolean = false
): Partial<Resources> {
  if (!faction?.modifier.tierUnlockDiscount || discountUsed) return unlockRequires
  // High alignment bonus: 30% discount instead of 20%
  const baseDiscount = highAlignment ? 0.30 : faction.modifier.tierUnlockDiscount
  const multiplier = 1 - baseDiscount
  const result: Partial<Resources> = {}
  Object.entries(unlockRequires).forEach(([k, v]) => {
    result[k as keyof Resources] = Math.floor((v as number) * multiplier)
  })
  return result
}
