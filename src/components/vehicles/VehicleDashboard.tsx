"use client";

import { useState, useEffect } from "react";

type WrenchItem = {
  title: string;
  summary: string;
  difficulty: string;
  estimatedCost: string;
  estimatedTime: string;
};

type BuildMod = {
  name: string;
  description: string;
  estimatedCost: string;
};

type BuildStage = {
  stage: number;
  name: string;
  description: string;
  mods: BuildMod[];
};

type TrailRec = {
  name: string;
  location: string;
  difficulty: string;
  description: string;
  minClearance: number;
  minTireSize: string;
};

type DispatchItem = {
  title: string;
  summary: string;
  category: string;
};

type VehicleContent = {
  wrench: { title: string; items: WrenchItem[] };
  build: { title: string; stages: BuildStage[] };
  trails: { title: string; recommendations: TrailRec[] };
  dispatch: { title: string; items: DispatchItem[] };
};

type Props = {
  year: number;
  make: string;
  model: string;
  trim: string | null;
  groundClearance: number | null;
  tireSize: string | null;
  engineDisplacement: string | null;
};

const PILLAR_COLORS = {
  wrench: "accent-fix",
  build: "accent-upgrade",
  trails: "accent-trail",
  dispatch: "accent-news",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-green-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  expert: "text-red-400",
};

export function VehicleDashboard(props: Props) {
  const [content, setContent] = useState<VehicleContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/vehicles/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load content.");
          return;
        }
        setContent(data.content);
      } catch {
        setError("Failed to connect.");
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [props]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="text-text-muted mt-4">
          Building your vehicle profile...
        </p>
        <p className="text-sm text-text-dim mt-1">
          Claude is pulling specs, common fixes, build paths, and trail
          recommendations.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded border border-red-800 bg-red-950/30 px-6 py-4 text-sm text-red-300">
        {error}
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="space-y-14">
      {/* Wrench — Fix & Maintain */}
      <section>
        <div className="mb-6">
          <p className={`mono text-xs uppercase tracking-widest text-${PILLAR_COLORS.wrench} mb-1`}>
            Wrench
          </p>
          <h2 className="serif text-2xl font-bold text-text-bright">
            {content.wrench.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.wrench.items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-bg-elevated p-5"
            >
              <h3 className="text-base font-semibold text-text-bright mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-muted mb-3 leading-relaxed">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-4 mono text-xs">
                <span className={DIFFICULTY_COLORS[item.difficulty] || "text-text-dim"}>
                  {item.difficulty}
                </span>
                <span className="text-text-dim">{item.estimatedCost}</span>
                <span className="text-text-dim">{item.estimatedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Build — Upgrades & Mods */}
      <section>
        <div className="mb-6">
          <p className={`mono text-xs uppercase tracking-widest text-${PILLAR_COLORS.build} mb-1`}>
            Build
          </p>
          <h2 className="serif text-2xl font-bold text-text-bright">
            {content.build.title}
          </h2>
        </div>
        <div className="space-y-6">
          {content.build.stages.map((stage) => (
            <div
              key={stage.stage}
              className="rounded-lg border border-border bg-bg-elevated p-6"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="mono text-xs text-accent-upgrade font-bold">
                  Stage {stage.stage}
                </span>
                <h3 className="text-lg font-semibold text-text-bright">
                  {stage.name}
                </h3>
              </div>
              <p className="text-sm text-text-muted mb-4">{stage.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stage.mods.map((mod, i) => (
                  <div key={i} className="rounded bg-surface p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-text-bright">
                        {mod.name}
                      </p>
                      <span className="mono text-xs text-text-dim shrink-0">
                        {mod.estimatedCost}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">{mod.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trails — Where to Ride */}
      <section>
        <div className="mb-6">
          <p className={`mono text-xs uppercase tracking-widest text-${PILLAR_COLORS.trails} mb-1`}>
            Trails
          </p>
          <h2 className="serif text-2xl font-bold text-text-bright">
            {content.trails.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.trails.recommendations.map((trail, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-bg-elevated p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold text-text-bright">
                  {trail.name}
                </h3>
                <span className={`mono text-xs shrink-0 ${DIFFICULTY_COLORS[trail.difficulty] || "text-text-dim"}`}>
                  {trail.difficulty}
                </span>
              </div>
              <p className="mono text-xs text-text-dim mb-2">{trail.location}</p>
              <p className="text-sm text-text-muted mb-3 leading-relaxed">
                {trail.description}
              </p>
              <div className="flex gap-4 mono text-xs text-text-dim">
                <span>Min clearance: {trail.minClearance}&quot;</span>
                <span>Min tires: {trail.minTireSize}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dispatch — News & Culture */}
      <section>
        <div className="mb-6">
          <p className={`mono text-xs uppercase tracking-widest text-${PILLAR_COLORS.dispatch} mb-1`}>
            Dispatch
          </p>
          <h2 className="serif text-2xl font-bold text-text-bright">
            {content.dispatch.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.dispatch.items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-bg-elevated p-5"
            >
              <span className="mono text-xs text-accent-news mb-2 block">
                {item.category}
              </span>
              <h3 className="text-base font-semibold text-text-bright mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
