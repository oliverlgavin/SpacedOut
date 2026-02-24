"use client";

import { useState, useEffect } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { ISSPosition } from "@/types/api";

export function ISSLivePosition({ initial }: { initial: ISSPosition }) {
  const [iss, setIss] = useState(initial);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/iss");
        if (res.ok) {
          const data = await res.json();
          if (data.latitude !== undefined) {
            setIss(data);
          }
        }
      } catch {
        // Keep showing last known position
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlassPanel glow>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
        <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider">
          ISS Position
        </h3>
        <span className="ml-auto text-[9px] font-mono text-foreground-muted">
          LIVE
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-xs text-foreground-muted">Latitude</span>
          <span className="text-sm font-mono text-foreground tabular-nums">
            {iss.latitude.toFixed(4)}°
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-foreground-muted">Longitude</span>
          <span className="text-sm font-mono text-foreground tabular-nums">
            {iss.longitude.toFixed(4)}°
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-foreground-muted">Altitude</span>
          <span className="text-sm font-mono text-foreground tabular-nums">
            ~{iss.altitude} km
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-foreground-muted">Velocity</span>
          <span className="text-sm font-mono text-foreground tabular-nums">
            ~{iss.velocity.toFixed(0)} km/h
          </span>
        </div>
      </div>
    </GlassPanel>
  );
}
