import type { Metadata } from "next";
import { getUpcomingLaunchesData, getRecentLaunchesData } from "@/lib/data/launches";
import { LaunchesContent } from "@/components/sections/launches/launches-content";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Live Launch Tracker",
  description:
    "Track upcoming and recent space launches from SpaceX, NASA, ESA, and more.",
};

export default async function LaunchesPage() {
  const [upcoming, recent] = await Promise.all([
    getUpcomingLaunchesData(20),
    getRecentLaunchesData(20),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <div className="mb-8">
          <p className="text-xs font-mono text-blue-electric tracking-[0.25em] uppercase mb-2">
            Launch Operations
          </p>
          <h1 className="text-3xl font-bold">Live Launch Tracker</h1>
          <p className="text-sm text-foreground-muted mt-2">
            Real-time countdown and status for upcoming space launches
          </p>
        </div>
      </FadeIn>

      <LaunchesContent upcoming={upcoming} recent={recent} />
    </div>
  );
}
