"use client";

import { motion } from "framer-motion";
import {
  Zap, MapPin, BarChart3,
  Swords, Shield, Star, Flame, Award,
} from "lucide-react";
import SkillsGrid from "@/components/SkillsGrid";
import Timeline from "@/components/Timeline";
import HeroBanner from "@/components/HeroBanner";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import InterestsSection from "@/components/sections/InterestsSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { SectionTitle } from "@/components/sections/shared";
import TerminalGuide from "@/components/TerminalGuide";

export interface PageBodyProps {
  isOptimized: boolean;
  isDark: boolean;
  cardCls: string;
  glowCls: string;
  phoneRevealed: boolean;
  onRevealPhone: () => void;
  onViewMetrics: () => void;
  onOpenAI: () => void;
  /** When true, suppresses framer-motion entry animations (used in compare panel) */
  static?: boolean;
}

export default function PageBody({
  isOptimized,
  isDark,
  cardCls,
  glowCls,
  phoneRevealed,
  onRevealPhone,
  onViewMetrics,
  onOpenAI,
  static: isStatic = false,
}: PageBodyProps) {
  const Wrapper = isStatic ? "div" : motion.main;
  const wrapperProps = isStatic
    ? { className: "max-w-5xl mx-auto px-4 py-10 space-y-12" }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
        transition: { duration: 0.35, ease: "easeInOut" },
        className: "max-w-5xl mx-auto px-4 py-10 space-y-12",
      };

  return (
    // @ts-expect-error — dynamic tag props
    <Wrapper {...wrapperProps}>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        {/* Guide label sits above the banner, arrow draws down to the CRT */}
        <div className="hidden sm:block">
          <TerminalGuide isOptimized={isOptimized} />
        </div>
        <div>
          <HeroBanner isOptimized={isOptimized} isDark={isDark}>
            {isOptimized ? (
              /* ── RPG CHARACTER CARD ─────────────────────────────────── */
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border border-white/15 bg-black/20 px-2 py-0.5 rounded">Class</span>
                      <span className="text-xs font-mono text-sky-400 font-semibold">Full-Stack Software Engineer</span>
                    </div>
                    <p className="text-2xl font-mono font-bold text-white tracking-tight" aria-hidden="true">
                      Chester <span className="text-sky-400">Descallar</span>
                    </p>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      <MapPin className="inline size-3 mr-1" />United Kingdom · Remote
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center size-16 rounded-xl border border-sky-500/40 bg-sky-500/15 shrink-0">
                    <span className="text-[9px] font-mono text-sky-400 uppercase tracking-widest">LVL</span>
                    <span className="text-2xl font-mono font-black text-sky-400 leading-none">84</span>
                  </div>
                </div>

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

                <p className="text-xs font-mono text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                  4 years production XP · PHP (Laravel) · Vue.js · React · MySQL · TypeScript · AI-assisted development (Augment, Claude Code). Proven in refactoring legacy systems, automation, and delivering measurable business impact in Agile remote-first teams.
                </p>

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
              /* ── LEGACY ──────────────────────────────────────────────── */
              <div>
                <p className={`text-3xl font-bold leading-tight font-[var(--font-playfair)] ${isDark ? "text-gray-100" : "text-gray-900"}`} aria-hidden="true">
                  Chester Descallar
                </p>
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
        </div>

        <div className="mt-6">
          <SkillsGrid isOptimized={isOptimized} isDark={isDark} />
        </div>

      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section>
        <SectionTitle isOptimized={isOptimized} isDark={isDark}>
          <BarChart3 className="size-4" />
          Career Timeline
        </SectionTitle>
        <Timeline isOptimized={isOptimized} isDark={isDark} />
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────── */}
      <ExperienceSection
        isOptimized={isOptimized}
        isDark={isDark}
        cardCls={cardCls}
        glowCls={glowCls}
        onViewMetrics={onViewMetrics}
      />

      {/* ── EDUCATION ─────────────────────────────────────────────────────── */}
      <EducationSection isOptimized={isOptimized} isDark={isDark} cardCls={cardCls} />

      {/* ── INTERESTS ─────────────────────────────────────────────────────── */}
      <InterestsSection isOptimized={isOptimized} isDark={isDark} cardCls={cardCls} />

      {/* ── FOOTER / CTA ──────────────────────────────────────────────────── */}
      <ContactCTA
        isOptimized={isOptimized}
        isDark={isDark}
        phoneRevealed={phoneRevealed}
        onRevealPhone={onRevealPhone}
        onOpenAI={onOpenAI}
      />
    </Wrapper>
  );
}
