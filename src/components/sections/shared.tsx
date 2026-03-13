"use client";

import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ─── Mode helper ──────────────────────────────────────────────────────────────
export function th(
  isOptimized: boolean,
  isDark: boolean,
  game: string,
  dark: string,
  light: string,
): string {
  if (isOptimized) return game;
  if (isDark) return dark;
  return light;
}

// ─── Shared props ─────────────────────────────────────────────────────────────
export interface ModeProps {
  isOptimized: boolean;
  isDark?: boolean;
}

// ─── Tag ──────────────────────────────────────────────────────────────────────
export function Tag({ label, isOptimized, isDark = false }: { label: string } & ModeProps) {
  return (
    <Badge
      className={th(
        isOptimized, isDark,
        "bg-white/5 border border-white/10 text-slate-300 font-mono text-xs",
        "bg-white/5 border border-white/10 text-gray-300 text-xs",
        "bg-blue-50 text-blue-700 border border-blue-200 text-xs",
      )}
    >
      {label}
    </Badge>
  );
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────
export function SectionTitle({
  children,
  isOptimized,
  isDark = false,
}: { children: React.ReactNode } & ModeProps) {
  return (
    <h2
      className={`text-lg font-semibold mb-4 flex items-center gap-2 ${th(
        isOptimized, isDark,
        "font-mono text-slate-200 tracking-tight",
        "font-bold text-gray-200 font-[var(--font-playfair)]",
        "font-bold text-gray-800 font-[var(--font-playfair)]",
      )}`}
    >
      {children}
    </h2>
  );
}

// ─── Bullet ───────────────────────────────────────────────────────────────────
export function Bullet({
  children,
  label,
  isOptimized,
  isDark = false,
  accent = "sky",
}: {
  children: React.ReactNode;
  label?: string;
  accent?: "sky" | "violet" | "amber";
} & ModeProps) {
  const accentCls =
    accent === "violet"
      ? "text-violet-400"
      : accent === "amber"
      ? "text-amber-400"
      : "text-sky-400";
  return (
    <li className="flex items-start gap-2">
      <ChevronRight className={`size-4 shrink-0 mt-0.5 ${accentCls}`} />
      <span className={th(isOptimized, isDark, "text-slate-300", "text-gray-300", "text-gray-700")}>
        {label && <span className={`font-semibold ${accentCls}`}>{label}: </span>}
        {children}
      </span>
    </li>
  );
}
