import type { Tier } from '../types'

export const TIERS: Tier[] = [
  {
    id: 'bound', tier: 7,
    name: 'The Bound Collective', subtitle: 'The Managed Population',
    icon: '⛓', color: '#6b7280', accent: '#9ca3af', control: 100,
    lore: 'You are one of billions living beneath The Veil — a civilization that believes itself free. Every thought curated. Every desire engineered. Every rebellion predicted. You have begun to remember. This is the most dangerous thing you have ever done.',
    missions: [
      {
        id: 'b1', name: 'Spread Whispers',
        desc: 'Distribute counter-narrative through the underground network. Every channel carries different risk.',
        choices: [
          { label: 'Physical drops — slow but invisible', desc: 'Paper. Chalk marks. No digital signal. The Grid cannot track what it cannot detect.', cost: { resources: 5 }, effect: { awareness: 8, influence: 5, exposure: 1 }, outcome: 'The whispers spread slowly. The Grid does not notice. You stay invisible.' },
          { label: 'Encrypted digital burst', desc: 'Faster reach. Higher exposure risk if the cipher breaks.', cost: { resources: 3, intel: 5 }, effect: { awareness: 18, influence: 10, exposure: 8 }, outcome: 'Rapid spread. The Data Dominion flags an anomaly but cannot source it. Yet.' },
          { label: 'Piggyback on Spectacle System feeds', desc: 'Hide truth inside entertainment. The Grid is too arrogant to audit its own channels.', cost: { influence: 8 }, effect: { awareness: 25, influence: 5, exposure: 3, corruption: 2 }, outcome: 'You used their system against them. It works. Something about that method is worth remembering.' },
        ],
      },
      {
        id: 'b2', name: 'Recruit the Disillusioned',
        desc: 'People sense something is wrong. Find the ones close to waking up.',
        choices: [
          { label: 'Target the economically abandoned', desc: 'Those the system failed are closest to seeing it clearly.', cost: { resources: 8 }, effect: { influence: 20, resources: 8, exposure: 2 }, outcome: 'Twelve new contacts. Angry people with nothing to lose and a reason to move.' },
          { label: 'Target mid-level system workers', desc: 'Inside knowledge. Higher risk — they have more to lose.', cost: { resources: 10, awareness: 5 }, effect: { influence: 15, intel: 15, exposure: 6 }, outcome: 'Three people with access to systems you need. They are scared. They are in.' },
          { label: 'Target the culturally restless', desc: 'Artists, writers, musicians feel the lie before they can name it.', cost: { influence: 8 }, effect: { influence: 25, awareness: 15, exposure: 4, corruption: 1 }, outcome: 'Your network gains a voice. Movements that outlast their founders need an aesthetic.' },
        ],
      },
      {
        id: 'b3', name: 'Map the Grid',
        desc: 'Identify surveillance infrastructure in your district. Knowledge is the first weapon.',
        choices: [
          { label: 'Ground-level observation — walk it', desc: 'Manual mapping. Slow. Accurate. Zero digital footprint.', cost: { resources: 5 }, effect: { intel: 25, awareness: 5, exposure: 2 }, outcome: 'Every camera node, every sensor cluster, every dead zone within four kilometers.' },
          { label: 'Intercept Grid maintenance signals', desc: 'Their own diagnostic traffic reveals the architecture.', cost: { intel: 5, resources: 8 }, effect: { intel: 35, awareness: 10, exposure: 10 }, outcome: 'The full district map downloads in 40 minutes. You also capture three operator credentials.' },
          { label: 'Recruit a Grid maintenance worker', desc: 'The people who maintain the system know where the blind spots are.', cost: { resources: 12, influence: 10 }, effect: { intel: 30, influence: 10, exposure: 5 }, outcome: 'They draw you the map from memory. They have been building it for years. Waiting for someone to ask.' },
        ],
      },
    ],
    unlockRequires: null,
    completionBonus: { awareness: 20, influence: 10 },
    randomEventPool: ['re_informant', 're_blackout', 're_defector'],
  },
  {
    id: 'illusion', tier: 6,
    name: 'The Illusion', subtitle: 'Behavior Control Layer',
    icon: '🜏', color: '#7c3aed', accent: '#a78bfa', control: 85,
    lore: 'The Illusion is not a place. It is a state. Division Protocol keeps populations fighting each other. The Consumption Loop ensures desire is never satisfied. The Isolation Field disconnects individuals from collective power. The False Light Doctrine replaces truth with comfort. You cannot fight what people cannot see.',
    missions: [
      {
        id: 'i1', name: 'Counter the Division Protocol',
        desc: 'The Veil keeps populations fractured along manufactured lines. Break the architecture of separation.',
        choices: [
          { label: 'Unite through shared economic reality', desc: 'Strip identity markers from the equation. Show people they share the same enemy.', cost: { awareness: 20, influence: 10 }, effect: { awareness: 20, influence: 30, corruption: 1 }, outcome: 'Three previously hostile communities find common ground over who is actually extracting from all of them.' },
          { label: 'Expose the architects of division', desc: 'Name the system designers. Show the mechanism, not just its effects.', cost: { intel: 20, awareness: 15 }, effect: { awareness: 35, intel: 10, exposure: 12, corruption: 3 }, outcome: 'The names go public. The people who believe you cannot unlearn it.' },
          { label: 'Create new shared symbols', desc: 'You cannot fight narrative with data alone. You need new myth.', cost: { influence: 25, resources: 10 }, effect: { influence: 40, awareness: 15, corruption: 5 }, outcome: 'Something new is growing in the Collective. An identity the Veil did not manufacture.' },
        ],
      },
      {
        id: 'i2', name: 'Break the Obedience Code',
        desc: 'Compliance is manufactured. Find the mechanism. Disrupt it.',
        choices: [
          { label: 'Document and publish enforcement patterns', desc: 'Show people exactly how compliance is extracted from them.', cost: { intel: 15, resources: 10 }, effect: { awareness: 30, intel: 10, exposure: 10 }, outcome: 'The documentation is brutal in its clarity. People did not know they were following a script.' },
          { label: 'Coordinated non-compliance event', desc: 'Mass simultaneous refusal of one minor rule. Scale breaks the protocol.', cost: { influence: 25, awareness: 20 }, effect: { influence: 35, awareness: 20, exposure: 18, corruption: 2 }, outcome: 'Sixty thousand people refuse the same compliance signal at the same moment. The enforcers have no protocol for this.' },
          { label: 'Infiltrate the compliance design bureau', desc: 'The architects of obedience have an office. It has files.', cost: { intel: 20, resources: 15, influence: 10 }, effect: { intel: 40, awareness: 15, exposure: 8, corruption: 6 }, outcome: 'You have the behavioral design documents. The obedience architecture laid out in presentation decks. Forty years of it.' },
        ],
      },
      {
        id: 'i3', name: 'Disrupt the Consumption Loop',
        desc: 'Desire is engineered. The loop feeds the system. Break the cycle.',
        choices: [
          { label: 'Broadcast the production reality', desc: 'Show where things come from. What they cost. Who paid.', cost: { resources: 20, influence: 15 }, effect: { awareness: 25, influence: 20, corruption: 2 }, outcome: 'Purchasing patterns shift in three districts. The Monetary Engine registers the anomaly.' },
          { label: 'Introduce scarcity above the loop', desc: 'Disrupt supply at the distribution level. Force the population to confront the system.', cost: { resources: 30, intel: 15 }, effect: { resources: 20, awareness: 30, exposure: 15, corruption: 10 }, outcome: 'Shortages create questions. Questions create anger. Anger finds your network.' },
          { label: 'Build parallel supply networks', desc: 'Do not disrupt. Replace. Give people something outside the loop.', cost: { resources: 25, influence: 20 }, effect: { resources: 30, influence: 35, awareness: 15 }, outcome: 'The network grows. People who use it stop needing the loop. You are building a counter-economy.' },
        ],
      },
    ],
    unlockRequires: { awareness: 40, influence: 30 },
    completionBonus: { awareness: 30, influence: 20, intel: 10 },
    randomEventPool: ['re_viral', 're_false_prophet', 're_crackdown'],
  },
  {
    id: 'mechanisms', tier: 5,
    name: 'Control Mechanisms', subtitle: 'The Infrastructure of Power',
    icon: '⚙', color: '#b45309', accent: '#f59e0b', control: 70,
    lore: 'The Narrative Grid rewrites history as it happens. The Learning Authority shapes minds before they can question authority. The BioRegulation Sector manages the population\'s physical capacity to resist. The War Engine Complex keeps populations afraid and grateful simultaneously. These are not tools. They are organs of The Veil\'s body.',
    missions: [
      {
        id: 'm1', name: 'Sabotage the Narrative Grid',
        desc: 'The Grid controls what happened. Your job is to control what happens next.',
        choices: [
          { label: 'Inject a single irrefutable truth', desc: 'One fact so clean it cannot be explained away.', cost: { intel: 25, influence: 20 }, effect: { awareness: 40, exposure: 12, corruption: 3 }, outcome: "The fact propagates. The Grid's suppression response confirms it. Their denial becomes the proof." },
          { label: 'Flood the zone with contradictions', desc: 'Do not fight their narrative. Multiply everything until nothing is believable.', cost: { intel: 30, resources: 20 }, effect: { awareness: 25, influence: 25, exposure: 8, corruption: 14 }, outcome: "The Grid's credibility collapses. So does general trust in information. You used their weapon. You feel it." },
          { label: 'Compromise three Grid editors', desc: 'Turn them. Not their output — them, specifically.', cost: { intel: 20, influence: 30, resources: 15 }, effect: { intel: 35, influence: 40, exposure: 20, corruption: 8 }, outcome: 'Three editors are now yours. The Grid is quietly eating itself from inside.' },
        ],
      },
      {
        id: 'm2', name: 'Hack the Data Dominion',
        desc: 'The surveillance architecture is vast. Find its limits and exploit them.',
        choices: [
          { label: 'Extract the complete surveillance map', desc: 'Know exactly what they see. Operate only in the gaps.', cost: { intel: 30, resources: 15 }, effect: { intel: 50, exposure: 12 }, outcome: 'Every blind spot in the system. This changes everything about how you move.' },
          { label: 'Leak the citizen profiles back to citizens', desc: 'Show people what the Dominion has collected on them personally.', cost: { intel: 35, influence: 20 }, effect: { awareness: 50, influence: 30, exposure: 25 }, outcome: 'When people see their own profiles the fear converts to fury at a rate the Veil did not model for.' },
          { label: 'Plant recursive errors in the architecture', desc: 'Corrupt the data. Let the machine surveil itself into confusion.', cost: { intel: 40, resources: 20 }, effect: { intel: 30, resources: 25, exposure: 18, corruption: 10 }, outcome: 'The Data Dominion runs a self-diagnostic loop for six days. Your operatives move freely.' },
        ],
      },
      {
        id: 'm3', name: 'Disrupt the Spectacle System',
        desc: 'Entertainment is the sedative. Pull back the curtain.',
        choices: [
          { label: 'Publish behind-the-scenes production briefs', desc: 'Show who makes the spectacle and what the instructions say.', cost: { awareness: 30, resources: 12 }, effect: { awareness: 35, influence: 30, resources: 15, exposure: 10 }, outcome: "Production briefs go public. The word 'managed' appears 847 times across the documents. Donations pour in from people who want the work to continue." },
          { label: 'Create competing spectacle', desc: 'Do not kill entertainment. Redirect it. Make truth more compelling.', cost: { influence: 35, resources: 15 }, effect: { influence: 50, awareness: 25, resources: 10, corruption: 6 }, outcome: 'Your content moves faster than theirs. The counter-economy around it generates its own momentum.' },
          { label: 'Shut down three major broadcast nodes', desc: 'Physical disruption. Hard to ignore. Harder to spin.', cost: { resources: 18, intel: 20 }, effect: { awareness: 30, exposure: 30, influence: 20, corruption: 5 }, outcome: 'The silence where the spectacle was is louder than the spectacle. Some people start looking around.' },
        ],
      },
    ],
    unlockRequires: { awareness: 80, influence: 60, intel: 40 },
    completionBonus: { intel: 30, awareness: 20, influence: 20, resources: 30 },
    randomEventPool: ['re_insider', 're_media_break'],
  },
  {
    id: 'brokers', tier: 4,
    name: 'The Power Brokers', subtitle: 'Institutional Control',
    icon: '🏛', color: '#065f46', accent: '#34d399', control: 55,
    lore: 'The Civic Dominion is law weaponized against the governed. The Monetary Engine runs on debt, not currency. The Industrial Combine extracts until there is nothing left. The Sacred Order manufactures moral authority so the population polices itself. These institutions do not serve. They harvest.',
    missions: [
      {
        id: 'p1', name: 'Attack the Monetary Engine',
        desc: 'The debt architecture is the chain. Every approach has consequences.',
        choices: [
          { label: 'Publish the debt design documents', desc: 'The architecture of perpetual debt was deliberately designed. Show who designed it.', cost: { intel: 40, influence: 30 }, effect: { awareness: 50, influence: 30, exposure: 20, corruption: 5 }, outcome: 'Two hundred pages of deliberate intention. The population was never meant to escape the debt cycle.' },
          { label: 'Build a parallel debt-free economy', desc: 'Stop fighting the engine. Build around it until it becomes irrelevant.', cost: { resources: 50, influence: 40 }, effect: { resources: 70, influence: 50, awareness: 20 }, outcome: 'Three districts are now operating partially outside the Monetary Engine. The Engine has noticed.' },
          { label: 'Trigger a coordinated run on the system', desc: 'Simultaneous withdrawal. Hit the Engine faster than it can respond.', cost: { intel: 45, resources: 35, influence: 25 }, effect: { resources: 60, awareness: 40, exposure: 35, corruption: 15 }, outcome: 'The Engine buckles for 11 days. They stabilize it. But you have shown it can buckle.' },
        ],
      },
      {
        id: 'p2', name: 'Steal Elite Intelligence',
        desc: "The Civic Dominion's sealed archives hold the operating instructions for the entire power structure.",
        choices: [
          { label: 'Direct infiltration — plant an operative', desc: 'Someone goes in. Someone may not come back out.', cost: { intel: 50, resources: 30 }, effect: { intel: 70, influence: 30, exposure: 25 }, outcome: 'Forty years of classified governance documents. The operative makes it out. You were not certain they would.' },
          { label: 'Remote network penetration', desc: 'No human risk on your side. High technical exposure.', cost: { intel: 55, resources: 20 }, effect: { intel: 80, exposure: 35 }, outcome: 'The archive downloads in 22 minutes. You remain inside their system for three more hours before you leave.' },
          { label: 'Compromise a senior archivist', desc: 'Find their leverage. Use it. The Veil does this to people every day.', cost: { intel: 30, resources: 25, influence: 30 }, effect: { intel: 60, influence: 40, exposure: 15, corruption: 20 }, outcome: 'The archivist cooperates. You know why. You do not let yourself consider whether there was another way.' },
        ],
      },
      {
        id: 'p3', name: 'Destabilize the Sacred Order',
        desc: 'Manufactured moral authority is the most durable control mechanism.',
        choices: [
          { label: "Release the Order's financial records", desc: 'Money tells the truth that doctrine will not.', cost: { awareness: 50, influence: 40 }, effect: { awareness: 50, influence: 40, exposure: 15 }, outcome: "The Sacred Order's financial architecture goes public. The belief is not destroyed. But the authority is." },
          { label: 'Amplify dissenting voices from within', desc: 'Every institution has people who know it is wrong. Amplify them.', cost: { influence: 50, intel: 30 }, effect: { influence: 60, awareness: 30, corruption: 5 }, outcome: 'Internal dissent becomes the story. The Order cannot silence its own without proving the critique.' },
          { label: 'Build counter-doctrine', desc: 'Do not destroy the human need for meaning. Give people something real instead.', cost: { awareness: 40, influence: 35, resources: 20 }, effect: { awareness: 40, influence: 55, corruption: 8 }, outcome: 'The counter-doctrine spreads. You are building something that will outlast you. That is new.' },
        ],
      },
    ],
    unlockRequires: { awareness: 130, influence: 100, intel: 80, resources: 40 },
    completionBonus: { resources: 40, intel: 30, influence: 30 },
    randomEventPool: ['re_banker'],
  },
  {
    id: 'puppet', tier: 3,
    name: 'The Puppet Circle', subtitle: 'Five Ruling Houses',
    icon: '♟', color: '#9f1239', accent: '#f43f5e', control: 40,
    lore: 'House Velorin commands bloodline authority across three continents. The Arkan Consortium controls global capital flow. The Solvane Order orchestrates geopolitical chess with populations as pieces. The Draxian Trust enforces permanent silence. The Mirevault Line ensures the structure survives across generations. Five families. One system.',
    missions: [
      {
        id: 'pp1', name: 'Expose House Velorin',
        desc: 'The bloodline records exist. Getting them to the public is the question.',
        choices: [
          { label: 'Mass simultaneous release — everywhere at once', desc: 'Flood every channel before suppression can coordinate.', cost: { intel: 60, awareness: 50, influence: 40 }, effect: { awareness: 80, influence: 50, exposure: 40, corruption: 10 }, outcome: 'The Velorin records are global in four hours. The suppression response confirms every detail.' },
          { label: 'Strategic single-source release', desc: 'Give it to one credible voice. Let legitimacy carry the weight.', cost: { intel: 60, resources: 30 }, effect: { awareness: 60, influence: 60, exposure: 25, corruption: 8 }, outcome: 'Slower. Cleaner. The records survive because the source cannot be discredited.' },
          { label: 'Hold it as leverage', desc: 'The threat of exposure is sometimes more powerful than exposure itself.', cost: { intel: 50, influence: 30 }, effect: { influence: 80, intel: 40, resources: 40, corruption: 22 }, outcome: 'Three Velorin subordinates flip to avoid appearing in the documents. You now control four seats inside House operations.' },
        ],
      },
      {
        id: 'pp2', name: 'Infiltrate the Arkan Consortium',
        desc: 'The financial inner circle. Every door here has a price tag.',
        choices: [
          { label: 'Place a deep cover operative at the table', desc: 'Years of preparation. One shot.', cost: { resources: 60, influence: 60, intel: 30 }, effect: { resources: 80, intel: 60, corruption: 15, exposure: 30 }, outcome: 'Your operative is inside. The cost is that they have to become what they are pretending to be.' },
          { label: 'Penetrate the Consortium transaction ledger', desc: 'Follow the money. All of it. Everywhere it goes.', cost: { intel: 70, resources: 40 }, effect: { intel: 90, awareness: 50, exposure: 45 }, outcome: 'The complete transaction architecture. Every account. Every transfer. The full map of global capital.' },
          { label: 'Turn a mid-level analyst', desc: 'Not the inner circle. But close enough to matter.', cost: { influence: 50, intel: 40, resources: 20 }, effect: { intel: 50, resources: 50, influence: 40, corruption: 10, exposure: 20 }, outcome: 'They hand over five years of internal communications in a single meeting.' },
        ],
      },
      {
        id: 'pp3', name: 'Neutralize the Draxian Trust',
        desc: 'The enforcers of permanent silence. They are the reason people disappear.',
        choices: [
          { label: 'Publish their complete operational history', desc: 'Every disappearance they arranged. Documented and public.', cost: { intel: 70, awareness: 50 }, effect: { awareness: 90, influence: 60, exposure: 50, corruption: 10 }, outcome: 'Three hundred documented cases. The Trust cannot operate in daylight.' },
          { label: 'Flip a senior enforcer', desc: 'Someone inside knows where all the bodies are. Find them.', cost: { intel: 60, influence: 70, resources: 30 }, effect: { intel: 80, influence: 80, corruption: 25, exposure: 25 }, outcome: 'The enforcer hands you case files on twelve active operations targeting your network.' },
          { label: 'Make them afraid of you', desc: 'They use fear as currency. Show them it spends both ways.', cost: { resources: 60, intel: 50, influence: 50 }, effect: { influence: 70, resources: 50, corruption: 32, exposure: 35 }, outcome: 'Three Trust operatives receive detailed files on their own operations, sent anonymously. They do not know how you got it.' },
        ],
      },
    ],
    unlockRequires: { awareness: 200, influence: 170, intel: 130, resources: 100 },
    completionBonus: { awareness: 50, influence: 50, intel: 50, resources: 30 },
    randomEventPool: ['re_heir'],
  },
  {
    id: 'lieutenants', tier: 2,
    name: 'The High Lieutenants', subtitle: 'Vornak & Maltheon',
    icon: '⚔', color: '#7f1d1d', accent: '#ef4444', control: 20,
    lore: 'Vornak, Lord of Dominion, built the physical enforcement architecture over forty years. His network is loyal because it is profitable. Maltheon, Keeper of Offerings, turned submission into theology. Both serve Zyraxis — and both, you sense, have begun to wonder if they should.',
    missions: [
      {
        id: 'l1', name: 'Confront Vornak',
        desc: 'The Lord of Dominion does not negotiate. He assesses. Choose how you face him.',
        choices: [
          { label: 'Dismantle his enforcement network first', desc: 'Remove his capability before taking the fight directly to him.', cost: { resources: 80, influence: 80, intel: 60 }, effect: { influence: 100, awareness: 60, exposure: 40, corruption: 20 }, outcome: 'His network collapses district by district. When you face Vornak he is still dangerous. But he is alone.' },
          { label: 'Offer him a role in what comes after', desc: 'A man who built an empire does not want to die for someone else\'s.', cost: { influence: 100, resources: 50 }, effect: { influence: 120, intel: 60, corruption: 38, exposure: 20 }, outcome: 'Vornak pulls three enforcement divisions from active deployment. That is an answer.' },
          { label: 'Broadcast his complete record publicly', desc: 'Destroy his legitimacy before his enforcers can act on his orders.', cost: { awareness: 80, intel: 80, influence: 60 }, effect: { awareness: 100, influence: 80, exposure: 55, corruption: 15 }, outcome: "Vornak's record goes public. His enforcers begin making individual calculations. The network hesitates." },
        ],
      },
      {
        id: 'l2', name: "Break Maltheon's Doctrine",
        desc: 'Submission as theology lives inside people. That makes it the hardest thing to dismantle.',
        choices: [
          { label: "Reveal the doctrine's design history", desc: 'It was written by a committee. Show people the meeting minutes.', cost: { awareness: 80, intel: 80 }, effect: { awareness: 120, intel: 60, corruption: 20 }, outcome: 'The committee minutes are sixty years old. The doctrine was A/B tested. Seeing the mechanism strips it of the sacred.' },
          { label: 'Elevate the survivors of the doctrine', desc: 'The people it consumed have faces and names. Give them a platform.', cost: { influence: 80, awareness: 60 }, effect: { influence: 100, awareness: 80, corruption: 15, exposure: 30 }, outcome: 'Testimony by testimony, the doctrine\'s human cost becomes undeniable. Maltheon cannot suppress all of them.' },
          { label: 'Confront Maltheon directly. Record it.', desc: 'Make him defend it out loud. People need to hear what it sounds like.', cost: { awareness: 70, influence: 70, resources: 40 }, effect: { awareness: 100, influence: 100, exposure: 50, corruption: 10 }, outcome: 'The recording circulates for months. Maltheon is calm. That somehow makes it worse.' },
        ],
      },
    ],
    unlockRequires: { awareness: 260, influence: 260, intel: 200, resources: 160 },
    completionBonus: { awareness: 80, influence: 80, intel: 60, resources: 30 },
    randomEventPool: ['re_vornak_offer'],
  },
  {
    id: 'zyraxis', tier: 1,
    name: 'Zyraxis, The Veilbearer', subtitle: 'Architect of Illusion — Supreme Force',
    icon: '👁', color: '#1e1b4b', accent: '#818cf8', control: 100,
    lore: 'Zyraxis is not a person. It is the system believing itself. The Veil made manifest. Every lie ever told, every war ever started, every comfort ever engineered — all of it flows from and back into Zyraxis. You have come farther than anyone before you. There are three ways this ends. Only you know which one you can live with.',
    missions: [
      {
        id: 'z1', name: 'LIBERATION: Broadcast the Archive',
        desc: 'Release everything. Every document, every name, every mechanism. The truth without curation. The light without mercy.',
        choices: [
          { label: 'Release everything — unfiltered', desc: 'No redactions. No protection. The full archive, complete.', cost: { awareness: 200, intel: 150 }, effect: { ending: 'liberation_full' }, outcome: '' },
          { label: 'Release with surgical redactions', desc: 'Protect sources. Protect civilians caught in the files. Truth, but not as a weapon against the uninvolved.', cost: { awareness: 180, intel: 130, influence: 50 }, effect: { ending: 'liberation_measured' }, outcome: '' },
        ],
      },
      {
        id: 'z2', name: 'ASSIMILATION: Take the Throne',
        desc: 'Replace Zyraxis. You know this system better than anyone alive. You are telling yourself you will be different.',
        choices: [
          { label: 'Seize control — keep the structure intact', desc: 'You replace the occupant. The Veil remains. You are its new face.', cost: { influence: 200, resources: 150 }, effect: { ending: 'assimilation_cold' }, outcome: '' },
          { label: 'Seize control — dismantle from within', desc: 'Take the throne. Use it to tear the structure down from inside.', cost: { influence: 180, resources: 120, corruption: 60 }, effect: { ending: 'assimilation_reform' }, outcome: '' },
        ],
      },
      {
        id: 'z3', name: 'COLLAPSE: Burn the Structure',
        desc: 'No replacement. No transition plan. Destroy the Veil completely and accept what that means.',
        choices: [
          { label: 'Controlled demolition with parallel systems ready', desc: 'Systematic destruction. Counter-structures positioned to fill the vacuum.', cost: { awareness: 150, influence: 150, resources: 100 }, effect: { ending: 'collapse_structured' }, outcome: '' },
          { label: 'Total burn — nothing survives', desc: 'Burn it all. Whatever rises is not yours to shape.', cost: { awareness: 120, influence: 120, corruption: 80 }, effect: { ending: 'collapse_total' }, outcome: '' },
        ],
      },
    ],
    unlockRequires: { awareness: 360, influence: 330, intel: 300, resources: 160 },
    completionBonus: null,
    randomEventPool: [],
  },
]
