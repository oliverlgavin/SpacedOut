"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { FadeIn } from "@/components/motion/fade-in";
import { staggerContainer, slideUp, smooth } from "@/lib/constants/animation-presets";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import type { Launch } from "@/types/api";

interface FeaturedMissionsProps {
  launches: Launch[];
}

export function FeaturedMissions({ launches }: FeaturedMissionsProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ once: true });

  if (launches.length === 0) return null;

  const displayed = launches.slice(0, 3);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-2">Upcoming Launches</h2>
          <p className="text-sm text-foreground-muted mb-8">
            Next scheduled launches from around the world
          </p>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {displayed.map((launch) => (
            <motion.div
              key={launch.id}
              variants={slideUp}
              transition={smooth}
            >
              <GlassPanel hover className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {launch.name}
                    </h3>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      {launch.launch_service_provider.name}
                    </p>
                  </div>
                  <StatusIndicator
                    status={
                      launch.status.abbrev === "Go"
                        ? "go"
                        : launch.status.abbrev === "Success"
                        ? "success"
                        : "tbd"
                    }
                  />
                </div>

                {launch.mission && (
                  <p className="text-xs text-foreground-muted mb-3 line-clamp-2">
                    {launch.mission.description}
                  </p>
                )}

                <div className="mt-auto pt-3 border-t border-glass-border">
                  <CountdownTimer targetDate={launch.net} compact />
                  <p className="text-[10px] text-foreground-muted mt-1 font-mono">
                    {launch.pad.location.name}
                  </p>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn>
          <div className="flex justify-center mt-8">
            <Link
              href="/launches"
              className="text-sm font-mono text-blue-electric hover:text-blue-electric/80 transition-colors tracking-wider uppercase"
            >
              Click here to view more
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
