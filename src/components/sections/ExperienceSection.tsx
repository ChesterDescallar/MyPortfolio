"use client";

import { motion } from "framer-motion";
import { Briefcase, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { th, Tag, SectionTitle, Bullet, type ModeProps } from "./shared";

// ─── Data ─────────────────────────────────────────────────────────────────────
const vesonIntro =
  "At Veson, I've transitioned from maintaining legacy systems to leading high-stakes architectural migrations. My role centers on modernizing the maritime SaaS experience through AI-assisted development and performance-first engineering.";

const vesonBullets = [
  { label: "Modernization Lead", text: "Spearheaded the frontend migration from legacy code to a modern Next.js/React stack using Claude Code and Augment, achieving a 40% improvement in load performance and maintainability." },
  { label: "Performance Optimization", text: "Revitalized legacy site health, boosting Lighthouse scores from 33% to 85% by implementing responsive design best practices, Laravel caching strategies, and API optimization via Blackfire.io." },
  { label: "Data Visualization", text: "Engineered dynamic dashboards for ship energy efficiency (CII) using Highcharts and Vue 3, turning complex maritime datasets into intuitive user insights." },
  { label: "Quality & Reliability", text: "Established a robust testing culture, maintaining 80%+ component coverage with Vitest/Jest and ensuring end-to-end reliability through Playwright and Cypress." },
];

const vvIntro =
  "Focused on building the building blocks of a global analytics platform, with an emphasis on scalability and seamless user transitions.";

const vvBullets = [
  { label: "UI/UX Consistency", text: "Developed a library of reusable, responsive components using Vue.js and Tailwind CSS, significantly reducing code duplication." },
  { label: "Full-Stack Integration", text: "Built and integrated RESTful and GraphQL APIs using PHP/Laravel to support post-paywall features and data delivery." },
  { label: "Collaborative Growth", text: "Championed pair programming and Agile methodologies to ensure high code quality and rapid bug resolution." },
];

const vesonTags = ["React", "Next.js", "Laravel", "Vue 3", "TypeScript", "Vitest", "Playwright", "AI Tooling"];
const vvTags = ["Vue.js", "PHP", "GraphQL", "REST", "MySQL", "Tailwind CSS"];

// ─── Component ────────────────────────────────────────────────────────────────
interface ExperienceSectionProps extends ModeProps {
  cardCls: string;
  glowCls: string;
  onViewMetrics: () => void;
}

export default function ExperienceSection({
  isOptimized,
  isDark = false,
  cardCls,
  glowCls,
  onViewMetrics,
}: ExperienceSectionProps) {
  return (
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
              onClick={onViewMetrics}
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
  );
}
