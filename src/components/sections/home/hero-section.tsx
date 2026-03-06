"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/ui/metric-card";
import { LazyGlobe } from "@/components/3d/lazy-globe";
import type { DashboardData } from "@/types/api";

interface HeroSectionProps {
  data: DashboardData;
}

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const ISS_POLL_INTERVAL = 5_000;

export function HeroSection({ data }: HeroSectionProps) {
  const [metrics, setMetrics] = useState({
    humansInSpace: data.crew.number,
    upcomingLaunches: data.launches.length,
    activeMissions: data.launches.filter((l) => l.mission).length,
  });

  const [issPosition, setIssPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: data.iss.latitude,
    longitude: data.iss.longitude,
  });

  useEffect(() => {
    async function refreshMetrics() {
      try {
        const res = await fetch("/api/metrics");
        if (res.ok) {
          const fresh = await res.json();
          setMetrics({
            humansInSpace: fresh.humansInSpace,
            upcomingLaunches: fresh.upcomingLaunches,
            activeMissions: fresh.activeMissions,
          });
        }
      } catch {
        // Keep current values
      }
    }

    const interval = setInterval(refreshMetrics, TWENTY_FOUR_HOURS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function refreshISS() {
      try {
        const res = await fetch("/api/iss");
        if (res.ok) {
          const pos = await res.json();
          if (pos.latitude !== undefined) {
            setIssPosition({
              latitude: pos.latitude,
              longitude: pos.longitude,
            });
          }
        }
      } catch {
        // Keep last known position
      }
    }

    const interval = setInterval(refreshISS, ISS_POLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden">
      {/* Title */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-mono text-blue-electric tracking-[0.3em] uppercase mb-3">
          Live Space Intelligence Interface
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
          <span className="text-blue-electric text-glow">Spaced</span>
          <span className="text-foreground">Out</span>
        </h1>
        <p className="text-foreground-muted text-sm mt-3 max-w-md mx-auto">
          Real-time data aggregated from NASA, ESA, SpaceX, ISRO, and JAXA
        </p>
      </motion.div>

      {/* 3D Earth Globe with live ISS tracking */}
      <motion.div
        className="relative my-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <LazyGlobe size={320} issPosition={issPosition} />
      </motion.div>

      {/* Live metrics */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <MetricCard
          label="Humans in Space"
          value={metrics.humansInSpace}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21c0-4.4 3-8 6.5-8s6.5 3.6 6.5 8" />
            </svg>
          }
        />
        <MetricCard
          label="Upcoming Launches"
          value={metrics.upcomingLaunches}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          }
        />
        <MetricCard
          label="Active Missions"
          value={metrics.activeMissions}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          }
        />
      </motion.div>

    </section>
  );
}
