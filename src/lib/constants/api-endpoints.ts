export const API = {
  LAUNCH_LIBRARY: "https://ll.thespacedevs.com/2.2.0",
  LAUNCH_LIBRARY_DEV: "https://lldev.thespacedevs.com/2.2.0",
  OPEN_NOTIFY: "http://api.open-notify.org",
  ISS_TRACKER: "https://api.wheretheiss.at/v1",
  NASA: "https://api.nasa.gov",
  SPACEX: "https://api.spacexdata.com/v5",
  SPACEFLIGHT_NEWS: "https://api.spaceflightnewsapi.net/v4",
} as const;

export const CACHE_TIMES = {
  REALTIME: 30,
  FREQUENT: 300,
  MODERATE: 3600,
  DAILY: 86400,
} as const;
