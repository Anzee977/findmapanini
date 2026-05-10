/* global React */

// Shared visual primitives for FindMyPanini
// All components mounted to window for cross-script access.

const { useState, useEffect, useRef, useMemo } = React;

// ──────────────────────────────────────────────────────────────
// Initials avatar — used as portrait placeholder (no real photos)
// Shows player initials over a tilted football-field gradient.
// ──────────────────────────────────────────────────────────────
function PlayerPortrait({ name, role = "FW", num, captain, star, size = 1 }) {
  const initials = (name || "")
    .split(" ").filter(Boolean).map(w => w[0]).slice(0, 2).join("");
  const roleColor = window.FMP_DATA.ROLE_COLOR[role] || "#0F5132";
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(120% 80% at 50% 110%, ${roleColor} 0%, ${roleColor}cc 38%, #0B0E1A 100%)`,
      overflow: "hidden",
    }}>
      {/* halftone noise */}
      <div className="halftone halftone-lg" style={{
        position: "absolute", inset: 0, color: "rgba(255,255,255,0.10)",
        mixBlendMode: "screen",
      }} />
      {/* big initials silhouette */}
      <div className="t-display" style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 96 * size, color: "rgba(255,255,255,0.95)",
        textShadow: "0 4px 24px rgba(0,0,0,0.35)",
        letterSpacing: "0.04em",
      }}>
        {initials}
      </div>
      {/* shoulder shadow */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "30%",
        background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))",
      }} />
      {/* number */}
      {num !== undefined && (
        <div className="t-display" style={{
          position: "absolute", right: 8 * size, bottom: 6 * size,
          fontSize: 28 * size, color: "#fff", lineHeight: 1,
          opacity: 0.92,
        }}>{num}</div>
      )}
      {captain && (
        <div className="t-mono" style={{
          position: "absolute", left: 6 * size, top: 6 * size,
          background: "#FBC531", color: "#0B0E1A",
          fontSize: 9 * size, padding: "2px 5px", borderRadius: 3,
          fontWeight: 700, letterSpacing: "0.1em",
        }}>C</div>
      )}
      {star && (
        <div style={{
          position: "absolute", left: 6 * size, bottom: 8 * size,
          width: 14 * size, height: 14 * size,
          background: "#FBC531",
          clipPath: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
        }} />
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// StickerCard — the album card.
// states: "owned" | "missing" | "dupe"
// variants: "player" | "badge" | "team"
// ──────────────────────────────────────────────────────────────
function StickerCard({ card, state = "owned", small = false, onClick, dupeCount = 0, sparkle }) {
  const W = small ? 86 : 110;
  const H = small ? 118 : 150;
  const role = card.role || "FW";
  const roleColor = window.FMP_DATA.ROLE_COLOR[role] || "#0F5132";
  const isMissing = state === "missing";

  return (
    <div
      onClick={onClick}
      style={{
        width: W, height: H, position: "relative", cursor: onClick ? "pointer" : "default",
        borderRadius: 8,
        background: "#fff",
        boxShadow: isMissing
          ? "inset 0 0 0 1.5px rgba(11,14,26,0.18)"
          : "0 1px 0 rgba(0,0,0,0.04), 0 8px 16px -8px rgba(0,0,0,0.25), inset 0 0 0 0.5px rgba(11,14,26,0.18)",
        overflow: "hidden",
        transform: sparkle ? "translateY(-2px)" : "none",
        transition: "transform .25s",
      }}
    >
      {/* card index ribbon */}
      <div className="t-mono" style={{
        position: "absolute", top: 5, left: 5, zIndex: 4,
        background: isMissing ? "rgba(11,14,26,0.06)" : "#0B0E1A",
        color: isMissing ? "rgba(11,14,26,0.45)" : "#F4EFE3",
        fontSize: 8, padding: "2px 5px", borderRadius: 3, fontWeight: 700,
      }}>FRA{String(card.n).padStart(2, "0")}</div>

      {dupeCount > 1 && (
        <div className="t-mono" style={{
          position: "absolute", top: 5, right: 5, zIndex: 4,
          background: "#FBC531", color: "#0B0E1A",
          fontSize: 8, padding: "2px 5px", borderRadius: 3, fontWeight: 700,
        }}>×{dupeCount}</div>
      )}

      {/* portrait area */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: small ? 78 : 100,
        background: "#EAE2D0",
      }}>
        {isMissing ? (
          <MissingGhost role={role} type={card.type} />
        ) : card.type === "badge" ? (
          <BadgeArt />
        ) : card.type === "team" ? (
          <TeamArt />
        ) : (
          <PlayerPortrait
            name={card.name} role={role} num={card.num}
            captain={card.captain} star={card.star}
            size={small ? 0.7 : 1}
          />
        )}
        {/* shine when owned */}
        {!isMissing && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 45%, transparent 60%)",
          }} />
        )}
      </div>

      {/* footer strip */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: small ? 40 : 50,
        padding: "5px 7px", boxSizing: "border-box",
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 1,
        borderTop: `2px solid ${isMissing ? "rgba(11,14,26,0.12)" : roleColor}`,
        background: isMissing ? "rgba(244,239,227,0.5)" : "#F4EFE3",
      }}>
        <div className="t-display" style={{
          fontSize: small ? 11 : 13, color: isMissing ? "rgba(11,14,26,0.35)" : "#0B0E1A",
          letterSpacing: "0.02em", lineHeight: 1.05,
          textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden",
        }}>
          {card.type === "badge" ? "ÉCUSSON" :
           card.type === "team" ? "ÉQUIPE FRANCE" :
           (card.name || "").toUpperCase()}
        </div>
        <div className="t-mono" style={{
          fontSize: small ? 7 : 8, color: isMissing ? "rgba(11,14,26,0.3)" : "rgba(11,14,26,0.55)",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {card.type === "player" ? `${role} · ${card.caps} sél.` : card.sub || "FRANCE 2026"}
        </div>
      </div>

      {/* dotted outline for missing */}
      {isMissing && (
        <div style={{
          position: "absolute", inset: 4, borderRadius: 6,
          border: "1.5px dashed rgba(11,14,26,0.22)",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

// silhouette ghost for missing cards
function MissingGhost({ role, type }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #EAE2D0, #F4EFE3)" }}>
      <div className="halftone" style={{
        position: "absolute", inset: 0, color: "rgba(11,14,26,0.06)",
      }} />
      {type === "player" && (
        <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <filter id="blr"><feGaussianBlur stdDeviation="1.2" /></filter>
          </defs>
          <g fill="rgba(11,14,26,0.18)" filter="url(#blr)">
            <circle cx="50" cy="40" r="14" />
            <path d="M22 100 C22 78, 38 66, 50 66 C62 66, 78 78, 78 100 Z" />
          </g>
        </svg>
      )}
      {type === "badge" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 36, height: 44, background: "rgba(11,14,26,0.16)",
            clipPath: "polygon(50% 0, 100% 18%, 100% 70%, 50% 100%, 0 70%, 0 18%)",
            filter: "blur(1px)",
          }} />
        </div>
      )}
      {type === "team" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              position: "absolute", width: 8, height: 8, borderRadius: 8,
              background: "rgba(11,14,26,0.16)", filter: "blur(1px)",
              left: `${15 + i * 17}%`, top: `${50 + (i % 2) * 8}%`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

function BadgeArt() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(180deg, #0055A4 0%, #0055A4 33%, #FFFFFF 33%, #FFFFFF 66%, #EF4135 66%)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div className="t-display" style={{
        fontSize: 48, color: "#FBC531",
        textShadow: "2px 2px 0 #0B0E1A",
      }}>FFF</div>
    </div>
  );
}

function TeamArt() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(160deg, #0F5132, #1A7A4D)",
      overflow: "hidden",
    }}>
      <div className="stripes-fine" style={{
        position: "absolute", inset: 0, color: "rgba(255,255,255,0.08)",
      }} />
      {/* row of player silhouettes */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        display: "flex", justifyContent: "space-around", alignItems: "flex-end",
        padding: "0 6px",
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            width: 9, height: 14 + (i % 3) * 2, marginBottom: 6,
            background: "rgba(11,14,26,0.5)", borderRadius: "4px 4px 0 0",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", left: "50%", top: -6, transform: "translateX(-50%)",
              width: 6, height: 6, borderRadius: 6, background: "rgba(11,14,26,0.5)",
            }} />
          </div>
        ))}
      </div>
      <div className="t-display" style={{
        position: "absolute", top: 8, left: 8,
        fontSize: 18, color: "#FBC531", lineHeight: 1,
      }}>FRA<br/>2026</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Logo lockup
// ──────────────────────────────────────────────────────────────
function FmpLogo({ size = 1, dark = false }) {
  const ink = dark ? "#F4EFE3" : "#0B0E1A";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * size }}>
      <div style={{
        width: 22 * size, height: 22 * size, position: "relative",
        background: "#FF3D2E", borderRadius: 4 * size,
      }}>
        <div style={{
          position: "absolute", inset: "20%", borderRadius: "50%",
          border: `${2 * size}px solid #F4EFE3`,
        }} />
        <div style={{
          position: "absolute", left: "50%", top: "50%", width: 3 * size, height: 3 * size,
          background: "#F4EFE3", borderRadius: "50%", transform: "translate(-50%,-50%)",
        }} />
      </div>
      <div className="t-display" style={{ fontSize: 17 * size, color: ink, letterSpacing: "0.02em", lineHeight: 1 }}>
        FIND<span style={{ color: "#FF3D2E" }}>MY</span>PANINI
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Buttons / pills
// ──────────────────────────────────────────────────────────────
function FmpButton({ children, kind = "fire", size = "md", icon, onClick, style = {} }) {
  const KINDS = {
    fire: { bg: "#FF3D2E", fg: "#F4EFE3" },
    sun:  { bg: "#FBC531", fg: "#0B0E1A" },
    ink:  { bg: "#0B0E1A", fg: "#F4EFE3" },
    paper:{ bg: "#F4EFE3", fg: "#0B0E1A" },
    sky:  { bg: "#2D6BFF", fg: "#F4EFE3" },
    turf: { bg: "#0F5132", fg: "#F4EFE3" },
  }[kind];
  const SIZES = {
    sm: { h: 32, px: 12, fs: 12 },
    md: { h: 42, px: 16, fs: 14 },
    lg: { h: 52, px: 22, fs: 16 },
  }[size];
  return (
    <button onClick={onClick} className="t-display" style={{
      height: SIZES.h, padding: `0 ${SIZES.px}px`,
      background: KINDS.bg, color: KINDS.fg,
      border: 0, borderRadius: SIZES.h / 2,
      letterSpacing: "0.06em", fontSize: SIZES.fs,
      display: "inline-flex", alignItems: "center", gap: 8,
      cursor: "pointer", boxShadow: "0 4px 14px -6px rgba(0,0,0,0.4)",
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// progress bar + halftone fill
function FmpProgress({ pct, label, sub, color = "#FF3D2E", height = 10 }) {
  return (
    <div>
      {(label || sub) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          {label && <span className="t-mono" style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>}
          {sub && <span className="t-mono" style={{ fontSize: 10, opacity: 0.6 }}>{sub}</span>}
        </div>
      )}
      <div style={{
        height, borderRadius: height,
        background: "rgba(11,14,26,0.08)", overflow: "hidden",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, width: `${pct}%`,
          background: color, borderRadius: height,
        }}>
          <div className="stripes-fine" style={{
            position: "absolute", inset: 0, color: "rgba(255,255,255,0.25)",
            mixBlendMode: "screen",
          }} />
        </div>
      </div>
    </div>
  );
}

// flag bar — 3 stripes
function FlagBar({ flag, height = 14, vertical = false }) {
  return (
    <div style={{
      display: "flex", flexDirection: vertical ? "column" : "row",
      width: vertical ? height : "100%", height: vertical ? "100%" : height,
      borderRadius: 2, overflow: "hidden",
    }}>
      {flag.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
    </div>
  );
}

Object.assign(window, {
  PlayerPortrait, StickerCard, MissingGhost, BadgeArt, TeamArt,
  FmpLogo, FmpButton, FmpProgress, FlagBar,
});
