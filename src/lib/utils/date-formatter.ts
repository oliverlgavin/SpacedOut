export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = Date.now();
  const target = new Date(date).getTime();
  const diff = target - now;
  const absDiff = Math.abs(diff);

  if (absDiff < 60000) return "just now";

  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(absDiff / 3600000);
  const days = Math.floor(absDiff / 86400000);

  const suffix = diff > 0 ? "" : " ago";
  const prefix = diff > 0 ? "in " : "";

  if (days > 0) return `${prefix}${days}d${suffix}`;
  if (hours > 0) return `${prefix}${hours}h${suffix}`;
  return `${prefix}${minutes}m${suffix}`;
}

export function formatCountdown(
  days: number,
  hours: number,
  minutes: number,
  seconds: number
): string {
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${String(hours).padStart(2, "0")}h`);
  parts.push(`${String(minutes).padStart(2, "0")}m`);
  parts.push(`${String(seconds).padStart(2, "0")}s`);
  return parts.join(" ");
}
