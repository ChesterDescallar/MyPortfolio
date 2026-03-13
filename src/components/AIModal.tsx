"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, Zap, Layers, GitBranch } from "lucide-react";

interface AIModalProps {
  open: boolean;
  onClose: () => void;
  isOptimized: boolean;
}

const tools = [
  {
    icon: Bot,
    name: "Claude Code (Agentic Workflow)",
    desc: "Autonomous multi-step coding agent — runs tasks end-to-end using skills, reads context across files, and executes with minimal hand-holding. Used daily for migrations, refactors, and feature work.",
    color: "text-sky-400",
  },
  {
    icon: Zap,
    name: "Augment / Auggie",
    desc: "AI pair programmer with deep codebase awareness. Auggie understands the full repo context — used for inline completions, test scaffolding, and real-time code review inside the IDE.",
    color: "text-violet-400",
  },
  {
    icon: Layers,
    name: "Beads Methodology",
    desc: "Breaking complex tasks into discrete, composable 'beads' — small, well-scoped units that an AI agent can execute reliably in sequence. Keeps agentic sessions focused and auditable.",
    color: "text-emerald-400",
  },
  {
    icon: GitBranch,
    name: "Ralph Wiggum Principle",
    desc: "Writing prompts and tasks as if the AI has no prior context — explicit, literal, and self-contained. Eliminates ambiguity so agents produce predictable, production-ready output every time.",
    color: "text-amber-400",
  },
];

export default function AIModal({ open, onClose, isOptimized }: AIModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={
          isOptimized
            ? "bg-slate-900 border border-white/10 text-slate-100 max-w-lg"
            : "bg-white border border-gray-200 text-gray-900 max-w-lg"
        }
      >
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${isOptimized ? "text-white font-mono" : "font-bold"}`}>
            <Bot className="size-5 text-sky-400" />
            AI Workflow
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <p className={`text-sm ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>
            Day-to-day development powered by agentic AI — not just autocomplete, but autonomous agents that plan, execute, and iterate across the full codebase.
          </p>
          <div className="grid gap-3">
            {tools.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  isOptimized ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"
                }`}
              >
                <t.icon className={`size-5 shrink-0 mt-0.5 ${t.color}`} />
                <div>
                  <p className={`text-sm font-semibold ${isOptimized ? "text-white font-mono" : "text-gray-900"}`}>{t.name}</p>
                  <p className={`text-xs mt-0.5 leading-relaxed ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Claude Code", "Augment", "Beads", "Ralph Wiggum", "Agentic"].map((tag) => (
              <Badge
                key={tag}
                className={
                  isOptimized
                    ? "bg-sky-500/10 text-sky-400 border-sky-500/20 font-mono text-xs"
                    : "bg-blue-50 text-blue-600 border-blue-200 text-xs"
                }
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
