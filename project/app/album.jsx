/* global React, FmpButton, FmpProgress, FlagBar, StickerCard, FmpTabBar, SectionHeader, BookIcon, CameraIcon, ScanIcon, FMP_DATA */

const { useState: useS3 } = React;

// ──────────────────────────────────────────────────────────────
// SCREEN: ALBUM TEAM — France grid (20 cards, missing/owned)
// ──────────────────────────────────────────────────────────────
function ScreenAlbum() {
  const data = window.FMP_DATA;
  const owned = data.OWNED;
  const dupes = data.DUPES;
  const wish = data.WISH;
  const cards = data.FRANCE.cards;
  const ownedCount = cards.filter(c => owned.has(c.n)).length;
  const pct = Math.round((ownedCount / cards.length) * 100);

  return (
    <div style={{ minHeight: "100%", background: "#F4EFE3", paddingBottom: 100 }}>
      {/* header — flag stripe */}
      <div style={{
        position: "relative", paddingTop: 48, paddingBottom: 18,
        background: "linear-gradient(180deg, #0055A4 0%, #0055A4 33%, #F4EFE3 33%, #F4EFE3 66%, #EF4135 66%)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(11,14,26,0.55) 0%, rgba(11,14,26,0) 70%)",
        }}/>
        <div style={{ padding: "10px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <BackBtn />
          <div className="t-mono" style={{
            fontSize: 9, letterSpacing: "0.14em", color: "#F4EFE3",
            background: "rgba(11,14,26,0.55)", padding: "5px 9px", borderRadius: 12,
          }}>SECTION 06 / 48</div>
          <div style={{ width: 36 }}/>
        </div>

        <div style={{ padding: "18px 16px 0", color: "#0B0E1A" }}>
          <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.14em", opacity: 0.7 }}>GROUPE D · UEFA</div>
          <div className="t-display" style={{ fontSize: 56, lineHeight: 0.85, marginTop: 4 }}>
            FRANCE
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6, fontSize: 11 }}>
            <span className="t-mono" style={{ letterSpacing: "0.1em" }}>LES BLEUS</span>
            <span className="t-mono" style={{ letterSpacing: "0.1em", color: "#FF3D2E" }}>★ 2x CHAMPION</span>
          </div>
        </div>
      </div>

      {/* progress strip */}
      <div style={{
        margin: "-14px 14px 0", padding: 12, background: "#fff", borderRadius: 12,
        boxShadow: "0 10px 26px -10px rgba(11,14,26,0.2)", position: "relative", zIndex: 2,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div>
            <span className="t-display" style={{ fontSize: 26, color: "#0B0E1A", lineHeight: 1 }}>{ownedCount}</span>
            <span className="t-mono" style={{ fontSize: 12, opacity: 0.4, marginLeft: 4 }}>/ {cards.length}</span>
            <span className="t-mono" style={{ fontSize: 10, marginLeft: 10, color: "#FF3D2E", letterSpacing: "0.08em" }}>
              {pct}% · {cards.length - ownedCount} À CHASSER
            </span>
          </div>
          <div className="t-mono" style={{ fontSize: 10, color: "rgba(11,14,26,0.5)", letterSpacing: "0.08em" }}>
            P. 86–87
          </div>
        </div>
        <FmpProgress pct={pct} color="#FF3D2E" height={8} />
        {/* mini-stats */}
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          {[
            ["GK", "2/2", "#FBC531"],
            ["DEF", "5/7", "#2D6BFF"],
            ["MIL", "3/5", "#0F5132"],
            ["ATT", "3/4", "#FF3D2E"],
          ].map(([k, v, c]) => (
            <div key={k} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 3, background: c, borderRadius: 2, marginBottom: 5 }}/>
              <div className="t-display" style={{ fontSize: 14 }}>{v}</div>
              <div className="t-mono" style={{ fontSize: 8, opacity: 0.5, letterSpacing: "0.1em" }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* filter chips */}
      <div style={{ padding: "14px 14px 0", display: "flex", gap: 6, overflowX: "auto" }}>
        {["TOUTES (20)", "MANQUANTES (7)", "DOUBLONS (3)", "WISHLIST (3)"].map((c, i) => (
          <div key={c} className="t-mono" style={{
            padding: "6px 11px", borderRadius: 14, fontSize: 9, letterSpacing: "0.08em",
            background: i === 0 ? "#0B0E1A" : "rgba(11,14,26,0.06)",
            color: i === 0 ? "#FBC531" : "rgba(11,14,26,0.7)",
            fontWeight: 700, whiteSpace: "nowrap",
          }}>{c}</div>
        ))}
      </div>

      {/* card grid */}
      <div style={{
        padding: "14px 14px 0",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10,
      }}>
        {cards.map(card => {
          const has = owned.has(card.n);
          const dupe = dupes[card.n] || 0;
          return (
            <div key={card.n} style={{ display: "flex", justifyContent: "center" }}>
              <StickerCard
                card={card}
                state={has ? "owned" : "missing"}
                dupeCount={dupe}
              />
            </div>
          );
        })}
      </div>

      {/* page reference */}
      <div style={{ padding: "16px 14px 0", textAlign: "center" }}>
        <div className="perforation" style={{ height: 8, color: "rgba(11,14,26,0.25)", margin: "0 4px" }}/>
        <div className="t-mono" style={{ fontSize: 9, opacity: 0.5, marginTop: 6, letterSpacing: "0.12em" }}>
          ◀  PAGE 85 · ESPAGNE   |   PAGE 88 · ALLEMAGNE  ▶
        </div>
      </div>

      <FmpTabBar active="home" />
    </div>
  );
}

function BackBtn() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 18, background: "rgba(11,14,26,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", color: "#F4EFE3",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCREEN: TEAMS LIST — alt entry to album, all 12 mocked teams
// ──────────────────────────────────────────────────────────────
function ScreenTeams() {
  const teams = window.FMP_DATA.TEAMS;
  return (
    <div style={{ minHeight: "100%", background: "#F4EFE3", paddingBottom: 100 }}>
      <div style={{ paddingTop: 48, padding: "48px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <BackBtn />
          <div className="t-display" style={{ fontSize: 14, letterSpacing: "0.04em" }}>MON ALBUM</div>
          <div style={{ width: 36 }}/>
        </div>
        <div className="t-display" style={{ fontSize: 38, lineHeight: 0.95, marginTop: 22 }}>
          48 ÉQUIPES.<br/>
          <span style={{ color: "#FF3D2E" }}>720 STICKERS.</span>
        </div>
      </div>

      <div style={{ padding: "20px 14px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {teams.map(t => {
          const pct = Math.round((t.owned / t.total) * 100);
          return (
            <div key={t.code} style={{
              background: "#fff", borderRadius: 12, padding: 12,
              boxShadow: "0 6px 16px -10px rgba(11,14,26,0.2)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <FlagBar flag={t.flag} height={14} />
              </div>
              <div className="t-display" style={{ fontSize: 22, lineHeight: 1, color: "#0B0E1A" }}>{t.name}</div>
              <div className="t-mono" style={{ fontSize: 9, marginTop: 2, opacity: 0.55, letterSpacing: "0.08em" }}>{t.code} · 20 stickers</div>
              <div style={{ marginTop: 10 }}>
                <FmpProgress pct={pct} height={6} color={pct === 100 ? "#0F5132" : "#FF3D2E"} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span className="t-mono" style={{ fontSize: 9, opacity: 0.6 }}>{t.owned}/{t.total}</span>
                  <span className="t-display" style={{ fontSize: 14, color: pct === 100 ? "#0F5132" : "#0B0E1A" }}>{pct}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCREEN: CARD DETAIL — flip card, stats, doublon controls
// ──────────────────────────────────────────────────────────────
function ScreenCardDetail() {
  const card = window.FMP_DATA.FRANCE.cards.find(c => c.n === 17);
  const [flipped, setFlipped] = useS3(false);
  return (
    <div style={{
      minHeight: "100%",
      background: "linear-gradient(180deg, #0B0E1A 0%, #14182A 100%)",
      color: "#F4EFE3", paddingBottom: 110, position: "relative",
    }}>
      <div className="halftone halftone-lg" style={{
        position: "absolute", inset: 0, color: "rgba(251,197,49,0.05)", pointerEvents: "none",
      }}/>

      <div style={{ paddingTop: 56, padding: "56px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        <BackBtn />
        <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.12em", color: "#FBC531" }}>FRA17 · ★★★★☆</div>
        <div style={{
          width: 36, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F4EFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/>
          </svg>
        </div>
      </div>

      {/* flip card */}
      <div style={{ padding: "20px 18px 0", display: "flex", justifyContent: "center", position: "relative" }}>
        <div className={"flip-card " + (flipped ? "is-flipped" : "")} onClick={() => setFlipped(!flipped)} style={{
          width: 220, height: 304, position: "relative",
          filter: "drop-shadow(0 24px 50px rgba(11,14,26,0.6))",
        }}>
          <div className="flip-inner">
            {/* front — sticker */}
            <div className="flip-face" style={{ borderRadius: 12, overflow: "hidden", background: "#fff" }}>
              <div style={{
                position: "absolute", left: 0, right: 0, top: 0, height: "70%",
                background: "linear-gradient(160deg, #FF3D2E, #C0301F)",
                overflow: "hidden",
              }}>
                {/* halftone */}
                <div className="halftone halftone-lg" style={{ position: "absolute", inset: 0, color: "rgba(251,197,49,0.18)" }}/>
                {/* shine sweep */}
                <div style={{
                  position: "absolute", top: 0, bottom: 0, width: "40%",
                  background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                  animation: "shineSweep 3.4s ease-in-out infinite",
                }}/>
                <div className="t-display" style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 140, color: "#fff", lineHeight: 1,
                  textShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}>KM</div>
                <div className="t-mono" style={{
                  position: "absolute", top: 10, left: 10, color: "#0B0E1A",
                  background: "#FBC531", fontSize: 11, padding: "3px 7px", borderRadius: 4, fontWeight: 700,
                }}>FRA17</div>
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: "rgba(11,14,26,0.85)", color: "#FBC531", fontSize: 10,
                  padding: "3px 7px", borderRadius: 4, letterSpacing: "0.1em",
                  fontFamily: "var(--mono)", fontWeight: 700,
                }}>★ LÉGENDE</div>
                <div style={{
                  position: "absolute", left: 10, bottom: 10,
                  width: 24, height: 24, background: "#FBC531",
                  clipPath: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                }}/>
                <div className="t-display" style={{
                  position: "absolute", right: 10, bottom: 6, fontSize: 56, color: "#fff", lineHeight: 1,
                }}>10</div>
              </div>
              <div style={{
                position: "absolute", left: 0, right: 0, bottom: 0, height: "30%",
                background: "#F4EFE3", borderTop: "4px solid #FBC531",
                padding: "12px 14px", boxSizing: "border-box",
              }}>
                <div className="t-mono" style={{ fontSize: 9, color: "rgba(11,14,26,0.5)", letterSpacing: "0.1em" }}>FRANCE · ATT</div>
                <div className="t-display" style={{ fontSize: 24, color: "#0B0E1A", lineHeight: 0.95, marginTop: 4 }}>K. MBAPPÉ</div>
                <div className="t-mono" style={{ fontSize: 9, color: "rgba(11,14,26,0.5)", marginTop: 4 }}>PARIS · 27 ANS · 88 SÉL.</div>
              </div>
            </div>
            {/* back — holo */}
            <div className="flip-face back holo-shine" style={{ borderRadius: 12, overflow: "hidden" }}>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                color: "#fff", padding: 24, textAlign: "center",
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}>
                <div className="t-display" style={{ fontSize: 18, letterSpacing: "0.06em" }}>STATS 25/26</div>
                <div className="t-display" style={{ fontSize: 78, lineHeight: 0.9, margin: "8px 0" }}>34</div>
                <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.1em" }}>BUTS EN CLUB</div>
                <div className="perforation" style={{
                  width: "60%", height: 6, color: "rgba(255,255,255,0.5)", margin: "16px 0",
                }}/>
                <div className="t-mono" style={{ fontSize: 11 }}>12 PASSES · 41 MATCHS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="t-mono" style={{ textAlign: "center", fontSize: 9, opacity: 0.5, marginTop: 10, letterSpacing: "0.12em" }}>
        TAP POUR RETOURNER ↻
      </div>

      {/* stats grid */}
      <div style={{ padding: "20px 18px 0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          ["88", "SÉL."],
          ["52", "BUTS"],
          ["27", "ANS"],
          ["★★★★", "RARETÉ"],
          ["×2", "DOUBLONS"],
          ["3.2k", "TROUVÉE PAR"],
        ].map(([v, k]) => (
          <div key={k} style={{
            background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 8px",
            textAlign: "center",
          }}>
            <div className="t-display" style={{ fontSize: 22, color: "#FBC531", lineHeight: 1 }}>{v}</div>
            <div className="t-mono" style={{ fontSize: 8, opacity: 0.55, marginTop: 4, letterSpacing: "0.08em" }}>{k}</div>
          </div>
        ))}
      </div>

      {/* actions */}
      <div style={{ padding: "20px 18px 0", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <FmpButton kind="fire" size="md" style={{ flex: 1, justifyContent: "center" }} icon={<ScanIcon size={14} color="#fff" />}>
            LOCALISER ▶
          </FmpButton>
          <FmpButton kind="sun" size="md" style={{ flex: 1, justifyContent: "center" }}>
            ÉCHANGER ↔
          </FmpButton>
        </div>
        <div style={{
          padding: "12px 14px", background: "rgba(255,255,255,0.05)", borderRadius: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div className="t-display" style={{ fontSize: 14 }}>2 DOUBLONS</div>
            <div className="t-mono" style={{ fontSize: 9, opacity: 0.6, marginTop: 2 }}>Marquer dispo pour échange</div>
          </div>
          <div style={{
            width: 44, height: 26, borderRadius: 14,
            background: "#FBC531", padding: 2,
            display: "flex", alignItems: "center", justifyContent: "flex-end",
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, background: "#0B0E1A" }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCREEN: WISHLIST + DOUBLONS
// ──────────────────────────────────────────────────────────────
function ScreenWishlist() {
  const cards = window.FMP_DATA.FRANCE.cards;
  const wishCards = cards.filter(c => window.FMP_DATA.WISH.has(c.n));
  const dupeEntries = Object.entries(window.FMP_DATA.DUPES).map(([n, count]) => ({
    card: cards.find(c => c.n === Number(n)), count,
  }));

  return (
    <div style={{ minHeight: "100%", background: "#F4EFE3", paddingBottom: 100 }}>
      {/* header */}
      <div style={{
        position: "relative", paddingTop: 50, padding: "50px 18px 24px",
        background: "#FBC531", color: "#0B0E1A", overflow: "hidden",
      }}>
        <div className="halftone halftone-lg" style={{
          position: "absolute", inset: 0, color: "rgba(11,14,26,0.07)",
        }}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <BackBtn />
          <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.14em" }}>CHASSE</div>
          <div style={{ width: 36 }}/>
        </div>
        <div style={{ marginTop: 16, position: "relative" }}>
          <div className="t-display" style={{ fontSize: 40, lineHeight: 0.92 }}>
            CARTES À<br/>CHASSER
          </div>
          <div className="t-mono" style={{ fontSize: 11, marginTop: 6, letterSpacing: "0.1em" }}>
            ★ 9 EN WISHLIST · ↔ 17 DOUBLONS DISPO
          </div>
        </div>
      </div>

      {/* segment */}
      <div style={{ margin: "14px 14px 0", padding: 4, background: "rgba(11,14,26,0.06)", borderRadius: 22, display: "flex" }}>
        <div className="t-display" style={{
          flex: 1, padding: "9px 10px", textAlign: "center",
          background: "#0B0E1A", color: "#FBC531", borderRadius: 18, fontSize: 12, letterSpacing: "0.06em",
        }}>★ WISHLIST</div>
        <div className="t-display" style={{
          flex: 1, padding: "9px 10px", textAlign: "center",
          color: "rgba(11,14,26,0.55)", fontSize: 12, letterSpacing: "0.06em",
        }}>↔ DOUBLONS</div>
      </div>

      {/* wishlist cards */}
      <div style={{ padding: "16px 14px 0", display: "flex", flexDirection: "column", gap: 8 }}>
        {wishCards.map(c => (
          <div key={c.n} style={{
            background: "#fff", borderRadius: 12, padding: 10,
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 4px 14px -8px rgba(11,14,26,0.2)",
          }}>
            <StickerCard card={c} state="missing" small />
            <div style={{ flex: 1 }}>
              <div className="t-display" style={{ fontSize: 16, color: "#0B0E1A" }}>
                {(c.name || "").toUpperCase()}
              </div>
              <div className="t-mono" style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.06em", marginTop: 2 }}>
                FRA{String(c.n).padStart(2,"0")} · {c.role} · #{c.num}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
                <span className="t-mono" style={{
                  background: "#0F5132", color: "#F4EFE3", fontSize: 9,
                  padding: "3px 6px", borderRadius: 3, letterSpacing: "0.06em",
                }}>4 ÉCHANGES POSSIBLES</span>
              </div>
            </div>
            <div style={{
              width: 38, height: 38, borderRadius: 19, background: "#FF3D2E",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* doublons section heading */}
      <div style={{ padding: "20px 14px 8px" }}>
        <SectionHeader title="MES DOUBLONS À ÉCHANGER" right="GÉRER" />
      </div>

      <div style={{ padding: "0 14px", display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {dupeEntries.map(({ card, count }) => (
          <div key={card.n} style={{ position: "relative" }}>
            <StickerCard card={card} state="owned" dupeCount={count} small />
          </div>
        ))}
      </div>

      <FmpTabBar active="wish" />
    </div>
  );
}

Object.assign(window, {
  ScreenAlbum, ScreenTeams, ScreenCardDetail, ScreenWishlist, BackBtn,
});
