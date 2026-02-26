"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { LaunchGrid } from "./launch-grid";
import type { Launch } from "@/types/api";

const FILTER_AGENCIES = [
  { label: "All", value: "" },
  { label: "NASA", value: "44" },
  { label: "SpaceX", value: "121" },
  { label: "ESA", value: "27" },
  { label: "ISRO", value: "31" },
  { label: "JAXA", value: "37" },
  { label: "Roscosmos", value: "63" },
  { label: "CASC", value: "88" },
  { label: "Rocket Lab", value: "147" },
  { label: "ULA", value: "124" },
];

type View = "upcoming" | "launched";

interface LaunchesContentProps {
  upcoming: Launch[];
  recent: Launch[];
}

export function LaunchesContent({ upcoming, recent }: LaunchesContentProps) {
  const [view, setView] = useState<View>("upcoming");
  const [agency, setAgency] = useState("");

  const launches = view === "upcoming" ? upcoming : recent;
  const filtered = agency
    ? launches.filter((l) => String(l.launch_service_provider.id) === agency)
    : launches;

  return (
    <>
      {/* View toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView("upcoming")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
            view === "upcoming"
              ? "bg-blue-electric/15 text-blue-electric border border-blue-electric/30"
              : "glass text-foreground-muted hover:text-foreground hover:bg-white/5"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-blue-electric animate-pulse-glow" />
          Upcoming
        </button>
        <button
          onClick={() => setView("launched")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
            view === "launched"
              ? "bg-success/15 text-success border border-success/30"
              : "glass text-foreground-muted hover:text-foreground hover:bg-white/5"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-success" />
          Launched
        </button>
      </div>

      {/* Agency filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_AGENCIES.map((a) => (
          <button
            key={a.value}
            onClick={() => setAgency(a.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              agency === a.value
                ? "bg-blue-electric/15 text-blue-electric border border-blue-electric/30"
                : "glass text-foreground-muted hover:text-foreground hover:bg-white/5"
            )}
          >
            {a.label}
          </button>
        ))}
      </div>

      <LaunchGrid key={`${view}-${agency}`} launches={filtered} />
    </>
  );
}
