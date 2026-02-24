/* ── Launch Library 2 ── */

export interface LaunchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Launch[];
}

export interface Launch {
  id: string;
  name: string;
  slug: string;
  status: LaunchStatus;
  net: string; // date
  window_start: string;
  window_end: string;
  image: string | null;
  mission: Mission | null;
  pad: LaunchPad;
  launch_service_provider: Agency;
  rocket: Rocket;
  program: Program[];
}

export interface LaunchStatus {
  id: number;
  name: string;
  abbrev: string;
  description: string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  type: string;
  orbit: { name: string; abbrev: string } | null;
}

export interface LaunchPad {
  id: number;
  name: string;
  location: {
    name: string;
    country_code: string;
  };
}

export interface Agency {
  id: number;
  name: string;
  abbrev: string;
  type: string;
  country_code: string;
  image_url: string | null;
  logo_url: string | null;
}

export interface Rocket {
  id: number;
  configuration: {
    id: number;
    name: string;
    family: string;
    full_name: string;
    image_url: string | null;
  };
}

export interface Program {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
}

/* ── Open Notify ── */

export interface PeopleInSpaceResponse {
  message: string;
  number: number;
  people: { name: string; craft: string }[];
}

/* ── ISS Tracker ── */

export interface ISSPosition {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  timestamp: number;
}

/* ── NASA ── */

export interface NasaApod {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
}

export interface MarsRoverPhoto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
    status: string;
    landing_date: string;
    launch_date: string;
  };
}

/* ── SpaceX ── */

export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  success: boolean | null;
  details: string | null;
  rocket: string;
  crew: string[];
  links: {
    patch: { small: string | null; large: string | null };
    webcast: string | null;
    wikipedia: string | null;
  };
}

/* ── Spaceflight News ── */

export interface NewsArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  launches: { launch_id: string; provider: string }[];
}

export interface NewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsArticle[];
}

/* ── Dashboard Aggregate ── */

export interface NasaImage {
  title: string;
  description: string;
  date_created: string;
  nasa_id: string;
  image_url: string;
}

export interface DashboardData {
  launches: Launch[];
  crew: PeopleInSpaceResponse;
  iss: ISSPosition;
  recentLaunches: Launch[];
  marsImage: NasaImage | null;
}
