import { cn } from "@/lib/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-white/5",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function MetricSkeleton() {
  return (
    <div className="glass rounded-xl p-4 flex flex-col items-center gap-2 min-w-[140px]">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
