'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [athletes, setAthletes] = useState<any[]>([]) 
  const [user, setUser] = useState<any>(null)
const [countryFilter, setCountryFilter] = useState('All')
const [sportFilter, setSportFilter] = useState('All Sports')
  const [category, setCategory] = useState('Overall')

const filtered = athletes
  .filter(a => {
    const countryMatch = countryFilter === 'All' || a.country?.includes(countryFilter)
    const sportMatch = sportFilter === 'All Sports' || a.sport === sportFilter
    return countryMatch && sportMatch
  })
  .map(a => ({
    ...a,
    displayValue: category === 'Pound-for-Pound' && a.weight
      ? (parseFloat(a.vertical) / parseFloat(a.weight)).toFixed(3)
      : a.vertical,
    ppw: category === 'Pound-for-Pound' && a.weight
      ? parseFloat(a.vertical) / parseFloat(a.weight)
      : null
  }))
  .sort((a, b) => {
    if (category === 'Pound-for-Pound') {
      if (!a.ppw) return 1
      if (!b.ppw) return -1
      return b.ppw - a.ppw
    }
    return parseFloat(b.vertical) - parseFloat(a.vertical)
  })
  useEffect(() => {
    supabase.from('athletes').select('*').order('vertical', { ascending: false }).then(({ data }) => { if (data) setAthletes(data) })
    supabase.auth.getUser().then(({ data }) => { if (data.user) setUser(data.user) })
  }, [])

  const rankColor = (r: number) => r === 1 ? '#f5c842' : r === 2 ? '#9bb0c7' : r === 3 ? '#c97b42' : '#5a6470'
  const badgeStyle = (v: string) => ({
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '4px 10px', fontSize: '9px', letterSpacing: '1.5px',
    textTransform: 'uppercase' as const, border: '1px solid',
    borderColor: v === 'Gold' ? '#f5c842' : v === 'Silver' ? '#9bb0c7' : v === 'Bronze' ? '#c97b42' : '#5a6470',
    color: v === 'Gold' ? '#f5c842' : v === 'Silver' ? '#9bb0c7' : v === 'Bronze' ? '#c97b42' : '#5a6470',
  })

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080a0e; color: #e8edf3; font-family: sans-serif; }
        .athlete-row:hover { background: #141920 !important; }
        .filter-btn { background: transparent; border: 1px solid #1e242c; color: #5a6470; padding: 6px 14px; font-size: 11px; letter-spacing: 1px; cursor: pointer; text-transform: uppercase; }
        .filter-btn:hover { border-color: #3df5b0; color: #3df5b0; }
        .filter-btn.active { background: #3df5b0; border-color: #3df5b0; color: #000; }
        .cat-card { border: 1px solid #1e242c; padding: 20px; cursor: pointer; background: #0f1318; transition: all 0.2s; }
        .cat-card:hover, .cat-card.active { border-color: #3df5b0; background: rgba(61,245,176,0.04); }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .live-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:#3df5b0; margin-right:6px; animation:pulse 2s infinite; }
        @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <header style={{ borderBottom: '1px solid #1e242c', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: '900', letterSpacing: '3px' }}>
            <img src="/logo.png" alt="Vert Ranking" style={{ height: '72px', width: 'auto' }} />
          </div>
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {[['Rankings', '/'], ['Calculator', '/calculator'], ['Verification', '#']].map(([label, href]) => (
  <a key={label} href={href} style={{ color: '#5a6470', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{label}</a>
))}
            {user ? (
  <span style={{ color: '#3df5b0', fontSize: '12px', letterSpacing: '1px' }}>
    {user.email?.split('@')[0]}
  </span>
) : (
  <a href="/login" style={{ color: '#5a6470', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Sign In</a>
)}
<a href="/submit" style={{ background: '#3df5b0', color: '#000', padding: '9px 20px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>+ Submit Jump</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        <section style={{ padding: '70px 0 50px' }}>
          <div style={{ color: '#3df5b0', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <span className="live-dot"></span>Live Rankings · Updated March 2026
          </div>
          <h1 style={{ fontSize: 'clamp(56px,10vw,110px)', fontWeight: '900', lineHeight: '0.92', letterSpacing: '2px', marginBottom: '24px' }}>
            Vert<br/>Ranking<br/><span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>Global</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#5a6470', maxWidth: '480px', lineHeight: '1.7' }}>
            The only unified global leaderboard for verified vertical jump performance. Gold standard for dunkers, ballers, and elite athletes worldwide.
          </p>
          <div style={{ display: 'flex', marginTop: '48px', border: '1px solid #1e242c' }}>
            {[
  [athletes.length.toString(), 'Athletes Ranked'],
  [[...new Set(athletes.map(a => a.country))].length.toString(), 'Countries'],
  [athletes.filter(a => a.verified === 'Gold' || a.verified === 'Silver').length.toString(), 'Verified Jumps'],
  [athletes.length > 0 ? athletes[0].vertical + '"' : '—', 'World Record']
].map(([num, label], i, arr) => (
              <div key={label} style={{ flex: 1, padding: '18px 24px', borderRight: i < arr.length - 1 ? '1px solid #1e242c' : 'none' }}>
                <div style={{ fontSize: '36px', fontWeight: '900', color: '#3df5b0', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '10px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', margin: '0 0 36px' }}>
          {[['⚡','Overall','Raw vertical — the highest measured leap in the world'],['⚖️','Pound-for-Pound','Vertical relative to bodyweight — true explosive power'],['🏋️','Weight Classes','Compete within your weight division, like combat sports'],['🦶','Standing Vert','No approach — pure lower body power from standstill']].map(([icon, title, desc]) => (
            <div key={title} onClick={() => setCategory(title as string)} className={`cat-card ${category === title ? 'active' : ''}`}>
              <div style={{ fontSize: '22px', marginBottom: '10px' }}>{icon}</div>
              <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '1.5px', marginBottom: '4px' }}>{title}</div>
              <div style={{ fontSize: '11px', color: '#5a6470', lineHeight: '1.5' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #1e242c' }}>
          <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>Global Leaderboard</div>
          <div style={{ fontSize: '11px', color: '#5a6470', marginLeft: 'auto' }}><span className="live-dot"></span>Live</div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#5a6470', letterSpacing: '1.5px', textTransform: 'uppercase', marginRight: '8px' }}>Country:</span>
          {['All','USA','Canada','Australia','UK','France','Nigeria','Ghana'].map((f) => (
  <button key={f} onClick={() => setCountryFilter(f)} className={`filter-btn ${countryFilter === f ? 'active' : ''}`}>{f}</button>
))}
</div>
<div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
  <span style={{ fontSize: '10px', color: '#5a6470', letterSpacing: '1.5px', textTransform: 'uppercase', marginRight: '8px' }}>Sport:</span>
  {['All Sports','Basketball','Volleyball','Track & Field','Dunker','Football'].map((f) => (
  <button key={f} onClick={() => setSportFilter(f)} className={`filter-btn ${sportFilter === f ? 'active' : ''}`}>{f}</button>
))}
          <button className="filter-btn" style={{ marginLeft: 'auto', borderColor: '#f5c842', color: '#f5c842' }}>★ Gold Verified Only</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 100px 100px', gap: '8px', padding: '8px 16px', background: '#0f1318', marginBottom: '4px' }}>
          {['Rank','Athlete', category === 'Pound-for-Pound' ? 'V/Weight' : 'Vertical','Reach','Weight','Verified'].map(h => (
            <div key={h} style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#5a6470' }}>{h}</div>
          ))}
        </div>

        {athletes.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#5a6470', background: '#0f1318', marginBottom: '2px' }}>
            No athletes yet. <a href="/submit" style={{ color: '#3df5b0' }}>Be the first to submit your jump.</a>
          </div>
        )}

        {filtered.map((a, i) => (
          <div key={a.id} className="athlete-row" onClick={() => window.location.href = `/athlete?id=${a.id}`} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 100px 100px', gap: '8px', padding: '14px 16px', background: '#0f1318', marginBottom: '2px', borderLeft: `3px solid ${rankColor(i+1)}`, animation: `slideIn 0.4s ease-out ${i * 0.05}s backwards` }}>
            <div style={{ fontSize: '22px', fontWeight: '900', color: rankColor(i+1), alignSelf: 'center' }}>{i+1}</div>
            <div style={{ alignSelf: 'center' }}>
              <div style={{ fontWeight: '500', fontSize: '15px', marginBottom: '2px' }}>{a.name}</div>
              <div style={{ fontSize: '11px', color: '#5a6470' }}>{a.country} · {a.sport}</div>
              <div style={{ height: '3px', background: '#1e242c', width: '80px', marginTop: '6px' }}>
                <div style={{ height: '100%', background: rankColor(i+1), width: `${Math.round((a.vertical / (athletes[0]?.vertical || 1)) * 100)}%` }}></div>
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: rankColor(i+1), alignSelf: 'center' }}>
  {category === 'Pound-for-Pound' ? a.displayValue : `${a.vertical}"`}
  {category === 'Pound-for-Pound' && <span style={{ fontSize: '11px', color: '#5a6470', display: 'block' }}>vert/lb</span>}
</div>
<div style={{ alignSelf: 'center', fontSize: '13px', color: '#9bb0c7' }}>{a.standing_reach ? a.standing_reach + '"' : '—'}</div>
<div style={{ alignSelf: 'center', fontSize: '13px', color: '#9bb0c7' }}>{a.weight} lb</div>
            <div style={{ alignSelf: 'center', ...badgeStyle(a.verified) }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }}></div>
              {a.verified}
            </div>
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '48px' }}>
          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #1e242c' }}>Verification Tiers</div>
            {[['🥇 Gold — Certified','','#f5c842','Gold'],['🥈 Silver — Video Evidence','','#9bb0c7','Silver'],['⬜ Self-Reported','','#5a6470','Pending']].map(([name, proof, color, badge]) => (
              <div key={name as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e242c' }}>
                <div>
                  <div style={{ fontSize: '12px', color: color as string }}>{name}</div>
                  <div style={{ fontSize: '11px', color: '#5a6470', marginTop: '2px' }}>{proof}</div>
                </div>
                <div style={{ ...badgeStyle(badge as string), fontSize: '8px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }}></div>
                  {badge}
                </div>
              </div>
            ))}
          </div>

          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #1e242c' }}>Weight Class Leaders</div>
            {[['Under 150 lb','—','—'],['150–180 lb','—','—'],['180–210 lb','—','—'],['210+ lb','—','—']].map(([cls, name, jump]) => (
              <div key={cls} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #1e242c' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#5a6470' }}>{cls}</div>
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>{name}</div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#3df5b0' }}>{jump}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '48px 0', border: '1px solid #1a8a5f', padding: '36px', background: 'rgba(61,245,176,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '24px' }}>
  <div>
    <div style={{ fontSize: '28px', fontWeight: '900', marginBottom: '8px' }}>Think you can jump?</div>
    <p style={{ fontSize: '14px', color: '#5a6470', maxWidth: '480px' }}>Submit your vertical and see where you stack up against athletes worldwide. No gatekeeping — just show us the numbers.</p>
  </div>
  <a href="/submit" style={{ display: 'inline-block', background: '#3df5b0', color: '#000', padding: '14px 36px', fontSize: '14px', fontWeight: '700', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' as const }}>Submit My Jump →</a>
</div>

      </main>

      <footer style={{ borderTop: '1px solid #1e242c', padding: '24px', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '3px', color: '#5a6470' }}>VERT RANKING</div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
  <span style={{ fontSize: '11px', color: '#5a6470' }}>vertranking.com · Est. 2026</span>
  <a href="/privacy" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Privacy Policy</a>
  <a href="/terms" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Terms of Service</a>
</div>
        </div>
      </footer>
    </>
  )
}
