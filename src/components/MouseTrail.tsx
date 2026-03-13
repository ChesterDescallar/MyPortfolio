"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  icon: string;
  color: string;
  size: number;
  angle: number;   // drift angle in radians
  speed: number;
}

// Icon sets per mode
const OPTIMIZED_ICONS = ["⚡", "✦", "◈", "⬡", "▸", "◉", "✧", "⟡"];
const LEGACY_ICONS    = ["✦", "✿", "♦", "❋", "◆", "✶", "❀", "◇"];

const OPTIMIZED_COLORS = [
  "text-sky-400", "text-cyan-400", "text-blue-400",
  "text-indigo-400", "text-violet-400", "text-emerald-400",
];
const LEGACY_COLORS = [
  "text-gray-700", "text-gray-500", "text-slate-600",
  "text-zinc-500", "text-neutral-600",
];

let idCounter = 0;

interface MouseTrailProps {
  isOptimized: boolean;
}

export default function MouseTrail({ isOptimized }: MouseTrailProps) {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const throttle = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  const icons  = isOptimized ? OPTIMIZED_ICONS  : LEGACY_ICONS;
  const colors = isOptimized ? OPTIMIZED_COLORS : LEGACY_COLORS;

  const spawnParticle = useCallback(
    (x: number, y: number) => {
      const particle: Particle = {
        id: ++idCounter,
        x,
        y,
        icon:  icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size:  10 + Math.random() * 10,
        angle: (Math.random() * Math.PI * 2),
        speed: 0.6 + Math.random() * 0.8,
      };
      setParticles((prev) => [...prev.slice(-30), particle]);

      // Remove after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, 800);
    },
    [icons, colors]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Throttle: only spawn if moved > 12px or enough time passed
      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        if (Math.hypot(dx, dy) < 12) return;
      }
      lastPos.current = { x, y };

      if (throttle.current) return;
      throttle.current = true;
      setTimeout(() => { throttle.current = false; }, 60);

      spawnParticle(x, y);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [spawnParticle]);

  if (!mounted) return null;

  return createPortal(
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`pointer-events-none fixed select-none ${p.color}`}
          style={{
            left: p.x,
            top:  p.y,
            fontSize: p.size,
            lineHeight: 1,
            transform: "translate(-50%, -50%)",
            animation: "mouseTrailFade 0.8s ease-out forwards",
            zIndex: 9999,
          }}
        >
          {p.icon}
        </span>
      ))}
    </>,
    document.body
  );
}
