'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function AthleteContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
const [athlete, setAthlete] = useState<any>(null)
const [rank, setRank] = useState<number | null>(null)
const [loading, setLoading] = useState(true)
const [user, setUser] = useState<any>(null)
const [claiming, setClaiming] = useState(false)
const [claimed, setClaimed] = useState(false)
const [editing, setEditing] = useState(false)
const [editForm, setEditForm] = useState<any>({})
const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const { data } = await supabase
        .from('athletes')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setAthlete(data)
        const { data: all } = await supabase
          .from('athletes')
          .select('id, vertical')
          .order('vertical', { ascending: false })
        if (all) {
          const r = all.findIndex((a: any) => a.id === data.id) + 1
          setRank(r)
        }
      }
      setLoading(false)
    }
    load()
    supabase.auth.getUser().then(({ data }) => { if (data.user) setUser(data.user) })
  }, [id])

  const verifiedColor = (v: string) => v === 'Gold' ? '#f5c842' : v === 'Silver' ? '#9bb0c7' : '#5a6470'
  const rankColor = (r: number) => r === 1 ? '#f5c842' : r === 2 ? '#9bb0c7' : r === 3 ? '#c97b42' : '#3df5b0'

  const formatInches = (inches: number) => {
    const feet = Math.floor(inches / 12)
    const remaining = Math.round(inches % 12)
    return `${feet}'${remaining}"`
  }

  const maxTouch = athlete?.standing_reach && athlete?.vertical
    ? athlete.standing_reach + athlete.vertical
    : null

  if (loading) return (
    <main style={{ background: '#080a0e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#3df5b0', fontFamily: 'sans-serif' }}>Loading...</div>
    </main>
  )

  if (!athlete) return (
    <main style={{ background: '#080a0e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#5a6470', fontFamily: 'sans-serif' }}>Athlete not found.</div>
    </main>
  )

  return (
    <>
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #080a0e; color: #e8edf3; font-family: sans-serif; }`}</style>

      <header style={{ borderBottom: '1px solid #1e242c', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="Vert Ranking" style={{ height: '72px', width: 'auto' }} />
          </a>
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="/" style={{ color: '#5a6470', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Rankings</a>
            <a href="/calculator" style={{ color: '#5a6470', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Calculator</a>
            <a href="/submit" style={{ background: '#3df5b0', color: '#000', padding: '9px 20px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>+ Submit Jump</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <a href="/" style={{ color: '#5a6470', textDecoration: 'none', fontSize: '13px' }}>← Back to Rankings</a>

        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#3df5b0', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              {athlete.country} · {athlete.sport}
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: '900', lineHeight: '1', marginBottom: '16px' }}>{athlete.name}</h1>

            {rank && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1px solid ${rankColor(rank)}`, padding: '8px 16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: rankColor(rank) }}>#{rank}</span>
                <span style={{ fontSize: '12px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Rank</span>
              </div>
            )}

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: `1px solid ${verifiedColor(athlete.verified)}`, padding: '6px 12px', color: verifiedColor(athlete.verified), fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }}></div>
              {athlete.verified}
            </div>
          </div>

          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '11px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Stats</div>
            {[
              ['Vertical Jump', `${athlete.vertical}"`],
              ['Standing Reach', athlete.standing_reach ? formatInches(athlete.standing_reach) : '—'],
              ['Max Touch', maxTouch ? formatInches(maxTouch) : '—'],
              ['Height', athlete.height ? formatInches(athlete.height) : '—'],
              ['Weight', athlete.weight ? `${athlete.weight} lb` : '—'],
              ['State / Province', athlete.state || '—'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e242c' }}>
                <span style={{ fontSize: '13px', color: '#5a6470' }}>{label}</span>
                <span style={{ fontSize: '15px', fontWeight: '600', color: label === 'Vertical Jump' ? '#3df5b0' : '#e8edf3' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {athlete.video_url && (
          <div style={{ marginTop: '32px', border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '11px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Verification Video</div>
            <a href={athlete.video_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3df5b0', textDecoration: 'none', fontSize: '14px', border: '1px solid #3df5b0', padding: '10px 20px' }}>
              ▶ Watch Video
            </a>
          </div>
        )}
{user && athlete && !athlete.user_id && !claimed && (
  <div style={{ marginTop: '32px', border: '1px solid #1e242c', background: '#0f1318', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Is this your profile?</div>
      <div style={{ fontSize: '12px', color: '#5a6470' }}>Claim it to verify your jump and track your rankings.</div>
    </div>
    <button onClick={async () => {
      setClaiming(true)
      const { data: existing } = await supabase
        .from('athletes')
        .select('id')
        .eq('user_id', user.id)
      if (existing && existing.length > 0) {
        alert('You have already claimed a profile. You can only claim one.')
        setClaiming(false)
        return
      }
      await supabase.from('athletes').update({ user_id: user.id }).eq('id', id)
      setClaiming(false)
      setClaimed(true)
    }} style={{ background: '#3df5b0', color: '#000', border: 'none', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' as const }}>
      {claiming ? 'Claiming...' : 'This is me →'}
    </button>
  </div>
)}

{claimed && (
  <div style={{ marginTop: '32px', background: 'rgba(61,245,176,0.1)', border: '1px solid #3df5b0', color: '#3df5b0', padding: '16px 24px', fontSize: '13px' }}>
    ✓ Profile claimed successfully!
  </div>
)}

{athlete?.user_id && user?.id === athlete.user_id && !claimed && (
  <div style={{ marginTop: '32px' }}>
    {!editing ? (
      <div style={{ background: 'rgba(61,245,176,0.05)', border: '1px solid #3df5b0', color: '#3df5b0', padding: '16px 24px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>✓ This is your verified profile.</span>
        <button onClick={() => { setEditing(true); setEditForm({ height: athlete.height, standing_reach: athlete.standing_reach, vertical: athlete.vertical, weight: athlete.weight, state: athlete.state }) }} style={{ background: 'none', border: '1px solid #3df5b0', color: '#3df5b0', padding: '6px 14px', fontSize: '11px', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase' }}>Edit Stats</button>
      </div>
    ) : (
      <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '20px' }}>Edit Your Stats</div>
        {[['Height (inches)', 'height'], ['Standing Reach (inches)', 'standing_reach'], ['Vertical Jump (inches)', 'vertical'], ['Body Weight (lbs)', 'weight']].map(([label, key]) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5a6470', marginBottom: '6px' }}>{label}</label>
            <input value={editForm[key] || ''} onChange={e => setEditForm({ ...editForm, [key]: e.target.value })} style={{ width: '100%', background: '#080a0e', border: '1px solid #1e242c', color: '#e8edf3', padding: '10px 14px', fontSize: '14px', outline: 'none' }} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={async () => {
            setSaving(true)
            await supabase.from('athletes').update({
              height: editForm.height ? parseFloat(editForm.height) : null,
              standing_reach: editForm.standing_reach ? parseFloat(editForm.standing_reach) : null,
              vertical: editForm.vertical ? parseFloat(editForm.vertical) : null,
              weight: editForm.weight ? parseFloat(editForm.weight) : null,
            }).eq('id', id)
            setAthlete({ ...athlete, ...editForm })
            setSaving(false)
            setEditing(false)
          }} style={{ background: '#3df5b0', color: '#000', border: 'none', padding: '10px 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={() => setEditing(false)} style={{ background: 'none', border: '1px solid #1e242c', color: '#5a6470', padding: '10px 24px', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    )}
  </div>
)}
        <div style={{ marginTop: '32px', border: '1px solid #1a8a5f', background: 'rgba(61,245,176,0.03)', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '8px' }}>Think you can beat {athlete.name.split(' ')[0]}?</div>
          <p style={{ fontSize: '13px', color: '#5a6470', marginBottom: '16px' }}>Submit your jump and get ranked globally.</p>
          <a href="/submit" style={{ display: 'inline-block', background: '#3df5b0', color: '#000', padding: '12px 32px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>Submit My Jump →</a>
        </div>
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

export default function AthletePage() {
  return (
    <Suspense fallback={<main style={{ background: '#080a0e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#3df5b0', fontFamily: 'sans-serif' }}>Loading...</div></main>}>
      <AthleteContent />
    </Suspense>
  )
}
