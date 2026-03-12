"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), { ssr: false });

interface TimelineProps {
  isOptimized: boolean;
}


let xrangeInitialised = false;

export default function Timeline({ isOptimized }: TimelineProps) {
  const [Highcharts, setHighcharts] = useState<typeof import("highcharts") | null>(null);

  useEffect(() => {
    import("highcharts").then(async (hc) => {
      const HC = hc.default;
      // On webpack (Vercel prod) xrange must be explicitly initialised.
      // On Turbopack (dev) the module resolves to the HC object itself — skip.
      if (!xrangeInitialised) {
        xrangeInitialised = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(HC as any).seriesTypes?.xrange) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mod: any = await import("highcharts/modules/xrange");
          const fn = typeof mod.default === "function" ? mod.default : typeof mod === "function" ? mod : null;
          if (fn) fn(HC);
        }
      }
      setHighcharts(HC);
    });
  }, []);

  if (!Highcharts) return null;

  const options: Highcharts.Options = {
    chart: {
      type: "xrange",
      backgroundColor: "transparent",
      style: { fontFamily: isOptimized ? "var(--font-geist-mono)" : "var(--font-playfair)" },
    },
    title: { text: undefined },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2018, 0, 1),
      max: Date.UTC(2026, 0, 1),
      labels: {
        style: { color: isOptimized ? "#94a3b8" : "#444" },
        format: "{value:%Y}",
      },
      lineColor: isOptimized ? "#334155" : "#ccc",
      tickColor: isOptimized ? "#334155" : "#ccc",
    },
    yAxis: {
      title: { text: undefined },
      labels: { enabled: false },
      gridLineColor: isOptimized ? "#1e293b" : "#e5e7eb",
    },
    tooltip: {
      backgroundColor: isOptimized ? "#0f172a" : "#fff",
      borderColor: isOptimized ? "#38bdf8" : "#3b82f6",
      style: { color: isOptimized ? "#e2e8f0" : "#111" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (this: any) {
        return `<b>${this.point.name}</b><br/>${(this.point as { custom?: { description: string } }).custom?.description ?? ""}`;
      },
    },
    series: [
      {
        type: "xrange",
        name: "Career",
        pointWidth: 24,
        borderRadius: isOptimized ? 6 : 0,
        data: [
          {
            x: Date.UTC(2018, 8, 1),
            x2: Date.UTC(2021, 6, 1),
            y: 0,
            name: "Swansea University",
            custom: { description: "BSc Software Engineering, 1st Class Honours" },
            color: isOptimized ? "#38bdf8" : "#3b82f6",
          },
          {
            x: Date.UTC(2021, 7, 1),
            x2: Date.UTC(2022, 7, 1),
            y: 0,
            name: "VesselsValue",
            custom: { description: "Junior Developer — Vue.js, PHP, GraphQL" },
            color: isOptimized ? "#818cf8" : "#6366f1",
          },
          {
            x: Date.UTC(2022, 8, 1),
            x2: Date.UTC(2026, 0, 1),
            y: 0,
            name: "Veson Nautical",
            custom: { description: "Software Engineer — Laravel, React, AI Tooling" },
            color: isOptimized ? "#34d399" : "#10b981",
          },
        ],
      },
    ],
    legend: { enabled: false },
    credits: { enabled: false },
    exporting: { enabled: false },
  };

  return (
    <div className={`rounded-lg overflow-hidden ${isOptimized ? "border border-white/10" : "border border-gray-300"}`}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
