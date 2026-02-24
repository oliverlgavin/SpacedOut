"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { TimelineChart } from "@/components/charts/timeline-chart";

const ARTEMIS_TIMELINE = [
  {
    date: "Nov 2022",
    title: "Artemis I",
    description: "Uncrewed test flight around the Moon. Orion capsule successfully returned after 25-day mission.",
    status: "completed" as const,
  },
  {
    date: "Sep 2025",
    title: "Artemis II",
    description: "First crewed flight around the Moon. Four astronauts on a 10-day mission.",
    status: "active" as const,
  },
  {
    date: "2026",
    title: "Artemis III",
    description: "First crewed lunar landing since Apollo 17. Will use SpaceX Starship as lunar lander.",
    status: "upcoming" as const,
  },
  {
    date: "2028",
    title: "Artemis IV",
    description: "First mission to dock with the Lunar Gateway space station.",
    status: "upcoming" as const,
  },
  {
    date: "2030+",
    title: "Artemis V+",
    description: "Sustained lunar presence and preparation for Mars missions.",
    status: "upcoming" as const,
  },
];

export function ArtemisPanel() {
  return (
    <GlassPanel>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-blue-electric animate-pulse-glow" />
        <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider">
          Artemis Program
        </h3>
      </div>
      <TimelineChart events={ARTEMIS_TIMELINE} />
    </GlassPanel>
  );
}
