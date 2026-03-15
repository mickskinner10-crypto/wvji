export default function Terms() {
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
        <h1 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '8px' }}>Terms of Service</h1>
        <p style={{ marginBottom: '32px' }}>Last updated: March 2026</p>

        <h2>Acceptance</h2>
        <p>By using Vert Ranking you agree to these terms. If you do not agree, do not use the site.</p>

        <h2>Accurate information</h2>
        <p>By submitting a jump you confirm that the measurement is accurate to the best of your knowledge. Submitting false or exaggerated jumps may result in removal from the leaderboard.</p>

        <h2>Verification</h2>
        <p>Vert Ranking reserves the right to verify, reject, or remove any submission at any time. Verification tier decisions are final.</p>

        <h2>Your content</h2>
        <p>By submitting a video link or any other content, you confirm you have the right to share it. Vert Ranking does not host videos — we only store links.</p>

        <h2>Accounts</h2>
        <p>You are responsible for maintaining the security of your account. Do not share your login credentials. Vert Ranking is not liable for any unauthorized access to your account.</p>

        <h2>Prohibited conduct</h2>
        <ul>
          <li>Submitting false measurements</li>
          <li>Claiming an athlete profile that is not yours</li>
          <li>Attempting to manipulate rankings</li>
          <li>Harassing other athletes or users</li>
        </ul>

        <h2>Termination</h2>
        <p>We reserve the right to remove any account or submission that violates these terms without notice.</p>

        <h2>Disclaimer</h2>
        <p>Vert Ranking is provided as-is. We make no guarantees about uptime, accuracy of rankings, or verification decisions.</p>

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
