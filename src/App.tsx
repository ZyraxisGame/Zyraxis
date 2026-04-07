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
import WelcomeScreen from './components/WelcomeScreen'

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

  if (showWelcome) {
    return <WelcomeScreen onPlay={handleWelcomeDone} />
  }

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

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1e2d40', padding: '8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#030508', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: '#334155' }}>CLASSIFIED — RESTRICTED ACCESS — LEVEL OMEGA</div>
          <div style={{ fontSize: 16, letterSpacing: 5, color: faction?.accent || '#818cf8', animation: 'flicker 9s infinite, glow 4s infinite' }}>ZYRAXIS</div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: '#334155', letterSpacing: 2, textAlign: 'right', lineHeight: 1.8 }}>
            <div>TICK {String(tick).padStart(4, '0')}</div>
            <div style={{ color: res.exposure >= expDisplayThreshold ? '#f97316' : '#334155' }}>
              EXP {res.exposure || 0}%
            </div>
          </div>
          <button onClick={reset} disabled={executing}
            style={{ fontSize: 10, letterSpacing: 2, background: 'transparent', border: '1px solid #1e2d40', color: executing ? '#1f2937' : '#475569', cursor: executing ? 'not-allowed' : 'pointer', padding: '4px 10px', fontFamily: 'inherit' }}>
            RESET
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ResourcePanel res={res} faction={faction} alignment={alignment} hiddenChoicesActive={hiddenChoicesActive} expThreshold={expDisplayThreshold} />

        {/* Hierarchy map */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 14px' }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#1e2d40', marginBottom: 12 }}>[ THE VEIL — POWER HIERARCHY — SUPREME FORCE AT TOP ]</div>
          {tiersOrdered.map(t => (
            <TierCard
              key={t.id}
              tier={t}
              unlocked={isTierUnlocked(t.id)}
              progress={getTierProgress(t.id)}
              faction={faction}
              discountUsedTiers={discountUsedTiers}
              onSelect={setSelectedTier}
              onInsideAccess={activateInsideAccess}
            />
          ))}
          <div style={{ marginTop: 16, fontSize: 11, color: '#1e2d40', letterSpacing: 1, lineHeight: 2 }}>
            AWARENESS GROWS PASSIVELY EVERY 8 SECONDS.<br />
            COMPLETE ALL MISSIONS IN A TIER FOR BONUS RESOURCES.<br />
            RANDOM EVENTS FIRE AFTER MISSION COMPLETIONS.<br />
            EXPOSURE ABOVE {expDisplayThreshold} BLEEDS YOUR INFLUENCE. CORRUPTION GATES YOUR ENDINGS.
          </div>
        </div>

        {/* Op Log */}
        <div style={{ width: 190, borderLeft: '1px solid #1e2d40', padding: '12px 10px', background: '#030508', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#1e2d40', marginBottom: 9 }}>[ OP LOG ]</div>
          {log.map((entry, i) => (
            <div key={i} style={{ fontSize: 11, color: i === 0 ? '#64748b' : '#1e2d40', marginBottom: 6, lineHeight: 1.6, borderLeft: i === 0 ? `2px solid ${faction?.accent || '#1f2937'}` : 'none', paddingLeft: i === 0 ? 6 : 0 }}>
              {entry}
            </div>
          ))}
        </div>
      </div>

      {/* Reinvest prompt */}
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
              <button onClick={confirmReinvest}
                style={{ flex: 1, padding: '10px', fontSize: 12, letterSpacing: 2, background: '#34d399', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                REINVEST
              </button>
              <button onClick={dismissReinvest}
                style={{ flex: 1, padding: '10px', fontSize: 12, letterSpacing: 2, background: 'transparent', color: '#64748b', border: '1px solid #1e2d40', cursor: 'pointer', fontFamily: 'inherit' }}>
                TAKE STANDARD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mission Modal */}
      {selectedTier && (
        <MissionModal
          tier={selectedTier}
          res={res}
          done={done}
          faction={faction}
          alignment={alignment}
          hiddenChoicesActive={hiddenChoicesActive}
          canUseForceOfWill={canUseForceOfWill(selectedTier.id)}
          onClose={() => { setSelectedTier(null); setExecuting(false) }}
          onExecutingChange={setExecuting}
          onExecute={(mission, choice, after, usedFree) => {
            executeMission(mission, choice, after, usedFree)
            setSelectedTier(null)
            setExecuting(false)
          }}
        />
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
