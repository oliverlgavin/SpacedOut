import { MetricSkeleton, CardSkeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
        <div className="h-4 w-48 bg-white/5 rounded animate-pulse mb-4" />
        <div className="h-16 w-72 bg-white/5 rounded animate-pulse mb-8" />
        <div className="w-[280px] h-[280px] rounded-full border border-white/5 animate-pulse mb-8" />
        <div className="flex gap-4">
          <MetricSkeleton />
          <MetricSkeleton />
          <MetricSkeleton />
        </div>
      </div>

      {/* Mission cards skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-6 w-48 bg-white/5 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
