import { cn } from "@/lib/utils/cn";

interface StatusIndicatorProps {
  status: "go" | "tbd" | "success" | "failure" | "hold";
  label?: string;
  className?: string;
}

const STATUS_CONFIG = {
  go: { color: "bg-success", textColor: "text-success", label: "GO" },
  tbd: { color: "bg-warning", textColor: "text-warning", label: "TBD" },
  success: { color: "bg-success", textColor: "text-success", label: "SUCCESS" },
  failure: { color: "bg-danger", textColor: "text-danger", label: "FAILURE" },
  hold: { color: "bg-warning", textColor: "text-warning", label: "HOLD" },
};

export function StatusIndicator({
  status,
  label,
  className,
}: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn("w-2 h-2 rounded-full animate-pulse-glow", config.color)}
      />
      <span
        className={cn(
          "text-xs font-mono uppercase tracking-wider",
          config.textColor
        )}
      >
        {label || config.label}
      </span>
    </div>
  );
}
