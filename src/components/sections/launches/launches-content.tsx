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

interface LaunchesContentProps {
  upcoming: Launch[];
  recent: Launch[];
}

export function LaunchesContent({ upcoming, recent }: LaunchesContentProps) {
  const [agency, setAgency] = useState("");

  const filteredUpcoming = agency
    ? upcoming.filter((l) => String(l.launch_service_provider.id) === agency)
    : upcoming;

  const filteredRecent = agency
    ? recent.filter((l) => String(l.launch_service_provider.id) === agency)
    : recent;

  return (
    <>
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

      {/* Upcoming */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-electric animate-pulse-glow" />
          Upcoming Launches
        </h2>
        <LaunchGrid key={`upcoming-${agency}`} launches={filteredUpcoming} />
      </section>

      {/* Recent */}
      {filteredRecent.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            Recent Launches
          </h2>
          <LaunchGrid key={`recent-${agency}`} launches={filteredRecent} />
        </section>
      )}
    </>
  );
}
