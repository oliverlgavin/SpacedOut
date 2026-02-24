"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { FadeIn } from "@/components/motion/fade-in";
import { ISSLivePosition } from "./iss-live-position";
import { MarsRoverPanel } from "./mars-rover-panel";
import type { ISSPosition, PeopleInSpaceResponse, NasaImage } from "@/types/api";

interface LiveStatsPanelProps {
  iss: ISSPosition;
  crew: PeopleInSpaceResponse;
  marsImage: NasaImage | null;
}

export function LiveStatsPanel({
  iss,
  crew,
  marsImage,
}: LiveStatsPanelProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-2">Live Intelligence</h2>
          <p className="text-sm text-foreground-muted mb-8">
            Real-time data from active missions and stations
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ISS Position — live updates every second */}
          <FadeIn delay={0.1}>
            <ISSLivePosition initial={iss} />
          </FadeIn>

          {/* Crew */}
          <FadeIn delay={0.2}>
            <GlassPanel>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-electric animate-pulse-glow" />
                <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider">
                  Crew in Space
                </h3>
              </div>
              <div className="space-y-2">
                {crew.people.slice(0, 6).map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-foreground truncate">
                      {person.name}
                    </span>
                    <span className="text-[10px] text-foreground-muted font-mono shrink-0 ml-2">
                      {person.craft}
                    </span>
                  </div>
                ))}
                {crew.people.length > 6 && (
                  <p className="text-xs text-foreground-muted text-center pt-1">
                    +{crew.people.length - 6} more
                  </p>
                )}
              </div>
            </GlassPanel>
          </FadeIn>

          {/* Mars Rover Latest */}
          <FadeIn delay={0.3}>
            <MarsRoverPanel image={marsImage} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
