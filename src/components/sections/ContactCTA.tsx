"use client";

import { motion } from "framer-motion";
import { Bot, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { th, type ModeProps } from "./shared";

interface ContactCTAProps extends ModeProps {
  phoneRevealed: boolean;
  onRevealPhone: () => void;
  onOpenAI: () => void;
}

export default function ContactCTA({
  isOptimized,
  isDark = false,
  phoneRevealed,
  onRevealPhone,
  onOpenAI,
}: ContactCTAProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        th(isOptimized, isDark,
          "bg-white/5 border border-white/10",
          "bg-white/5 border border-white/10",
          "bg-gray-50 border border-gray-200",
        )
      }`}
    >
      <div>
        <p className={`font-semibold text-base ${th(isOptimized, isDark, "text-white font-mono", "text-gray-100 font-bold", "text-gray-900 font-bold")}`}>
          Ready to collaborate?
        </p>
        <p className={`text-sm mt-0.5 ${th(isOptimized, isDark, "text-slate-400 font-mono", "text-gray-400", "text-gray-500")}`}>
          chester_descallar@yahoo.com
          <span className="hidden sm:inline">
            {" "}&nbsp;·&nbsp;{" "}
            {phoneRevealed ? (
              <span>07588 220203</span>
            ) : (
              <button
                onClick={onRevealPhone}
                className={`underline underline-offset-2 transition-colors ${th(isOptimized, isDark, "text-sky-400 hover:text-sky-300", "text-blue-400 hover:text-blue-300", "text-blue-600 hover:text-blue-800")}`}
                aria-label="Reveal phone number"
              >
                Reveal phone
              </button>
            )}
          </span>
        </p>
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        <a
          href="https://github.com/ChesterDescallar"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={`inline-flex items-center justify-center size-7 rounded-md border transition-colors ${
            isOptimized || isDark
              ? "border-white/20 text-slate-400 hover:text-slate-200 hover:bg-white/10"
              : "border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          <Github className="size-3.5" />
        </a>
        <a
          href="https://www.linkedin.com/in/chesterdescallar/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={`inline-flex items-center justify-center size-7 rounded-md border transition-colors ${
            isOptimized || isDark
              ? "border-white/20 text-slate-400 hover:text-sky-400 hover:bg-white/10"
              : "border-gray-200 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Linkedin className="size-3.5" />
        </a>
        <Button
          size="sm"
          variant={isOptimized || isDark ? "outline" : "default"}
          className={
            isOptimized || isDark
              ? "border-white/20 text-slate-300 hover:bg-white/10 font-mono text-xs"
              : "text-xs"
          }
          onClick={onOpenAI}
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
              : isDark
                ? "bg-gray-100 text-gray-900 hover:bg-white"
                : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          Download CV
        </a>
      </div>
    </motion.section>
  );
}
