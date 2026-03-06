"use client";

import dynamic from "next/dynamic";

const Globe3D = dynamic(
  () => import("@/components/3d/globe-3d").then((m) => m.Globe3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-[280px] h-[280px] rounded-full border border-blue-electric/10 animate-pulse" />
    ),
  }
);

export function LazyGlobe(props: {
  issPosition?: { latitude: number; longitude: number } | null;
  size?: number;
  className?: string;
}) {
  return <Globe3D {...props} />;
}
