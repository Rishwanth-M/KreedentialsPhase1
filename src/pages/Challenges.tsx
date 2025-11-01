// src/pages/Challenges.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Target,
  Shield,
  Sparkles,
  Skull,
  Timer,
  Swords,
  Trophy,
  Zap,
  Activity,
  Star,
} from "lucide-react";


type ChallengeTier = "EASY" | "MEDIUM" | "HARD" | "ELITE";

type Challenge = {
  title: string;
  difficulty: ChallengeTier;
  rewardPoints: number;
  rewardXP: number;
  timeLimit: string;
  focus: string[];
  desc: string;
  tag?: string;
};

const featuredChallenge: Challenge = {
  title: "EXTRACTION RUN",
  difficulty: "ELITE",
  rewardPoints: 400,
  rewardXP: 1200,
  timeLimit: "48h window",
  focus: ["Speed", "Endurance", "Mental Control"],
  desc: "Ultra-high intensity sprint-repeat protocol under fatigue. You have 48 hours to submit verified times. Failure resets streak.",
  tag: "LIMITED EVENT",
};

const challengeList: Challenge[] = [
  {
    title: "Speed Trial Mk.III",
    difficulty: "HARD",
    rewardPoints: 200,
    rewardXP: 500,
    timeLimit: "6 min",
    focus: ["Acceleration", "Explosive Start"],
    desc: "Timed 30m / 40m dash repeats with <0.25s reaction target.",
    tag: "SPRINT LAB",
  },
  {
    title: "Endurance Gauntlet",
    difficulty: "MEDIUM",
    rewardPoints: 150,
    rewardXP: 300,
    timeLimit: "20 min",
    focus: ["VO2 / Engine", "Heart Rate Control"],
    desc: "Hold target pace without dropping form. Burn allowed. Quit not allowed.",
    tag: "STAMINA CORE",
  },
  {
    title: "Skill Execution Drill",
    difficulty: "ELITE",
    rewardPoints: 350,
    rewardXP: 900,
    timeLimit: "10 attempts",
    focus: ["Precision", "Consistency"],
    desc: "Land 10/10 technical reps at full speed, zero form breaks.",
    tag: "TECHNICAL",
  },
  {
    title: "Squad Sync Mission",
    difficulty: "EASY",
    rewardPoints: 100,
    rewardXP: 150,
    timeLimit: "Today only",
    focus: ["Teamwork", "Comms"],
    desc: "Group drill under coach supervision. Fail = whole squad fails.",
    tag: "TEAM PLAY",
  },
];

const tierStyle: Record<
  ChallengeTier,
  {
    bg: string;
    border: string;
    text: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  EASY: {
    bg: "bg-[#0a2f0a]/60",
    border: "border-green-400/30",
    text: "text-green-300",
    glow: "shadow-[0_0_30px_rgba(74,222,128,0.3)]",
    badgeBg: "bg-green-400 text-black",
    badgeText: "text-green-300",
  },
  MEDIUM: {
    bg: "bg-[#2f2a0a]/60",
    border: "border-yellow-400/30",
    text: "text-yellow-300",
    glow: "shadow-[0_0_30px_rgba(250,204,21,0.3)]",
    badgeBg: "bg-yellow-400 text-black",
    badgeText: "text-yellow-300",
  },
  HARD: {
    bg: "bg-[#2f1205]/60",
    border: "border-orange-400/30",
    text: "text-orange-300",
    glow: "shadow-[0_0_30px_rgba(251,146,60,0.3)]",
    badgeBg: "bg-orange-400 text-black",
    badgeText: "text-orange-300",
  },
  ELITE: {
    bg: "bg-[#101a05]/70",
    border: "border-lime-400/40",
    text: "text-lime-300",
    glow: "shadow-[0_0_40px_rgba(180,255,57,0.5)]",
    badgeBg: "bg-lime-400 text-black",
    badgeText: "text-lime-300",
  },
};

const Challenges: React.FC = () => {
  const [filter, setFilter] = useState<ChallengeTier | "ALL">("ALL");

  const filteredChallenges =
    filter === "ALL"
      ? challengeList
      : challengeList.filter((c) => c.difficulty === filter);

  // pretend streak stats
  const currentStreakDays = 6;
  const bestStreakDays = 14;
  const activeMissions = 3;
  const seasonTier = "ELITE";
  const seasonNumber = 3;

  // streak circle % eg. daily check-in challenges done this week
  const streakPct = Math.min(
    Math.round((currentStreakDays / 7) * 100),
    100
  ); // out of 7 days
  const r = 52;
  const dash = 2 * Math.PI * r;
  const dashOffset = dash * (1 - streakPct / 100);

  return (
    <div className="relative min-h-screen bg-black text-white p-8 overflow-hidden font-poppins">
      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 -z-10">
        {/* lime glow pulse */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-400/10 blur-[180px] rounded-full" />
        {/* faint diagonal grid */}
        <div className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(45deg,rgba(180,255,57,0.4)_0px,rgba(180,255,57,0.0)_2px,transparent_2px,transparent_4px)] pointer-events-none" />
      </div>

      {/* HEADER / STATUS BAR */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 relative z-10 mb-12">
        {/* LEFT: Title & Season Block */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold tracking-wide leading-[1.1]"
            style={{
              color: "#B4FF39",
              textShadow:
                "0 0 25px rgba(180,255,57,0.9), 0 0 60px rgba(180,255,57,0.4)",
            }}
          >
            Challenge Ops
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-4 text-gray-400 text-sm tracking-wide uppercase flex flex-col gap-1"
          >
            <div className="flex items-center gap-2">
              <Shield className="text-lime-400 w-4 h-4" />
              <span>Season {seasonNumber} · Tier {seasonTier}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="text-lime-400 w-4 h-4" />
              <span>{activeMissions} Active Missions</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-lime-400 w-4 h-4" />
              <span>High-risk sets = High payout</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Streak / Discipline Widget */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
          {/* ring card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-32 h-32 flex items-center justify-center rounded-xl border border-lime-400/30 bg-[#0a0a0a]/80 shadow-[0_0_40px_rgba(180,255,57,0.2)] overflow-hidden"
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="-rotate-90 absolute"
            >
              <circle
                cx="60"
                cy="60"
                r={r}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r={r}
                stroke="#B4FF39"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={dash}
                strokeDashoffset={dashOffset}
                transition={{ duration: 0.8 }}
              />
            </svg>

            <div className="relative text-center">
              <div className="text-xl font-extrabold text-[#B4FF39] leading-none">
                {currentStreakDays}d
              </div>
              <div className="text-[10px] text-gray-400 tracking-wider uppercase mt-1 leading-none">
                Current Streak
              </div>
            </div>
          </motion.div>

          {/* stats column */}
          <div className="text-[12px] tracking-wide">
            <div className="mb-4">
              <div className="text-gray-400 uppercase flex items-center gap-2">
                <Flame className="text-orange-400 w-4 h-4" />
                <span>Best Streak</span>
              </div>
              <div className="text-white text-xl font-bold">
                {bestStreakDays} days
              </div>
              <div className="text-gray-500 text-[11px]">
                You break it, you reset it.
              </div>
            </div>

            <div>
              <div className="text-gray-400 uppercase flex items-center gap-2">
                <Activity className="text-lime-400 w-4 h-4" />
                <span>Discipline Rating</span>
              </div>
              <div className="text-[#B4FF39] text-xl font-bold flex items-baseline gap-2">
                92.4
                <span className="text-gray-500 text-[10px] font-normal uppercase tracking-widest">
                  /100
                </span>
              </div>
              <div className="text-gray-500 text-[11px]">
                Above elite threshold.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED LEGENDARY MISSION */}
      <div className="relative z-10 mb-16">
        <div className="text-gray-300 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Skull className="text-lime-400 w-4 h-4" />
          <span>Featured Operation</span>
          <span className="px-2 py-[2px] text-[10px] font-bold bg-lime-400 text-black rounded uppercase tracking-widest">
            High Risk / High Reward
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative rounded-2xl p-6 border ${tierStyle["ELITE"].border} ${tierStyle["ELITE"].bg} ${tierStyle["ELITE"].glow} overflow-hidden`}
        >
          {/* background aura */}
          <div className="absolute -inset-20 bg-gradient-to-br from-lime-400/20 via-transparent to-transparent blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-6">
            {/* left: main info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between mb-4 gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-lime-400 text-black flex items-center justify-center font-extrabold text-lg shadow-[0_0_30px_#B4FF39] uppercase tracking-wide">
                    Ops
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-xl font-bold text-white leading-tight">
                        {featuredChallenge.title}
                      </div>
                      <div className="px-2 py-[2px] text-[10px] font-bold rounded bg-lime-400 text-black tracking-widest uppercase">
                        {featuredChallenge.tag}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-lime-400 font-semibold mt-1">
                      <Trophy className="w-3 h-3" />
                      <span>{featuredChallenge.difficulty} Tier</span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] leading-tight text-gray-400">
                  <div className="text-lime-400 font-semibold text-sm">
                    +{featuredChallenge.rewardXP} XP
                  </div>
                  <div className="text-lime-400 font-semibold text-sm">
                    +{featuredChallenge.rewardPoints} pts
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 justify-end mt-1">
                    <Timer className="w-3 h-3" />
                    <span>{featuredChallenge.timeLimit}</span>
                  </div>
                </div>
              </div>

              <div className="text-gray-300 text-sm leading-relaxed mb-4">
                {featuredChallenge.desc}
              </div>

              {/* focus tags */}
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest font-semibold">
                {featuredChallenge.focus.map((f, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-[4px] rounded bg-black/50 border border-lime-400/40 text-lime-400 shadow-[0_0_15px_#B4FF39]"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* right: CTA card */}
            <div className="w-full lg:w-56 flex-shrink-0">
              <div className="rounded-xl bg-black/60 border border-lime-400/30 p-4 h-full flex flex-col justify-between shadow-[0_0_30px_rgba(180,255,57,0.2)]">
                <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap className="text-lime-400 w-4 h-4" />
                  <span>Reward Package</span>
                </div>

                <div className="flex items-baseline gap-2 text-white font-bold leading-none">
                  <div className="text-3xl text-lime-400">
                    {featuredChallenge.rewardPoints}
                  </div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">
                    PTS
                  </div>
                </div>

                <div className="text-lime-400 text-sm font-semibold leading-none mb-4">
                  +{featuredChallenge.rewardXP} XP
                </div>

                <button className="w-full text-black font-semibold text-sm tracking-wide bg-gradient-to-r from-lime-400 to-lime-500 rounded-lg px-4 py-3 shadow-[0_0_30px_#B4FF39] hover:shadow-[0_0_60px_#B4FF39] transition-all flex items-center justify-center gap-2">
                  <Swords className="w-4 h-4" />
                  <span>Start Mission</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FILTER BAR + CHALLENGE GRID */}
      <div className="relative z-10 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="text-gray-300 text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
            <Target className="text-lime-400 w-4 h-4" />
            <span>All Available Missions</span>
          </div>
          <div className="text-[11px] text-gray-500 uppercase tracking-widest">
            Pick your loadout. No excuses.
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-[11px] font-semibold tracking-widest">
          {(["ALL", "EASY", "MEDIUM", "HARD", "ELITE"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === t
                  ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_20px_#B4FF39]"
                  : "border-lime-400/30 text-gray-400 hover:text-lime-400 hover:border-lime-400/60"
              }`}
            >
              {t === "ALL" ? "ALL" : `${t} TIER`}
            </button>
          ))}
        </div>
      </div>

      {/* CHALLENGE CARDS GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredChallenges.map((c, i) => {
          const style = tierStyle[c.difficulty];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{
                scale: 1.03,
                boxShadow: style.glow.replace("shadow-", "").replace("[", "").replace("]", ""),
              }}
              className={`relative rounded-2xl p-6 border ${style.border} ${style.bg} ${style.glow} overflow-hidden`}
            >
              {/* aura sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* TOP ROW */}
              <div className="flex items-start justify-between mb-4 gap-4 relative z-10">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-black text-lg uppercase tracking-wide ${
                      c.difficulty === "ELITE"
                        ? "bg-lime-400 shadow-[0_0_25px_#B4FF39]"
                        : c.difficulty === "HARD"
                        ? "bg-orange-400 shadow-[0_0_25px_rgba(251,146,60,0.6)]"
                        : c.difficulty === "MEDIUM"
                        ? "bg-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.6)]"
                        : "bg-green-400 shadow-[0_0_25px_rgba(74,222,128,0.6)]"
                    }`}
                  >
                    {c.difficulty.slice(0, 1)}
                  </div>

                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {c.title}
                      </h3>
                      {c.tag && (
                        <span className="text-[10px] font-bold tracking-wider px-2 py-[2px] rounded bg-black/60 border border-white/20 text-white/80 uppercase">
                          {c.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold">
                      <span className={style.badgeText}>{c.difficulty}</span>
                      <span className="text-gray-500">•</span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Timer className="w-3 h-3" />
                        {c.timeLimit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] leading-tight text-gray-400">
                  <div className={`${style.text} font-semibold text-sm`}>
                    +{c.rewardPoints} pts
                  </div>
                  <div className={`${style.text} font-semibold text-sm`}>
                    +{c.rewardXP} XP
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="text-gray-300 text-sm leading-relaxed mb-5 relative z-10">
                {c.desc}
              </div>

              {/* FOCUS TAGS */}
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest font-semibold relative z-10 mb-6">
                {c.focus.map((f, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-[4px] rounded bg-black/50 border border-white/10 text-white/70"
                  >
                    {f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Skull className="w-4 h-4 text-red-400" />
                  <span>Failure Ends Streak</span>
                </div>

                <button className="text-black font-semibold text-sm tracking-wide bg-gradient-to-r from-lime-400 to-lime-500 rounded-lg px-5 py-3 shadow-[0_0_30px_#B4FF39] hover:shadow-[0_0_60px_#B4FF39] transition-all flex items-center justify-center gap-2">
                  <Swords className="w-4 h-4" />
                  <span>Start Mission</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SEASON REWARD PREVIEW */}
      <div className="relative z-10 mt-20 max-w-4xl mx-auto bg-[#0a0a0a]/80 border border-lime-400/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(180,255,57,0.2)] overflow-hidden">
        <div className="absolute -inset-24 bg-gradient-to-br from-lime-400/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Trophy className="text-lime-400 w-4 h-4" />
              <span>Season Rewards Track</span>
            </div>

            <div className="text-white font-bold text-xl flex items-center gap-2">
              Unlock “Apex Mode Title”
              <span className="px-2 py-[2px] rounded bg-lime-400 text-black text-[10px] font-bold tracking-wider uppercase shadow-[0_0_20px_#B4FF39]">
                Cosmetic
              </span>
            </div>

            <div className="text-gray-400 text-sm leading-relaxed mt-2 max-w-xl">
              Hit 5 successful missions this week to earn an exclusive badge
              visible in coach view, leaderboards, and tournaments.
            </div>

            <div className="mt-4 text-[11px] text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Star className="text-lime-400 w-4 h-4" />
              <span>Progress: 3 / 5 Missions Complete</span>
            </div>

            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2 max-w-md">
              <motion.div
                className="h-full bg-gradient-to-r from-lime-400 to-lime-500"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <button className="flex-shrink-0 w-full lg:w-auto text-black font-semibold text-sm tracking-wide bg-gradient-to-r from-lime-400 to-lime-500 rounded-lg px-5 py-3 shadow-[0_0_30px_#B4FF39] hover:shadow-[0_0_60px_#B4FF39] transition-all flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            Claim Track
          </button>
        </div>
      </div>

      {/* FOOTER TAGLINE */}
      <motion.div
        className="text-center text-gray-500 text-[12px] tracking-wider mt-16"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        You don’t “join elite”. You prove it — daily.
      </motion.div>
    </div>
  );
};

export default Challenges;
