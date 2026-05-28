"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type VehicleResult = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  slug: string;
  groundClearance: number | null;
  tireSize: string | null;
  engineDisplacement: string | null;
};

type PresetVehicle = {
  label: string;
  make: string;
  model: string;
  trim: string;
};

const POPULAR_RIGS: Record<string, PresetVehicle[]> = {
  "jeeps-4x4s": [
    { label: "Jeep Wrangler Rubicon", make: "Jeep", model: "Wrangler", trim: "Rubicon" },
    { label: "Jeep Wrangler Sport", make: "Jeep", model: "Wrangler", trim: "Sport" },
    { label: "Jeep Wrangler Sahara", make: "Jeep", model: "Wrangler", trim: "Sahara" },
    { label: "Jeep Gladiator Mojave", make: "Jeep", model: "Gladiator", trim: "Mojave" },
    { label: "Jeep Gladiator Rubicon", make: "Jeep", model: "Gladiator", trim: "Rubicon" },
    { label: "Ford Bronco Badlands", make: "Ford", model: "Bronco", trim: "Badlands" },
    { label: "Ford Bronco Raptor", make: "Ford", model: "Bronco", trim: "Raptor" },
    { label: "Ford Bronco Sport Outer Banks", make: "Ford", model: "Bronco Sport", trim: "Outer Banks" },
    { label: "Ford F-150 Raptor", make: "Ford", model: "F-150", trim: "Raptor" },
    { label: "Ford F-150 Raptor R", make: "Ford", model: "F-150", trim: "Raptor R" },
    { label: "Toyota 4Runner TRD Pro", make: "Toyota", model: "4Runner", trim: "TRD Pro" },
    { label: "Toyota Tacoma TRD Pro", make: "Toyota", model: "Tacoma", trim: "TRD Pro" },
    { label: "Toyota Tacoma Trailhunter", make: "Toyota", model: "Tacoma", trim: "Trailhunter" },
    { label: "Toyota Land Cruiser", make: "Toyota", model: "Land Cruiser", trim: "" },
    { label: "Chevrolet Colorado ZR2", make: "Chevrolet", model: "Colorado", trim: "ZR2" },
    { label: "GMC Canyon AT4X", make: "GMC", model: "Canyon", trim: "AT4X" },
    { label: "Ram 1500 TRX", make: "Ram", model: "1500", trim: "TRX" },
    { label: "Lexus GX 550 Overtrail", make: "Lexus", model: "GX 550", trim: "Overtrail" },
    { label: "Land Rover Defender 110", make: "Land Rover", model: "Defender", trim: "110" },
  ],
  utvs: [
    { label: "Polaris RZR Pro R Ultimate", make: "Polaris", model: "RZR Pro R", trim: "Ultimate" },
    { label: "Polaris RZR Pro R Sport", make: "Polaris", model: "RZR Pro R", trim: "Sport" },
    { label: "Polaris RZR XP 1000", make: "Polaris", model: "RZR XP", trim: "1000" },
    { label: "Polaris General XP 1000", make: "Polaris", model: "General XP", trim: "1000" },
    { label: "Can-Am Maverick X3 X RS Turbo RR", make: "Can-Am", model: "Maverick X3", trim: "X RS Turbo RR" },
    { label: "Can-Am Maverick X3 DS Turbo", make: "Can-Am", model: "Maverick X3", trim: "DS Turbo" },
    { label: "Can-Am Maverick R", make: "Can-Am", model: "Maverick R", trim: "" },
    { label: "Can-Am Commander XT-P 1000R", make: "Can-Am", model: "Commander", trim: "XT-P 1000R" },
    { label: "Kawasaki Teryx KRX 1000", make: "Kawasaki", model: "Teryx KRX", trim: "1000" },
    { label: "Honda Talon 1000X FOX Live Valve", make: "Honda", model: "Talon", trim: "1000X FOX Live Valve" },
    { label: "Honda Pioneer 1000-5 Trail", make: "Honda", model: "Pioneer 1000-5", trim: "Trail" },
    { label: "Yamaha YXZ1000R SS", make: "Yamaha", model: "YXZ1000R", trim: "SS" },
  ],
  atvs: [
    { label: "Polaris Sportsman 570", make: "Polaris", model: "Sportsman", trim: "570" },
    { label: "Polaris Sportsman 850 Trail", make: "Polaris", model: "Sportsman 850", trim: "Trail" },
    { label: "Polaris Sportsman XP 1000", make: "Polaris", model: "Sportsman XP", trim: "1000" },
    { label: "Can-Am Outlander 1000R XT-P", make: "Can-Am", model: "Outlander", trim: "1000R XT-P" },
    { label: "Can-Am Outlander 700 XT", make: "Can-Am", model: "Outlander", trim: "700 XT" },
    { label: "Can-Am Renegade X MR 1000R", make: "Can-Am", model: "Renegade X MR", trim: "1000R" },
    { label: "Honda Rancher 4x4 EPS", make: "Honda", model: "Rancher", trim: "4x4 EPS" },
    { label: "Honda Foreman Rubicon 4x4", make: "Honda", model: "Foreman Rubicon", trim: "4x4" },
    { label: "Yamaha Grizzly 700 EPS", make: "Yamaha", model: "Grizzly", trim: "700 EPS" },
    { label: "Yamaha Kodiak 700 EPS", make: "Yamaha", model: "Kodiak", trim: "700 EPS" },
    { label: "Kawasaki Brute Force 750 4x4i", make: "Kawasaki", model: "Brute Force", trim: "750 4x4i" },
    { label: "Suzuki KingQuad 750AXi", make: "Suzuki", model: "KingQuad", trim: "750AXi" },
  ],
  "dirt-bikes": [
    { label: "Honda CRF250F", make: "Honda", model: "CRF250F", trim: "" },
    { label: "Honda CRF450R", make: "Honda", model: "CRF450R", trim: "" },
    { label: "Honda CRF450RX", make: "Honda", model: "CRF450RX", trim: "" },
    { label: "Honda CRF300L", make: "Honda", model: "CRF300L", trim: "" },
    { label: "Yamaha YZ250F", make: "Yamaha", model: "YZ250F", trim: "" },
    { label: "Yamaha YZ450F", make: "Yamaha", model: "YZ450F", trim: "" },
    { label: "Yamaha WR250F", make: "Yamaha", model: "WR250F", trim: "" },
    { label: "KTM 300 XC-W TPI", make: "KTM", model: "300 XC-W", trim: "TPI" },
    { label: "KTM 350 EXC-F", make: "KTM", model: "350 EXC-F", trim: "" },
    { label: "KTM 500 EXC-F", make: "KTM", model: "500 EXC-F", trim: "" },
    { label: "Husqvarna FE 350", make: "Husqvarna", model: "FE 350", trim: "" },
    { label: "Husqvarna FE 501", make: "Husqvarna", model: "FE 501", trim: "" },
    { label: "GasGas EC 300", make: "GasGas", model: "EC 300", trim: "" },
    { label: "Kawasaki KLX300R", make: "Kawasaki", model: "KLX300R", trim: "" },
    { label: "Suzuki DR-Z400S", make: "Suzuki", model: "DR-Z400S", trim: "" },
  ],
};

export function AddRigForm({ categorySlug }: { categorySlug: string }) {
  const router = useRouter();
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [groundClearance, setGroundClearance] = useState("");
  const [tireSize, setTireSize] = useState("");
  const [engineDisplacement, setEngineDisplacement] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VehicleResult | null>(null);

  const presets = POPULAR_RIGS[categorySlug] || [];

  function handlePresetSelect(value: string) {
    if (!value) return;
    const preset = presets.find((p) => p.label === value);
    if (preset) {
      setMake(preset.make);
      setModel(preset.model);
      setTrim(preset.trim);
      setYear("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/vehicles/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          make,
          model,
          trim,
          categorySlug,
          groundClearance: groundClearance ? parseFloat(groundClearance) : undefined,
          tireSize: tireSize || undefined,
          engineDisplacement: engineDisplacement || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setResult(data.vehicle);
      router.push(`/vehicle/${data.vehicle.slug}`);
    } catch {
      setError("Failed to connect. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-bg-elevated p-6">
      <h3 className="serif text-xl font-semibold text-text-bright mb-1">
        Add your rig
      </h3>
      <p className="text-sm text-text-muted mb-5">
        Pick a popular rig or enter your own.
      </p>

      {presets.length > 0 && (
        <div className="mb-5">
          <label
            htmlFor="preset"
            className="mono text-xs text-text-dim block mb-1"
          >
            Popular rigs
          </label>
          <select
            id="preset"
            onChange={(e) => handlePresetSelect(e.target.value)}
            className="w-full sm:w-auto rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright focus:border-accent focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select a vehicle...
            </option>
            {Object.entries(
              presets.reduce<Record<string, PresetVehicle[]>>((groups, p) => {
                const key = p.make;
                if (!groups[key]) groups[key] = [];
                groups[key].push(p);
                return groups;
              }, {})
            ).map(([makeName, vehicles]) => (
              <optgroup key={makeName} label={makeName}>
                {vehicles.map((p) => (
                  <option key={p.label} value={p.label}>
                    {p.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-border" />
        <span className="mono text-xs text-text-dim">or enter manually</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label
              htmlFor="year"
              className="mono text-xs text-text-dim block mb-1"
            >
              Year
            </label>
            <input
              id="year"
              type="number"
              min="1940"
              max="2027"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright placeholder:text-text-dim focus:border-accent focus:outline-none"
              placeholder="2024"
            />
          </div>
          <div>
            <label
              htmlFor="make"
              className="mono text-xs text-text-dim block mb-1"
            >
              Make
            </label>
            <input
              id="make"
              type="text"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright placeholder:text-text-dim focus:border-accent focus:outline-none"
              placeholder="Jeep"
            />
          </div>
          <div>
            <label
              htmlFor="model"
              className="mono text-xs text-text-dim block mb-1"
            >
              Model
            </label>
            <input
              id="model"
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright placeholder:text-text-dim focus:border-accent focus:outline-none"
              placeholder="Wrangler"
            />
          </div>
          <div>
            <label
              htmlFor="trim"
              className="mono text-xs text-text-dim block mb-1"
            >
              Trim
            </label>
            <input
              id="trim"
              type="text"
              value={trim}
              onChange={(e) => setTrim(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright placeholder:text-text-dim focus:border-accent focus:outline-none"
              placeholder="Rubicon"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="groundClearance"
              className="mono text-xs text-text-dim block mb-1"
            >
              Clearance (in.)
            </label>
            <input
              id="groundClearance"
              type="number"
              step="0.1"
              min="0"
              value={groundClearance}
              onChange={(e) => setGroundClearance(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright placeholder:text-text-dim focus:border-accent focus:outline-none"
              placeholder="10.8"
            />
          </div>
          <div>
            <label
              htmlFor="tireSize"
              className="mono text-xs text-text-dim block mb-1"
            >
              Tire size
            </label>
            <input
              id="tireSize"
              type="text"
              value={tireSize}
              onChange={(e) => setTireSize(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright placeholder:text-text-dim focus:border-accent focus:outline-none"
              placeholder='33"'
            />
          </div>
          <div>
            <label
              htmlFor="engineDisplacement"
              className="mono text-xs text-text-dim block mb-1"
            >
              Engine
            </label>
            <input
              id="engineDisplacement"
              type="text"
              value={engineDisplacement}
              onChange={(e) => setEngineDisplacement(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text-bright placeholder:text-text-dim focus:border-accent focus:outline-none"
              placeholder="3.6L V6"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Looking up specs..." : "Add my rig"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded border border-red-800 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 rounded border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm font-medium text-accent mb-3">
            {result.trim
              ? `${result.year} ${result.make} ${result.model} ${result.trim}`
              : `${result.year} ${result.make} ${result.model}`}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {result.groundClearance && (
              <div>
                <p className="mono text-xs text-text-dim">Clearance</p>
                <p className="text-sm text-text-muted">
                  {result.groundClearance}&quot;
                </p>
              </div>
            )}
            {result.tireSize && (
              <div>
                <p className="mono text-xs text-text-dim">Tires</p>
                <p className="text-sm text-text-muted">{result.tireSize}</p>
              </div>
            )}
            {result.engineDisplacement && (
              <div>
                <p className="mono text-xs text-text-dim">Engine</p>
                <p className="text-sm text-text-muted">
                  {result.engineDisplacement}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
