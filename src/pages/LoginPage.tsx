// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { COLORS } from "../lib/constants";

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.darkBg, color: COLORS.textLight }}
    >
      {/* Background Glow Lights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[600px] h-[600px] bg-lime-500/20 blur-[180px] rounded-full top-1/4 left-1/3 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-lime-400/10 blur-[160px] rounded-full bottom-1/4 right-1/4"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-md bg-[#0b0b0b]/80 p-10 rounded-2xl shadow-[0_0_30px_rgba(180,255,57,0.15)] border border-lime-400/30 backdrop-blur-lg"
      >
        <h1
          className="text-5xl font-extrabold text-center mb-6 uppercase tracking-wide"
          style={{
            color: COLORS.brand,
            textShadow:
              "0 0 20px rgba(180,255,57,0.7), 0 0 40px rgba(180,255,57,0.3)",
          }}
        >
          Log In
        </h1>

        {error && (
          <div className="text-red-500 text-center mb-4 font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-[#111] rounded-md text-white focus:outline-none border border-transparent focus:border-lime-400 transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-[#111] rounded-md text-white focus:outline-none border border-transparent focus:border-lime-400 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #B4FF39" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-md font-semibold text-lg transition-all"
            style={{
              backgroundColor: COLORS.brand,
              color: COLORS.darkBg,
              textShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            Log In
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-lime-400 hover:text-lime-300 font-semibold transition"
            >
              Sign Up
            </button>
          </p>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Kreedentials — The Future of Sports</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
