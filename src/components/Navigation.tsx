// src/components/Navigation.tsx
import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Monitor,
  ShoppingBag,
  TrendingUp,
  Layers,
  Flame,
  Flag,
  UserCircle,
  Award,
  Play,
  Laptop,
  Settings,
  X,
  Menu,
  Wifi,
  WifiOff,
  Lock,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";
import { Howl } from "howler";

import KreedentialsLogo from "../assets/kreedentials-logo.png";

const QUOTES = [
  "Outwork yesterday.",
  "Pressure builds champions.",
  "Fast is fine. Precise is lethal.",
  "No off switch. Only forward.",
  "Heart > Hype.",
  "Train angry. Perform calm.",
  "Built, not born.",
  "More reps. Less excuses.",
];

// --- Define nav items ---
const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <Monitor size={22} /> },
  { name: "Store", path: "/app/store", icon: <ShoppingBag size={22} /> },
  { name: "Metrics", path: "/metrics", icon: <TrendingUp size={22} /> },
  { name: "Level", path: "/level", icon: <Layers size={22} /> },
  { name: "Challenges", path: "/challenges", icon: <Flame size={22} /> },
  { name: "Tournaments", path: "/tournaments", icon: <Flag size={22} /> },
  { name: "My Coach", path: "/coach", icon: <UserCircle size={22} /> },
  { name: "Achievements", path: "/achievements", icon: <Award size={22} /> },
  { name: "Content Hub", path: "/content", icon: <Play size={22} /> },
  { name: "Attendance", path: "/attendence", icon: <Laptop size={22} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
];

const unlocked = [
  "/dashboard",
  "/content",
  "/settings",
  "/attendence",
  "/coach",
  "/achievements",
  "/challenges",
  "/app/store",
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const navigate = useNavigate();

  // --- Sounds ---
  const clickSound = useMemo(
    () =>
      new Howl({
        src: ["/click-soft.mp3"],
        volume: 0.3,
        rate: 1.05,
      }),
    []
  );

  const denySound = useMemo(
    () =>
      new Howl({
        src: ["/access-denied.mp3"],
        volume: 0.4,
      }),
    []
  );

  const toggleMenu = () => {
    clickSound.play();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* --- MOBILE BUTTON --- */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 left-6 z-50 lg:hidden bg-black/80 backdrop-blur-md p-3 rounded-lg border border-lime-400/40 hover:shadow-[0_0_15px_#B4FF39] transition-all"
      >
        {isOpen ? (
          <X size={22} className="text-lime-400" />
        ) : (
          <Menu size={22} className="text-lime-400" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* --- SIDEBAR --- */}
      <motion.nav
        initial={{ x: -300 }}
        animate={{
          x: isOpen || window.innerWidth >= 1024 ? 0 : -300,
        }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 h-full w-80 bg-black/90 text-white z-40 overflow-y-auto border-r border-lime-400/20 shadow-[0_0_40px_rgba(180,255,57,0.2)] backdrop-blur-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="relative p-6 pb-24">
          {/* --- HOLOGRAPHIC LOGO --- */}
          <div className="relative mb-10">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotateZ: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-lime-400/30 via-transparent to-transparent border border-lime-400/40 shadow-[0_0_30px_#B4FF39]" />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center rounded-xl p-4 border border-lime-400/20 bg-[radial-gradient(circle_at_50%_0%,rgba(180,255,57,0.15)_0%,rgba(0,0,0,0)_70%)] shadow-[0_0_40px_rgba(180,255,57,0.35)] backdrop-blur-[6px]">
              <img
                src={KreedentialsLogo}
                alt="Kreedentials"
                className="w-24 h-24 object-contain drop-shadow-[0_0_15px_#B4FF39]"
              />
            </div>
          </div>

          {/* --- MENU --- */}
          <ul className="space-y-3 relative z-20">
            {navItems.map((item) => {
              const locked = !unlocked.includes(item.path);
              return (
                <motion.li
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {locked ? (
                    <div
                      onClick={() => denySound.play()}
                      className="relative flex items-center gap-4 px-6 py-3 rounded-lg font-medium text-lg text-gray-500 cursor-not-allowed bg-[#050505]/80 border border-red-400/20 hover:bg-red-500/5 transition-all group overflow-hidden"
                    >
                      <Lock size={18} className="text-red-400" />
                      <span className="tracking-wide">{item.name}</span>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        clickSound.play();
                        setIsOpen(false);
                      }}
                      className={({ isActive }) =>
                        `relative flex items-center gap-4 px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 group ${
                          isActive
                            ? "bg-lime-400 text-black shadow-[0_0_20px_#B4FF39]"
                            : "text-gray-400 hover:text-lime-400 hover:bg-lime-400/5"
                        }`
                      }
                    >
                      {item.icon}
                      <span className="tracking-wide">{item.name}</span>
                    </NavLink>
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* --- FOOTER --- */}
          <div className="mt-10 border-t border-lime-400/10 pt-6 text-center space-y-4">
            {/* Back to Home button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-2 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 font-semibold text-sm py-3 rounded-lg border border-lime-400/30 shadow-[0_0_15px_rgba(180,255,57,0.3)] transition-all"
            >
              <Home size={16} />
              Back to Home
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-gray-500 text-[10px] tracking-wider uppercase"
            >
              © 2025 Kreedentials
              <br />
              <span className="text-lime-400">UPDATE - 1.0</span>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* --- TOP BAR --- */}
      <div className="hidden lg:block fixed top-0 left-80 right-0 h-16 bg-black/70 backdrop-blur-xl border-b border-lime-400/20 z-20">
        <div className="h-full px-8 flex items-center justify-between">
          <motion.div
            key={quoteIndex}
            className="text-white text-lg font-semibold tracking-wider flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-lime-400">⚡</span>
            <span className="text-lime-400">{QUOTES[quoteIndex]}</span>
          </motion.div>

          <motion.div
            className={`flex items-center gap-2 text-[11px] px-3 py-2 rounded-md border ${
              online
                ? "border-lime-400/40 bg-lime-400/10 text-lime-400 shadow-[0_0_15px_#B4FF39]"
                : "border-red-500/40 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
            }`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {online ? (
              <>
                <Wifi size={14} />
                <span>ONLINE</span>
              </>
            ) : (
              <>
                <WifiOff size={14} />
                <span>OFFLINE</span>
              </>
            )}
            <span className="text-gray-400/70">· Sync Active</span>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
