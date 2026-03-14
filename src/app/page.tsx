"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { toast } from "sonner";
import {
  Zap,
  MapPin,
  Volume2,
  VolumeX,
  Github,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react";
import { useSound } from "@/lib/sound";
import MetricsModal from "@/components/MetricsModal";
import AIModal from "@/components/AIModal";
import RetroCRT from "@/components/RetroCRT";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import MouseTrail from "@/components/MouseTrail";
import PageBody from "@/components/PageBody";

// ─── Page ─────────────────────────────────────────────────────────────────────
type SiteMode = "light" | "dark" | "game";

export default function Home() {
  const [mode, setMode] = useState<SiteMode>("light");
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const { play, volume, setVolume } = useSound();

  const isOptimized = mode === "game";
  const isDark = mode === "dark";

  const subtitle = useTypewriter({
    words: ["Software Engineer", "Problem Solver", "Professional"],
    typeSpeed: 55,
    deleteSpeed: 30,
    pauseMs: 2000,
  });

  // compare mode is active whenever game mode is on
  const compareMode = isOptimized;

  const handleMode = (next: SiteMode) => {
    setMode(next);
    if (next === "game") {
      play("toggle-on");
      toast.success("⚡ GAME MODE — LVL UP", {
        description: "+52 Lighthouse XP · +60 Test Coverage XP · Legacy Mode defeated",
        className: "font-mono",
      });
    } else if (next === "dark") {
      play("toggle-on");
      toast.info("🌙 DARK MODE", { description: "Lights out." });
    } else {
      play("toggle-off");
      toast.info("☀ LIGHT MODE", { description: "Classic view restored." });
    }
  };

  // ─── Theme classes ────────────────────────────────────────────────────────
  const page = isOptimized
    ? "min-h-screen bg-slate-950 text-slate-100 transition-all duration-500 pb-16 font-[var(--font-inter)]"
    : isDark
      ? "min-h-screen bg-gray-950 text-gray-100 transition-all duration-500 pb-16 font-[var(--font-playfair)]"
      : "min-h-screen bg-white text-gray-900 transition-all duration-500 pb-16 font-[var(--font-playfair)]";

  const gameCardCls = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl";
  const lightCardCls = "bg-white border border-gray-200 rounded-none";
  const darkCardCls = "bg-white/5 border border-white/10 rounded-none";
  const cardCls = isOptimized ? gameCardCls : isDark ? darkCardCls : lightCardCls;

  const glowCls = isOptimized
    ? "relative after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-sky-500/20 after:pointer-events-none"
    : "";

  const sharedBodyProps = {
    phoneRevealed,
    onRevealPhone: () => { setPhoneRevealed(true); play("click"); },
    onViewMetrics: () => { setMetricsOpen(true); play("click"); },
    onOpenAI: () => { setAiOpen(true); play("click"); },
  };

  return (
    <div className={page}>
      <MouseTrail isOptimized={isOptimized} />

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 border-b px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 ${
          isOptimized
            ? "bg-slate-950/80 backdrop-blur-md border-white/10"
            : isDark
              ? "bg-gray-950/90 backdrop-blur-md border-white/10"
              : "bg-white border-gray-200"
        }`}
      >
        <motion.div layout className="min-w-0 shrink">
          <h1
            className={`text-base sm:text-xl ${
              isOptimized
                ? "font-mono tracking-tighter text-white font-semibold"
                : isDark
                  ? "font-bold italic font-[var(--font-playfair)] text-gray-100"
                  : "font-bold italic font-[var(--font-playfair)] text-gray-800"
            }`}
          >
            Chester Descallar
          </h1>
          <p
            className={`text-xs sm:text-sm font-normal not-italic hidden sm:block ${
              isOptimized ? "text-sky-400 font-mono" : isDark ? "text-gray-400" : "text-gray-500"
            }`}
            aria-label={`// ${subtitle}`}
          >
            {"// "}{subtitle}
            <span aria-hidden="true" className="animate-pulse">▋</span>
          </p>
          <p
            className={`text-xs mt-0.5 hidden sm:block ${
              isOptimized ? "text-slate-400 font-mono" : isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <MapPin className="inline size-3 mr-1" />
            United Kingdom · Open to opportunities
          </p>
        </motion.div>

        {/* ── Centre: Gamify button ── */}
        <div className="flex items-center justify-center">
          <motion.button
            onClick={() => handleMode(isOptimized ? "light" : "game")}
            whileTap={{ scale: 0.92 }}
            aria-pressed={isOptimized}
            aria-label="Toggle gamify mode"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all ${
              isOptimized
                ? "bg-sky-500/20 border-sky-500/40 text-sky-300 hover:bg-sky-500/30"
                : isDark
                  ? "bg-white/5 border-white/15 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                  : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            <Zap className="size-3.5" />
            <span className="font-mono">Gamify</span>
            {isOptimized && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[9px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1 py-0.5 rounded"
              >
                84
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* ── Right: icons ── */}
        <div className="flex items-center gap-2 sm:gap-3 justify-end">
          {/* Social links */}
          <a
            href="https://github.com/ChesterDescallar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            onClick={() => play("click")}
            className={`inline-flex items-center justify-center size-7 rounded-md border transition-all ${
              isOptimized || isDark
                ? "border-white/20 bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white hover:border-white/30"
                : "border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900"
            }`}
          >
            <Github className="size-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/chesterdescallar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onClick={() => play("click")}
            className={`inline-flex items-center justify-center size-7 rounded-md border transition-all ${
              isOptimized
                ? "border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:border-sky-400"
                : isDark
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400"
                  : "border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            }`}
          >
            <Linkedin className="size-3.5" />
          </a>

          <div className={`w-px h-4 ${isOptimized || isDark ? "bg-white/10" : "bg-gray-200"}`} />

          {/* Volume */}
          <div className="flex items-center gap-1 sm:gap-1.5 group">
            <button
              onClick={() => { setVolume(volume === 0 ? 0.5 : 0); play("click"); }}
              className={`transition-colors ${isOptimized || isDark ? "text-slate-500 hover:text-slate-300" : "text-gray-400 hover:text-gray-600"}`}
              aria-label="Toggle mute"
            >
              {volume === 0
                ? <VolumeX className="size-3.5" />
                : <Volume2 className="size-3.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className={`hidden sm:block w-16 h-1 appearance-none rounded-full outline-none cursor-pointer transition-opacity opacity-60 group-hover:opacity-100 ${
                isOptimized || isDark
                  ? "[&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:border-0"
                  : "[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-500 [&::-webkit-slider-thumb]:border-0"
              }`}
              aria-label="Volume"
              aria-valuenow={Math.round(volume * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={volume === 0 ? "Muted" : `${Math.round(volume * 100)}%`}
            />
          </div>

          <div className={`w-px h-4 ${isOptimized || isDark ? "bg-white/10" : "bg-gray-200"}`} />

          {/* ── Light / Dark toggle ── */}
          <motion.button
            onClick={() => handleMode(isDark || isOptimized ? "light" : "dark")}
            whileTap={{ scale: 0.92 }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`flex items-center justify-center size-7 rounded-md border transition-all ${
              isOptimized || isDark
                ? "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="flex items-center"
              >
                {isDark || isOptimized ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      {compareMode ? (
        /* ── FULL-PAGE BEFORE / AFTER ──────────────────────────────────────── */
        <BeforeAfterSlider
          beforeLabel="BEFORE"
          afterLabel="AFTER"
          before={
            <div className="min-h-screen bg-white text-gray-900 font-[var(--font-playfair)]">
              <PageBody
                isOptimized={false}
                isDark={false}
                cardCls={lightCardCls}
                glowCls=""
                static
                {...sharedBodyProps}
              />
            </div>
          }
          after={
            <div className="min-h-screen bg-slate-950 text-slate-100 font-[var(--font-inter)]">
              <PageBody
                isOptimized={true}
                isDark={false}
                cardCls={gameCardCls}
                glowCls={glowCls}
                static
                {...sharedBodyProps}
              />
            </div>
          }
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <PageBody
              isOptimized={isOptimized}
              isDark={isDark}
              cardCls={cardCls}
              glowCls={glowCls}
              {...sharedBodyProps}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── MODALS ────────────────────────────────────────────────────────── */}
      <MetricsModal open={metricsOpen} onClose={() => setMetricsOpen(false)} isOptimized={isOptimized} />
      <AIModal open={aiOpen} onClose={() => setAiOpen(false)} isOptimized={isOptimized} />

      {/* ── STICKY RETRO CRT ──────────────────────────────────────────────── */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden">
        <RetroCRT onAIInfo={() => setAiOpen(true)} mobileOnly />
      </div>
      <div className="fixed bottom-0 right-0 z-40 hidden sm:block scale-[0.52] origin-bottom-right md:scale-[0.62] pointer-events-none">
        <div className="pointer-events-auto">
          <RetroCRT onAIInfo={() => setAiOpen(true)} />
        </div>
      </div>
    </div>
  );
}
