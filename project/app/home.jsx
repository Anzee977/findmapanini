/* global React, IOSDevice, IOSStatusBar, FmpLogo, FmpButton, FmpProgress, FlagBar, StickerCard, FMP_DATA */

const { useState: useS1 } = React;

// ──────────────────────────────────────────────────────────────
// SCREEN: HOME — Dashboard
// Stadium background, big % progress dial, action tiles, latest finds
// ──────────────────────────────────────────────────────────────
function ScreenHome() {
  const pct = Math.round((window.FMP_DATA.TOTAL_OWNED / window.FMP_DATA.TOTAL_CARDS) * 100);
  return (
    <div style={{
      minHeight: "100%",
      background: "#F4EFE3",
      paddingBottom: 100,
    }}>
      {/* hero band — chevron strip + headline */}
      <div style={{ position: "relative", paddingTop: 56, paddingBottom: 18, background: "#0B0E1A", color: "#F4EFE3", overflow: "hidden" }}>
        <div className="chevron-strip" style={{
          position: "absolute", inset: 0, color: "rgba(251,197,49,0.10)",
        }} />
        <div style={{
          position: "absolute", right: -40, top: -20,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, #FF3D2E 0%, transparent 60%)",
          opacity: 0.4,
        }} />
        <div style={{ padding: "8px 18px 0", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <FmpLogo dark size={1} />
            <div style={{
              width: 32, height: 32, borderRadius: 16,
              background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div className="t-mono" style={{ fontSize: 11, color: "#F4EFE3" }}>MT</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="t-mono" style={{ fontSize: 10, color: "#FBC531", letterSpacing: "0.16em" }}>
              ◆  COUPE DU MONDE 2026  ◆  USA · CAN · MEX
            </div>
            <div className="t-display" style={{
              fontSize: 38, lineHeight: 0.92, marginTop: 6,
              color: "#F4EFE3",
            }}>
              SALUT MATTÉO,<br/>
              <span style={{ color: "#FF3D2E" }}>PLUS QUE 408 CARTES.</span>
            </div>
          </div>
        </div>
      </div>

      {/* progress block (sits on dark, half overlap) */}
      <div style={{
        margin: "-22px 14px 0", padding: 14,
        background: "#F4EFE3",
        borderRadius: 14,
        boxShadow: "0 12px 32px -10px rgba(11,14,26,0.25)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ProgressDial pct={pct} />
          <div style={{ flex: 1 }}>
            <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.1em", opacity: 0.55 }}>MA COLLECTION</div>
            <div className="t-display" style={{ fontSize: 32, lineHeight: 1, color: "#0B0E1A", margin: "2px 0 4px" }}>
              {window.FMP_DATA.TOTAL_OWNED}<span style={{ opacity: 0.3 }}>/{window.FMP_DATA.TOTAL_CARDS}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Tag bg="#0F5132" fg="#F4EFE3">+12 CETTE SEM.</Tag>
              <Tag bg="#FBC531" fg="#0B0E1A">17 DOUBLONS</Tag>
            </div>
          </div>
        </div>
      </div>

      {/* action grid — Scanner, Album, Wishlist, Doublons */}
      <div style={{ padding: "16px 14px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <ActionTile bg="#FF3D2E" fg="#F4EFE3" big label="SCANNER" sub="Camera · Photo · Manuel" icon={<ScanIcon color="#F4EFE3" />} />
        <ActionTile bg="#0B0E1A" fg="#F4EFE3" big label="MON ALBUM" sub="12 équipes · 720 cartes" icon={<BookIcon color="#FBC531" />} />
        <ActionTile bg="#FBC531" fg="#0B0E1A" label="WISHLIST" sub="9 chasses" icon={<StarIcon color="#0B0E1A" />} />
        <ActionTile bg="#2D6BFF" fg="#F4EFE3" label="DOUBLONS" sub="17 dispo · échange" icon={<SwapIcon color="#F4EFE3" />} />
      </div>

      {/* mini reel — latest sticked */}
      <div style={{ padding: "18px 14px 0" }}>
        <SectionHeader title="DERNIÈREMENT COLLÉS" right="VOIR TOUT" />
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "8px 0 4px", marginLeft: -2 }}>
          {[16, 17, 12, 5, 11, 18].map(n => {
            const c = window.FMP_DATA.FRANCE.cards.find(x => x.n === n);
            return c && <StickerCard key={n} card={c} state="owned" small />;
          })}
        </div>
      </div>

      {/* tab bar */}
      <FmpTabBar active="home" />
    </div>
  );
}

function ProgressDial({ pct }) {
  const r = 36, c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="50" cy="50" r={r} stroke="rgba(11,14,26,0.08)" strokeWidth="9" fill="none" />
        <circle cx="50" cy="50" r={r} stroke="#FF3D2E" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} fill="none" />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div className="t-display" style={{ fontSize: 28, color: "#0B0E1A", lineHeight: 1 }}>{pct}<span style={{ fontSize: 14 }}>%</span></div>
        <div className="t-mono" style={{ fontSize: 7, opacity: 0.5, letterSpacing: "0.1em", marginTop: 2 }}>COMPLET</div>
      </div>
    </div>
  );
}

function Tag({ bg, fg, children }) {
  return (
    <span className="t-mono" style={{
      background: bg, color: fg, fontSize: 8, letterSpacing: "0.06em",
      padding: "3px 6px", borderRadius: 3, fontWeight: 700,
    }}>{children}</span>
  );
}

function ActionTile({ bg, fg, label, sub, icon, big }) {
  return (
    <div style={{
      background: bg, color: fg, borderRadius: 14, padding: 12,
      height: big ? 124 : 96, display: "flex", flexDirection: "column",
      justifyContent: "space-between", position: "relative", overflow: "hidden",
      boxShadow: "0 8px 22px -10px rgba(11,14,26,0.25)",
    }}>
      <div className="halftone" style={{
        position: "absolute", right: -10, bottom: -10, width: 60, height: 60,
        color: fg, opacity: 0.12,
      }} />
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <div className="t-display" style={{ fontSize: big ? 22 : 18, lineHeight: 1, letterSpacing: "0.02em" }}>{label}</div>
        <div className="t-mono" style={{ fontSize: 9, opacity: 0.7, marginTop: 3, letterSpacing: "0.04em" }}>{sub}</div>
      </div>
    </div>
  );
}

function SectionHeader({ title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div className="t-display" style={{ fontSize: 18, color: "#0B0E1A", letterSpacing: "0.04em" }}>{title}</div>
      {right && <div className="t-mono" style={{ fontSize: 10, color: "#FF3D2E", letterSpacing: "0.08em" }}>{right} →</div>}
    </div>
  );
}

// icon set
function ScanIcon({ color = "#fff", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
      <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
      <path d="M3 12h18"/>
    </svg>
  );
}
function BookIcon({ color = "#fff", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}
function StarIcon({ color = "#fff", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2.9 7h7.1l-5.7 4.5 2.2 7.5L12 16.8 5.5 21l2.2-7.5L2 9h7.1z"/>
    </svg>
  );
}
function SwapIcon({ color = "#fff", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4v16M3 8l4-4 4 4"/><path d="M17 20V4M21 16l-4 4-4-4"/>
    </svg>
  );
}
function CameraIcon({ color = "#fff", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Tab bar
// ──────────────────────────────────────────────────────────────
function FmpTabBar({ active = "home" }) {
  const items = [
    { id: "home",   label: "ACCUEIL", icon: <BookIcon color="currentColor" size={20} /> },
    { id: "scan",   label: "SCAN",    icon: <ScanIcon color="currentColor" size={20} />, primary: true },
    { id: "wish",   label: "CHASSE",  icon: <StarIcon color="currentColor" size={20} /> },
    { id: "swap",   label: "ÉCHANGE", icon: <SwapIcon color="currentColor" size={20} /> },
  ];
  return (
    <div style={{
      position: "absolute", left: 12, right: 12, bottom: 14,
      height: 64, borderRadius: 32,
      background: "rgba(11,14,26,0.96)",
      backdropFilter: "blur(20px)",
      display: "flex", padding: 6,
      boxShadow: "0 16px 38px -8px rgba(11,14,26,0.4)",
    }}>
      {items.map(i => {
        const isActive = i.id === active;
        return (
          <div key={i.id} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            color: isActive ? (i.primary ? "#0B0E1A" : "#FBC531") : "rgba(244,239,227,0.55)",
            background: isActive && i.primary ? "#FBC531" : "transparent",
            borderRadius: 26, gap: 2,
          }}>
            {i.icon}
            <div className="t-mono" style={{ fontSize: 7.5, letterSpacing: "0.1em", fontWeight: 700 }}>{i.label}</div>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  ScreenHome, ScanIcon, BookIcon, StarIcon, SwapIcon, CameraIcon, FmpTabBar,
  Tag, SectionHeader, ProgressDial, ActionTile,
});
