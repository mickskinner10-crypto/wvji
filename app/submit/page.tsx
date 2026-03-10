'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Submit() {
  const [form, setForm] = useState({ name: '', country: '', sport: '', vertical: '', weight: '', height: '', standing_reach: '', state: '', video_url: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    setLoading(true)
    await supabase.from('athletes').insert([{
      name: form.name,
      country: form.country,
      sport: form.sport,
      vertical: parseFloat(form.vertical),
      weight: parseFloat(form.weight),
      height: parseFloat(form.height),
  standing_reach: parseFloat(form.standing_reach),
      verified: 'Pending'
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

        {[
          { label: "Full Name", name: "name", placeholder: "Your full name" },
          { label: "Country", name: "country", placeholder: "e.g. 🇺🇸 USA" },
          { label: "Height (inches)", name: "height", placeholder: "e.g. 72 (6 feet = 72 inches)" },
{ label: "Standing Reach (inches)", name: "standing_reach", placeholder: "e.g. 90" },
{ label: "Vertical Jump (inches)", name: "vertical", placeholder: "e.g. 42.5" },
{ label: "Body Weight (lbs)", name: "weight", placeholder: "e.g. 175" },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a6470", marginBottom: "8px" }}>{field.label}</label>
            <input
              name={field.name}
              placeholder={field.placeholder}
              onChange={handle}
              style={{ width: "100%", background: "#0f1318", border: "1px solid #1e242c", color: "#e8edf3", padding: "12px 16px", fontSize: "15px", outline: "none" }}
            />
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

        <button onClick={submit} disabled={loading} style={{ width: "100%", background: "#3df5b0", color: "#000", border: "none", padding: "16px", fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase" }}>
          {loading ? "Submitting..." : "Submit Jump →"}
        </button>
      </div>
    </main>
  )
}
