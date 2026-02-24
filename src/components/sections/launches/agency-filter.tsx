"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const FILTER_AGENCIES = [
  { label: "All", value: "" },
  { label: "NASA", value: "44" },
  { label: "SpaceX", value: "121" },
  { label: "ESA", value: "27" },
  { label: "ISRO", value: "31" },
  { label: "JAXA", value: "37" },
  { label: "Roscosmos", value: "63" },
  { label: "CASC", value: "88" },
  { label: "Rocket Lab", value: "147" },
  { label: "ULA", value: "124" },
];

export function AgencyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("agency") || "";

  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("agency", value);
    } else {
      params.delete("agency");
    }
    router.push(`/launches?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTER_AGENCIES.map((a) => (
        <button
          key={a.value}
          onClick={() => handleFilter(a.value)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
            current === a.value
              ? "bg-blue-electric/15 text-blue-electric border border-blue-electric/30"
              : "glass text-foreground-muted hover:text-foreground hover:bg-white/5"
          )}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
