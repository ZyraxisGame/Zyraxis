// ============================================================
// CORE TYPES
// ============================================================

export interface Resources {
  awareness: number
  influence: number
  resources: number
  intel: number
  exposure: number
  corruption: number
}

export type ResourceKey = keyof Resources

export interface MissionChoice {
  label: string
  desc: string
  cost: Partial<Resources>
  effect: Partial<Resources> & { ending?: string; isHidden?: boolean }
  outcome: string
  factionOnly?: string   // if set, only this faction sees this choice
}

export interface Mission {
  id: string
  name: string
  desc: string
  choices: MissionChoice[]
}

export interface Tier {
  id: string
  tier: number
  name: string
  subtitle: string
  icon: string
  color: string
  accent: string
  control: number
  lore: string
  missions: Mission[]
  unlockRequires: Partial<Resources> | null
  completionBonus: Partial<Resources> | null
  randomEventPool: string[]
}

export interface EventChoice {
  label: string
  desc: string
  effect: Partial<Resources>
  consequence: string
}

export interface RandomEvent {
  id: string
  tier: string
  title: string
  desc: string
  icon: string
  triggerCondition?: (r: Resources) => boolean
  choices: EventChoice[]
}

export interface Ending {
  title: string
  subtitle: string
  color: string
  icon: string
  desc: string
}

export interface GameState {
  res: Resources
  done: string[]
  seen: string[]
  ending: string | null
  log: string[]
  factionId: string | null
  alignment: number
  factionUniqueState: Record<string, unknown>
}

