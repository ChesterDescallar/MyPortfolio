"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { th, Tag, SectionTitle, Bullet, type ModeProps } from "./shared";

const swanseaTags = ["Java", "Android Studio", "Python", "Software Design", "Agile", "Firebase"];

interface EducationSectionProps extends ModeProps {
  cardCls: string;
}

export default function EducationSection({ isOptimized, isDark = false, cardCls }: EducationSectionProps) {
  return (
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
  );
}
