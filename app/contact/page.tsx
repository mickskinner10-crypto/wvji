export default function Contact() {
  return (
    <>
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #080a0e; color: #e8edf3; font-family: sans-serif; } p { font-size: 14px; color: #9aa3ad; line-height: 1.8; }`}</style>

      <header style={{ borderBottom: '1px solid #1e242c', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="Vert Ranking" style={{ height: '72px', width: 'auto' }} />
          </a>
        </div>
      </header>

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ color: '#3df5b0', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Get In Touch</div>
        <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1', marginBottom: '24px' }}>Contact Us</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#3df5b0' }}>General Inquiries</div>
            <p>Questions about Vert Ranking, partnerships, or anything else.</p>
            <a href="mailto:contact@vertranking.com" style={{ display: 'inline-block', marginTop: '12px', color: '#3df5b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>contact@vertranking.com</a>
          </div>

          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#f5c842' }}>Verification Questions</div>
            <p>Want to get your jump verified? Need help understanding the Gold or Silver tier requirements? Reach out and we'll walk you through it.</p>
            <a href="mailto:verify@vertranking.com" style={{ display: 'inline-block', marginTop: '12px', color: '#3df5b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>verify@vertranking.com</a>
          </div>

          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#9bb0c7' }}>Report a Submission</div>
            <p>Think a jump is fake or exaggerated? Send us the athlete name and your reason and we will review it.</p>
            <a href="mailto:report@vertranking.com" style={{ display: 'inline-block', marginTop: '12px', color: '#3df5b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>report@vertranking.com</a>
          </div>

          <div style={{ border: '1px solid #1e242c', background: '#0f1318', padding: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#5a6470' }}>Data Removal</div>
            <p>Want your profile or data removed? Email us and we will delete it within 7 days.</p>
            <a href="mailto:contact@vertranking.com" style={{ display: 'inline-block', marginTop: '12px', color: '#3df5b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>contact@vertranking.com</a>
          </div>

        </div>
      </main>

      <footer style={{ borderTop: '1px solid #1e242c', padding: '24px', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '3px', color: '#5a6470' }}>VERT RANKING</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="/privacy" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Terms of Service</a>
            <a href="/contact" style={{ fontSize: '11px', color: '#5a6470', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
