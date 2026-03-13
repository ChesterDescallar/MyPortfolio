"use client";

import { motion } from "framer-motion";
import { Trophy, Gamepad2, Music, Dumbbell, Plane } from "lucide-react";
import { th, SectionTitle, type ModeProps } from "./shared";

const interests = [
  { icon: Gamepad2, label: "Avid Gamer",          desc: "Team-based games: Dota 2, LoL, CS2",              color: "text-sky-400" },
  { icon: Music,    label: "Self-taught Guitarist", desc: "Music enthusiast",                               color: "text-violet-400" },
  { icon: Dumbbell, label: "Fitness",               desc: "Regular gym-goer — physical fitness & wellbeing", color: "text-emerald-400" },
  { icon: Plane,    label: "Travel",                desc: "Passionate about different countries & cultures",  color: "text-amber-400" },
];

interface InterestsSectionProps extends ModeProps {
  cardCls: string;
}

export default function InterestsSection({ isOptimized, isDark = false, cardCls }: InterestsSectionProps) {
  return (
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
          {interests.map((item, i) => (
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
  );
}
