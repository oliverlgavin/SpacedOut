import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { LazySolarSystem } from "@/components/sections/solar-system/lazy-solar-system";

export const metadata: Metadata = {
  title: "Solar System Explorer",
  description:
    "Interactive CSS 3D solar system visualization. Explore planets, orbits, and learn about our cosmic neighborhood.",
};

export default function SolarSystemPage() {
  return (
    <div className="w-full mx-auto px-4 py-8 relative z-10 min-h-screen -mt-8 pt-8 overflow-x-hidden">
      <FadeIn>
        <div className="max-w-7xl mx-auto mb-4">
          <p className="text-xs font-mono text-blue-electric tracking-[0.25em] uppercase mb-2">
            Orbital Visualization
          </p>
          <h1 className="text-3xl font-bold">Solar System Explorer</h1>
          <p className="text-sm text-foreground-muted mt-2">
            Click a planet to explore
          </p>
        </div>
      </FadeIn>

      <LazySolarSystem />
    </div>
  );
}
