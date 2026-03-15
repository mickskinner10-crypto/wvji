export default function Privacy() {
  return (
    <>
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #080a0e; color: #e8edf3; font-family: sans-serif; } h2 { font-size: 18px; font-weight: 700; margin: 32px 0 8px; } p, li { font-size: 14px; color: #9aa3ad; line-height: 1.8; } ul { padding-left: 20px; margin-top: 8px; }`}</style>

      <header style={{ borderBottom: '1px solid #1e242c', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="Vert Ranking" style={{ height: '72px', width: 'auto' }} />
          </a>
        </div>
      </header>

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '8px' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '32px' }}>Last updated: March 2026</p>

        <h2>What we collect</h2>
        <p>When you create an account we collect your email address. When you submit a jump we collect your name, country, sport, vertical jump measurement, and any optional stats like height, weight, and standing reach. If you submit a video link, that URL is stored.</p>

        <h2>How we use it</h2>
        <p>Your data is used solely to display your ranking on the Vert Ranking leaderboard. We do not sell your data. We do not share it with third parties for advertising purposes.</p>

        <h2>Google Sign-In</h2>
        <p>If you sign in with Google, we receive your email address from Google. We do not receive your Google password or any other Google account data.</p>

        <h2>Public information</h2>
        <p>Your name, country, sport, and vertical jump measurement are displayed publicly on the leaderboard. If you do not want this information public, do not submit a jump.</p>

        <h2>Data deletion</h2>
        <p>To have your data removed, email us at contact@vertranking.com and we will delete your account and athlete profile within 7 days.</p>

        <h2>Cookies</h2>
        <p>We use cookies only for authentication purposes to keep you logged in. We do not use tracking or advertising cookies.</p>

        <h2>Contact</h2>
        <p>Questions? Email contact@vertranking.com</p>
      </main>

      <footer style={{ borderTop: '1px solid #1e242c', padding: '24px', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '3px', color: '#5a6470' }}>VERT RANKING</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="/privacy" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  )
}
