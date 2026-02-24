import { API } from "@/lib/constants/api-endpoints";
import type { NasaApod, NasaImage } from "@/types/api";

const KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function getApod(): Promise<NasaApod> {
  const res = await fetch(
    `${API.NASA}/planetary/apod?api_key=${KEY}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`NASA APOD error: ${res.status}`);
  return res.json();
}

export async function getLatestMarsImage(): Promise<NasaImage | null> {
  try {
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=mars+surface+rover&media_type=image&page_size=1&year_start=${new Date().getFullYear() - 1}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const items = data?.collection?.items;
    if (!items || items.length === 0) return null;

    const item = items[0];
    const info = item.data[0];
    const imageUrl = item.links?.[0]?.href;

    if (!imageUrl) return null;

    return {
      title: info.title,
      description: info.description || "",
      date_created: info.date_created,
      nasa_id: info.nasa_id,
      image_url: imageUrl,
    };
  } catch {
    return null;
  }
}
