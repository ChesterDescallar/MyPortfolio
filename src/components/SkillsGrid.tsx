"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Code2, Cpu, FlaskConical, Workflow, ChevronDown, Swords } from "lucide-react";
import { useSound } from "@/lib/sound";

interface SkillsGridProps {
  isOptimized: boolean;
}

type Tier = "S" | "A" | "B" | "C";

interface SkillItem {
  name: string;
  xp: number;   // 0-100
  tier: Tier;
}

const categories = [
  {
    id: "frontend",
    icon: Globe,
    label: "Frontend",
    accent: "sky",
    level: 87,
    items: [
      { name: "React", xp: 90, tier: "S" },
      { name: "Vue 2 & 3", xp: 92, tier: "S" },
      { name: "TypeScript", xp: 85, tier: "A" },
      { name: "Next.js", xp: 80, tier: "A" },
      { name: "Tailwind CSS", xp: 90, tier: "S" },
      { name: "JavaScript (ES6+)", xp: 92, tier: "S" },
      { name: "ShadCN", xp: 78, tier: "A" },
      { name: "HTML5", xp: 95, tier: "S" },
      { name: "Composition API", xp: 88, tier: "S" },
      { name: "Responsive Design", xp: 88, tier: "S" },
      { name: "Accessibility", xp: 72, tier: "A" },
      { name: "WCAG", xp: 65, tier: "B" },
    ] as SkillItem[],
  },
  {
    id: "backend",
    icon: Server,
    label: "Backend",
    accent: "violet",
    level: 78,
    items: [
      { name: "PHP 8+", xp: 85, tier: "A" },
      { name: "Laravel 9+", xp: 85, tier: "A" },
      { name: "RESTful APIs", xp: 88, tier: "S" },
      { name: "GraphQL", xp: 75, tier: "A" },
      { name: "MySQL", xp: 78, tier: "A" },
      { name: "PHPUnit", xp: 72, tier: "A" },
      { name: "Laravel Queues", xp: 70, tier: "B" },
      { name: "Blackfire.io", xp: 62, tier: "B" },
    ] as SkillItem[],
  },
  {
    id: "testing",
    icon: FlaskConical,
    label: "Testing & QA",
    accent: "emerald",
    level: 82,
    items: [
      { name: "Vitest", xp: 88, tier: "S" },
      { name: "Jest", xp: 85, tier: "A" },
      { name: "Playwright", xp: 80, tier: "A" },
      { name: "Cypress", xp: 78, tier: "A" },
      { name: "PHPUnit", xp: 72, tier: "A" },
      { name: "XDebug", xp: 60, tier: "B" },
    ] as SkillItem[],
  },
  {
    id: "tools",
    icon: Code2,
    label: "Dev Tools",
    accent: "amber",
    level: 85,
    items: [
      { name: "Git", xp: 92, tier: "S" },
      { name: "GitHub", xp: 90, tier: "S" },
      { name: "GitLab", xp: 85, tier: "A" },
      { name: "Docker", xp: 68, tier: "B" },
      { name: "CI/CD", xp: 72, tier: "A" },
      { name: "npm", xp: 88, tier: "S" },
    ] as SkillItem[],
  },
  {
    id: "workflow",
    icon: Workflow,
    label: "Workflow",
    accent: "rose",
    level: 80,
    items: [
      { name: "Agile", xp: 88, tier: "S" },
      { name: "Scrum", xp: 85, tier: "A" },
      { name: "Jira", xp: 82, tier: "A" },
      { name: "Confluence", xp: 78, tier: "A" },
      { name: "Figma", xp: 65, tier: "B" },
      { name: "Adobe XD", xp: 55, tier: "B" },
      { name: "Lighthouse", xp: 80, tier: "A" },
    ] as SkillItem[],
  },
  {
    id: "ai",
    icon: Cpu,
    label: "AI Tooling",
    accent: "pink",
    level: 90,
    items: [
      { name: "Augment", xp: 92, tier: "S" },
      { name: "Claude Code", xp: 90, tier: "S" },
    ] as SkillItem[],
  },
];

const accentMap: Record<string, {
  badge: string; badgeLegacy: string;
  ring: string; ringLegacy: string;
  header: string; headerLegacy: string;
  bar: string; barGlow: string;
  tierS: string; tierA: string; tierB: string; tierC: string;
}> = {
  sky: {
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25 hover:bg-sky-500/30",
    badgeLegacy: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
    ring: "ring-sky-500/40", ringLegacy: "ring-sky-300",
    header: "text-sky-400", headerLegacy: "text-sky-700",
    bar: "bg-sky-400", barGlow: "shadow-[0_0_8px_rgba(56,189,248,0.6)]",
    tierS: "text-sky-300 border-sky-400/50 bg-sky-400/10",
    tierA: "text-emerald-300 border-emerald-400/50 bg-emerald-400/10",
    tierB: "text-amber-300 border-amber-400/50 bg-amber-400/10",
    tierC: "text-slate-400 border-slate-500/50 bg-slate-500/10",
  },
  violet: {
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/25 hover:bg-violet-500/30",
    badgeLegacy: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
    ring: "ring-violet-500/40", ringLegacy: "ring-violet-300",
    header: "text-violet-400", headerLegacy: "text-violet-700",
    bar: "bg-violet-400", barGlow: "shadow-[0_0_8px_rgba(167,139,250,0.6)]",
    tierS: "text-violet-300 border-violet-400/50 bg-violet-400/10",
    tierA: "text-emerald-300 border-emerald-400/50 bg-emerald-400/10",
    tierB: "text-amber-300 border-amber-400/50 bg-amber-400/10",
    tierC: "text-slate-400 border-slate-500/50 bg-slate-500/10",
  },
  emerald: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/30",
    badgeLegacy: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    ring: "ring-emerald-500/40", ringLegacy: "ring-emerald-300",
    header: "text-emerald-400", headerLegacy: "text-emerald-700",
    bar: "bg-emerald-400", barGlow: "shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    tierS: "text-emerald-300 border-emerald-400/50 bg-emerald-400/10",
    tierA: "text-sky-300 border-sky-400/50 bg-sky-400/10",
    tierB: "text-amber-300 border-amber-400/50 bg-amber-400/10",
    tierC: "text-slate-400 border-slate-500/50 bg-slate-500/10",
  },
  amber: {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/25 hover:bg-amber-500/30",
    badgeLegacy: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    ring: "ring-amber-500/40", ringLegacy: "ring-amber-300",
    header: "text-amber-400", headerLegacy: "text-amber-700",
    bar: "bg-amber-400", barGlow: "shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    tierS: "text-amber-300 border-amber-400/50 bg-amber-400/10",
    tierA: "text-emerald-300 border-emerald-400/50 bg-emerald-400/10",
    tierB: "text-sky-300 border-sky-400/50 bg-sky-400/10",
    tierC: "text-slate-400 border-slate-500/50 bg-slate-500/10",
  },
  rose: {
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/25 hover:bg-rose-500/30",
    badgeLegacy: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    ring: "ring-rose-500/40", ringLegacy: "ring-rose-300",
    header: "text-rose-400", headerLegacy: "text-rose-700",
    bar: "bg-rose-400", barGlow: "shadow-[0_0_8px_rgba(251,113,133,0.6)]",
    tierS: "text-rose-300 border-rose-400/50 bg-rose-400/10",
    tierA: "text-emerald-300 border-emerald-400/50 bg-emerald-400/10",
    tierB: "text-amber-300 border-amber-400/50 bg-amber-400/10",
    tierC: "text-slate-400 border-slate-500/50 bg-slate-500/10",
  },
  pink: {
    badge: "bg-pink-500/15 text-pink-300 border-pink-500/25 hover:bg-pink-500/30",
    badgeLegacy: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
    ring: "ring-pink-500/40", ringLegacy: "ring-pink-300",
    header: "text-pink-400", headerLegacy: "text-pink-700",
    bar: "bg-pink-400", barGlow: "shadow-[0_0_8px_rgba(244,114,182,0.6)]",
    tierS: "text-pink-300 border-pink-400/50 bg-pink-400/10",
    tierA: "text-emerald-300 border-emerald-400/50 bg-emerald-400/10",
    tierB: "text-amber-300 border-amber-400/50 bg-amber-400/10",
    tierC: "text-slate-400 border-slate-500/50 bg-slate-500/10",
  },
};

function tierClass(tier: Tier, a: typeof accentMap[string]) {
  return tier === "S" ? a.tierS : tier === "A" ? a.tierA : tier === "B" ? a.tierB : a.tierC;
}

function XPBar({ xp, barCls, glowCls, delay }: { xp: number; barCls: string; glowCls: string; delay: number }) {
  return (
    <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${barCls} ${glowCls}`}
        initial={{ width: 0 }}
        animate={{ width: `${xp}%` }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      />
    </div>
  );
}

export default function SkillsGrid({ isOptimized }: SkillsGridProps) {
  const [active, setActive] = useState<string | null>(null);
  const { play } = useSound();
  const toggle = (id: string) => {
    const willOpen = active !== id;
    setActive((prev) => (prev === id ? null : id));
    play(willOpen ? (isOptimized ? "xp" : "click") : "click");
  };

  if (!isOptimized) {
    // ── LEGACY: simple expandable cards ──────────────────────────────────────
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((cat, i) => {
          const a = accentMap[cat.accent];
          const isOpen = active === cat.id;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`border rounded-lg cursor-pointer transition-all duration-200 select-none ${
                isOpen ? `bg-white ${a.ringLegacy} ring-1 border-gray-300 shadow-sm` : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              onClick={() => toggle(cat.id)}
            >
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                    <cat.icon className={`size-3.5 ${a.headerLegacy}`} />
                  </div>
                  <span className={`text-sm font-semibold ${a.headerLegacy}`}>{cat.label}</span>
                </div>
                <ChevronDown className={`size-3.5 transition-transform duration-200 text-gray-400 ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {!isOpen && (
                <div className="flex flex-wrap items-center gap-1.5 px-3.5 pb-3">
                  {cat.items.slice(0, 4).map((item) => (
                    <span key={item.name} className="text-xs px-2 py-0.5 rounded-full border bg-gray-50 text-gray-500 border-gray-200 whitespace-nowrap">{item.name}</span>
                  ))}
                  {cat.items.length > 4 && <span className="text-xs text-gray-400 whitespace-nowrap">+{cat.items.length - 4}</span>}
                </div>
              )}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="expanded" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <div className="flex flex-wrap gap-1.5 px-3.5 pb-3.5">
                      {cat.items.map((item, j) => (
                        <motion.span key={item.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.03 }}
                          className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors cursor-default ${a.badgeLegacy}`}>
                          {item.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // ── OPTIMIZED: RPG character sheet ───────────────────────────────────────
  return (
    <div className="space-y-3">
      {/* Stat summary bar */}
      <div className="flex items-center gap-3 px-1 mb-1">
        <Swords className="size-3.5 text-slate-500" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Character Stats</span>
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs font-mono text-slate-600">4 YRS EXP</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((cat, i) => {
          const a = accentMap[cat.accent];
          const isOpen = active === cat.id;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`border rounded-xl cursor-pointer transition-all duration-200 select-none ${
                isOpen
                  ? `bg-white/8 ${a.ring} ring-1 border-white/20`
                  : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
              }`}
              onClick={() => toggle(cat.id)}
            >
              {/* Card header */}
              <div className="flex items-center justify-between p-3.5 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg flex items-center justify-center shrink-0 bg-white/10">
                    <cat.icon className={`size-3.5 ${a.header}`} />
                  </div>
                  <div>
                    <span className={`text-xs font-mono font-semibold ${a.header}`}>{cat.label}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] font-mono text-slate-600">LVL</span>
                      <span className={`text-[10px] font-mono font-bold ${a.header}`}>{cat.level}</span>
                    </div>
                  </div>
                </div>
                <ChevronDown className={`size-3.5 transition-transform duration-200 text-slate-500 ${isOpen ? "rotate-180" : ""}`} />
              </div>

              {/* Category XP bar */}
              <div className="px-3.5 pb-2">
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${a.bar} ${a.barGlow}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.level}%` }}
                    transition={{ duration: 0.7, delay: i * 0.06 + 0.1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[9px] font-mono text-slate-600">0</span>
                  <span className="text-[9px] font-mono text-slate-600">XP {cat.level}/100</span>
                </div>
              </div>

              {/* Collapsed preview: top 3 skills */}
              {!isOpen && (
                <div className="flex flex-wrap gap-1 px-3.5 pb-3">
                  {cat.items.slice(0, 3).map((item) => (
                    <span key={item.name} className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${a.badge}`}>
                      {item.name}
                    </span>
                  ))}
                  {cat.items.length > 3 && (
                    <span className="text-[10px] font-mono text-slate-600">+{cat.items.length - 3}</span>
                  )}
                </div>
              )}

              {/* Expanded: skill rows with XP bars + tier badges */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="expanded"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3.5 pb-3.5 space-y-2">
                      {cat.items.map((item, j) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.04 }}
                          className="flex items-center gap-2"
                        >
                          {/* Tier badge */}
                          <span className={`text-[9px] font-mono font-bold w-4 text-center border rounded px-0.5 ${tierClass(item.tier, a)}`}>
                            {item.tier}
                          </span>
                          {/* Skill name */}
                          <span className="text-[11px] font-mono text-slate-300 w-20 sm:w-28 shrink-0 truncate">{item.name}</span>
                          {/* XP bar */}
                          <XPBar xp={item.xp} barCls={a.bar} glowCls={a.barGlow} delay={j * 0.04 + 0.05} />
                          {/* XP number */}
                          <span className="text-[9px] font-mono text-slate-500 w-6 text-right">{item.xp}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
