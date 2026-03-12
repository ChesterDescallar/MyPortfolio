"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface RetroCRTProps {
  onAIInfo: () => void;
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

export default function RetroCRT({ onAIInfo }: RetroCRTProps) {
  const [booted, setBooted] = useState(false);
  const [open, setOpen] = useState(false);
  const [flickering, setFlickering] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const handleBoot = () => {
    if (open) return;
    setOpen(true);
    setBooted(false);
    setBootLines([]);
    setLines([]);

    // Wait for expand animation (300ms) then flicker for 400ms then boot
    setTimeout(() => {
      setFlickering(true);
      setTimeout(() => {
        setFlickering(false);
        let i = 0;
        const tick = () => {
          if (i < BOOT_LINES.length) {
            setBootLines((prev) => [...prev, BOOT_LINES[i]]);
            i++;
            setTimeout(tick, 80);
          } else {
            setTimeout(() => setBooted(true), 300);
          }
        };
        tick();
      }, 400);
    }, 350);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
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

      if (trimmed === "ai --info") {
        setLines([...newLines, { type: "output", text: "Opening AI Workflow panel..." }]);
        onAIInfo();
      } else if (trimmed === "download_cv") {
        setLines([
          ...newLines,
          { type: "output", text: "Initiating CV download... transferring Chester_Descallar_CV.pdf" },
        ]);
        const a = document.createElement("a");
        a.href = "/cv.pdf";
        a.download = "Chester_Descallar_CV.pdf";
        a.click();
      } else if (COMMANDS[trimmed]) {
        const result = COMMANDS[trimmed]();
        if (result === "__CLEAR__") {
          setLines([]);
        } else {
          setLines([...newLines, { type: "output", text: result }]);
        }
      } else if (trimmed === "") {
        setLines(newLines);
      } else {
        setLines([
          ...newLines,
          { type: "error", text: `bash: ${cmd}: command not found — try "help"` },
        ]);
      }

      setHistory((h) => [cmd, ...h]);
      setHistoryIdx(-1);
      setInput("");
    },
    [lines, onAIInfo]
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
      {/* ── RETRO MONITOR ─────────────────────────────────────────────────────── */}
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
                  className="text-green-700 hover:text-green-400 transition-colors z-20"
                >
                  <X className="size-4" />
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

              {/* Input row */}
              {booted && (
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
