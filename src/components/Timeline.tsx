"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface TimelineProps {
  isOptimized: boolean;
  isDark?: boolean;
}

const entries = [
  {
    role: "Software Engineer",
    company: "Veson Nautical",
    location: "Remote, UK",
    period: "Dec 2022 – Present",
    current: true,
    description:
      "Building scalable SaaS platforms for the maritime industry. Led frontend migration to Next.js/React with AI tooling, boosted Lighthouse score from 33% to 85%, and improved load performance by 40% via Vue 2 → Vue 3 migration.",
    dotColor: "bg-sky-400",
    badgeOptimized: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    badgeDark:      "bg-sky-500/15 text-sky-300 border-sky-500/25",
    badgeLegacy:    "bg-blue-100 text-blue-700 border-blue-200",
    cardOptimized:  "bg-sky-500/5 border-sky-500/20",
    cardDark:       "bg-sky-500/10 border-sky-500/20",
    cardLegacy:     "bg-blue-50 border-blue-200",
  },
  {
    role: "Junior Developer",
    company: "VesselsValue",
    location: "Remote, UK",
    period: "Sep 2021 – Nov 2022",
    current: false,
    description:
      "Built reusable Vue.js and Tailwind CSS components for a global maritime analytics platform. Developed backend RESTful APIs and GraphQL integrations using PHP and Laravel.",
    dotColor: "bg-violet-400",
    badgeOptimized: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    badgeDark:      "bg-violet-500/15 text-violet-300 border-violet-500/25",
    badgeLegacy:    "bg-violet-100 text-violet-700 border-violet-200",
    cardOptimized:  "bg-violet-500/5 border-violet-500/20",
    cardDark:       "bg-violet-500/10 border-violet-500/20",
    cardLegacy:     "bg-violet-50 border-violet-200",
  },
  {
    role: "BSc Software Engineering",
    company: "Swansea University",
    location: "Swansea, UK",
    period: "Sep 2018 – Jul 2021",
    current: false,
    description:
      "1st Class Honours. Third year project (85%): discount navigation mobile app in Android Studio using Java, Google APIs, Firebase, and Geofencing. Excellence Scholarship recipient & Student Ambassador.",
    dotColor: "bg-amber-400",
    badgeOptimized: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    badgeDark:      "bg-amber-500/15 text-amber-300 border-amber-500/25",
    badgeLegacy:    "bg-amber-100 text-amber-700 border-amber-200",
    cardOptimized:  "bg-amber-500/5 border-amber-500/20",
    cardDark:       "bg-amber-500/10 border-amber-500/20",
    cardLegacy:     "bg-amber-50 border-amber-200",
  },
];

export default function Timeline({ isOptimized, isDark = false }: TimelineProps) {
  const spineCls = isOptimized || isDark ? "bg-white/10" : "bg-gray-200";
  const dotBorder = isOptimized ? "border-slate-950" : isDark ? "border-gray-950" : "border-white";

  return (
    <div className="relative">
      {/* Vertical spine */}
      <div className={`absolute left-[7px] top-2 bottom-2 w-px ${spineCls}`} />

      <div className="space-y-4 pl-8">
        {entries.map((entry, i) => {
          const card   = isOptimized ? entry.cardOptimized  : isDark ? entry.cardDark   : entry.cardLegacy;
          const badge  = isOptimized ? entry.badgeOptimized : isDark ? entry.badgeDark  : entry.badgeLegacy;
          const h3Cls  = isOptimized ? "text-white font-mono" : isDark ? "text-gray-100 font-bold" : "text-gray-900 font-bold";
          const coyCls = isOptimized ? "text-slate-300"       : isDark ? "text-gray-300"            : "text-gray-700";
          const locCls = isOptimized ? "text-slate-500 font-mono" : isDark ? "text-gray-500"        : "text-gray-400";
          const descCls= isOptimized ? "text-slate-400"       : isDark ? "text-gray-400"            : "text-gray-600";

          return (
            <motion.div
              key={entry.company}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="relative"
            >
              {/* Dot on spine */}
              <span className={`absolute -left-8 top-5 size-[14px] rounded-full border-2 ${entry.dotColor} ${dotBorder}`} />

              <div className={`rounded-xl border p-4 transition-all duration-300 ${card}`}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className={`font-semibold text-base leading-tight ${h3Cls}`}>{entry.role}</h3>
                    <p className={`text-sm font-medium mt-0.5 ${coyCls}`}>{entry.company}</p>
                    <p className={`text-xs mt-0.5 ${locCls}`}>{entry.location}</p>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${badge} ${isOptimized ? "font-mono" : ""}`}>
                    <Calendar className="size-3" />
                    {entry.period}
                    {entry.current && isOptimized && (
                      <span className="ml-1 size-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    )}
                  </span>
                </div>

                <p className={`mt-2.5 text-sm leading-relaxed ${descCls}`}>{entry.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
