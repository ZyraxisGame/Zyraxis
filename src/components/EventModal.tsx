import { useState } from 'react'
import type { RandomEvent, Resources, Ending, EventChoice } from '../types'
import { applyEffect } from '../hooks/useGameState'

// ============================================================
// EVENT MODAL
// ============================================================
interface EventProps {
  event: RandomEvent
  res: Resources
  onChoice: (choice: EventChoice, after: Resources) => void
}

export function EventModal({ event, res, onChoice }: EventProps) {
  const [picked, setPicked] = useState<string | null>(null)
  const [consequence, setConsequence] = useState<string | null>(null)

  function handle(c: RandomEvent['choices'][number]) {
    if (picked) return
    setPicked(c.label)
    setConsequence(c.consequence)
    const after = applyEffect(res, c.effect)
    setTimeout(() => onChoice(c, after), 2400)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#07090f', border: '1px solid #f59e0b35', maxWidth: 520, width: '100%', padding: 26 }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#f59e0b,transparent)', marginBottom: 14 }} />
        <div style={{ fontSize: 7, letterSpacing: 4, color: '#f59e0b', marginBottom: 5 }}>[ UNPLANNED EVENT — DECISION REQUIRED ]</div>
        <div style={{ fontSize: 11, color: '#e5e7eb', marginBottom: 6, letterSpacing: 1 }}>{event.icon} {event.title}</div>
        <div style={{ fontSize: 9, color: '#6b7280', lineHeight: 1.8, marginBottom: 18 }}>{event.desc}</div>

        {!consequence ? (
          <>
            <div style={{ fontSize: 7, letterSpacing: 3, color: '#1f2937', marginBottom: 10 }}>YOUR RESPONSE</div>
            {event.choices.map(c => (
              <div
                key={c.label}
                onClick={() => handle(c)}
                style={{ marginBottom: 6, padding: '10px 12px', border: `1px solid ${picked === c.label ? '#f59e0b' : '#1a2030'}`, background: '#060810', cursor: picked ? 'default' : 'pointer', opacity: picked && picked !== c.label ? 0.3 : 1, transition: 'all 0.2s' }}
              >
                <div style={{ fontSize: 10, color: '#d1d5db', letterSpacing: 1, marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontSize: 8, color: '#4b5563', lineHeight: 1.5, marginBottom: 4 }}>{c.desc}</div>
                <div style={{ fontSize: 7, color: '#374151', letterSpacing: 1 }}>
                  {Object.entries(c.effect).filter(([, v]) => (v as number) > 0).map(([k, v]) => `+${v} ${k}`).join(' · ')}
                  {' '}
                  {Object.entries(c.effect).filter(([, v]) => (v as number) < 0).map(([k, v]) => `${v} ${k}`).join(' · ')}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div style={{ padding: '14px 0', borderTop: '1px solid #0d1018' }}>
            <div style={{ fontSize: 7, letterSpacing: 4, color: '#f59e0b', marginBottom: 10 }}>[ OUTCOME ]</div>
            <div style={{ fontSize: 10, color: '#9ca3af', lineHeight: 1.9, fontStyle: 'italic' }}>{consequence}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// ENDING SCREEN
// ============================================================
interface EndingProps {
  ending: Ending
  onReset: () => void
}

export function EndingScreen({ ending: e, onReset }: EndingProps) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
      <style>{`@keyframes endpulse { 0%,100%{opacity:0.6} 50%{opacity:1} }`}</style>
      <div style={{ fontSize: 52, marginBottom: 18, animation: 'endpulse 2s infinite' }}>{e.icon}</div>
      <div style={{ fontSize: 7, letterSpacing: 6, color: e.color, marginBottom: 6 }}>ENDING ACHIEVED</div>
      <div style={{ fontSize: 32, color: '#f9fafb', marginBottom: 5, letterSpacing: 5 }}>{e.title}</div>
      <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 22, letterSpacing: 3 }}>{e.subtitle}</div>
      <div style={{ maxWidth: 480, fontSize: 11, color: '#9ca3af', lineHeight: 2.1, marginBottom: 38 }}>{e.desc}</div>
      <button
        onClick={onReset}
        style={{ padding: '9px 28px', fontSize: 8, letterSpacing: 4, background: 'transparent', border: `1px solid ${e.color}`, color: e.color, cursor: 'pointer', textTransform: 'uppercase' }}
      >
        BEGIN AGAIN
      </button>
    </div>
  )
}
