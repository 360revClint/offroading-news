import type { Metadata } from "next";
import { SAMPLE_VEHICLES, getVehicleLabel } from "@/lib/sample-vehicles";
import { VehicleDashboard } from "@/components/vehicles/VehicleDashboard";

type Props = {
  params: Promise<{ slug: string }>;
};

function vehicleFromSlug(slug: string) {
  const sample = SAMPLE_VEHICLES.find((v) => v.slug === slug);
  if (sample) return sample;

  const parts = slug.split("-");
  if (parts.length >= 3) {
    const year = parseInt(parts[0], 10);
    if (!isNaN(year)) {
      const make = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      const rest = parts.slice(2);
      const model = rest
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return {
        year,
        make,
        model,
        trim: null,
        slug,
        groundClearance: null,
        tireSize: null,
        engineDisplacement: null,
        categorySlug: "jeeps-4x4s",
      };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicleFromSlug(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  const label = getVehicleLabel(vehicle);
  return {
    title: label,
    description: `Fixes, upgrades, trails, and news for the ${label}.`,
  };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = vehicleFromSlug(slug);

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="serif text-2xl font-bold text-text-bright mb-3">
          Vehicle not found
        </h1>
        <p className="text-text-muted">
          Try adding your rig from a category page.
        </p>
      </div>
    );
  }

  const label = getVehicleLabel(vehicle);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="mono text-xs uppercase tracking-widest text-accent mb-2">
          Your rig
        </p>
        <h1 className="serif text-3xl sm:text-4xl font-bold text-text-bright mb-3">
          {label}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-text-muted">
          {vehicle.groundClearance && (
            <span>
              <span className="mono text-xs text-text-dim">Clearance</span>{" "}
              {vehicle.groundClearance}&quot;
            </span>
          )}
          {vehicle.tireSize && (
            <span>
              <span className="mono text-xs text-text-dim">Tires</span>{" "}
              {vehicle.tireSize}
            </span>
          )}
          {vehicle.engineDisplacement && (
            <span>
              <span className="mono text-xs text-text-dim">Engine</span>{" "}
              {vehicle.engineDisplacement}
            </span>
          )}
        </div>
      </div>

      <VehicleDashboard
        year={vehicle.year}
        make={vehicle.make}
        model={vehicle.model}
        trim={vehicle.trim}
        groundClearance={vehicle.groundClearance}
        tireSize={vehicle.tireSize}
        engineDisplacement={vehicle.engineDisplacement}
      />
    </div>
  );
}
