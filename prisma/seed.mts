import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const categories = [
    { name: "Jeeps & 4x4s", slug: "jeeps-4x4s", description: "Wranglers, Tacomas, 4Runners, Broncos, and full-size rigs", sortOrder: 1 },
    { name: "UTVs", slug: "utvs", description: "Polaris RZR, Can-Am Maverick, Kawasaki Teryx, and more", sortOrder: 2 },
    { name: "ATVs", slug: "atvs", description: "Polaris Sportsman, Can-Am Outlander, Honda Rancher, and more", sortOrder: 3 },
    { name: "Dirt bikes", slug: "dirt-bikes", description: "CRF250F, YZ250F, KTM 300 XC, and more", sortOrder: 4 },
  ];

  const categoryRecords: Record<string, { id: string }> = {};
  for (const cat of categories) {
    categoryRecords[cat.slug] = await db.vehicleCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  const vehicles = [
    { year: 2024, make: "Jeep", model: "Wrangler", trim: "Rubicon", slug: "2024-jeep-wrangler-rubicon", groundClearance: 10.8, tireSize: '33"', engineDisplacement: "3.6L V6", categorySlug: "jeeps-4x4s" },
    { year: 2024, make: "Jeep", model: "Gladiator", trim: "Mojave", slug: "2024-jeep-gladiator-mojave", groundClearance: 11.6, tireSize: '33"', engineDisplacement: "3.6L V6", categorySlug: "jeeps-4x4s" },
    { year: 2024, make: "Toyota", model: "4Runner", trim: "TRD Pro", slug: "2024-toyota-4runner-trd-pro", groundClearance: 9.6, tireSize: '33"', engineDisplacement: "2.4L Turbo", categorySlug: "jeeps-4x4s" },
    { year: 2024, make: "Ford", model: "Bronco", trim: "Badlands", slug: "2024-ford-bronco-badlands", groundClearance: 9.4, tireSize: '33"', engineDisplacement: "2.7L V6 EcoBoost", categorySlug: "jeeps-4x4s" },
    { year: 2024, make: "Toyota", model: "Tacoma", trim: "TRD Pro", slug: "2024-toyota-tacoma-trd-pro", groundClearance: 9.4, tireSize: '33"', engineDisplacement: "2.4L Turbo", categorySlug: "jeeps-4x4s" },
    { year: 2024, make: "Polaris", model: "RZR Pro R", trim: "Ultimate", slug: "2024-polaris-rzr-pro-r-ultimate", groundClearance: 14.5, tireSize: '32"', engineDisplacement: "2.0L", categorySlug: "utvs" },
    { year: 2024, make: "Can-Am", model: "Maverick X3", trim: "X RS Turbo RR", slug: "2024-canam-maverick-x3-xrs-turbo-rr", groundClearance: 15.0, tireSize: '32"', engineDisplacement: "900cc Turbo", categorySlug: "utvs" },
    { year: 2024, make: "Kawasaki", model: "Teryx KRX", trim: "1000", slug: "2024-kawasaki-teryx-krx-1000", groundClearance: 12.9, tireSize: '31"', engineDisplacement: "999cc", categorySlug: "utvs" },
    { year: 2024, make: "Honda", model: "Talon", trim: "1000X FOX Live Valve", slug: "2024-honda-talon-1000x-fox", groundClearance: 12.7, tireSize: '29"', engineDisplacement: "999cc", categorySlug: "utvs" },
    { year: 2024, make: "Polaris", model: "Sportsman", trim: "570", slug: "2024-polaris-sportsman-570", groundClearance: 11.5, tireSize: '25"', engineDisplacement: "567cc", categorySlug: "atvs" },
    { year: 2024, make: "Can-Am", model: "Outlander", trim: "1000R XT-P", slug: "2024-canam-outlander-1000r-xtp", groundClearance: 11.0, tireSize: '26"', engineDisplacement: "976cc", categorySlug: "atvs" },
    { year: 2024, make: "Honda", model: "Rancher", trim: "4x4 EPS", slug: "2024-honda-rancher-4x4-eps", groundClearance: 7.6, tireSize: '24"', engineDisplacement: "420cc", categorySlug: "atvs" },
    { year: 2024, make: "Yamaha", model: "Grizzly", trim: "700 EPS", slug: "2024-yamaha-grizzly-700-eps", groundClearance: 10.8, tireSize: '25"', engineDisplacement: "686cc", categorySlug: "atvs" },
    { year: 2024, make: "Honda", model: "CRF250F", trim: null, slug: "2024-honda-crf250f", groundClearance: 10.4, tireSize: '21"/18"', engineDisplacement: "249cc", categorySlug: "dirt-bikes" },
    { year: 2024, make: "Yamaha", model: "YZ250F", trim: null, slug: "2024-yamaha-yz250f", groundClearance: 12.9, tireSize: '21"/19"', engineDisplacement: "249cc", categorySlug: "dirt-bikes" },
    { year: 2024, make: "KTM", model: "300 XC-W", trim: "TPI", slug: "2024-ktm-300-xc-w-tpi", groundClearance: 14.2, tireSize: '21"/18"', engineDisplacement: "293cc", categorySlug: "dirt-bikes" },
    { year: 2024, make: "Husqvarna", model: "FE 350", trim: null, slug: "2024-husqvarna-fe-350", groundClearance: 14.6, tireSize: '21"/18"', engineDisplacement: "349cc", categorySlug: "dirt-bikes" },
  ];

  for (const { categorySlug, ...vehicleData } of vehicles) {
    await db.vehicle.upsert({
      where: { slug: vehicleData.slug },
      update: { ...vehicleData, categoryId: categoryRecords[categorySlug].id },
      create: { ...vehicleData, categoryId: categoryRecords[categorySlug].id },
    });
  }

  const contentCategories = [
    { name: "Suspension", slug: "suspension", color: "#d97829", sortOrder: 1 },
    { name: "Tires & wheels", slug: "tires-wheels", color: "#a3825f", sortOrder: 2 },
    { name: "Engine & drivetrain", slug: "engine-drivetrain", color: "#7c8c6e", sortOrder: 3 },
    { name: "Electrical", slug: "electrical", color: "#6b8fa3", sortOrder: 4 },
    { name: "Body & armor", slug: "body-armor", color: "#8b7355", sortOrder: 5 },
    { name: "Recovery", slug: "recovery", color: "#c4593c", sortOrder: 6 },
    { name: "Lighting", slug: "lighting", color: "#c9a84c", sortOrder: 7 },
    { name: "Trail running", slug: "trail-running", color: "#a39171", sortOrder: 8 },
    { name: "Maintenance", slug: "maintenance", color: "#7a7a6e", sortOrder: 9 },
    { name: "Industry news", slug: "industry-news", color: "#d4a857", sortOrder: 10 },
  ];

  for (const cat of contentCategories) {
    await db.contentCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  const rssSources = [
    { name: "The Drive - Off-Road", url: "https://www.thedrive.com/section/off-road/feed", siteUrl: "https://www.thedrive.com" },
    { name: "DrivingLine", url: "https://www.drivingline.com/feed/", siteUrl: "https://www.drivingline.com" },
    { name: "Overland Journal", url: "https://overlandjournal.com/feed/", siteUrl: "https://overlandjournal.com" },
    { name: "Trail4Runner", url: "https://trail4runner.com/feed/", siteUrl: "https://trail4runner.com" },
    { name: "Expedition Portal", url: "https://expeditionportal.com/feed/", siteUrl: "https://expeditionportal.com" },
    { name: "Dirt Rider", url: "https://www.dirtrider.com/feed/", siteUrl: "https://www.dirtrider.com" },
    { name: "UTV Driver", url: "https://utvdriver.com/feed/", siteUrl: "https://utvdriver.com" },
  ];

  for (const source of rssSources) {
    await db.rssSource.upsert({
      where: { url: source.url },
      update: source,
      create: source,
    });
  }

  console.log("Seeded: 4 vehicle categories, %d vehicles, %d content categories, %d RSS sources",
    vehicles.length, contentCategories.length, rssSources.length);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e: unknown) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
