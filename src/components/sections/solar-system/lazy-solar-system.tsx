"use client";

import dynamic from "next/dynamic";

const PlanetOrbitView = dynamic(
  () =>
    import("./planet-orbit-view").then((m) => m.PlanetOrbitView),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border border-white/5 animate-pulse" />
      </div>
    ),
  }
);

export function LazySolarSystem() {
  return <PlanetOrbitView />;
}
