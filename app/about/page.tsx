export default function About() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080a0e; color: #e8edf3; font-family: sans-serif; }
        h2 { font-size: 28px; font-weight: 900; margin: 48px 0 12px; letter-spacing: 1px; }
        h3 { font-size: 18px; font-weight: 700; margin: 24px 0 8px; color: #3df5b0; }
        p { font-size: 14px; color: #9aa3ad; line-height: 1.9; margin-bottom: 16px; }
      `}</style>

      <header style={{ borderBottom: '1px solid #1e242c', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="Vert Ranking" style={{ height: '72px', width: 'auto' }} />
          </a>
        </div>
      </header>

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ color: '#3df5b0', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Our Mission</div>
        <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px' }}>About Vert Ranking</h1>
        <p>Vert Ranking is the world's first unified global leaderboard for vertical jump performance. We built it because no such thing existed — athletes had no way to compare their vertical jump against others worldwide in a standardized, verified way.</p>
        <p>Whether you're a dunker, a volleyball player, a track athlete, or just someone who trains to jump higher — you deserve to know where you stand globally. That's what we built.</p>

        <h2>How Rare Is a 30 Inch Vertical?</h2>
        <p>A 30 inch vertical jump is genuinely impressive and puts you well above the average person. Most untrained adults jump somewhere between 16 and 20 inches. Athletes who train regularly often reach 24 to 28 inches.</p>
        <p>Hitting 30 inches means you're in roughly the top 20% of all athletes who train their vertical. You can likely touch the backboard if you're of average height, and you're approaching dunk territory depending on your standing reach.</p>
        <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', color: '#5a6470', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Vertical Jump Benchmarks</div>
          {[
            ['Under 20"', 'Average untrained adult', '#5a6470'],
            ['20–24"', 'Recreational athlete', '#5a6470'],
            ['24–28"', 'Trained athlete', '#3df5b0'],
            ['28–32"', 'High level athlete', '#3df5b0'],
            ['32–36"', 'Elite athlete', '#f5c842'],
            ['36–40"', 'Exceptional — top 1%', '#f5c842'],
            ['40"+', 'World class', '#f54242'],
          ].map(([range, label, color]) => (
            <div key={range} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e242c' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: color as string }}>{range}</span>
              <span style={{ fontSize: '13px', color: '#5a6470' }}>{label}</span>
            </div>
          ))}
        </div>

        <h2>How Rare Is a 40 Inch Vertical?</h2>
        <p>A 40 inch vertical is extraordinarily rare. We're talking about the top fraction of a percent of all athletes on the planet. Most NBA players — some of the best athletes in the world — average around 28 to 32 inches. Only a handful of NBA players have ever been measured above 40 inches.</p>
        <p>In the dunking community, a 40 inch vertical is considered the benchmark of elite explosive power. Athletes who reach this level can typically dunk from well behind the free throw line and perform advanced aerial moves with ease.</p>
        <p>If you have a 40 inch vertical, you are genuinely one of the best jumpers in the world. Submit it to Vert Ranking and prove it.</p>

        <h2>How We Verify Jumps</h2>
        <h3>🥇 Gold — Certified</h3>
        <p>Tested at a certified facility using a Vertec, force plate, or other calibrated measurement device. This is the highest level of verification and the most trusted result on the leaderboard.</p>
        <h3>🥈 Silver — Video Evidence</h3>
        <p>A clear video submission showing the jump with a visible reference height. Must show a full approach, takeoff, and peak height against a measurable surface. Reviewed by our team before approval.</p>
        <h3>⬜ Self-Reported</h3>
        <p>Athletes can submit their jump without verification. These results are displayed but clearly marked as unverified. Great for getting on the board while you arrange for proper testing.</p>

        <h2>Who Is Vert Ranking For?</h2>
        <p>Vert Ranking is for any athlete who trains their vertical jump — dunkers, basketball players, volleyball players, track and field athletes, and football players. If you jump, you belong here.</p>
        <p>We also built the dunk checklist and dunk leaderboard for the dunking community specifically — a place to log completed dunks, earn points, and rank against the best dunkers in the world.</p>

        <h2>Why We Built This</h2>
        <p>We built Vert Ranking because vertical jump is one of the most universally trained athletic skills in the world, yet there was no central place to compare results. Powerlifting has OpenPowerlifting. Track has World Athletics. Vertical jump had nothing.</p>
        <p>Now it does.</p>

        <div style={{ marginTop: '48px', border: '1px solid #1a8a5f', background: 'rgba(61,245,176,0.03)', padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: '900', marginBottom: '8px' }}>Ready to get ranked?</div>
          <p style={{ marginBottom: '20px' }}>Submit your vertical jump and see where you stand globally.</p>
          <a href="/submit" style={{ display: 'inline-block', background: '#3df5b0', color: '#000', padding: '12px 32px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>Submit My Jump →</a>
        </div>

      </main>

      <footer style={{ borderTop: '1px solid #1e242c', padding: '24px', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '3px', color: '#5a6470' }}>VERT RANKING</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="/about" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>About</a>
            <a href="/privacy" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Terms of Service</a>
            <a href="/contact" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
