import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero.png"; // ✅ Make sure path is correct

const Intro: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 md:px-10 overflow-hidden">
      {/* Hero Image Card with glowing border */}
      <div className="relative bg-black border-4 border-cyan-400 rounded-xl p-4 md:p-6 mb-12 drop-shadow-[0_0_25px_cyan] animate-pulse"> {/* Increased mb-12 for space */}
        <img
          src={heroImage}
          alt="Hero Character"
          className="w-48 md:w-64 object-contain mx-auto mb-4 rounded-xl border-2 border-cyan-400 shadow-[0_0_30px_cyan]" // Added glow to image
        />

        <div className="bg-gray-900 rounded-md px-4 py-2 text-center text-xs md:text-sm">
          <span className="text-green-400 font-bold">● SYSTEM ONLINE</span>
          <br />
          <span className="text-gray-300">
            Version 2.1.4 • Build 2025.01.21
          </span>
        </div>
      </div>

      {/* Centered Text */}
      <div className="text-center space-y-4 max-w-xl z-10">
        <div className="text-5xl md:text-7xl font-bold text-cyan-400 tracking-wide drop-shadow-[0_0_25px_cyan] animate-pulse">
          PIXEL
        </div>

        <h2 className="text-xl md:text-3xl tracking-widest text-cyan-300 animate-fade-in">
          METROIDVANIA
        </h2>

        <p className="text-base md:text-lg text-gray-300 animate-fade-in delay-1000">
          Explore • Upgrade • Discover • Conquer
        </p>

        <button
          onClick={handleStart}
          className="mt-4 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-extrabold rounded-full text-lg shadow-lg transition-all duration-300"
        >
          START GAME
        </button>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;
