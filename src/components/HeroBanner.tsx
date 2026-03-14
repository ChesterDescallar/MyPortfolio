"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import Image from "next/image";

interface HeroBannerProps {
  isOptimized: boolean;
  isDark?: boolean;
  children: React.ReactNode;
}

interface Star {
  x: number;
  y: number;
  radius: number;       // base radius
  phase: number;        // 0–2π, drives twinkle
  phaseSpeed: number;   // radians per frame
  baseAlpha: number;    // resting opacity
  spikes: number;       // 4 or 6 point star
}

function makeStar(w: number, h: number): Star {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    radius: 0.8 + Math.random() * 2.2,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.012 + Math.random() * 0.03,
    baseAlpha: 0.25 + Math.random() * 0.55,
    spikes: Math.random() > 0.35 ? 4 : 6,
  };
}

/** Draw a 4- or 6-pointed star with a soft glow */
function drawStar(ctx: CanvasRenderingContext2D, star: Star, isOptimized: boolean, isDark: boolean) {
  const twinkle = (Math.sin(star.phase) + 1) / 2;          // 0→1
  const r = star.radius * (0.6 + twinkle * 0.7);           // pulsing size
  const alpha = star.baseAlpha * (0.4 + twinkle * 0.6);    // pulsing opacity
  const inner = r * 0.38;

  // colour: optimized=sky-blue, dark=slate-300, light=slate-500
  const hue   = isOptimized ? "180,220,255" : isDark ? "148,163,184" : "100,116,139";
  const glow  = isOptimized ? `rgba(56,189,248,${alpha * 0.5})` : isDark ? `rgba(148,163,184,${alpha * 0.4})` : `rgba(100,116,139,${alpha * 0.35})`;

  ctx.save();
  ctx.translate(star.x, star.y);
  ctx.globalAlpha = alpha;

  // Glow
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 3.5);
  g.addColorStop(0, glow);
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, r * 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Star shape
  ctx.fillStyle = `rgba(${hue},${alpha})`;
  ctx.beginPath();
  const points = star.spikes;
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const dist  = i % 2 === 0 ? r : inner;
    i === 0 ? ctx.moveTo(Math.cos(angle) * dist, Math.sin(angle) * dist)
            : ctx.lineTo(Math.cos(angle) * dist, Math.sin(angle) * dist);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export default function HeroBanner({ isOptimized, isDark = false, children }: HeroBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const countRef = useRef(40);
  const rafRef = useRef<number>(0);
  const [count, setCount] = useState(40);
  const [cogOpen, setCogOpen] = useState(false);

  useEffect(() => { countRef.current = count; }, [count]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.offsetWidth || 800;
    const h = canvas.offsetHeight || 420;
    canvas.width = w;
    canvas.height = h;
    starsRef.current = Array.from({ length: countRef.current }, () => makeStar(w, h));

    const loop = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      // Reconcile count
      const target = countRef.current;
      while (starsRef.current.length < target) starsRef.current.push(makeStar(cw, ch));
      if (starsRef.current.length > target) starsRef.current.length = target;

      for (const s of starsRef.current) {
        drawStar(ctx, s, isOptimized, isDark);
        s.phase += s.phaseSpeed;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isOptimized]);

  const PRESETS = [
    { label: "off",    value: 0   },
    { label: "few",    value: 20  },
    { label: "many",   value: 60  },
    { label: "dense",  value: 120 },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ minHeight: 280 }}>

      {/* Background — matches each avatar image */}
      <div className={`absolute inset-0 ${
        isOptimized
          ? "bg-[#0a0f1a]"
          : isDark
            ? "bg-gray-900"
            : "bg-white"
      }`} />
      {/* Optimized: subtle grid overlay */}
      {isOptimized && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,1) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,1) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {/* Avatar — right side, bottom-aligned, swaps per mode */}
      <div className="absolute right-0 bottom-0 top-0 w-28 sm:w-44 md:w-56 flex items-end justify-end pointer-events-none select-none opacity-40 sm:opacity-100">
        <Image
          src={isOptimized ? "/me-blue-bg.png" : isDark ? "/me-dark-bg.png" : "/me-white-bg.png"}
          alt="Chester Descallar"
          fill
          className="object-contain object-bottom"
          draggable={false}
          priority
        />
      </div>

      {/* Bird canvas — above everything */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Twinkling stars background"
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* Content slot */}
      <div className="relative z-20 p-4 sm:p-6 pr-32 sm:pr-48 md:pr-60">
        {children}
      </div>

      {/* Cog button — top-right */}
      <div className="absolute top-3 right-3 z-30">
        <button
          onClick={() => setCogOpen((v) => !v)}
          className={`size-8 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors ${
            isOptimized
              ? "bg-black/30 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-black/50"
              : isDark
                ? "bg-black/30 border border-white/10 text-gray-400 hover:text-gray-200 hover:bg-black/50"
                : "bg-white/70 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-white/90"
          }`}
          style={{ transition: "background 0.15s, color 0.15s" }}
          aria-label="Star settings"
        >
          {cogOpen ? <X className="size-3.5" /> : <Settings className="size-3.5" />}
        </button>

        <AnimatePresence>
          {cogOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -4 }}
              transition={{ duration: 0.15 }}
              className={`absolute right-0 top-10 w-48 sm:w-52 rounded-xl border p-4 shadow-xl ${
                isOptimized
                  ? "bg-slate-900/95 border-white/10 backdrop-blur-md"
                  : isDark
                    ? "bg-gray-900/95 border-white/10 backdrop-blur-md"
                    : "bg-white/95 border-gray-200 backdrop-blur-md"
              }`}
            >
              <p className={`text-[10px] font-medium uppercase tracking-widest mb-3 ${
                isOptimized ? "font-mono text-slate-500" : isDark ? "text-gray-500" : "text-gray-400"
              }`}>
                {isOptimized ? "STAR_DENSITY" : "Star density"}
              </p>

              {/* Preset buttons */}
              <div className="flex gap-1 mb-3">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setCount(p.value)}
                    className={`flex-1 text-[9px] px-1 py-1 rounded border transition-colors font-mono ${
                      count === p.value
                        ? isOptimized || isDark
                          ? "bg-sky-500/20 border-sky-500/40 text-sky-400"
                          : "bg-blue-100 border-blue-300 text-blue-700"
                        : isOptimized || isDark
                          ? "border-white/10 text-slate-500 hover:text-slate-300"
                          : "border-gray-200 text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] ${isOptimized ? "font-mono text-slate-500" : isDark ? "text-gray-500" : "text-gray-400"}`}>
                  Custom
                </span>
                <span className={`text-xs font-bold ${isOptimized ? "font-mono text-sky-400" : isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {count} stars
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={120}
                step={5}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className={`w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer ${
                  isOptimized || isDark
                    ? "[&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:border-0"
                    : "[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-0"
                }`}
              />
              <div className="flex justify-between mt-1">
                <span className={`text-[9px] ${isOptimized ? "font-mono text-slate-600" : isDark ? "text-gray-600" : "text-gray-400"}`}>0</span>
                <span className={`text-[9px] ${isOptimized ? "font-mono text-slate-600" : isDark ? "text-gray-600" : "text-gray-400"}`}>120</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
