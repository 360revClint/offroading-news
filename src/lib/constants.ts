export const SITE_NAME = "offroading.news";
export const SITE_DESCRIPTION =
  "Pick your rig, get everything you need — repair guides, upgrade walkthroughs, trail recommendations, and breaking news for your specific machine.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offroading.news";

export const VEHICLE_CATEGORIES = [
  { name: "Jeeps & 4x4s", slug: "jeeps-4x4s", description: "Wranglers, Tacomas, 4Runners, Broncos, and full-size rigs" },
  { name: "UTVs", slug: "utvs", description: "Polaris RZR, Can-Am Maverick, Kawasaki Teryx, and more" },
  { name: "ATVs", slug: "atvs", description: "Polaris Sportsman, Can-Am Outlander, Honda Rancher, and more" },
  { name: "Dirt bikes", slug: "dirt-bikes", description: "CRF250F, YZ250F, KTM 300 XC, and more" },
] as const;

export const CONTENT_CATEGORIES = [
  { name: "Suspension", slug: "suspension", color: "#d97829" },
  { name: "Tires & wheels", slug: "tires-wheels", color: "#a3825f" },
  { name: "Engine & drivetrain", slug: "engine-drivetrain", color: "#7c8c6e" },
  { name: "Electrical", slug: "electrical", color: "#6b8fa3" },
  { name: "Body & armor", slug: "body-armor", color: "#8b7355" },
  { name: "Recovery", slug: "recovery", color: "#c4593c" },
  { name: "Lighting", slug: "lighting", color: "#c9a84c" },
  { name: "Trail running", slug: "trail-running", color: "#a39171" },
  { name: "Maintenance", slug: "maintenance", color: "#7a7a6e" },
  { name: "Industry news", slug: "industry-news", color: "#d4a857" },
] as const;

export const ARTICLE_TYPE_CONFIG = {
  FIX: { label: "Fix", color: "var(--accent-fix)", cssClass: "type-fix" },
  UPGRADE: { label: "Upgrade", color: "var(--accent-upgrade)", cssClass: "type-upgrade" },
  TRAIL: { label: "Trail", color: "var(--accent-trail)", cssClass: "type-trail" },
  NEWS: { label: "News", color: "var(--accent-news)", cssClass: "type-news" },
} as const;
