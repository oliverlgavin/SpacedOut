"use client";

import { GlassPanel } from "./glass-panel";
import { CountAnimation } from "@/components/ui/count-animation";

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ label, value, suffix, icon }: MetricCardProps) {
  return (
    <GlassPanel className="flex flex-col items-center gap-2 p-4 text-center min-w-[140px]">
      {icon && <div className="text-blue-electric text-xl">{icon}</div>}
      <div className="flex items-baseline gap-1">
        <CountAnimation number={value} className="text-3xl font-bold text-blue-electric text-glow" />
        {suffix && (
          <span className="text-sm text-foreground-muted">{suffix}</span>
        )}
      </div>
      <p className="text-xs text-foreground-muted uppercase tracking-widest">
        {label}
      </p>
    </GlassPanel>
  );
}
