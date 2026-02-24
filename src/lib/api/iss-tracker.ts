import type { ISSPosition } from "@/types/api";

const FALLBACK: ISSPosition = {
  name: "iss",
  id: 25544,
  latitude: 0,
  longitude: 0,
  altitude: 420,
  velocity: 27600,
  visibility: "daylight",
  timestamp: Date.now() / 1000,
};

export async function getISSPosition(): Promise<ISSPosition> {
  try {
    const res = await fetch("http://api.open-notify.org/iss-now.json", {
      next: { revalidate: 30 },
    });

    if (!res.ok) return FALLBACK;

    const data = await res.json();
    if (data.message !== "success") return FALLBACK;

    return {
      name: "iss",
      id: 25544,
      latitude: parseFloat(data.iss_position.latitude),
      longitude: parseFloat(data.iss_position.longitude),
      altitude: 420,
      velocity: 27600,
      visibility: "daylight",
      timestamp: data.timestamp,
    };
  } catch {
    return FALLBACK;
  }
}
