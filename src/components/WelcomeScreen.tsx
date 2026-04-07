interface Props {
  onPlay: () => void
}

export default function WelcomeScreen({ onPlay }: Props) {
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
          <div className="wbody">
            You are at the bottom of a seven-tier pyramid of power called <strong>The Veil</strong>. At the top sits Zyraxis — not a person, but the system itself. Your goal is to work your way up, tier by tier, and reach Zyraxis. What you do when you get there determines which of <strong>six possible endings</strong> you reach.
          </div>
        </div>

        <div className="wcard">
          <div className="wlabel">How to play</div>
          <div className="wbody">
            Each tier contains <strong>missions</strong>. Click a tier to open it, then choose a mission. Each mission gives you 2–3 choices with different costs and outcomes. Complete all missions in a tier to unlock the next one.<br /><br />
            <strong>Tiers unlock automatically</strong> when your resources hit the required thresholds. Watch your stats grow — they rise passively over time and through mission rewards.
          </div>
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
          <div className="wbody">
            After completing missions, <strong>random events fire</strong> — unexpected situations that force quick decisions. Each event has consequences. Some help you, some hurt you, some do both.
          </div>
        </div>

        <div className="wcard">
          <div className="wlabel">Endings</div>
          <div className="wbody">
            There are <strong>six endings</strong> across three paths — Liberation, Assimilation, and Collapse. Your faction, your choices, and your resource levels at the end determine which ending you reach. There is no right way to play. There is only the way you chose and what it cost you.
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={onPlay}
            style={{ padding: '14px 48px', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', background: '#818cf8', color: '#000', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', monospace", fontWeight: 'bold' }}>
            BEGIN
          </button>
          <div style={{ marginTop: 10, fontSize: 12, color: '#334155', letterSpacing: 1 }}>You will choose your faction next.</div>
        </div>

      </div>
    </div>
  )
}
