import type { Metadata } from "next";
import { getUpcomingLaunchesData } from "@/lib/data/launches";
import { getPeopleInSpace } from "@/lib/api/open-notify";
import { ArtemisPanel } from "@/components/sections/missions/artemis-panel";
import { ISSCrewPanel } from "@/components/sections/missions/iss-crew-panel";
import { MarsRoverPanel } from "@/components/sections/missions/mars-rover-panel";
import { MissionStats } from "@/components/sections/missions/mission-stats";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Mission Intelligence",
  description:
    "Artemis program timeline, ISS crew status, Mars rover operations, and launch statistics.",
};

export default async function MissionsPage() {
  const [launches, crew] = await Promise.all([
    getUpcomingLaunchesData(20),
    getPeopleInSpace(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <div className="mb-8">
          <p className="text-xs font-mono text-blue-electric tracking-[0.25em] uppercase mb-2">
            Intelligence Overview
          </p>
          <h1 className="text-3xl font-bold">Mission Intelligence Panel</h1>
          <p className="text-sm text-foreground-muted mt-2">
            Active programs, crew status, and operational data
          </p>
        </div>
      </FadeIn>

      {/* Top row: Artemis, Crew, Mars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <ArtemisPanel />
        <ISSCrewPanel crew={crew} />
        <MarsRoverPanel photos={[]} />
      </div>

      {/* Stats row */}
      <FadeIn>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Launch Intelligence</h2>
          <p className="text-sm text-foreground-muted">
            Aggregate analysis of upcoming launch activity
          </p>
        </div>
      </FadeIn>

      <MissionStats launches={launches} />
    </div>
  );
}
