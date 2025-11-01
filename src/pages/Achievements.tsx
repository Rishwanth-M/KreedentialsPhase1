import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Lock,
  Sparkles,
  Flame,
  Shield,
  Target,
  Star,
  Crown,
  Medal,
  X,
  Swords,
} from "lucide-react";

// ====== DATA ======
type Rarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

type Achievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  rarity: Rarity;
  xp: number;
  dateUnlocked?: string;
  requirement?: string;
  progress?: { current: number; total: number };
  icon?: React.ReactNode;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_win",
    title: "First Victory",
    description: "Win your first challenge",
    unlocked: true,
    rarity: "COMMON",
    xp: 100,
    dateUnlocked: "2025-10-02",
    requirement: "Win 1 official challenge",
    progress: { current: 1, total: 1 },
    icon: <Shield className="w-8 h-8" />,
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Complete 10 speed challenges",
    unlocked: true,
    rarity: "RARE",
    xp: 250,
    dateUnlocked: "2025-10-10",
    requirement: "Complete 10 speed drills under target time",
    progress: { current: 10, total: 10 },
    icon: <Flame className="w-8 h-8" />,
  },
  {
    id: "consistency",
    title: "Consistency King",
    description: "Train for 30 days straight",
    unlocked: true,
    rarity: "EPIC",
    xp: 500,
    dateUnlocked: "2025-10-28",
    requirement: "Log training 30/30 consecutive days",
    progress: { current: 30, total: 30 },
    icon: <Target className="w-8 h-8" />,
  },
  {
    id: "team_player",
    title: "Team Player",
    description: "Complete 5 team challenges",
    unlocked: false,
    rarity: "RARE",
    xp: 200,
    requirement: "Participate in 5+ squad drills",
    progress: { current: 2, total: 5 },
    icon: <Swords className="w-8 h-8" />,
  },
  {
    id: "master_athlete",
    title: "Master Athlete",
    description: "Reach level 10",
    unlocked: false,
    rarity: "EPIC",
    xp: 750,
    requirement: "Reach player level 10",
    progress: { current: 7, total: 10 },
    icon: <Medal className="w-8 h-8" />,
  },
  {
    id: "champion",
    title: "Champion",
    description: "Win a tournament",
    unlocked: false,
    rarity: "LEGENDARY",
    xp: 1200,
    requirement: "Place 1st in an official tournament",
    progress: { current: 0, total: 1 },
    icon: <Crown className="w-8 h-8" />,
  },
];

// rarity styling helpers
const rarityConfig: Record<
  Rarity,
  {
    label: string;
    ring: string;
    bg: string;
    border: string;
    text: string;
    shadow: string;
  }
> = {
  COMMON: {
    label: "COMMON",
    ring: "from-gray-400/40 to-transparent",
    bg: "bg-[#0a0a0a]/80",
    border: "border-gray-600/40",
    text: "text-gray-300",
    shadow: "shadow-[0_0_20px_rgba(180,180,180,0.2)]",
  },
  RARE: {
    label: "RARE",
    ring: "from-sky-400/40 to-transparent",
    bg: "bg-[#0a0f18]/80",
    border: "border-sky-400/30",
    text: "text-sky-300",
    shadow:
      "shadow-[0_0_30px_rgba(56,189,248,0.4),0_0_60px_rgba(56,189,248,0.1)]",
  },
  EPIC: {
    label: "EPIC",
    ring: "from-fuchsia-400/40 to-transparent",
    bg: "bg-[#140016]/80",
    border: "border-fuchsia-400/30",
    text: "text-fuchsia-300",
    shadow:
      "shadow-[0_0_30px_rgba(232,121,249,0.4),0_0_60px_rgba(232,121,249,0.1)]",
  },
  LEGENDARY: {
    label: "LEGENDARY",
    ring: "from-[#B4FF39]/40 to-transparent",
    bg: "bg-[#101a05]/80",
    border: "border-lime-400/40",
    text: "text-lime-300",
    shadow:
      "shadow-[0_0_40px_rgba(180,255,57,0.5),0_0_80px_rgba(180,255,57,0.15)]",
  },
};

const Achievements: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [selected, setSelected] = useState<Achievement | null>(null);

  const unlockedList = ACHIEVEMENTS.filter((a) => a.unlocked);
  const totalUnlocked = unlockedList.length;
  const total = ACHIEVEMENTS.length;
  const progressPct = Math.round((totalUnlocked / total) * 100);

  // find next target (first locked)
  const nextTarget = ACHIEVEMENTS.find((a) => !a.unlocked);

  // filter logic
  const filtered = ACHIEVEMENTS.filter((a) =>
    filter === "all" ? true : filter === "unlocked" ? a.unlocked : !a.unlocked
  );

  return (
    <div className="relative min-h-screen bg-black text-white p-8 overflow-hidden font-poppins">
      {/* === Background Glow & grid lines === */}
      <div className="absolute inset-0 -z-10">
        {/* lime aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lime-400/10 blur-[200px] rounded-full" />
        {/* subtle scan grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.6)_0px,rgba(255,255,255,0.6)_2px,transparent_2px,transparent_4px)] pointer-events-none" />
      </div>

      {/* === PAGE TITLE / SUMMARY HEADER === */}
      <div className="flex flex-col xl:flex-row items-center xl:items-start justify-between gap-10 mb-12 relative z-10">
        {/* Left: Title + totals */}
        <div className="text-center xl:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold tracking-wider mb-4"
            style={{
              color: "#B4FF39",
              textShadow:
                "0 0 25px rgba(180,255,57,0.8), 0 0 60px rgba(180,255,57,0.4)",
            }}
          >
            Achievement Vault
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-gray-400 text-sm tracking-wide uppercase flex flex-col items-center xl:items-start gap-1"
          >
            <span className="flex items-center gap-2">
              <Star className="text-lime-400 w-4 h-4" />
              <span>
                {totalUnlocked}/{total} unlocked · {progressPct}% complete
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Trophy className="text-lime-400 w-4 h-4" />
              <span>Total XP Earned:{" "}
                <span className="text-lime-400 font-semibold">
                  {unlockedList.reduce((sum, a) => sum + a.xp, 0)} XP
                </span>
              </span>
            </span>
          </motion.div>
        </div>

        {/* Right: Progress Ring & Filters */}
        <div className="flex flex-col items-center gap-6">
          {/* circular progress */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative w-40 h-40 flex items-center justify-center"
          >
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="-rotate-90"
            >
              <circle
                cx="80"
                cy="80"
                r="60"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="60"
                stroke="#B4FF39"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={
                  2 * Math.PI * 60 * (1 - progressPct / 100)
                }
                transition={{ duration: 1 }}
              />
            </svg>
            <div className="absolute text-center">
              <div className="text-3xl font-extrabold text-[#B4FF39]">
                {progressPct}%
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                Career Sync
              </div>
            </div>
          </motion.div>

          {/* filter buttons */}
          <div className="flex gap-3">
            {["all", "unlocked", "locked"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider border transition-all ${
                  filter === f
                    ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_20px_#B4FF39]"
                    : "border-lime-400/30 text-gray-400 hover:text-lime-400 hover:border-lime-400/60"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === FEATURED BADGES (LEGENDARY / EPIC flex row) === */}
      <div className="mb-12 relative z-10">
        <h2 className="text-gray-300 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Crown className="text-lime-400 w-4 h-4" />
          Signature Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {ACHIEVEMENTS.filter(
            (a) => a.rarity === "LEGENDARY" || a.rarity === "EPIC"
          ).map((a) => {
            const cfg = rarityConfig[a.rarity];
            return (
              <motion.div
                key={a.id}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-2xl p-5 border ${cfg.border} ${cfg.bg} ${cfg.shadow} overflow-hidden`}
                onClick={() => setSelected(a)}
              >
                {/* aura ring */}
                <div
                  className={`absolute -inset-20 rounded-full blur-[90px] bg-gradient-to-br ${cfg.ring} opacity-40 pointer-events-none`}
                />
                {/* top row */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-black ${
                        a.unlocked
                          ? "bg-lime-400 shadow-[0_0_30px_#B4FF39]"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {a.icon ?? <Trophy className="w-8 h-8" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">
                          {a.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold tracking-wider px-2 py-[2px] rounded ${
                            a.rarity === "LEGENDARY"
                              ? "bg-lime-400 text-black"
                              : a.rarity === "EPIC"
                              ? "bg-fuchsia-400 text-black"
                              : a.rarity === "RARE"
                              ? "bg-sky-400 text-black"
                              : "bg-gray-400 text-black"
                          }`}
                        >
                          {a.rarity}
                        </span>
                      </div>
                      <div className="text-[12px] text-gray-400 leading-tight">
                        {a.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-[11px] leading-tight text-gray-400">
                    <div className="text-lime-400 font-semibold">
                      +{a.xp} XP
                    </div>
                    {a.unlocked ? (
                      <div>Unlocked</div>
                    ) : (
                      <div className="text-red-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </div>
                    )}
                  </div>
                </div>

                {/* progress bar for locked ones */}
                {!a.unlocked && a.progress && (
                  <div className="relative z-10 mt-4">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>{a.requirement}</span>
                      <span className="text-white font-semibold">
                        {a.progress.current}/{a.progress.total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          a.rarity === "LEGENDARY"
                            ? "bg-gradient-to-r from-lime-400 to-lime-500"
                            : a.rarity === "EPIC"
                            ? "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600"
                            : "bg-gradient-to-r from-sky-400 to-sky-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (a.progress.current / a.progress.total) * 100
                          }%`,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === ALL ACHIEVEMENTS GRID === */}
      <div className="relative z-10">
        <h2 className="text-gray-300 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Trophy className="text-lime-400 w-4 h-4" />
          Full Career Log
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((a, i) => {
            const cfg = rarityConfig[a.rarity];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    a.unlocked
                      ? "0 0 35px rgba(180,255,57,0.4)"
                      : "0 0 20px rgba(100,100,100,0.3)",
                }}
                onClick={() => setSelected(a)}
                className={`relative rounded-2xl p-6 border ${cfg.border} ${cfg.bg} ${cfg.shadow} overflow-hidden cursor-pointer group`}
              >
                {/* subtle aura sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* icon bubble */}
                <div
                  className={`w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    a.unlocked
                      ? "bg-lime-400 text-black shadow-[0_0_25px_#B4FF39]"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {a.icon ?? <Trophy className="w-10 h-10" />}
                </div>

                {/* text */}
                <h3 className="text-xl font-bold text-center text-white mb-1">
                  {a.title}
                </h3>
                <p className="text-gray-400 text-center text-sm mb-4 leading-snug">
                  {a.description}
                </p>

                {/* rarity + status row */}
                <div className="flex items-center justify-center gap-2 text-[10px] uppercase font-semibold tracking-wider mb-4">
                  <span
                    className={`px-2 py-[2px] rounded ${
                      a.rarity === "LEGENDARY"
                        ? "bg-lime-400 text-black"
                        : a.rarity === "EPIC"
                        ? "bg-fuchsia-400 text-black"
                        : a.rarity === "RARE"
                        ? "bg-sky-400 text-black"
                        : "bg-gray-400 text-black"
                    }`}
                  >
                    {a.rarity}
                  </span>
                  {a.unlocked ? (
                    <span className="text-lime-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                {/* xp / unlocked date / progress */}
                <div className="text-center text-[11px] leading-relaxed text-gray-400">
                  <div className="text-lime-400 font-semibold">
                    +{a.xp} XP
                  </div>
                  {a.unlocked && a.dateUnlocked ? (
                    <div>
                      Earned on{" "}
                      <span className="text-white font-medium">
                        {a.dateUnlocked}
                      </span>
                    </div>
                  ) : (
                    a.requirement && (
                      <div className="text-gray-500 italic">
                        Goal: {a.requirement}
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === NEXT TARGET / CTA === */}
      {nextTarget && (
        <div className="relative z-10 mt-16 max-w-3xl mx-auto bg-[#0a0a0a]/80 border border-lime-400/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(180,255,57,0.2)] overflow-hidden">
          {/* glow */}
          <div className="absolute -inset-20 bg-lime-400/10 blur-[120px] pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-[11px] text-gray-400 tracking-wider uppercase flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-lime-400" />
                Next Unlock Target
              </div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                {nextTarget.title}
                {nextTarget.rarity === "LEGENDARY" && (
                  <Crown className="w-5 h-5 text-lime-400" />
                )}
              </div>
              <div className="text-gray-400 text-sm mb-3">
                {nextTarget.description}
              </div>
              {nextTarget.progress && (
                <>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>{nextTarget.requirement}</span>
                    <span className="text-white font-semibold">
                      {nextTarget.progress.current}/{nextTarget.progress.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-800 overflow-hidden max-w-sm">
                    <motion.div
                      className="h-full bg-gradient-to-r from-lime-400 to-lime-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (nextTarget.progress.current /
                            nextTarget.progress.total) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <button className="w-full md:w-auto text-black font-semibold text-sm tracking-wide bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl px-5 py-3 shadow-[0_0_30px_#B4FF39] hover:shadow-[0_0_60px_#B4FF39] transition-all flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4" />
                Grind & Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL: ACHIEVEMENT INSPECT === */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="relative w-full max-w-md rounded-2xl border border-lime-400/40 bg-black/90 shadow-[0_0_60px_rgba(180,255,57,0.5)] p-6 overflow-hidden"
            >
              {/* subtle moving glow */}
              <motion.div
                className="absolute -inset-20 bg-gradient-to-br from-lime-400/20 via-transparent to-transparent blur-[90px] pointer-events-none"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Close btn */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setSelected(null)}
              >
                <X size={20} />
              </button>

              {/* icon bubble big */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={`w-24 h-24 rounded-xl flex items-center justify-center mb-4 ${
                    selected.unlocked
                      ? "bg-lime-400 text-black shadow-[0_0_30px_#B4FF39]"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {selected.icon ?? <Trophy className="w-10 h-10" />}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xl font-bold text-white">
                    {selected.title}
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-wider px-2 py-[2px] rounded ${
                      selected.rarity === "LEGENDARY"
                        ? "bg-lime-400 text-black"
                        : selected.rarity === "EPIC"
                        ? "bg-fuchsia-400 text-black"
                        : selected.rarity === "RARE"
                        ? "bg-sky-400 text-black"
                        : "bg-gray-400 text-black"
                    }`}
                  >
                    {selected.rarity}
                  </span>
                </div>

                <div className="text-gray-400 text-sm mb-4 max-w-xs leading-relaxed">
                  {selected.description}
                </div>

                {/* XP */}
                <div className="text-lime-400 font-semibold text-lg mb-2">
                  +{selected.xp} XP
                </div>

                {/* status */}
                {selected.unlocked ? (
                  <div className="text-[12px] text-lime-400 flex items-center gap-2 font-semibold tracking-wide">
                    <Sparkles className="w-4 h-4" />
                    <span>Unlocked</span>
                    {selected.dateUnlocked && (
                      <span className="text-gray-400 font-normal">
                        • {selected.dateUnlocked}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-[12px] text-red-400 flex items-center gap-2 font-semibold tracking-wide">
                    <Lock className="w-4 h-4" />
                    <span>Locked</span>
                  </div>
                )}

                {/* requirement & progress */}
                {selected.requirement && (
                  <div className="w-full mt-6 text-left">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
                      Requirement
                    </div>
                    <div className="text-white text-sm mb-3">
                      {selected.requirement}
                    </div>

                    {selected.progress && (
                      <>
                        <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                          <span>
                            Progress:{" "}
                            <span className="text-white font-semibold">
                              {selected.progress.current}/
                              {selected.progress.total}
                            </span>
                          </span>
                          <span className="text-lime-400 font-semibold">
                            {Math.round(
                              (selected.progress.current /
                                selected.progress.total) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-lime-400 to-lime-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (selected.progress.current /
                                  selected.progress.total) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* CTA */}
                {!selected.unlocked && (
                  <button className="w-full mt-8 text-black font-semibold text-sm tracking-wide bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl px-5 py-3 shadow-[0_0_30px_#B4FF39] hover:shadow-[0_0_60px_#B4FF39] transition-all flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4" />
                  I Want This
                </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* footer tagline */}
      <motion.div
        className="text-center text-gray-500 text-[12px] tracking-wider mt-20"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        “Greatness isn't random. It's logged.”
      </motion.div>
    </div>
  );
};

export default Achievements;
