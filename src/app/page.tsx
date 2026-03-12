"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
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
} from "lucide-react";
import { useSound } from "@/lib/sound";
import SkillsGrid from "@/components/SkillsGrid";
import MetricsModal from "@/components/MetricsModal";
import AIModal from "@/components/AIModal";
import RetroCRT from "@/components/RetroCRT";
import Timeline from "@/components/Timeline";
import HeroBanner from "@/components/HeroBanner";


// ─── Experience bullets ───────────────────────────────────────────────────────
const vesonBullets = [
  "Developed and maintained scalable back-end systems for a SaaS Platform using PHP/Laravel and Vue.js/JavaScript, processing large datasets including vessel details, ship locations, and user search histories.",
  "Led AI-assisted frontend migration from legacy codebase to modern Next.js React application using Augment and Claude Code, implementing shadcn/ui components and optimising architecture for enhanced performance.",
  "Spearheaded implementation of dynamic data visualisations for Energy Efficiency and CII ship data using Highcharts and Vue 3, enabling intuitive maritime insights.",
  "Boosted legacy site's Lighthouse score from 33% to 85% by applying best practices in responsive design and inclusive development; used Blackfire.io to optimise API response times and implemented Laravel queues and caching strategies.",
  "Led UI migration from Vue 2 to Vue 3 using Composition API and TypeScript, improving maintainability and load performance by 40%.",
  "Improved front-end component coverage using Vitest/Jest, achieving 80%+ test coverage per component.",
  "Implemented and maintained Playwright and Cypress integration tests across the frontend, ensuring end-to-end reliability and preventing regressions.",
  "Migrated backend logic and search filter systems from legacy code to modern Laravel structures; led project estimation using T-shirt sizing and developed new Vue components for improved user interaction.",
  "Collaborated in Agile two-week sprint cycles with mid-sprint planning sessions and retrospectives.",
];

const vvBullets = [
  "Built reusable, scalable responsive UI components using Vue.js and Tailwind CSS, reducing duplication and enhancing UX consistency for a global analytics platform.",
  "Developed backend RESTful APIs using PHP, Laravel, and GraphQL, integrating them into the post-paywall of the site.",
  "Promoted pair programming and collaboration to quickly identify and resolve bugs, enhance code quality, and facilitate knowledge sharing.",
  "Collaborated with global product, frontend, and QA teams in daily stand-ups, sprint planning, reviews, and retrospectives, contributing to accurate estimations and timely delivery.",
];

const vesonTags = ["React", "Next.js", "Laravel", "Vue 3", "TypeScript", "Vitest", "Playwright", "AI Tooling"];
const vvTags = ["Vue.js", "PHP", "GraphQL", "REST", "MySQL", "Tailwind CSS"];
const swanseaTags = ["Java", "Android Studio", "Python", "Software Design", "Agile", "Firebase"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Tag({ label, isOptimized }: { label: string; isOptimized: boolean }) {
  return (
    <Badge
      className={
        isOptimized
          ? "bg-white/5 border border-white/10 text-slate-300 font-mono text-xs"
          : "bg-blue-50 text-blue-700 border border-blue-200 text-xs"
      }
    >
      {label}
    </Badge>
  );
}

function SectionTitle({
  children,
  isOptimized,
}: {
  children: React.ReactNode;
  isOptimized: boolean;
}) {
  return (
    <h2
      className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
        isOptimized
          ? "font-mono text-slate-200 tracking-tight"
          : "font-bold text-gray-800 font-[var(--font-playfair)]"
      }`}
    >
      {children}
    </h2>
  );
}

function Bullet({
  children,
  isOptimized,
  accent = "sky",
}: {
  children: React.ReactNode;
  isOptimized: boolean;
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
      <span className={isOptimized ? "text-slate-300" : "text-gray-700"}>{children}</span>
    </li>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const { play, volume, setVolume } = useSound();

  const handleToggle = () => {
    const next = !isOptimized;
    setIsOptimized(next);
    play(next ? "toggle-on" : "toggle-off");
    if (next) {
      toast.success("⚡ SYSTEM OPTIMIZED — LVL UP", {
        description: "+52 Lighthouse XP · +60 Test Coverage XP · Legacy Mode defeated",
        className: "font-mono",
      });
    } else {
      toast.info("↩ REVERTING TO LEGACY MODE", {
        description: "Serif fonts restored. Glassmorphism purged. -52 XP",
        className: "font-mono",
      });
    }
  };

  // ─── Theme classes ────────────────────────────────────────────────────────
  const page = isOptimized
    ? "min-h-screen bg-slate-950 text-slate-100 transition-all duration-500 pb-16 font-[var(--font-inter)]"
    : "min-h-screen bg-white text-gray-900 transition-all duration-500 pb-16 font-[var(--font-playfair)]";

  const cardCls = isOptimized
    ? "bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl"
    : "bg-white border border-gray-200 rounded-none";

  const glowCls = isOptimized
    ? "relative after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-sky-500/20 after:pointer-events-none"
    : "";

  return (
    <div className={page}>
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 ${
          isOptimized
            ? "bg-slate-950/80 backdrop-blur-md border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        <motion.div layout className="min-w-0 shrink">
          <h1
            className={`text-base sm:text-xl truncate ${
              isOptimized
                ? "font-mono tracking-tighter text-white font-semibold"
                : "font-bold italic font-[var(--font-playfair)] text-gray-800"
            }`}
          >
            Chester Descallar
            <span
              className={`ml-2 text-xs sm:text-sm font-normal not-italic hidden xs:inline ${
                isOptimized ? "text-sky-400 font-mono" : "text-gray-500"
              }`}
            >
              // {isOptimized ? "Software Engineer" : "Developer"}
            </span>
          </h1>
          <p
            className={`text-xs mt-0.5 hidden sm:block ${
              isOptimized ? "text-slate-400 font-mono" : "text-gray-500"
            }`}
          >
            <MapPin className="inline size-3 mr-1" />
            United Kingdom · Open to opportunities
          </p>
        </motion.div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Volume — icon only on mobile, slider on sm+ */}
          <div className="flex items-center gap-1 sm:gap-1.5 group">
            <button
              onClick={() => { setVolume(volume === 0 ? 0.5 : 0); play("click"); }}
              className={`transition-colors ${isOptimized ? "text-slate-500 hover:text-slate-300" : "text-gray-400 hover:text-gray-600"}`}
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
                isOptimized
                  ? "[&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:border-0"
                  : "[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-500 [&::-webkit-slider-thumb]:border-0"
              }`}
              aria-label="Volume"
            />
          </div>

          <div className={`w-px h-4 ${isOptimized ? "bg-white/10" : "bg-gray-200"}`} />

          {/* Legacy label — hidden on xs */}
          {isOptimized ? (
            <span className="hidden sm:inline text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded">
              LEGACY
            </span>
          ) : (
            <span className="hidden sm:inline text-sm text-gray-400">Legacy</span>
          )}
          <Switch
            checked={isOptimized}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-sky-500"
          />
          {isOptimized ? (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Zap className="size-3.5 text-sky-400" />
              <span className="text-xs sm:text-sm font-mono font-semibold text-sky-400 tracking-tight">
                OPT
              </span>
              <span className="hidden sm:inline text-[10px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                LVL 84
              </span>
            </div>
          ) : (
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              ↯ Optimize
            </span>
          )}
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.main
          key={isOptimized ? "modern" : "legacy"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="max-w-5xl mx-auto px-4 py-10 space-y-12"
        >
          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <section className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <HeroBanner isOptimized={isOptimized}>
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
                      ].map((ach) => (
                        <div key={ach.label} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-semibold backdrop-blur-sm ${ach.color}`}>
                          <ach.icon className="size-3" />
                          {ach.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ── LEGACY ─────────────────────────────────────────── */
                  <div>
                    <h2 className="text-3xl font-bold leading-tight font-[var(--font-playfair)] text-gray-900">
                      Self-motivated Software Engineer
                    </h2>
                    <p className="mt-3 leading-relaxed text-gray-700 text-base">
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
              <SkillsGrid isOptimized={isOptimized} />
            </motion.div>
          </section>

          {/* ── TIMELINE ──────────────────────────────────────────────────── */}
          <section>
            <SectionTitle isOptimized={isOptimized}>
              <BarChart3 className="size-4" />
              Career Timeline
            </SectionTitle>
            <Timeline isOptimized={isOptimized} />
          </section>

          {/* ── EXPERIENCE ────────────────────────────────────────────────── */}
          <section>
            <SectionTitle isOptimized={isOptimized}>
              <Briefcase className="size-4" />
              Experience
            </SectionTitle>

            <div className="space-y-4">
              {/* Veson Nautical */}
              <div className={`${cardCls} ${glowCls} p-5`}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`font-semibold text-base ${
                          isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                        }`}
                      >
                        Software Engineer
                      </h3>
                      <span className={isOptimized ? "text-slate-500 font-mono text-sm" : "text-gray-400 text-sm"}>
                        |
                      </span>
                      <span className={isOptimized ? "text-sky-400 font-mono text-sm" : "text-blue-700 text-sm font-semibold"}>
                        Veson Nautical
                      </span>
                      {isOptimized && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-mono">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${isOptimized ? "text-slate-400 font-mono" : "text-gray-500"}`}>
                      Remote, UK &nbsp;·&nbsp; December 2022 – Present
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant={isOptimized ? "outline" : "default"}
                    className={
                      isOptimized
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

                <ul className={`mt-3 space-y-2 text-sm`}>
                  {vesonBullets.map((b, i) => (
                    <Bullet key={i} isOptimized={isOptimized} accent="sky">
                      {b}
                    </Bullet>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {vesonTags.map((t) => (
                    <Tag key={t} label={t} isOptimized={isOptimized} />
                  ))}
                </div>
              </div>

              {/* VesselsValue */}
              <div className={`${cardCls} p-5`}>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3
                    className={`font-semibold text-base ${
                      isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                    }`}
                  >
                    Junior Developer
                  </h3>
                  <span className={isOptimized ? "text-slate-500 font-mono text-sm" : "text-gray-400 text-sm"}>
                    |
                  </span>
                  <span className={isOptimized ? "text-violet-400 font-mono text-sm" : "text-blue-700 text-sm font-semibold"}>
                    VesselsValue
                  </span>
                </div>
                <p className={`text-sm mb-3 ${isOptimized ? "text-slate-400 font-mono" : "text-gray-500"}`}>
                  Remote, UK &nbsp;·&nbsp; September 2021 – November 2022
                </p>
                <ul className="space-y-2 text-sm">
                  {vvBullets.map((b, i) => (
                    <Bullet key={i} isOptimized={isOptimized} accent="violet">
                      {b}
                    </Bullet>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {vvTags.map((t) => (
                    <Tag key={t} label={t} isOptimized={isOptimized} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── EDUCATION ─────────────────────────────────────────────────── */}
          <section>
            <SectionTitle isOptimized={isOptimized}>
              <GraduationCap className="size-4" />
              Education
            </SectionTitle>

            <div className={`${cardCls} p-5`}>
              <div className="flex items-start gap-3">
                <GraduationCap
                  className={`size-5 mt-0.5 shrink-0 ${isOptimized ? "text-amber-400" : "text-yellow-600"}`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className={`font-semibold text-base ${
                        isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                      }`}
                    >
                      BSc Software Engineering
                    </h3>
                    <span className={isOptimized ? "text-slate-500 text-sm" : "text-gray-400 text-sm"}>|</span>
                    <span className={isOptimized ? "text-amber-400 font-mono text-sm" : "text-blue-700 text-sm font-semibold"}>
                      Swansea University
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${isOptimized ? "text-slate-400 font-mono" : "text-gray-500"}`}>
                    September 2018 – July 2021
                  </p>
                  <ul className="space-y-2 text-sm">
                    <Bullet isOptimized={isOptimized} accent="amber">
                      <span className="font-semibold">1st Class Honours</span> — Overall average distinction
                    </Bullet>
                    <Bullet isOptimized={isOptimized} accent="amber">
                      <span className="font-semibold">Third Year Project (85%)</span> — Created a discount
                      navigation mobile application in Android Studio using Java, Google APIs, Firebase, and
                      Geofencing techniques
                    </Bullet>
                    <Bullet isOptimized={isOptimized} accent="amber">
                      Swansea University Excellence Scholarship
                    </Bullet>
                    <Bullet isOptimized={isOptimized} accent="amber">
                      Student Ambassador
                    </Bullet>
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {swanseaTags.map((t) => (
                      <Tag key={t} label={t} isOptimized={isOptimized} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── INTERESTS ─────────────────────────────────────────────────── */}
          <section>
            <SectionTitle isOptimized={isOptimized}>
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
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon className={`size-4 shrink-0 mt-0.5 ${item.color}`} />
                    <div>
                      <p className={`font-semibold ${isOptimized ? "text-slate-200 font-mono" : "text-gray-800"}`}>
                        {item.label}
                      </p>
                      <p className={isOptimized ? "text-slate-400" : "text-gray-500"}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER / CTA ──────────────────────────────────────────────── */}
          <section
            className={`rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isOptimized
                ? "bg-white/5 border border-white/10"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div>
              <p
                className={`font-semibold text-base ${
                  isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                }`}
              >
                Ready to collaborate?
              </p>
              <p className={`text-sm mt-0.5 ${isOptimized ? "text-slate-400 font-mono" : "text-gray-500"}`}>
                chester_descallar@yahoo.com
                <span className="hidden sm:inline"> &nbsp;·&nbsp; 07588 220203</span>
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={isOptimized ? "outline" : "default"}
                className={
                  isOptimized
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
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                Download CV
              </a>
            </div>
          </section>
        </motion.main>
      </AnimatePresence>

      {/* ── MODALS ────────────────────────────────────────────────────────── */}
      <MetricsModal open={metricsOpen} onClose={() => setMetricsOpen(false)} isOptimized={isOptimized} />
      <AIModal open={aiOpen} onClose={() => setAiOpen(false)} isOptimized={isOptimized} />

      {/* ── STICKY RETRO CRT — hidden on mobile, visible md+ ─────────────── */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40 scale-75 origin-bottom-right">
        <RetroCRT onAIInfo={() => setAiOpen(true)} />
      </div>

    </div>
  );
}
