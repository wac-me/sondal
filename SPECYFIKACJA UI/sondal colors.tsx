export default function ColorPalettes() {
  const palettes = [
    {
      id: "A",
      name: "Obecny — Elektryczny niebieski",
      accent: "#4F8EF7",
      accentName: "#4F8EF7",
      now: "#F05252",
      nowName: "#F05252 — Czysta czerwień",
      desc: "Punkt odniesienia. Chłodny, korporacyjny, zaufanie.",
    },
    {
      id: "B",
      name: "Kobalt + Czerwień sygnałowa",
      accent: "#3B7DD8",
      accentName: "#3B7DD8",
      now: "#E8373D",
      nowName: "#E8373D — Głęboka czerwień",
      desc: "Ciemniejszy niebieski, bardziej premium. Czerwień bardziej zdecydowana.",
    },
    {
      id: "C",
      name: "Indygo + Czerwono-pomarańczowy",
      accent: "#5B8AF0",
      accentName: "#5B8AF0",
      now: "#F04E2A",
      nowName: "#F04E2A — Red-Orange",
      desc: "Akcent z lekkim fioletowym ciepłem. NOW! bardziej energetyczny, blisko ognia.",
    },
    {
      id: "D",
      name: "Niebieski stalowy + Głęboka pomarańcz",
      accent: "#4A90D9",
      accentName: "#4A90D9",
      now: "#E8621A",
      nowName: "#E8621A — Głęboka pomarańcz",
      desc: "NOW! traci alarmowy charakter, zyskuje ciepło i energię. Ciekawy kontrast.",
    },
    {
      id: "E",
      name: "Royal Blue + Amber-Orange",
      accent: "#4F8EF7",
      accentName: "#4F8EF7",
      now: "#F97316",
      nowName: "#F97316 — Amber Orange",
      desc: "NOW! jak zachodzące słońce. Bardzo żywe, nowoczesne. Ryzykowne ale charakterne.",
    },
    {
      id: "F",
      name: "Zimny niebieski + Coral",
      accent: "#60A5FA",
      accentName: "#60A5FA",
      now: "#FF6B5B",
      nowName: "#FF6B5B — Coral",
      desc: "Akcent jaśniejszy, powietrzny. NOW! w kolorze coral — miększy ale widoczny.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{ background: "#13141A", minHeight: "100vh", padding: "28px 16px", fontFamily: "Inter, sans-serif" }}>
        <p style={{ color: "#4A5070", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Palety kolorystyczne — accent vs NOW!</p>

        {palettes.map(p => (
          <div key={p.id} style={{ background: "#1C1E26", border: `1px solid ${p.id === "A" ? "#2A2D3A" : "#2A2D3A"}`, borderRadius: 14, padding: "18px 16px", marginBottom: 12 }}>

            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ background: "#13141A", border: "1px solid #2A2D3A", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", color: p.accent, fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 12 }}>{p.id}</span>
                <span style={{ color: "#EEF0F6", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600 }}>{p.name}</span>
              </div>
              {p.id === "A" && <span style={{ color: "#4A5070", fontSize: 10, fontFamily: "Inter, sans-serif" }}>obecny</span>}
            </div>

            {/* Live preview — header mockup */}
            <div style={{ background: "#13141A", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              {/* Logo C variant */}
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <svg width="18" height="20" viewBox="0 0 32 36">
                  <circle cx="24" cy="6" r="3.5" fill={p.accent} />
                  <circle cx="16" cy="18" r="2.5" fill={p.accent} opacity="0.6" />
                  <circle cx="24" cy="30" r="3.5" fill={p.accent} />
                  <line x1="24" y1="6" x2="16" y2="18" stroke={p.accent} strokeWidth="1.5" opacity="0.5" />
                  <line x1="16" y1="18" x2="24" y2="30" stroke={p.accent} strokeWidth="1.5" opacity="0.5" />
                </svg>
                <div>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 17, color: "#EEF0F6", letterSpacing: "-0.3px" }}>
                    sondal<span style={{ color: p.accent, fontSize: 11, fontWeight: 500 }}>.top</span>
                  </span>
                </div>
              </div>

              {/* NOW! badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: `${p.now}18`, border: `1px solid ${p.now}40`, borderRadius: 20, padding: "4px 10px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.now, display: "inline-block", animation: "pulse 1.8s infinite" }} />
                <span style={{ color: p.now, fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>NOW!</span>
              </div>
            </div>

            {/* Swatch row */}
            <div style={{ display: "flex", gap: 10, alignItems: "stretch", marginBottom: 12 }}>
              {/* Accent swatch */}
              <div style={{ flex: 1 }}>
                <div style={{ height: 36, borderRadius: 8, background: p.accent, marginBottom: 5 }} />
                <p style={{ color: "#7E8599", fontSize: 10, fontFamily: "Inter, sans-serif" }}>Akcent</p>
                <p style={{ color: "#4A5070", fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{p.accentName}</p>
              </div>
              {/* Accent dim */}
              <div style={{ flex: 1 }}>
                <div style={{ height: 36, borderRadius: 8, background: `${p.accent}22`, border: `1px solid ${p.accent}44`, marginBottom: 5 }} />
                <p style={{ color: "#7E8599", fontSize: 10, fontFamily: "Inter, sans-serif" }}>Akcent dim</p>
                <p style={{ color: "#4A5070", fontSize: 9 }}>tła, karty</p>
              </div>
              {/* NOW color */}
              <div style={{ flex: 1 }}>
                <div style={{ height: 36, borderRadius: 8, background: p.now, marginBottom: 5 }} />
                <p style={{ color: "#7E8599", fontSize: 10, fontFamily: "Inter, sans-serif" }}>NOW!</p>
                <p style={{ color: "#4A5070", fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{p.now}</p>
              </div>
              {/* NOW dim */}
              <div style={{ flex: 1 }}>
                <div style={{ height: 36, borderRadius: 8, background: `${p.now}18`, border: `1px solid ${p.now}40`, marginBottom: 5 }} />
                <p style={{ color: "#7E8599", fontSize: 10, fontFamily: "Inter, sans-serif" }}>NOW! dim</p>
                <p style={{ color: "#4A5070", fontSize: 9 }}>badge tło</p>
              </div>
            </div>

            {/* Vote button preview */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button style={{ flex: 1, background: p.accent, border: "none", borderRadius: 8, padding: "9px", color: "#fff", fontFamily: "'Plus Jakarta Sans'", fontSize: 12, fontWeight: 700, cursor: "default" }}>Zagłosuj</button>
              <div style={{ flex: 1, background: "#13141A", border: `1px solid ${p.accent}55`, borderRadius: 8, padding: "9px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ height: 6, width: "70%", background: p.accent, borderRadius: 3 }} />
              </div>
            </div>

            <p style={{ color: "#4A5070", fontSize: 11, fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>{p.desc}</p>
          </div>
        ))}

        <p style={{ color: "#4A5070", fontSize: 10, textAlign: "center", marginTop: 8, fontFamily: "Inter, sans-serif" }}>
          Każdy wariant pokazuje logo C + przycisk akcji + badge NOW!
        </p>
      </div>

      <style>{`@keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(240,82,82,0.7)} 70%{box-shadow:0 0 0 5px rgba(240,82,82,0)} 100%{box-shadow:0 0 0 0 rgba(240,82,82,0)} }`}</style>
    </>
  );
}
