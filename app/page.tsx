'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [athletes, setAthletes] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('athletes')
      .select('*')
      .order('vertical', { ascending: false })
      .then(({ data }) => { if (data) setAthletes(data) })
  }, [])

  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

  const rankColor = (r: number) => r === 1 ? '#f5c842' : r === 2 ? '#9bb0c7' : r === 3 ? '#c97b42' : '#5a6470'

  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#e8edf3", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "8px", color: "#3df5b0", fontSize: "12px", letterSpacing: "2px" }}>● VERTRANKING.COM — LIVE RANKINGS</div>
        <h1 style={{ fontSize: "64px", fontWeight: "900", lineHeight: "1", marginBottom: "8px" }}>VERT<br/>RANKING</h1>
        <p style={{ color: "#5a6470", marginBottom: "48px" }}>The only unified global leaderboard for verified vertical jump performance.</p>
        <div style={{ display: "grid", gridTemplateColumns: "50px 1fr 100px 100px 80px", gap: "8px", padding: "8px 16px", background: "#0f1318", marginBottom: "4px" }}>
          {["RANK","ATHLETE","VERTICAL","WEIGHT","VERIFIED"].map(h => (
            <div key={h} style={{ fontSize: "10px", color: "#5a6470", letterSpacing: "1px" }}>{h}</div>
          ))}
        </div>
        {athletes.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#5a6470", background: "#0f1318" }}>
            No athletes yet. Be the first to submit your jump.
          </div>
        )}
        {athletes.map((a, i) => (
          <div key={a.id} style={{ display: "grid", gridTemplateColumns: "50px 1fr 100px 100px 80px", gap: "8px", padding: "16px", background: "#0f1318", marginBottom: "2px", borderLeft: `3px solid ${rankColor(i+1)}` }}>
            <div style={{ fontSize: "22px", fontWeight: "900", color: rankColor(i+1) }}>{i+1}</div>
            <div>
              <div style={{ fontWeight: "500" }}>{a.name}</div>
              <div style={{ fontSize: "12px", color: "#5a6470" }}>{a.country} · {a.sport}</div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: "900", color: rankColor(i+1), alignSelf: "center" }}>{a.vertical}"</div>
            <div style={{ alignSelf: "center", color: "#9bb0c7", fontSize: "13px" }}>{a.weight} lb</div>
            <div style={{ alignSelf: "center", fontSize: "10px", padding: "4px 8px", border: `1px solid ${rankColor(i+1)}`, color: rankColor(i+1) }}>{a.verified}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
