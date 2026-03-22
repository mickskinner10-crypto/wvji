'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { TIER_COLORS, TIER_POINTS, DUNKS, DunkTier } from '../dunks'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DunkLeaderboard() {
  const [rankings, setRankings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: dunks } = await supabase.from('dunks').select('athlete_id, dunk_name')
      const { data: athletes } = await supabase.from('athletes').select('id, name, country, sport, verified')

      if (dunks && athletes) {
        const scoreMap: Record<number, number> = {}
        const countMap: Record<number, number> = {}

        dunks.forEach((d: any) => {
          const dunk = DUNKS.find(x => x.name === d.dunk_name)
          if (dunk) {
            scoreMap[d.athlete_id] = (scoreMap[d.athlete_id] || 0) + TIER_POINTS[dunk.tier]
            countMap[d.athlete_id] = (countMap[d.athlete_id] || 0) + 1
          }
        })

        const ranked = athletes
          .filter((a: any) => scoreMap[a.id])
          .map((a: any) => ({ ...a, score: scoreMap[a.id] || 0, dunkCount: countMap[a.id] || 0 }))
          .sort((a: any, b: any) => b.score - a.score)

        setRankings(ranked)
      }
      setLoading(false)
    }
    load()
  }, [])

  const rankColor = (r: number) => r === 1 ? '#f5c842' : r === 2 ? '#9bb0c7' : r === 3 ? '#c97b42' : '#5a6470'

  const getTierLabel = (score: number) => {
    if (score >= 2000) return { label: 'Godly', color: TIER_COLORS['Godly'] }
    if (score >= 1000) return { label: 'Mythic', color: TIER_COLORS['Mythic'] }
    if (score >= 500) return { label: 'Legendary', color: TIER_COLORS['Legendary'] }
    if (score >= 250) return { label: 'Expert', color: TIER_COLORS['Expert'] }
    if (score >= 100) return { label: 'Advanced', color: TIER_COLORS['Advanced'] }
    if (score >= 40) return { label: 'Intermediate', color: TIER_COLORS['Intermediate'] }
    return { label: 'Beginner', color: TIER_COLORS['Beginner'] }
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080a0e; color: #e8edf3; font-family: sans-serif; }
        .row:hover { background: #141920 !important; cursor: pointer; }
      `}</style>

      <header style={{ borderBottom: '1px solid #1e242c', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="Vert Ranking" style={{ height: '72px', width: 'auto' }} />
          </a>
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="/" style={{ color: '#5a6470', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Rankings</a>
            <a href="/dunks" style={{ color: '#3df5b0', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Dunks</a>
            <a href="/calculator" style={{ color: '#5a6470', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Calculator</a>
            <a href="/submit" style={{ background: '#3df5b0', color: '#000', padding: '9px 20px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>+ Submit Jump</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ color: '#c084fc', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Skill Rankings</div>
        <h1 style={{ fontSize: 'clamp(40px,8vw,80px)', fontWeight: '900', lineHeight: '0.95', marginBottom: '16px' }}>Dunk<br/>Leaderboard</h1>
        <p style={{ fontSize: '14px', color: '#5a6470', maxWidth: '480px', lineHeight: '1.7', marginBottom: '48px' }}>
          Ranked by dunk score — the total points earned from completed dunks across all difficulty tiers. Claim your athlete profile to start logging your dunks.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' as const }}>
          {(['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Legendary', 'Mythic', 'Godly'] as DunkTier[]).map(tier => (
            <div key={tier} style={{ border: `1px solid ${TIER_COLORS[tier]}`, padding: '6px 14px', fontSize: '11px', color: TIER_COLORS[tier], letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              {tier}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 100px 120px', gap: '8px', padding: '8px 16px', background: '#0f1318', marginBottom: '4px' }}>
          {['Rank', 'Athlete', 'Dunk Score', 'Dunks', 'Level'].map(h => (
            <div key={h} style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#5a6470' }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#5a6470' }}>Loading...</div>
        ) : rankings.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#5a6470', background: '#0f1318' }}>
            No dunk scores yet. <a href="/" style={{ color: '#3df5b0' }}>Claim your profile</a> to start logging dunks.
          </div>
        ) : rankings.map((a, i) => {
          const tier = getTierLabel(a.score)
          return (
            <div key={a.id} className="row" onClick={() => window.location.href = `/athlete?id=${a.id}`} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 100px 120px', gap: '8px', padding: '14px 16px', background: '#0f1318', marginBottom: '2px', borderLeft: `3px solid ${rankColor(i+1)}` }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: rankColor(i+1), alignSelf: 'center' }}>{i+1}</div>
              <div style={{ alignSelf: 'center' }}>
                <div style={{ fontWeight: '500', fontSize: '15px', marginBottom: '2px' }}>{a.name}</div>
                <div style={{ fontSize: '11px', color: '#5a6470' }}>{a.country} · {a.sport}</div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#c084fc', alignSelf: 'center' }}>{a.score}</div>
              <div style={{ fontSize: '15px', fontWeight: '500', color: '#5a6470', alignSelf: 'center' }}>{a.dunkCount}</div>
              <div style={{ alignSelf: 'center' }}>
                <div style={{ display: 'inline-block', border: `1px solid ${tier.color}`, color: tier.color, padding: '3px 10px', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' as const }}>{tier.label}</div>
              </div>
            </div>
          )
        })}
      </main>

      <footer style={{ borderTop: '1px solid #1e242c', padding: '24px', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '3px', color: '#5a6470' }}>VERT RANKING</div>
          <div style={{ fontSize: '11px', color: '#5a6470' }}>vertranking.com · Est. 2026</div>
        </div>
      </footer>
    </>
  )
}
