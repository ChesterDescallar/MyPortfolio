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
  Globe,
  Code2,
  Server,
  Cpu,
} from "lucide-react";
import dynamic from "next/dynamic";
import MetricsModal from "@/components/MetricsModal";
import AIModal from "@/components/AIModal";
import Terminal from "@/components/Terminal";

const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });

// ─── Tech tags ───────────────────────────────────────────────────────────────
const vesonTags = ["React", "Laravel", "Vitest", "Vue 3", "TypeScript", "AI Tooling"];
const vvTags = ["Vue.js", "PHP", "GraphQL", "REST", "MySQL"];
const swanseaTags = ["Java", "Python", "Software Design", "Agile", "Algorithms"];

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
      className={`text-lg font-semibold mb-4 ${
        isOptimized ? "font-mono text-slate-200 tracking-tight" : "font-bold text-gray-800 font-serif"
      }`}
    >
      {children}
    </h2>
  );
}

// ─── Skill pillars ────────────────────────────────────────────────────────────
const skills = [
  { icon: Globe, label: "Frontend", items: ["React", "Vue 3", "TypeScript", "Next.js"] },
  { icon: Server, label: "Backend", items: ["Laravel", "PHP", "Node.js", "GraphQL"] },
  { icon: Code2, label: "Testing", items: ["Vitest", "Jest", "PHPUnit", "Cypress"] },
  { icon: Cpu, label: "AI Tooling", items: ["Claude", "Copilot", "Cursor", "GPT-4o"] },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const handleToggle = () => {
    const next = !isOptimized;
    setIsOptimized(next);
    if (next) {
      toast.success("System Optimization Complete", {
        description: "Lighthouse score boosted to 85%. Assets minified. Legacy CSS purged.",
      });
    } else {
      toast.info("Reverted to Legacy Mode", {
        description: "Times New Roman restored. Goodbye glassmorphism.",
      });
    }
  };

  // ─── Themes ──────────────────────────────────────────────────────────────────
  const page = isOptimized
    ? "min-h-screen bg-slate-950 text-slate-100 transition-all duration-500 pb-16"
    : "min-h-screen bg-white text-gray-900 font-serif transition-all duration-500 pb-16";

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
        className={`sticky top-0 z-40 border-b px-6 py-4 flex items-center justify-between ${
          isOptimized
            ? "bg-slate-950/80 backdrop-blur-md border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        <motion.div layout>
          <h1
            className={`text-xl ${
              isOptimized
                ? "font-mono tracking-tighter text-white"
                : "font-bold italic font-serif text-gray-800"
            }`}
          >
            Chester Descallar
            <span
              className={`ml-2 text-sm ${
                isOptimized ? "text-sky-400 not-italic" : "text-gray-500 not-italic"
              }`}
            >
              // {isOptimized ? "Software Engineer" : "Developer"}
            </span>
          </h1>
          <p
            className={`text-xs mt-0.5 ${
              isOptimized ? "text-slate-400 font-mono" : "text-gray-500"
            }`}
          >
            <MapPin className="inline size-3 mr-1" />
            United Kingdom · Open to opportunities
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <span
            className={`text-sm ${
              isOptimized ? "text-slate-400 font-mono" : "text-gray-500"
            }`}
          >
            {isOptimized ? "Optimized" : "Legacy"}
          </span>
          <Switch
            checked={isOptimized}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-sky-500"
          />
          <span
            className={`text-sm font-medium ${
              isOptimized ? "text-sky-400 font-mono" : "text-gray-700"
            }`}
          >
            {isOptimized ? "↯ Optimized" : "Optimize System"}
          </span>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {isOptimized ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-3">
                  <Zap className="size-3 text-sky-400" />
                  <span className="text-xs text-sky-400 font-mono">4 yrs production experience</span>
                </div>
              ) : null}

              <h2
                className={`text-3xl font-bold leading-tight ${
                  isOptimized ? "font-mono text-white" : "font-serif text-gray-900"
                }`}
              >
                {isOptimized ? (
                  <>
                    Self-motivated{" "}
                    <span className="text-sky-400">Software Engineer</span>
                  </>
                ) : (
                  "Self-motivated Software Engineer"
                )}
              </h2>
              <p
                className={`mt-3 max-w-2xl leading-relaxed ${
                  isOptimized ? "text-slate-400 text-sm" : "text-gray-600"
                }`}
              >
                4 years of professional experience building performant, maintainable web applications
                at Veson Nautical and VesselsValue. Passionate about engineering quality, AI-assisted
                tooling, and shipping products that make an impact.
              </p>
            </motion.div>

            {/* ── Skill pillars ─────────────────────────────────────────── */}
            {isOptimized && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
              >
                {skills.map((s) => (
                  <div
                    key={s.label}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <s.icon className="size-4 text-sky-400" />
                      <span className="text-xs font-mono text-slate-300">{s.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs text-slate-400 font-mono bg-white/5 px-1.5 py-0.5 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </section>

          {/* ── TIMELINE ──────────────────────────────────────────────────── */}
          <section>
            <SectionTitle isOptimized={isOptimized}>
              <BarChart3 className="inline size-4 mr-2 align-text-bottom" />
              Career Timeline
            </SectionTitle>
            <Timeline isOptimized={isOptimized} />
          </section>

          {/* ── EXPERIENCE CARDS ──────────────────────────────────────────── */}
          <section>
            <SectionTitle isOptimized={isOptimized}>
              <Briefcase className="inline size-4 mr-2 align-text-bottom" />
              Experience
            </SectionTitle>

            <div className="space-y-4">
              {/* Veson Nautical */}
              <div className={`${cardCls} ${glowCls} p-5`}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-semibold text-base ${
                          isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                        }`}
                      >
                        Veson Nautical
                      </h3>
                      {isOptimized && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-mono">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>
                      Software Engineer &nbsp;·&nbsp; Sep 2022 – Present
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
                    onClick={() => setMetricsOpen(true)}
                  >
                    <BarChart3 className="size-3 mr-1.5" />
                    View Metrics
                  </Button>
                </div>

                <ul
                  className={`mt-3 space-y-1.5 text-sm ${
                    isOptimized ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 shrink-0 mt-0.5 text-sky-400" />
                    Delivered 40% performance improvement across core modules via profiling and refactoring
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 shrink-0 mt-0.5 text-sky-400" />
                    Led Vue 2 → Vue 3 migration; uplifted test coverage from ~20% to 80%+ using Vitest/Jest
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 shrink-0 mt-0.5 text-sky-400" />
                    Migrated backend business logic to modern Laravel with clean architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 shrink-0 mt-0.5 text-sky-400" />
                    Integrated AI tooling (Cursor, Claude, Copilot) to accelerate developer velocity
                  </li>
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {vesonTags.map((t) => (
                    <Tag key={t} label={t} isOptimized={isOptimized} />
                  ))}
                </div>
              </div>

              {/* VesselsValue */}
              <div className={`${cardCls} p-5`}>
                <div>
                  <h3
                    className={`font-semibold text-base ${
                      isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                    }`}
                  >
                    VesselsValue
                  </h3>
                  <p className={`text-sm ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>
                    Junior Developer &nbsp;·&nbsp; Aug 2021 – Aug 2022
                  </p>
                </div>
                <ul
                  className={`mt-3 space-y-1.5 text-sm ${
                    isOptimized ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 shrink-0 mt-0.5 text-violet-400" />
                    Built and maintained internal tools using Vue.js and PHP
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 shrink-0 mt-0.5 text-violet-400" />
                    Developed GraphQL APIs and integrated REST services for maritime data pipelines
                  </li>
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {vvTags.map((t) => (
                    <Tag key={t} label={t} isOptimized={isOptimized} />
                  ))}
                </div>
              </div>

              {/* Swansea */}
              <div className={`${cardCls} p-5`}>
                <div className="flex items-center gap-2">
                  <GraduationCap
                    className={`size-5 ${isOptimized ? "text-amber-400" : "text-yellow-500"}`}
                  />
                  <div>
                    <h3
                      className={`font-semibold text-base ${
                        isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                      }`}
                    >
                      Swansea University
                    </h3>
                    <p className={`text-sm ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>
                      BSc Software Engineering, 1st Class Honours &nbsp;·&nbsp; 2018 – 2021
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {swanseaTags.map((t) => (
                    <Tag key={t} label={t} isOptimized={isOptimized} />
                  ))}
                </div>
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
                className={`font-semibold ${
                  isOptimized ? "text-white font-mono" : "text-gray-900 font-bold"
                }`}
              >
                Ready to collaborate?
              </p>
              <p
                className={`text-sm mt-0.5 ${
                  isOptimized ? "text-slate-400" : "text-gray-500"
                }`}
              >
                chester_descallar@yahoo.com &nbsp;·&nbsp; 07588220203
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
                onClick={() => setAiOpen(true)}
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
                    : "bg-primary text-primary-foreground"
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

      {/* ── TERMINAL ──────────────────────────────────────────────────────── */}
      <Terminal isOptimized={isOptimized} onAIInfo={() => setAiOpen(true)} />
    </div>
  );
}
