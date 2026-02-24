import { API } from "@/lib/constants/api-endpoints";
import type { SpaceXLaunch } from "@/types/api";

export async function getLatestSpaceXLaunch(): Promise<SpaceXLaunch> {
  const res = await fetch(`${API.SPACEX}/launches/latest`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`SpaceX API error: ${res.status}`);
  return res.json();
}

export async function getNextSpaceXLaunch(): Promise<SpaceXLaunch> {
  const res = await fetch(`${API.SPACEX}/launches/next`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`SpaceX API error: ${res.status}`);
  return res.json();
}

export async function getSpaceXLaunches(limit = 20): Promise<SpaceXLaunch[]> {
  const res = await fetch(`${API.SPACEX}/launches`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const data: SpaceXLaunch[] = await res.json();
  return data.slice(-limit).reverse();
}
