import { NextResponse } from "next/server";
import { getPeopleInSpace } from "@/lib/api/open-notify";
import { getUpcomingLaunchesData } from "@/lib/data/launches";

export const revalidate = 300; // cache for 5 minutes at the edge

export async function GET() {
  try {
    const [crew, launches] = await Promise.all([
      getPeopleInSpace(),
      getUpcomingLaunchesData(6),
    ]);

    return NextResponse.json({
      humansInSpace: crew.number,
      upcomingLaunches: launches.length,
      activeMissions: launches.filter((l) => l.mission).length,
      crew: crew.people,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 502 }
    );
  }
}
