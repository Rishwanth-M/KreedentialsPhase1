// src/pages/DashboardPage.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { COLORS } from "../lib/constants";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";


// Dummy data for charts (replace with real later)
const performanceOverTime = [
  { label: "Mon", score: 72 },
  { label: "Tue", score: 75 },
  { label: "Wed", score: 78 },
  { label: "Thu", score: 81 },
  { label: "Fri", score: 84 },
  { label: "Sat", score: 86 },
  { label: "Sun", score: 90 },
];

const skillBreakdown = [
  { label: "Speed", value: 92 },
  { label: "Stamina", value: 85 },
  { label: "Agility", value: 88 },
  { label: "Power", value: 80 },
  { label: "Focus", value: 94 },
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // 🧠 Notice Board (display only)
const [notices] = React.useState([
  {
    text: "🏆 Congratulations to Team Falcon for breaking the sprint record!",
    time: "10:32 AM",
  },
  {
    text: "🔥 High-intensity training block starts Monday. Recovery prep required.",
    time: "Yesterday",
  },
  {
    text: "⚡ New AI analytics module added to Metrics dashboard.",
    time: "2 days ago",
  },
]);


  // small helper component: card shell
  const Card = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={
        "relative rounded-2xl bg-[#0a0a0a]/80 border border-lime-400/20 shadow-[0_0_40px_rgba(180,255,57,0.08)] p-6 overflow-hidden " +
        className
      }
    >
      {/* subtle animated scanline overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen bg-[repeating-linear-gradient(to_bottom,rgba(180,255,57,0.4)_0px,rgba(180,255,57,0.0)_2px,transparent_2px,transparent_4px)] animate-[pulse_4s_ease-in-out_infinite]" />
      {/* glow blobs */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-lime-400/20 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-lime-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  // simple tiny bar for progress stat cards
  const StatBar = ({ value }: { value: number }) => (
    <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full shadow-[0_0_15px_rgba(180,255,57,0.8)]"
        style={{
          width: `${value}%`,
          backgroundColor: COLORS.brand,
        }}
      />
    </div>
  );

  return (
    <div
      className="relative min-h-screen text-white p-6 md:p-8 overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* global background glow + particles */}
      <div className="absolute inset-0 -z-10">
        {/* main glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-lime-500/20 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime-400/10 blur-[180px] rounded-full" />
        {/* floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-lime-400/40 rounded-full"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* HEADER / WELCOME */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 relative z-10">
        <div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase"
            style={{
              color: COLORS.brand,
              textShadow:
                "0 0 20px rgba(180,255,57,0.7), 0 0 40px rgba(180,255,57,0.4)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-gray-400 mt-2 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {user?.email
              ? `Athlete ID: ${user.email.split("@")[0]}`
              : "Athlete ID: guest"}
            <br />
            Performance Control Center · Live
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col text-right"
        >
          <div className="text-xs text-gray-500 uppercase tracking-wider">
            Current Level
          </div>
          <div className="flex items-end gap-2">
            <div
              className="text-4xl font-extrabold leading-none"
              style={{ color: COLORS.brand }}
            >
              7
            </div>
            <div className="text-gray-500 text-sm leading-none mb-1">
              Elite Tier
            </div>
          </div>
          <div className="mt-2">
            <StatBar value={68} />
            <div className="text-[11px] text-gray-500 mt-1">
              68% to Level 8
            </div>
          </div>
        </motion.div>
      </div>

      {/* TOP GRID: STATS / SCORE / XP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Readout */}
        <Card>
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">
            Total Points
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-bold text-white leading-none">
              1,247
            </div>
            <div className="text-xs text-lime-400 font-semibold bg-lime-400/10 border border-lime-400/30 rounded px-2 py-1 leading-none shadow-[0_0_15px_rgba(180,255,57,0.5)]">
              +82 this week
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 leading-relaxed">
            Points gained from challenges, training sessions, and event
            placements.
          </div>
        </Card>

        {/* Card 2: Readout */}
        <Card>
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">
            Recovery / Fatigue
          </div>
          <div className="flex items-baseline gap-3">
            <div
              className="text-4xl font-bold leading-none"
              style={{ color: COLORS.brand }}
            >
              82%
            </div>
            <div className="text-xs text-gray-400 font-medium">
              Optimal Zone
            </div>
          </div>
          <div className="mt-4">
            <StatBar value={82} />
          </div>
          <div className="mt-3 text-[11px] text-gray-500 leading-relaxed">
            Your recovery is high. You’re cleared for high-intensity work.
          </div>
        </Card>

        {/* Card 3: Activity pulse */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-xs uppercase tracking-widest">
              Live Training Load
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-ping" />
              <span>LIVE</span>
            </div>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <div className="text-4xl font-bold text-white leading-none">
              High
            </div>
            <div className="text-xs text-gray-400 font-medium">
              Speed Phase
            </div>
          </div>

          <div className="mt-5 flex gap-2 h-14 items-end">
            {/* fake mini bar sparkline */}
            {[45, 60, 80, 75, 90, 65, 100, 88, 92, 70].map((h, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-sm bg-lime-400 shadow-[0_0_10px_rgba(180,255,57,0.8)]"
                style={{ height: `${h}%` }}
                animate={{
                  height: [`${h}%`, `${h + (i % 2 === 0 ? 5 : -5)}%`, `${h}%`],
                }}
                transition={{
                  duration: 2 + i * 0.07,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="text-[11px] text-gray-500 mt-3">
            Explosive drills detected in last 24h.
          </div>
        </Card>
      </div>

      {/* MIDDLE GRID: PERFORMANCE GRAPH + RADAR + EVENTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        {/* Left: Performance Trend */}
<Card className="xl:col-span-2">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-white text-lg font-semibold flex items-baseline gap-3">
      Performance Score
      <span className="text-[11px] text-gray-500 font-normal">Last 7 Days</span>
    </h2>
    <div className="text-[11px] text-gray-400 flex items-center gap-2">
      <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(180,255,57,0.8)]" />
      Live Sync
    </div>
  </div>

  {/* Glowing animated line chart */}
  <div className="relative h-64">
    {/* glowing animated background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.08)_0%,transparent_70%)] blur-3xl animate-pulse" />

    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={performanceOverTime}>
        <defs>
          <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B4FF39" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#B4FF39" stopOpacity={0.05} />
          </linearGradient>
          <filter id="shadow" height="300%" width="300%" x="-50%" y="-50%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="#B4FF39"
              floodOpacity="0.8"
            />
          </filter>
        </defs>

        <XAxis
          dataKey="label"
          tick={{ fill: "#aaa" }}
          axisLine={{ stroke: "#333" }}
          tickLine={{ stroke: "#333" }}
        />
        <YAxis
          domain={[60, 100]}
          tick={{ fill: "#888" }}
          axisLine={{ stroke: "#333" }}
          tickLine={{ stroke: "#333" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0a0a0a",
            border: "1px solid #B4FF39",
            borderRadius: "8px",
            color: "#fff",
          }}
        />

        {/* Glowing gradient fill below line */}
        <Area
          type="monotone"
          dataKey="score"
          stroke="none"
          fill="url(#glowGradient)"
          fillOpacity={0.3}
          animationDuration={2000}
        />

        {/* Main glowing line */}
        <Line
          type="monotone"
          dataKey="score"
          stroke="url(#glowGradient)"
          strokeWidth={4}
          dot={{
            r: 5,
            fill: "#B4FF39",
            stroke: "#000",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 10,
            fill: "#B4FF39",
            stroke: "#000",
            strokeWidth: 3,
          }}
          animationDuration={2000}
          style={{ filter: "url(#shadow)" }}
        />
      </LineChart>
    </ResponsiveContainer>

    {/* Pulsing glow ring over latest point */}
    <motion.div
      className="absolute right-16 bottom-[3.2rem] w-6 h-6 rounded-full bg-lime-400/60 blur-lg shadow-[0_0_25px_rgba(180,255,57,0.8)]"
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>

  <div className="text-[11px] text-gray-500 mt-4 leading-relaxed">
    Data synced <span className="text-lime-400">in real time</span>. Reaction time,
    sprint pace, and agility index have all increased this week. 🚀
  </div>
</Card>


        {/* Right: Attribute Radar-ish block */}
<Card className="xl:col-span-1 flex flex-col">
  <h2 className="text-white text-lg font-semibold mb-4 flex items-center justify-between">
    Attribute Profile
    <span className="text-[11px] text-gray-500 font-normal uppercase tracking-wider">
      Live Metrics
    </span>
  </h2>

  <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
    {/* Background glow & scanline */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.12)_0%,transparent_70%)] blur-3xl" />
    <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.5)_0px,rgba(255,255,255,0.5)_2px,transparent_2px,transparent_4px)] animate-[pulse_4s_ease-in-out_infinite]" />

    {/* Neon Ring Pulse */}
    <motion.div
      className="absolute rounded-full border border-lime-400/50 shadow-[0_0_40px_rgba(180,255,57,0.4)]"
      style={{ width: "220px", height: "220px" }}
      animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Real Recharts Radar */}
    <div className="w-[280px] h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={skillBreakdown}
        >
          <defs>
            <radialGradient id="limeRadarFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B4FF39" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#B4FF39" stopOpacity={0.05} />
            </radialGradient>
          </defs>
          <PolarGrid
            stroke="rgba(180,255,57,0.25)"
            radialLines={true}
          />
          <PolarAngleAxis
            dataKey="label"
            tick={{
              fill: "#ccc",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            tick={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Radar
            dataKey="value"
            stroke="#B4FF39"
            fill="url(#limeRadarFill)"
            fillOpacity={0.5}
            strokeWidth={2.5}
            dot={{
              r: 5,
              fill: "#B4FF39",
              stroke: "#000",
              strokeWidth: 1.5,
            }}
            animationBegin={0}
            animationDuration={1800}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="mt-6 text-center text-[12px] text-gray-400"
  >
    ⚡ Focus (94) and Speed (92) are elite.<br />
    🏋️‍♂️ Power (80) needs improvement. Recommend explosive drills next cycle.
  </motion.div>
</Card>

      </div>

      {/* BOTTOM GRID: ACTIVITY FEED + EVENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              Recent Activity
              <span className="text-[10px] text-gray-500 font-normal uppercase tracking-wider">
                Last 48h
              </span>
            </h2>
            <div className="text-[10px] text-gray-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-ping shadow-[0_0_10px_rgba(180,255,57,0.8)]" />
              Sync Active
            </div>
          </div>

          <div className="space-y-3 text-sm">
            {[
              "Completed Speed Challenge",
              "Attended Training Session",
              "Unlocked Achievement: Speed Demon",
              "Reached Level 7",
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-center gap-3 p-3 bg-[#1a1a1a]/60 border border-lime-400/10 rounded-lg shadow-[0_0_20px_rgba(180,255,57,0.05)]"
              >
                <div className="w-2 h-2 bg-lime-400 rounded-full shadow-[0_0_10px_rgba(180,255,57,0.8)]"></div>
                <p className="text-gray-300">{activity}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              Upcoming Events
              <span className="text-[10px] text-gray-500 font-normal uppercase tracking-wider">
                Schedule
              </span>
            </h2>
            <div className="text-[10px] text-gray-400">IST Local</div>
          </div>

          <div className="space-y-3 text-sm">
            {[
              { event: "Training Session", time: "Today, 5:00 PM" },
              { event: "Summer Championship", time: "July 15, 2025" },
              { event: "Team Practice", time: "Saturday, 10:00 AM" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col p-3 bg-[#1a1a1a]/60 border border-lime-400/10 rounded-lg shadow-[0_0_20px_rgba(180,255,57,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">{item.event}</p>
                  <div className="text-[10px] text-lime-400 bg-lime-400/10 border border-lime-400/30 rounded px-2 py-1 font-semibold shadow-[0_0_15px_rgba(180,255,57,0.5)]">
                    ACTIVE
                  </div>
                </div>
                <p className="text-gray-400 text-[12px]">{item.time}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-[11px] text-gray-500 mt-5 leading-relaxed">
            Championship prep cycle begins in 2 weeks. Maintain speed,
            deload power, sharpen reaction.
          </div>
        </Card>
      </div>
      {/* NOTICE BOARD SECTION (READ-ONLY) */}
<Card className="xl:col-span-3 mt-10">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-white text-lg font-semibold flex items-center gap-2">
      Notice Board
      <span className="text-[10px] text-gray-500 font-normal uppercase tracking-wider">
        Team Announcements
      </span>
    </h2>
    <div className="text-[10px] text-gray-400 flex items-center gap-2">
      <div className="w-2 h-2 bg-lime-400 rounded-full animate-ping shadow-[0_0_10px_rgba(180,255,57,0.8)]" />
      Live Feed
    </div>
  </div>

  <div className="relative bg-black/40 p-4 rounded-lg border border-lime-400/20 max-h-72 overflow-y-auto">
    {/* Background glow animation */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none animate-pulse" />

    {notices.length === 0 ? (
      <div className="flex flex-col items-center justify-center text-gray-500 text-sm py-10 relative z-10">
        <div className="text-4xl mb-2">📡</div>
        Awaiting latest team updates...
      </div>
    ) : (
      <div className="space-y-3 relative z-10">
        {notices.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-3 bg-[#1a1a1a]/60 border border-lime-400/10 rounded-lg shadow-[0_0_20px_rgba(180,255,57,0.05)]"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-lime-400 text-xs uppercase tracking-wider">
                Notice #{i + 1}
              </p>
              <span className="text-gray-500 text-[10px]">{n.time}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{n.text}</p>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</Card>

    </div>
  );
};

export default DashboardPage;
