// src/pages/ContentHub.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import { PlayCircle, X } from "lucide-react";

const contentList = [
  {
    title: "Training Basics",
    duration: "12 min",
    category: "Tutorial",
    thumbnail:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=UUwmlaDT-hM",
  },
  {
    title: "Advanced Techniques",
    duration: "25 min",
    category: "Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=UUwmlaDT-hM",
  },
  {
    title: "Nutrition Guide",
    duration: "18 min",
    category: "Education",
    thumbnail:
      "https://images.unsplash.com/photo-1611078482167-06a67d8a5d86?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=UUwmlaDT-hM",
  },
];

const ContentHub: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    videoUrl: string;
  } | null>(null);

  const [glowIntensity, setGlowIntensity] = useState(0.1);

  // Animated background glow
  useEffect(() => {
    if (selectedVideo) {
      let pulse = 0;
      const interval = setInterval(() => {
        pulse = Math.sin(Date.now() / 500) * 0.05 + 0.1;
        setGlowIntensity(0.15 + pulse);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setGlowIntensity(0.1);
    }
  }, [selectedVideo]);

  return (
    <div
      className="min-h-screen relative text-white p-8 overflow-hidden transition-all duration-700"
      style={{
        backgroundColor: "#000",
        filter: selectedVideo ? "blur(1px) brightness(0.8)" : "none",
      }}
    >
      {/* Dynamic glowing background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] blur-[200px] rounded-full animate-pulse"
          style={{ backgroundColor: `rgba(180,255,57,${glowIntensity})` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] blur-[180px] rounded-full animate-pulse"
          style={{
            backgroundColor: `rgba(180,255,57,${glowIntensity - 0.05})`,
          }}
        />
      </div>

      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold tracking-tight mb-12"
        style={{
          color: "#B4FF39",
          textShadow:
            "0 0 25px rgba(180,255,57,0.8), 0 0 60px rgba(180,255,57,0.3)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Content Hub
      </motion.h1>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 perspective-[1200px]">
        {contentList.map((content, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{
              rotateX: 8,
              rotateY: -6,
              scale: 1.05,
              boxShadow:
                "0 0 40px rgba(180,255,57,0.5), 0 0 80px rgba(180,255,57,0.2)",
            }}
            onClick={() =>
              setSelectedVideo({
                title: content.title,
                videoUrl: content.videoUrl,
              })
            }
            className="relative group rounded-2xl overflow-hidden bg-[#0a0a0a]/80 border border-lime-400/20 transition-all duration-500 transform-style-3d cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative h-56 overflow-hidden">
              <motion.img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="w-20 h-20 bg-lime-400/20 rounded-full flex items-center justify-center shadow-[0_0_40px_#B4FF39]"
                >
                  <PlayCircle size={42} color="#B4FF39" fill="#B4FF39" />
                </motion.div>
              </motion.div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-lime-400 font-semibold uppercase tracking-wider">
                  {content.category}
                </span>
                <span className="text-xs text-gray-400">{content.duration}</span>
              </div>
              <h3 className="text-lg font-semibold group-hover:text-lime-400 transition-colors duration-300">
                {content.title}
              </h3>
            </div>

            {/* Animated light sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-lime-400/5 to-transparent opacity-0 group-hover:opacity-100"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="relative w-[90%] md:w-[70%] lg:w-[60%] aspect-video rounded-2xl border border-lime-400/40 bg-black/80 shadow-[0_0_60px_rgba(180,255,57,0.4)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 text-lime-400 hover:text-white z-10 transition-colors"
              >
                <X size={28} />
              </button>

              {/* Video Player */}
              {/* @ts-ignore */}
              <ReactPlayer
                url={selectedVideo.videoUrl}
                controls={true}
                playing={true}
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                    },
                  },
                }}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-lime-400/30 pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 25px rgba(180,255,57,0.4)",
                    "0 0 50px rgba(180,255,57,0.6)",
                    "0 0 25px rgba(180,255,57,0.4)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Neon "Now Playing" line */}
            <motion.div
              className="mt-6 px-6 py-3 bg-[#0a0a0a]/60 border border-lime-400/20 rounded-xl shadow-[0_0_30px_rgba(180,255,57,0.3)] flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-lime-400 shadow-[0_0_20px_#B4FF39]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="text-lime-400 font-semibold tracking-wide text-sm uppercase">
                Now Playing:
              </span>
              <span className="text-white font-medium text-sm">
                {selectedVideo.title}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentHub;
