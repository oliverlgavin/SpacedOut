"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  status: "completed" | "active" | "upcoming";
}

interface TimelineChartProps {
  events: TimelineEvent[];
  className?: string;
}

export function TimelineChart({ events, className }: TimelineChartProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-glass-border" />

      <div className="space-y-6">
        {events.map((event, i) => (
          <motion.div
            key={i}
            className="relative pl-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            {/* Dot */}
            <div
              className={cn(
                "absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full border-2",
                event.status === "completed" &&
                  "bg-success border-success",
                event.status === "active" &&
                  "bg-blue-electric border-blue-electric animate-pulse-glow",
                event.status === "upcoming" &&
                  "bg-transparent border-foreground-muted"
              )}
            />

            <p className="text-xs font-mono text-foreground-muted mb-1">
              {event.date}
            </p>
            <p
              className={cn(
                "text-sm font-medium",
                event.status === "active" && "text-blue-electric"
              )}
            >
              {event.title}
            </p>
            {event.description && (
              <p className="text-xs text-foreground-muted mt-1">
                {event.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
