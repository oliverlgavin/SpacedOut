"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import type { PeopleInSpaceResponse } from "@/types/api";

export function ISSCrewPanel({ crew }: { crew: PeopleInSpaceResponse }) {
  // Group by craft
  const byCraft = crew.people.reduce<Record<string, string[]>>((acc, p) => {
    if (!acc[p.craft]) acc[p.craft] = [];
    acc[p.craft].push(p.name);
    return acc;
  }, {});

  return (
    <GlassPanel>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
        <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider">
          Humans in Space
        </h3>
      </div>

      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-blue-electric text-glow font-mono">
          {crew.number}
        </span>
        <p className="text-xs text-foreground-muted mt-1">
          people currently in orbit
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(byCraft).map(([craft, names]) => (
          <div key={craft}>
            <p className="text-xs font-mono text-foreground-muted mb-2 uppercase tracking-wider">
              {craft}
            </p>
            <div className="space-y-1">
              {names.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 text-sm text-foreground py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-electric/50" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
