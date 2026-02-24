import {
  getUpcomingLaunches,
  getPreviousLaunches,
  getUpcomingLaunchesByAgency,
  getPreviousLaunchesByAgency,
} from "@/lib/api/launch-library";
import type { Launch } from "@/types/api";

export async function getUpcomingLaunchesData(limit = 12, agencyId?: string): Promise<Launch[]> {
  try {
    const data = agencyId
      ? await getUpcomingLaunchesByAgency(Number(agencyId), limit)
      : await getUpcomingLaunches(limit);
    return data.results;
  } catch {
    return [];
  }
}

export async function getRecentLaunchesData(limit = 6, agencyId?: string): Promise<Launch[]> {
  try {
    const data = agencyId
      ? await getPreviousLaunchesByAgency(Number(agencyId), limit)
      : await getPreviousLaunches(limit);
    return data.results;
  } catch {
    return [];
  }
}
