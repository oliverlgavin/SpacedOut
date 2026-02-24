import { getUpcomingLaunchesData, getRecentLaunchesData } from "./launches";
import { getPeopleInSpace } from "@/lib/api/open-notify";
import { getISSPosition } from "@/lib/api/iss-tracker";
import { getLatestMarsImage } from "@/lib/api/nasa";
import type { DashboardData } from "@/types/api";

/**
 * Aggregates data from multiple sources in parallel.
 * Each source is independently cached via Next.js fetch cache.
 * Failed sources return safe defaults — they never block the page.
 */
export async function getDashboardData(): Promise<DashboardData> {
  try {
    const [launches, crew, iss, recentLaunches, marsImage] = await Promise.all([
      getUpcomingLaunchesData(6),
      getPeopleInSpace(),
      getISSPosition(),
      getRecentLaunchesData(3),
      getLatestMarsImage(),
    ]);

    return { launches, crew, iss, recentLaunches, marsImage };
  } catch {
    return {
      launches: [],
      crew: { message: "error", number: 0, people: [] },
      iss: { name: "iss", id: 25544, latitude: 0, longitude: 0, altitude: 420, velocity: 27600, visibility: "daylight", timestamp: Date.now() / 1000 },
      recentLaunches: [],
      marsImage: null,
    };
  }
}
