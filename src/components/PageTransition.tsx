import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Optional: color shift per section
  const gradientMap: Record<string, string> = {
    "/dashboard": "from-cyan-400/30 via-cyan-400/60",
    "/challenges": "from-pink-400/30 via-pink-400/60",
    "/store": "from-lime-400/30 via-lime-400/60",
  };

  const gradient =
    gradientMap[location.pathname] ||
    "from-lime-400/30 via-lime-400/60";

  return (
    <div className="relative overflow-hidden min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {/* page content wrapper */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="relative z-10"
        >
          {children}
        </motion.div>

        {/* swipe glow layer */}
        <motion.div
          key={location.key}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          exit={{ x: "100%" }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`pointer-events-none absolute top-0 left-0 w-full h-full bg-gradient-to-r ${gradient} to-transparent blur-[60px] opacity-70`}
        />
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
