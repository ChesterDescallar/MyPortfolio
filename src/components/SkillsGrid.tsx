"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Code2, Cpu, FlaskConical, Workflow, ChevronDown, Swords, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSound } from "@/lib/sound";

interface SkillsGridProps {
  isOptimized: boolean;
  isDark?: boolean;
}

type Tier = "S" | "A" | "B" | "C";
interface SkillItem { name: string; xp: number; tier: Tier; }

// ── Brand icon SVGs (inline, no extra deps) ───────────────────────────────────
function BrandIcon({ name, dark }: { name: string; dark: boolean }) {
  const cls = `w-10 h-10 ${dark ? "opacity-80" : ""}`;
  switch (name) {
    case "React":      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className={cls} alt="React" />;
    case "Vue 2 & 3":  return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" className={cls} alt="Vue" />;
    case "TypeScript": return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className={cls} alt="TS" />;
    case "Next.js":    return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className={`${cls} ${dark ? "" : "invert"}`} alt="Next.js" />;
    case "Tailwind CSS": return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className={cls} alt="Tailwind" />;
    case "JavaScript": return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className={cls} alt="JS" />;
    case "PHP 8+":     return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" className={cls} alt="PHP" />;
    case "Laravel 9+": return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" className={cls} alt="Laravel" />;
    case "MySQL":      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className={cls} alt="MySQL" />;
    case "GraphQL":    return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" className={cls} alt="GraphQL" />;
    case "Vitest":     return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" className={cls} alt="Vitest" />;
    case "Jest":       return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" className={cls} alt="Jest" />;
    case "Playwright": return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg" className={cls} alt="Playwright" />;
    case "Cypress":    return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg" className={cls} alt="Cypress" />;
    case "Git":        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" className={cls} alt="Git" />;
    case "GitHub":     return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className={`${cls} ${dark ? "invert" : ""}`} alt="GitHub" />;
    case "Docker":     return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className={cls} alt="Docker" />;
    case "Python":     return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className={cls} alt="Python" />;
    case "VS Code":    return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" className={cls} alt="VS Code" />;
    case "Jira":       return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" className={cls} alt="Jira" />;
    case "Figma":      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" className={cls} alt="Figma" />;
    default: return (
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${dark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-600"}`}>
        {name.slice(0, 2)}
      </div>
    );
  }
}

// ── All skills for the carousel ───────────────────────────────────────────────
const carouselSkills = [
  { name: "React" },
  { name: "Vue 2 & 3" },
  { name: "TypeScript" },
  { name: "Next.js" },
  { name: "Tailwind CSS" },
  { name: "JavaScript" },
  { name: "PHP 8+" },
  { name: "Laravel 9+" },
  { name: "MySQL" },
  { name: "GraphQL" },
  { name: "Vitest" },
  { name: "Jest" },
  { name: "Playwright" },
  { name: "Git" },
  { name: "GitHub" },
  { name: "Docker" },
  { name: "Python" },
  { name: "VS Code" },
  { name: "Jira" },
  { name: "Figma" },
];

// ── Full categories for modal ─────────────────────────────────────────────────
const categories = [
  {
    id: "frontend", icon: Globe, label: "Frontend", accent: "sky",
    items: [
      { name: "React", xp: 90, tier: "S" }, { name: "Vue 2 & 3", xp: 92, tier: "S" },
      { name: "TypeScript", xp: 85, tier: "A" }, { name: "Next.js", xp: 80, tier: "A" },
      { name: "Tailwind CSS", xp: 90, tier: "S" }, { name: "JavaScript (ES6+)", xp: 92, tier: "S" },
      { name: "ShadCN", xp: 78, tier: "A" }, { name: "HTML5", xp: 95, tier: "S" },
      { name: "Composition API", xp: 88, tier: "S" }, { name: "Responsive Design", xp: 88, tier: "S" },
      { name: "Accessibility", xp: 72, tier: "A" }, { name: "WCAG", xp: 65, tier: "B" },
    ] as SkillItem[],
  },
  {
    id: "backend", icon: Server, label: "Backend", accent: "violet",
    items: [
      { name: "PHP 8+", xp: 85, tier: "A" }, { name: "Laravel 9+", xp: 85, tier: "A" },
      { name: "RESTful APIs", xp: 88, tier: "S" }, { name: "GraphQL", xp: 75, tier: "A" },
      { name: "MySQL", xp: 78, tier: "A" }, { name: "PHPUnit", xp: 72, tier: "A" },
      { name: "Laravel Queues", xp: 70, tier: "B" }, { name: "Blackfire.io", xp: 62, tier: "B" },
    ] as SkillItem[],
  },
  {
    id: "testing", icon: FlaskConical, label: "Testing & QA", accent: "emerald",
    items: [
      { name: "Vitest", xp: 88, tier: "S" }, { name: "Jest", xp: 85, tier: "A" },
      { name: "Playwright", xp: 80, tier: "A" }, { name: "Cypress", xp: 78, tier: "A" },
      { name: "PHPUnit", xp: 72, tier: "A" }, { name: "XDebug", xp: 60, tier: "B" },
    ] as SkillItem[],
  },
  {
    id: "tools", icon: Code2, label: "Dev Tools", accent: "amber",
    items: [
      { name: "Git", xp: 92, tier: "S" }, { name: "GitHub", xp: 90, tier: "S" },
      { name: "GitLab", xp: 85, tier: "A" }, { name: "Docker", xp: 68, tier: "B" },
      { name: "CI/CD", xp: 72, tier: "A" }, { name: "npm", xp: 88, tier: "S" },
    ] as SkillItem[],
  },
  {
    id: "workflow", icon: Workflow, label: "Workflow", accent: "rose",
    items: [
      { name: "Agile", xp: 88, tier: "S" }, { name: "Scrum", xp: 85, tier: "A" },
      { name: "Jira", xp: 82, tier: "A" }, { name: "Confluence", xp: 78, tier: "A" },
      { name: "Figma", xp: 65, tier: "B" }, { name: "Adobe XD", xp: 55, tier: "B" },
      { name: "Lighthouse", xp: 80, tier: "A" },
    ] as SkillItem[],
  },
  {
    id: "ai", icon: Cpu, label: "AI Tooling", accent: "pink",
    items: [
      { name: "Augment", xp: 92, tier: "S" }, { name: "Claude Code", xp: 90, tier: "S" },
    ] as SkillItem[],
  },
];

const accentMap: Record<string, {
  badge: string; badgeDark: string; badgeLegacy: string;
  ring: string; ringDark: string; ringLegacy: string;
  header: string; headerLegacy: string;
}> = {
  sky:     { badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",     badgeDark: "bg-sky-500/15 text-sky-300 border-sky-500/25",     badgeLegacy: "bg-sky-50 text-sky-700 border-sky-200",         ring: "ring-sky-500/40",     ringDark: "ring-sky-500/40",     ringLegacy: "ring-sky-300",     header: "text-sky-400",     headerLegacy: "text-sky-700" },
  violet:  { badge: "bg-violet-500/15 text-violet-300 border-violet-500/25", badgeDark: "bg-violet-500/15 text-violet-300 border-violet-500/25", badgeLegacy: "bg-violet-50 text-violet-700 border-violet-200", ring: "ring-violet-500/40",   ringDark: "ring-violet-500/40",   ringLegacy: "ring-violet-300",   header: "text-violet-400",   headerLegacy: "text-violet-700" },
  emerald: { badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25", badgeDark: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25", badgeLegacy: "bg-emerald-50 text-emerald-700 border-emerald-200", ring: "ring-emerald-500/40", ringDark: "ring-emerald-500/40", ringLegacy: "ring-emerald-300", header: "text-emerald-400", headerLegacy: "text-emerald-700" },
  amber:   { badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",     badgeDark: "bg-amber-500/15 text-amber-300 border-amber-500/25",     badgeLegacy: "bg-amber-50 text-amber-700 border-amber-200",     ring: "ring-amber-500/40",   ringDark: "ring-amber-500/40",   ringLegacy: "ring-amber-300",   header: "text-amber-400",   headerLegacy: "text-amber-700" },
  rose:    { badge: "bg-rose-500/15 text-rose-300 border-rose-500/25",         badgeDark: "bg-rose-500/15 text-rose-300 border-rose-500/25",         badgeLegacy: "bg-rose-50 text-rose-700 border-rose-200",         ring: "ring-rose-500/40",     ringDark: "ring-rose-500/40",     ringLegacy: "ring-rose-300",     header: "text-rose-400",     headerLegacy: "text-rose-700" },
  pink:    { badge: "bg-pink-500/15 text-pink-300 border-pink-500/25",         badgeDark: "bg-pink-500/15 text-pink-300 border-pink-500/25",         badgeLegacy: "bg-pink-50 text-pink-700 border-pink-200",         ring: "ring-pink-500/40",     ringDark: "ring-pink-500/40",     ringLegacy: "ring-pink-300",     header: "text-pink-400",     headerLegacy: "text-pink-700" },
};

// ── Full modal ────────────────────────────────────────────────────────────────
function SkillsModal({ open, onClose, isOptimized, isDark }: { open: boolean; onClose: () => void; isOptimized: boolean; isDark: boolean }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[80vh] overflow-y-auto ${isOptimized ? "bg-slate-900 border-white/10 text-slate-100" : isDark ? "bg-gray-950 border-white/10 text-gray-100" : "bg-white border-gray-200 text-gray-900"}`}>
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${isOptimized ? "font-mono text-white" : isDark ? "text-gray-100 font-bold" : "font-bold text-gray-900"}`}>
            <Swords className="size-5 text-sky-400" />
            Full Technical Skillset
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 mt-2">
          {categories.map((cat, i) => {
            const a = accentMap[cat.accent];
            const isOpen = active === cat.id;
            const badgeCls = isOptimized ? a.badge : isDark ? a.badgeDark : a.badgeLegacy;
            const ringCls  = isOptimized ? a.ring  : isDark ? a.ringDark  : a.ringLegacy;
            const headerCls = isOptimized || isDark ? a.header : a.headerLegacy;
            const cardCls = isOptimized
              ? `bg-white/5 border-white/10 ${isOpen ? `ring-1 ${ringCls} border-white/20` : ""}`
              : isDark
                ? `bg-white/5 border-white/10 ${isOpen ? `ring-1 ${ringCls} border-white/20` : ""}`
                : `bg-white border-gray-200 ${isOpen ? `ring-1 ${ringCls} border-gray-300 shadow-sm` : "hover:border-gray-300"}`;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`border rounded-xl cursor-pointer transition-all duration-200 select-none ${cardCls}`}
                onClick={() => setActive(isOpen ? null : cat.id)}
              >
                <div className="flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${isOptimized || isDark ? "bg-white/10" : "bg-gray-100"}`}>
                      <cat.icon className={`size-3.5 ${headerCls}`} />
                    </div>
                    <span className={`text-sm font-semibold ${headerCls}`}>{cat.label}</span>
                    <span className={`text-xs ${isOptimized || isDark ? "text-slate-500" : "text-gray-400"}`}>{cat.items.length} skills</span>
                  </div>
                  <ChevronDown className={`size-3.5 transition-transform duration-200 ${isOptimized || isDark ? "text-slate-500" : "text-gray-400"} ${isOpen ? "rotate-180" : ""}`} />
                </div>

                {/* Preview badges when closed */}
                {!isOpen && (
                  <div className="flex flex-wrap items-center gap-1.5 px-3.5 pb-3">
                    {cat.items.slice(0, 5).map((item) => (
                      <span key={item.name} className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${badgeCls}`}>{item.name}</span>
                    ))}
                    {cat.items.length > 5 && <span className={`text-xs ${isOptimized || isDark ? "text-slate-500" : "text-gray-400"}`}>+{cat.items.length - 5}</span>}
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div key="exp" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="flex flex-wrap gap-1.5 px-3.5 pb-3.5">
                        {cat.items.map((item, j) => (
                          <motion.span key={item.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.02 }}
                            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${badgeCls}`}>
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
      </DialogContent>
    </Dialog>
  );
}

// ── Carousel (legacy + dark) ──────────────────────────────────────────────────
function SkillsCarousel({ isOptimized, isDark }: { isOptimized: boolean; isDark: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { play } = useSound();

  const titleCls = isDark ? "text-gray-100 font-bold" : "text-gray-800 font-bold";
  const cardCls  = isDark
    ? "bg-gray-900 border border-white/10 hover:border-white/25 hover:bg-white/5"
    : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md";
  const labelCls = isDark ? "text-gray-400 text-xs" : "text-gray-500 text-xs";
  const ctaCls   = isDark
    ? "border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10"
    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm";

  // Duplicate items for seamless infinite loop
  const doubled = [...carouselSkills, ...carouselSkills];

  return (
    <div className="space-y-5">
      <h3 className={`text-xl text-center font-[var(--font-playfair)] ${titleCls}`}>
        Skills &amp; Technologies
      </h3>

      {/* Marquee wrapper — overflow hidden + fade edges */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${isDark ? "bg-gradient-to-r from-gray-950 to-transparent" : "bg-gradient-to-r from-white to-transparent"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${isDark ? "bg-gradient-to-l from-gray-950 to-transparent" : "bg-gradient-to-l from-white to-transparent"}`} />

        {/* Scrolling track */}
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marqueeScroll 32s linear infinite" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {doubled.map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 w-24 h-24 rounded-xl transition-all cursor-default ${cardCls}`}
            >
              <BrandIcon name={skill.name} dark={isDark} />
              <span className={labelCls}>{skill.name}</span>
            </div>
          ))}
        </div>

      </div>

      {/* CTA */}
      <div className="flex justify-center pt-1">
        <button
          onClick={() => { setModalOpen(true); play("click"); }}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${ctaCls}`}
        >
          See Full Technical Skillset
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <SkillsModal open={modalOpen} onClose={() => setModalOpen(false)} isOptimized={isOptimized} isDark={isDark} />
    </div>
  );
}

// ── RPG grid (game mode) ──────────────────────────────────────────────────────
function RPGGrid() {
  const [active, setActive] = useState<string | null>(null);
  const { play } = useSound();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-3">
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
                isOpen ? `bg-white/8 ${a.ring} ring-1 border-white/20` : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
              }`}
              onClick={() => { setActive(isOpen ? null : cat.id); play(isOpen ? "click" : "xp"); }}
            >
              <div className="flex items-center justify-between p-3.5 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg flex items-center justify-center shrink-0 bg-white/10">
                    <cat.icon className={`size-3.5 ${a.header}`} />
                  </div>
                  <span className={`text-sm font-semibold font-mono ${a.header}`}>{cat.label}</span>
                </div>
                <ChevronDown className={`size-3.5 transition-transform duration-200 text-slate-500 ${isOpen ? "rotate-180" : ""}`} />
              </div>

              {!isOpen && (
                <div className="flex flex-wrap items-center gap-1 px-3.5 pb-3">
                  {cat.items.slice(0, 4).map((item) => (
                    <span key={item.name} className={`text-[10px] px-1.5 py-0.5 rounded-full border font-mono ${a.badge}`}>{item.name}</span>
                  ))}
                  {cat.items.length > 4 && <span className="text-[10px] text-slate-500 font-mono">+{cat.items.length - 4}</span>}
                </div>
              )}

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="exp" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <div className="flex flex-wrap gap-1.5 px-3.5 pb-3.5">
                      {cat.items.map((item, j) => (
                        <motion.span key={item.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.03 }}
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${a.badge}`}>
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

      <div className="flex justify-center pt-1">
        <button
          onClick={() => { setModalOpen(true); play("click"); }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono font-medium border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-all"
        >
          See Full Technical Skillset
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <SkillsModal open={modalOpen} onClose={() => setModalOpen(false)} isOptimized={true} isDark={false} />
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SkillsGrid({ isOptimized, isDark = false }: SkillsGridProps) {
  if (isOptimized) return <RPGGrid />;
  return <SkillsCarousel isOptimized={false} isDark={isDark} />;
}
