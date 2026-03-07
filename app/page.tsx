export default function Home() {
  const athletes = [
    { rank: 1, name: "Jordan Velez", country: "🇺🇸", sport: "Basketball", vertical: '50"', weight: "178 lb", verified: "Gold" },
    { rank: 2, name: "Kofi Mensah", country: "🇬🇭", sport: "Track & Field", vertical: '48.5"', weight: "162 lb", verified: "Gold" },
    { rank: 3, name: "Damien Rousseau", country: "🇫🇷", sport: "Dunker", vertical: '48"', weight: "170 lb", verified: "Gold" },
    { rank: 4, name: "Marcus Williams", country: "🇺🇸", sport: "Basketball", vertical: '47.5"', weight: "188 lb", verified: "Silver" },
    { rank: 5, name: "Yuki Tanaka", country: "🇯🇵", sport: "Volleyball", vertical: '46"', weight: "155 lb", verified: "Silver" },
  ];

  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#e8edf3", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "8px", color: "#3df5b0", fontSize: "12px", letterSpacing: "2px" }}>● LIVE RANKINGS</div>
        <h1 style={{ fontSize: "64px", fontWeight: "900", lineHeight: "1", marginBottom: "8px" }}>WORLD VERTICAL<br/>JUMP INDEX</h1>
        <p style={{ color: "#5a6470", marginBottom: "48px" }}>The only unified global leaderboard for verified vertical jump performance.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "#1e242c", marginBottom: "48px" }}>
          {[["4,821","Athletes"],["62","Countries"],["1,203","Verified Jumps"],['50"',"World Record"]].map(([num, label]) => (
            <div key={label} style={{ background: "#0f1318", padding: "20px" }}>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#3df5b0" }}>{num}</div>
              <div style={{ fontSize: "11px", color: "#5a6470", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "50px 1fr 100px 100px 80px", gap: "8px", padding: "8px 16px", background: "#0f1318", marginBottom: "4px" }}>
          {["RANK","ATHLETE","VERTICAL","WEIGHT","VERIFIED"].map(h => (
            <div key={h} style={{ fontSize: "10px", color: "#5a6470", letterSpacing: "1px" }}>{h}</div>
          ))}
        </div>

        {athletes.map((a) => (
          <div key={a.rank} style={{ display: "grid", gridTemplateColumns: "50px 1fr 100px 100px 80px", gap: "8px", padding: "16px", background: "#0f1318", marginBottom: "2px", borderLeft: a.rank === 1 ? "3px solid #f5c842" : a.rank === 2 ? "3px solid #9bb0c7" : a.rank === 3 ? "3px solid #c97b42" : "3px solid #1e242c" }}>
            <div style={{ fontSize: "22px", fontWeight: "900", color: a.rank === 1 ? "#f5c842" : a.rank === 2 ? "#9bb0c7" : a.rank === 3 ? "#c97b42" : "#5a6470" }}>{a.rank}</div>
            <div>
              <div style={{ fontWeight: "500" }}>{a.name}</div>
              <div style={{ fontSize: "12px", color: "#5a6470" }}>{a.country} · {a.sport}</div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: "900", color: a.rank === 1 ? "#f5c842" : a.rank === 2 ? "#9bb0c7" : a.rank === 3 ? "#c97b42" : "#3df5b0", alignSelf: "center" }}>{a.vertical}</div>
            <div style={{ alignSelf: "center", color: "#9bb0c7", fontSize: "13px" }}>{a.weight}</div>
            <div style={{ alignSelf: "center", fontSize: "10px", padding: "4px 8px", border: `1px solid ${a.verified === "Gold" ? "#f5c842" : a.verified === "Silver" ? "#9bb0c7" : "#c97b42"}`, color: a.verified === "Gold" ? "#f5c842" : a.verified === "Silver" ? "#9bb0c7" : "#c97b42" }}>{a.verified}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
