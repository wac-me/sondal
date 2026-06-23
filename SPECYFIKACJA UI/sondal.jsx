import { useState, useEffect, useRef } from "react";

const theme = {
  bg: "#13141A",
  surface: "#1C1E26",
  surfaceHigh: "#232630",
  accent: "#4F8EF7",
  accentDim: "rgba(79,142,247,0.12)",
  accentBright: "#6EA8FF",
  indigo: "#2D3561",
  indigoDim: "rgba(45,53,97,0.5)",
  text: "#EEF0F6",
  textMuted: "#7E8599",
  textDim: "#4A5070",
  border: "#2A2D3A",
  borderAccent: "rgba(79,142,247,0.3)",
  red: "#F05252",
  green: "#22C55E",
  gold: "#F59E0B",
};

const heroSlides = [
  {
    id: 1,
    tag: "GUS • GOSPODARKA",
    date: "Czerwiec 2025",
    title: "Zarobki w Polsce rosły o 8,4% r/r. Czy Twoja pensja też poszła w górę?",
    chartData: [{ label: "2022", value: 55 }, { label: "2023", value: 72 }, { label: "2024", value: 84 }, { label: "2025", value: 100 }],
    options: ["Tak, zarabiam więcej", "Nie — bez zmian lub mniej"],
    votes: 6821, comments: 214, split: [38, 62],
  },
  {
    id: 2,
    tag: "BANK ŚWIATOWY • MIESZKALNICTWO",
    date: "Maj 2025",
    title: "Polska w czołówce UE pod względem wzrostu cen mieszkań. Czy to kryzys?",
    chartData: [{ label: "2021", value: 40 }, { label: "2022", value: 58 }, { label: "2023", value: 79 }, { label: "2024", value: 100 }],
    options: ["Tak, to prawdziwy kryzys", "Nie, rynek się stabilizuje"],
    votes: 4302, comments: 189, split: [71, 29],
  },
  {
    id: 3,
    tag: "EUROSTAT • INFLACJA",
    date: "Czerwiec 2025",
    title: "Inflacja w strefie euro spada. Polacy jednak wciąż odczuwają drożyznę?",
    chartData: [{ label: "2022", value: 100 }, { label: "2023", value: 72 }, { label: "2024", value: 51 }, { label: "2025", value: 38 }],
    options: ["Tak, nadal płacę dużo więcej", "Nie, ceny wróciły do normy"],
    votes: 3917, comments: 97, split: [82, 18],
  },
  {
    id: 4,
    tag: "MEN • EDUKACJA",
    date: "Maj 2025",
    title: "Reforma programu nauczania 2025. Czy szkoła uczy tego, co naprawdę potrzebne?",
    chartData: [{ label: "Mat.", value: 78 }, { label: "J.Ang.", value: 91 }, { label: "Prog.", value: 34 }, { label: "Fin.", value: 18 }],
    options: ["Tak, program jest wystarczający", "Nie, szkoła jest przestarzała"],
    votes: 8441, comments: 312, split: [19, 81],
  },
  {
    id: 5,
    tag: "GUS • DEMOGRAFIA",
    date: "Kwiecień 2025",
    title: "Polska traci 100 000 mieszkańców rocznie. Czy polityka prorodzinna działa?",
    chartData: [{ label: "2021", value: 62 }, { label: "2022", value: 55 }, { label: "2023", value: 48 }, { label: "2024", value: 40 }],
    options: ["Tak, widzę poprawę", "Nie, to nie wystarczy"],
    votes: 5590, comments: 228, split: [24, 76],
  },
];

const trendingPolls = [
  { id: 10, tag: "#warszawa", question: "Rondo przy Dworcu Centralnym — naziemne przejścia?", votes: 2341, hot: true },
  { id: 11, tag: "#polityka", question: "Czy popierasz skrócenie tygodnia pracy do 4 dni?", votes: 9102, hot: true },
  { id: 12, tag: "#technologia", question: "Czy AI zastąpi Twoje stanowisko pracy w ciągu 10 lat?", votes: 6780, hot: false },
];

const communityPolls = [
  {
    id: 20, user: "@ania_wawa", avatar: "A", time: "8 min temu", tag: "#lokalne",
    question: "Czy rondo przy Dworcu Centralnym powinno mieć naziemne przejścia dla pieszych?",
    options: ["Tak — ułatwi życie pieszym", "Nie — sparaliżuje ruch aut"],
    baseSplit: [64, 36], totalVotes: 2341,
  },
  {
    id: 21, user: "@marek_gdansk", avatar: "M", time: "22 min temu", tag: "#gospodarka",
    question: "Czy planujesz zakup własnego mieszkania w ciągu najbliższych 3 lat?",
    options: ["Tak, to mój cel", "Nie, stać mnie tylko na wynajem", "Jeszcze nie wiem"],
    baseSplit: [28, 51, 21], totalVotes: 4102,
  },
  {
    id: 22, user: "@zuzanna.k", avatar: "Z", time: "1 godz. temu", tag: "#rozrywka",
    question: "Który serwis streamingowy jest według Ciebie najlepszy w 2025?",
    options: ["Netflix", "Max (HBO)", "Disney+", "Polsat Box Go"],
    baseSplit: [44, 29, 15, 12], totalVotes: 8934,
  },
];

const officialStats = [
  { label: "Bezrobocie PL", value: "4,9%", delta: "−0.3pp", src: "GUS • Maj 2025" },
  { label: "Inflacja CPI", value: "3,2%", delta: "−1.1pp", src: "NBP • Czerwiec 2025" },
  { label: "PKB r/r", value: "+3,8%", delta: "+0.6pp", src: "GUS • Q1 2025" },
  { label: "Stopa ref. NBP", value: "5,75%", delta: "0", src: "NBP • Czerwiec 2025" },
];

// ─── Atoms ────────────────────────────────────────────────

function PulsingDot() {
  return <span style={{ width: 7, height: 7, borderRadius: "50%", background: theme.red, display: "inline-block", animation: "pulse 1.8s infinite", flexShrink: 0 }} />;
}

function Tag({ children, color }) {
  return (
    <span style={{ background: color ? `${color}18` : theme.accentDim, color: color || theme.accent, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, fontFamily: "Inter, sans-serif", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, padding: "0 0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: `${(d.value / max) * 100}%`, background: i === data.length - 1 ? theme.accent : `${theme.accent}44`, borderRadius: "3px 3px 0 0", transition: "height 0.6s ease", minHeight: 4 }} />
          </div>
          <span style={{ color: theme.textDim, fontSize: 9, fontFamily: "Inter, sans-serif" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function VoteButtons({ options, split, onVote, voted }) {
  if (voted === null) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {options.map((opt, i) => (
          <button key={i} onClick={() => onVote(i)} style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}`, borderRadius: 9, padding: "11px 14px", color: theme.text, fontFamily: "Inter, sans-serif", fontSize: 13, textAlign: "left", cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = theme.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
          >{opt}</button>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {options.map((opt, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ color: i === voted ? theme.accentBright : theme.textMuted, fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: i === voted ? 600 : 400 }}>{opt} {i === voted && "✓"}</span>
            <span style={{ color: theme.textMuted, fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{split[i]}%</span>
          </div>
          <div style={{ height: 6, background: theme.border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${split[i]}%`, height: "100%", background: i === voted ? theme.accent : theme.textDim, borderRadius: 3, transition: "width 0.6s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────

function StickyHeader({ nowActive }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 200, background: `${theme.bg}F2`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${theme.border}`, padding: "11px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 19, color: theme.text, letterSpacing: "-0.5px" }}>
            son<span style={{ color: theme.accent }}>d</span>al
            <span style={{ color: theme.textDim, fontSize: 13, fontWeight: 500 }}>.top</span>
          </span>
        </div>
        <p style={{ color: theme.textDim, fontFamily: "Inter, sans-serif", fontSize: 9, margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Fakty spotykają opinie</p>
      </div>

      {nowActive && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(240,82,82,0.1)", border: "1px solid rgba(240,82,82,0.25)", borderRadius: 20, padding: "4px 10px" }}>
          <PulsingDot />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, color: theme.red, letterSpacing: "0.08em" }}>NOW!</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 17, cursor: "pointer", color: theme.textMuted }}>🔍</span>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: theme.indigo, border: `1px solid ${theme.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 13, color: theme.accent }}>◉</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Slider ──────────────────────────────────────────

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [voted, setVoted] = useState({});
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => { setCurrent(i); resetTimer(); };
  const slide = heroSlides[current];

  return (
    <div style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: "16px 16px 14px" }}>
      {/* Slide header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Tag>{slide.tag}</Tag>
          <span style={{ color: theme.textDim, fontSize: 10, fontFamily: "Inter, sans-serif" }}>{slide.date}</span>
        </div>
        <span style={{ color: theme.textDim, fontSize: 10, fontFamily: "Inter, sans-serif" }}>{current + 1}/{heroSlides.length}</span>
      </div>

      <h2 style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, lineHeight: 1.4, margin: "0 0 12px" }}>{slide.title}</h2>

      <MiniBarChart data={slide.chartData} />

      <div style={{ marginTop: 12, borderTop: `1px solid ${theme.border}`, paddingTop: 12 }}>
        <p style={{ color: theme.accent, fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, margin: "0 0 8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>A jak jest u Ciebie?</p>
        <VoteButtons
          options={slide.options}
          split={slide.split}
          voted={voted[slide.id] ?? null}
          onVote={(i) => setVoted(v => ({ ...v, [slide.id]: i }))}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
        <span style={{ color: theme.textDim, fontSize: 11, fontFamily: "Inter, sans-serif" }}>{slide.votes.toLocaleString()} głosów · 💬 {slide.comments}</span>
        {/* Dots */}
        <div style={{ display: "flex", gap: 5 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 18 : 6, height: 6, borderRadius: 3, background: i === current ? theme.accent : theme.border, border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Official Stats Bar ───────────────────────────────────

function StatsBar() {
  return (
    <div style={{ padding: "12px 16px", borderBottom: `1px solid ${theme.border}`, background: theme.bg }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 3, height: 12, background: theme.accent, borderRadius: 2 }} />
        <span style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Dane oficjalne na żywo</span>
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
        {officialStats.map((s, i) => (
          <div key={i} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", flexShrink: 0, minWidth: 110 }}>
            <p style={{ color: theme.textDim, fontFamily: "Inter, sans-serif", fontSize: 9, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800 }}>{s.value}</span>
              <span style={{ color: s.delta.startsWith("−") ? theme.red : s.delta === "0" ? theme.textDim : theme.green, fontSize: 10, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{s.delta}</span>
            </div>
            <p style={{ color: theme.textDim, fontFamily: "Inter, sans-serif", fontSize: 9, margin: "3px 0 0" }}>{s.src}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Trending ─────────────────────────────────────────────

function TrendingSection() {
  return (
    <div style={{ padding: "14px 16px", borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 3, height: 12, background: theme.red, borderRadius: 2 }} />
        <span style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Trending NOW</span>
        <PulsingDot />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {trendingPolls.map((p, i) => (
          <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", background: theme.surface, borderRadius: 10, border: `1px solid ${p.hot ? theme.borderAccent : theme.border}` }}>
            <span style={{ color: theme.textDim, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, width: 24, textAlign: "center", flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <Tag>{p.tag}</Tag>
              <p style={{ color: theme.text, fontFamily: "Inter, sans-serif", fontSize: 13, margin: "5px 0 3px", lineHeight: 1.4 }}>{p.question}</p>
              <span style={{ color: theme.textDim, fontFamily: "Inter, sans-serif", fontSize: 10 }}>{p.votes.toLocaleString()} głosów</span>
            </div>
            <span style={{ color: theme.accent, fontSize: 16, flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Community Feed ───────────────────────────────────────

function PollCard({ poll }) {
  const [voted, setVoted] = useState(null);
  return (
    <div style={{ background: theme.surface, borderRadius: 14, padding: "14px 14px 12px", marginBottom: 10, border: `1px solid ${theme.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: theme.indigo, border: `1px solid ${theme.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: theme.accent, fontWeight: 700, flexShrink: 0 }}>
            {poll.avatar}
          </div>
          <div>
            <span style={{ color: theme.text, fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{poll.user}</span>
            <span style={{ color: theme.textDim, fontSize: 11, fontFamily: "Inter, sans-serif", marginLeft: 6 }}>{poll.time}</span>
          </div>
        </div>
        <Tag>{poll.tag}</Tag>
      </div>
      <p style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, lineHeight: 1.4, margin: "0 0 12px" }}>{poll.question}</p>
      <VoteButtons options={poll.options} split={poll.baseSplit} voted={voted} onVote={setVoted} />
      {voted !== null && (
        <p style={{ color: theme.textDim, fontSize: 11, margin: "8px 0 0", fontFamily: "Inter, sans-serif" }}>{poll.totalVotes.toLocaleString()} głosów łącznie</p>
      )}
      <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${theme.border}` }}>
        <span style={{ color: theme.textDim, fontSize: 12, fontFamily: "Inter, sans-serif", cursor: "pointer" }}>💬 Dyskusja</span>
        <span style={{ color: theme.textDim, fontSize: 12, fontFamily: "Inter, sans-serif", cursor: "pointer" }}>↗ Udostępnij</span>
      </div>
    </div>
  );
}

function CreatorBanner({ onGoToCreate }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${theme.accentDim}, ${theme.indigoDim})`, border: `1px solid ${theme.borderAccent}`, borderRadius: 14, padding: "16px", margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, margin: 0 }}>Masz pytanie do świata? 🌍</p>
      <p style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 12, margin: 0, lineHeight: 1.5 }}>Stwórz własną sondę w 10 sekund. Zbierz głosy i osadź wykres na swojej stronie.</p>
      <button onClick={onGoToCreate} style={{ background: theme.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start" }}>Przejdź do kreatora →</button>
    </div>
  );
}

// ─── Category Filter ──────────────────────────────────────

const categories = ["#Wszystkie", "#GUS", "#Gospodarka", "#Lokalne", "#Rozrywka", "#Edukacja"];

function CategoryFilter({ active, setActive }) {
  return (
    <div style={{ display: "flex", gap: 7, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${theme.border}`, background: theme.bg }}>
      {categories.map(cat => (
        <button key={cat} onClick={() => setActive(cat)} style={{ background: active === cat ? theme.accent : theme.surface, color: active === cat ? "#fff" : theme.textMuted, border: `1px solid ${active === cat ? "transparent" : theme.border}`, borderRadius: 20, padding: "6px 13px", fontSize: 11, fontFamily: "Inter, sans-serif", fontWeight: active === cat ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{cat}</button>
      ))}
    </div>
  );
}

// ─── Discover Screen ──────────────────────────────────────

function DiscoverScreen({ onGoToCreate }) {
  const [activeCategory, setActiveCategory] = useState("#Wszystkie");
  return (
    <>
      <StickyHeader nowActive={true} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <HeroSlider />
        <StatsBar />
        <TrendingSection />
        <CategoryFilter active={activeCategory} setActive={setActiveCategory} />
        <div style={{ padding: "12px 12px 0" }}>
          <CreatorBanner onGoToCreate={onGoToCreate} />
          {communityPolls.map(poll => <PollCard key={poll.id} poll={poll} />)}
          <div style={{ height: 20 }} />
        </div>
      </div>
    </>
  );
}

// ─── Creator Screen ───────────────────────────────────────

function Toggle({ label, icon, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        <span style={{ color: theme.text, fontFamily: "Inter, sans-serif", fontSize: 14 }}>{label}</span>
      </div>
      <div onClick={() => onChange(!value)} style={{ width: 42, height: 24, borderRadius: 12, background: value ? theme.accent : theme.border, cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
        <div style={{ position: "absolute", top: 3, left: value ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: value ? "#fff" : theme.textDim, transition: "left 0.2s" }} />
      </div>
    </div>
  );
}

function CreatorScreen({ onSuccess }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnon, setIsAnon] = useState(true);
  const [category, setCategory] = useState("#Lokalne");

  const addOption = () => { if (options.length < 6) setOptions([...options, ""]); };
  const removeOption = (i) => { if (options.length > 2) setOptions(options.filter((_, idx) => idx !== i)); };
  const updateOption = (i, val) => { const o = [...options]; o[i] = val; setOptions(o); };
  const canGenerate = question.trim().length > 3 && options.filter(o => o.trim()).length >= 2;

  return (
    <>
      <StickyHeader nowActive={false} />
      <div style={{ padding: "16px 16px 10px", borderBottom: `1px solid ${theme.border}` }}>
        <p style={{ color: theme.textDim, fontFamily: "Inter, sans-serif", fontSize: 11, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>Nowa sonda</p>
        <h2 style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, margin: "2px 0 0" }}>Kreator</h2>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Pytanie</label>
          <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="O co chcesz zapytać?" rows={3}
            style={{ width: "100%", background: theme.surface, border: `1.5px solid ${question.trim() ? theme.accent : theme.border}`, borderRadius: 12, padding: "13px", color: theme.text, fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.5, resize: "none", outline: "none" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Opcje odpowiedzi</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {options.map((opt, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: theme.accentDim, border: `1px solid ${theme.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: theme.accent, fontSize: 10, fontWeight: 700 }}>{String.fromCharCode(65 + i)}</span>
                </div>
                <input value={opt} onChange={e => updateOption(i, e.target.value)} placeholder={`Opcja ${String.fromCharCode(65 + i)}`}
                  style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 9, padding: "11px 12px", color: theme.text, fontFamily: "Inter, sans-serif", fontSize: 14, outline: "none" }} />
                {options.length > 2 && (
                  <button onClick={() => removeOption(i)} style={{ background: "none", border: "none", color: theme.textDim, fontSize: 18, cursor: "pointer", padding: "0 4px" }}>×</button>
                )}
              </div>
            ))}
          </div>
          {options.length < 6 && (
            <button onClick={addOption} style={{ background: "none", border: `1px dashed ${theme.border}`, borderRadius: 9, padding: "10px", width: "100%", color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 13, cursor: "pointer", marginTop: 8 }}>+ Dodaj opcję</button>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Kategoria</label>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {["#Lokalne", "#Gospodarka", "#Rozrywka", "#Edukacja", "#Sport"].map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{ background: category === cat ? theme.accent : theme.surface, color: category === cat ? "#fff" : theme.textMuted, border: `1px solid ${category === cat ? "transparent" : theme.border}`, borderRadius: 20, padding: "6px 12px", fontSize: 11, fontFamily: "Inter, sans-serif", fontWeight: category === cat ? 700 : 400, cursor: "pointer" }}>{cat}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Toggle label="Publiczna w portalu" icon="👁" value={isPublic} onChange={setIsPublic} />
          <Toggle label="Anonimowe głosowanie" icon="🔒" value={isAnon} onChange={setIsAnon} />
        </div>
        <div style={{ height: 80 }} />
      </div>
      <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${theme.border}`, background: theme.bg }}>
        {!canGenerate && <p style={{ color: theme.textDim, fontFamily: "Inter, sans-serif", fontSize: 12, textAlign: "center", margin: "0 0 10px" }}>Wpisz pytanie i co najmniej 2 opcje</p>}
        <button onClick={() => canGenerate && onSuccess({ question, options: options.filter(o => o.trim()), isPublic, isAnon, category })}
          style={{ width: "100%", background: canGenerate ? theme.accent : theme.surface, color: canGenerate ? "#fff" : theme.textDim, border: "none", borderRadius: 12, padding: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 800, cursor: canGenerate ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
          Generuj Sondę ⚡
        </button>
      </div>
    </>
  );
}

// ─── Success Screen ───────────────────────────────────────

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 12px", color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
        <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ background: copied ? theme.green : theme.accent, color: "#fff", border: "none", borderRadius: 10, padding: "0 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
          {copied ? "✓" : "Kopiuj"}
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ pollData, onReset, onGoToDiscover }) {
  const slug = "x/" + Math.random().toString(36).slice(2, 7);
  const link = `sondal.top/${slug}`;
  const iframe = `<iframe src="https://sondal.top/${slug}/embed" width="100%" height="320" frameborder="0"></iframe>`;
  return (
    <>
      <StickyHeader nowActive={false} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: theme.accentDim, border: `2px solid ${theme.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 26 }}>⚡</div>
          <h2 style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>Sonda gotowa!</h2>
          <p style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 14, margin: 0, lineHeight: 1.5 }}>Twoja sonda jest już aktywna. Udostępnij link lub osadź na stronie.</p>
        </div>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "16px", marginBottom: 20 }}>
          <Tag>{pollData.category} • PODGLĄD</Tag>
          <p style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, margin: "10px 0 12px", lineHeight: 1.4 }}>{pollData.question}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {pollData.options.map((opt, i) => (
              <div key={i} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "10px 12px", display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: theme.accentDim, border: `1px solid ${theme.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: theme.accent, fontSize: 9, fontWeight: 700 }}>{String.fromCharCode(65 + i)}</span>
                </div>
                <span style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 13 }}>{opt}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <span style={{ background: pollData.isPublic ? theme.accentDim : theme.surfaceHigh, color: pollData.isPublic ? theme.accent : theme.textDim, fontSize: 10, padding: "3px 8px", borderRadius: 4, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{pollData.isPublic ? "🌍 Publiczna" : "🔒 Prywatna"}</span>
            <span style={{ background: theme.surfaceHigh, color: theme.textDim, fontSize: 10, padding: "3px 8px", borderRadius: 4, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{pollData.isAnon ? "🎭 Anonimowa" : "👤 Jawna"}</span>
          </div>
        </div>
        <CopyField label="Twój link" value={link} />
        <CopyField label="Kod do osadzenia (iFrame)" value={iframe} />
        <div style={{ background: `linear-gradient(135deg, ${theme.accentDim}, ${theme.indigoDim})`, border: `1px solid ${theme.borderAccent}`, borderRadius: 14, padding: "16px", marginBottom: 20 }}>
          <p style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, margin: "0 0 6px" }}>Chcesz więcej możliwości?</p>
          <p style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 12, margin: "0 0 12px", lineHeight: 1.5 }}>Zaloguj się, aby śledzić wyniki na żywo, edytować sondę i eksportować dane do CSV.</p>
          <button style={{ background: theme.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Zarejestruj się za darmo →</button>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button onClick={onReset} style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "13px", color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 14, cursor: "pointer" }}>+ Nowa sonda</button>
          <button onClick={onGoToDiscover} style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "13px", color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 14, cursor: "pointer" }}>◎ Portal</button>
        </div>
      </div>
    </>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────

function BottomNav({ active, setActive }) {
  const items = [
    { id: "discover", icon: "◎", label: "Odkrywaj" },
    { id: "create", icon: "+", label: "Utwórz", main: true },
    { id: "discuss", icon: "💬", label: "Dyskusje" },
    { id: "account", icon: "◉", label: "Konto" },
  ];
  return (
    <div style={{ position: "sticky", bottom: 0, background: `${theme.surface}F5`, backdropFilter: "blur(12px)", borderTop: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-around", padding: "10px 0 14px", zIndex: 100 }}>
      {items.map(item => (
        <button key={item.id} onClick={() => setActive(item.id)} style={{ background: item.main ? theme.accent : "transparent", border: "none", borderRadius: item.main ? 12 : 0, padding: item.main ? "8px 20px" : "4px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <span style={{ fontSize: item.main ? 20 : 16, color: item.main ? "#fff" : (active === item.id ? theme.accent : theme.textDim), fontWeight: item.main ? 900 : 400, lineHeight: 1 }}>{item.icon}</span>
          <span style={{ fontSize: 10, fontFamily: "Inter, sans-serif", color: item.main ? "#fff" : (active === item.id ? theme.accent : theme.textDim), fontWeight: item.main ? 700 : (active === item.id ? 600 : 400) }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────

export default function SondalApp() {
  const [activeNav, setActiveNav] = useState("discover");
  const [creatorStep, setCreatorStep] = useState("form");
  const [pollData, setPollData] = useState(null);

  const handleNavChange = (id) => { setActiveNav(id); if (id === "create") setCreatorStep("form"); };
  const handleSuccess = (data) => { setPollData(data); setCreatorStep("success"); };
  const handleReset = () => { setPollData(null); setCreatorStep("form"); };
  const handleGoToDiscover = () => { setActiveNav("discover"); setCreatorStep("form"); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(240,82,82,0.7)} 70%{box-shadow:0 0 0 6px rgba(240,82,82,0)} 100%{box-shadow:0 0 0 0 rgba(240,82,82,0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus, input:focus { border-color: #4F8EF7 !important; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: #2A2D3A; border-radius: 2px; }
      `}</style>
      <div style={{ background: theme.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        {activeNav === "discover" && <DiscoverScreen onGoToCreate={() => handleNavChange("create")} />}
        {activeNav === "create" && creatorStep === "form" && <CreatorScreen onSuccess={handleSuccess} />}
        {activeNav === "create" && creatorStep === "success" && <SuccessScreen pollData={pollData} onReset={handleReset} onGoToDiscover={handleGoToDiscover} />}
        {activeNav === "discuss" && (
          <><StickyHeader nowActive={false} /><div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 32 }}><span style={{ fontSize: 40 }}>💬</span><p style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 15, textAlign: "center" }}>Dyskusje — wkrótce dla zalogowanych.</p></div></>
        )}
        {activeNav === "account" && (
          <><StickyHeader nowActive={false} /><div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 32 }}>
            <span style={{ fontSize: 40 }}>◉</span>
            <p style={{ color: theme.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700 }}>Dołącz do sondal.top</p>
            <p style={{ color: theme.textMuted, fontFamily: "Inter, sans-serif", fontSize: 14, textAlign: "center", lineHeight: 1.6 }}>Zaloguj się, aby śledzić swoje sondy, komentować i moderować wyniki.</p>
            <button style={{ background: theme.accent, color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 8 }}>Zarejestruj się →</button>
            <button style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "13px 32px", fontFamily: "Inter, sans-serif", fontSize: 15, color: theme.textMuted, cursor: "pointer" }}>Zaloguj się</button>
          </div></>
        )}
        <BottomNav active={activeNav} setActive={handleNavChange} />
      </div>
    </>
  );
}
