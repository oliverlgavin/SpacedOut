"use client";

import Image from "next/image";
import { GlassPanel } from "@/components/ui/glass-panel";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import type { Launch } from "@/types/api";

interface LaunchCardProps {
  launch: Launch;
}

function getStatus(abbrev: string): "go" | "tbd" | "success" | "failure" | "hold" {
  switch (abbrev) {
    case "Go":
      return "go";
    case "Success":
      return "success";
    case "Failure":
      return "failure";
    case "Hold":
      return "hold";
    default:
      return "tbd";
  }
}

export function LaunchCard({ launch }: LaunchCardProps) {
  return (
    <GlassPanel hover className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-blue-electric tracking-wider mb-1">
            {launch.launch_service_provider.abbrev}
          </p>
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {launch.name}
          </h3>
        </div>
        <StatusIndicator status={getStatus(launch.status.abbrev)} />
      </div>

      {/* Rocket info */}
      <div className="flex items-center gap-3 mb-3">
        {/* Rocket silhouette SVG */}
        <div className="w-8 h-16 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 64"
            width="20"
            height="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-electric/40"
          >
            <path d="M12 2 L8 20 L8 50 L5 60 L12 56 L19 60 L16 50 L16 20 Z" />
            <line x1="8" y1="35" x2="16" y2="35" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-foreground-muted">
            {launch.rocket.configuration.full_name}
          </p>
          {launch.mission && (
            <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
              {launch.mission.description}
            </p>
          )}
        </div>
      </div>

      {/* Image */}
      {launch.image && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
          <Image
            src={launch.image}
            alt={launch.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-glass-border space-y-2">
        <CountdownTimer targetDate={launch.net} compact />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-foreground-muted font-mono">
            {launch.pad.name}
          </span>
          <span className="text-[10px] text-foreground-muted">
            {launch.pad.location.country_code}
          </span>
        </div>
        {launch.mission?.orbit && (
          <span className="inline-block text-[10px] text-blue-electric/70 font-mono bg-blue-electric/5 px-2 py-0.5 rounded">
            {launch.mission.orbit.abbrev}
          </span>
        )}
      </div>
    </GlassPanel>
  );
}
