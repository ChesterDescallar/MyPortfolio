"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(48);
  const dragging = useRef(false);

  const updatePct = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const raw = ((clientX - left) / width) * 100;
    setPct(Math.min(95, Math.max(5, raw)));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updatePct(e.clientX);
    const onMove = (ev: MouseEvent) => { if (dragging.current) updatePct(ev.clientX); };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none cursor-col-resize"
      onMouseDown={onMouseDown}
      onTouchMove={(e) => updatePct(e.touches[0].clientX)}
      onTouchStart={(e) => updatePct(e.touches[0].clientX)}
      role="separator"
      aria-label="Before/after comparison slider"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={5}
      aria-valuemax={95}
    >
      {/*
        Both panels are rendered in a flex row with overflow:hidden.
        Each panel gets a fixed viewport-width container clipped to its share.
        This avoids any absolute/height collapse issues.
      */}
      <div className="flex w-full">
        {/* BEFORE panel — left side */}
        <div
          className="shrink-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          {/* Inner div is viewport-width so content doesn't reflow as slider moves */}
          <div style={{ width: "100vw" }}>
            {before}
          </div>
        </div>

        {/* AFTER panel — right side */}
        <div
          className="shrink-0 overflow-hidden"
          style={{ width: `${100 - pct}%` }}
        >
          <div style={{ width: "100vw", marginLeft: `-${pct}vw` }}>
            {after}
          </div>
        </div>
      </div>

      {/* Divider line — fixed so it stays visible while scrolling */}
      <div
        className="fixed top-0 bottom-0 w-px bg-fuchsia-500 shadow-[0_0_8px_2px_rgba(217,70,239,0.6)] pointer-events-none z-50"
        style={{ left: `${pct}%` }}
      />

      {/* Handle — fixed, centred vertically in viewport */}
      <motion.div
        className="fixed top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex items-center justify-center size-8 rounded-full bg-fuchsia-500 shadow-[0_0_14px_4px_rgba(217,70,239,0.5)] cursor-col-resize"
        style={{ left: `${pct}%` }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M4.5 3.5L1.5 7l3 3.5M9.5 3.5L12.5 7l-3 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </motion.div>

      {/* BEFORE label — fixed top-left */}
      <div
        className="fixed top-20 left-4 z-50 text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border border-white/20 bg-black/60 text-white/90 pointer-events-none transition-opacity duration-200 backdrop-blur-sm"
        style={{ opacity: pct > 15 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>

      {/* AFTER label — fixed top-right */}
      <div
        className="fixed top-20 right-4 z-50 text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-fuchsia-500 text-white pointer-events-none transition-opacity duration-200"
        style={{ opacity: pct < 85 ? 1 : 0 }}
      >
        {afterLabel}
      </div>
    </div>
  );
}
