import { useState } from 'react'
import type { Tier } from './types'
import type { FactionId } from './data/factions'
import { TIERS } from './data/tiers'
import { ENDINGS } from './data/endings'
import { useGameState } from './hooks/useGameState'
import ResourcePanel from './components/ResourcePanel'
import TierCard from './components/TierCard'
import MissionModal from './components/MissionModal'
import { EventModal, EndingScreen } from './components/EventModal'
import FactionSelect from './components/FactionSelect'

function WelcomeScreen({ onPlay }: { onPlay: () => void }) {
  return (
    <div style={{ background: '#030508', fontFamily: "'Courier New', monospace", color: '#e5e7eb', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes flicker{0%,100%{opacity:1}91%{opacity:1}93%{opacity:.55}96%{opacity:1}}
        .wcard{background:#07090f;border:1px solid #1e2d40;padding:28px 32px;margin-bottom:14px;max-width:580px;width:100%;}
        .wlabel{font-size:11px;letter-spacing:3px;color:#475569;margin-bottom:8px;text-transform:uppercase;}
        .wbody{font-size:15px;color:#94a3b8;line-height:1.75;}
        .wbody strong{color:#cbd5e1;font-weight:600;}
        .res-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;}
        .res-tag{padding:5px 12px;border:1px solid #1e2d40;background:#060810;font-size:13px;}
      `}</style>
      <div style={{ maxWidth: 580, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#475569', marginBottom: 10 }}>CLASSIFIED BRIEFING</div>
          <div style={{ fontSize: 32, letterSpacing: 6, color: '#818cf8', animation: 'flicker 9s infinite', marginBottom: 10 }}>ZYRAXIS</div>
          <div style={{ fontSize: 15, color: '#64748b', letterSpacing: 1 }}>Rise. Expose. Collapse.</div>
        </div>
        <div className="wcard">
          <div className="wlabel">What is this</div>
          <div className="wbody">You are at the bottom of a seven-tier pyramid of power called <strong>The Veil</strong>. At the top sits Zyraxis — not a person, but the system itself. Your goal is to work your way up, tier by tier, and reach Zyraxis. What you do when you get there determines which of <strong>six possible endings</strong> you reach.</div>
        </div>
        <div className="wcard">
          <div className="wlabel">How to play</div>
          <div className="wbody">Each tier contains <strong>missions</strong>. Click a tier to open it, then choose a mission. Each mission gives you 2–3 choices with different costs and outcomes. Complete all missions in a tier to unlock the next one.<br /><br /><strong>Tiers unlock automatically</strong> when your resources hit the required thresholds. Watch your stats grow — they rise passively over time and through mission rewards.</div>
        </div>
        <div className="wcard">
          <div className="wlabel">Your six resources</div>
          <div className="res-row">
            <div className="res-tag" style={{ color: '#fbbf24' }}>☀ Awareness — how awake the population is. Grows passively.</div>
            <div className="res-tag" style={{ color: '#818cf8' }}>◈ Influence — your political and social reach.</div>
            <div className="res-tag" style={{ color: '#34d399' }}>◆ Resources — money, infrastructure, operational capacity.</div>
            <div className="res-tag" style={{ color: '#38bdf8' }}>◉ Intel — information and intelligence gathered.</div>
            <div className="res-tag" style={{ color: '#f97316' }}>⚠ Exposure — how visible you are. Above 70 it bleeds your Influence.</div>
            <div className="res-tag" style={{ color: '#ef4444' }}>☣ Corruption — moral compromise. Gates certain endings.</div>
          </div>
        </div>
        <div className="wcard">
          <div className="wlabel">Random events</div>
          <div className="wbody">After completing missions, <strong>random events fire</strong> — unexpected situations that force quick decisions. Each event has consequences. Some help you, some hurt you, some do both.</div>
        </div>
        <div className="wcard">
          <div className="wlabel">Endings</div>
          <div className="wbody">There are <strong>six endings</strong> across three paths — Liberation, Assimilation, and Collapse. Your faction, your choices, and your resource levels at the end determine which ending you reach. There is no right way to play. There is only the way you chose and what it cost you.</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={onPlay} style={{ padding: '14px 48px', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', background: '#818cf8', color: '#000', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', monospace", fontWeight: 'bold' }}>BEGIN</button>
          <div style={{ marginTop: 10, fontSize: 12, color: '#334155', letterSpacing: 1 }}>You will choose your faction next.</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const {
    res, done, ending, log, tick, activeEvent,
    faction, factionId, alignment, factionUniqueState,
    hiddenChoicesActive, pendingReinvest,
    executeMission, resolveEvent, reset, selectFaction,
    canUseForceOfWill, activateInsideAccess,
    confirmReinvest, dismissReinvest,
    isTierUnlocked, getTierProgress,
  } = useGameState()

  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [executing, setExecuting] = useState(false)
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('zyraxis_welcomed'))

  const tiersOrdered = [...TIERS].sort((a, b) => a.tier - b.tier)
  const discountUsedTiers = (factionUniqueState.discountUsedTiers as string[]) || []
  const expDisplayThreshold = faction?.modifier.exposureBleedThreshold ?? 70

  function handleWelcomeDone() {
    localStorage.setItem('zyraxis_welcomed', '1')
    setShowWelcome(false)
  }

  if (showWelcome) return <WelcomeScreen onPlay={handleWelcomeDone} />

  if (!factionId) {
    return <FactionSelect onSelect={(id: FactionId) => selectFaction(id)} />
  }

  return (
    <div style={{ fontFamily: "'Courier New',Courier,monospace", background: '#030508', color: '#e5e7eb', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#030508}
        ::-webkit-scrollbar-thumb{background:#1a2030}
        @keyframes flicker{0%,100%{opacity:1}91%{opacity:1}93%{opacity:.55}96%{opacity:1}}
        @keyframes glow{0%,100%{text-shadow:0 0 8px #818cf835}50%{text-shadow:0 0 18px #818cf870}}
        .scanline{position:fixed;inset:0;pointer-events:none;z-index:50;background:repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0px,rgba(0,0,0,.05) 1px,transparent 1px,transparent 2px)}
      `}</style>
      <div className="scanline" />
      <div style={{ borderBottom: '1px solid #1e2d40', padding: '8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#030508', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: '#334155' }}>CLASSIFIED — RESTRICTED ACCESS — LEVEL OMEGA</div>
          <div style={{ fontSize: 16, letterSpacing: 5, color: faction?.accent || '#818cf8', animation: 'flicker 9s infinite, glow 4s infinite' }}>ZYRAXIS</div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: '#334155', letterSpacing: 2, textAlign: 'right', lineHeight: 1.8 }}>
            <div>TICK {String(tick).padStart(4, '0')}</div>
            <div style={{ color: res.exposure >= expDisplayThreshold ? '#f97316' : '#334155' }}>EXP {res.exposure || 0}%</div>
          </div>
          <button onClick={reset} disabled={executing} style={{ fontSize: 10, letterSpacing: 2, background: 'transparent', border: '1px solid #1e2d40', color: executing ? '#1f2937' : '#475569', cursor: executing ? 'not-allowed' : 'pointer', padding: '4px 10px', fontFamily: 'inherit' }}>RESET</button>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ResourcePanel res={res} faction={faction} alignment={alignment} hiddenChoicesActive={hiddenChoicesActive} expThreshold={expDisplayThreshold} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 14px' }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#1e2d40', marginBottom: 12 }}>[ THE VEIL — POWER HIERARCHY — SUPREME FORCE AT TOP ]</div>
          {tiersOrdered.map(t => (
            <TierCard key={t.id} tier={t} unlocked={isTierUnlocked(t.id)} progress={getTierProgress(t.id)} faction={faction} discountUsedTiers={discountUsedTiers} onSelect={setSelectedTier} onInsideAccess={activateInsideAccess} />
          ))}
          <div style={{ marginTop: 16, fontSize: 11, color: '#1e2d40', letterSpacing: 1, lineHeight: 2 }}>
            AWARENESS GROWS PASSIVELY EVERY 8 SECONDS.<br />
            COMPLETE ALL MISSIONS IN A TIER FOR BONUS RESOURCES.<br />
            RANDOM EVENTS FIRE AFTER MISSION COMPLETIONS.<br />
            EXPOSURE ABOVE {expDisplayThreshold} BLEEDS YOUR INFLUENCE. CORRUPTION GATES YOUR ENDINGS.
          </div>
        </div>
        <div style={{ width: 190, borderLeft: '1px solid #1e2d40', padding: '12px 10px', background: '#030508', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#1e2d40', marginBottom: 9 }}>[ OP LOG ]</div>
          {log.map((entry, i) => (
            <div key={i} style={{ fontSize: 11, color: i === 0 ? '#64748b' : '#1e2d40', marginBottom: 6, lineHeight: 1.6, borderLeft: i === 0 ? `2px solid ${faction?.accent || '#1f2937'}` : 'none', paddingLeft: i === 0 ? 6 : 0 }}>{entry}</div>
          ))}
        </div>
      </div>
      {pendingReinvest && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#07090f', border: '1px solid #34d39940', maxWidth: 420, width: '90%', padding: 28 }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#34d399,transparent)', marginBottom: 14 }} />
            <div style={{ fontSize: 11, letterSpacing: 4, color: '#34d399', marginBottom: 8 }}>[ REINVESTMENT AVAILABLE ]</div>
            <div style={{ fontSize: 15, color: '#e5e7eb', marginBottom: 8 }}>Standard bonus already applied. Reinvest to compound your gains?</div>
            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
              Already received: +{pendingReinvest.bonus.resources || 0} resources<br />
              Reinvest adds: +{(pendingReinvest.bonus.resources || 0) * (alignment >= 70 ? 4 : 2)} more resources{alignment >= 70 ? ' + intel bonus' : ''}<br />
              Total if reinvested: +{(pendingReinvest.bonus.resources || 0) * (alignment >= 70 ? 5 : 3)} resources
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={confirmReinvest} style={{ flex: 1, padding: '10px', fontSize: 12, letterSpacing: 2, background: '#34d399', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>REINVEST</button>
              <button onClick={dismissReinvest} style={{ flex: 1, padding: '10px', fontSize: 12, letterSpacing: 2, background: 'transparent', color: '#64748b', border: '1px solid #1e2d40', cursor: 'pointer', fontFamily: 'inherit' }}>TAKE STANDARD</button>
            </div>
          </div>
        </div>
      )}
      {selectedTier && (
        <MissionModal tier={selectedTier} res={res} done={done} faction={faction} alignment={alignment} hiddenChoicesActive={hiddenChoicesActive} canUseForceOfWill={canUseForceOfWill(selectedTier.id)} onClose={() => { setSelectedTier(null); setExecuting(false) }} onExecutingChange={setExecuting} onExecute={(mission, choice, after, usedFree) => { executeMission(mission, choice, after, usedFree); setSelectedTier(null); setExecuting(false) }} />
      )}
      {activeEvent && (
        <EventModal event={activeEvent} res={res} onChoice={(choice, after) => resolveEvent(choice, after)} />
      )}
      {ending && ENDINGS[ending] && (
        <EndingScreen ending={ENDINGS[ending]} onReset={reset} />
      )}
    </div>
  )
}
