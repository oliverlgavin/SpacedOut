import { API } from "@/lib/constants/api-endpoints";
import type { LaunchResponse, Launch } from "@/types/api";

const BASE = process.env.NODE_ENV === "production"
  ? API.LAUNCH_LIBRARY
  : API.LAUNCH_LIBRARY_DEV;

async function fetchJSON<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Launch Library API error: ${res.status}`);
  return res.json();
}

export async function getUpcomingLaunches(
  limit = 12
): Promise<LaunchResponse> {
  return fetchJSON<LaunchResponse>(
    `/launch/upcoming/?limit=${limit}&mode=detailed`
  );
}

export async function getPreviousLaunches(
  limit = 10
): Promise<LaunchResponse> {
  return fetchJSON<LaunchResponse>(
    `/launch/previous/?limit=${limit}&mode=detailed`
  );
}

export async function getLaunchById(id: string): Promise<Launch> {
  return fetchJSON<Launch>(`/launch/${id}/`);
}

export async function getUpcomingLaunchesByAgency(
  agencyId: number,
  limit = 10
): Promise<LaunchResponse> {
  return fetchJSON<LaunchResponse>(
    `/launch/upcoming/?lsp__ids=${agencyId}&limit=${limit}&mode=detailed`
  );
}

export async function getPreviousLaunchesByAgency(
  agencyId: number,
  limit = 10
): Promise<LaunchResponse> {
  return fetchJSON<LaunchResponse>(
    `/launch/previous/?lsp__ids=${agencyId}&limit=${limit}&mode=detailed`
  );
}
