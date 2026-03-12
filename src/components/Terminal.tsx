"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ChevronDown, ChevronUp, X } from "lucide-react";

interface TerminalProps {
  isOptimized: boolean;
  onAIInfo: () => void;
}

interface Line {
  type: "input" | "output" | "error";
  text: string;
}

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
    `drwxr-xr-x  Veson Nautical          Software Engineer       2022 – Present
drwxr-xr-x  VesselsValue            Junior Developer        2021 – 2022
drwxr-xr-x  Swansea University      BSc Soft. Engineering   2018 – 2021`,
  "cat contact.txt": () =>
    `Phone:  07588220203
Email:  chester_descallar@yahoo.com
GitHub: github.com/chesterdescallar`,
  clear: () => "__CLEAR__",
};

export default function Terminal({ isOptimized, onAIInfo }: TerminalProps) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Welcome to /dev/chester — type "help" to begin.' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [...lines, { type: "input", text: `$ ${cmd}` }];

    if (trimmed === "ai --info") {
      setLines([...newLines, { type: "output", text: "Opening AI Workflow panel..." }]);
      onAIInfo();
    } else if (trimmed === "download_cv") {
      setLines([...newLines, { type: "output", text: "Initiating CV download... (attach your PDF to /public/cv.pdf)" }]);
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
  };

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

  const base = isOptimized
    ? "bg-slate-950/90 border-white/10 text-emerald-400"
    : "bg-gray-900 border-gray-700 text-green-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Header bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 cursor-pointer border-t ${
          isOptimized
            ? "bg-slate-900 border-white/10 hover:bg-slate-800"
            : "bg-gray-800 border-gray-700 hover:bg-gray-700"
        } transition-colors`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <TerminalIcon className="size-4 text-emerald-400" />
          <span className={`text-sm font-mono ${isOptimized ? "text-slate-300" : "text-gray-300"}`}>
            /dev/chester
          </span>
        </div>
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown className="size-4 text-slate-400" />
          ) : (
            <ChevronUp className="size-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Terminal body */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ height: 0 }}
            animate={{ height: 240 }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`overflow-hidden border-t font-mono text-sm ${base} border-white/10`}
          >
            <div className="h-full flex flex-col p-3 overflow-y-auto">
              <div className="flex-1 space-y-1 overflow-y-auto">
                {lines.map((l, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      l.type === "input"
                        ? "text-slate-300"
                        : l.type === "error"
                        ? "text-red-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {l.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="flex items-center gap-2 mt-2 border-t border-white/5 pt-2">
                <span className="text-emerald-500">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 bg-transparent outline-none text-emerald-300 placeholder:text-emerald-800 caret-emerald-400"
                  placeholder="type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
