// src/pages/PublicStorePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Store from "./Store";

const PublicStorePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top header bar for visitors */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-lime-400/20 bg-black/80 backdrop-blur-md">
        {/* mini brand */}
        <div className="text-lime-400 font-extrabold text-xl tracking-wider drop-shadow-[0_0_10px_#B4FF39]">
          KREEDENTIALS
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="border border-lime-400/40 text-lime-400 text-sm px-4 py-2 rounded-lg hover:bg-lime-400/10 hover:shadow-[0_0_20px_#B4FF39] transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-lime-400 text-black font-semibold text-sm px-4 py-2 rounded-lg shadow-[0_0_20px_#B4FF39] hover:bg-lime-300 hover:shadow-[0_0_30px_#B4FF39] transition-all"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Store content itself */}
      <main className="flex-1 px-4 md:px-8 py-6">
        <Store />
      </main>

      {/* footer for public view (optional) */}
      <footer className="px-6 py-6 text-[10px] text-gray-500 uppercase tracking-wider border-t border-lime-400/10 bg-black/70">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-4 flex-wrap">
            <span className="text-lime-400/80">© 2025 Kreedentials</span>
            <span className="">All rights reserved</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <span className="hover:text-gray-300 cursor-pointer">Terms</span>
            <span className="hover:text-gray-300 cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicStorePage;
