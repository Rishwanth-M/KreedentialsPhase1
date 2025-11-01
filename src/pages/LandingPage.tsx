// src/pages/LandingPage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  Award,
  BarChart3,
  Clock,
  Zap,
  TrendingUp,
  Users,
  CircleDot,
  CheckCircle2,
  Flame,
  Dumbbell,
  HeartPulse,
  Timer,
  ChevronRight,
  PlayCircle,
  ArrowRight,
  Star,
  ShoppingBag,
} from "lucide-react";

import "../styles/landing.css";

// ASSETS (swap to your real imports / paths)
import KreedentialsLogo from "../assets/logos/kreedentials-logo.png";
import HeroPoster from "../assets/athletes/hero-runner-thumb.jpg";
import DashboardMockMain from "../assets/ui-mock/dashboard-main.jpg";
import DashboardStatsPanel from "../assets/ui-mock/dashboard-stats-panel.jpg";
import AttendancePanel from "../assets/ui-mock/attendance-panel.jpg";
import StreakPanel from "../assets/ui-mock/streak-panel.jpg";

import CoachHuddle from "../assets/athletes/coach-huddle.jpg";
import GrindWeights from "../assets/athletes/grind-weights.jpg";
import SprintStart from "../assets/athletes/sprint-start.jpg";
import RecoveryStretch from "../assets/athletes/recovery-stretch.jpg";
import TeamHands from "../assets/athletes/team-hands.jpg";
import FocusFace from "../assets/athletes/focus-face.jpg";
import GirlsTraining from "../assets/athletes/girls-training.jpg";
import TrackerWatch from "../assets/athletes/tracker-watch.jpg";
import SpeedLadder from "../assets/athletes/speed-ladder.jpg";
import ConeAgility from "../assets/athletes/cone-agility.jpg";
import BoxingBag from "../assets/athletes/boxing-bag.jpg";
import GameHuddle from "../assets/athletes/game-huddle.jpg";

import TeeFront from "../assets/apparel/tee-black-front.jpg";
import TeeBack from "../assets/apparel/tee-black-back.jpg";
import Shorts from "../assets/apparel/performance-shorts.jpg";
import CompressionTop from "../assets/apparel/compression-top.jpg";
import GripSocks from "../assets/apparel/grip-socks.jpg";
import Bottle from "../assets/apparel/recovery-bottle.jpg";

// video hero (you provide this mp4 in assets/athletes/)
const HERO_VIDEO = "/src/assets/athletes/hero-runner.mp4";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // brand stats for hero trust bar
  const brandStats = [
    { label: "Athletes Trained", value: "12,400+" },
    { label: "Sessions Logged", value: "81,900+" },
    { label: "Avg. Improvement", value: "28%" },
    { label: "Cities Active", value: "17" },
  ];

  // hero feature pills
  const heroPills = [
    { icon: <Activity size={14} />, text: "Performance Tracking" },
    { icon: <ShieldCheck size={14} />, text: "Verified Coaches" },
    { icon: <Award size={14} />, text: "Talent Acceleration" },
  ];

  // “Train / Track / Prove” cards
  const valueCards = [
    {
      title: "TRAIN",
      color: "text-lime-400",
      icon: <Dumbbell className="text-lime-400" size={20} />,
      headline: "Built by real coaches, not influencers.",
      bullets: [
        "Explosive speed & agility systems",
        "Strength programs for real youth frames (not bodybuilder nonsense)",
        "Recovery and mobility baked in",
      ],
      image: GrindWeights,
    },
    {
      title: "TRACK",
      color: "text-white",
      icon: <HeartPulse className="text-red-400" size={20} />,
      headline: "Your data isn't for vibes. It's for proof.",
      bullets: [
        "Attendance, streaks, workload",
        "Fatigue, recovery, stamina trend",
        "Tournament readiness score",
      ],
      image: TrackerWatch,
    },
    {
      title: "PROVE",
      color: "text-white",
      icon: <Flame className="text-orange-400" size={20} />,
      headline: "Compete like you’re being scouted.",
      bullets: [
        "Challenge board & leaderboards",
        "Coach feedback receipts",
        "High-intensity match prep blocks",
      ],
      image: SprintStart,
    },
  ];

  // Apparel carousel items
  const apparelItems = [
    {
      name: "Kreedentials Core Tee (Black)",
      price: "₹1,499",
      imgs: [TeeFront, TeeBack],
      badges: ["Sweat-wick", "UV Shield", "4-Way Stretch"],
    },
    {
      name: "Performance Shorts // Mobility Edition",
      price: "₹1,299",
      imgs: [Shorts],
      badges: ["Breathable Mesh", "Anti-Chafe", "Ultra Light"],
    },
    {
      name: "Compression Top Mk.II",
      price: "₹1,899",
      imgs: [CompressionTop],
      badges: ["Support Zones", "Locked Core", "Fast Dry"],
    },
    {
      name: "Grip Socks / Match Day",
      price: "₹499",
      imgs: [GripSocks],
      badges: ["Anti-Slip", "Impact Cush", "Ankle Lock"],
    },
    {
      name: "Recovery Bottle Pro",
      price: "₹799",
      imgs: [Bottle],
      badges: ["ThermoSeal", "BPA Free", "Electrolyte Safe"],
    },
  ];

  // slider settings for apparel
  const apparelSliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.2 } },
    ],
  };

  // coaches spotlight
  const coaches = [
    {
      name: "Sarah Johnson",
      role: "High Performance Coach · 15 yrs",
      avatar: CoachHuddle,
      highlight:
        "Explosive first-step acceleration, game IQ training, recovery discipline.",
      tags: ["Speed", "Position IQ", "Mindset Control"],
      rating: 4.9,
      sessions: "1,200+ sessions run",
    },
    {
      name: "Dev Patel",
      role: "Strength & Power · Ex-Youth Pro",
      avatar: GrindWeights,
      highlight:
        "Force production, injury prevention, lower-body strength programming for real match use.",
      tags: ["Power", "Stability", "Injury Proof"],
      rating: 4.8,
      sessions: "900+ sessions run",
    },
    {
      name: "Ana Rivera",
      role: "Endurance / Stamina Coach",
      avatar: GirlsTraining,
      highlight:
        "Engineered stamina blocks that translate to final-quarter dominance, not just running mindlessly.",
      tags: ["Stamina", "Breath Work", "High Heart-Rate Control"],
      rating: 5.0,
      sessions: "1,400+ sessions run",
    },
  ];

  // Testimonials (parents, athletes)
  const testimonialsAthletes = [
    {
      quote:
        "Before Kreedentials I was ‘talented’. Now I'm dangerous. My stamina graph literally doubled.",
      name: "Aarav (14)",
      role: "U16 Striker · State Squad",
    },
    {
      quote:
        "I stopped guessing if I was getting better. Now I see my numbers climb. That does something to your head.",
      name: "Riya (15)",
      role: "Wing · District Select",
    },
    {
      quote:
        "They don't treat us like kids. They treat us like athletes. And that feels crazy.",
      name: "Zayd (13)",
      role: "Midfielder · Academy XI",
    },
    {
      quote:
        "I used to gas out in the 2nd half. Coach Sarah fixed my breathing and now I break people in minute 70.",
      name: "Mira (14)",
      role: "Forward · Regional Camp",
    },
  ];

  const testimonialsParents = [
    {
      quote:
        "This is the first time I can SEE progress with data. It’s not ‘good job beta’, it’s: reaction time down 0.18s.",
      name: "Reya",
      role: "Parent · Bangalore",
    },
    {
      quote:
        "My kid doesn’t skip sessions anymore. The attendance streak and coach notes made him take it seriously.",
      name: "Arjun’s Dad",
      role: "Parent · Pune",
    },
    {
      quote:
        "I know exactly what he worked on, what’s next, and how tired he actually is. That's new.",
      name: "Neha",
      role: "Parent · Hyderabad",
    },
    {
      quote:
        "Other academies send videos. Kreedentials sends receipts. It's different.",
      name: "Priya",
      role: "Parent · Mumbai",
    },
  ];

  // Culture gallery strip for horizontal scroll
  const cultureShots = [
    { img: FocusFace, label: "Locked In" },
    { img: TeamHands, label: "Family > Fame" },
    { img: BoxingBag, label: "Conditioning Phase" },
    { img: ConeAgility, label: "Footwork Lab" },
    { img: SpeedLadder, label: "Reaction Speed" },
    { img: RecoveryStretch, label: "Recovery is Training" },
    { img: GameHuddle, label: "Game IQ Live" },
  ];

  // small motion helper
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans">
      {/* GLOBAL BG GLOW & NOISE */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {/* lime blobs */}
        <div className="absolute top-[15%] left-[20%] w-[600px] h-[600px] bg-lime-500/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-lime-400/10 blur-[200px] rounded-full" />

        {/* faint grid / noise overlay */}
        <div className="absolute inset-0 opacity-[0.07] mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 k-noise" />

        {/* floating particles (slow breathing) */}
        {[...Array(28)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-lime-400/40 rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="relative z-30 flex items-center justify-between px-6 md:px-10 py-6">
        {/* left: logo / brand */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative flex items-center justify-center">
  {/* Outer glow */}
  <div className="absolute inset-0 blur-xl bg-lime-400/40 rounded-2xl scale-110 sm:scale-125" />

  {/* Logo image */}
  <img
    src={KreedentialsLogo}
    alt="Kreedentials Logo"
    className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_25px_#B4FF39] transition-transform duration-300 hover:scale-110"
  />
</div>

          <div className="leading-tight select-none">
            <div
              className="text-lime-400 font-extrabold text-xl tracking-wide uppercase"
              style={{
                textShadow:
                  "0 0 20px rgba(180,255,57,0.9), 0 0 40px rgba(180,255,57,0.4)",
              }}
            >
              KREEDENTIALS
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest">
              Kreate · Kommit · Konquer
            </div>
          </div>
        </motion.div>

        {/* right: nav ctas */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => navigate("/store")}
            className="relative px-4 py-2 text-sm font-medium text-black bg-lime-400 rounded-lg shadow-[0_0_20px_#B4FF39] hover:shadow-[0_0_30px_#B4FF39] hover:bg-lime-300 transition-all"
          >
            Shop
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-lime-400/40 text-lime-400 hover:bg-lime-400/10 hover:shadow-[0_0_20px_#B4FF39] transition-all"
          >
            Login
          </button>
        </motion.div>
      </header>

      {/* =========================================================
         HERO SECTION (Video BG + headline + pills + trust stats)
      ========================================================== */}
      <section className="relative z-20 px-6 md:px-10 pt-4 md:pt-10">
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* left: headline + ctas */}
          <div className="relative">
            {/* pills row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {heroPills.map((pill, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.05 * i)}
                  className="flex items-center gap-2 text-[11px] font-medium text-lime-400 bg-black/70 border border-lime-400/30 rounded-full px-3 py-1 shadow-[0_0_15px_rgba(180,255,57,0.4)]"
                >
                  {pill.icon}
                  <span className="uppercase tracking-wide">{pill.text}</span>
                </motion.div>
              ))}
            </div>

            {/* main headline */}
            <motion.h1
              {...fadeUp(0.15)}
              className="text-[2.3rem] leading-[1.1] md:text-[3.4rem] md:leading-[1.1] font-extrabold uppercase max-w-xl text-white tracking-tight"
              style={{
                textShadow:
                  "0 0 20px rgba(180,255,57,0.7), 0 0 60px rgba(180,255,57,0.4)",
              }}
            >
              The First Athlete OS
              <br />
              <span className="text-lime-400">
                Built For The Next Generation
              </span>
            </motion.h1>

            {/* sub headline */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-gray-400 text-base md:text-lg max-w-lg mt-5 font-medium leading-relaxed"
            >
              Kreedentials blends{" "}
              <span className="text-lime-400">
                elite coaching · honest tracking · battle-ready apparel
              </span>{" "}
              so young athletes don’t just “play sport” —
              <span className="text-white font-semibold">
                {" "}
                they build their legacy.
              </span>
            </motion.p>

            {/* cta row */}
            <motion.div
              {...fadeUp(0.45)}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <button
                onClick={() => navigate("/signup")}
                className="relative px-8 py-3 rounded-xl font-semibold text-black bg-lime-400 text-lg shadow-[0_0_25px_#B4FF39] hover:shadow-[0_0_40px_#B4FF39] hover:bg-lime-300 transition-all k-pulse-glow"
              >
                Join The Program
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-3 rounded-xl text-lg border border-lime-400/40 text-lime-400 bg-black/60 hover:bg-lime-400/10 hover:shadow-[0_0_25px_#B4FF39] font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>View Athlete Dashboard</span>
                <ArrowRight size={18} className="text-lime-400" />
              </button>
            </motion.div>

            {/* trust stats row */}
            <motion.div
              {...fadeUp(0.6)}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl"
            >
              {brandStats.map((s, i) => (
                <div
                  key={i}
                  className="text-center border border-lime-400/10 bg-black/40 rounded-xl py-4 px-2"
                >
                  <div className="text-white font-extrabold text-xl md:text-2xl leading-none">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* right: hero video panel */}
          <motion.div
            {...fadeUp(0.4)}
            className="relative rounded-2xl border border-lime-400/30 bg-black/40 shadow-[0_0_60px_rgba(180,255,57,0.25)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/20 pointer-events-none z-10" />
            <video
              className="w-full h-[320px] md:h-[400px] object-cover opacity-80"
              src={HERO_VIDEO}
              poster={HeroPoster}
              autoPlay
              loop
              muted
              playsInline
            />
            {/* corner badge */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/70 border border-lime-400/40 rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(180,255,57,0.6)]">
              <ShieldCheck className="text-lime-400" size={16} />
              <div className="text-[10px] leading-tight">
                <div className="text-lime-400 font-semibold uppercase tracking-wider">
                  Verified Coach Footage
                </div>
                <div className="text-gray-400 text-[9px] uppercase tracking-wider">
                  Real sessions · Real grind
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
         MOVING MARQUEE STRIP: “BUILT DIFFERENT”
      ========================================================== */}
      <section className="relative z-10 mt-16 md:mt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
        <div className="border-y border-lime-400/20 bg-[#0a0a0a]/60 backdrop-blur-sm relative py-4">
          {/* row 1 (left -> right) */}
          <div className="k-marquee-track text-[0.8rem] sm:text-[0.9rem] flex gap-8 font-semibold uppercase tracking-widest text-lime-400 px-6 whitespace-nowrap">
            {new Array(20).fill(0).map((_, idx) => (
              <div
                key={"m1-" + idx}
                className="flex items-center gap-2 text-lime-400/90"
              >
                <CircleDot size={12} />
                <span>BUILT DIFFERENT · NO EXCUSES · FULL RECEIPTS</span>
              </div>
            ))}
          </div>

          {/* row 2 (right -> left) */}
          <div className="k-marquee-track-reverse mt-2 flex gap-8 text-[0.8rem] sm:text-[0.9rem] font-semibold uppercase tracking-widest px-6 whitespace-nowrap text-white">
            {new Array(20).fill(0).map((_, idx) => (
              <div
                key={"m2-" + idx}
                className="flex items-center gap-2 text-white/70"
              >
                <Flame className="text-orange-400" size={14} />
                <span>
                  ATTENDANCE. STREAK. WORKLOAD. PROOF. &nbsp;|&nbsp; THIS IS THE
                  STANDARD NOW.
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
         TRAIN / TRACK / PROVE CARDS
      ========================================================== */}
      <section className="relative z-10 mt-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
              You don’t need “motivation”.
              <br className="hidden sm:block" />
              <span className="text-lime-400">
                You need an actual system that holds you.
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
              We’re not here to post reels and clap for effort. We’re here to
              build finishers, closers, problems on the pitch/court/mat.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-wider">
            <CircleDot className="text-lime-400" size={12} />
            <span className="text-gray-400">Live · India</span>
          </div>
        </div>

        {/* 3 value cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {valueCards.map((card, idx) => (
            <Tilt
              glareEnable={true}
              glareColor="rgba(180,255,57,0.4)"
              glarePosition="all"
              glareBorderRadius="1rem"
              glareMaxOpacity={0.15}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              className="bg-transparent"
              key={idx}
            >
              <motion.div
                className="relative rounded-2xl bg-[#0a0a0a]/80 border border-lime-400/20 shadow-[0_0_35px_rgba(180,255,57,0.2)] overflow-hidden flex flex-col"
                {...fadeUp(idx * 0.1)}
              >
                {/* top content */}
                <div className="relative p-6 flex-1 flex flex-col">
                  {/* scanlines overlay */}
                  <div className="absolute inset-0 k-scanlines opacity-[0.08]" />

                  <div className="relative z-10 flex items-center gap-2 mb-3">
                    <div className="text-lime-400">{card.icon}</div>
                    <div className="uppercase text-[0.7rem] font-bold tracking-wider text-lime-400">
                      {card.title}
                    </div>
                  </div>

                  <h3 className="relative z-10 text-white text-xl font-bold leading-snug mb-4">
                    {card.headline}
                  </h3>

                  <ul className="relative z-10 text-gray-400 text-sm space-y-3 mb-4">
                    {card.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 items-start">
                        <CheckCircle2
                          size={16}
                          className="text-lime-400 flex-shrink-0 mt-[2px]"
                        />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* bottom image */}
                <div className="relative border-t border-lime-400/20">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-40 w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/10 to-transparent" />
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* =========================================================
         “THE SYSTEM” SPLIT PANEL:
         left: coach/athlete support
         right: bullet reasons
      ========================================================== */}
      <section className="relative z-10 mt-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT VISUAL STACK */}
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-2xl overflow-hidden border border-lime-400/30 bg-black/40 shadow-[0_0_60px_rgba(180,255,57,0.25)]"
          >
            {/* hero image collage: coach giving instruction + athlete focus face */}
            <div className="grid grid-cols-2 gap-2 p-2">
              <div className="relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/30">
                <img
                  src={CoachHuddle}
                  alt="Coach guiding"
                  className="w-full h-48 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px]">
                  <div className="text-lime-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck size={12} className="text-lime-400" />
                    VERIFIED COACH
                  </div>
                  <div className="text-gray-400 text-[9px] uppercase leading-tight tracking-wider">
                    1:1 correction · mindset control
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/30">
                <img
                  src={FocusFace}
                  alt="Athlete locked in"
                  className="w-full h-48 object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px]">
                  <div className="text-white font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Flame size={12} className="text-orange-400" />
                    LOCKED FOCUS
                  </div>
                  <div className="text-gray-400 text-[9px] uppercase leading-tight tracking-wider">
                    final-minute composure work
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/30 col-span-2">
                <img
                  src={GirlsTraining}
                  alt="Team drill"
                  className="w-full h-40 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px]">
                  <div className="text-lime-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                    TEAM CULTURE
                  </div>
                  <div className="text-gray-400 text-[9px] uppercase leading-tight tracking-wider">
                    accountability squad · shared grind
                  </div>
                </div>
              </div>
            </div>

            {/* subtle overlay label */}
            <div className="absolute top-4 left-4 bg-black/80 border border-lime-400/40 rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(180,255,57,0.6)]">
              <div className="text-[10px] text-lime-400 font-semibold uppercase tracking-wider leading-none">
                SYSTEM SUPPORT
              </div>
              <div className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">
                Not just drills. Structure.
              </div>
            </div>
          </motion.div>

          {/* RIGHT COPY */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="text-lime-400" size={18} />
                <span className="text-lime-400 text-xs font-semibold uppercase tracking-wider">
                  The Kreedentials System
                </span>
              </div>

              <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-4">
                Your kid isn’t lazy.
                <br />
                They’re just unstructured.
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium mb-6">
                Every athlete gets 3 pillars:
              </p>

              <ul className="space-y-4 text-sm text-gray-300 font-medium">
                <li className="flex items-start gap-3">
                  <Timer className="text-lime-400 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-white font-semibold">
                      Attendance tracking that matters
                    </div>
                    <div className="text-gray-400 text-[13px] leading-relaxed">
                      Your streak, your missed days, your consistency. No
                      hiding. No “I’ll go tomorrow.”
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <HeartPulse
                    className="text-red-400 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <div className="text-white font-semibold">
                      Recovery intel, not guesswork
                    </div>
                    <div className="text-gray-400 text-[13px] leading-relaxed">
                      If you’re red-zoned, we adjust. We reduce injury risk by
                      acting before pain screams.
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <TrendingUp
                    className="text-lime-400 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <div className="text-white font-semibold">
                      Actual progress maps
                    </div>
                    <div className="text-gray-400 text-[13px] leading-relaxed">
                      Speed. Endurance. Control. Mindset. It’s all charted. You
                      can show proof to scouts, parents, yourself.
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 text-center text-black bg-lime-400 font-semibold py-3 rounded-lg text-sm shadow-[0_0_20px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_30px_#B4FF39] transition-all"
              >
                Preview Live Dashboard →
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex-1 text-lime-400 border border-lime-400/40 font-semibold text-sm py-3 rounded-lg bg-black/60 hover:bg-lime-400/10 hover:shadow-[0_0_25px_#B4FF39] transition-all"
              >
                Get Early Access
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
         PERFORMANCE OS MOCK / DASHBOARD PANELS
      ========================================================== */}
      <section className="relative z-10 mt-28 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT COPY CARD */}
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-2xl bg-[#0a0a0a]/80 border border-lime-400/20 shadow-[0_0_40px_rgba(180,255,57,0.15)] p-6 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute inset-0 k-scanlines opacity-[0.08]" />
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-lime-400/20 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-lime-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="text-lime-400" size={18} />
                <span className="text-lime-400 text-xs font-semibold uppercase tracking-wider">
                  Athlete Dashboard
                </span>
              </div>
              <h3 className="text-white text-2xl font-extrabold leading-tight mb-4">
                See your game like a pro analyst
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium mb-4">
                Live attendance. Recovery %. Training load. Streaks. Skill
                radar. Upcoming tournaments. It’s all tracked — so athletes
                can’t hide and coaches don’t guess.
              </p>

              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li className="flex items-start gap-2">
                  <TrendingUp
                    className="text-lime-400 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    Track real improvement, not just “hustle” and “effort”.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock
                    className="text-lime-400 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    Parents see commitment. Coaches see workload. Athlete sees
                    truth.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Users
                    className="text-lime-400 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    One profile. Travel with it. Get scouted anywhere.
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="relative z-10 mt-6 w-full text-center text-black bg-lime-400 font-semibold py-3 rounded-lg text-sm shadow-[0_0_20px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_30px_#B4FF39] transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle size={16} />
              <span>Open Dashboard Demo</span>
            </button>
          </motion.div>

          {/* RIGHT: VISUAL MOCK PANELS */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex-1 relative grid lg:grid-cols-2 gap-4"
          >
            {/* big main mock screenshot */}
            <div className="relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/40 shadow-[0_0_40px_rgba(180,255,57,0.2)] lg:col-span-2">
              <div className="flex items-center justify-between text-[10px] px-4 py-3 bg-black/60 border-b border-lime-400/10">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="uppercase tracking-wider text-gray-400">
                    Athlete Control Center
                  </span>
                </div>
                <div className="text-lime-400 font-semibold tracking-wider flex gap-2 items-center">
                  <span>LIVE SYNC</span>
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                </div>
              </div>

              <img
                src={DashboardMockMain}
                alt="Dashboard Overview"
                className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            </div>

            {/* stat panel tiles */}
            <div className="relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/40 shadow-[0_0_30px_rgba(180,255,57,0.2)]">
              <img
                src={DashboardStatsPanel}
                alt="Stats Panel"
                className="w-full h-[160px] object-cover opacity-90"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 border border-lime-400/40 rounded-md px-2 py-1 text-[10px] text-lime-400 font-semibold tracking-wider shadow-[0_0_10px_rgba(180,255,57,0.6)]">
                +82 this week
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/40 shadow-[0_0_30px_rgba(180,255,57,0.2)]">
              <img
                src={AttendancePanel}
                alt="Attendance Panel"
                className="w-full h-[160px] object-cover opacity-90"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 border border-lime-400/40 rounded-md px-2 py-1 text-[10px] text-white font-semibold tracking-wider shadow-[0_0_10px_rgba(180,255,57,0.6)]">
                Streak: 6 days
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/40 shadow-[0_0_30px_rgba(180,255,57,0.2)] lg:col-span-2">
              <img
                src={StreakPanel}
                alt="Streak Panel"
                className="w-full h-[160px] object-cover opacity-90"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 border border-lime-400/40 rounded-md px-2 py-1 text-[10px] text-orange-400 font-semibold tracking-wider shadow-[0_0_10px_rgba(255,165,0,0.6)] flex items-center gap-1">
                <Flame size={12} className="text-orange-400" />
                <span>On Fire</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
         APPAREL CAROUSEL / SHOP TEASER
      ========================================================== */}
      <section className="relative z-10 mt-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start gap-10">
          {/* LEFT copy / CTA */}
          <motion.div
            {...fadeUp(0)}
            className="lg:w-[35%] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-lime-400" size={18} />
                <span className="text-lime-400 text-xs font-semibold uppercase tracking-wider">
                  Performance Gear
                </span>
              </div>

              <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-4">
                Apparel actually made for training.
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium mb-6">
                4-way stretch. Breathable. UV shielded. Zero cringe branding.
                Made for sweat, not selfies. Wear it in the work, not just in
                the mirror.
              </p>

              <div className="text-[11px] uppercase tracking-wider text-gray-500 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-lime-400 flex-shrink-0"
                  />
                  <span>Pro-cut mobility seams (hips / hamstring)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-lime-400 flex-shrink-0"
                  />
                  <span>Anti-chafe shorts mesh for repeat sprint load</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-lime-400 flex-shrink-0"
                  />
                  <span>Compression mapping = core locked</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/store")}
                className="flex-1 text-center text-black bg-lime-400 font-semibold py-3 rounded-lg text-sm shadow-[0_0_20px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_30px_#B4FF39] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                <span>Open Store</span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex-1 text-lime-400 border border-lime-400/40 font-semibold text-sm py-3 rounded-lg bg-black/60 hover:bg-lime-400/10 hover:shadow-[0_0_25px_#B4FF39] transition-all"
              >
                Sign In to Save Gear
              </button>
            </div>
          </motion.div>

          {/* RIGHT carousel */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:flex-1 relative rounded-2xl border border-lime-400/20 bg-[#0a0a0a]/70 shadow-[0_0_40px_rgba(180,255,57,0.15)] p-4 overflow-hidden"
          >
            <div className="absolute inset-0 k-scanlines opacity-[0.07]" />
            <Slider {...apparelSliderSettings}>
              {apparelItems.map((item, idx) => (
                <div key={idx} className="px-3">
                  <div className="relative bg-black/60 rounded-xl border border-lime-400/20 overflow-hidden shadow-[0_0_30px_rgba(180,255,57,0.25)]">
                    {/* product imgs */}
                    <div className="relative flex gap-2 p-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                      {item.imgs.map((imgSrc, j) => (
                        <div
                          key={j}
                          className="relative min-w-[200px] h-[220px] rounded-lg overflow-hidden border border-lime-400/20 bg-black/40 snap-center"
                        >
                          <img
                            src={imgSrc}
                            alt={item.name + "-" + j}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>
                      ))}
                    </div>

                    {/* info */}
                    <div className="p-4 border-t border-lime-400/20 bg-black/60">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-white font-semibold text-sm leading-snug">
                            {item.name}
                          </div>
                          <div className="text-lime-400 font-bold text-lg leading-none">
                            {item.price}
                          </div>
                        </div>
                        <div className="text-right text-[10px] leading-tight text-gray-400 uppercase tracking-wider">
                          <div className="text-lime-400 font-semibold flex items-center gap-1">
                            <Star size={12} className="text-lime-400" />
                            4.9
                          </div>
                          <div>2.1K reviews</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.badges.map((b, bi) => (
                          <div
                            key={bi}
                            className="text-[10px] text-gray-300 bg-black/40 border border-lime-400/30 rounded-full px-2 py-1 leading-none tracking-wider"
                          >
                            {b}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => navigate("/store")}
                        className="mt-4 w-full text-center text-black bg-lime-400 font-semibold py-2 rounded-lg text-[13px] shadow-[0_0_20px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_30px_#B4FF39] transition-all flex items-center justify-center gap-2"
                      >
                        <ChevronRight size={14} />
                        <span>View More</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* floating label top-left */}
            <div className="absolute top-4 left-4 bg-black/80 border border-lime-400/40 rounded-lg px-3 py-2 text-[10px] text-lime-400 font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(180,255,57,0.6)]">
              Kreedentials // Gear Lab
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
         COACH SPOTLIGHT + SESSION CTA
      ========================================================== */}
      <section className="relative z-10 mt-28 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT: active coach highlight */}
          <motion.div
            {...fadeUp(0)}
            className="flex-1 relative rounded-2xl bg-[#0a0a0a]/80 border border-lime-400/20 shadow-[0_0_40px_rgba(180,255,57,0.2)] overflow-hidden p-6 flex flex-col"
          >
            <div className="absolute inset-0 k-scanlines opacity-[0.07]" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-400/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-lime-500/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-6">
              <div className="lg:w-[40%] relative rounded-xl overflow-hidden border border-lime-400/20 bg-black/30">
                <img
                  src={CoachHuddle}
                  alt="Coach Sarah"
                  className="w-full h-48 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px]">
                  <div className="flex items-center gap-1 text-lime-400 font-semibold uppercase tracking-wider">
                    <ShieldCheck size={12} className="text-lime-400" />
                    VERIFIED COACH
                  </div>
                  <div className="text-gray-400 text-[9px] uppercase leading-tight tracking-wider">
                    1,200+ sessions
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-white font-semibold text-lg leading-tight">
                      Sarah Johnson
                    </div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">
                      High Performance Coach · 15 yrs
                    </div>
                  </div>
                  <div className="text-right text-[10px] leading-tight">
                    <div className="text-lime-400 font-semibold flex items-center gap-1">
                      <Star size={12} className="text-lime-400" />
                      4.9
                    </div>
                    <div className="text-gray-500">Top Rated</div>
                  </div>
                </div>

                <div className="text-gray-300 text-sm leading-relaxed font-medium mt-4">
                  Explosive first-step acceleration, game IQ training,
                  discipline under fatigue, and recovery built for tournament
                  schedules.
                </div>

                <div className="flex flex-wrap gap-2 mt-4 text-[10px] uppercase tracking-wider">
                  <div className="bg-black/50 border border-lime-400/30 text-lime-400 rounded-full px-2 py-1 leading-none">
                    Speed
                  </div>
                  <div className="bg-black/50 border border-lime-400/30 text-lime-400 rounded-full px-2 py-1 leading-none">
                    Mindset
                  </div>
                  <div className="bg-black/50 border border-lime-400/30 text-lime-400 rounded-full px-2 py-1 leading-none">
                    Recovery
                  </div>
                </div>

                <button
                  onClick={() => navigate("/coach")}
                  className="mt-6 w-full text-center text-black bg-lime-400 font-semibold py-3 rounded-lg text-sm shadow-[0_0_20px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_30px_#B4FF39] transition-all flex items-center justify-center gap-2"
                >
                  <Clock size={16} />
                  <span>Request Session</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: other coaches carousel / list */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:w-[40%] relative rounded-2xl border border-lime-400/20 bg-black/50 shadow-[0_0_40px_rgba(180,255,57,0.15)] p-4 overflow-hidden"
          >
            <div className="absolute inset-0 k-scanlines opacity-[0.07]" />
            <div className="absolute top-4 left-4 bg-black/80 border border-lime-400/40 rounded-lg px-3 py-2 text-[10px] text-lime-400 font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(180,255,57,0.6)]">
              Explore Coaches
            </div>

            <div className="space-y-4 mt-10 max-h-[360px] overflow-auto pr-2">
              {coaches.map((c, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 bg-black/40 border border-lime-400/20 rounded-xl p-4 hover:bg-black/60 transition-all"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-lime-400/20 bg-black/40 flex-shrink-0">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-white font-semibold text-sm leading-snug">
                          {c.name}
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                          {c.role}
                        </div>
                      </div>
                      <div className="text-right text-[10px] leading-tight">
                        <div className="text-lime-400 font-semibold flex items-center gap-1">
                          <Star size={12} className="text-lime-400" />
                          {c.rating}
                        </div>
                        <div className="text-gray-500">{c.sessions}</div>
                      </div>
                    </div>

                    <div className="text-gray-400 text-[13px] leading-relaxed mt-3">
                      {c.highlight}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3 text-[10px] uppercase tracking-wider">
                      {c.tags.map((t, ti) => (
                        <div
                          key={ti}
                          className="bg-black/50 border border-lime-400/30 text-lime-400 rounded-full px-2 py-1 leading-none"
                        >
                          {t}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate("/coach")}
                      className="mt-4 w-full text-center text-black bg-lime-400 font-semibold py-2 rounded-lg text-[12px] shadow-[0_0_20px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_30px_#B4FF39] transition-all flex items-center justify-center gap-2"
                    >
                      <Clock size={14} />
                      <span>Request This Coach</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider text-center mt-4">
              More coaches available after login
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
         TESTIMONIALS / SOCIAL PROOF
         (dual marquee: athletes + parents)
      ========================================================== */}
      <section className="relative z-10 mt-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

        <div className="px-6 md:px-10 max-w-7xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-10"
          >
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                People who live in this game
                <br className="hidden sm:block" />
                <span className="text-lime-400">
                  trust Kreedentials with their grind.
                </span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
                Not hype. Results. Parents see discipline. Coaches see data.
                Scouts see readiness. Athletes feel themselves leveling up.
              </p>
            </div>
          </motion.div>
        </div>

        {/* athlete quotes marquee */}
        <div className="overflow-hidden border-y border-lime-400/20 bg-[#0a0a0a]/60 backdrop-blur-sm py-6">
          <div className="k-marquee-track flex gap-8 px-6 text-white text-sm leading-relaxed">
            {testimonialsAthletes.concat(testimonialsAthletes).map((t, i) => (
              <div
                key={"ath-" + i}
                className="min-w-[260px] max-w-[260px] bg-black/50 border border-lime-400/30 rounded-xl p-4 shadow-[0_0_25px_rgba(180,255,57,0.2)]"
              >
                <div className="text-[11px] text-lime-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                  <Flame size={12} className="text-orange-400" />
                  <span>Athlete POV</span>
                </div>
                <div className="text-gray-300 text-[13px] leading-relaxed mb-4 italic">
                  “{t.quote}”
                </div>
                <div className="text-white font-semibold text-[13px] leading-tight">
                  {t.name}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {t.role}
                </div>
              </div>
            ))}
          </div>

          {/* parents quotes marquee (reverse) */}
          <div className="k-marquee-track-reverse flex gap-8 px-6 mt-6 text-white text-sm leading-relaxed">
            {testimonialsParents.concat(testimonialsParents).map((t, i) => (
              <div
                key={"par-" + i}
                className="min-w-[260px] max-w-[260px] bg-black/50 border border-lime-400/30 rounded-xl p-4 shadow-[0_0_25px_rgba(180,255,57,0.2)]"
              >
                <div className="text-[11px] text-lime-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-lime-400" />
                  <span>Parent POV</span>
                </div>
                <div className="text-gray-300 text-[13px] leading-relaxed mb-4 italic">
                  “{t.quote}”
                </div>
                <div className="text-white font-semibold text-[13px] leading-tight">
                  {t.name}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {t.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
         CULTURE STRIP / RAW MOMENTS
         horizontal gallery with snap scroll
      ========================================================== */}
      <section className="relative z-10 mt-28 px-6 md:px-10 max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-8"
          >
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                This is the part nobody posts.
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
                The sweat, the silence right before whistle, the eye contact
                before kickoff. That’s the part scouts watch for.
              </p>
            </div>

            <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-6 md:mt-0">
              Captured inside real sessions.
            </div>
          </motion.div>
        </div>

        <div className="overflow-x-auto no-scrollbar pb-4 -mx-6 md:-mx-10 px-6 md:px-10 snap-x snap-mandatory flex gap-6">
          {cultureShots.map((shot, idx) => (
            <div
              key={idx}
              className="relative min-w-[260px] max-w-[260px] snap-center rounded-xl overflow-hidden border border-lime-400/20 bg-black/40 shadow-[0_0_40px_rgba(180,255,57,0.25)]"
            >
              <img
                src={shot.img}
                alt={shot.label}
                className="w-full h-[200px] object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[10px] text-lime-400 uppercase tracking-wider font-semibold bg-black/60 border border-lime-400/30 rounded-md px-2 py-1 shadow-[0_0_15px_rgba(180,255,57,0.5)]">
                {shot.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
         FINAL CTA STRIP
      ========================================================== */}
      <section className="relative z-10 mt-32 px-6 md:px-10 pb-24">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-2xl border border-lime-400/30 bg-[#0a0a0a]/80 shadow-[0_0_60px_rgba(180,255,57,0.25)]">
          {/* lime glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.12)_0%,transparent_70%)] blur-[100px]" />

          {/* content */}
          <div className="relative p-8 md:p-12 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-lime-400 text-xs uppercase tracking-widest font-semibold mb-3">
                <Zap size={16} />
                <span>Start now</span>
              </div>

              <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-4">
                Ready to build a serious athlete — not just a player?
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                Lock in attendance. Track stamina. Gear up. Get pro coaching.
                Print proof of effort. This is the standard now.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto text-black bg-lime-400 font-semibold text-sm md:text-base py-3 px-6 rounded-lg shadow-[0_0_25px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_40px_#B4FF39] transition-all flex items-center gap-2 justify-center"
              >
                <Flame size={16} className="text-black" />
                <span>Get Started</span>
              </button>
              <button
                onClick={() => navigate("/store")}
                className="w-full sm:w-auto text-lime-400 border border-lime-400/40 font-semibold text-sm md:text-base py-3 px-6 rounded-lg bg-black/60 hover:bg-lime-400/10 hover:shadow-[0_0_25px_#B4FF39] transition-all flex items-center gap-2 justify-center"
              >
                <ShoppingBag size={16} className="text-lime-400" />
                <span>Browse Gear →</span>
              </button>
            </div>
          </div>

          {/* footer meta inside CTA block */}
          <div className="relative border-t border-lime-400/20 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between px-8 md:px-12 py-6 text-[10px] uppercase tracking-widest text-gray-500">
            <div className="flex gap-6 flex-wrap">
              <span className="text-gray-400/80">© 2025 Kreedentials</span>
              <span className="text-gray-500">All rights reserved</span>
              <span className="text-lime-400/80">India · Live</span>
            </div>
            <div className="flex gap-6 text-gray-600 flex-wrap">
              <span className="hover:text-gray-300 cursor-pointer">
                Terms
              </span>
              <span className="hover:text-gray-300 cursor-pointer">
                Privacy
              </span>
              <span
                className="hover:text-lime-400 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                Settings
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         GLOBAL FOOTER w/ SMALL PRINT + MINI BRAND STRIP
      ========================================================== */}
      <footer className="relative z-10 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-10 text-[13px] text-gray-400">
          {/* BRAND / MISSION */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 blur-lg bg-lime-400/40 rounded-xl" />
                <img
                  src={KreedentialsLogo}
                  className="relative w-10 h-10 object-contain drop-shadow-[0_0_20px_#B4FF39]"
                  alt="Kreedentials Logo"
                />
              </div>
              <div className="leading-tight select-none">
                <div
                  className="text-lime-400 font-extrabold text-base tracking-wide uppercase"
                  style={{
                    textShadow:
                      "0 0 20px rgba(180,255,57,0.9), 0 0 40px rgba(180,255,57,0.4)",
                  }}
                >
                  KREEDENTIALS
                </div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest">
                  Kreate · Kommit · Konquer
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-[12px] leading-relaxed max-w-xs">
              We build serious athletes. Discipline, tracking, mindset, output.
              This isn’t recreational. This is weaponization.
            </p>
          </div>

          {/* PAGES */}
          <div>
            <div className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Platform
            </div>
            <ul className="space-y-2 text-[13px]">
              <li
                className="cursor-pointer hover:text-lime-400 transition-colors"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </li>
              <li
                className="cursor-pointer hover:text-lime-400 transition-colors"
                onClick={() => navigate("/coach")}
              >
                Coaches
              </li>
              <li
                className="cursor-pointer hover:text-lime-400 transition-colors"
                onClick={() => navigate("/challenges")}
              >
                Challenges
              </li>
              <li
                className="cursor-pointer hover:text-lime-400 transition-colors"
                onClick={() => navigate("/achievements")}
              >
                Achievements
              </li>
            </ul>
          </div>

          {/* SHOP */}
          <div>
            <div className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Gear
            </div>
            <ul className="space-y-2 text-[13px]">
              <li
                className="cursor-pointer hover:text-lime-400 transition-colors"
                onClick={() => navigate("/store")}
              >
                Storefront
              </li>
              <li className="text-gray-600 text-[12px]">
                Compression Tops (v2)
              </li>
              <li className="text-gray-600 text-[12px]">Mobility Shorts</li>
              <li className="text-gray-600 text-[12px]">Grip Socks</li>
              <li className="text-gray-600 text-[12px]">
                Recovery Bottle Pro
              </li>
            </ul>
          </div>

          {/* CONTACT / POLICY */}
          <div>
            <div className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Admin
            </div>
            <ul className="space-y-2 text-[13px]">
              <li className="text-gray-500">Support</li>
              <li className="text-gray-500">Contact</li>
              <li className="cursor-pointer hover:text-lime-400 transition-colors">
                Terms & Conditions
              </li>
              <li className="cursor-pointer hover:text-lime-400 transition-colors">
                Privacy Policy
              </li>
              <li className="text-[11px] text-lime-400/80">
                India · Live · 2025
              </li>
            </ul>
          </div>
        </div>

        {/* bottom microstrip */}
        <div className="mt-10 border-t border-lime-400/10 pt-6 text-[10px] uppercase tracking-widest text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-4 flex-wrap text-gray-500">
            <span>© 2025 Kreedentials</span>
            <span>All rights reserved</span>
            <span className="text-lime-400/80">Respect the grind</span>
          </div>
          <div className="flex gap-4 flex-wrap text-gray-600">
            <span className="hover:text-gray-300 cursor-pointer">
              Cookies
            </span>
            <span className="hover:text-gray-300 cursor-pointer">
              Security
            </span>
            <span
              className="hover:text-lime-400 cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              Settings
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
