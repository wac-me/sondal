import { useState, useEffect, useRef } from "react";
import { Search, MessageCircle, Share2, TrendingUp, ChevronRight, User, Lock, Eye, Plus, BarChart2 } from "lucide-react";

const theme = {
  bg: "#13141A", surface: "#1C1E26", surfaceHigh: "#232630",
  accent: "#3B7DD8", accentDim: "rgba(59,125,216,0.12)", accentBright: "#5B9AEA",
  indigo: "#2D3561", indigoDim: "rgba(45,53,97,0.5)",
  text: "#EEF0F6", textMuted: "#7E8599", textDim: "#4A5070",
  border: "#2A2D3A", borderAccent: "rgba(59,125,216,0.3)",
  red: "#E8373D", redDim: "rgba(232,55,61,0.12)", redBorder: "rgba(232,55,61,0.3)",
  green: "#22C55E",
};

const heroSlides = [
  { id:1, tag:"GUS • GOSPODARKA", date:"Czerwiec 2025", hot:false,
    title:"Zarobki w Polsce rosły o 8,4% r/r. Czy Twoja pensja też poszła w górę?",
    chartData:[{label:"2022",value:55},{label:"2023",value:72},{label:"2024",value:84},{label:"2025",value:100}],
    options:["Tak, zarabiam więcej","Nie — bez zmian lub mniej"], votes:6821, comments:214, split:[38,62] },
  { id:2, tag:"BANK ŚWIATOWY • MIESZKALNICTWO", date:"Maj 2025", hot:false,
    title:"Polska w czołówce UE pod względem wzrostu cen mieszkań. Czy to już kryzys?",
    chartData:[{label:"2021",value:40},{label:"2022",value:58},{label:"2023",value:79},{label:"2024",value:100}],
    options:["Tak, to prawdziwy kryzys","Nie, rynek się stabilizuje"], votes:4302, comments:189, split:[71,29] },
  { id:3, tag:"MSZ • POLSKA / UKRAINA", date:"Dziś", hot:true,
    title:"Kontrowersje wokół odznaczeń dla ukraińskich żołnierzy. Polska powinna uhonorować ich orderami państwowymi?",
    chartData:[{label:"Za",value:34},{label:"Przeciw",value:82},{label:"Wstrz.",value:51},{label:"Brak zd.",value:28}],
    options:["Tak, to gest solidarności","Nie, to decyzja przedwczesna","Potrzebna szersza debata"],
    votes:12840, comments:641, split:[28,54,18] },
  { id:4, tag:"GEOPOLITYKA • ORMUZ", date:"Dziś", hot:true,
    title:"Napięcia w Cieśninie Ormuz — 20% światowej ropy przechodzi tędy. Czy grozi nam kryzys energetyczny?",
    chartData:[{label:"Ropa",value:100},{label:"LNG",value:78},{label:"Kontenery",value:55},{label:"Inne",value:30}],
    options:["Tak, ceny paliw wzrosną drastycznie","Nie, Zachód ma alternatywy","Trudno ocenić"],
    votes:9310, comments:388, split:[47,31,22] },
  { id:5, tag:"BIZNES • AI", date:"Wczoraj", hot:true,
    title:"OpenAI wyceniany na 300 mld USD. Czy bańka AI pęknie tak jak bańka dot-com?",
    chartData:[{label:"2021",value:29},{label:"2022",value:57},{label:"2023",value:86},{label:"2025",value:100}],
    options:["Tak, to spekulacyjna bańka","Nie, AI to nowa infrastruktura","Za wcześnie by oceniać"],
    votes:7654, comments:512, split:[38,44,18] },
  { id:6, tag:"EUROSTAT • INFLACJA", date:"Czerwiec 2025", hot:false,
    title:"Inflacja w strefie euro spada. Polacy jednak wciąż odczuwają drożyznę?",
    chartData:[{label:"2022",value:100},{label:"2023",value:72},{label:"2024",value:51},{label:"2025",value:38}],
    options:["Tak, nadal płacę dużo więcej","Nie, ceny wróciły do normy"], votes:3917, comments:97, split:[82,18] },
  { id:7, tag:"MEN • EDUKACJA", date:"Maj 2025", hot:false,
    title:"Reforma programu nauczania 2025. Czy szkoła uczy tego, co naprawdę potrzebne?",
    chartData:[{label:"Mat.",value:78},{label:"J.Ang.",value:91},{label:"Prog.",value:34},{label:"Fin.",value:18}],
    options:["Tak, program jest wystarczający","Nie, szkoła jest przestarzała"], votes:8441, comments:312, split:[19,81] },
  { id:8, tag:"GUS • DEMOGRAFIA", date:"Kwiecień 2025", hot:false,
    title:"Polska traci 100 000 mieszkańców rocznie. Czy polityka prorodzinna działa?",
    chartData:[{label:"2021",value:62},{label:"2022",value:55},{label:"2023",value:48},{label:"2024",value:40}],
    options:["Tak, widzę poprawę","Nie, to nie wystarczy"], votes:5590, comments:228, split:[24,76] },
];

const trendingPolls = [
  { id:10, tag:"#warszawa", question:"Rondo przy Dworcu Centralnym — naziemne przejścia?", votes:2341 },
  { id:11, tag:"#polityka", question:"Czy popierasz skrócenie tygodnia pracy do 4 dni?", votes:9102 },
  { id:12, tag:"#technologia", question:"Czy AI zastąpi Twoje stanowisko pracy w ciągu 10 lat?", votes:6780 },
];


const trendingPollDetails = {
  10: {
    id:10, tag:"#warszawa", user:"@miasto_warszawa", avatar:"M", time:"2 godz. temu",
    question:"Rondo przy Dworcu Centralnym — naziemne przejścia dla pieszych?",
    options:["Tak — ułatwi życie pieszym","Nie — sparaliżuje ruch aut"],
    split:[64,36], totalVotes:2341,
    comments:[
      { id:1, user:"@piotr_w", vote:0, time:"1 godz. temu", text:"Każde przejście naziemne to mniejsze bezpieczeństwo dla pieszych. Tunele są lepsze." },
      { id:2, user:"@asia_piesza", vote:0, time:"45 min temu", text:"Nareszcie ktoś pyta! Jako mama z wózkiem przejście podziemne to koszmar." },
      { id:3, user:"@kierowca99", vote:1, time:"30 min temu", text:"Rondo działa sprawnie, przejścia naziemne to paraliż. Nie tykajmy tego." },
      { id:4, user:"@urbanista_pl", vote:0, time:"12 min temu", text:"Dane z Amsterdamu i Kopenhagi jasno pokazują że piesi na poziomie = miasto żywe." },
    ],
  },
  11: {
    id:11, tag:"#polityka", user:"@debata_pl", avatar:"D", time:"5 godz. temu",
    question:"Czy popierasz skrócenie tygodnia pracy do 4 dni?",
    options:["Tak, chcę 4-dniowego tygodnia","Nie, gospodarka tego nie wytrzyma"],
    split:[71,29], totalVotes:9102,
    comments:[
      { id:1, user:"@ewa_hr", vote:0, time:"4 godz. temu", text:"Islandia testowała 4 dni przez 4 lata — produktywność wzrosła. Fakty są po naszej stronie." },
      { id:2, user:"@jan_kowal", vote:1, time:"3 godz. temu", text:"Małe firmy tego nie przeżyją. Ktoś pomyślał o budowlance, handlu, gastronomii?" },
      { id:3, user:"@marta_z", vote:0, time:"2 godz. temu", text:"Mój szef już testuje piątki wolne. Wyniki lepsze niż rok temu." },
      { id:4, user:"@ekonom_krytyk", vote:1, time:"1 godz. temu", text:"Porównywanie Islandii sektora publicznego do polskiej produkcji to nieporozumienie." },
      { id:5, user:"@pracownik23", vote:0, time:"20 min temu", text:"Choć raz coś dla ludzi a nie dla korporacji." },
    ],
  },
  12: {
    id:12, tag:"#technologia", user:"@ai_watch", avatar:"A", time:"8 godz. temu",
    question:"Czy AI zastąpi Twoje stanowisko pracy w ciągu 10 lat?",
    options:["Tak, boję się o swoją pracę","Nie, moja praca jest bezpieczna","Jeszcze nie wiem"],
    split:[38,35,27], totalVotes:6780,
    comments:[
      { id:1, user:"@dev_senior", vote:1, time:"7 godz. temu", text:"Jestem programistą od 15 lat. AI mi pomaga, nie zastępuje. Na razie." },
      { id:2, user:"@grafik_free", vote:0, time:"6 godz. temu", text:"Jako grafik widzę jak Midjourney zabiera mi zlecenia. To nie teoria." },
      { id:3, user:"@cfo_firma", vote:1, time:"4 godz. temu", text:"W ciągu 2 lat zautomatyzowaliśmy 3 stanowiska. Nikt nie stracił pracy — przeszli wyżej." },
    ],
  },
};

const communityPolls = [
  { id:20, user:"@ania_wawa", avatar:"A", time:"8 min temu", tag:"#lokalne",
    question:"Czy rondo przy Dworcu Centralnym powinno mieć naziemne przejścia dla pieszych?",
    options:["Tak — ułatwi życie pieszym","Nie — sparaliżuje ruch aut"], baseSplit:[64,36], totalVotes:2341 },
  { id:21, user:"@marek_gdansk", avatar:"M", time:"22 min temu", tag:"#gospodarka",
    question:"Czy planujesz zakup własnego mieszkania w ciągu najbliższych 3 lat?",
    options:["Tak, to mój cel","Nie, stać mnie tylko na wynajem","Jeszcze nie wiem"], baseSplit:[28,51,21], totalVotes:4102 },
  { id:22, user:"@zuzanna.k", avatar:"Z", time:"1 godz. temu", tag:"#rozrywka",
    question:"Który serwis streamingowy jest według Ciebie najlepszy w 2025?",
    options:["Netflix","Max (HBO)","Disney+","Polsat Box Go"], baseSplit:[44,29,15,12], totalVotes:8934 },
  { id:23, user:"@tomek_biker", avatar:"T", time:"3 godz. temu", tag:"#miasto",
    question:"Czy w Twoim mieście brakuje bezpiecznych dróg rowerowych?",
    options:["Tak, to dramat","Jest ok, mogłoby być lepiej","Nie, mamy dobrą infrastrukturę"], baseSplit:[58,29,13], totalVotes:3871 },
  { id:24, user:"@kasia_edu", avatar:"K", time:"4 godz. temu", tag:"#edukacja",
    question:"Czy zadania domowe w szkole podstawowej powinny być zakazane?",
    options:["Tak, dzieci potrzebują odpoczynku","Nie, to ważny element nauki","Tylko w ograniczonym zakresie"], baseSplit:[41,32,27], totalVotes:5203 },
  { id:25, user:"@piotr_fin", avatar:"P", time:"6 godz. temu", tag:"#finanse",
    question:"Czy trzymasz oszczędności w złotówkach, euro czy kryptowalutach?",
    options:["Złotówki (PLN)","Euro lub inne waluty","Kryptowaluty","Mieszam kilka opcji"], baseSplit:[38,27,14,21], totalVotes:6614 },
];

const officialStats = [
  { label:"Bezrobocie PL", value:"4,9%", delta:"−0.3pp", pos:true, src:"GUS • Maj 2025" },
  { label:"Inflacja CPI",  value:"3,2%", delta:"−1.1pp", pos:true, src:"NBP • Czerwiec 2025" },
  { label:"PKB r/r",       value:"+3,8%",delta:"+0.6pp", pos:true, src:"GUS • Q1 2025" },
  { label:"Stopa ref.",    value:"5,75%",delta:"—",       pos:null, src:"NBP • Czerwiec 2025" },
];

const categories = ["#Wszystkie","#GUS","#Gospodarka","#Lokalne","#Rozrywka","#Edukacja"];

// ─── Logo ─────────────────────────────────────────────────
function LogoMark({ size=20 }) {
  return (
    <svg width={size*0.55} height={size*0.65} viewBox="0 0 22 28" fill="none">
      <circle cx="18" cy="4"  r="3.5" fill={theme.accent}/>
      <circle cx="11" cy="14" r="2.5" fill={theme.accent} opacity="0.55"/>
      <circle cx="18" cy="24" r="3.5" fill={theme.accent}/>
      <line x1="18" y1="4"  x2="11" y2="14" stroke={theme.accent} strokeWidth="1.5" opacity="0.45"/>
      <line x1="11" y1="14" x2="18" y2="24" stroke={theme.accent} strokeWidth="1.5" opacity="0.45"/>
      <circle cx="4" cy="9"  r="2" fill={theme.accent} opacity="0.3"/>
      <circle cx="4" cy="19" r="2" fill={theme.accent} opacity="0.3"/>
      <line x1="11" y1="14" x2="4" y2="9"  stroke={theme.accent} strokeWidth="1" opacity="0.25"/>
      <line x1="11" y1="14" x2="4" y2="19" stroke={theme.accent} strokeWidth="1" opacity="0.25"/>
    </svg>
  );
}

// ─── Atoms ────────────────────────────────────────────────
function Tag({ children, hot }) {
  return (
    <span style={{ background: hot ? theme.redDim : theme.accentDim, color: hot ? theme.red : theme.accentBright, fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:4, fontFamily:"Inter, sans-serif", letterSpacing:"0.05em", whiteSpace:"nowrap", border: hot ? `1px solid ${theme.redBorder}` : "none" }}>
      {hot && <span style={{marginRight:4}}>🔴</span>}{children}
    </span>
  );
}

function MiniBarChart({ data, hot }) {
  const max = Math.max(...data.map(d=>d.value));
  const barColor = hot ? theme.red : theme.accent;
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:52, padding:"0 0 4px" }}>
      {data.map((d,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, height:"100%" }}>
          <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end" }}>
            <div style={{ width:"100%", height:`${(d.value/max)*100}%`, background: i===data.length-1 ? barColor : `${barColor}44`, borderRadius:"3px 3px 0 0", minHeight:4 }}/>
          </div>
          <span style={{ color:theme.textDim, fontSize:9, fontFamily:"Inter, sans-serif" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function VoteButtons({ options, split, voted, onVote, hot }) {
  const activeColor = hot ? theme.red : theme.accent;
  if (voted===null) return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      {options.map((opt,i) => (
        <button key={i} onClick={() => onVote(i)}
          style={{ background:theme.surfaceHigh, border:`1px solid ${theme.border}`, borderRadius:9, padding:"10px 14px", color:theme.text, fontFamily:"Inter, sans-serif", fontSize:13, textAlign:"left", cursor:"pointer", transition:"border-color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor=activeColor}
          onMouseLeave={e => e.currentTarget.style.borderColor=theme.border}
        >{opt}</button>
      ))}
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      {options.map((opt,i) => (
        <div key={i}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
            <span style={{ color: i===voted ? activeColor : theme.textMuted, fontSize:12, fontFamily:"Inter, sans-serif", fontWeight: i===voted ? 600 : 400 }}>{opt} {i===voted&&"✓"}</span>
            <span style={{ color:theme.textMuted, fontSize:12, fontFamily:"Inter, sans-serif", fontWeight:600 }}>{split[i]}%</span>
          </div>
          <div style={{ height:6, background:theme.border, borderRadius:3, overflow:"hidden" }}>
            <div style={{ width:`${split[i]}%`, height:"100%", background: i===voted ? activeColor : theme.textDim, borderRadius:3, transition:"width 0.6s ease" }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────
function NowBadge() {
  // Pastylka "NOW!" widoczna 3s, potem tylko kropka przez 12.5s, w kółko
  const [showText, setShowText] = useState(true);
  useEffect(() => {
    let t;
    const cycle = () => {
      setShowText(true);
      t = setTimeout(() => {
        setShowText(false);
        t = setTimeout(cycle, 12500);
      }, 3000);
    };
    cycle();
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"center",
      gap: showText ? 5 : 0,
      background:theme.redDim,
      borderRadius:20,
      paddingTop:5, paddingBottom:5,
      paddingLeft:  showText ? 10 : 6,
      paddingRight: showText ? 10 : 6,
      overflow:"hidden",
      transition:"padding 0.5s cubic-bezier(.4,0,.2,1), gap 0.5s cubic-bezier(.4,0,.2,1)",
    }}>
      <span style={{
        width:7, height:7, borderRadius:"50%", background:theme.red,
        display:"block", flexShrink:0,
        animation:"pulsered 1.6s infinite",
      }}/>
      <span style={{
        fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:700,
        fontSize:11, color:theme.red, letterSpacing:"0.08em",
        maxWidth: showText ? 40 : 0,
        opacity:  showText ? 1  : 0,
        overflow:"hidden", whiteSpace:"nowrap",
        transition:"max-width 0.5s cubic-bezier(.4,0,.2,1), opacity 0.35s ease",
      }}>NOW!</span>
    </div>
  );
}

function StickyHeader({ nowActive, onShowTrending, onGoHome }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY  = useRef(0);
  const headerHeight = 64;

  useEffect(() => {
    const el = document.querySelector("[data-scroll-feed]");
    if (!el) return;
    const onScroll = () => {
      const y = el.scrollTop;
      if (y > lastScrollY.current + 6 && y > headerHeight) setHidden(true);
      else if (y < lastScrollY.current - 4) setHidden(false);
      lastScrollY.current = y;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position:"absolute", top:0, left:0, right:0, zIndex:200,
      background:`${theme.bg}F4`, backdropFilter:"blur(14px)",
      borderBottom:`1px solid ${theme.border}`,
      height:headerHeight,
      display:"flex", alignItems:"center",
      padding:"0 16px",
      transform: hidden ? "translateY(-100%)" : "translateY(0)",
      transition:"transform 0.32s cubic-bezier(.4,0,.2,1)",
    }}>
      {/* Logo — left, clickable to home */}
      <div onClick={onGoHome} style={{ display:"flex", alignItems:"center", gap:8, flex:1, cursor: onGoHome ? "pointer" : "default" }}>
        <LogoMark size={28}/>
        <div>
          <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, fontSize:18, color:theme.text, letterSpacing:"-0.5px" }}>sondal</span>
            <span style={{ fontFamily:"Inter, sans-serif", fontWeight:500, fontSize:12, color:theme.accent }}>.top</span>
          </div>
          <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:8, margin:0, letterSpacing:"0.06em", textTransform:"uppercase" }}>Sonda to argument.</p>
        </div>
      </div>

      {/* NOW! badge — right side, search optically between logo and badge */}
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:6 }}>
          <Search size={18} color={theme.textMuted} strokeWidth={1.8}/>
        </button>
        {nowActive && <div onClick={onShowTrending} style={{ cursor:"pointer" }}><NowBadge/></div>}
      </div>
    </div>
  );
}

// ─── Hero Slider ──────────────────────────────────────────
const SLIDE_IN  = 350;
const SLIDE_HOLD = 9500;
const SLIDE_OUT = 300;

function HeroSlider({ onCreateClick }) {
  const [current, setCurrent]   = useState(0);
  const [phase, setPhase]       = useState("hold"); // "in" | "hold" | "out"
  const [direction, setDir]     = useState(1);       // 1 = left, -1 = right
  const [voted, setVoted]       = useState({});
  const timerRef                = useRef(null);
  const touchStartX             = useRef(null);
  const n                       = heroSlides.length;

  const startCycle = (idx, dir) => {
    clearTimeout(timerRef.current);
    setDir(dir);
    setPhase("in");
    setCurrent(idx);
    timerRef.current = setTimeout(() => {
      setPhase("hold");
      timerRef.current = setTimeout(() => {
        setPhase("out");
        timerRef.current = setTimeout(() => {
          const next = (idx + dir + n) % n;
          startCycle(next, 1);
        }, SLIDE_OUT);
      }, SLIDE_HOLD);
    }, SLIDE_IN);
  };

  useEffect(() => {
    setPhase("hold");
    timerRef.current = setTimeout(() => {
      setPhase("out");
      timerRef.current = setTimeout(() => startCycle(1, 1), SLIDE_OUT);
    }, SLIDE_HOLD);
    return () => clearTimeout(timerRef.current);
  }, []);

  const goTo = (idx) => {
    if (idx === current) return;
    const dir = idx > current ? 1 : -1;
    clearTimeout(timerRef.current);
    setPhase("out");
    timerRef.current = setTimeout(() => startCycle(idx, dir), SLIDE_OUT);
  };

  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) goTo((current + 1) % n);
    else        goTo((current - 1 + n) % n);
  };

  const slide = heroSlides[current];
  const translateX = phase === "in"  ? "0%"
                   : phase === "hold" ? "0%"
                   : direction > 0    ? "-100%"
                   :                   "100%";
  const inTranslate = phase === "in" ? "0%" : direction > 0 ? "100%" : "-100%";
  const opacity = phase === "hold" ? 1 : 0;

  return (
    <div style={{ background: slide.hot ? `linear-gradient(180deg, rgba(232,55,61,0.06) 0%, ${theme.surface} 60%)` : theme.surface, borderBottom:`1px solid ${theme.border}`, padding:"16px 16px 14px", overflow:"hidden", position:"relative" }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* Hot banner */}
      {slide.hot && (
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8, paddingBottom:8, borderBottom:`1px solid ${theme.redBorder}` }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:theme.red, display:"inline-block", animation:"pulsered 1.5s infinite" }}/>
          <span style={{ color:theme.red, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Gorący temat</span>
        </div>
      )}

      {/* Slide content */}
      <div style={{ transform:`translateX(${phase==="in" ? inTranslate : translateX})`, opacity, transition: phase==="hold" ? `transform ${SLIDE_IN}ms cubic-bezier(.22,.68,0,1.2), opacity ${SLIDE_IN}ms ease` : `transform ${SLIDE_OUT}ms ease-in, opacity ${SLIDE_OUT}ms ease` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            <Tag hot={slide.hot}>{slide.tag}</Tag>
            <span style={{ color:theme.textDim, fontSize:10, fontFamily:"Inter, sans-serif" }}>{slide.date}</span>
          </div>
          <span style={{ color:theme.textDim, fontSize:10, fontFamily:"Inter, sans-serif" }}>{current+1}/{n}</span>
        </div>

        <h2 style={{ color: slide.hot ? theme.text : theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:16, fontWeight:700, lineHeight:1.4, margin:"0 0 12px" }}>{slide.title}</h2>
        <MiniBarChart data={slide.chartData} hot={slide.hot}/>

        <div style={{ marginTop:12, borderTop:`1px solid ${slide.hot ? theme.redBorder : theme.border}`, paddingTop:12 }}>
          <p style={{ color: slide.hot ? theme.red : theme.accent, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, margin:"0 0 8px", letterSpacing:"0.05em", textTransform:"uppercase" }}>A jak jest u Ciebie?</p>
          <VoteButtons options={slide.options} split={slide.split} voted={voted[slide.id]??null} onVote={i=>setVoted(v=>({...v,[slide.id]:i}))} hot={slide.hot}/>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
        <span style={{ color:theme.textDim, fontSize:11, fontFamily:"Inter, sans-serif" }}>{slide.votes.toLocaleString()} głosów · 💬 {slide.comments}</span>
        <div style={{ display:"flex", gap:5 }}>
          {heroSlides.map((_,i) => (
            <button key={i} onClick={()=>goTo(i)} style={{ width: i===current?18:6, height:6, borderRadius:3, background: i===current ? (slide.hot?theme.red:theme.accent) : theme.border, border:"none", cursor:"pointer", padding:0, transition:"all 0.3s" }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────
function StatsBar() {
  const trackRef = useRef(null);

  // Slow infinite scroll loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame;
    let pos = 0;
    const speed = 0.4; // px per frame
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    const pause  = () => cancelAnimationFrame(frame);
    const resume = () => { frame = requestAnimationFrame(step); };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause, { passive:true });
    el.addEventListener('touchend',   resume);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend',   resume);
    };
  }, []);

  const StatCard = ({ s }) => (
    <div style={{ background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"10px 12px", flexShrink:0, minWidth:108 }}>
      <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:9, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.label}</p>
      <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
        <span style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:18, fontWeight:800 }}>{s.value}</span>
        <span style={{ color: s.pos===true?theme.green:s.pos===false?theme.red:theme.textDim, fontSize:10, fontFamily:"Inter, sans-serif", fontWeight:600 }}>{s.delta}</span>
      </div>
      <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:9, margin:"3px 0 0" }}>{s.src}</p>
    </div>
  );

  return (
    <div style={{ padding:"12px 0 12px 16px", borderBottom:`1px solid ${theme.border}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, paddingRight:16 }}>
        <div style={{ width:3, height:12, background:theme.accent, borderRadius:2 }}/>
        <span style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Dane oficjalne</span>
      </div>
      {/* Doubled items for seamless loop */}
      <div ref={trackRef} style={{ display:"flex", gap:8, overflowX:"auto", scrollbarWidth:"none", WebkitOverflowScrolling:"touch" }}>
        {[...officialStats, ...officialStats].map((s,i) => <StatCard key={i} s={s}/>)}
        <div style={{ flexShrink:0, width:16 }}/>
      </div>
    </div>
  );
}

// ─── Sonda Detail ─────────────────────────────────────────
function SondaDetail({ poll, onClose }) {
  const [voted, setVoted] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // "all"|"0"|"1"|"2"

  const filteredComments = poll.comments.filter(c =>
    activeTab === "all" ? true : c.vote === parseInt(activeTab)
  );

  return (
    <div style={{ position:"absolute", inset:0, background:theme.bg, display:"flex", flexDirection:"column" }}>

      {/* Header — logo left, share + back right */}
      <div style={{ height:64, padding:"0 16px", borderBottom:`1px solid ${theme.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, background:`${theme.bg}F4`, backdropFilter:"blur(14px)" }}>
        {/* Logo — click to close */}
        <div onClick={onClose} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
          <LogoMark size={28}/>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, fontSize:18, color:theme.text, letterSpacing:"-0.5px" }}>sondal</span>
              <span style={{ fontFamily:"Inter, sans-serif", fontWeight:500, fontSize:12, color:theme.accent }}>.top</span>
            </div>
            <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:8, margin:0, letterSpacing:"0.06em", textTransform:"uppercase" }}>Sonda to argument.</p>
          </div>
        </div>
        {/* Right — share + back */}
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex", alignItems:"center" }}>
            <Share2 size={18} color={theme.textMuted} strokeWidth={1.8}/>
          </button>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex", alignItems:"center" }}>
            <ChevronRight size={22} strokeWidth={2} color={theme.textMuted}/>
          </button>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto" }}>

        {/* Poll card */}
        <div style={{ padding:"14px 16px 18px", borderBottom:`1px solid ${theme.border}` }}>
          {/* Tag row — below header */}
          <div style={{ marginBottom:12 }}>
            <Tag>{poll.tag}</Tag>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:theme.indigo, border:`1px solid ${theme.borderAccent}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:theme.accent, fontWeight:700, flexShrink:0 }}>{poll.avatar}</div>
            <div>
              <span style={{ color:theme.text, fontSize:12, fontFamily:"Inter, sans-serif", fontWeight:600 }}>{poll.user}</span>
              <span style={{ color:theme.textDim, fontSize:11, fontFamily:"Inter, sans-serif", marginLeft:6 }}>{poll.time}</span>
            </div>
          </div>

          <h2 style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:18, fontWeight:700, lineHeight:1.4, margin:"0 0 16px" }}>{poll.question}</h2>

          {/* Vote or results */}
          {voted === null ? (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {poll.options.map((opt,i) => (
                <button key={i} onClick={() => setVoted(i)}
                  style={{ background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"13px 16px", color:theme.text, fontFamily:"Inter, sans-serif", fontSize:14, textAlign:"left", cursor:"pointer", transition:"border-color 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=theme.accent}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=theme.border}
                >{opt}</button>
              ))}
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {poll.options.map((opt,i) => (
                <div key={i}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ color: i===voted ? theme.accentBright : theme.textMuted, fontSize:13, fontFamily:"Inter, sans-serif", fontWeight: i===voted ? 600 : 400 }}>{opt} {i===voted && "✓"}</span>
                    <span style={{ color:theme.textMuted, fontSize:13, fontFamily:"Inter, sans-serif", fontWeight:700 }}>{poll.split[i]}%</span>
                  </div>
                  <div style={{ height:8, background:theme.border, borderRadius:4, overflow:"hidden" }}>
                    <div style={{ width:`${poll.split[i]}%`, height:"100%", background: i===voted ? theme.accent : theme.textDim, borderRadius:4, transition:"width 0.6s ease" }}/>
                  </div>
                </div>
              ))}
              <p style={{ color:theme.textDim, fontSize:12, fontFamily:"Inter, sans-serif", marginTop:4 }}>{poll.totalVotes.toLocaleString()} głosów łącznie</p>
            </div>
          )}
        </div>

        {/* Discussion */}
        <div style={{ padding:"16px 16px 0" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <div style={{ width:3, height:14, background:theme.accent, borderRadius:2 }}/>
            <span style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:15, fontWeight:700 }}>Dyskusja</span>
            <span style={{ color:theme.textDim, fontSize:12, fontFamily:"Inter, sans-serif" }}>({poll.comments.length})</span>
          </div>

          {/* Filter tabs — by vote */}
          {voted !== null && (
            <div style={{ display:"flex", gap:7, marginBottom:14, overflowX:"auto", scrollbarWidth:"none" }}>
              {[
                { key:"all", label:"Wszystkie" },
                ...poll.options.map((opt,i) => ({ key:String(i), label:opt.split(" ")[0]+"…" }))
              ].map(tab => (
                <button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{ background: activeTab===tab.key ? theme.accent : theme.surface, color: activeTab===tab.key ? "#fff" : theme.textMuted, border:"none", borderRadius:20, padding:"5px 12px", fontSize:11, fontFamily:"Inter, sans-serif", fontWeight: activeTab===tab.key ? 700 : 400, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>{tab.label}</button>
              ))}
            </div>
          )}

          {/* Comments */}
          <div style={{ display:"flex", flexDirection:"column", gap:12, paddingBottom:20 }}>
            {filteredComments.map(c => (
              <div key={c.id} style={{ background:theme.surface, borderRadius:12, padding:"12px 14px", border:`1px solid ${theme.border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ display:"flex", gap:7, alignItems:"center" }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:theme.indigo, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:theme.accent, fontWeight:700, flexShrink:0 }}>{c.user[1].toUpperCase()}</div>
                    <div>
                      <span style={{ color:theme.text, fontSize:12, fontFamily:"Inter, sans-serif", fontWeight:600 }}>{c.user}</span>
                      <span style={{ color:theme.textDim, fontSize:10, fontFamily:"Inter, sans-serif", marginLeft:6 }}>{c.time}</span>
                    </div>
                  </div>
                  {/* Vote badge */}
                  <span style={{ background: c.vote === 0 ? `${theme.accent}20` : `${theme.red}15`, color: c.vote === 0 ? theme.accent : theme.red, fontSize:9, fontFamily:"Inter, sans-serif", fontWeight:700, padding:"2px 7px", borderRadius:4, flexShrink:0, letterSpacing:"0.04em" }}>
                    {poll.options[c.vote]?.split(" ")[0]}
                  </span>
                </div>
                <p style={{ color:theme.text, fontFamily:"Inter, sans-serif", fontSize:13, lineHeight:1.55, margin:0 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment input */}
      <div style={{ padding:"10px 16px 16px", borderTop:`1px solid ${theme.border}`, background:theme.bg, display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ flex:1, background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:20, padding:"10px 14px" }}>
          <span style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:13 }}>Dodaj komentarz…</span>
        </div>
        <button style={{ background:theme.accent, border:"none", borderRadius:"50%", width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
          <ChevronRight size={18} color="#fff" strokeWidth={2.5}/>
        </button>
      </div>
    </div>
  );
}

// ─── Trending ─────────────────────────────────────────────
function TrendingSection({ onPollOpen, onShowAll }) {
  return (
    <div style={{ padding:"14px 16px", borderBottom:`1px solid ${theme.border}` }}>
      <div onClick={onShowAll} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, cursor:"pointer" }}>
        <div style={{ width:3, height:12, background:theme.red, borderRadius:2 }}/>
        <span style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Trending NOW</span>
        <span style={{ width:6, height:6, borderRadius:"50%", background:theme.red, display:"inline-block", animation:"pulsered 1.8s infinite" }}/>
        <ChevronRight size={12} color={theme.textDim} strokeWidth={2} style={{ marginLeft:"auto" }}/>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {trendingPolls.map((p,i) => (
          <div key={p.id} onClick={() => onPollOpen && onPollOpen(p.id)}
            style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 12px", background:theme.surface, borderRadius:10, border:`1px solid ${theme.border}`, cursor:"pointer", transition:"border-color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=theme.borderAccent}
            onMouseLeave={e=>e.currentTarget.style.borderColor=theme.border}>
            <span style={{ color:theme.textDim, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:20, fontWeight:800, width:24, textAlign:"center", flexShrink:0 }}>{i+1}</span>
            <div style={{ flex:1 }}>
              <Tag>{p.tag}</Tag>
              <p style={{ color:theme.text, fontFamily:"Inter, sans-serif", fontSize:13, margin:"5px 0 3px", lineHeight:1.4 }}>{p.question}</p>
              <span style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:10 }}>{p.votes.toLocaleString()} głosów</span>
            </div>
            <ChevronRight size={18} color={theme.accent} strokeWidth={1.8}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Poll Card ────────────────────────────────────────────
function PollCard({ poll }) {
  const [voted, setVoted] = useState(null);
  return (
    <div style={{ background:theme.surface, borderRadius:14, padding:"14px 14px 12px", marginBottom:10, border:`1px solid ${theme.border}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:theme.indigo, border:`1px solid ${theme.borderAccent}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:theme.accent, fontWeight:700, flexShrink:0 }}>{poll.avatar}</div>
          <div>
            <span style={{ color:theme.text, fontSize:12, fontFamily:"Inter, sans-serif", fontWeight:600 }}>{poll.user}</span>
            <span style={{ color:theme.textDim, fontSize:11, fontFamily:"Inter, sans-serif", marginLeft:6 }}>{poll.time}</span>
          </div>
        </div>
        <Tag>{poll.tag}</Tag>
      </div>
      <p style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:15, fontWeight:600, lineHeight:1.4, margin:"0 0 12px" }}>{poll.question}</p>
      <VoteButtons options={poll.options} split={poll.baseSplit} voted={voted} onVote={setVoted}/>
      {voted!==null && <p style={{ color:theme.textDim, fontSize:11, margin:"8px 0 0", fontFamily:"Inter, sans-serif" }}>{poll.totalVotes.toLocaleString()} głosów łącznie</p>}
      <div style={{ display:"flex", gap:16, marginTop:10, paddingTop:10, borderTop:`1px solid ${theme.border}` }}>
        <span style={{ color:theme.textDim, fontSize:12, fontFamily:"Inter, sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}><MessageCircle size={13} strokeWidth={1.8}/> Dyskusja</span>
        <span style={{ color:theme.textDim, fontSize:12, fontFamily:"Inter, sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}><Share2 size={13} strokeWidth={1.8}/> Udostępnij</span>
      </div>
    </div>
  );
}


// ─── Ticker Bar ───────────────────────────────────────────
const tickerItems = [
  { label:"USD/PLN", value:"3,942", delta:"+0,012", pos:true },
  { label:"EUR/PLN", value:"4,271", delta:"-0,008", pos:false },
  { label:"GBP/PLN", value:"4,981", delta:"+0,021", pos:true },
  { label:"WIG20",   value:"2 341", delta:"+1,2%",  pos:true },
  { label:"S&P 500", value:"5 487", delta:"+0,4%",  pos:true },
  { label:"DAX",     value:"18 902",delta:"-0,3%",  pos:false },
  { label:"GOLD",    value:"2 318$", delta:"+0,8%", pos:true },
  { label:"BRENT",   value:"83,4$",  delta:"-1,1%", pos:false },
  { label:"BTC",     value:"67 200$",delta:"+2,3%", pos:true },
  { label:"SILVER",  value:"29,1$",  delta:"+0,5%", pos:true },
  { label:"EUR/USD", value:"1,082",  delta:"-0,003",pos:false },
  { label:"COPPER",  value:"4,51$",  delta:"+0,7%", pos:true },
];

function TickerBar() {
  const trackRef = useRef(null);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame, pos = 0;
    const speed = 0.6;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    const pause  = () => cancelAnimationFrame(frame);
    const resume = () => { frame = requestAnimationFrame(step); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive:true });
    el.addEventListener("touchend",   resume);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  const items = [...tickerItems, ...tickerItems]; // double for seamless loop

  return (
    <div style={{ borderBottom:`1px solid ${theme.border}`, background:theme.bg }}>
      <div ref={trackRef} style={{
        display:"flex", alignItems:"center", gap:0,
        overflowX:"auto", scrollbarWidth:"none",
        height:20,
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:6,
            padding:"0 16px", flexShrink:0, height:"100%",
            borderRight:`1px solid ${theme.border}`,
          }}>
            <span style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:9, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{item.label}</span>
            <span style={{ color:theme.text, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:700, whiteSpace:"nowrap" }}>{item.value}</span>
            <span style={{ color: item.pos ? theme.green : theme.red, fontFamily:"Inter, sans-serif", fontSize:9, fontWeight:600, whiteSpace:"nowrap" }}>{item.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Empty States ─────────────────────────────────────────
function EmptyState({ icon, title, subtitle, actionLabel, onAction }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 32px", textAlign:"center" }}>
      <div style={{
        width:64, height:64, borderRadius:20,
        background:theme.accentDim, border:`1px solid ${theme.borderAccent}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:16,
      }}>
        {icon}
      </div>
      <p style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:16, fontWeight:700, margin:"0 0 8px" }}>{title}</p>
      <p style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:13, margin:"0 0 20px", lineHeight:1.6, maxWidth:240 }}>{subtitle}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} style={{ background:theme.accent, color:"#fff", border:"none", borderRadius:10, padding:"11px 22px", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// Skeleton card — for loading states (step 2)
function SkeletonCard() {
  return (
    <div style={{ background:theme.surface, borderRadius:14, padding:"14px", marginBottom:10, border:`1px solid ${theme.border}` }}>
      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:theme.border, animation:"shimmer 1.4s infinite" }}/>
        <div style={{ flex:1 }}>
          <div style={{ height:10, width:"40%", background:theme.border, borderRadius:4, marginBottom:5, animation:"shimmer 1.4s infinite" }}/>
          <div style={{ height:8, width:"25%", background:theme.border, borderRadius:4, animation:"shimmer 1.4s infinite" }}/>
        </div>
      </div>
      <div style={{ height:12, width:"90%", background:theme.border, borderRadius:4, marginBottom:8, animation:"shimmer 1.4s infinite" }}/>
      <div style={{ height:12, width:"70%", background:theme.border, borderRadius:4, marginBottom:14, animation:"shimmer 1.4s infinite" }}/>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ height:38, background:theme.border, borderRadius:9, animation:"shimmer 1.4s infinite" }}/>
        <div style={{ height:38, background:theme.border, borderRadius:9, animation:"shimmer 1.4s infinite" }}/>
      </div>
    </div>
  );
}

// ─── Discover ─────────────────────────────────────────────
function DiscoverScreen({ onGoToCreate, onShowTrending }) {
  const [activeCat, setActiveCat] = useState("#Wszystkie");
  const [detailId,  setDetailId]  = useState(null);
  const [detailAnim, setDetailAnim] = useState("closed");
  const [feedEmpty, setFeedEmpty]   = useState(false);  // demo toggle

  const openDetail = (id) => {
    setDetailId(id);
    setDetailAnim("entering"); // start off-screen
    setTimeout(() => setDetailAnim("open"), 20); // trigger transition
  };
  const closeDetail = () => {
    setDetailAnim("closing");
    setTimeout(() => { setDetailId(null); setDetailAnim("closed"); }, 340);
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <StickyHeader nowActive={true} onCreateClick={onGoToCreate} onShowTrending={onShowTrending} onGoHome={()=>{ setShowTrending(false); setDetailId(null); }}/>
      <div data-scroll-feed style={{ flex:1, overflowY:"auto", position:"relative", paddingTop:64 }}>
        <TickerBar/>
        <HeroSlider onCreateClick={onGoToCreate}/>
        <StatsBar/>
        <TrendingSection onPollOpen={openDetail} onShowAll={onShowTrending}/>
        <div style={{ display:"flex", gap:7, padding:"10px 16px", overflowX:"auto", scrollbarWidth:"none", borderBottom:`1px solid ${theme.border}` }}>
          {categories.map(cat => (
            <button key={cat} onClick={()=>setActiveCat(cat)} style={{ background: activeCat===cat?theme.accent:theme.surface, color: activeCat===cat?"#fff":theme.textMuted, border:`1px solid ${activeCat===cat?"transparent":theme.border}`, borderRadius:20, padding:"6px 13px", fontSize:11, fontFamily:"Inter, sans-serif", fontWeight: activeCat===cat?700:400, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s" }}>{cat}</button>
          ))}
        </div>
        <div style={{ padding:"12px 12px 0" }}>
          {/* Demo toggle — empty state */}
          <button onClick={()=>setFeedEmpty(e=>!e)} style={{ background:"none", border:`1px dashed ${theme.border}`, borderRadius:8, padding:"5px 12px", color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:10, cursor:"pointer", marginBottom:8 }}>
            {feedEmpty ? "▶ Pokaż sondy" : "○ Demo: pusty feed"}
          </button>
          {feedEmpty ? (
            <EmptyState
              icon={<BarChart2 size={28} color={theme.accent} strokeWidth={1.5}/>}
              title="Brak sond w tej kategorii"
              subtitle="Nikt jeszcze nie dodał sondy w tym temacie. Bądź pierwszy!"
              actionLabel="Stwórz sondę"
              onAction={onGoToCreate}
            />
          ) : (
            <>
              {communityPolls.map(poll => <PollCard key={poll.id} poll={poll}/>)}
            </>
          )}
          <div style={{ height:20 }}/>
        </div>
      </div>

      {/* Sonda Detail — slides in from right */}
      {detailId !== null && trendingPollDetails[detailId] && (
        <div style={{
          position:"absolute", inset:0, zIndex:300,
          transform: (detailAnim==="open") ? "translateX(0)" : "translateX(100%)",
          transition: (detailAnim==="open" || detailAnim==="closing")
            ? "transform 0.38s cubic-bezier(.22,.68,0,1.1)"
            : "none",
        }}>
          <SondaDetail poll={trendingPollDetails[detailId]} onClose={closeDetail}/>
        </div>
      )}
    </div>
  );
}

// ─── Creator ──────────────────────────────────────────────
function Toggle({ label, icon, value, onChange }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 0", borderBottom:`1px solid ${theme.border}` }}>
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center" }}>{icon}</div>
        <span style={{ color:theme.text, fontFamily:"Inter, sans-serif", fontSize:14 }}>{label}</span>
      </div>
      <div onClick={()=>onChange(!value)} style={{ width:42, height:24, borderRadius:12, background: value?theme.accent:theme.border, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
        <div style={{ position:"absolute", top:3, left: value?21:3, width:18, height:18, borderRadius:"50%", background: value?"#fff":theme.textDim, transition:"left 0.2s" }}/>
      </div>
    </div>
  );
}

function CreatorScreen({ onSuccess, onClose }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions]   = useState(["",""]);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnon, setIsAnon]     = useState(true);
  const [category, setCategory] = useState("#Lokalne");

  const addOption    = () => { if (options.length<6) setOptions([...options,""]); };
  const removeOption = i  => { if (options.length>2) setOptions(options.filter((_,idx)=>idx!==i)); };
  const updateOption = (i,val) => { const o=[...options]; o[i]=val; setOptions(o); };
  const canGenerate  = question.trim().length>3 && options.filter(o=>o.trim()).length>=2;

  return (
    <>
      <div style={{ height:64, padding:"0 16px", borderBottom:`1px solid ${theme.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, background:`${theme.bg}F4`, backdropFilter:"blur(14px)" }}>
        {/* Logo — identyczne jak w głównym headerze */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <LogoMark size={28}/>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, fontSize:18, color:theme.text, letterSpacing:"-0.5px" }}>sondal</span>
              <span style={{ fontFamily:"Inter, sans-serif", fontWeight:500, fontSize:12, color:theme.accent }}>.top</span>
            </div>
            <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:8, margin:0, letterSpacing:"0.06em", textTransform:"uppercase" }}>Sonda to argument.</p>
          </div>
        </div>
        {/* KREATOR label */}
        <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, fontSize:13, color:theme.accent, letterSpacing:"0.1em" }}>KREATOR</span>
        {/* Close — strzałka w dół */}
        {onClose && (
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", padding:8, color:theme.textMuted, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <ChevronRight size={24} strokeWidth={2} color={theme.textMuted} style={{ transform:"rotate(90deg)" }}/>
          </button>
        )}
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 0" }}>
        <div style={{ marginBottom:16 }}>
          <label style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Pytanie</label>
          <textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="O co chcesz zapytać?" rows={3}
            style={{ width:"100%", background:theme.surface, border:`1.5px solid ${question.trim()?theme.accent:theme.border}`, borderRadius:12, padding:"13px", color:theme.text, fontFamily:"Inter, sans-serif", fontSize:15, lineHeight:1.5, resize:"none", outline:"none" }}/>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Opcje odpowiedzi</label>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {options.map((opt,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
                <div style={{ width:22, height:22, borderRadius:"50%", background:theme.accentDim, border:`1px solid ${theme.borderAccent}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ color:theme.accent, fontSize:10, fontWeight:700 }}>{String.fromCharCode(65+i)}</span>
                </div>
                <input value={opt} onChange={e=>updateOption(i,e.target.value)} placeholder={`Opcja ${String.fromCharCode(65+i)}`}
                  style={{ flex:1, background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:9, padding:"11px 12px", color:theme.text, fontFamily:"Inter, sans-serif", fontSize:14, outline:"none" }}/>
                {options.length>2 && <button onClick={()=>removeOption(i)} style={{ background:"none", border:"none", color:theme.textDim, fontSize:18, cursor:"pointer", padding:"0 4px" }}>×</button>}
              </div>
            ))}
          </div>
          {options.length<6 && <button onClick={addOption} style={{ background:"none", border:`1px dashed ${theme.border}`, borderRadius:9, padding:"10px", width:"100%", color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:13, cursor:"pointer", marginTop:8 }}>+ Dodaj opcję</button>}
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Kategoria</label>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
            {["#Lokalne","#Gospodarka","#Rozrywka","#Edukacja","#Sport"].map(cat => (
              <button key={cat} onClick={()=>setCategory(cat)} style={{ background: category===cat?theme.accent:theme.surface, color: category===cat?"#fff":theme.textMuted, border:`1px solid ${category===cat?"transparent":theme.border}`, borderRadius:20, padding:"6px 12px", fontSize:11, fontFamily:"Inter, sans-serif", fontWeight: category===cat?700:400, cursor:"pointer" }}>{cat}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <Toggle label="Publiczna w portalu" icon={<Eye size={16} color={theme.textMuted} strokeWidth={1.8}/>} value={isPublic} onChange={setIsPublic}/>
          <Toggle label="Anonimowe głosowanie" icon={<Lock size={16} color={theme.textMuted} strokeWidth={1.8}/>} value={isAnon} onChange={setIsAnon}/>
        </div>
        <div style={{ height:80 }}/>
      </div>
      <div style={{ padding:"12px 16px 16px", borderTop:`1px solid ${theme.border}`, background:theme.bg }}>
        {!canGenerate && <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:12, textAlign:"center", margin:"0 0 10px" }}>Wpisz pytanie i co najmniej 2 opcje</p>}
        <button onClick={()=>canGenerate&&onSuccess({question,options:options.filter(o=>o.trim()),isPublic,isAnon,category})}
          style={{ width:"100%", background: canGenerate?theme.accent:theme.surface, color: canGenerate?"#fff":theme.textDim, border:"none", borderRadius:12, padding:"16px", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:16, fontWeight:800, cursor: canGenerate?"pointer":"not-allowed", transition:"all 0.2s" }}>
          Generuj Sondę ⚡
        </button>
      </div>
    </>
  );
}

// ─── Success ──────────────────────────────────────────────
function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:6 }}>{label}</label>
      <div style={{ display:"flex", gap:8 }}>
        <div style={{ flex:1, background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"11px 12px", color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{value}</div>
        <button onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}}
          style={{ background: copied?theme.green:theme.accent, color:"#fff", border:"none", borderRadius:10, padding:"0 16px", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:12, fontWeight:700, cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
          {copied?"✓":"Kopiuj"}
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ pollData, onReset, onGoToDiscover }) {
  const slug = "x/"+Math.random().toString(36).slice(2,7);
  const link = `sondal.top/${slug}`;
  const iframe = `<iframe src="https://sondal.top/${slug}/embed" width="100%" height="320" frameborder="0"></iframe>`;
  return (
    <>
      <StickyHeader nowActive={false}/>
      <div style={{ flex:1, overflowY:"auto", padding:"24px 16px 0" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ width:60, height:60, borderRadius:"50%", background:theme.accentDim, border:`2px solid ${theme.borderAccent}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:26 }}>⚡</div>
          <h2 style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:22, fontWeight:800, margin:"0 0 6px" }}>Sonda gotowa!</h2>
          <p style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:14, margin:0, lineHeight:1.5 }}>Twoja sonda jest aktywna. Udostępnij link lub osadź na stronie.</p>
        </div>
        <div style={{ background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:14, padding:"16px", marginBottom:20 }}>
          <Tag>{pollData.category} • PODGLĄD</Tag>
          <p style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:15, fontWeight:700, margin:"10px 0 12px", lineHeight:1.4 }}>{pollData.question}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {pollData.options.map((opt,i) => (
              <div key={i} style={{ background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:8, padding:"10px 12px", display:"flex", gap:8, alignItems:"center" }}>
                <div style={{ width:18, height:18, borderRadius:"50%", background:theme.accentDim, border:`1px solid ${theme.borderAccent}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:theme.accent, fontSize:9, fontWeight:700 }}>{String.fromCharCode(65+i)}</span>
                </div>
                <span style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:13 }}>{opt}</span>
              </div>
            ))}
          </div>
        </div>
        <CopyField label="Twój link" value={link}/>
        <CopyField label="Kod do osadzenia (iFrame)" value={iframe}/>
        <div style={{ background:`linear-gradient(135deg, ${theme.accentDim}, ${theme.indigoDim})`, border:`1px solid ${theme.borderAccent}`, borderRadius:14, padding:"16px", marginBottom:20 }}>
          <p style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:14, fontWeight:700, margin:"0 0 6px" }}>Chcesz więcej możliwości?</p>
          <p style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:12, margin:"0 0 12px", lineHeight:1.5 }}>Zaloguj się, aby śledzić wyniki na żywo, edytować sondę i eksportować dane do CSV.</p>
          <button style={{ background:theme.accent, color:"#fff", border:"none", borderRadius:8, padding:"10px 18px", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>Zarejestruj się za darmo →</button>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:24 }}>
          <button onClick={onReset} style={{ flex:1, background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"13px", color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:14, cursor:"pointer" }}>+ Nowa sonda</button>
          <button onClick={onGoToDiscover} style={{ flex:1, background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"13px", color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:14, cursor:"pointer" }}>◎ Portal</button>
        </div>
      </div>
    </>
  );
}

// ─── Trending Now Full Screen ─────────────────────────────
function TrendingNowScreen({ onBack, onPollOpen, onNavChange, activeNav }) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:theme.bg }}>
      <div style={{ height:64, padding:"0 16px", borderBottom:`1px solid ${theme.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, background:`${theme.bg}F4`, backdropFilter:"blur(14px)" }}>
        <div onClick={onBack} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
          <LogoMark size={28}/>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, fontSize:18, color:theme.text, letterSpacing:"-0.5px" }}>sondal</span>
              <span style={{ fontFamily:"Inter, sans-serif", fontWeight:500, fontSize:12, color:theme.accent }}>.top</span>
            </div>
            <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:8, margin:0, letterSpacing:"0.06em", textTransform:"uppercase" }}>Sonda to argument.</p>
          </div>
        </div>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:8 }}>
          <ChevronRight size={22} strokeWidth={2} color={theme.textMuted}/>
        </button>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 0" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
          <div style={{ width:3, height:16, background:theme.red, borderRadius:2 }}/>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, fontSize:20, color:theme.text, margin:0 }}>Trending NOW</h2>
          <span style={{ width:7, height:7, borderRadius:"50%", background:theme.red, display:"inline-block", animation:"pulsered 1.8s infinite" }}/>
        </div>

        {/* All trending polls expanded */}
        {[...trendingPolls, ...trendingPolls.map(p => ({ ...p, id:p.id+100, question:"Czy wprowadzenie opłat za wjazd do centrum miast poprawi jakość powietrza?", votes: 3210 }))].map((p,i) => (
          <div key={p.id} onClick={() => onPollOpen && onPollOpen(Math.min(p.id, 12))}
            style={{ background:theme.surface, borderRadius:14, padding:"14px", marginBottom:10, border:`1px solid ${theme.border}`, cursor:"pointer", display:"flex", gap:12, alignItems:"center" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=theme.borderAccent}
            onMouseLeave={e=>e.currentTarget.style.borderColor=theme.border}>
            <span style={{ color: i < 3 ? theme.accent : theme.textDim, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:22, fontWeight:800, width:28, textAlign:"center", flexShrink:0 }}>{i+1}</span>
            <div style={{ flex:1 }}>
              <Tag>{p.tag}</Tag>
              <p style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:14, fontWeight:600, margin:"6px 0 4px", lineHeight:1.4 }}>{p.question}</p>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <span style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:11 }}>{p.votes.toLocaleString()} głosów</span>
                {i < 3 && <span style={{ color:theme.red, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:700 }}>🔴 HOT</span>}
              </div>
            </div>
            <ChevronRight size={18} color={theme.accent} strokeWidth={1.8}/>
          </div>
        ))}
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ─── Discuss Screen ────────────────────────────────────────
function DiscussScreen({ onGoHome }) {
  const tabs = ["Gorące", "Najnowsze", "Moje"];
  const [activeTab, setActiveTab] = useState("Gorące");
  const threads = [
    { id:1,  tag:"#polityka",    title:"4-dniowy tydzień pracy — za czy przeciw?",                    comments:128, votes:9102,  hot:true,  time:"2 godz. temu" },
    { id:2,  tag:"#warszawa",    title:"Rondo przy Dworcu — piesi vs kierowcy. Kto ma rację?",        comments:64,  votes:2341,  hot:true,  time:"3 godz. temu" },
    { id:3,  tag:"#geopolityka", title:"Ormuz — czy grozi nam kryzys paliwowy?",                      comments:44,  votes:9310,  hot:true,  time:"1 godz. temu" },
    { id:4,  tag:"#technologia", title:"AI w miejscu pracy — strach czy szansa?",                     comments:87,  votes:6780,  hot:false, time:"5 godz. temu" },
    { id:5,  tag:"#gospodarka",  title:"Ceny mieszkań — kiedy pęknie bańka?",                         comments:203, votes:4102,  hot:false, time:"8 godz. temu" },
    { id:6,  tag:"#edukacja",    title:"Zadania domowe w podstawówce — za czy przeciw?",              comments:91,  votes:5203,  hot:false, time:"6 godz. temu" },
    { id:7,  tag:"#finanse",     title:"Oszczędności — złotówki, euro czy krypto?",                   comments:156, votes:6614,  hot:false, time:"7 godz. temu" },
    { id:8,  tag:"#miasto",      title:"Drogi rowerowe w Twoim mieście — wystarczające?",             comments:38,  votes:3871,  hot:false, time:"9 godz. temu" },
    { id:9,  tag:"#polityka",    title:"Ordery dla ukraińskich żołnierzy — gest solidarności?",       comments:312, votes:12840, hot:true,  time:"dziś" },
    { id:10, tag:"#gospodarka",  title:"Inflacja spada, ale Polacy tego nie czują — dlaczego?",       comments:178, votes:3917,  hot:false, time:"wczoraj" },
    { id:11, tag:"#technologia", title:"OpenAI wyceniony na 300 mld — bańka czy nowa infrastruktura?",comments:267, votes:7654,  hot:false, time:"wczoraj" },
  ];

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>
      <StickyHeader nowActive={false} onGoHome={onGoHome}/>
      <div style={{ flex:1, overflowY:"auto", paddingTop:64, WebkitOverflowScrolling:"touch", minHeight:0 }}>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:`1px solid ${theme.border}`, padding:"0 16px" }}>
          {tabs.map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{ background:"none", border:"none", borderBottom: activeTab===tab ? `2px solid ${theme.accent}` : "2px solid transparent", padding:"12px 16px", color: activeTab===tab ? theme.accent : theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:13, fontWeight: activeTab===tab ? 600 : 400, cursor:"pointer", transition:"all 0.15s" }}>{tab}</button>
          ))}
        </div>

        <div style={{ padding:"12px 12px 0" }}>
          {activeTab === "Moje" ? (
            <EmptyState
              icon={<MessageCircle size={28} color={theme.accent} strokeWidth={1.5}/>}
              title="Nie masz jeszcze dyskusji"
              subtitle="Zagłosuj w sondzie i dodaj komentarz — Twoje wątki pojawią się tutaj."
              actionLabel="Zaloguj się"
              onAction={()=>{}}
            />
          ) : threads.map(t => (
            <div key={t.id} style={{ background:theme.surface, borderRadius:14, padding:"14px", marginBottom:10, border:`1px solid ${t.hot ? theme.redBorder : theme.border}`, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <Tag hot={t.hot}>{t.tag}</Tag>
                <span style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:11 }}>{t.time}</span>
              </div>
              <p style={{ color:theme.text, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:15, fontWeight:600, lineHeight:1.4, margin:"0 0 10px" }}>{t.title}</p>
              <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                <span style={{ color:theme.textDim, fontSize:12, fontFamily:"Inter, sans-serif", display:"flex", alignItems:"center", gap:4 }}>
                  <MessageCircle size={13} strokeWidth={1.8}/> {t.comments}
                </span>
                <span style={{ color:theme.textDim, fontSize:12, fontFamily:"Inter, sans-serif" }}>{t.votes.toLocaleString()} głosów</span>
              </div>
            </div>
          ))}
          {activeTab !== "Moje" && <div style={{ background:theme.surface, borderRadius:14, padding:"20px", textAlign:"center", border:`1px dashed ${theme.border}` }}>
            <MessageCircle size={28} color={theme.textDim} strokeWidth={1.5}/>
            <p style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:13, margin:"10px 0 14px", lineHeight:1.5 }}>Zaloguj się, aby komentować sondy i brać udział w dyskusjach.</p>
            <button style={{ background:theme.accent, color:"#fff", border:"none", borderRadius:10, padding:"10px 20px", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>Zaloguj się →</button>
          </div>}
          <div style={{ height:20 }}/>
        </div>
      </div>
    </div>
  );
}

// ─── Login Screen ──────────────────────────────────────────
function LoginScreen({ onGoHome }) {
  const [mode, setMode] = useState("login"); // "login"|"register"
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
      <StickyHeader nowActive={false} onGoHome={onGoHome}/>
      <div style={{ flex:1, overflowY:"auto", paddingTop:64, padding:"80px 24px 24px" }}>

        {/* Logo mark centered */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:64, height:64, borderRadius:20, background:theme.accentDim, border:`1px solid ${theme.borderAccent}`, marginBottom:16 }}>
            <LogoMark size={44}/>
          </div>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, fontSize:22, color:theme.text, margin:"0 0 6px" }}>
            {mode==="login" ? "Witaj z powrotem" : "Dołącz do sondal.top"}
          </h2>
          <p style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:14, margin:0 }}>
            {mode==="login" ? "Zaloguj się do swojego konta" : "Sonda to argument. Zacznij teraz."}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display:"flex", background:theme.surface, borderRadius:12, padding:4, marginBottom:24 }}>
          {["login","register"].map(m => (
            <button key={m} onClick={()=>setMode(m)} style={{ flex:1, background: mode===m ? theme.accent : "none", border:"none", borderRadius:9, padding:"10px", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:13, fontWeight:700, color: mode===m ? "#fff" : theme.textMuted, cursor:"pointer", transition:"all 0.2s" }}>
              {m==="login" ? "Zaloguj się" : "Zarejestruj się"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:16 }}>
          {mode==="register" && (
            <div>
              <label style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Nazwa użytkownika</label>
              <input placeholder="@twoja_nazwa" style={{ width:"100%", background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"13px 14px", color:theme.text, fontFamily:"Inter, sans-serif", fontSize:14, outline:"none" }}/>
            </div>
          )}
          <div>
            <label style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Email</label>
            <input type="email" placeholder="twoj@email.pl" style={{ width:"100%", background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"13px 14px", color:theme.text, fontFamily:"Inter, sans-serif", fontSize:14, outline:"none" }}/>
          </div>
          <div>
            <label style={{ color:theme.textMuted, fontFamily:"Inter, sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Hasło</label>
            <input type="password" placeholder="••••••••" style={{ width:"100%", background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:10, padding:"13px 14px", color:theme.text, fontFamily:"Inter, sans-serif", fontSize:14, outline:"none" }}/>
          </div>
        </div>

        {mode==="login" && (
          <div style={{ textAlign:"right", marginBottom:20 }}>
            <span style={{ color:theme.accent, fontFamily:"Inter, sans-serif", fontSize:13, cursor:"pointer" }}>Zapomniałem hasła</span>
          </div>
        )}

        <button style={{ width:"100%", background:theme.accent, color:"#fff", border:"none", borderRadius:12, padding:"16px", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:16, fontWeight:800, cursor:"pointer", marginBottom:20 }}>
          {mode==="login" ? "Zaloguj się" : "Utwórz konto"} →
        </button>

        {/* Divider */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:theme.border }}/>
          <span style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:12 }}>lub</span>
          <div style={{ flex:1, height:1, background:theme.border }}/>
        </div>

        {/* Social login */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {["Google","Apple"].map(provider => (
            <button key={provider} style={{ width:"100%", background:theme.surface, color:theme.text, border:`1px solid ${theme.border}`, borderRadius:12, padding:"14px", fontFamily:"Inter, sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              <span style={{ fontSize:18 }}>{provider==="Google"?"G":"🍎"}</span>
              Kontynuuj z {provider}
            </button>
          ))}
        </div>

        <p style={{ color:theme.textDim, fontFamily:"Inter, sans-serif", fontSize:11, textAlign:"center", marginTop:24, lineHeight:1.6 }}>
          Rejestrując się akceptujesz{" "}
          <span style={{ color:theme.accent, cursor:"pointer" }}>Regulamin</span> i{" "}
          <span style={{ color:theme.accent, cursor:"pointer" }}>Politykę prywatności</span>
        </p>
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────
function BottomNav({ active, setActive }) {
  const items = [
    { id:"discover", icon:<BarChart2 size={20} strokeWidth={1.8}/>, label:"Odkrywaj" },
    { id:"create",   icon:<Plus size={22} strokeWidth={2.5}/>, label:"Utwórz", main:true },
    { id:"discuss",  icon:<MessageCircle size={20} strokeWidth={1.8}/>, label:"Dyskusje" },
    { id:"account",  icon:<User size={20} strokeWidth={1.8}/>, label:"Konto" },
  ];
  return (
    <div style={{ position:"sticky", bottom:0, background:`${theme.surface}F5`, backdropFilter:"blur(12px)", borderTop:`1px solid ${theme.border}`, display:"flex", justifyContent:"space-around", padding:"10px 0 14px", zIndex:100 }}>
      {items.map(item => (
        <button key={item.id} onClick={()=>setActive(item.id)} style={{ background: item.main?theme.accent:"transparent", border:"none", borderRadius: item.main?12:0, padding: item.main?"8px 20px":"4px 12px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <div style={{ color: item.main?"#fff":(active===item.id?theme.accent:theme.textDim), display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>{item.icon}</div>
          <span style={{ fontSize:10, fontFamily:"Inter, sans-serif", color: item.main?"#fff":(active===item.id?theme.accent:theme.textDim), fontWeight: item.main?700:(active===item.id?600:400) }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────
export default function SondalApp() {
  const [activeNav,    setActiveNav]    = useState("discover");
  const [creatorStep,  setCreatorStep]  = useState("form");
  const [pollData,     setPollData]     = useState(null);
  const [creatorOpen,  setCreatorOpen]  = useState(false);
  const [creatorAnim,  setCreatorAnim]  = useState("closed");
  const [showTrending, setShowTrending] = useState(false);
  const [trendingDetailId, setTrendingDetailId] = useState(null);
  const [trendingDetailAnim, setTrendingDetailAnim] = useState("closed");

  const openTrendingDetail = (id) => {
    setTrendingDetailId(id);
    setTrendingDetailAnim("entering");
    setTimeout(() => setTrendingDetailAnim("open"), 20);
  };
  const closeTrendingDetail = () => {
    setTrendingDetailAnim("closing");
    setTimeout(() => { setTrendingDetailId(null); setTrendingDetailAnim("closed"); }, 360);
  };

  // Open creator sheet from bottom
  const openCreator = () => {
    setCreatorStep("form");
    setCreatorOpen(true);
    setCreatorAnim("opening");
    setTimeout(() => setCreatorAnim("open"), 20); // trigger CSS transition
  };

  // Close creator sheet back down
  const closeCreator = () => {
    setCreatorAnim("closing");
    setTimeout(() => { setCreatorOpen(false); setCreatorAnim("closed"); }, 380);
  };

  const handleNavChange = (id) => {
    if (id === "create") { openCreator(); return; }
    setActiveNav(id);
  };

  const handleSuccess = data => { setPollData(data); setCreatorStep("success"); };
  const handleReset   = () => { setPollData(null); setCreatorStep("form"); };
  const handleGoToDiscover = () => { closeCreator(); setActiveNav("discover"); };

  const isOpen   = creatorAnim === "open" || creatorAnim === "opening";
  const sheetY   = creatorAnim === "open" ? "0%" : "100%";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        @keyframes pulsered { 0%{box-shadow:0 0 0 0 rgba(232,55,61,0.7)} 70%{box-shadow:0 0 0 6px rgba(232,55,61,0)} 100%{box-shadow:0 0 0 0 rgba(232,55,61,0)} }
        @keyframes shimmer { 0%{opacity:1} 50%{opacity:0.4} 100%{opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; }
        textarea:focus, input:focus { border-color:#3B7DD8 !important; }
        ::-webkit-scrollbar { width:3px; height:3px; }
        ::-webkit-scrollbar-thumb { background:#2A2D3A; border-radius:2px; }
      `}</style>

      <div style={{ background:theme.bg, height:"100dvh", maxWidth:430, margin:"0 auto", display:"flex", flexDirection:"column", fontFamily:"Inter, sans-serif", overflow:"hidden", position:"relative" }}>

        {/* ── Main screens ── */}
        <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column",
          overflow:"hidden",
        }}>
          {activeNav==="discover" && <DiscoverScreen onGoToCreate={openCreator} onShowTrending={()=>setShowTrending(true)}/>}
          {activeNav==="discuss" && <DiscussScreen onGoHome={()=>{setActiveNav("discover"); setShowTrending(false);}}/>}
          {activeNav==="account" && <LoginScreen onGoHome={()=>{setActiveNav("discover"); setShowTrending(false);}}/>}

          {/* Trending NOW full screen — triggered by NOW! badge or section title */}
          {showTrending && (
            <div style={{ position:"absolute", inset:0, zIndex:200, background:theme.bg }}>
              <TrendingNowScreen onBack={()=>setShowTrending(false)} onPollOpen={openTrendingDetail} onNavChange={handleNavChange} activeNav={activeNav}/>
            </div>
          )}

          {/* Trending detail over trending full screen */}
          {trendingDetailId !== null && trendingPollDetails[trendingDetailId] && (
            <div style={{
              position:"absolute", inset:0, zIndex:250,
              transform: trendingDetailAnim==="open" ? "translateX(0)" : "translateX(100%)",
              transition: (trendingDetailAnim==="open" || trendingDetailAnim==="closing") ? "transform 0.38s cubic-bezier(.22,.68,0,1.1)" : "none",
            }}>
              <SondaDetail poll={trendingPollDetails[trendingDetailId]} onClose={closeTrendingDetail}/>
            </div>
          )}
        </div>

        {/* ── Bottom Sheet — Creator ── */}
        {creatorOpen && (
          <>
            {/* Sheet — full screen */}
            <div style={{
              position:"absolute", inset:0, zIndex:500,
              background:theme.bg,
              display:"flex", flexDirection:"column",
              transform:`translateY(${sheetY})`,
              transition:"transform 0.4s cubic-bezier(.4,0,.2,1)",
            }}>
              <div style={{ flexShrink:0, height:0 }}/>

              {/* Content */}
              <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column" }}>
                {creatorStep==="form" && <CreatorScreen onSuccess={handleSuccess} onClose={closeCreator}/>}
                {creatorStep==="success" && <SuccessScreen pollData={pollData} onReset={handleReset} onGoToDiscover={handleGoToDiscover}/>}
              </div>
            </div>
          </>
        )}

        {/* ── Navbar ── */}
        <BottomNav active={creatorOpen ? "create" : activeNav} setActive={handleNavChange}/>
      </div>
    </>
  );
}

