"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils/cn";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
  compact?: boolean;
}

export function CountdownTimer({
  targetDate,
  className,
  compact = false,
}: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate);

  if (isPast) {
    return (
      <span className={cn("text-success font-mono text-sm", className)}>
        LAUNCHED
      </span>
    );
  }

  if (compact) {
    return (
      <span className={cn("font-mono text-sm text-blue-electric", className)}>
        T-{days}d {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className={cn("flex gap-3", className)}>
      {[
        { label: "DAYS", value: days },
        { label: "HRS", value: hours },
        { label: "MIN", value: minutes },
        { label: "SEC", value: seconds },
      ].map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center glass rounded-lg px-3 py-2 min-w-[52px]"
        >
          <span className="text-xl font-mono font-bold text-blue-electric text-glow-sm">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-foreground-muted tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
