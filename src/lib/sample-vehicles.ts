export type Vehicle = {
  year: number;
  make: string;
  model: string;
  trim: string | null;
  slug: string;
  groundClearance: number | null;
  tireSize: string | null;
  engineDisplacement: string | null;
  categorySlug: string;
};

export const SAMPLE_VEHICLES: Vehicle[] = [
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

export function getVehiclesByCategory(categorySlug: string): Vehicle[] {
  return SAMPLE_VEHICLES.filter((v) => v.categorySlug === categorySlug);
}

export function getVehicleLabel(v: Vehicle): string {
  return v.trim
    ? `${v.year} ${v.make} ${v.model} ${v.trim}`
    : `${v.year} ${v.make} ${v.model}`;
}
