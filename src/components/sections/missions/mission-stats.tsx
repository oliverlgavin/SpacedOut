"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RadialProgress } from "@/components/charts/radial-progress";
import { FadeIn } from "@/components/motion/fade-in";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { AGENCIES } from "@/lib/constants/agencies";
import type { Launch } from "@/types/api";

const AGENCY_DISPLAY_NAMES = new Map(
  AGENCIES.map((a) => [a.id, a.abbrev])
);

function getAgencyDisplayName(provider: Launch["launch_service_provider"]) {
  return AGENCY_DISPLAY_NAMES.get(provider.id) ?? provider.name;
}

interface MissionStatsProps {
  launches: Launch[];
}

export function MissionStats({ launches }: MissionStatsProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ once: true });

  // Calculate launches by agency
  const agencyCounts = launches.reduce<Record<string, number>>((acc, l) => {
    const label = getAgencyDisplayName(l.launch_service_provider);
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(agencyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, value]) => ({ label, value }));

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  const totalMissions = launches.length;
  const withMission = launches.filter((l) => l.mission).length;
  const missionRate =
    totalMissions > 0 ? Math.round((withMission / totalMissions) * 100) : 0;

  const goCount = launches.filter(
    (l) => l.status.abbrev === "Go"
  ).length;
  const goRate =
    totalMissions > 0 ? Math.round((goCount / totalMissions) * 100) : 0;

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Launches by Agency — horizontal bars */}
      <FadeIn className="lg:col-span-2">
        <GlassPanel className="h-full">
          <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider mb-6">
            Launches by Agency
          </h3>
          <div className="space-y-3">
            {chartData.map((point, i) => (
              <div key={point.label} className="flex items-center gap-3">
                <span className="text-xs text-foreground-muted font-mono w-36 text-right shrink-0 truncate">
                  {point.label}
                </span>
                <div className="flex-1 h-7 bg-white/5 rounded-md overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-md"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,212,255,0.6), rgba(0,136,255,0.3))",
                    }}
                    initial={{ width: 0 }}
                    animate={
                      isIntersecting
                        ? { width: `${(point.value / maxValue) * 100}%` }
                        : { width: 0 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: i * 0.08,
                      ease: "easeOut",
                    }}
                  />
                  <motion.span
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-blue-electric"
                    initial={{ opacity: 0 }}
                    animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                  >
                    {point.value}
                  </motion.span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-glass-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-electric" />
              <span className="text-xs text-foreground-muted">
                {totalMissions} total upcoming
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-foreground-muted">
                {chartData.length} agencies
              </span>
            </div>
          </div>
        </GlassPanel>
      </FadeIn>

      {/* Readiness radials */}
      <FadeIn delay={0.1}>
        <GlassPanel className="h-full">
          <h3 className="text-sm font-mono text-blue-electric uppercase tracking-wider mb-6">
            Mission Readiness
          </h3>
          <div className="flex flex-col items-center gap-6">
            <RadialProgress
              value={missionRate}
              label="Mission Defined"
              size={100}
            />
            <RadialProgress
              value={goRate}
              label="Go for Launch"
              size={100}
            />
            <RadialProgress
              value={85}
              label="System Status"
              size={100}
            />
          </div>
        </GlassPanel>
      </FadeIn>
    </div>
  );
}
