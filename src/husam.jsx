import { useState, useEffect, useRef } from "react";

// ============================================================
//  ✏️  EDIT YOUR GAME DATA HERE
// ============================================================
const TEAM_NAMES = ["الفريق الأول", "الفريق الثاني"];

const CATEGORIES = [
  // {
  //   name: "لعبة الصور",
  //   emoji: "🐪",
  //   questions: [
  //     { points: 200, q: "", a: "زرقاء اليمامة",    img: "/images/31200.jpeg" },
  //     { points: 400, q: "", a: "الصبر مفتاح الفرج", img: "/images/31400.jpeg" },
  //     { points: 600, q: "", a: "سبق السيف العذل",   img: "/images/31600.jpeg" },
  //     { points: 200, q: "", a: "الفرزدق",           img: "/images/32200.jpeg" },
  //     { points: 400, q: "", a: "ابن خلدون",         img: "/images/32400.jpeg" },
  //     { points: 600, q: "", a: "برشلونة",           img: "/images/32600.jpeg" },
  //   ],
  // },
  {
    name: "لعبة الصور",
    emoji: "🐪",
    questions: [
      { points: 200, q: "", a: "شورما",    img: "/images/11200.jpeg" },
      { points: 400, q: "", a: "عقدة نقص", img: "/images/11400.jpeg" },
      { points: 600, q: "", a: "عباس بن فرناس",   img: "/images/11600.jpeg" },
      { points: 200, q: "", a: "فلسطين",           img: "/images/12200.jpeg" },
      { points: 400, q: "", a: "ما كل ما يتمنى المرء يدركة",         img: "/images/12400.jpeg" },
      { points: 600, q: "", a: "منجنيق",           img: "/images/12600.jpeg" },
    ],
  },
  // {
  //   name: "لعبة الصور",
  //   emoji: "🐪",
  //   questions: [
  //     { points: 200, q: "", a: "الوقت كالسيف ان لم تقطعة قطعك",    img: "/images/21200.jpeg" },
  //     { points: 400, q: "", a: "شطرنج", img: "/images/21400.jpeg" },
  //     { points: 600, q: "", a: "عمر المختار",   img: "/images/21600.jpeg" },
  //     { points: 200, q: "", a: "الحرب الباردة",           img: "/images/22200.jpeg" },
  //     { points: 400, q: "", a: "نابليون",         img: "/images/22400.jpeg" },
  //     { points: 600, q: "", a: "مايك تايسون",           img: "/images/22600.jpeg" },
  //   ],
  // },
  {
    name: "دينية",
    emoji: "🕌",
    questions: [
      { points: 200, q: "اكثر نبي ذكر في القران؟", a: "موسى" },
      { points: 400, q: "السورة التي تسمى قلب القران؟", a: "يس" },
      { points: 600, q: "معنى تؤزهم ازا؟", a: "تحركهم بشده" },
      { points: 200, q: "ماهو الكوثر؟", a: "نهر في الجنه أعطاه الله للنبي" },
      { points: 400, q: "معنى كلمة ضيزى؟", a: "قسمة ظالمة" },
      { points: 600, q: "معنى الرقيم؟", a: "اللوح المكتوب" },
    ],
  },
  // {
  //   name: "دينية",
  //   emoji: "🕌",
  //   questions: [
  //     { points: 200, q: "معنى الفلق؟", a: "الصباح" },
  //     { points: 400, q: "معنى الزبانية؟", a: "ملائكة العذاب" },
  //     { points: 600, q: "من الذي رافق موسى في رحلته للخضر؟", a: "يوشع" },
  //     { points: 200, q: "السورة التي تسمى بقلب القران؟", a: "يس" },
  //     { points: 400, q: "معنى المزن؟", a: "السحاب" },
  //     { points: 600, q: "معنى كلمة فومها؟", a: "قمح" },
  //   ],
  // },
  // {
  //   name: "دينية",
  //   emoji: "🕌",
  //   questions: [
  //     { points: 200, q: "اول سورة نزلت في القران؟", a: "العلق" },
  //     { points: 400, q: "معنى كلمة سجيل؟", a: "طين متحجر محرق بالنار" },
  //     { points: 600, q: "معنى المُهل؟", a: "النحاس المذاب" },
  //     { points: 200, q: "من هو النبي المسمى إسرائيل؟", a: "يعقوب" },
  //     { points: 400, q: "معنى كلمة امشاج؟", a: "اخلاط" },
  //     { points: 600, q: "معنى السامدون؟", a: "اللاهون الغافلون" },
  //   ],
  // },
  {
    name: "معلومات عامة",
    emoji: "🌍",
    questions: [
      { points: 200, q: "من مخترع المصباح؟", a: "اديسون" },
      { points: 400, q: "عدد لاعبين كرة السلة؟", a: "5" },
      { points: 600, q: 'من القائل "قربا نربط النعامة مني لقحت حرب وائل عن حيالي"؟', a: "الحارث بن عباد" },
      { points: 200, q: "مؤسس علم الجبر؟", a: "الخوارزمي" },
      { points: 400, q: "اسم اول جامعة في العالم؟", a: "القرويين" },
      { points: 600, q: "الكوكب صاحب اكبر عدد اقمار؟", a: "زحل" },
    ],
  },
  // {
  //   name: "معلومات عامة",
  //   emoji: "🌍",
  //   questions: [
  //     { points: 200, q: "ماهو اكبر محيط في العالم؟", a: "الهادئ" },
  //     { points: 400, q: "ماهو المكان الذي لا يصله الدم في الجسم؟", a: "العين" },
  //     { points: 600, q: "الكوكب الذي يومه أطول من سنته؟", a: "الزهرة" },
  //     { points: 200, q: "اكبر كوكب في المجموعة الشمسية؟", a: "المشتري" },
  //     { points: 400, q: "الحيوان الذي لا يصدر اي صوت؟", a: "الزرافة" },
  //     { points: 600, q: "العلم الذي يدرس الزلازل؟", a: "السيزمولوجيا" },
  //   ],
  // },
  // {
  //   name: "معلومات عامة",
  //   emoji: "🌍",
  //   questions: [
  //     { points: 200, q: "اطول نهر في العالم؟", a: "النيل" },
  //     { points: 400, q: "اسرع مخلوق في الارض؟", a: "الشاهين" },
  //     { points: 600, q: "الحيوان الذي لا يملك معدة؟", a: "فرس النهر" },
  //     { points: 200, q: "المعدن السائل في درجة حرارة الغرفة؟", a: "الزئبق" },
  //     { points: 400, q: "الغاز الأكثر وفرة في الغلاف الجوي؟", a: "النيتروجين" },
  //     { points: 600, q: "من هو مكتشف الدورة الدموية الصغرى؟", a: "ابن النفيس" },
  //   ],
  // },
  {
    name: "جغرافيا",
    emoji: "📍",
    questions: [
      { points: 200, q: "أصغر دولة في العالم؟", a: "الفاتيكان" },
      { points: 400, q: "الدولة التي تملك اكبر مخزون نفط مؤكد؟", a: "فنزويلا" },
      { points: 600, q: "اكبر دولة حبيسة لا تملك اي اتصال بالبحر؟", a: "كازاخستان" },
      { points: 200, q: "الدولة التي تقع بين قارتين؟", a: "تركيا" },
      { points: 400, q: "الدولة التي انفصلت عن باكستان 1971؟", a: "بنغلادش" },
      { points: 600, q: "كم عدد الدول التي تعتبر اللغة العربية لغة رسمية؟", a: "24" },
    ],
  },
  // {
  //   name: "جغرافيا",
  //   emoji: "📍",
  //   questions: [
  //     { points: 200, q: "في اي دولة وقعت معركة حطين؟", a: "فلسطين" },
  //     { points: 400, q: "تاريخ الحرب العالمية الاولى (متى بدأت وانتهت)؟", a: "1914-1918" },
  //     { points: 600, q: "الدولة التي تعرف بدولة الارز؟", a: "لبنان" },
  //     { points: 200, q: "المضيق الذي يفصل اسبانيا والمغرب؟", a: "جبل طارق" },
  //     { points: 400, q: "في اي مدينة تم القاء القنبلة النووية الثانية؟", a: "ناغازاكي" },
  //     { points: 600, q: "الدولة التي تملك اكبر عدد براكين نشطة؟", a: "إندونيسيا" },
  //   ],
  // },
  // {
  //   name: "جغرافيا",
  //   emoji: "📍",
  //   questions: [
  //     { points: 200, q: "العملة الرسمية في البرازيل؟", a: "الريال" },
  //     { points: 400, q: "أطول سلسلة جبال؟", a: "الانديز" },
  //     { points: 600, q: "الدولة التي تملك اكبر عدد مناطق زمنية؟", a: "فرنسا" },
  //     { points: 200, q: "الدولة صاحبة اكبر غابة؟", a: "البرازيل" },
  //     { points: 400, q: "الدولة التي تمنع العلكة؟", a: "سنغافورة" },
  //     { points: 600, q: "الدولة صاحبة اكبر عدد جزر في العالم؟", a: "السويد" },
  //   ],
  // },
  // {
  
  // {
  //   name: "شخصيات",
  //   emoji: "👤",
  //   questions: [
  //     { points: 200, q: "بيعطيك حسام", a: "ثانوس" },
  //     { points: 400, q: "بيعطيك حسام", a: "ايلون ماسك" },
  //     { points: 600, q: "بيعطيك حسام", a: "معاوية بن ابي سفيان" },
  //     { points: 200, q: "بيعطيك حسام", a: "مايكل جاكسون" },
  //     { points: 400, q: "بيعطيك حسام", a: "عثمان الخميس" },
  //     { points: 600, q: "بيعطيك حسام", a: "جنكيز خان" },
  //   ],
  // },
  // {
  //   name: "شخصيات",
  //   emoji: "👤",
  //   questions: [
  //     { points: 200, q: "بيعطيك حسام", a: "محمد علي" },
  //     { points: 400, q: "بيعطيك حسام", a: "هرقل" },
  //     { points: 600, q: "بيعطيك حسام", a: "ابن بطوطة" },
  //     { points: 200, q: "بيعطيك حسام", a: "آينشتاين" },
  //     { points: 400, q: "بيعطيك حسام", a: "صلاح الدين الايوبي" },
  //     { points: 600, q: "بيعطيك حسام", a: "اوبينهايمر" },
  //   ],
  // },
];

const MAIN_TIMER = 90;
const STEAL_TIMER = 40;

// ============================================================
//  STYLES
// ============================================================
const S = {
  root: {
    direction: "rtl",
    fontFamily: "'Cairo', 'Tajawal', Arial, sans-serif",
    background: "#1a1a2e",
    minHeight: "100vh",
    color: "#fff",
    userSelect: "none",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#111",
    padding: "0 20px",
    height: 64,
    borderBottom: "2px solid #333",
  },
  logo: { fontSize: 28, fontWeight: 900, color: "#ff6b2b", letterSpacing: 2 },
  teamTurnBadge: {
    background: "#ff6b2b",
    borderRadius: 30,
    padding: "8px 22px",
    fontWeight: 700,
    fontSize: 16,
  },
  topBtn: {
    background: "transparent",
    border: "1px solid #555",
    color: "#ccc",
    borderRadius: 8,
    padding: "6px 16px",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  board: { padding: "24px 20px", maxWidth: 1300, margin: "0 auto" },
boardGrid: { display: "grid", gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)`, gap: 10 },  catHeader: {
    background: "#ff6b2b",
    borderRadius: 12,
    padding: "12px 8px",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 2,
  },
  qCell: (used, points) => ({
    background: used ? "#2a2a2a" : points === 600 ? "#1e3a5f" : points === 400 ? "#1a2e4a" : "#16253b",
    border: used ? "2px solid #333" : "2px solid #2d5986",
    borderRadius: 10,
    padding: "14px 8px",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 18,
    color: used ? "#444" : points === 600 ? "#ffd700" : points === 400 ? "#87ceeb" : "#7ec8e3",
    cursor: used ? "not-allowed" : "pointer",
    transition: "transform 0.1s, background 0.2s",
    minHeight: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  scoresBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    padding: "16px 20px",
    background: "#111",
    borderRadius: 14,
    border: "1px solid #333",
  },
  scoreCard: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: active ? "#ff6b2b22" : "transparent",
    border: active ? "2px solid #ff6b2b" : "2px solid #333",
    borderRadius: 12,
    padding: "10px 22px",
  }),
  scoreTeamName: { fontWeight: 700, fontSize: 18, color: "#ff6b2b" },
  scorePoints: { fontSize: 28, fontWeight: 900, color: "#fff", minWidth: 60, textAlign: "center" },
  scoreAdjustBtn: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "1px solid #555",
    background: "#222",
    color: "#fff",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    padding: 0,
  },
  questionWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 64px)",
    padding: 32,
  },
  stealBanner: {
    background: "#c0392b",
    borderRadius: 12,
    padding: "8px 28px",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 14,
  },
  questionCard: {
    background: "#111827",
    border: "3px solid #ff6b2b",
    borderRadius: 20,
    padding: "36px 48px",
    maxWidth: 820,
    width: "100%",
    textAlign: "center",
    marginBottom: 24,
  },
  questionText: { fontSize: 26, fontWeight: 700, lineHeight: 1.7, color: "#fff" },
  answerText: {
    fontSize: 22,
    color: "#ffd700",
    fontWeight: 700,
    marginTop: 20,
    padding: "12px 0",
    borderTop: "1px solid #333",
  },
  pointsBadge: {
    background: "#ff6b2b",
    borderRadius: 30,
    padding: "6px 20px",
    fontWeight: 900,
    fontSize: 18,
    marginBottom: 16,
    display: "inline-block",
  },
  btnRow: { display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 10 },
  btn: (color) => ({
    background: color,
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "opacity 0.2s",
    minWidth: 140,
  }),
  resultWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 64px)",
    padding: 32,
    textAlign: "center",
  },
  resultEmoji: { fontSize: 72, marginBottom: 10 },
  resultTitle: { fontSize: 32, fontWeight: 900, marginBottom: 8 },
  resultSub: { fontSize: 18, color: "#aaa", marginBottom: 30 },
  finalCard: {
    background: "#111827",
    border: "3px solid #ffd700",
    borderRadius: 24,
    padding: "60px 80px",
    textAlign: "center",
  },
  crownText: { fontSize: 80, marginBottom: 10 },
  winnerName: { fontSize: 42, fontWeight: 900, color: "#ffd700" },
  winnerScore: { fontSize: 26, color: "#aaa", marginTop: 6 },
};

// ============================================================
//  FULLSCREEN IMAGE MODAL
// ============================================================
function ImageModal({ src, onClose }) {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.93)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <img
        src={src}
        alt="fullscreen"
        style={{
          maxWidth: "92vw",
          maxHeight: "92vh",
          borderRadius: 18,
          border: "3px solid #ff6b2b",
          objectFit: "contain",
          boxShadow: "0 0 60px #ff6b2b55",
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          background: "#ff6b2b",
          border: "none",
          borderRadius: 10,
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          padding: "8px 22px",
          cursor: "pointer",
          fontFamily: "'Cairo', sans-serif",
          zIndex: 10000,
        }}
      >
        ✕ إغلاق
      </button>
    </div>
  );
}

// ============================================================
//  TIMER
// ============================================================
function useTimer() {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);
  const onEndRef = useRef(null);

  const stop = () => {
    clearInterval(intervalRef.current);
    setActive(false);
  };

  const startWith = (seconds, onEnd) => {
    clearInterval(intervalRef.current);
    onEndRef.current = onEnd;
    setTime(seconds);
    setActive(true);
    let remaining = seconds;
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setTime(0);
        setActive(false);
        if (onEndRef.current) onEndRef.current();
      } else {
        setTime(remaining);
      }
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setActive(false);
  };

  const resume = () => {
    if (active) return;
    setActive(true);
    let remaining = null;
    setTime((t) => { remaining = t; return t; });
    setTimeout(() => {
      setTime((t) => { remaining = t; return t; });
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(intervalRef.current);
          setTime(0);
          setActive(false);
          if (onEndRef.current) onEndRef.current();
        } else {
          setTime(remaining);
        }
      }, 1000);
    }, 0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);
  return { time, active, startWith, pause, resume, stop };
}

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// ============================================================
//  MAIN COMPONENT
// ============================================================
export default function SeenJeemGame() {
  const [screen, setScreen] = useState("setup");
  const [teams, setTeams] = useState([...TEAM_NAMES]);
  const [scores, setScores] = useState([0, 0]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState({});
  const [activeQ, setActiveQ] = useState(null);
  const [phase, setPhase] = useState("main");
  const [stealTeam, setStealTeam] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [resultInfo, setResultInfo] = useState(null);
  const [setupNames, setSetupNames] = useState([...TEAM_NAMES]);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  // score adjust amount per team (dropdown)

  const timer = useTimer();

  const phaseRef = useRef(phase);
  const activeQRef = useRef(activeQ);
  const currentTeamRef = useRef(currentTeam);
  const setPhaseRef = useRef(setPhase);
  const setStealTeamRef = useRef(setStealTeam);
  const setShowAnswerRef = useRef(setShowAnswer);
  const setResultInfoRef = useRef(setResultInfo);
  const timerRef = useRef(timer);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { activeQRef.current = activeQ; }, [activeQ]);
  useEffect(() => { currentTeamRef.current = currentTeam; }, [currentTeam]);
  timerRef.current = timer;

  const startMainTimer = () => {
    timer.startWith(MAIN_TIMER, () => {
      if (phaseRef.current === "main") {
        const other = 1 - currentTeamRef.current;
        setStealTeamRef.current(other);
        setPhaseRef.current("steal");
        phaseRef.current = "steal";
        timerRef.current.startWith(STEAL_TIMER, () => {
          setPhaseRef.current("done");
          phaseRef.current = "done";
          setShowAnswerRef.current(true);
          setResultInfoRef.current({ type: "noone", points: activeQRef.current.points });
        });
      }
    });
  };

  const adjustScore = (teamIdx, delta) => {
    setScores((prev) => {
      const next = [...prev];
      next[teamIdx] = next[teamIdx] + delta;
      return next;
    });
  };

  const otherTeam = 1 - currentTeam;
  const totalQ = CATEGORIES.reduce((s, c) => s + c.questions.length, 0);
  const usedCount = Object.keys(usedQuestions).length;
  const gameOver = usedCount >= totalQ;

  // ── SETUP ────────────────────────────────────────────────
  if (screen === "setup") {
    return (
      <div style={{ ...S.root, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');`}</style>
        <div style={{ background: "#111827", border: "3px solid #ff6b2b", borderRadius: 24, padding: "52px 60px", minWidth: 380, textAlign: "center" }}>
          <div style={S.logo}>حسام قيمز 🎯</div>
          <div style={{ color: "#aaa", marginBottom: 32, marginTop: 6 }}>أدخل أسماء الفريقين</div>
          {[0, 1].map((i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontWeight: 700, color: "#ff6b2b", marginBottom: 6 }}>
                الفريق {i === 0 ? "الأول" : "الثاني"}
              </label>
              <input
                value={setupNames[i]}
                onChange={(e) => { const n = [...setupNames]; n[i] = e.target.value; setSetupNames(n); }}
                style={{
                  background: "#1a1a2e", border: "2px solid #333", color: "#fff",
                  borderRadius: 10, padding: "10px 16px", fontSize: 18, width: "100%",
                  fontFamily: "inherit", outline: "none", textAlign: "center",
                }}
              />
            </div>
          ))}
          <button
            style={{ ...S.btn("#ff6b2b"), marginTop: 20, width: "100%", fontSize: 20, padding: "16px" }}
            onClick={() => {
              setTeams([...setupNames]);
              setScores([0, 0]);
              setCurrentTeam(0);
              setUsedQuestions({});
              setScreen("board");
            }}
          >
            ابدأ اللعبة 🚀
          </button>
        </div>
      </div>
    );
  }

  // ── FINAL ────────────────────────────────────────────────
  if (screen === "final") {
    const winner = scores[0] > scores[1] ? 0 : scores[1] > scores[0] ? 1 : -1;
    return (
      <div style={{ ...S.root, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');`}</style>
        <div style={S.finalCard}>
          <div style={S.crownText}>{winner === -1 ? "🤝" : "🏆"}</div>
          {winner === -1 ? (
            <div style={S.winnerName}>تعادل!</div>
          ) : (
            <>
              <div style={{ color: "#aaa", fontSize: 20, marginBottom: 8 }}>الفائز</div>
              <div style={S.winnerName}>{teams[winner]}</div>
              <div style={S.winnerScore}>{scores[winner]} نقطة</div>
            </>
          )}
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 30 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ color: "#ff6b2b", fontWeight: 700, fontSize: 16 }}>{teams[i]}</div>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{scores[i]}</div>
              </div>
            ))}
          </div>
          <button
            style={{ ...S.btn("#ff6b2b"), marginTop: 36, padding: "14px 48px", fontSize: 18 }}
            onClick={() => {
              setScores([0, 0]); setCurrentTeam(0); setUsedQuestions({});
              setActiveQ(null); setPhase("main"); setScreen("setup");
            }}
          >
            لعبة جديدة
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT ───────────────────────────────────────────────
  if (screen === "result") {
    const { type, points, scoringTeam } = resultInfo || {};
    let emoji = "😐", title = "", sub = "";
    if (type === "correct") { emoji = "✅"; title = `+${points} نقطة!`; sub = `أجاب ${teams[scoringTeam]} بشكل صحيح!`; }
    else if (type === "steal") { emoji = "🔄"; title = `${teams[scoringTeam]} سرق النقاط!`; sub = `+${points} نقطة`; }
    else { emoji = "⏰"; title = "انتهى الوقت!"; sub = "لا أحد أجاب — لا نقاط"; }
    return (
      <div style={{ ...S.root, ...S.resultWrap }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');`}</style>
        <div style={S.resultEmoji}>{emoji}</div>
        <div style={S.resultTitle}>{title}</div>
        <div style={S.resultSub}>{sub}</div>
        <div style={{ display: "flex", gap: 40, marginBottom: 36 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ ...S.scoreCard(false), flexDirection: "column", gap: 2, minWidth: 140 }}>
              <div style={S.scoreTeamName}>{teams[i]}</div>
              <div style={S.scorePoints}>{scores[i]}</div>
            </div>
          ))}
        </div>
        <button
          style={{ ...S.btn("#ff6b2b"), fontSize: 18, padding: "14px 48px" }}
          onClick={() => {
            setCurrentTeam(otherTeam); setActiveQ(null); setPhase("main");
            setStealTeam(null); setShowAnswer(false); setResultInfo(null);
            setScreen(gameOver ? "final" : "board");
          }}
        >
          {gameOver ? "عرض النتيجة النهائية 🏆" : "العودة للوحة"}
        </button>
      </div>
    );
  }

  // ── QUESTION ─────────────────────────────────────────────
  if (screen === "question" && activeQ) {
    const answeringTeam = phase === "steal" ? stealTeam : currentTeam;
    const isRed = phase === "steal" || timer.time <= 10;
    const timerStyle = {
      background: isRed ? "#c0392b33" : "#16253b",
      border: `3px solid ${isRed ? "#e74c3c" : "#2d5986"}`,
      borderRadius: 50,
      padding: "10px 36px",
      fontSize: 32,
      fontWeight: 900,
      color: isRed ? "#e74c3c" : "#7ec8e3",
      marginBottom: 20,
      letterSpacing: 4,
    };

    return (
      <div style={S.root}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap'); @keyframes pulse{from{opacity:1}to{opacity:0.5}}`}</style>

        {/* Fullscreen image modal */}
        <ImageModal src={fullscreenImg} onClose={() => setFullscreenImg(null)} />

        <div style={S.topBar}>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.topBtn} onClick={() => {
              timer.stop(); setScreen("board"); setActiveQ(null);
              setPhase("main"); setShowAnswer(false);
            }}>
              ← العودة للوحة
            </button>
          </div>
          <div style={S.logo}>حسام قيمز 🎯</div>
          <div style={S.teamTurnBadge}>دور فريق: {teams[currentTeam]}</div>
        </div>

        <div style={S.questionWrap}>
          {phase === "steal" && (
            <div style={{ ...S.stealBanner, animation: "pulse 0.6s infinite alternate" }}>
              🔄 فرصة السرقة — {teams[stealTeam]}
            </div>
          )}

          <div style={timerStyle}>{fmt(timer.time)}</div>
          <div style={S.pointsBadge}>{activeQ.points} نقطة</div>

          <div style={S.questionCard}>
            <div style={{ color: "#aaa", fontSize: 14, marginBottom: 12 }}>
              {CATEGORIES[activeQ.catIdx].name}
            </div>

            {/* IMAGE QUESTION */}
            {activeQ.img ? (
              <div>
                <img
                  src={activeQ.img}
                  alt="question"
                  onClick={() => setFullscreenImg(activeQ.img)}
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "contain",
                    borderRadius: 14,
                    cursor: "zoom-in",
                    border: "2px solid #2d5986",
                    display: "block",
                    transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.boxShadow = "0 0 20px #ff6b2b88"}
                  onMouseLeave={(e) => e.target.style.boxShadow = "none"}
                />
                <div style={{ color: "#666", fontSize: 12, marginTop: 8 }}>
                  🔍 اضغط على الصورة لتكبيرها
                </div>
              </div>
            ) : (
              /* TEXT QUESTION */
              <div style={S.questionText}>{activeQ.q}</div>
            )}

            {showAnswer && <div style={S.answerText}>✅ {activeQ.a}</div>}
          </div>

          <div style={S.btnRow}>
            {phase !== "done" && (
              timer.active
                ? <button style={S.btn("#444")} onClick={timer.pause}>⏸ إيقاف مؤقت</button>
                : <button style={S.btn("#2d5986")} onClick={timer.resume}>▶ استمر</button>
            )}

            {phase === "steal" && !showAnswer && (
              <button style={S.btn("#7b4f00")} onClick={() => { timer.stop(); setShowAnswer(true); }}>
                👁 أظهر الجواب
              </button>
            )}

            {phase !== "done" && (
              <button
                style={S.btn("#1a7a4a")}
                onClick={() => {
                  timer.stop();
                  const s = [...scores]; s[answeringTeam] += activeQ.points; setScores(s);
                  setShowAnswer(true);
                  const t = phase === "steal" ? "steal" : "correct";
                  setPhase("done"); phaseRef.current = "done";
                  setResultInfo({ type: t, points: activeQ.points, scoringTeam: answeringTeam });
                }}
              >
                ✅ صح
              </button>
            )}

            {phase !== "done" && (
              <button
                style={S.btn("#7a1a1a")}
                onClick={() => {
                  timer.stop();
                  if (phase === "main") {
                    const other = 1 - currentTeam;
                    setStealTeam(other); setPhase("steal"); phaseRef.current = "steal";
                    timerRef.current.startWith(STEAL_TIMER, () => {
                      setPhaseRef.current("done"); phaseRef.current = "done";
                      setShowAnswerRef.current(true);
                      setResultInfoRef.current({ type: "noone", points: activeQRef.current.points });
                    });
                  } else {
                    setPhase("done"); phaseRef.current = "done";
                    setShowAnswer(true);
                    setResultInfo({ type: "noone", points: activeQ.points });
                  }
                }}
              >
                ❌ خطأ
              </button>
            )}

            {phase === "done" && (
              <button style={S.btn("#ff6b2b")} onClick={() => setScreen("result")}>
                التالي →
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: 30, marginTop: 28 }}>
            {[0, 1].map((i) => (
              <div key={i} style={S.scoreCard(i === answeringTeam)}>
                <div style={S.scoreTeamName}>{teams[i]}</div>
                <div style={S.scorePoints}>{scores[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── BOARD ────────────────────────────────────────────────
  const POINT_LEVELS = [200, 400, 600];

  const openQuestion = (cat, ci, qIdx) => {
    const key = `${ci}-${qIdx}`;
    const q = cat.questions[qIdx];
    setUsedQuestions((prev) => ({ ...prev, [key]: true }));
    const qData = { catIdx: ci, qIdx, points: q.points, q: q.q, a: q.a, img: q.img || null };
    setActiveQ(qData);
    activeQRef.current = qData;
    setShowAnswer(false); setPhase("main"); phaseRef.current = "main";
    setStealTeam(null); setResultInfo(null);
    setScreen("question");
    setTimeout(() => startMainTimer(), 50);
  };

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        @keyframes pulse{from{opacity:1}to{opacity:0.5}}
        .qcell:hover { filter: brightness(1.3); }
        .scoreAdjustBtn:hover { background: #333; }
      `}</style>

      <div style={S.topBar}>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={S.topBtn} onClick={() => setScreen("setup")}>↩ إعادة التهيئة</button>
          {gameOver && (
            <button style={{ ...S.topBtn, color: "#ffd700", borderColor: "#ffd700" }} onClick={() => setScreen("final")}>
              🏆 النتيجة النهائية
            </button>
          )}
        </div>
        <div style={S.logo}>حسام قيمز 🎯</div>
        <div style={S.teamTurnBadge}>دور فريق: {teams[currentTeam]}</div>
      </div>

      <div style={S.board}>
        <div style={S.boardGrid}>
          {CATEGORIES.map((cat, ci) => (
            <div key={ci} style={S.catHeader}>
              <div style={{ fontSize: 22 }}>{cat.emoji}</div>
              <div style={{ fontSize: 13 }}>{cat.name}</div>
            </div>
          ))}
        </div>

        {/* Side A */}
        <div style={{ marginTop: 8, marginBottom: 4 }}>
          <div style={{ textAlign: "center", color: "#ff6b2b", fontWeight: 700, marginBottom: 6, fontSize: 13 }}>— الفريق الأول —</div>
          {POINT_LEVELS.map((pts, li) => (
            <div key={li} style={{ ...S.boardGrid, marginBottom: 8 }}>
              {CATEGORIES.map((cat, ci) => {
                const qIdx = li;
                const key = `${ci}-${qIdx}`;
                const used = !!usedQuestions[key];
                return (
                  <div
                    key={ci}
                    className="qcell"
                    style={S.qCell(used, pts)}
                    onClick={() => { if (!used) openQuestion(cat, ci, qIdx); }}
                  >
                    {used ? "✓" : pts}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Side B */}
        <div style={{ marginTop: 12 }}>
          <div style={{ textAlign: "center", color: "#7ec8e3", fontWeight: 700, marginBottom: 6, fontSize: 13 }}>— الفريق الثاني —</div>
          {POINT_LEVELS.map((pts, li) => (
            <div key={li} style={{ ...S.boardGrid, marginBottom: 8 }}>
              {CATEGORIES.map((cat, ci) => {
                const qIdx = li + 3;
                const key = `${ci}-${qIdx}`;
                const used = !!usedQuestions[key];
                return (
                  <div
                    key={ci}
                    className="qcell"
                    style={S.qCell(used, pts)}
                    onClick={() => { if (!used) openQuestion(cat, ci, qIdx); }}
                  >
                    {used ? "✓" : pts}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div style={S.scoresBar}>
          <div style={S.scoreCard(currentTeam === 0)}>
            <div>
              <div style={S.scoreTeamName}>{teams[0]}</div>
              {currentTeam === 0 && <div style={{ fontSize: 11, color: "#ff6b2b" }}>▶ دوره الآن</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(0, -100)}
                title="خصم 100 نقطة"
              >
                −
              </button>
              <div style={S.scorePoints}>{scores[0]}</div>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(0, 100)}
                title="إضافة 100 نقطة"
              >
                +
              </button>
            </div>
          </div>
          <div style={{ textAlign: "center", color: "#555" }}>
            <div style={{ fontSize: 13 }}>الأسئلة</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#aaa" }}>{usedCount} / {totalQ}</div>
          </div>
          <div style={S.scoreCard(currentTeam === 1)}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(1, -100)}
                title="خصم 100 نقطة"
              >
                −
              </button>
              <div style={S.scorePoints}>{scores[1]}</div>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(1, 100)}
                title="إضافة 100 نقطة"
              >
                +
              </button>
            </div>
            <div>
              <div style={{ ...S.scoreTeamName, textAlign: "left" }}>{teams[1]}</div>
              {currentTeam === 1 && <div style={{ fontSize: 11, color: "#ff6b2b", textAlign: "left" }}>▶ دوره الآن</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}