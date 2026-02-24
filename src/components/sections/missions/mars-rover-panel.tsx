"use client";

import Image from "next/image";
import { GlassPanel } from "@/components/ui/glass-panel";
import { StatusIndicator } from "@/components/ui/status-indicator";
import type { MarsRoverPhoto } from "@/types/api";

const ROVER_INFO = [
  {
    name: "Perseverance",
    launchDate: "Jul 30, 2020",
    landingDate: "Feb 18, 2021",
    location: "Jezero Crater",
    status: "active" as const,
    mission: "Search for signs of ancient microbial life, collect rock samples for future Earth return.",
  },
  {
    name: "Curiosity",
    launchDate: "Nov 26, 2011",
    landingDate: "Aug 6, 2012",
    location: "Gale Crater",
    status: "active" as const,
    mission: "Investigate Mars climate and geology, assess habitability for microbial life.",
  },
];

export function MarsRoverPanel({ photos }: { photos: MarsRoverPhoto[] }) {
  return (
    <GlassPanel>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-danger animate-pulse-glow" />
        <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider">
          Mars Surface Operations
        </h3>
      </div>

      <div className="space-y-6">
        {ROVER_INFO.map((rover) => (
          <div key={rover.name} className="border-b border-glass-border pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">{rover.name}</h4>
              <StatusIndicator
                status={rover.status === "active" ? "go" : "tbd"}
                label={rover.status.toUpperCase()}
              />
            </div>
            <p className="text-xs text-foreground-muted mb-2">{rover.mission}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-foreground-muted">Location: </span>
                <span className="text-foreground">{rover.location}</span>
              </div>
              <div>
                <span className="text-foreground-muted">Landing: </span>
                <span className="text-foreground">{rover.landingDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest photos */}
      {photos.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-mono text-foreground-muted mb-3 uppercase tracking-wider">
            Latest Surface Photos
          </p>
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(0, 3).map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={photo.img_src}
                  alt={`Mars ${photo.camera.full_name}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassPanel>
  );
}
