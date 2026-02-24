"use client";

import dynamic from "next/dynamic";

const StarfieldCanvas = dynamic(
  () =>
    import("@/components/canvas/starfield-canvas").then(
      (m) => m.StarfieldCanvas
    ),
  { ssr: false }
);

export function LazyStarfield() {
  return <StarfieldCanvas />;
}
