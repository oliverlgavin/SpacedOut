import { API } from "@/lib/constants/api-endpoints";
import type { NewsResponse, NewsArticle } from "@/types/api";

export async function getLatestNews(limit = 10): Promise<NewsArticle[]> {
  const res = await fetch(
    `${API.SPACEFLIGHT_NEWS}/articles/?limit=${limit}&ordering=-published_at`,
    { next: { revalidate: 900 } }
  );
  if (!res.ok) return [];
  const data: NewsResponse = await res.json();
  return data.results;
}

export async function searchNews(query: string, limit = 10): Promise<NewsArticle[]> {
  const res = await fetch(
    `${API.SPACEFLIGHT_NEWS}/articles/?search=${encodeURIComponent(query)}&limit=${limit}`,
    { next: { revalidate: 900 } }
  );
  if (!res.ok) return [];
  const data: NewsResponse = await res.json();
  return data.results;
}
