'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Submit() {
  const [form, setForm] = useState({ name: '', country: '', sport: '', vertical: '', weight: '', height: '', standing_reach: '', state: '', video_url: '', birth_year: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 const submit = async () => {
    if (!form.name.trim()) {
      alert('Please enter your name.')
      return
    }
    if (!form.vertical || isNaN(parseFloat(form.vertical))) {
      alert('Please enter your vertical jump measurement.')
      return
    }
    if (!form.country) {
      alert('Please select your country.')
      return
    }
    if (!form.sport) {
      alert('Please select your sport.')
      return
    }
    if (parseFloat(form.vertical) >= 40 && !form.video_url) {
      alert('Please provide a video link for jumps of 40" or above.')
      return
    }
    setLoading(true)
    await supabase.from('athletes').insert([{
  name: form.name,
  country: form.country,
  sport: form.sport,
  vertical: parseFloat(form.vertical),
  weight: form.weight ? parseFloat(form.weight) : null,
  height: form.height ? parseFloat(form.height) : null,
  standing_reach: form.standing_reach ? parseFloat(form.standing_reach) : null,
  state: form.state || null,
  video_url: form.video_url || null,
  verified: 'Pending',
  birth_year: form.birth_year ? parseInt(form.birth_year) : null,
}])
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#e8edf3", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#3df5b0", fontSize: "48px", marginBottom: "16px" }}>✓</div>
        <h1 style={{ fontSize: "32px", fontWeight: "900", marginBottom: "8px" }}>Jump Submitted</h1>
        <p style={{ color: "#5a6470" }}>We will review your submission and verify it within 48 hours.</p>
        <a href="/" style={{ display: "inline-block", marginTop: "24px", color: "#3df5b0", textDecoration: "none" }}>← Back to Leaderboard</a>
      </div>
    </main>
  )

  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#e8edf3", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <a href="/" style={{ color: "#3df5b0", textDecoration: "none", fontSize: "13px" }}>← Back to Leaderboard</a>
        <h1 style={{ fontSize: "48px", fontWeight: "900", margin: "16px 0 8px" }}>Submit Your Jump</h1>
        <p style={{ color: "#5a6470", marginBottom: "40px" }}>Fill out the form below. All submissions are reviewed before appearing on the leaderboard.</p>

        <div style={{ marginBottom: "20px" }}>
  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a6470", marginBottom: "8px" }}>Full Name</label>
  <input name="name" placeholder="Your full name" onChange={handle} style={{ width: "100%", background: "#0f1318", border: "1px solid #1e242c", color: "#e8edf3", padding: "12px 16px", fontSize: "15px", outline: "none" }} />
</div>

<div style={{ marginBottom: "20px" }}>
  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a6470", marginBottom: "8px" }}>Country</label>
  <select name="country" onChange={handle} style={{ width: "100%", background: "#0f1318", border: "1px solid #1e242c", color: "#e8edf3", padding: "12px 16px", fontSize: "15px", outline: "none" }}>
    <option value="">Select country</option>
    {["USA","Canada","UK","Australia","France","Germany","Spain","Brazil","Argentina","Nigeria","Ghana","Kenya","South Africa","Japan","China","South Korea","Philippines","India","New Zealand","Mexico","Jamaica","Puerto Rico","Dominican Republic","Other"].map(c => <option key={c} value={c}>{c}</option>)}
  </select>
</div>

{form.country === 'USA' && (
  <div style={{ marginBottom: "20px" }}>
    <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a6470", marginBottom: "8px" }}>State</label>
    <select name="state" onChange={handle} style={{ width: "100%", background: "#0f1318", border: "1px solid #1e242c", color: "#e8edf3", padding: "12px 16px", fontSize: "15px", outline: "none" }}>
      <option value="">Select state</option>
      {["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"].map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  </div>
)}

{["height","standing_reach","vertical","weight"].map(field => (
  <div key={field} style={{ marginBottom: "20px" }}>
    <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a6470", marginBottom: "8px" }}>
      {field === 'height' ? 'Height (inches)' : field === 'standing_reach' ? 'Standing Reach (inches)' : field === 'vertical' ? 'Vertical Jump (inches)' : 'Body Weight (lbs)'}
    </label>
    <input name={field} placeholder={field === 'height' ? 'e.g. 72 (6 feet = 72 inches)' : field === 'standing_reach' ? 'e.g. 90' : field === 'vertical' ? 'e.g. 42.5' : 'e.g. 175'} onChange={handle} style={{ width: "100%", background: "#0f1318", border: "1px solid #1e242c", color: "#e8edf3", padding: "12px 16px", fontSize: "15px", outline: "none" }} />
  </div>
))}

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a6470", marginBottom: "8px" }}>Sport</label>
          <select name="sport" onChange={handle} style={{ width: "100%", background: "#0f1318", border: "1px solid #1e242c", color: "#e8edf3", padding: "12px 16px", fontSize: "15px", outline: "none" }}>
            <option value="">Select sport</option>
            <option>Basketball</option>
            <option>Volleyball</option>
            <option>Track & Field</option>
            <option>Dunker</option>
            <option>Football</option>
            <option>Other</option>
          </select>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a6470", marginBottom: "8px" }}>Birth Year (optional)</label>
          <select name="birth_year" onChange={handle} style={{ width: "100%", background: "#0f1318", border: "1px solid #1e242c", color: "#e8edf3", padding: "12px 16px", fontSize: "15px", outline: "none" }}>
            <option value="">Select birth year</option>
            {Array.from({ length: 56 }, (_, i) => 2026 - i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
{parseFloat(form.vertical) >= 40 && !form.video_url && (
  <div style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid #f5c842', color: '#f5c842', padding: '12px 16px', fontSize: '13px', marginBottom: '16px' }}>
    ⚠️ Jumps of 40" or above require a video link for review.
  </div>
)}
        <button onClick={submit} disabled={loading} style={{ width: "100%", background: "#3df5b0", color: "#000", border: "none", padding: "16px", fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase" }}>
          {loading ? "Submitting..." : "Submit Jump →"}
        </button>
      </div>
    </main>
  )
}
