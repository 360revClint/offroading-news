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

export function AddRigForm({ categorySlug }: { categorySlug: string }) {
  const router = useRouter();
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VehicleResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/vehicles/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, make, model, trim, categorySlug }),
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
        Enter your vehicle and we&apos;ll pull the specs automatically.
      </p>

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
