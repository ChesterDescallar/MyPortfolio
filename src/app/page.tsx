"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap,
  MapPin,
  GraduationCap,
  Briefcase,
  BarChart3,
  Bot,
  ChevronRight,
  Trophy,
  Gamepad2,
  Music,
  Dumbbell,
  Plane,
  Swords,
  Shield,
  Star,
  Flame,
  Award,
  Volume2,
  VolumeX,
  Github,
  Linkedin,
} from "lucide-react";
import { useSound } from "@/lib/sound";
import SkillsGrid from "@/components/SkillsGrid";
import MetricsModal from "@/components/MetricsModal";
import AIModal from "@/components/AIModal";
import RetroCRT from "@/components/RetroCRT";
import Timeline from "@/components/Timeline";
import HeroBanner from "@/components/HeroBanner";
import MouseTrail from "@/components/MouseTrail";


// ─── Experience bullets ───────────────────────────────────────────────────────
const vesonIntro = "At Veson, I've transitioned from maintaining legacy systems to leading high-stakes architectural migrations. My role centers on modernizing the maritime SaaS experience through AI-assisted development and performance-first engineering.";

const vesonBullets = [
  { label: "Modernization Lead", text: "Spearheaded the frontend migration from legacy code to a modern Next.js/React stack using Claude Code and Augment, achieving a 40% improvement in load performance and maintainability." },
  { label: "Performance Optimization", text: "Revitalized legacy site health, boosting Lighthouse scores from 33% to 85% by implementing responsive design best practices, Laravel caching strategies, and API optimization via Blackfire.io." },
  { label: "Data Visualization", text: "Engineered dynamic dashboards for ship energy efficiency (CII) using Highcharts and Vue 3, turning complex maritime datasets into intuitive user insights." },
  { label: "Quality & Reliability", text: "Established a robust testing culture, maintaining 80%+ component coverage with Vitest/Jest and ensuring end-to-end reliability through Playwright and Cypress." },
];

const vvIntro = "Focused on building the building blocks of a global analytics platform, with an emphasis on scalability and seamless user transitions.";

const vvBullets = [
  { label: "UI/UX Consistency", text: "Developed a library of reusable, responsive components using Vue.js and Tailwind CSS, significantly reducing code duplication." },
  { label: "Full-Stack Integration", text: "Built and integrated RESTful and GraphQL APIs using PHP/Laravel to support post-paywall features and data delivery." },
  { label: "Collaborative Growth", text: "Championed pair programming and Agile methodologies to ensure high code quality and rapid bug resolution." },
];

const vesonTags = ["React", "Next.js", "Laravel", "Vue 3", "TypeScript", "Vitest", "Playwright", "AI Tooling"];
const vvTags = ["Vue.js", "PHP", "GraphQL", "REST", "MySQL", "Tailwind CSS"];
const swanseaTags = ["Java", "Android Studio", "Python", "Software Design", "Agile", "Firebase"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Pick a class based on the 3-way mode */
function th(isOptimized: boolean, isDark: boolean, game: string, dark: string, light: string) {
  if (isOptimized) return game;
  if (isDark) return dark;
  return light;
}

function Tag({ label, isOptimized, isDark = false }: { label: string; isOptimized: boolean; isDark?: boolean }) {
  return (
    <Badge
      className={th(
        isOptimized, isDark,
        "bg-white/5 border border-white/10 text-slate-300 font-mono text-xs",
        "bg-white/5 border border-white/10 text-gray-300 text-xs",
        "bg-blue-50 text-blue-700 border border-blue-200 text-xs",
      )}
    >
      {label}
    </Badge>
  );
}

function SectionTitle({
  children,
  isOptimized,
  isDark = false,
}: {
  children: React.ReactNode;
  isOptimized: boolean;
  isDark?: boolean;
}) {
  return (
    <h2
      className={`text-lg font-semibold mb-4 flex items-center gap-2 ${th(
        isOptimized, isDark,
        "font-mono text-slate-200 tracking-tight",
        "font-bold text-gray-200 font-[var(--font-playfair)]",
        "font-bold text-gray-800 font-[var(--font-playfair)]",
      )}`}
    >
      {children}
    </h2>
  );
}

function Bullet({
  children,
  label,
  isOptimized,
  isDark = false,
  accent = "sky",
}: {
  children: React.ReactNode;
  label?: string;
  isOptimized: boolean;
  isDark?: boolean;
  accent?: "sky" | "violet" | "amber";
}) {
  const accentCls =
    accent === "violet"
      ? "text-violet-400"
      : accent === "amber"
      ? "text-amber-400"
      : "text-sky-400";
  return (
    <li className="flex items-start gap-2">
      <ChevronRight className={`size-4 shrink-0 mt-0.5 ${accentCls}`} />
      <span className={th(isOptimized, isDark, "text-slate-300", "text-gray-300", "text-gray-700")}>
        {label && <span className={`font-semibold ${accentCls}`}>{label}: </span>}
        {children}
      </span>
    </li>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
type SiteMode = "light" | "dark" | "game";

export default function Home() {
  const [mode, setMode] = useState<SiteMode>("light");
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const { play, volume, setVolume } = useSound();

  // isOptimized drives all existing conditional styling — true only in game mode
  const isOptimized = mode === "game";
  const isDark = mode === "dark";

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

  const cardCls = isOptimized
    ? "bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl"
    : isDark
      ? "bg-white/5 border border-white/10 rounded-none"
      : "bg-white border border-gray-200 rounded-none";

  const glowCls = isOptimized
    ? "relative after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-sky-500/20 after:pointer-events-none"
    : "";

  return (
    <div className={page}>
      <MouseTrail isOptimized={isOptimized} />
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 ${
          isOptimized
            ? "bg-slate-950/80 backdrop-blur-md border-white/10"
            : isDark
              ? "bg-gray-950/90 backdrop-blur-md border-white/10"
              : "bg-white border-gray-200"
        }`}
      >
        <motion.div layout className="min-w-0 shrink">
          <h1
            className={`text-base sm:text-xl truncate ${
              isOptimized
                ? "font-mono tracking-tighter text-white font-semibold"
                : isDark
                  ? "font-bold italic font-[var(--font-playfair)] text-gray-100"
                  : "font-bold italic font-[var(--font-playfair)] text-gray-800"
            }`}
          >
            Chester Descallar
            <span
              className={`ml-2 text-xs sm:text-sm font-normal not-italic hidden xs:inline ${
                isOptimized ? "text-sky-400 font-mono" : isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              // {isOptimized ? "Software Engineer" : "Developer"}
            </span>
          </h1>
          <p
            className={`text-xs mt-0.5 hidden sm:block ${
              isOptimized ? "text-slate-400 font-mono" : isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <MapPin className="inline size-3 mr-1" />
            United Kingdom · Open to opportunities
          </p>
        </motion.div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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

          {/* Volume — icon only on mobile, slider on sm+ */}
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
            />
          </div>

          <div className={`w-px h-4 ${isOptimized ? "bg-white/10" : isDark ? "bg-white/10" : "bg-gray-200"}`} />

          {/* ── Mode pill ── */}
          <div className={`flex items-center rounded-lg p-0.5 gap-0.5 text-[11px] font-semibold ${
            isOptimized
              ? "bg-white/5 border border-white/10"
              : isDark
                ? "bg-white/5 border border-white/10"
                : "bg-gray-100 border border-gray-200"
          }`}>
            {/* Light */}
            <motion.button
              onClick={() => handleMode("light")}
              whileTap={{ scale: 0.92 }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                mode === "light"
                  ? "bg-white text-amber-600 shadow-sm"
                  : isDark || isOptimized
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-gray-400 hover:text-gray-600"
              }`}
              title="Light mode"
            >
              <span>☀</span>
              <span className="hidden sm:inline">Light</span>
            </motion.button>
            {/* Dark */}
            <motion.button
              onClick={() => handleMode("dark")}
              whileTap={{ scale: 0.92 }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                mode === "dark"
                  ? "bg-gray-800 text-sky-300 shadow-sm"
                  : isDark || isOptimized
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-gray-400 hover:text-gray-600"
              }`}
              title="Dark mode"
            >
              <span>🌙</span>
              <span className="hidden sm:inline">Dark</span>
            </motion.button>
            {/* Game */}
            <motion.button
              onClick={() => handleMode("game")}
              whileTap={{ scale: 0.92 }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                mode === "game"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                  : isDark || isOptimized
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-gray-400 hover:text-gray-600"
              }`}
              title="Game mode"
            >
              <Zap className="size-3" />
              <span className="hidden sm:inline font-mono">Game</span>
              {mode === "game" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden sm:inline text-[9px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1 py-0.5 rounded"
                >
                  84
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.main
          key={mode}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="max-w-5xl mx-auto px-4 py-10 space-y-12"
        >
          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <section className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}>
              <HeroBanner isOptimized={isOptimized} isDark={isDark}>
                {isOptimized ? (
                  /* ── RPG CHARACTER CARD ─────────────────────────────── */
                  <div className="space-y-4">
                    {/* Top: name + class + level */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border border-white/15 bg-black/20 px-2 py-0.5 rounded">Class</span>
                          <span className="text-xs font-mono text-sky-400 font-semibold">Full-Stack Software Engineer</span>
                        </div>
                        <h2 className="text-2xl font-mono font-bold text-white tracking-tight">
                          Chester <span className="text-sky-400">Descallar</span>
                        </h2>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                          <MapPin className="inline size-3 mr-1" />United Kingdom · Remote
                        </p>
                      </div>
                      {/* Level badge */}
                      <div className="flex flex-col items-center justify-center size-16 rounded-xl border border-sky-500/40 bg-sky-500/15 shrink-0">
                        <span className="text-[9px] font-mono text-sky-400 uppercase tracking-widest">LVL</span>
                        <span className="text-2xl font-mono font-black text-sky-400 leading-none">84</span>
                      </div>
                    </div>

                    {/* HP / MP style stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: Swords, label: "ATK", value: "Frontend",  sub: "React / Vue / TS",  color: "text-sky-400",     bar: "bg-sky-400",     pct: 90 },
                        { icon: Shield, label: "DEF", value: "Backend",   sub: "Laravel / PHP",     color: "text-violet-400",  bar: "bg-violet-400",  pct: 78 },
                        { icon: Flame,  label: "AGI", value: "Velocity",  sub: "AI-assisted dev",   color: "text-amber-400",   bar: "bg-amber-400",   pct: 92 },
                        { icon: Star,   label: "INT", value: "Testing",   sub: "80%+ coverage",     color: "text-emerald-400", bar: "bg-emerald-400", pct: 82 },
                      ].map((stat, si) => (
                        <div key={stat.label} className="bg-black/25 border border-white/10 rounded-lg p-3 space-y-1.5 backdrop-blur-sm">
                          <div className="flex items-center gap-1.5">
                            <stat.icon className={`size-3 ${stat.color}`} />
                            <span className={`text-[10px] font-mono font-bold ${stat.color}`}>{stat.label}</span>
                            <span className="text-[10px] font-mono text-slate-500 ml-auto">{stat.pct}</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${stat.bar}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.pct}%` }}
                              transition={{ duration: 0.7, delay: si * 0.08 + 0.2, ease: "easeOut" }}
                            />
                          </div>
                          <p className="text-[10px] font-mono text-slate-300 leading-tight">{stat.value}</p>
                          <p className="text-[9px] font-mono text-slate-500 leading-tight">{stat.sub}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-xs font-mono text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                      4 years production XP · PHP (Laravel) · Vue.js · React · MySQL · TypeScript · AI-assisted development (Augment, Claude Code). Proven in refactoring legacy systems, automation, and delivering measurable business impact in Agile remote-first teams.
                    </p>

                    {/* Achievement unlocks */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { icon: Zap,   label: "Lighthouse +52pts",  color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
                        { icon: Award, label: "80%+ Test Coverage", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                        { icon: Flame, label: "Vue 2→3 Migration",  color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
                        { icon: Star,  label: "1st Class Honours",  color: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
                      ].map((ach, ai) => (
                        <motion.div
                          key={ach.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: ai * 0.08 + 0.5, duration: 0.3, ease: "backOut" }}
                          whileHover={{ scale: 1.06 }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-semibold backdrop-blur-sm cursor-default ${ach.color}`}
                        >
                          <ach.icon className="size-3" />
                          {ach.label}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ── LEGACY ─────────────────────────────────────────── */
                  <div>
                    <h2 className={`text-3xl font-bold leading-tight font-[var(--font-playfair)] ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                      Chester Descallar
                    </h2>
                    <p className={`mt-3 leading-relaxed text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Self-motivated Software Engineer with 4 years of experience designing and maintaining
                      scalable, high-performance web applications. Skilled in PHP (Laravel), Vue.js and React,
                      MySQL, JavaScript/TypeScript, and AI-assisted development utilising Augment and Claude Code.
                      Proven success in refactoring legacy systems, implementing automation, and delivering robust
                      solutions in Agile, remote-first teams. Passionate about building tools that optimise
                      workflows and deliver measurable business impact.
                    </p>
                  </div>
                )}
              </HeroBanner>
            </motion.div>

            {/* ── Skill cards ───────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <SkillsGrid isOptimized={isOptimized} isDark={isDark} />
            </motion.div>
          </section>

          {/* ── TIMELINE ──────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionTitle isOptimized={isOptimized} isDark={isDark}>
              <BarChart3 className="size-4" />
              Career Timeline
            </SectionTitle>
            <Timeline isOptimized={isOptimized} isDark={isDark} />
          </motion.section>

          {/* ── EXPERIENCE ────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionTitle isOptimized={isOptimized} isDark={isDark}>
              <Briefcase className="size-4" />
              Experience
            </SectionTitle>

            <div className="space-y-4">
              {/* Veson Nautical */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -2 }}
                className={`${cardCls} ${glowCls} p-5`}
              >
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-semibold text-base ${th(isOptimized, isDark, "text-white font-mono", "text-gray-100 font-bold", "text-gray-900 font-bold")}`}>
                        Software Engineer
                      </h3>
                      <span className={th(isOptimized, isDark, "text-slate-500 font-mono text-sm", "text-gray-500 text-sm", "text-gray-400 text-sm")}>|</span>
                      <span className={th(isOptimized, isDark, "text-sky-400 font-mono text-sm", "text-sky-400 text-sm font-semibold", "text-blue-700 text-sm font-semibold")}>
                        Veson Nautical
                      </span>
                      {isOptimized && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-mono">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${th(isOptimized, isDark, "text-slate-400 font-mono", "text-gray-400", "text-gray-500")}`}>
                      Remote, UK &nbsp;·&nbsp; December 2022 – Present
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant={isOptimized || isDark ? "outline" : "default"}
                    className={
                      isOptimized || isDark
                        ? "border-white/20 text-slate-300 hover:bg-white/10 font-mono text-xs"
                        : "text-xs"
                    }
                    onClick={() => { setMetricsOpen(true); play("click"); }}
                  >
                    <BarChart3 className="size-3 mr-1.5" />
                    View Metrics
                  </Button>
                </div>

                {/* Gamified stat row — optimized only */}
                {isOptimized && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                    {[
                      { label: "Lighthouse", before: 33, after: 85, color: "text-yellow-400", bar: "bg-yellow-400" },
                      { label: "Test Cov.", before: 20, after: 80, color: "text-emerald-400", bar: "bg-emerald-400" },
                      { label: "Perf. Gain", before: 0, after: 40, color: "text-sky-400", bar: "bg-sky-400" },
                    ].map((stat, si) => (
                      <div key={stat.label} className="bg-white/5 border border-white/10 rounded-lg p-2.5 space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">{stat.label}</span>
                          <span className={`text-xs font-mono font-bold ${stat.color}`}>{stat.after}%</span>
                        </div>
                        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${stat.bar}`}
                            initial={{ width: `${stat.before}%` }}
                            animate={{ width: `${stat.after}%` }}
                            transition={{ duration: 0.8, delay: si * 0.1 + 0.3, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-slate-600">{stat.before}% → {stat.after}%</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className={`mt-3 text-sm leading-relaxed ${th(isOptimized, isDark, "text-slate-400", "text-gray-400", "text-gray-600")}`}>
                  {vesonIntro}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {vesonBullets.map((b, i) => (
                    <Bullet key={i} isOptimized={isOptimized} isDark={isDark} accent="sky" label={b.label}>
                      {b.text}
                    </Bullet>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {vesonTags.map((t) => (
                    <Tag key={t} label={t} isOptimized={isOptimized} isDark={isDark} />
                  ))}
                </div>
              </motion.div>

              {/* VesselsValue */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
                whileHover={{ y: -2 }}
                className={`${cardCls} p-5`}
              >
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className={`font-semibold text-base ${th(isOptimized, isDark, "text-white font-mono", "text-gray-100 font-bold", "text-gray-900 font-bold")}`}>
                    Junior Developer
                  </h3>
                  <span className={th(isOptimized, isDark, "text-slate-500 font-mono text-sm", "text-gray-500 text-sm", "text-gray-400 text-sm")}>|</span>
                  <span className={th(isOptimized, isDark, "text-violet-400 font-mono text-sm", "text-violet-400 text-sm font-semibold", "text-blue-700 text-sm font-semibold")}>
                    VesselsValue
                  </span>
                </div>
                <p className={`text-sm ${th(isOptimized, isDark, "text-slate-400 font-mono", "text-gray-400", "text-gray-500")}`}>
                  Remote, UK &nbsp;·&nbsp; Sept 2021 – Nov 2022
                </p>
                <p className={`mt-2 text-sm leading-relaxed ${th(isOptimized, isDark, "text-slate-400", "text-gray-400", "text-gray-600")}`}>
                  {vvIntro}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {vvBullets.map((b, i) => (
                    <Bullet key={i} isOptimized={isOptimized} isDark={isDark} accent="violet" label={b.label}>
                      {b.text}
                    </Bullet>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {vvTags.map((t) => (
                    <Tag key={t} label={t} isOptimized={isOptimized} isDark={isDark} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* ── EDUCATION ─────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionTitle isOptimized={isOptimized} isDark={isDark}>
              <GraduationCap className="size-4" />
              Education
            </SectionTitle>

            <div className={`${cardCls} p-5`}>
              <div className="flex items-start gap-3">
                <GraduationCap
                  className={`size-5 mt-0.5 shrink-0 ${isOptimized ? "text-amber-400" : isDark ? "text-amber-400" : "text-yellow-600"}`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-semibold text-base ${th(isOptimized, isDark, "text-white font-mono", "text-gray-100 font-bold", "text-gray-900 font-bold")}`}>
                      BSc Software Engineering
                    </h3>
                    <span className={th(isOptimized, isDark, "text-slate-500 text-sm", "text-gray-500 text-sm", "text-gray-400 text-sm")}>|</span>
                    <span className={th(isOptimized, isDark, "text-amber-400 font-mono text-sm", "text-amber-400 text-sm font-semibold", "text-blue-700 text-sm font-semibold")}>
                      Swansea University
                    </span>
                  </div>
                  <p className={`text-sm mt-0.5 ${th(isOptimized, isDark, "text-slate-400 font-mono", "text-gray-400", "text-gray-500")}`}>
                    1st Class Honours (Overall Distinction) &nbsp;·&nbsp; Sept 2018 – July 2021
                  </p>
                  <p className={`mt-2 text-sm leading-relaxed ${th(isOptimized, isDark, "text-slate-400", "text-gray-400", "text-gray-600")}`}>
                    My academic career was defined by a focus on mobile architecture and software design patterns.
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <Bullet isOptimized={isOptimized} isDark={isDark} accent="amber" label="Excellence Scholarship Recipient">
                      Recognized for high academic achievement upon entry.
                    </Bullet>
                    <Bullet isOptimized={isOptimized} isDark={isDark} accent="amber" label="Third Year Project (85%)">
                      Designed and developed a location-aware mobile application in Java/Android Studio, utilizing Firebase and Geofencing to provide real-time navigation and discount alerts.
                    </Bullet>
                    <Bullet isOptimized={isOptimized} isDark={isDark} accent="amber" label="Leadership">
                      Served as a Student Ambassador, representing the Computer Science department and assisting in technical outreach.
                    </Bullet>
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {swanseaTags.map((t) => (
                      <Tag key={t} label={t} isOptimized={isOptimized} isDark={isDark} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── INTERESTS ─────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionTitle isOptimized={isOptimized} isDark={isDark}>
              <Trophy className="size-4" />
              Interests
            </SectionTitle>

            <div className={`${cardCls} p-5`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  {
                    icon: Gamepad2,
                    label: "Avid Gamer",
                    desc: "Team-based games: Dota 2, LoL, CS2",
                    color: "text-sky-400",
                  },
                  {
                    icon: Music,
                    label: "Self-taught Guitarist",
                    desc: "Music enthusiast",
                    color: "text-violet-400",
                  },
                  {
                    icon: Dumbbell,
                    label: "Fitness",
                    desc: "Regular gym-goer — physical fitness & wellbeing",
                    color: "text-emerald-400",
                  },
                  {
                    icon: Plane,
                    label: "Travel",
                    desc: "Passionate about different countries & cultures",
                    color: "text-amber-400",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07, ease: "easeOut" }}
                    className="flex items-start gap-3"
                  >
                    <item.icon className={`size-4 shrink-0 mt-0.5 ${item.color}`} />
                    <div>
                      <p className={`font-semibold ${th(isOptimized, isDark, "text-slate-200 font-mono", "text-gray-200", "text-gray-800")}`}>
                        {item.label}
                      </p>
                      <p className={th(isOptimized, isDark, "text-slate-400", "text-gray-400", "text-gray-500")}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── FOOTER / CTA ──────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              th(isOptimized, isDark,
                "bg-white/5 border border-white/10",
                "bg-white/5 border border-white/10",
                "bg-gray-50 border border-gray-200",
              )
            }`}
          >
            <div>
              <p className={`font-semibold text-base ${th(isOptimized, isDark, "text-white font-mono", "text-gray-100 font-bold", "text-gray-900 font-bold")}`}>
                Ready to collaborate?
              </p>
              <p className={`text-sm mt-0.5 ${th(isOptimized, isDark, "text-slate-400 font-mono", "text-gray-400", "text-gray-500")}`}>
                chester_descallar@yahoo.com
                <span className="hidden sm:inline"> &nbsp;·&nbsp; 07588 220203</span>
              </p>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <a
                href="https://github.com/ChesterDescallar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => play("click")}
                className={`inline-flex items-center justify-center size-7 rounded-md border transition-colors ${
                  isOptimized || isDark
                    ? "border-white/20 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                    : "border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
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
                className={`inline-flex items-center justify-center size-7 rounded-md border transition-colors ${
                  isOptimized || isDark
                    ? "border-white/20 text-slate-400 hover:text-sky-400 hover:bg-white/10"
                    : "border-gray-200 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Linkedin className="size-3.5" />
              </a>
              <Button
                size="sm"
                variant={isOptimized || isDark ? "outline" : "default"}
                className={
                  isOptimized || isDark
                    ? "border-white/20 text-slate-300 hover:bg-white/10 font-mono text-xs"
                    : "text-xs"
                }
                onClick={() => { setAiOpen(true); play("click"); }}
              >
                <Bot className="size-3 mr-1.5" />
                AI Workflow
              </Button>
              <a
                href="/cv.pdf"
                download="Chester_Descallar_CV.pdf"
                className={`inline-flex items-center justify-center h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] font-medium transition-all ${
                  isOptimized
                    ? "bg-sky-500 hover:bg-sky-400 text-white font-mono"
                    : isDark
                      ? "bg-gray-100 text-gray-900 hover:bg-white"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                Download CV
              </a>
            </div>
          </motion.section>
        </motion.main>
      </AnimatePresence>

      {/* ── MODALS ────────────────────────────────────────────────────────── */}
      <MetricsModal open={metricsOpen} onClose={() => setMetricsOpen(false)} isOptimized={isOptimized} />
      <AIModal open={aiOpen} onClose={() => setAiOpen(false)} isOptimized={isOptimized} />

      {/* ── STICKY RETRO CRT ──────────────────────────────────────────────── */}
      <div className="fixed bottom-0 right-0 z-40 scale-[0.38] origin-bottom-right sm:scale-[0.52] md:scale-[0.62] pointer-events-none">
        <div className="pointer-events-auto">
          <RetroCRT onAIInfo={() => setAiOpen(true)} />
        </div>
      </div>

    </div>
  );
}
