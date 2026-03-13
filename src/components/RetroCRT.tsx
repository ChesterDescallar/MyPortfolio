"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { useSound } from "@/lib/sound";

// ─── Snake Game ────────────────────────────────────────────────────────────────
const COLS = 30;
const ROWS = 20;
const CELL = 16;

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Pt = { x: number; y: number };

function randFood(snake: Pt[]): Pt {
  let pt: Pt;
  do {
    pt = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === pt.x && s.y === pt.y));
  return pt;
}

function SnakeGame({ onQuit, play }: { onQuit: () => void; play: (s: "xp" | "error" | "click") => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 15, y: 10 }, { x: 14, y: 10 }, { x: 13, y: 10 }] as Pt[],
    dir: "RIGHT" as Dir,
    nextDir: "RIGHT" as Dir,
    food: { x: 20, y: 10 } as Pt,
    score: 0,
    dead: false,
    started: false,
  });
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [started, setStarted] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef(0);
  const SPEED = 120; // ms per tick

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { snake, food, dead: isDead } = stateRef.current;

    ctx.fillStyle = "#050d05";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    // Grid dots
    ctx.fillStyle = "rgba(0,255,80,0.06)";
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        ctx.fillRect(c * CELL + 7, r * CELL + 7, 2, 2);

    // Food — pulsing green square
    ctx.fillStyle = isDead ? "rgba(255,80,80,0.9)" : "rgba(255,200,0,0.9)";
    ctx.shadowBlur = 10;
    ctx.shadowColor = isDead ? "rgba(255,80,80,0.8)" : "rgba(255,200,0,0.8)";
    ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);
    ctx.shadowBlur = 0;

    // Snake
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isDead
        ? `rgba(255,80,80,${isHead ? 1 : 0.6})`
        : `rgba(0,255,80,${isHead ? 1 : 0.75 - i * 0.01})`;
      ctx.shadowBlur = isHead ? 12 : 4;
      ctx.shadowColor = isDead ? "rgba(255,80,80,0.9)" : "rgba(0,255,80,0.9)";
      if (isHead) {
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      } else {
        ctx.fillRect(seg.x * CELL + 2, seg.y * CELL + 2, CELL - 4, CELL - 4);
      }
      ctx.shadowBlur = 0;
    });
  }, []);

  const tick = useCallback((now: number) => {
    if (now - lastTickRef.current < SPEED) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    lastTickRef.current = now;

    const s = stateRef.current;
    if (s.dead || !s.started) {
      draw();
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    s.dir = s.nextDir;
    const head = { ...s.snake[0] };
    if (s.dir === "UP") head.y--;
    else if (s.dir === "DOWN") head.y++;
    else if (s.dir === "LEFT") head.x--;
    else head.x++;

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      s.dead = true;
      play("error");
      setDead(true);
      draw();
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    // Self collision
    if (s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
      s.dead = true;
      play("error");
      setDead(true);
      draw();
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    s.snake.unshift(head);

    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      setScore(s.score);
      play("xp");
      s.food = randFood(s.snake);
    } else {
      s.snake.pop();
    }

    draw();
    rafRef.current = requestAnimationFrame(tick);
  }, [draw, play]);

  useEffect(() => {
    stateRef.current.food = randFood(stateRef.current.snake);
    draw();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (!s.started && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(e.key)) {
        s.started = true;
        setStarted(true);
      }
      if (e.key === "ArrowUp"    || e.key === "w") { if (s.dir !== "DOWN")  s.nextDir = "UP"; }
      if (e.key === "ArrowDown"  || e.key === "s") { if (s.dir !== "UP")    s.nextDir = "DOWN"; }
      if (e.key === "ArrowLeft"  || e.key === "a") { if (s.dir !== "RIGHT") s.nextDir = "LEFT"; }
      if (e.key === "ArrowRight" || e.key === "d") { if (s.dir !== "LEFT")  s.nextDir = "RIGHT"; }
      if (e.key === "Escape") onQuit();
      if (s.dead && e.key === "r") {
        stateRef.current = {
          snake: [{ x: 15, y: 10 }, { x: 14, y: 10 }, { x: 13, y: 10 }],
          dir: "RIGHT", nextDir: "RIGHT",
          food: randFood([{ x: 15, y: 10 }]),
          score: 0, dead: false, started: false,
        };
        setScore(0); setDead(false); setStarted(false);
      }
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onQuit]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 py-4 select-none">
      <div className="flex items-center gap-6 font-mono text-xs" style={{ color: "rgba(0,255,80,0.7)" }}>
        <span>SNAKE v1.0</span>
        <span style={{ color: "rgba(0,255,80,0.9)" }}>SCORE: {score}</span>
        <span className="opacity-50">[ESC] quit</span>
      </div>
      <div className="relative" style={{ width: COLS * CELL, height: ROWS * CELL }}>
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          role="img"
          aria-label="Snake game"
          style={{ display: "block", border: "1px solid rgba(0,255,80,0.2)", boxShadow: "0 0 20px rgba(0,255,80,0.1)" }}
        />
        {!started && !dead && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
            <p className="font-mono text-sm animate-pulse" style={{ color: "rgba(0,255,80,0.9)", textShadow: "0 0 10px rgba(0,255,80,0.8)" }}>
              PRESS ARROW KEYS TO START
            </p>
          </div>
        )}
        {dead && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: "rgba(0,0,0,0.7)" }}>
            <p className="font-mono text-lg font-bold" style={{ color: "rgba(255,80,80,0.9)", textShadow: "0 0 12px rgba(255,80,80,0.8)" }}>
              GAME OVER
            </p>
            <p className="font-mono text-sm" style={{ color: "rgba(0,255,80,0.7)" }}>Score: {score}</p>
            <p className="font-mono text-xs animate-pulse" style={{ color: "rgba(0,255,80,0.5)" }}>[R] restart  [ESC] quit</p>
          </div>
        )}
      </div>
      <p className="font-mono text-[10px] opacity-40" style={{ color: "rgba(0,255,80,0.9)" }}>
        WASD or Arrow Keys to move
      </p>
    </div>
  );
}

interface RetroCRTProps {
  onAIInfo: () => void;
  /** When true, renders only a compact pill button (for mobile). */
  mobileOnly?: boolean;
}

interface Line {
  type: "input" | "output" | "error";
  text: string;
}

const BOOT_LINES = [
  "DEV_OS V4.0 — CHESTER DESCALLAR TERMINAL",
  "Copyright (c) 2024 Chester Descallar",
  " ",
  "Initialising hardware...",
  "Checking memory.............. OK",
  "Loading dev environment...... OK",
  "Mounting /dev/chester........ OK",
  " ",
  'Type "help" to list available commands.',
];

const COMMANDS: Record<string, () => string> = {
  help: () =>
    `Available commands:
  ls /experience       — list work history
  cat contact.txt      — display contact info
  ai --info            — open AI workflow panel
  download_cv          — download CV (PDF)
  snake                — launch snake minigame
  clear                — clear terminal
  help                 — show this message`,
  "ls /experience": () =>
    `drwxr-xr-x  Veson Nautical          Software Engineer       Dec 2022 – Present
drwxr-xr-x  VesselsValue            Junior Developer        Sep 2021 – Nov 2022
drwxr-xr-x  Swansea University      BSc Soft. Engineering   Sep 2018 – Jul 2021`,
  "cat contact.txt": () =>
    `Phone:  07588 220203
Email:  chester_descallar@yahoo.com
GitHub: github.com/chesterdescallar`,
  clear: () => "__CLEAR__",
};

// Scanlines overlay
function Scanlines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
      }}
    />
  );
}

// Green phosphor glow on text
function PhosphorGlow() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
      style={{
        boxShadow: "inset 0 0 60px 4px rgba(0,255,80,0.07)",
      }}
    />
  );
}

export default function RetroCRT({ onAIInfo, mobileOnly = false }: RetroCRTProps) {
  const { play } = useSound();
  const [booted, setBooted] = useState(false);
  const [open, setOpen] = useState(false);
  const [flickering, setFlickering] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [snakeMode, setSnakeMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, bootLines]);

  useEffect(() => {
    if (open && booted) inputRef.current?.focus();
  }, [open, booted]);

  // Escape closes, Ctrl+` or Ctrl+~ opens
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const addTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const handleBoot = () => {
    if (open) return;
    play("terminal");
    setOpen(true);
    setBooted(false);
    setBootLines([]);
    setLines([]);

    // Wait for expand animation (300ms) then flicker for 400ms then boot
    addTimeout(() => {
      setFlickering(true);
      addTimeout(() => {
        setFlickering(false);
        let i = 0;
        const tick = () => {
          if (i < BOOT_LINES.length) {
            setBootLines((prev) => [...prev, BOOT_LINES[i]]);
            i++;
            addTimeout(tick, 80);
          } else {
            addTimeout(() => setBooted(true), 300);
          }
        };
        tick();
      }, 400);
    }, 350);
  };

  const handleClose = () => {
    play("click");
    clearAllTimeouts();
    setOpen(false);
    setSnakeMode(false);
    addTimeout(() => {
      setBooted(false);
      setBootLines([]);
      setLines([]);
      setInput("");
    }, 400);
  };

  const run = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: Line[] = [...lines, { type: "input", text: `$ ${cmd}` }];

      if (trimmed === "snake") {
        play("xp");
        setLines([...newLines, { type: "output", text: "Launching SNAKE... use arrow keys or WASD. ESC to quit." }]);
        setTimeout(() => setSnakeMode(true), 400);
      } else if (trimmed === "ai --info") {
        play("xp");
        setLines([...newLines, { type: "output", text: "Opening AI Workflow panel..." }]);
        onAIInfo();
      } else if (trimmed === "download_cv") {
        play("xp");
        setLines([
          ...newLines,
          { type: "output", text: "Initiating CV download... transferring Chester_Descallar_CV.pdf" },
        ]);
        const a = document.createElement("a");
        a.href = "/cv.pdf";
        a.download = "Chester_Descallar_CV.pdf";
        a.click();
      } else if (COMMANDS[trimmed]) {
        play("click");
        const result = COMMANDS[trimmed]();
        if (result === "__CLEAR__") {
          setLines([]);
        } else {
          setLines([...newLines, { type: "output", text: result }]);
        }
      } else if (trimmed === "") {
        setLines(newLines);
      } else {
        play("error");
        setLines([
          ...newLines,
          { type: "error", text: `bash: ${cmd}: command not found — try "help"` },
        ]);
      }

      setHistory((h) => [cmd, ...h]);
      setHistoryIdx(-1);
      setInput("");
    },
    [lines, onAIInfo, play]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
  };

  return (
    <>
      {/* ── TRIGGER ───────────────────────────────────────────────────────────── */}
      {mobileOnly ? (
        /* Mobile pill button */
        <button
          onClick={handleBoot}
          aria-label="Open terminal"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs font-semibold shadow-lg transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 100%)",
            border: "1px solid rgba(0,255,80,0.25)",
            color: "rgba(0,255,80,0.9)",
            boxShadow: "0 0 16px rgba(0,255,80,0.15)",
          }}
        >
          <Terminal className="size-3.5" aria-hidden="true" />
          Terminal
        </button>
      ) : (
      /* ── RETRO MONITOR ──────────────────────────────────────────────────── */
      <div className="flex flex-col items-center group cursor-pointer" onClick={handleBoot}>
        {/* Chassis */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-52 h-44 rounded-lg flex items-center justify-center p-3"
          style={{
            background: "linear-gradient(135deg, #d9cfc0 0%, #c4b99f 60%, #b0a58c 100%)",
            boxShadow:
              "4px 4px 0 #8c8070, 8px 8px 0 #6b6055, inset 1px 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          {/* Bezel inner shadow */}
          <div
            className="relative w-full h-full rounded flex items-center justify-center overflow-hidden"
            style={{
              background: "#2a2a2a",
              border: "3px solid #1a1a1a",
              boxShadow: "inset 0 0 12px 4px rgba(0,0,0,0.7)",
            }}
          >
            {/* CRT screen */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                background: "radial-gradient(ellipse at 50% 40%, #0a1a0a 0%, #030803 100%)",
                borderRadius: "2px",
              }}
            >
              <Scanlines />
              <PhosphorGlow />

              {/* Idle screen content */}
              <div className="absolute inset-0 flex flex-col justify-between p-2 z-20">
                <div>
                  <p className="font-mono text-[9px] text-green-500/70 leading-tight">
                    DEV_OS V4.0
                  </p>
                  <p className="font-mono text-[8px] text-green-700/60 mt-0.5">
                    /dev/chester
                  </p>
                </div>
                <div>
                  <p
                    className="font-mono text-[9px] text-green-400/80 animate-pulse"
                    style={{ textShadow: "0 0 6px rgba(0,255,80,0.6)" }}
                  >
                    &gt; STANDBY_
                  </p>
                </div>
              </div>

              {/* Curved glass glare */}
              <div
                className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none z-30"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                  borderRadius: "2px 2px 50% 50% / 8px 8px 0 0",
                }}
              />
            </div>
          </div>

          {/* Front panel controls */}
          <div className="absolute bottom-1.5 right-2.5 flex items-center gap-1.5">
            {/* Power LED */}
            <div
              className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
              style={{ boxShadow: "0 0 6px 2px rgba(255,0,0,0.7)" }}
            />
            {/* Fake buttons */}
            <div className="w-4 h-1.5 rounded-sm bg-[#a09080]" />
            <div className="w-2 h-1.5 rounded-sm bg-[#a09080]" />
          </div>

          {/* Brand label */}
          <div className="absolute top-1.5 left-3">
            <span
              className="font-mono text-[7px] tracking-widest uppercase"
              style={{ color: "#8c8070" }}
            >
              DevBox™
            </span>
          </div>
        </motion.div>

        {/* Monitor neck */}
        <div
          className="w-20 h-3"
          style={{ background: "linear-gradient(180deg, #b0a58c, #9a9080)" }}
        />
        {/* Monitor base */}
        <div
          className="w-36 h-2 rounded-full"
          style={{
            background: "linear-gradient(180deg, #9a9080, #7a7068)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
          }}
        />

        <p className="mt-3 font-mono text-xs text-slate-500 uppercase tracking-widest group-hover:text-green-500 transition-colors duration-300">
          Click to Boot Terminal
        </p>
      </div>
      )}

      {/* ── FULLSCREEN TERMINAL — rendered via portal to escape transform context ── */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998] bg-black/85 backdrop-blur-sm"
                onClick={handleClose}
              />

              {/* Terminal window — expands from bottom-right corner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.15 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="fixed z-[9999] inset-4 md:inset-16 rounded-xl overflow-hidden flex flex-col"
                style={{
                  transformOrigin: "bottom right",
                  background: "radial-gradient(ellipse at 50% 30%, #0d1f0d 0%, #050d05 100%)",
                  border: "2px solid #1a3a1a",
                  boxShadow:
                    "0 0 60px 10px rgba(0,255,80,0.12), 0 0 120px 20px rgba(0,200,60,0.06), inset 0 0 80px rgba(0,255,80,0.04)",
                }}
              >
              <Scanlines />
              <PhosphorGlow />

              {/* Curved glass glare */}
              <div
                className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-20"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
                }}
              />

              {/* Title bar */}
              <div
                className="relative z-20 flex items-center justify-between px-4 py-2.5 border-b"
                style={{ borderColor: "rgba(0,255,80,0.12)", background: "rgba(0,20,0,0.6)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span
                    className="font-mono text-xs tracking-widest uppercase"
                    style={{ color: "rgba(0,255,80,0.6)" }}
                  >
                    /dev/chester — DEV_OS V4.0
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close terminal"
                  className="text-green-700 hover:text-green-400 transition-colors z-20"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              {/* Screen flicker on boot */}
              {flickering && (
                <motion.div
                  className="absolute inset-0 z-30 bg-green-500/20"
                  animate={{ opacity: [0, 0.3, 0, 0.5, 0, 0.2, 0] }}
                  transition={{ duration: 0.4, times: [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1] }}
                />
              )}

              {/* Terminal body */}
              {snakeMode ? (
                <SnakeGame play={play} onQuit={() => {
                  setSnakeMode(false);
                  play("click");
                  setLines((prev) => [...prev, { type: "output", text: "Snake session ended. Type 'help' for commands." }]);
                }} />
              ) : (
              <div className="relative z-20 flex-1 overflow-y-auto p-4 font-mono text-sm space-y-0.5 scroll-smooth">
                {/* Boot sequence */}
                {bootLines.map((line, i) => (
                  <motion.p
                    key={`boot-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className="whitespace-pre leading-5"
                    style={{
                      color: (line ?? "").startsWith("DEV_OS") ? "rgba(0,255,80,0.9)" : "rgba(0,200,60,0.6)",
                      textShadow: "0 0 8px rgba(0,255,80,0.4)",
                    }}
                  >
                    {line}
                  </motion.p>
                ))}

                {/* Command output */}
                {booted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-0.5 mt-1"
                  >
                    {lines.map((l, i) => (
                      <p
                        key={i}
                        className="whitespace-pre leading-5"
                        style={{
                          color:
                            l.type === "input"
                              ? "rgba(180,255,180,0.9)"
                              : l.type === "error"
                              ? "rgba(255,100,100,0.9)"
                              : "rgba(0,220,80,0.85)",
                          textShadow:
                            l.type === "error"
                              ? "0 0 8px rgba(255,80,80,0.4)"
                              : "0 0 8px rgba(0,255,80,0.3)",
                        }}
                      >
                        {l.text}
                      </p>
                    ))}
                    <div ref={bottomRef} />
                  </motion.div>
                )}
              </div>
              )}

              {/* Input row */}
              {booted && !snakeMode && (
                <div
                  className="relative z-20 flex items-center gap-2 px-4 py-3 border-t"
                  style={{ borderColor: "rgba(0,255,80,0.12)", background: "rgba(0,10,0,0.5)" }}
                >
                  <span style={{ color: "rgba(0,255,80,0.8)", textShadow: "0 0 6px rgba(0,255,80,0.5)" }}>
                    $
                  </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    className="flex-1 bg-transparent outline-none font-mono text-sm placeholder:opacity-30"
                    placeholder="type a command..."
                    autoComplete="off"
                    spellCheck={false}
                    style={{
                      color: "rgba(180,255,180,0.9)",
                      caretColor: "rgba(0,255,80,0.9)",
                      textShadow: "0 0 6px rgba(0,255,80,0.3)",
                    }}
                  />
                  <span
                    className="font-mono text-xs animate-pulse"
                    style={{ color: "rgba(0,255,80,0.4)" }}
                  >
                    ▋
                  </span>
                </div>
              )}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
