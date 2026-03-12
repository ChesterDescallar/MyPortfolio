"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Code2, Cpu, FlaskConical, Workflow, ChevronDown } from "lucide-react";

interface SkillsGridProps {
  isOptimized: boolean;
}

const categories = [
  {
    id: "frontend",
    icon: Globe,
    label: "Frontend",
    accent: "sky",
    items: [
      "React", "Next.js", "Vue 2 & 3", "Composition API",
      "TypeScript", "JavaScript (ES6+)", "Tailwind CSS",
      "HTML5", "ShadCN", "Responsive Design", "Accessibility", "WCAG",
    ],
  },
  {
    id: "backend",
    icon: Server,
    label: "Backend",
    accent: "violet",
    items: [
      "PHP 8+", "Laravel 9+", "RESTful APIs",
      "GraphQL", "MySQL", "PHPUnit",
      "Laravel Queues", "Blackfire.io",
    ],
  },
  {
    id: "testing",
    icon: FlaskConical,
    label: "Testing & QA",
    accent: "emerald",
    items: [
      "Vitest", "Jest", "Playwright",
      "Cypress", "PHPUnit", "XDebug",
    ],
  },
  {
    id: "tools",
    icon: Code2,
    label: "Dev Tools",
    accent: "amber",
    items: [
      "Git", "GitHub", "GitLab",
      "Docker", "CI/CD", "npm",
    ],
  },
  {
    id: "workflow",
    icon: Workflow,
    label: "Workflow",
    accent: "rose",
    items: [
      "Agile", "Scrum", "Jira",
      "Confluence", "Figma", "Adobe XD",
      "Lighthouse",
    ],
  },
  {
    id: "ai",
    icon: Cpu,
    label: "AI Tooling",
    accent: "pink",
    items: [
      "Augment", "Claude Code",
    ],
  },
];

const accentMap: Record<string, { dot: string; badge: string; badgeLegacy: string; ring: string; ringLegacy: string; header: string; headerLegacy: string }> = {
  sky: {
    dot: "bg-sky-400",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25 hover:bg-sky-500/30",
    badgeLegacy: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
    ring: "ring-sky-500/40",
    ringLegacy: "ring-sky-300",
    header: "text-sky-400",
    headerLegacy: "text-sky-700",
  },
  violet: {
    dot: "bg-violet-400",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/25 hover:bg-violet-500/30",
    badgeLegacy: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
    ring: "ring-violet-500/40",
    ringLegacy: "ring-violet-300",
    header: "text-violet-400",
    headerLegacy: "text-violet-700",
  },
  emerald: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/30",
    badgeLegacy: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    ring: "ring-emerald-500/40",
    ringLegacy: "ring-emerald-300",
    header: "text-emerald-400",
    headerLegacy: "text-emerald-700",
  },
  amber: {
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/25 hover:bg-amber-500/30",
    badgeLegacy: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    ring: "ring-amber-500/40",
    ringLegacy: "ring-amber-300",
    header: "text-amber-400",
    headerLegacy: "text-amber-700",
  },
  rose: {
    dot: "bg-rose-400",
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/25 hover:bg-rose-500/30",
    badgeLegacy: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    ring: "ring-rose-500/40",
    ringLegacy: "ring-rose-300",
    header: "text-rose-400",
    headerLegacy: "text-rose-700",
  },
  pink: {
    dot: "bg-pink-400",
    badge: "bg-pink-500/15 text-pink-300 border-pink-500/25 hover:bg-pink-500/30",
    badgeLegacy: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
    ring: "ring-pink-500/40",
    ringLegacy: "ring-pink-300",
    header: "text-pink-400",
    headerLegacy: "text-pink-700",
  },
};

export default function SkillsGrid({ isOptimized }: SkillsGridProps) {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {categories.map((cat, i) => {
        const a = accentMap[cat.accent];
        const isOpen = active === cat.id;

        const cardBase = isOptimized
          ? `border rounded-xl cursor-pointer transition-all duration-200 select-none ${
              isOpen
                ? `bg-white/8 ${a.ring} ring-1 border-white/20`
                : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
            }`
          : `border rounded-lg cursor-pointer transition-all duration-200 select-none ${
              isOpen
                ? `bg-white ${a.ringLegacy} ring-1 border-gray-300 shadow-sm`
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`;

        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cardBase}
            onClick={() => toggle(cat.id)}
          >
            {/* Card header */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-2.5">
                <div
                  className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isOptimized ? "bg-white/10" : "bg-gray-100"
                  }`}
                >
                  <cat.icon
                    className={`size-3.5 ${isOptimized ? a.header : a.headerLegacy}`}
                  />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isOptimized
                      ? `font-mono ${a.header}`
                      : `${a.headerLegacy}`
                  }`}
                >
                  {cat.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs ${
                    isOptimized ? "text-slate-500 font-mono" : "text-gray-400"
                  }`}
                >
                  {cat.items.length}
                </span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  } ${isOptimized ? "text-slate-500" : "text-gray-400"}`}
                />
              </div>
            </div>

            {/* Preview dots (collapsed) */}
            {!isOpen && (
              <div className="flex items-center gap-1.5 px-3.5 pb-3">
                {cat.items.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      isOptimized
                        ? "bg-white/5 text-slate-400 border-white/10 font-mono"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                    }`}
                  >
                    {item}
                  </span>
                ))}
                {cat.items.length > 3 && (
                  <span
                    className={`text-xs ${
                      isOptimized ? "text-slate-500 font-mono" : "text-gray-400"
                    }`}
                  >
                    +{cat.items.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Expanded pills */}
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
                  <div className="flex flex-wrap gap-1.5 px-3.5 pb-3.5">
                    {cat.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: j * 0.03 }}
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors cursor-default ${
                          isOptimized
                            ? `font-mono ${a.badge}`
                            : a.badgeLegacy
                        }`}
                      >
                        {item}
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
