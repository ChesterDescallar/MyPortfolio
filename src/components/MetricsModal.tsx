"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TrendingUp, TestTube, Layers } from "lucide-react";

interface MetricsModalProps {
  open: boolean;
  onClose: () => void;
  isOptimized: boolean;
}

const metrics = [
  {
    icon: TrendingUp,
    label: "Lighthouse Score",
    before: "33%",
    after: "85%",
    delta: "+52pts",
    color: "text-emerald-400",
  },
  {
    icon: TestTube,
    label: "Test Coverage",
    before: "~20%",
    after: "80%+",
    delta: "+60%",
    color: "text-sky-400",
  },
  {
    icon: Layers,
    label: "Vue Migration",
    before: "Vue 2",
    after: "Vue 3",
    delta: "Modern",
    color: "text-violet-400",
  },
];

export default function MetricsModal({ open, onClose, isOptimized }: MetricsModalProps) {
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
          <DialogTitle className={isOptimized ? "text-white font-mono" : "font-bold"}>
            Veson Nautical — Performance KPIs
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <p className={`text-sm ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>
            40% performance improvement via systematic refactoring, test coverage uplift, and Vue 2→3 migration.
          </p>
          <div className="grid gap-3">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  isOptimized ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"
                }`}
              >
                <m.icon className={`size-5 shrink-0 ${m.color}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium ${isOptimized ? "text-slate-400" : "text-gray-500"}`}>
                    {m.label}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-sm line-through ${isOptimized ? "text-slate-500" : "text-gray-400"}`}>
                      {m.before}
                    </span>
                    <span className="text-sm">→</span>
                    <span className={`text-sm font-semibold ${isOptimized ? "text-white" : "text-gray-900"}`}>
                      {m.after}
                    </span>
                  </div>
                </div>
                <Badge
                  className={
                    isOptimized
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono"
                      : "bg-green-100 text-green-700 border-green-200"
                  }
                >
                  {m.delta}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className={`text-xs ${isOptimized ? "text-slate-500" : "text-gray-400"} border-t ${isOptimized ? "border-white/10" : "border-gray-200"} pt-3`}>
            Testing: Vitest / Jest &nbsp;·&nbsp; Backend: Laravel (modern) &nbsp;·&nbsp; AI tooling integration
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
