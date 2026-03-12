"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, Zap, Code2, GitBranch } from "lucide-react";

interface AIModalProps {
  open: boolean;
  onClose: () => void;
  isOptimized: boolean;
}

const tools = [
  { icon: Bot, name: "Claude / ChatGPT", desc: "Architecture design, code review, PR summarisation" },
  { icon: Zap, name: "GitHub Copilot", desc: "Real-time inline completions, test scaffolding" },
  { icon: Code2, name: "Cursor IDE", desc: "Multi-file context editing, refactoring sweeps" },
  { icon: GitBranch, name: "AI-assisted CI/CD", desc: "Automated changelog generation, smart diff reviews" },
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
            Integrated AI tooling accelerates velocity without sacrificing code quality or ownership.
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
                <t.icon className="size-5 shrink-0 text-sky-400 mt-0.5" />
                <div>
                  <p className={`text-sm font-medium ${isOptimized ? "text-white" : "text-gray-900"}`}>{t.name}</p>
                  <p className={`text-xs mt-0.5 ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Cursor", "Claude", "Copilot", "GPT-4o", "Codeium"].map((tag) => (
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
