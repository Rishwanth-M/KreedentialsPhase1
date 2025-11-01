import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronDown, Sparkles } from "lucide-react";

const Attendence: React.FC = () => {
  const months = [
    "January 2025",
    "February 2025",
    "March 2025",
    "April 2025",
    "May 2025",
    "June 2025",
    "July 2025",
    "August 2025",
    "September 2025",
    "October 2025",
    "November 2025",
    "December 2025",
  ];

  const [selectedMonth, setSelectedMonth] = useState("October 2025");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalDays = 31;
  const attendedDays = [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 16, 18, 19, 22, 23, 24, 26, 27, 29];
  const attendanceRate = Math.round((attendedDays.length / totalDays) * 100);
  const absentDays = totalDays - attendedDays.length;
  const longestStreak = 9;
  const currentStreak = 4;

  const ringRadius = 50;
  const circumference = 2 * Math.PI * ringRadius;
  const progressOffset = circumference - (attendanceRate / 100) * circumference;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white font-poppins">
      {/* === Light Glow Background === */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-lime-400/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime-300/5 blur-[160px] rounded-full" />
      </div>

      {/* === Header with Month Selector === */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 pt-10 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 sm:mb-0"
          style={{
            color: "#B4FF39",
            textShadow:
              "0 0 20px rgba(180,255,57,0.7), 0 0 40px rgba(180,255,57,0.3)",
          }}
        >
          My Attendance
        </motion.h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-5 py-2 bg-[#0A0A0A]/80 border border-lime-400/30 rounded-lg hover:shadow-[0_0_20px_#B4FF39] transition-all"
          >
            <CalendarDays className="text-lime-400" size={18} />
            <span>{selectedMonth}</span>
            <ChevronDown
              className={`transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-[#111]/90 backdrop-blur-xl border border-lime-400/20 rounded-lg shadow-lg z-10"
              >
                {months.map((month) => (
                  <li
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-2 hover:bg-lime-400/10 cursor-pointer ${
                      month === selectedMonth
                        ? "text-lime-400"
                        : "text-gray-300"
                    }`}
                  >
                    {month}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* === Summary Section === */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6">
        {/* --- Circular Progress --- */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative w-48 h-48 flex items-center justify-center"
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
              r={ringRadius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="10"
              fill="none"
            />
            <motion.circle
              cx="80"
              cy="80"
              r={ringRadius}
              stroke="#b4ff39"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              animate={{ strokeDashoffset: progressOffset }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-4xl font-extrabold text-[#B4FF39]">
              {attendanceRate}%
            </div>
            <div className="text-gray-400 uppercase text-xs tracking-widest">
              Attendance
            </div>
          </div>
        </motion.div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-2xl">
          <div className="bg-[#0A0A0A]/70 border border-lime-400/20 rounded-xl p-5 text-center shadow-[0_0_30px_rgba(180,255,57,0.1)]">
            <p className="text-gray-400 text-sm uppercase mb-1">Present</p>
            <p className="text-3xl font-bold text-[#B4FF39]">
              {attendedDays.length}
            </p>
          </div>
          <div className="bg-[#0A0A0A]/70 border border-red-400/20 rounded-xl p-5 text-center shadow-[0_0_30px_rgba(255,0,0,0.1)]">
            <p className="text-gray-400 text-sm uppercase mb-1">Absent</p>
            <p className="text-3xl font-bold text-red-400">{absentDays}</p>
          </div>
          <div className="bg-[#0A0A0A]/70 border border-lime-400/20 rounded-xl p-5 text-center shadow-[0_0_30px_rgba(180,255,57,0.1)]">
            <p className="text-gray-400 text-sm uppercase mb-1">Total Days</p>
            <p className="text-3xl font-bold text-white">{totalDays}</p>
          </div>
        </div>
      </div>

      {/* === Compact Calendar Grid === */}
      <motion.div
        className="relative mt-14 mx-auto max-w-4xl grid grid-cols-7 gap-3 px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
          const attended = attendedDays.includes(day);
          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={`relative aspect-square flex items-center justify-center text-sm font-semibold rounded-lg border transition-all duration-200 ${
                attended
                  ? "bg-lime-400/50 border-lime-400/40 text-black"
                  : "bg-gray-800/40 border-gray-700 text-gray-400"
              }`}
            >
              {day}
            </motion.div>
          );
        })}
      </motion.div>

      {/* === Footer === */}
      <motion.div
        className="mt-16 text-center text-gray-500 text-sm"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="inline w-4 h-4 text-lime-400 mr-1" />
        “Every day present counts towards greatness.”
      </motion.div>
    </div>
  );
};

export default Attendence;
