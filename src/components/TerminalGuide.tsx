"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TerminalGuide({ isOptimized }: { isOptimized: boolean }) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState("");
  const configRef = useRef<number[] | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    configRef.current = Array.from({ length: 16 }, () => Math.random());
  }, []);

  const getTerminalTip = () => {
    const scale = window.innerWidth >= 768 ? 0.62 : 0.52;
    const monitorW = 320 * scale;
    const monitorH = 280 * scale;
    return {
      x: window.innerWidth - monitorW / 2,
      y: window.innerHeight - monitorH + 20,
    };
  };

  const buildPath = () => {
    const el = anchorRef.current;
    const rnd = configRef.current;
    if (!el || !rnd) return;

    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const tip = getTerminalTip();

    const sx = rect.right + 4;
    const sy = rect.top + rect.height / 2;
    const ex = tip.x;
    const ey = tip.y;

    // Content column is max-w-5xl (1024px) centred, so content right edge ≈ min(vw/2 + 512, vw - 16)
    // Available whitespace: from content right edge to viewport right edge
    const contentRight = Math.min(vw / 2 + 512, vw - 16);
    const marginWidth = vw - contentRight; // how wide the right whitespace is
    // Rail centre sits in the middle of that whitespace, loops spread across it
    const rail = contentRight + marginWidth * 0.5;
    const spread = Math.max(marginWidth * 0.38, 40);

    const totalDrop = ey - sy;
    const loopCount = 2 + Math.floor(rnd[0] * 2); // 2–3

    const loopStart = sy + totalDrop * 0.10;
    const loopEnd   = sy + totalDrop * 0.72;
    const slotH     = (loopEnd - loopStart) / loopCount;

    // n(i) — get random value at index i (clamped to array)
    const n = (i: number) => rnd[i % rnd.length];

    let d = `M ${p(sx)} ${p(sy)}`;

    // Lead-in to first loop
    const e0x = rail + (n(1) - 0.5) * spread;
    d += ` C ${p(sx + 35)} ${p(sy)}, ${p(e0x + 10)} ${p(loopStart - 15)}, ${p(e0x)} ${p(loopStart)}`;

    let cx = e0x;
    let cy = loopStart;

    for (let i = 0; i < loopCount; i++) {
      const ri = i * 4 + 2;
      // Loop dimensions — scale with available margin width
      const w = spread * (0.5 + n(ri) * 0.6);      // 50–110% of spread
      const h = spread * (0.4 + n(ri+1) * 0.5);    // 40–90% of spread
      const dir = n(ri+2) > 0.5 ? 1 : -1; // left or right

      // Doodle loop: swing out, curl around, cross back through entry, exit below
      // Deliberately asymmetric to look hand-drawn
      d += ` C ${p(cx + dir*w*0.9)} ${p(cy - h*0.05)},`  // sweep out
        +  `   ${p(cx + dir*w*1.0)} ${p(cy + h*0.6)},`   // bottom of swing
        +  `   ${p(cx + dir*w*0.3)} ${p(cy + h*0.95)}`;  // start curling back
      d += ` C ${p(cx - dir*w*0.2)} ${p(cy + h*1.15)},`  // overshoot
        +  `   ${p(cx - dir*w*0.4)} ${p(cy + h*0.35)},`  // come back up
        +  `   ${p(cx)}            ${p(cy + h*0.1)}`;     // cross entry point
      // Exit downward past the loop
      d += ` C ${p(cx + dir*w*0.05)} ${p(cy + h*0.4)},`
        +  `   ${p(cx)}             ${p(cy + h*0.75)},`
        +  `   ${p(cx)}             ${p(cy + h)}`;

      cy += h;

      // Wander to next loop position
      if (i < loopCount - 1) {
        const gap = slotH - h;
        const nx = rail + (n(ri+3) - 0.5) * spread;
        const ny = cy + gap * 0.6;
        d += ` C ${p(cx)} ${p(cy + gap*0.3)}, ${p(nx)} ${p(ny - 10)}, ${p(nx)} ${p(ny)}`;
        cx = nx;
        cy = ny;
      }
    }

    // Final sweep to terminal
    d += ` C ${p(cx)} ${p(cy + (ey - cy) * 0.4)}, ${p(ex + 45)} ${p(ey - 45)}, ${p(ex)} ${p(ey)}`;

    setPathD(d);
  };

  useEffect(() => {
    const tick = () => {
      buildPath();
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const strokeColor = isOptimized ? "#38bdf8" : "#94a3b8";
  const labelCls = isOptimized
    ? "border-sky-500/30 bg-sky-500/10 text-sky-400"
    : "border-slate-300/50 bg-white text-slate-400";

  return (
    <>
      <div ref={anchorRef} className="flex justify-end pointer-events-none select-none">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono whitespace-nowrap ${labelCls}`}
        >
          try the terminal ↓
        </motion.div>
      </div>

      <svg className="fixed inset-0 w-full h-full pointer-events-none z-30" aria-hidden="true">
        <defs>
          <marker id="tg-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={strokeColor} opacity="0.7" />
          </marker>
        </defs>
        <motion.path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray="3 4"
          strokeLinecap="round"
          strokeOpacity="0.55"
          markerEnd="url(#tg-arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
        />
      </svg>
    </>
  );
}

function p(n: number) { return n.toFixed(1); }
