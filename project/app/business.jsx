/* global React, FmpButton, BackBtn, FmpProgress */

// ──────────────────────────────────────────────────────────────
// SCREEN: PREMIUM PAYWALL — Free with ads vs. Pro no ads
// ──────────────────────────────────────────────────────────────
function ScreenPremium() {
  return (
    <div style={{ minHeight: "100%", background: "#0B0E1A", color: "#F4EFE3", paddingBottom: 110, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: -80, right: -80, width: 260, height: 260,
        borderRadius: "50%",
        background: "radial-gradient(circle, #FF3D2E 0%, transparent 65%)",
        opacity: 0.6,
      }}/>
      <div className="halftone halftone-lg" style={{ position: "absolute", inset: 0, color: "rgba(251,197,49,0.06)" }}/>

      <div style={{ paddingTop: 56, padding: "56px 18px 0", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <BackBtn />
          <div className="t-mono" style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.14em" }}>FMP PRO</div>
          <div style={{ width: 36 }}/>
        </div>
        <div style={{ marginTop: 24 }}>
          <div className="t-mono" style={{ fontSize: 10, color: "#FBC531", letterSpacing: "0.18em" }}>◆ DEVIENS PRO</div>
          <div className="t-display" style={{ fontSize: 44, lineHeight: 0.92, marginTop: 6 }}>
            ZÉRO PUB.<br/>
            <span style={{ color: "#FBC531" }}>SCAN ILLIMITÉ.</span>
          </div>
          <div className="t-body" style={{ fontSize: 13, opacity: 0.7, marginTop: 10 }}>
            Soutiens le projet. Coupe la pub. Débloque tout pour la Coupe du Monde 2026.
          </div>
        </div>
      </div>

      {/* Plans */}
      <div style={{ padding: "20px 18px 0", display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
        <PlanCard
          tag="GRATUIT"
          tagBg="rgba(255,255,255,0.12)" tagFg="#F4EFE3"
          title="ESSENTIEL"
          price="0€"
          sub="avec pub · scan limité 5/jour"
          features={["Album & scan basique", "Pub bannière + interstitiel", "Wishlist (max 10)", "Pas d'export"]}
          cta="CONTINUER GRATUIT"
          ctaKind="paper"
        />
        <PlanCard
          tag="POPULAIRE"
          tagBg="#FBC531" tagFg="#0B0E1A"
          title="PRO MENSUEL"
          price="2,99€"
          sub="par mois · sans engagement"
          features={["Zéro publicité", "Scan illimité", "Wishlist & doublons illimités", "Export PDF de l'album"]}
          cta="ESSAYER 7 JOURS"
          ctaKind="sun"
          highlight
        />
        <PlanCard
          tag="MEILLEURE OFFRE"
          tagBg="#FF3D2E" tagFg="#F4EFE3"
          title="PRO COUPE DU MONDE"
          price="9,99€"
          sub="paiement unique · jusqu'au 19 juillet 2026"
          features={["Tout PRO inclus", "Cartes en 3D AR", "Statistiques live des matchs", "Badge Mattéo & Théo"]}
          cta="ACHETER LE PASS"
          ctaKind="fire"
        />
      </div>

      <div className="t-mono" style={{ textAlign: "center", padding: "16px 18px 0", fontSize: 9, opacity: 0.5, letterSpacing: "0.06em" }}>
        Restauration d'achat · CGU · Confidentialité
      </div>
    </div>
  );
}

function PlanCard({ tag, tagBg, tagFg, title, price, sub, features, cta, ctaKind = "paper", highlight = false }) {
  return (
    <div style={{
      background: highlight ? "linear-gradient(160deg, #14182A, #1A2540)" : "rgba(255,255,255,0.05)",
      border: highlight ? "1.5px solid #FBC531" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14, padding: 14, position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span className="t-mono" style={{
          background: tagBg, color: tagFg, fontSize: 9,
          padding: "3px 7px", borderRadius: 3, letterSpacing: "0.1em", fontWeight: 700,
        }}>{tag}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
        <div className="t-display" style={{ fontSize: 24, color: "#F4EFE3", letterSpacing: "0.04em" }}>{title}</div>
        <div className="t-display" style={{ fontSize: 28, color: highlight ? "#FBC531" : "#F4EFE3", lineHeight: 1 }}>{price}</div>
      </div>
      <div className="t-mono" style={{ fontSize: 9, opacity: 0.6, letterSpacing: "0.06em" }}>{sub}</div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <div style={{
              width: 16, height: 16, borderRadius: 8, flexShrink: 0,
              background: highlight ? "#FBC531" : "rgba(255,255,255,0.12)",
              color: highlight ? "#0B0E1A" : "#F4EFE3",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
            }}>✓</div>
            <span className="t-body" style={{ opacity: 0.85 }}>{f}</span>
          </div>
        ))}
      </div>
      <FmpButton kind={ctaKind} size="md" style={{ marginTop: 12, width: "100%", justifyContent: "center" }}>
        {cta}
      </FmpButton>
    </div>
  );
}

Object.assign(window, { ScreenPremium, PlanCard });
