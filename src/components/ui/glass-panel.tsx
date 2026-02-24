import { cn } from "@/lib/utils/cn";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassPanel({
  children,
  className,
  hover = false,
  glow = false,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6",
        hover && "glass-hover transition-all duration-300 cursor-pointer",
        glow && "border-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
