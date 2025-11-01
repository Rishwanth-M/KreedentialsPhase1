import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  Eye,
  Settings,
  LogOut,
  Moon,
  Sun,
  Database,
  Bug,
  Wifi,
  Smartphone,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SettingsPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: false,
    achievements: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showAchievements: true,
    showMetrics: true,
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#050505] to-black text-white font-poppins overflow-hidden">
      {/* === Background Glow === */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[180px] bg-lime-400/10"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[200px] bg-lime-300/10"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* === Header === */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center pt-10 mb-12"
        style={{
          color: "#B4FF39",
          textShadow:
            "0 0 25px rgba(180,255,57,0.8), 0 0 60px rgba(180,255,57,0.4)",
        }}
      >
        Settings Control Hub
      </motion.h1>

      <div className="max-w-5xl mx-auto space-y-10 px-6 pb-20">
        {/* === PROFILE CARD === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#0A0A0A]/80 border border-lime-400/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(180,255,57,0.1)] flex flex-col sm:flex-row items-center gap-6"
        >
          <motion.div
            className="w-28 h-28 rounded-full bg-gradient-to-br from-lime-400/50 to-transparent flex items-center justify-center text-black text-5xl font-bold shadow-[0_0_25px_#B4FF39]"
            animate={{ rotateZ: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {user?.email?.[0]?.toUpperCase() || "U"}
          </motion.div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">{user?.email}</h2>
            <p className="text-lime-400 text-sm uppercase tracking-widest mt-1">
              Active · Pro Athlete Tier
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Connected Device: iPhone 15 Pro Max · Last Sync: 5 mins ago
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <button
              onClick={() => signOut()}
              className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:shadow-[0_0_25px_#ff4444] transition-all flex items-center gap-2"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </motion.div>

        {/* === ACCOUNT SETTINGS === */}
        <section className="bg-[#0A0A0A]/70 border border-lime-400/20 rounded-2xl shadow-[0_0_25px_rgba(180,255,57,0.1)] p-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <User className="text-lime-400" /> Account & Security
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <button className="bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 rounded-lg p-4 text-left transition-all">
              <Shield className="text-lime-400 mb-2" />
              <p className="font-semibold">Change Password</p>
              <p className="text-sm text-gray-400">Update your login credentials.</p>
            </button>
            <button className="bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 rounded-lg p-4 text-left transition-all">
              <Wifi className="text-lime-400 mb-2" />
              <p className="font-semibold">Device Sync</p>
              <p className="text-sm text-gray-400">Manage connected devices.</p>
            </button>
          </div>
        </section>

        {/* === NOTIFICATIONS === */}
        <section className="bg-[#0A0A0A]/70 border border-lime-400/20 rounded-2xl shadow-[0_0_25px_rgba(180,255,57,0.1)] p-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Bell className="text-lime-400" /> Notifications
          </h3>
          {Object.keys(notifications).map((key) => (
            <label
              key={key}
              className="flex items-center justify-between py-3 border-b border-gray-800 last:border-none cursor-pointer"
            >
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof notifications],
                    }))
                  }
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-[#b4ff39] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </div>
            </label>
          ))}
        </section>

        {/* === PRIVACY === */}
        <section className="bg-[#0A0A0A]/70 border border-lime-400/20 rounded-2xl shadow-[0_0_25px_rgba(180,255,57,0.1)] p-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Eye className="text-lime-400" /> Privacy Controls
          </h3>
          {Object.keys(privacy).map((key) => (
            <label
              key={key}
              className="flex items-center justify-between py-3 border-b border-gray-800 last:border-none cursor-pointer"
            >
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={privacy[key as keyof typeof privacy]}
                  onChange={() =>
                    setPrivacy((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof privacy],
                    }))
                  }
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-[#b4ff39] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </div>
            </label>
          ))}
        </section>

        {/* === THEME & SYSTEM === */}
        <section className="bg-[#0A0A0A]/70 border border-lime-400/20 rounded-2xl shadow-[0_0_25px_rgba(180,255,57,0.1)] p-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Settings className="text-lime-400" /> System Preferences
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 rounded-lg p-4 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="text-lime-400" /> : <Sun className="text-yellow-400" />}
                <span className="font-semibold">Theme Mode</span>
              </div>
              <span className="text-sm text-gray-400">
                {darkMode ? "Dark" : "Light"}
              </span>
            </button>
            <button className="bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 rounded-lg p-4 flex items-center justify-between transition-all">
              <Database className="text-lime-400" />
              <span className="font-semibold">Backup Data</span>
              <span className="text-xs text-gray-400">Cloud Sync</span>
            </button>
            <button className="bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 rounded-lg p-4 flex items-center justify-between transition-all">
              <Bug className="text-lime-400" />
              <span className="font-semibold">Report an Issue</span>
              <span className="text-xs text-gray-400">Support</span>
            </button>
            <button className="bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 rounded-lg p-4 flex items-center justify-between transition-all">
              <Smartphone className="text-lime-400" />
              <span className="font-semibold">Device Manager</span>
              <span className="text-xs text-gray-400">View linked devices</span>
            </button>
          </div>
        </section>
      </div>

      {/* === Footer === */}
      <motion.p
        className="mt-16 text-center text-gray-500 text-sm"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        © 2025 Kreedentials — Command Your Performance.
      </motion.p>
    </div>
  );
};

export default SettingsPage;
