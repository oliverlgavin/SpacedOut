import type { Metadata } from "next";
import { getDashboardData } from "@/lib/data/aggregator";
import { getApod } from "@/lib/api/nasa";
import { HeroSection } from "@/components/sections/home/hero-section";
import { AgencyStrip } from "@/components/sections/home/agency-strip";
import { FeaturedMissions } from "@/components/sections/home/featured-missions";
import { ApodSection } from "@/components/sections/home/apod-section";
import { LiveStatsPanel } from "@/components/sections/home/live-stats-panel";

export const metadata: Metadata = {
  description:
    "Live space intelligence dashboard with real-time ISS tracking, launch countdowns, and mission data from NASA, ESA, SpaceX, ISRO, and JAXA.",
};

export default async function HomePage() {
  const [data, apod] = await Promise.all([
    getDashboardData(),
    getApod().catch(() => null),
  ]);

  return (
    <>
      <HeroSection data={data} />
      <AgencyStrip />
      {apod && <ApodSection apod={apod} />}
      <FeaturedMissions launches={data.launches} />
      <LiveStatsPanel
        iss={data.iss}
        crew={data.crew}
        marsImage={data.marsImage}
      />
    </>
  );
}
