"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";

interface HeroBannerProps {
  isOptimized: boolean;
  children: React.ReactNode;
}

interface Bird {
  x: number;
  y: number;
  speed: number;
  scale: number;
  wingPhase: number;      // 0–2π, drives wing flap
  wingSpeed: number;      // radians per frame
  alpha: number;
  flock: number;          // group id for loose flocking (y offset drift)
  drift: number;          // gentle vertical drift speed
  driftDir: number;       // +1 / -1
}

function makeBird(w: number, h: number): Bird {
  return {
    x: Math.random() * w * 1.5 - w * 0.5, // start off-screen left sometimes
    y: Math.random() * h * 0.8,
    speed: 0.6 + Math.random() * 1.4,
    scale: 0.4 + Math.random() * 0.8,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 0.06 + Math.random() * 0.07,
    alpha: 0.5 + Math.random() * 0.45,
    flock: Math.floor(Math.random() * 5),
    drift: 0.08 + Math.random() * 0.12,
    driftDir: Math.random() > 0.5 ? 1 : -1,
  };
}

/** Draw a single bird as a simple M/V wing shape */
function drawBird(ctx: CanvasRenderingContext2D, bird: Bird, isOptimized: boolean) {
  const wingFlap = Math.sin(bird.wingPhase);   // -1 → 1
  const wingSpread = bird.scale * 14;
  const wingDip = wingFlap * bird.scale * 6;   // tip dip

  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.globalAlpha = bird.alpha;
  ctx.strokeStyle = isOptimized ? "rgba(56,189,248,0.9)" : "rgba(30,30,30,0.75)";
  ctx.lineWidth = bird.scale * 1.4;
  ctx.lineCap = "round";

  ctx.beginPath();
  // Left wing tip → body centre → right wing tip (V shape with flap)
  ctx.moveTo(-wingSpread, wingDip);
  ctx.quadraticCurveTo(-wingSpread * 0.4, wingDip * 0.3, 0, 0);
  ctx.quadraticCurveTo(wingSpread * 0.4, wingDip * 0.3, wingSpread, wingDip);
  ctx.stroke();

  ctx.restore();
}

export default function HeroBanner({ isOptimized, children }: HeroBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdsRef = useRef<Bird[]>([]);
  const countRef = useRef(30);
  const rafRef = useRef<number>(0);
  const [count, setCount] = useState(30);
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
    birdsRef.current = Array.from({ length: countRef.current }, () => makeBird(w, h));

    const loop = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      // Reconcile count
      const target = countRef.current;
      while (birdsRef.current.length < target) birdsRef.current.push(makeBird(cw, ch));
      if (birdsRef.current.length > target) birdsRef.current.length = target;

      for (const b of birdsRef.current) {
        drawBird(ctx, b, isOptimized);

        // Move right
        b.x += b.speed;
        // Gentle vertical drift
        b.y += b.drift * b.driftDir;
        if (b.y < 10 || b.y > ch * 0.85) b.driftDir *= -1;
        // Wing flap
        b.wingPhase += b.wingSpeed;

        // Reset when off-screen right
        if (b.x > cw + 30) {
          b.x = -30;
          b.y = Math.random() * ch * 0.8;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isOptimized]);

  const PRESETS = [
    { label: "off",    value: 0   },
    { label: "few",   value: 10  },
    { label: "flock", value: 30  },
    { label: "many",  value: 80  },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ minHeight: 280 }}>

      {/* Background — matches each avatar image */}
      <div className={`absolute inset-0 ${
        isOptimized
          ? "bg-[#0a0f1a]"
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

      {/* Avatar — right side, bottom-aligned, swaps per mode. Hidden on mobile */}
      <div className="absolute right-0 bottom-0 top-0 w-44 sm:w-56 hidden sm:flex items-end justify-end pointer-events-none select-none">
        <img
          src={isOptimized ? "/me-blue-bg.png" : "/me-white-bg.png"}
          alt="Chester avatar"
          className="h-full object-contain object-bottom"
          draggable={false}
        />
      </div>

      {/* Bird canvas — above everything */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* Content slot — full width on mobile, offset right on sm+ */}
      <div className="relative z-20 p-4 sm:p-6 sm:pr-52">
        {children}
      </div>

      {/* Cog button — top-right */}
      <div className="absolute top-3 right-3 z-30">
        <button
          onClick={() => setCogOpen((v) => !v)}
          className={`size-8 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors ${
            isOptimized
              ? "bg-black/30 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-black/50"
              : "bg-white/70 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-white/90"
          }`}
          style={{ transition: "background 0.15s, color 0.15s" }}
          aria-label="Bird settings"
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
                  : "bg-white/95 border-gray-200 backdrop-blur-md"
              }`}
            >
              <p className={`text-[10px] font-medium uppercase tracking-widest mb-3 ${
                isOptimized ? "font-mono text-slate-500" : "text-gray-400"
              }`}>
                {isOptimized ? "BIRD_DENSITY" : "Bird density"}
              </p>

              {/* Preset buttons */}
              <div className="flex gap-1 mb-3">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setCount(p.value)}
                    className={`flex-1 text-[9px] px-1 py-1 rounded border transition-colors font-mono ${
                      count === p.value
                        ? isOptimized
                          ? "bg-sky-500/20 border-sky-500/40 text-sky-400"
                          : "bg-blue-100 border-blue-300 text-blue-700"
                        : isOptimized
                          ? "border-white/10 text-slate-500 hover:text-slate-300"
                          : "border-gray-200 text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] ${isOptimized ? "font-mono text-slate-500" : "text-gray-400"}`}>
                  Custom
                </span>
                <span className={`text-xs font-bold ${isOptimized ? "font-mono text-sky-400" : "text-gray-600"}`}>
                  {count} birds
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
                  isOptimized
                    ? "[&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:border-0"
                    : "[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-0"
                }`}
              />
              <div className="flex justify-between mt-1">
                <span className={`text-[9px] ${isOptimized ? "font-mono text-slate-600" : "text-gray-400"}`}>0</span>
                <span className={`text-[9px] ${isOptimized ? "font-mono text-slate-600" : "text-gray-400"}`}>120</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
