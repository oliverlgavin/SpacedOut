import type { PeopleInSpaceResponse } from "@/types/api";

/**
 * Fetches people currently in space from Launch Library 2 API.
 * Filters out non-human entries (e.g. Starman).
 * Falls back to Open Notify if Launch Library fails.
 */
export async function getPeopleInSpace(): Promise<PeopleInSpaceResponse> {
  // Primary: Launch Library 2 (accurate, up-to-date)
  try {
    const llBase = process.env.NODE_ENV === "production"
      ? "https://ll.thespacedevs.com/2.2.0"
      : "https://lldev.thespacedevs.com/2.2.0";

    const res = await fetch(
      `${llBase}/astronaut/?in_space=true&limit=30`,
      { next: { revalidate: 300 } }
    );

    if (res.ok) {
      const data = await res.json();
      const humans = (data.results || []).filter(
        (a: { type?: { name?: string } }) =>
          a.type?.name !== "Non-Human"
      );

      const people = humans.map(
        (a: { name: string; agency?: { abbrev?: string }; spacecraft?: { name?: string } }) => ({
          name: a.name,
          craft: a.spacecraft?.name || "ISS",
        })
      );

      if (people.length > 0) {
        return { message: "success", number: people.length, people };
      }
    }
  } catch {
    // Fall through to backup
  }

  // Backup: Open Notify (can be stale but better than nothing)
  try {
    const res = await fetch("http://api.open-notify.org/astros.json", {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.message === "success" && data.number > 0) {
        return data;
      }
    }
  } catch {
    // Both failed
  }

  return { message: "error", number: 0, people: [] };
}
