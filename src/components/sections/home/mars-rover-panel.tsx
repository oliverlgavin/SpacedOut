"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import type { NasaImage } from "@/types/api";

export function MarsRoverPanel({ image }: { image: NasaImage | null }) {
  return (
    <GlassPanel className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-[#d45a43] animate-pulse-glow" />
        <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider">
          Mars Rover Latest
        </h3>
      </div>

      {image ? (
        <>
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-medium text-foreground mb-1 line-clamp-2">
            {image.title}
          </p>
          <p className="text-[10px] font-mono text-foreground-muted mt-auto">
            {new Date(image.date_created).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-foreground-muted text-center">
            No recent photos available.<br />
            Check back soon.
          </p>
        </div>
      )}
    </GlassPanel>
  );
}
