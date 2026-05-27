import type { ArticleType } from "@prisma/client";

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  type: ArticleType;
  imageUrl: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  publishedAt: string;
  vehicleTags: string[];
};

export const SAMPLE_NEWS: NewsArticle[] = [
  {
    id: "1",
    title: "2026 Jeep Wrangler gets updated Dana 44 axles and revised approach angle",
    slug: "2026-jeep-wrangler-dana-44-axles",
    summary:
      "Jeep confirmed the next Wrangler refresh brings beefier Dana 44 axles front and rear across all Rubicon trims, plus a 1.2-degree improvement in approach angle thanks to a redesigned front bumper.",
    type: "NEWS",
    imageUrl: null,
    sourceName: "The Drive",
    sourceUrl: "https://www.thedrive.com",
    publishedAt: "2026-05-27T10:30:00Z",
    vehicleTags: ["Jeep Wrangler"],
  },
  {
    id: "2",
    title: "Polaris issues recall on 2024–2025 RZR Pro R fuel line routing",
    slug: "polaris-recall-rzr-pro-r-fuel-line",
    summary:
      "Polaris is recalling roughly 4,200 RZR Pro R units from the 2024 and 2025 model years over a fuel line that can contact the exhaust header after extended high-speed desert use. No fires reported — fix is a revised bracket and rerouted line, free at dealers.",
    type: "NEWS",
    imageUrl: null,
    sourceName: "UTV Driver",
    sourceUrl: "https://utvdriver.com",
    publishedAt: "2026-05-26T16:00:00Z",
    vehicleTags: ["Polaris RZR Pro R"],
  },
  {
    id: "3",
    title: "BFGoodrich KM3 successor spotted testing at Johnson Valley",
    slug: "bfgoodrich-km3-successor-testing",
    summary:
      "Photographers caught BFGoodrich testing what appears to be the next-gen KM3 mud terrain tire on a fleet of modified Gladiators near Hammer Town. Tread pattern shows deeper voids and a new sidewall lug design. No official announcement yet.",
    type: "NEWS",
    imageUrl: null,
    sourceName: "DrivingLine",
    sourceUrl: "https://www.drivingline.com",
    publishedAt: "2026-05-26T09:15:00Z",
    vehicleTags: ["Jeep Gladiator", "Jeep Wrangler"],
  },
  {
    id: "4",
    title: "Ford Bronco Raptor gets optional 37s from the factory for 2027",
    slug: "ford-bronco-raptor-37s-factory-2027",
    summary:
      "Ford is finally offering 37-inch tires as a factory option on the Bronco Raptor starting with the 2027 model year. The package includes revised fender flares, recalibrated ABS, and a 0.5-inch suspension lift to clear the larger rubber without trimming.",
    type: "NEWS",
    imageUrl: null,
    sourceName: "The Drive",
    sourceUrl: "https://www.thedrive.com",
    publishedAt: "2026-05-25T14:45:00Z",
    vehicleTags: ["Ford Bronco"],
  },
  {
    id: "5",
    title: "KTM reveals electric 300 EXC prototype — 80-mile range claimed",
    slug: "ktm-electric-300-exc-prototype",
    summary:
      "KTM showed a working prototype of an electric 300 EXC-class enduro bike at the Austrian GP paddock. The company claims 80 miles of single-track range and a weight under 250 lbs. Production timeline is late 2027.",
    type: "NEWS",
    imageUrl: null,
    sourceName: "Dirt Rider",
    sourceUrl: "https://www.dirtrider.com",
    publishedAt: "2026-05-25T08:00:00Z",
    vehicleTags: ["KTM 300 XC-W"],
  },
  {
    id: "6",
    title: "Toyota confirms solid rear axle swap option for 2027 Tacoma TRD Pro",
    slug: "toyota-tacoma-trd-pro-solid-rear-axle",
    summary:
      "In a surprise move, Toyota announced a dealer-installed solid rear axle conversion kit for the 2027 Tacoma TRD Pro. The kit replaces the independent rear with a full-float axle, adding 1.5 inches of articulation. Pricing around $4,800 installed.",
    type: "NEWS",
    imageUrl: null,
    sourceName: "Trail4Runner",
    sourceUrl: "https://trail4runner.com",
    publishedAt: "2026-05-24T11:30:00Z",
    vehicleTags: ["Toyota Tacoma"],
  },
];
