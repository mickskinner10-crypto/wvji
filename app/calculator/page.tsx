'use client'
import { useState } from 'react'

export default function Calculator() {
  const [height, setHeight] = useState('')
  const [reach, setReach] = useState('')
  const [vertical, setVertical] = useState('')

  const heightInches = parseFloat(height)
  const reachInches = parseFloat(reach)
  const verticalInches = parseFloat(vertical)

  const maxTouch = reachInches && verticalInches ? (reachInches + verticalInches) : null
  const rimHeight = 126 // 10 feet + 6 inches to actually palm and dunk
  const canDunk = maxTouch ? maxTouch >= rimHeight : null

  const formatInches = (inches: number) => {
    const feet = Math.floor(inches / 12)
    const remaining = Math.round(inches % 12)
    return `${feet}'${remaining}"`
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080a0e; color: #e8edf3; font-family: sans-serif; }
        input { width: 100%; background: #0f1318; border: 1px solid #1e242c; color: #e8edf3; padding: 12px 16px; font-size: 15px; outline: none; transition: border-color 0.2s; }
        input:focus { border-color: #3df5b0; }
        input::placeholder { color: #5a6470; }
      `}</style>

      <header style={{ borderBottom: '1px solid #1e242c', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="Vert Ranking" style={{ height: '72px', width: 'auto' }} />
          </a>
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="/" style={{ color: '#5a6470', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Rankings</a>
            <a href="/calculator" style={{ color: '#3df5b0', textDecoration: 'none', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Calculator</a>
            <a href="/submit" style={{ background: '#3df5b0', color: '#000', padding: '9px 20px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>+ Submit Jump</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ color: '#3df5b0', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Free Tool</div>
        <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1', marginBottom: '8px' }}>Max Touch<br/>Calculator</h1>
        <p style={{ color: '#5a6470', marginBottom: '48px', lineHeight: '1.7' }}>Find out how high you can touch and whether you can dunk. Used by dunkers and athletes worldwide.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5a6470', marginBottom: '8px' }}>Your Height (inches)</label>
            <input value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 72 (6 feet = 72 inches)" />
            {height && <div style={{ fontSize: '12px', color: '#3df5b0', marginTop: '4px' }}>{formatInches(parseFloat(height))}</div>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5a6470', marginBottom: '8px' }}>Standing Reach (inches)</label>
            <input value={reach} onChange={e => setReach(e.target.value)} placeholder="e.g. 90 (measure fingertip to floor)" />
            {reach && <div style={{ fontSize: '12px', color: '#3df5b0', marginTop: '4px' }}>{formatInches(parseFloat(reach))}</div>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5a6470', marginBottom: '8px' }}>Vertical Jump (inches)</label>
            <input value={vertical} onChange={e => setVertical(e.target.value)} placeholder="e.g. 30" />
          </div>
        </div>

        {maxTouch && (
          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '32px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#5a6470', marginBottom: '16px' }}>Your Results</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Max Touch</div>
                <div style={{ fontSize: '42px', fontWeight: '900', color: '#3df5b0', lineHeight: 1 }}>{formatInches(maxTouch)}</div>
                <div style={{ fontSize: '12px', color: '#5a6470', marginTop: '4px' }}>{maxTouch.toFixed(1)}"</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Can You Dunk?</div>
                <div style={{ fontSize: '42px', fontWeight: '900', color: canDunk ? '#3df5b0' : '#f54242', lineHeight: 1 }}>{canDunk ? 'YES' : 'NOT YET'}</div>
                <div style={{ fontSize: '12px', color: '#5a6470', marginTop: '4px' }}>{canDunk ? `${(maxTouch - rimHeight).toFixed(1)}" above the rim` : `${(rimHeight - maxTouch).toFixed(1)}" below the rim`}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e242c', paddingTop: '20px' }}>
              <div style={{ fontSize: '11px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  ['Standing Reach', formatInches(reachInches)],
                  ['+ Vertical Jump', `+ ${verticalInches}"`],
                  ['= Max Touch', formatInches(maxTouch)],
                  ['Dunk Threshold (10'6")', `10'6" (126")`],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#5a6470' }}>{label}</span>
                    <span style={{ color: '#e8edf3', fontWeight: '500' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {maxTouch && (
          <div style={{ border: '1px solid #1a8a5f', background: 'rgba(61,245,176,0.03)', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '8px' }}>Want to see how you rank globally?</div>
            <p style={{ fontSize: '13px', color: '#5a6470', marginBottom: '16px' }}>Submit your vertical jump and get ranked against athletes worldwide.</p>
            <a href="/submit" style={{ display: 'inline-block', background: '#3df5b0', color: '#000', padding: '12px 32px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>Submit Your Jump →</a>
          </div>
        )}

        <div style={{ marginTop: '48px', border: '1px solid #1e242c', padding: '24px', background: '#0f1318' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>How to measure standing reach</div>
          <div style={{ fontSize: '13px', color: '#5a6470', lineHeight: '1.8' }}>
            1. Stand flat-footed against a wall<br/>
            2. Reach up as high as possible with one arm<br/>
            3. Measure from the floor to your fingertips<br/>
            4. This is your standing reach
          </div>
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
