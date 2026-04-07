import type { RandomEvent } from '../types'

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: 're_informant', tier: 'bound',
    title: 'Informant in Your Network',
    desc: "Someone in your cell has been feeding information to the Narrative Grid. You've identified them. What do you do?",
    icon: '🜁',
    choices: [
      { label: 'Silence them quietly', desc: 'Remove the threat. Clean. No witnesses.', effect: { exposure: -10, corruption: 8, resources: -5 }, consequence: 'The leak is sealed. You told yourself it was necessary. You will keep telling yourself that.' },
      { label: 'Turn them double agent', desc: 'Feed false intel back up the chain. Risky but valuable.', effect: { intel: 20, exposure: 5, resources: -10 }, consequence: 'The informant feeds bad data upward. The Grid is confused. For now.' },
      { label: 'Expose and release them', desc: 'Make it public. Show the Collective what surveillance looks like from inside.', effect: { awareness: 25, exposure: 15, influence: 10 }, consequence: 'The community is shaken. Trust is damaged. But now everyone knows what the system does.' },
    ],
  },
  {
    id: 're_blackout', tier: 'bound',
    title: 'District Surveillance Blackout',
    desc: 'The Data Dominion has cut communications in your sector. A window of 4 hours where the eye is blind.',
    icon: '⚡',
    choices: [
      { label: 'Move operatives through the gap', desc: 'Reposition key cells while the surveillance is down.', effect: { influence: 20, resources: 15, exposure: -8 }, consequence: "Your people are in better positions. The Veil didn't see it happen." },
      { label: 'Broadcast raw truth through local channels', desc: 'Speak directly to the Collective while the filter is offline.', effect: { awareness: 30, exposure: 18, influence: 15 }, consequence: 'The broadcast reaches thousands before the grid comes back online. They remember.' },
      { label: 'Study the blackout pattern', desc: 'Document when and why these gaps occur. There is a cycle.', effect: { intel: 30, exposure: -5 }, consequence: 'Blackouts happen every 17 days. A maintenance window the Grid uses for internal diagnostics. You will be ready.' },
    ],
  },
  {
    id: 're_defector', tier: 'bound',
    title: 'Defector from the Learning Authority',
    desc: 'A curriculum designer has walked away from the Learning Authority. They carry documents. They are terrified.',
    icon: '📁',
    choices: [
      { label: 'Extract and protect them', desc: 'Get them out. It costs resources you do not have much of.', effect: { intel: 35, resources: -20, exposure: 10 }, consequence: 'They are safe. The documents reveal curriculum built to suppress critical thinking from age six.' },
      { label: 'Take the documents. Send them back.', desc: 'The information is worth more than the individual right now.', effect: { intel: 40, corruption: 12, exposure: 5 }, consequence: 'You have the documents. You do not know what happened to them after.' },
      { label: 'Refuse. The risk is too high.', desc: 'You are not ready to absorb this kind of exposure.', effect: { exposure: -5, awareness: -8 }, consequence: 'They disappear two days later. You try not to think about it.' },
    ],
  },
  {
    id: 're_viral', tier: 'illusion',
    title: 'Your Message Breaks Through',
    desc: "A piece of counter-narrative you planted has bypassed the Spectacle System's filters. Millions are seeing it. The Grid is scrambling.",
    icon: '◎',
    choices: [
      { label: 'Push harder. Flood the zone.', desc: 'Double down while the window is open.', effect: { awareness: 40, influence: 30, exposure: 30 }, consequence: 'The wave is massive. The crackdown that follows is proportional.' },
      { label: 'Pull back. Let it breathe.', desc: 'Let the message do its work without your fingerprints on it.', effect: { awareness: 25, influence: 20, exposure: -10 }, consequence: 'Slower spread. But the message survives suppression because you are not attached to it.' },
      { label: 'Weaponize the attention', desc: 'Use the traffic to recruit directly into your network.', effect: { influence: 50, resources: 20, exposure: 25, corruption: 5 }, consequence: 'Your network doubles in 48 hours. So does your footprint. Something about the speed feels wrong.' },
    ],
  },
  {
    id: 're_false_prophet', tier: 'illusion',
    title: 'A Controlled Opposition Rises',
    desc: 'Someone is using your language, your symbols, your methods — to lead people into a managed safety valve. A Veil plant.',
    icon: '🜏',
    choices: [
      { label: 'Expose them publicly', desc: 'Burn the plant in front of the people they are misleading.', effect: { awareness: 30, influence: 20, exposure: 20, corruption: 5 }, consequence: 'Some believe you. Some think you are the plant. The confusion is exactly what the Veil wanted.' },
      { label: 'Infiltrate their movement', desc: 'Get inside. Redirect their followers from within.', effect: { influence: 40, intel: 20, corruption: 18, exposure: 10 }, consequence: 'You are inside. The corruption of playing their game does not announce itself. It accumulates.' },
      { label: 'Ignore them. Build parallel.', desc: 'Do not fight for the same audience. Build a different one.', effect: { influence: 15, awareness: 20, resources: -10 }, consequence: 'Slower. But yours is real and it is yours.' },
    ],
  },
  {
    id: 're_crackdown', tier: 'illusion',
    title: 'Veil Crackdown Initiated',
    desc: 'The Obedience Code has flagged your network. Enforcement units are sweeping. Three of your cells are compromised.',
    icon: '⚠',
    triggerCondition: (r) => r.exposure >= 40,
    choices: [
      { label: 'Scatter. Go dark for 72 hours.', desc: 'Lose momentum but preserve the network.', effect: { exposure: -20, influence: -15, awareness: -8 }, consequence: 'The sweep misses most of your people. You resurface smaller but intact.' },
      { label: 'Keep operating. Absorb the losses.', desc: 'The mission does not stop because it gets hard.', effect: { exposure: 15, resources: -25, influence: -20, awareness: 20 }, consequence: 'You lose cells. The Collective sees you do not break. That reputation costs.' },
      { label: 'Sacrifice a cell to redirect attention', desc: 'Feed the enforcers a decoy. Let them take something real.', effect: { exposure: -25, corruption: 22, resources: -10 }, consequence: 'The main network survives. Three people paid the price. You will carry their names.' },
    ],
  },
  {
    id: 're_insider', tier: 'mechanisms',
    title: 'Insider at the War Engine Complex',
    desc: 'A logistics officer inside the War Engine Complex has reached out. They have seen the production orders. They are ready to talk.',
    icon: '⚙',
    choices: [
      { label: 'Full extraction — bring them over', desc: 'Pull them out and debrief completely.', effect: { intel: 50, resources: -30, exposure: 20 }, consequence: 'The intelligence is staggering. War production is running at four times the public record.' },
      { label: 'Keep them in place', desc: 'A source inside is worth more than a defector outside.', effect: { intel: 25, influence: 20, exposure: 5 }, consequence: 'They stay. You get steady intelligence. The risk is entirely theirs.' },
      { label: 'Use the contact to plant false orders', desc: 'If you can receive, you can send. Disrupt from inside.', effect: { intel: 20, awareness: 30, exposure: 30, corruption: 10 }, consequence: 'Three shipments go to the wrong coordinates. The War Engine stumbles for two weeks.' },
    ],
  },
  {
    id: 're_media_break', tier: 'mechanisms',
    title: 'Narrative Grid Anchor Breaks Script',
    desc: 'A senior broadcast anchor has gone off-script on live feed. For 90 seconds they told the truth. The Grid cut the feed. Clips are circulating.',
    icon: '◈',
    choices: [
      { label: 'Amplify the clips everywhere', desc: 'Make sure no one can unsee it.', effect: { awareness: 45, exposure: 25, influence: 30 }, consequence: "The clips reach 40 million people before suppression catches up. The Grid's response confirms everything." },
      { label: 'Find and protect the anchor', desc: 'They broke the script. The Veil will come for them.', effect: { intel: 20, resources: -25, influence: 25, exposure: 15 }, consequence: 'You get them out. They become your most credible voice.' },
      { label: 'Investigate why it happened', desc: 'Anchors inside the Grid do not go off-script by accident.', effect: { intel: 40, awareness: 20, exposure: -5 }, consequence: 'Three senior Grid editors have been communicating in encrypted channels. The Grid is rotting from inside.' },
    ],
  },
  {
    id: 're_banker', tier: 'brokers',
    title: 'Monetary Engine Collapse Intel',
    desc: 'Your intelligence indicates a controlled currency reset is being prepared. The Monetary Engine is about to pull the floor from under the population. You have the memo.',
    icon: '◆',
    choices: [
      { label: 'Release the memo publicly', desc: 'Let people prepare. Let them see what is coming.', effect: { awareness: 60, influence: 40, exposure: 40, resources: -20 }, consequence: 'The public has 72 hours warning. The Engine accelerates the timeline in response.' },
      { label: 'Position your resources ahead of the collapse', desc: "Protect your operation's solvency through the reset.", effect: { resources: 80, corruption: 22, exposure: 10 }, consequence: 'Your operation is solvent through the reset. You did what they do. You know exactly what you did.' },
      { label: 'Leak to rival factions. Create instability.', desc: 'Let multiple parties fight over the intel.', effect: { intel: 30, influence: 50, exposure: 20, corruption: 8 }, consequence: 'The Arkan Consortium and the Civic Dominion are at each other. The chaos is useful.' },
    ],
  },
  {
    id: 're_heir', tier: 'puppet',
    title: 'House Velorin Heir Goes Rogue',
    desc: 'A bloodline heir has broken from House Velorin. They have access. They have records. And they want to burn their family down.',
    icon: '♟',
    choices: [
      { label: 'Full alliance — bring them in', desc: 'This is the crack in the structure you have been waiting for.', effect: { intel: 70, influence: 60, exposure: 30, corruption: 15 }, consequence: 'The heir delivers everything. Six generations of bloodline financial records. The cost is making a deal with old money.' },
      { label: 'Extract the intel. Cut contact.', desc: 'Take what you need and end the relationship.', effect: { intel: 50, exposure: 15, corruption: 20 }, consequence: 'You have what you need. They are on their own. You do not let yourself think about what happens next.' },
      { label: 'Refuse. It could be a trap.', desc: 'House Velorin does not make mistakes. This might be manufactured.', effect: { exposure: -10, intel: 10, awareness: 15 }, consequence: 'Smart. Three other cells who took the bait were swept within the week.' },
    ],
  },
  {
    id: 're_vornak_offer', tier: 'lieutenants',
    title: 'Vornak Sends an Emissary',
    desc: "Vornak, Lord of Dominion, has sent someone to negotiate. He says he is tired of Zyraxis too. His message: join him or be destroyed.",
    icon: '⚔',
    choices: [
      { label: 'Hear the full offer', desc: 'A lieutenant betraying the supreme force could change everything.', effect: { intel: 60, influence: 40, corruption: 30, exposure: 20 }, consequence: 'Vornak wants to replace Zyraxis, not dismantle the system. You learn his weaknesses in the same conversation.' },
      { label: 'Refuse and terminate the emissary', desc: 'No negotiation with the machinery of domination.', effect: { exposure: 30, resources: -20, awareness: 20, corruption: 15 }, consequence: 'Vornak knows you cannot be bought. He will come with full force. You chose this.' },
      { label: 'Play along. Feed disinformation.', desc: 'Accept the meeting. Give him enough to believe he has you.', effect: { intel: 40, influence: 30, corruption: 25, exposure: 10 }, consequence: 'Vornak moves on a false position. His forces are out of place when your strike comes.' },
    ],
  },
]
