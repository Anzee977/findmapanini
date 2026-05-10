/* global React */

// ──────────────────────────────────────────────────────────────
// ROI / Business case dashboard — NOT a phone screen, a wide
// briefing for Mattéo & Théo. Lives as its own artboard in the
// canvas, sized 720x900-ish.
// ──────────────────────────────────────────────────────────────
function RoiSheet() {
  // Assumptions (conservative · realistic · optimistic)
  const scenarios = [
    { name: "PESSIMISTE",  users: 15000,  freePct: 0.96, payPct: 0.04, arpuAd: 0.40, arpuPro: 12, color: "#2D6BFF" },
    { name: "RÉALISTE",    users: 60000,  freePct: 0.93, payPct: 0.07, arpuAd: 0.65, arpuPro: 14, color: "#FBC531" },
    { name: "OPTIMISTE",   users: 200000, freePct: 0.90, payPct: 0.10, arpuAd: 0.95, arpuPro: 16, color: "#FF3D2E" },
  ];
  // costs
  const costs = [
    ["Dév. iOS + Android (3 mois)", 14000],
    ["Reconnaissance carte (API IA)", 1800],
    ["Backend & hébergement (12 mois)", 1200],
    ["Stores Apple + Google (1 an)", 124],
    ["Design / illustration", 800],
    ["Marketing TikTok / créateurs", 3500],
  ];
  const totalCost = costs.reduce((a, [, v]) => a + v, 0);

  const fmtEuro = (n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €";

  return (
    <div style={{
      width: 720, padding: 32, background: "#F4EFE3", color: "#0B0E1A",
      fontFamily: "var(--body)", position: "relative",
    }}>
      <div className="halftone" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, color: "#FF3D2E" }}/>

      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div className="t-mono" style={{ fontSize: 11, color: "#FF3D2E", letterSpacing: "0.16em" }}>◆ BUSINESS CASE · v1</div>
          <div className="t-display" style={{ fontSize: 64, lineHeight: 0.9, marginTop: 4 }}>
            FAIRE DU<br/>
            <span style={{ color: "#FF3D2E" }}>BÉNÉF.</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="t-mono" style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.1em" }}>HORIZON</div>
          <div className="t-display" style={{ fontSize: 22 }}>JUIN 25 → JUIL 26</div>
          <div className="t-mono" style={{ fontSize: 10, opacity: 0.55, marginTop: 2 }}>13 mois · pic = été 26</div>
        </div>
      </div>

      {/* hypotheses */}
      <Section title="HYPOTHÈSES MARCHÉ">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <Stat big="5,5 M" label="ALBUMS PANINI 2026 (FR + BE + CH estim.)" />
          <Stat big="12 %"  label="POSSESSEURS QUI INSTALLENT UNE APP COMPAGNON" />
          <Stat big="660 K" label="MARCHÉ ADRESSABLE THÉORIQUE" />
        </div>
      </Section>

      {/* scenarios */}
      <Section title="3 SCÉNARIOS · REVENUS BRUTS 12 MOIS">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {scenarios.map(s => {
            const free = Math.round(s.users * s.freePct);
            const pro  = Math.round(s.users * s.payPct);
            const adRev = Math.round(free * s.arpuAd);
            const proRev = Math.round(pro * s.arpuPro);
            const total = adRev + proRev;
            return (
              <div key={s.name} style={{
                background: "#0B0E1A", color: "#F4EFE3", borderRadius: 12, padding: 16,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 4, background: s.color,
                }}/>
                <div className="t-mono" style={{ fontSize: 9, color: s.color, letterSpacing: "0.12em" }}>SCÉNARIO</div>
                <div className="t-display" style={{ fontSize: 20, marginTop: 2 }}>{s.name}</div>
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <Row k="Utilisateurs"     v={s.users.toLocaleString("fr-FR")} />
                  <Row k="Free / Pro"       v={`${(s.freePct*100)|0}% / ${(s.payPct*100)|0}%`} />
                  <Row k="ARPU Ad / an"     v={s.arpuAd.toFixed(2) + " €"} />
                  <Row k="ARPU Pro"         v={s.arpuPro + " €"} />
                </div>
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px dashed rgba(255,255,255,0.18)" }}>
                  <Row k="↳ Pub"   v={fmtEuro(adRev)} />
                  <Row k="↳ Pro"   v={fmtEuro(proRev)} />
                  <div className="t-display" style={{
                    fontSize: 30, color: s.color, marginTop: 8, lineHeight: 1,
                  }}>{fmtEuro(total)}</div>
                  <div className="t-mono" style={{ fontSize: 9, opacity: 0.55, marginTop: 2, letterSpacing: "0.08em" }}>
                    REVENUS · NET TVA, BRUT STORE
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* costs */}
      <Section title="COÛTS ESTIMÉS · 13 MOIS">
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 4px 14px -8px rgba(0,0,0,0.2)" }}>
          {costs.map(([k, v], i) => (
            <div key={k} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0",
              borderTop: i === 0 ? "none" : "1px dashed rgba(11,14,26,0.1)",
            }}>
              <span className="t-body" style={{ fontSize: 13 }}>{k}</span>
              <span className="t-mono" style={{ fontSize: 13, fontWeight: 600 }}>{fmtEuro(v)}</span>
            </div>
          ))}
          <div style={{
            marginTop: 8, padding: "12px 0 0", borderTop: "2px solid #0B0E1A",
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
          }}>
            <span className="t-display" style={{ fontSize: 16 }}>TOTAL CASH OUT</span>
            <span className="t-display" style={{ fontSize: 28, color: "#FF3D2E" }}>{fmtEuro(totalCost)}</span>
          </div>
        </div>
      </Section>

      {/* verdict */}
      <Section title="VERDICT">
        <div style={{
          background: "#0F5132", color: "#F4EFE3", borderRadius: 12, padding: 18,
          position: "relative", overflow: "hidden",
        }}>
          <div className="halftone" style={{ position: "absolute", inset: 0, color: "rgba(251,197,49,0.1)" }}/>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Verdict label="POINT MORT" big="24 K" sub="utilisateurs payants ou ~52 K free + pub" />
            <Verdict label="ROI · RÉALISTE" big="×3,4" sub={`${fmtEuro(74400 - totalCost)} de bénéfice net`} />
            <Verdict label="RECO" big="FREE+ADS + PASS COUPE 9,99€" sub="puis Pro mensuel après le tournoi" />
          </div>
        </div>
        <div className="t-mono" style={{ fontSize: 10, marginTop: 10, opacity: 0.6, letterSpacing: "0.04em" }}>
          ⚠ Estimation grossière. ARPU pub mobile FR ≈ 0,40–1 €/an. iOS prélève 30% (15% &lt; 1M$). Vise un launch début 2026 pour capter le pic.
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 14, height: 14, background: "#FF3D2E", borderRadius: 2 }}/>
        <div className="t-display" style={{ fontSize: 16, letterSpacing: "0.04em" }}>{title}</div>
        <div style={{ flex: 1, height: 1, background: "rgba(11,14,26,0.15)" }}/>
      </div>
      {children}
    </div>
  );
}

function Stat({ big, label }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: 14, boxShadow: "0 4px 12px -8px rgba(0,0,0,0.18)" }}>
      <div className="t-display" style={{ fontSize: 36, lineHeight: 0.95, color: "#0B0E1A" }}>{big}</div>
      <div className="t-mono" style={{ fontSize: 9, opacity: 0.6, marginTop: 6, letterSpacing: "0.08em", lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
      <span className="t-mono" style={{ fontSize: 10, opacity: 0.6, letterSpacing: "0.06em" }}>{k}</span>
      <span className="t-mono" style={{ fontSize: 11, fontWeight: 600 }}>{v}</span>
    </div>
  );
}

function Verdict({ label, big, sub }) {
  return (
    <div>
      <div className="t-mono" style={{ fontSize: 9, color: "#FBC531", letterSpacing: "0.12em" }}>{label}</div>
      <div className="t-display" style={{ fontSize: 26, lineHeight: 1.05, marginTop: 4 }}>{big}</div>
      <div className="t-body" style={{ fontSize: 11, opacity: 0.7, marginTop: 4, lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { RoiSheet });
