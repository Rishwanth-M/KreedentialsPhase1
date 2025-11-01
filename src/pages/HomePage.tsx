// src/pages/HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { COLORS } from "../lib/constants";
import Loader from "../components/Loader";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
  <div
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 sm:px-10 text-center"
    style={{
      backgroundColor: "#000",
      color: COLORS.textLight,
      fontFamily: "'Poppins', sans-serif",
    }}
  >
    {/* --- Background Glow --- */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-lime-500/20 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-lime-400/10 blur-[160px] rounded-full" />
    </div>

    {/* --- Floating Particles --- */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-lime-400/40 rounded-full"
        style={{
          width: Math.random() * 6 + 2,
          height: Math.random() * 6 + 2,
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

    {/* --- Main Content --- */}
    <motion.div
      className="relative z-10 w-full max-w-[90%] sm:max-w-xl mx-auto flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-5 sm:mb-6 tracking-tight uppercase leading-tight text-center"
        style={{
          color: COLORS.brand,
          textShadow:
            "0 0 20px rgba(180,255,57,0.7), 0 0 60px rgba(180,255,57,0.4)",
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Kreedentials
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300 font-medium text-center px-2 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Transforming Sports. Empowering Champions.
      </motion.p>

      {/* --- Buttons --- */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => navigate("/signup")}
          className="relative w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-lg overflow-hidden group"
          style={{ backgroundColor: COLORS.brand, color: "#000" }}
        >
          <span className="relative z-10">Sign Up</span>
          <span className="absolute inset-0 bg-lime-400 blur-md opacity-60 group-hover:opacity-100 transition"></span>
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-lg border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_#b4ff39]"
        >
          Log In
        </button>
      </motion.div>

      {/* --- Footer --- */}
      <motion.div
        className="mt-12 sm:mt-16 text-xs sm:text-sm text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © 2025 Kreedentials — Built for Athletes.
      </motion.div>
    </motion.div>
  </div>
);
};

export default HomePage;
