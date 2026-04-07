# 👁 ZYRAXIS

> *Rise. Expose. Collapse.*

A dark dystopian strategy game. You start at the bottom of a seven-tier pyramid of power called **The Veil** and work your way to the top — exposing it, infiltrating it, or burning it down.

Every mission has branching choices. Every choice has consequences. Random events fire between missions and force decisions you did not plan for. The path you take determines which of six possible endings you reach.

There is no right way to play. There is only the way you chose and what it cost you.

---

## THE WORLD

The world is called **The Veil**. At the top sits **Zyraxis, The Veilbearer** — not a person, but the system believing itself. Every institution, every mechanism, every manufactured belief flows from it and back into it.

### The Seven Tiers

| Tier | Name | Description |
|------|------|-------------|
| 1 | Zyraxis, The Veilbearer | The supreme force. The system itself. |
| 2 | The High Lieutenants | Vornak, Lord of Dominion. Maltheon, Keeper of Offerings. |
| 3 | The Puppet Circle | Five ruling houses controlling bloodlines, capital, and silence. |
| 4 | The Power Brokers | Civic Dominion. Monetary Engine. Sacred Order. Industrial Combine. |
| 5 | Control Mechanisms | Narrative Grid. Data Dominion. War Engine Complex. Spectacle System. |
| 6 | The Illusion | Division Protocol. Consumption Loop. False Light Doctrine. Obedience Code. |
| 7 | The Bound Collective | You. The managed population. The starting point. |

### The Factions

- **House Velorin** — Bloodline authority across three continents
- **The Arkan Consortium** — Global capital flow
- **The Solvane Order** — Geopolitical manipulation
- **The Draxian Trust** — Permanent silence enforcement
- **The Mirevault Line** — Legacy and generational control

---

## HOW TO PLAY

### Resources

You manage six stats:

| Stat | What It Means |
|------|---------------|
| ◎ Awareness | Truth spreading through the population |
| ◈ Influence | Your reach and persuasive power |
| ◆ Resources | Money, tools, manpower |
| ◉ Intel | What you know about the enemy |
| ⚠ Exposure | How much The Veil knows about you |
| ☣ Corruption | How much of the system you have absorbed |

### Core Loop

1. Click a tier to open it
2. Select a mission
3. Choose your approach — each has 2–3 paths with different risk/reward tradeoffs
4. Execute — resources update, outcome text plays
5. Random events fire after missions and force unplanned decisions
6. Complete all missions in a tier for a bonus resource injection
7. Higher tiers unlock as your stats cross their thresholds
8. Reach Zyraxis and choose your ending

### Passive Growth

- **Awareness** grows +1 every 8 seconds automatically
- **Resources** trickles slowly when below 60 — a floor, not an engine
- **Intel** trickles slowly when below 60, at half the rate of Resources
- Exposure above 70 drains your Influence over time — see Threat Consequences below

### Threat Consequences

These are real mechanical effects, not just warnings:

- **Exposure above 70** — The Veil actively suppresses your network. Influence bleeds -2 every 8 seconds until exposure drops.
- **Corruption above 70** — You have started thinking like the system. High corruption unlocks certain ending paths and blocks others. There is no mechanical penalty beyond your conscience.

Managing both meters is not optional on higher tiers.

### Corruption and Endings

High corruption does not close endings — it opens specific ones. The Assimilation reform path and the Total Collapse ending both require corruption as a prerequisite. Playing clean locks you out of those paths. Playing dirty opens them.

---

## THE ENDINGS

Six endings across three paths:

### Liberation
You expose the system.
- **The Unfiltered Truth** — Release everything. No redactions. The chaos is real.
- **Truth With Mercy** — Surgical redactions. Protect the uninvolved. Carry the weight of the line you drew.

### Assimilation
You take the throne.
- **The New Architect** — You replace Zyraxis. The mechanisms are the same. You are different. You tell yourself.
- **The Long Dismantling** — Take the throne to tear it down from inside. Requires 60+ corruption.

### Collapse
You burn it down.
- **Controlled Demolition** — Systematic destruction with parallel systems ready to fill the vacuum.
- **The World Unmade** — Total burn. Requires 80+ corruption. Whatever rises is not yours to shape.

---

## RANDOM EVENTS

Eleven random events fire at 70% probability after mission completions. They are tier-specific and never repeat in a single run. Each forces a three-way decision with real consequences and written outcomes.

Some examples:
- **Informant in Your Network** — Someone in your cell is feeding intel to the Narrative Grid
- **District Surveillance Blackout** — Four hours where the eye is blind
- **Veil Crackdown Initiated** — Only fires if your exposure is already above 40
- **Vornak Sends an Emissary** — The Lord of Dominion wants to negotiate. He is tired of Zyraxis too.

---

## TECH STACK

- **React 18** with hooks
- **TypeScript** — full type coverage
- **Vite** — build and dev server
- **No external UI libraries** — pure inline styles, intentional dark aesthetic
- **localStorage** — save system, persists between sessions

---

## GETTING STARTED

### Prerequisites

- Node.js 18+
- npm

### Install and Run

```bash
git clone https://github.com/YOUR_USERNAME/zyraxis.git
cd zyraxis
npm install
npm run dev
```

Open `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## DEPLOY TO NETLIFY

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

The `netlify.toml` in the root handles configuration automatically.

---

## DEPLOY TO VERCEL

```bash
npm install -g vercel
vercel
```

---

## PROJECT STRUCTURE

```
zyraxis/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ResourcePanel.tsx    # Left sidebar — operative stats + threat meters
│   │   ├── TierCard.tsx         # Hierarchy map cards
│   │   ├── MissionModal.tsx     # Mission selection and branching choices
│   │   └── EventModal.tsx       # Random events and ending screen
│   ├── data/
│   │   ├── tiers.ts             # All 7 tiers, missions, and choices
│   │   ├── events.ts            # 11 random events with branching
│   │   └── endings.ts           # 6 ending definitions
│   ├── hooks/
│   │   └── useGameState.ts      # All game logic, save/load, resource math
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Main layout and state wiring
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles and animations
├── index.html
├── package.json
├── netlify.toml
└── vite.config.ts
```

---

## KNOWN LIMITATIONS

- **Mobile layout** — The three-column layout requires ~800px minimum width. Mobile support is on the v2 roadmap.
- **No multiplayer** — Fully single-player in this version. Faction and community layers are planned for v3.

---

## ROADMAP

### v1.0 — Current
- Seven-tier hierarchy with full mission branching
- Six resources with real threat consequences
- Eleven random events
- Six endings across three paths
- Local save system
- Passive growth with threat drain mechanics

### v2.0 — Faction System
- Player selects a faction at game start
- Faction affects available missions and event outcomes
- Global faction leaderboard

### v3.0 — Live World
- Weekly encrypted broadcast events
- Community decodes and responds collectively
- Player actions feed a shared global control meter
- Founding member rank system

### v4.0 — Monetization
- Founding member badges — permanent, visible
- Faction subscription — deeper lore, exclusive events
- Live competitive events between factions
- Faction identity merchandise

---

## DESIGN PHILOSOPHY

> *This is not a game about conspiracy theories. It is a game about how systems maintain themselves — and what it costs to fight them, join them, or destroy them.*

Every mechanic has a moral dimension. Corruption grows when you use the system's methods. Exposure grows when you move too fast. The ending you reach depends not just on your final stats but on every choice you made to accumulate them.

The writing is intentional. Outcome text is not flavor. It is consequence.

---

## CONTRIBUTING

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-idea`
3. Commit: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-idea`
5. Open a pull request

Most open areas for contribution:
- Additional random events — follow the schema in `src/data/events.ts`
- New missions for existing tiers
- Mobile responsive layout
- Faction system design

---

## LICENSE

MIT — use it, build on it, make it yours. See `LICENSE` for full terms.

---

## CONTACT

Built by **Rico** — serial entrepreneur, film producer, systems thinker.

> *The Veil is fictional. The systems it describes are not.*

---

*CLASSIFIED — RESTRICTED ACCESS — LEVEL OMEGA*
