"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { PlanetData } from "@/lib/constants/planets";

const BounceCards = dynamic(() => import("@/components/ui/bounce-cards"), {
  ssr: false,
  loading: () => (
    <div className="w-[400px] h-[300px] flex items-center justify-center">
      <div className="w-32 h-32 rounded-2xl bg-white/5 animate-pulse" />
    </div>
  ),
});

interface PlanetDetailProps {
  planet: PlanetData;
  onClose: () => void;
}

const STATS_KEYS = [
  { key: "distanceAU", label: "Distance from Sun", suffix: " AU" },
  { key: "diameterKm", label: "Diameter", format: true, suffix: " km" },
  { key: "moons", label: "Known Moons" },
  { key: "dayLength", label: "Day Length" },
  { key: "yearLength", label: "Year Length" },
  { key: "avgTemp", label: "Avg Temperature" },
] as const;

export function PlanetDetail({ planet, onClose }: PlanetDetailProps) {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassPanel>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full overflow-hidden shrink-0"
              style={{
                boxShadow: `0 0 20px ${planet.color}50`,
              }}
            >
              <img
                src={planet.image}
                alt={planet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{planet.name}</h2>
              <p className="text-xs font-mono text-foreground-muted">
                {planet.distanceAU} AU from the Sun
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground transition-colors p-2 rounded-lg hover:bg-white/5"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: BounceCards gallery */}
          <div className="flex items-center justify-center min-h-[320px]">
            <BounceCards
              images={[...new Set(planet.gallery)].slice(0, 3)}
              containerWidth={420}
              containerHeight={320}
              animationDelay={0.2}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.8)"
              transformStyles={[
                "rotate(6deg) translate(-120px)",
                "rotate(-2deg)",
                "rotate(-6deg) translate(120px)",
              ]}
              enableHover
            />
          </div>

          {/* Right: Info */}
          <div>
            <p className="text-sm text-foreground-muted leading-relaxed mb-8">
              {planet.description}
            </p>

            <div className="space-y-0">
              {STATS_KEYS.map((stat) => {
                const raw = planet[stat.key as keyof PlanetData];
                let value: string;
                if (stat.key === "diameterKm") {
                  value = (raw as number).toLocaleString() + ("suffix" in stat ? stat.suffix : "");
                } else if ("suffix" in stat) {
                  value = String(raw) + stat.suffix;
                } else {
                  value = String(raw);
                }

                return (
                  <div
                    key={stat.label}
                    className="flex justify-between items-center py-3 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-xs text-foreground-muted">
                      {stat.label}
                    </span>
                    <span className="text-sm font-mono text-foreground">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
