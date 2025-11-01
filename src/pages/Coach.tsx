import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Timer,
  Wifi,
  CheckCircle,
  Dumbbell,
  Star,
  ChevronDown,
  CalendarClock,
  X,
  Send,
} from "lucide-react";

const COACHES = [
  {
    id: 1,
    name: "Coach Sarah Johnson",
    title: "Elite Sports Trainer",
    experience: "15 Years Experience",
    specialization: "Strength & Conditioning",
    avatar:
      "https://images.unsplash.com/photo-1610465299993-32b19fbb5f3b?q=80&w=800",
    rating: 4.9,
    clients: 120,
    nextSession: "2025-11-02T18:00:00",
    feedback: [
      "Excellent focus during last endurance set.",
      "Improved sprint mechanics by 12%.",
      "Remember: consistency beats intensity.",
      "Keep core tight on your deadlifts.",
    ],
    metrics: {
      Strength: 92,
      Endurance: 88,
      Stamina: 85,
      Focus: 95,
    },
  },
  {
    id: 2,
    name: "Coach Mark Lewis",
    title: "Performance Psychologist",
    experience: "10 Years Experience",
    specialization: "Mindset & Recovery",
    avatar:
      "https://images.unsplash.com/photo-1614270532548-7ecb1d43b1a5?q=80&w=800",
    rating: 4.8,
    clients: 98,
  },
  {
    id: 3,
    name: "Coach Rina Patel",
    title: "Endurance Specialist",
    experience: "12 Years Experience",
    specialization: "Cardio & Marathon Prep",
    avatar:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800",
    rating: 4.7,
    clients: 143,
  },
];

const Coach: React.FC = () => {
  const [assignedCoach] = useState(COACHES[0]);
  const [showAllCoaches, setShowAllCoaches] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    date: "",
    time: "",
    notes: "",
  });
  const [showToast, setShowToast] = useState(false);

  // Countdown timer for next session
  useEffect(() => {
  const timer = setInterval(() => {
    if (!assignedCoach.nextSession) return; // prevent undefined

    const now = new Date();
    const target = new Date(assignedCoach.nextSession as string);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft("Session starting soon!");
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    setTimeLeft(`${days}d ${hours}h ${minutes}m`);
  }, 1000);

  return () => clearInterval(timer);
}, [assignedCoach]);

  const handleSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setShowToast(true);
    setSessionForm({ date: "", time: "", notes: "" });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#050505] to-black text-white font-poppins overflow-hidden p-6 md:p-10">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[180px] bg-lime-400/10"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[200px] bg-lime-300/10"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center mb-10"
        style={{
          color: "#B4FF39",
          textShadow:
            "0 0 25px rgba(180,255,57,0.8), 0 0 60px rgba(180,255,57,0.4)",
        }}
      >
        My Coach
      </motion.h1>

      {/* Assigned Coach */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Coach Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#0A0A0A]/80 border border-lime-400/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(180,255,57,0.1)]"
        >
          <div className="relative">
            <img
              src={assignedCoach.avatar}
              alt={assignedCoach.name}
              className="w-full h-64 object-cover rounded-xl mb-4 shadow-[0_0_25px_#B4FF39]"
            />
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-lime-400/40"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Wifi className="text-lime-400 w-4 h-4" />
              <span className="text-xs text-lime-400">Online</span>
            </motion.div>
          </div>
          <h3 className="text-2xl font-semibold mb-1">{assignedCoach.name}</h3>
          <p className="text-lime-400 text-sm uppercase mb-2">
            {assignedCoach.title}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            {assignedCoach.experience} · {assignedCoach.specialization}
          </p>

          <button
            onClick={() => {
              setSelectedCoach(assignedCoach);
              setShowModal(true);
            }}
            className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-black py-3 rounded-lg font-semibold hover:shadow-[0_0_25px_#B4FF39] transition-all flex items-center justify-center gap-2"
          >
            <Timer size={18} /> Schedule Session
          </button>

          <div className="mt-6 p-4 bg-[#111]/70 rounded-xl border border-lime-400/20 text-center">
            <p className="text-sm text-gray-400 mb-1">Next Session In</p>
            <p className="text-lime-400 text-xl font-bold">{timeLeft}</p>
          </div>
        </motion.div>

        {/* Right: Feedback and Metrics */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[#0A0A0A]/80 border border-lime-400/20 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Dumbbell className="text-lime-400" /> Performance Metrics
            </h3>
            <div className="space-y-4">
              {Object.entries(assignedCoach.metrics ?? {}).map(([skill, val]) => (
                <div key={skill}>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>{skill}</span>
                    <span className="text-lime-400 font-semibold">{val}%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-lime-400 to-lime-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#0A0A0A]/80 border border-lime-400/20 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="text-lime-400" /> Recent Feedback
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {(assignedCoach.feedback ?? []).map((fb, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#111]/60 border border-lime-400/10 rounded-lg text-gray-300 flex items-start gap-2">
                  <CheckCircle className="text-lime-400 w-4 h-4 mt-1" />
                  <span>{fb}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* View Coaches Button */}
      <div className="text-center mt-14">
        <button
          onClick={() => setShowAllCoaches(!showAllCoaches)}
          className="mx-auto flex items-center gap-2 px-8 py-3 rounded-full bg-lime-400/10 border border-lime-400/40 hover:bg-lime-400/20 hover:shadow-[0_0_25px_#B4FF39] text-lime-400 font-semibold transition-all"
        >
          <ChevronDown
            className={`transition-transform ${
              showAllCoaches ? "rotate-180" : ""
            }`}
          />
          {showAllCoaches ? "Hide Other Coaches" : "View Other Coaches"}
        </button>
      </div>

      {/* Other Coaches Grid */}
      <AnimatePresence>
        {showAllCoaches && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {COACHES.slice(1).map((coach) => (
              <motion.div
                key={coach.id}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0A0A0A]/80 border border-lime-400/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(180,255,57,0.1)] flex flex-col"
              >
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  className="w-full h-52 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold">{coach.name}</h4>
                <p className="text-lime-400 text-sm uppercase mt-1 mb-2">
                  {coach.title}
                </p>
                <p className="text-gray-400 text-sm mb-3">
                  {coach.experience} · {coach.specialization}
                </p>

                <div className="flex items-center gap-2 text-lime-400 mb-4">
                  <Star size={16} className="fill-lime-400" />
                  <span>{coach.rating}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCoach(coach);
                    setShowModal(true);
                  }}
                  className="mt-auto bg-gradient-to-r from-lime-400 to-lime-500 text-black py-2.5 rounded-lg font-semibold hover:shadow-[0_0_25px_#B4FF39] transition-all flex items-center justify-center gap-2"
                >
                  <CalendarClock size={18} /> Request Session
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Request Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="relative w-[90%] max-w-md bg-[#0A0A0A]/90 border border-lime-400/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(180,255,57,0.4)]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X />
              </button>
              <h2 className="text-2xl font-semibold text-lime-400 mb-6">
                Request Session with {selectedCoach?.name}
              </h2>

              <form onSubmit={handleSessionSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionForm.date}
                    onChange={(e) =>
                      setSessionForm({ ...sessionForm, date: e.target.value })
                    }
                    className="w-full bg-black/60 border border-lime-400/30 rounded-lg p-3 text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={sessionForm.time}
                    onChange={(e) =>
                      setSessionForm({ ...sessionForm, time: e.target.value })
                    }
                    className="w-full bg-black/60 border border-lime-400/30 rounded-lg p-3 text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any goals or areas to focus on..."
                    value={sessionForm.notes}
                    onChange={(e) =>
                      setSessionForm({ ...sessionForm, notes: e.target.value })
                    }
                    className="w-full bg-black/60 border border-lime-400/30 rounded-lg p-3 text-white focus:outline-none focus:border-lime-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-black font-semibold py-3 rounded-lg hover:shadow-[0_0_25px_#B4FF39] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 right-6 bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_20px_#B4FF39]"
          >
            Session Request Sent ✅
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Coach;
