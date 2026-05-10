/* global React, FmpButton, FmpProgress, ScanIcon, CameraIcon, BookIcon, StickerCard, FlagBar, FMP_DATA */

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

// ──────────────────────────────────────────────────────────────
// SCREEN: SCAN — Camera viewfinder with multi-method tabs
// ──────────────────────────────────────────────────────────────
function ScreenScan() {
  const [mode, setMode] = useS2("camera"); // camera | photo | manual | search
  const [scanning, setScanning] = useS2(true);
  return (
    <div style={{ minHeight: "100%", background: "#0B0E1A", color: "#F4EFE3", paddingBottom: 24, position: "relative" }}>
      {/* top bar */}
      <div style={{ paddingTop: 56, padding: "56px 18px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CloseBtn />
          <div className="t-display" style={{ fontSize: 18, letterSpacing: "0.04em" }}>SCANNER</div>
          <div style={{
            background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "5px 9px",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 6, background: "#FBC531", animation: "bob 1.2s ease-in-out infinite" }}/>
            <span className="t-mono" style={{ fontSize: 9, letterSpacing: "0.08em" }}>FLASH</span>
          </div>
        </div>
      </div>

      {/* method pills */}
      <div style={{ padding: "0 18px", display: "flex", gap: 6, overflowX: "auto" }}>
        {[
          { id: "camera",  label: "CAMÉRA" },
          { id: "photo",   label: "PHOTO" },
          { id: "manual",  label: "N° CARTE" },
          { id: "search",  label: "JOUEUR" },
        ].map(m => (
          <div key={m.id} onClick={() => setMode(m.id)} className="t-mono" style={{
            padding: "7px 13px", borderRadius: 18, fontSize: 10, letterSpacing: "0.08em",
            background: mode === m.id ? "#FBC531" : "rgba(255,255,255,0.06)",
            color: mode === m.id ? "#0B0E1A" : "rgba(244,239,227,0.7)",
            fontWeight: 700, whiteSpace: "nowrap",
          }}>{m.label}</div>
        ))}
      </div>

      {/* viewfinder */}
      <div style={{ padding: "16px 18px 0", position: "relative" }}>
        <div style={{
          position: "relative", aspectRatio: "3/4", borderRadius: 18, overflow: "hidden",
          background: "linear-gradient(160deg, #14182A 0%, #0B0E1A 60%, #1A2540 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}>
          {/* simulated camera content : a sticker + hand */}
          <FakeCameraContent />
          {/* corner brackets */}
          <ScanBrackets />
          {/* scan line */}
          {scanning && (
            <div style={{
              position: "absolute", left: "10%", right: "10%", height: 2,
              background: "linear-gradient(90deg, transparent, #FBC531, transparent)",
              top: "12%", animation: "scanLine 2.4s ease-in-out infinite",
              boxShadow: "0 0 14px #FBC531",
            }}/>
          )}
          {/* detected pill */}
          <div style={{
            position: "absolute", left: 14, top: 14, padding: "4px 8px 4px 6px",
            background: "rgba(11,14,26,0.78)", borderRadius: 14,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{
              width: 16, height: 16, borderRadius: 8, position: "relative",
              background: "#FF3D2E",
            }}>
              <div style={{ position: "absolute", inset: 0,
                background: "rgba(251,197,49,0.35)", borderRadius: 8,
                animation: "pulseRing 1.4s ease-out infinite",
              }}/>
            </div>
            <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.08em", color: "#FBC531" }}>CARTE DÉTECTÉE</div>
          </div>
        </div>

        {/* hint */}
        <div style={{
          marginTop: 14, padding: "10px 14px",
          background: "rgba(255,255,255,0.05)", borderRadius: 12,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 14, background: "#FF3D2E",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}><CameraIcon color="#fff" size={14} /></div>
          <div>
            <div className="t-display" style={{ fontSize: 14, letterSpacing: "0.02em" }}>POSE LA CARTE À PLAT</div>
            <div className="t-mono" style={{ fontSize: 9, opacity: 0.6, marginTop: 2 }}>Numéro lisible · bonne lumière · cadre vert</div>
          </div>
        </div>
      </div>

      {/* shutter */}
      <div style={{
        marginTop: 22, display: "flex", justifyContent: "center", alignItems: "center", gap: 30,
      }}>
        <SmallCircleBtn icon="◧" />
        <ShutterButton />
        <SmallCircleBtn icon="✕" />
      </div>
    </div>
  );
}

function CloseBtn() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.08)",
      display: "flex", alignItems: "center", justifyContent: "center", color: "#F4EFE3",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18"/>
      </svg>
    </div>
  );
}

function SmallCircleBtn({ icon }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 22, background: "rgba(255,255,255,0.08)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#F4EFE3", fontSize: 18,
    }}>{icon}</div>
  );
}

function ShutterButton() {
  return (
    <div style={{
      width: 76, height: 76, borderRadius: 38,
      border: "3px solid #F4EFE3",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 30,
        background: "#FF3D2E",
        boxShadow: "0 0 0 0 rgba(255,61,46,0.6)",
        animation: "pulseRing 1.6s ease-out infinite",
      }}/>
      <div style={{
        position: "absolute", inset: 8, borderRadius: 30, background: "#FF3D2E",
      }}/>
    </div>
  );
}

function ScanBrackets() {
  const C = "#FBC531";
  const t = 3;
  const len = 26;
  const corners = [
    { top: 22, left: 22, b: { borderTop: `${t}px solid ${C}`, borderLeft: `${t}px solid ${C}` } },
    { top: 22, right: 22, b: { borderTop: `${t}px solid ${C}`, borderRight: `${t}px solid ${C}` } },
    { bottom: 22, left: 22, b: { borderBottom: `${t}px solid ${C}`, borderLeft: `${t}px solid ${C}` } },
    { bottom: 22, right: 22, b: { borderBottom: `${t}px solid ${C}`, borderRight: `${t}px solid ${C}` } },
  ];
  return corners.map((c, i) => (
    <div key={i} style={{
      position: "absolute", width: len, height: len, ...c, ...c.b, borderRadius: 4,
    }}/>
  ));
}

function FakeCameraContent() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* desk */}
      <div className="halftone" style={{ position: "absolute", inset: 0, color: "rgba(255,255,255,0.04)" }}/>
      {/* sticker silhouette in middle */}
      <div style={{
        position: "absolute", left: "26%", top: "30%", width: "48%", aspectRatio: "3/4",
        transform: "rotate(-3deg)",
        borderRadius: 6, background: "#fff",
        boxShadow: "0 18px 40px -8px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "70%",
          background: "linear-gradient(160deg, #FF3D2E, #C03020)",
        }}>
          <div className="t-display" style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 78, color: "#fff",
            textShadow: "0 4px 18px rgba(0,0,0,.3)",
          }}>KM</div>
          <div className="t-mono" style={{
            position: "absolute", top: 8, left: 8, color: "#FBC531",
            background: "#0B0E1A", fontSize: 9, padding: "2px 5px", borderRadius: 3,
          }}>FRA17</div>
        </div>
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "30%",
          background: "#F4EFE3", display: "flex", alignItems: "center", padding: "0 8px",
          borderTop: "3px solid #FBC531",
        }}>
          <div className="t-display" style={{ fontSize: 11, color: "#0B0E1A" }}>K. MBAPPÉ</div>
        </div>
      </div>
      {/* finger */}
      <div style={{
        position: "absolute", right: -10, bottom: -4, width: 90, height: 110,
        borderRadius: "50% 50% 30% 30%",
        background: "linear-gradient(160deg, #C9A07E, #8B5E3C)",
        transform: "rotate(20deg)",
        boxShadow: "-6px -10px 24px rgba(0,0,0,0.4)",
      }}/>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCREEN: SCAN RESULT — toggle Animation / Résumé
// Animation = 3D album opening + flipping pages to slot
// Résumé = textual quick locator
// ──────────────────────────────────────────────────────────────
function ScreenScanResult({ defaultMode = "animation" }) {
  const [view, setView] = useS2(defaultMode);
  const card = window.FMP_DATA.FRANCE.cards.find(c => c.n === 17); // Mbappé
  return (
    <div style={{ minHeight: "100%", background: "#0B0E1A", color: "#F4EFE3", paddingBottom: 110, position: "relative" }}>
      {/* top bar */}
      <div style={{ paddingTop: 56, padding: "56px 18px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <CloseBtn />
        <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "#FBC531" }}>● SCAN RÉUSSI · 0.42S</div>
        <div style={{ width: 36 }}/>
      </div>

      {/* result hero */}
      <div style={{ padding: "10px 18px 6px" }}>
        <div className="t-mono" style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.12em" }}>CARTE IDENTIFIÉE</div>
        <div className="t-display" style={{ fontSize: 30, lineHeight: 1, marginTop: 4 }}>
          KYLIAN <span style={{ color: "#FF3D2E" }}>MBAPPÉ</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <FlagBar flag={["#0055A4","#FFFFFF","#EF4135"]} height={10} />
          <span className="t-mono" style={{ fontSize: 9, letterSpacing: "0.08em", opacity: 0.7 }}>FRA · #FRA17 · ATTAQUANT</span>
        </div>
      </div>

      {/* toggle */}
      <div style={{ margin: "14px 18px 0", padding: 4, background: "rgba(255,255,255,0.06)", borderRadius: 22, display: "flex" }}>
        {[
          { id: "animation", label: "ANIMATION 3D", icon: "▶" },
          { id: "summary",   label: "RÉSUMÉ RAPIDE", icon: "≡" },
        ].map(t => (
          <div key={t.id} onClick={() => setView(t.id)} className="t-display" style={{
            flex: 1, padding: "9px 10px", textAlign: "center",
            background: view === t.id ? "#FBC531" : "transparent",
            color: view === t.id ? "#0B0E1A" : "rgba(244,239,227,0.6)",
            borderRadius: 18, fontSize: 12, letterSpacing: "0.06em",
          }}>{t.label}</div>
        ))}
      </div>

      {/* content area */}
      <div style={{ padding: "16px 18px 0" }}>
        {view === "animation"
          ? <AlbumFlipAnimation pageNumber={86} slotIndex={4} />
          : <ScanSummary card={card} />}
      </div>

      {/* CTA */}
      <div style={{ position: "absolute", left: 18, right: 18, bottom: 22, display: "flex", gap: 8 }}>
        <FmpButton kind="paper" size="md" style={{ flex: 1, justifyContent: "center" }}>NOUVEAU SCAN</FmpButton>
        <FmpButton kind="fire" size="md" style={{ flex: 1.4, justifyContent: "center" }}>COLLER ✓</FmpButton>
      </div>
    </div>
  );
}

// ── 3D album flipping animation (CSS keyframes, looping)
function AlbumFlipAnimation({ pageNumber, slotIndex }) {
  return (
    <div style={{
      position: "relative", aspectRatio: "1/1", borderRadius: 16, overflow: "hidden",
      background: "radial-gradient(120% 80% at 50% 100%, #1A2540, #0B0E1A 70%)",
      perspective: 1200,
    }}>
      <div className="halftone" style={{ position: "absolute", inset: 0, color: "rgba(251,197,49,0.06)" }}/>
      {/* album base */}
      <div style={{
        position: "absolute", left: "16%", right: "16%", top: "18%", bottom: "12%",
        transformStyle: "preserve-3d",
        transform: "rotateX(28deg) rotateY(-8deg)",
      }}>
        {/* spine */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 6,
          background: "linear-gradient(110deg, #14182A 0%, #0B0E1A 100%)",
          boxShadow: "0 30px 60px -10px rgba(0,0,0,0.6)",
        }}/>
        {/* right static page (target) */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "50%",
          background: "#F4EFE3", borderRadius: "0 6px 6px 0",
          padding: 6, boxSizing: "border-box",
        }}>
          <PageMini highlight={slotIndex} />
        </div>
        {/* left flipping page (animated) */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "50%",
          background: "#EAE2D0", borderRadius: "6px 0 0 6px",
          transformOrigin: "right center",
          transformStyle: "preserve-3d",
          animation: "pageOpen 3s cubic-bezier(.6,.2,.4,1) infinite alternate",
          padding: 6, boxSizing: "border-box",
        }}>
          <PageMini muted />
        </div>
        {/* page number tag */}
        <div className="t-mono" style={{
          position: "absolute", right: -54, top: -10,
          background: "#FBC531", color: "#0B0E1A",
          fontSize: 10, padding: "4px 7px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.06em",
          transform: "rotate(8deg)",
        }}>PAGE {pageNumber}</div>
      </div>

      {/* footer caption */}
      <div style={{
        position: "absolute", left: 14, right: 14, bottom: 12, textAlign: "center",
      }}>
        <div className="t-display" style={{ fontSize: 16, color: "#F4EFE3" }}>
          PAGE <span style={{ color: "#FBC531" }}>{pageNumber}</span> · CASE <span style={{ color: "#FBC531" }}>{slotIndex + 1}</span>
        </div>
        <div className="t-mono" style={{ fontSize: 9, opacity: 0.55, marginTop: 3 }}>section · france</div>
      </div>
    </div>
  );
}

function PageMini({ highlight = -1, muted = false }) {
  return (
    <div style={{
      width: "100%", height: "100%", borderRadius: 3,
      background: muted ? "transparent" : "#F4EFE3",
      display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(5, 1fr)",
      gap: 3, padding: 4, boxSizing: "border-box",
    }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{
          background: i === highlight ? "#FF3D2E" : "rgba(11,14,26,0.08)",
          borderRadius: 2, position: "relative",
          boxShadow: i === highlight ? "0 0 0 2px #FBC531, 0 0 14px #FF3D2E" : "none",
          animation: i === highlight ? "bob 1.4s ease-in-out infinite" : "none",
        }}>
          {i === highlight && (
            <div style={{
              position: "absolute", inset: -4, border: "2px dashed #FBC531",
              borderRadius: 4, animation: "pulseRing 1.8s ease-out infinite",
            }}/>
          )}
        </div>
      ))}
    </div>
  );
}

// ── text summary view
function ScanSummary({ card }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* big locator card */}
      <div style={{
        background: "linear-gradient(135deg, #FF3D2E, #C0301F)",
        color: "#F4EFE3", borderRadius: 14, padding: 16,
        position: "relative", overflow: "hidden",
      }}>
        <div className="halftone halftone-lg" style={{
          position: "absolute", inset: 0, color: "rgba(251,197,49,0.18)",
        }}/>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
          <div>
            <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.12em", opacity: 0.85 }}>EMPLACEMENT</div>
            <div className="t-display" style={{ fontSize: 56, lineHeight: 0.9, marginTop: 4 }}>
              P.<span style={{ color: "#FBC531" }}>86</span>
            </div>
            <div className="t-mono" style={{ fontSize: 11, marginTop: 6, letterSpacing: "0.08em" }}>
              CASE 5 · LIGNE 3 · COL. 1
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <FlagBar flag={["#0055A4","#FFFFFF","#EF4135"]} height={14}/>
            <div className="t-display" style={{ fontSize: 28, lineHeight: 1, color: "#FBC531" }}>FRA</div>
          </div>
        </div>
      </div>

      {/* details rows */}
      {[
        ["Section",    "France · Page 86–87"],
        ["Numéro",     "FRA17 (sticker rouge)"],
        ["Voisins",    "Tchouaméni · Camavinga · Rabiot"],
        ["Statut",     "DÉJÀ COLLÉE — tu en as 2"],
        ["Rareté",     "★★★★☆  — Légende"],
      ].map(([k, v]) => (
        <div key={k} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "11px 14px",
          background: "rgba(255,255,255,0.05)", borderRadius: 10,
        }}>
          <span className="t-mono" style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.1em" }}>{k.toUpperCase()}</span>
          <span className="t-body" style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  ScreenScan, ScreenScanResult, AlbumFlipAnimation, ScanSummary, CloseBtn,
});
