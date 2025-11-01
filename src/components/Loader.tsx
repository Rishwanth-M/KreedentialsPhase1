// src/components/DotsLoader.tsx
import React from "react";
import { COLORS } from "../lib/constants";

const DotsLoader: React.FC = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: COLORS.darkBg }}
    >
      <div className="flex space-x-4">
        <span
          className="w-3 h-3 rounded-full animate-bounce"
          style={{ backgroundColor: COLORS.brand, animationDelay: "0s" }}
        />
        <span
          className="w-3 h-3 rounded-full animate-bounce"
          style={{ backgroundColor: COLORS.brand, animationDelay: "0.2s" }}
        />
        <span
          className="w-3 h-3 rounded-full animate-bounce"
          style={{ backgroundColor: COLORS.brand, animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
};

export default DotsLoader;
