import { Skeleton } from "@/components/ui/skeleton";

export default function SolarSystemLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-3 w-32 mb-3" />
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-80 mb-8" />
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-64 h-64 rounded-full border border-white/5 animate-pulse" />
      </div>
    </div>
  );
}
