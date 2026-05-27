import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import { getVehiclesByCategory, getVehicleLabel } from "@/lib/sample-vehicles";
import { SAMPLE_NEWS } from "@/lib/sample-news";
import { NewsCard } from "@/components/articles/NewsCard";
import { AddRigForm } from "@/components/vehicles/AddRigForm";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Repair guides, upgrades, trails, and news for ${category.description}.`,
  };
}

export function generateStaticParams() {
  return VEHICLE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const vehicles = getVehiclesByCategory(slug);

  const categoryVehicleNames = vehicles.map((v) => `${v.make} ${v.model}`);
  const relevantNews = SAMPLE_NEWS.filter((article) =>
    article.vehicleTags.some((tag) =>
      categoryVehicleNames.some((name) => tag.includes(name.split(" ")[0]))
    )
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="mono text-xs uppercase tracking-widest text-accent mb-2">
          Category
        </p>
        <h1 className="serif text-3xl sm:text-4xl font-bold text-text-bright mb-3">
          {category.name}
        </h1>
        <p className="text-text-muted max-w-2xl">{category.description}</p>
      </div>

      {/* Add your rig */}
      <section className="mb-14">
        <AddRigForm categorySlug={slug} />
      </section>

      {/* Vehicle grid */}
      <section className="mb-14">
        <h2 className="mono text-xs uppercase tracking-widest text-text-dim mb-6">
          Vehicles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.slug}
              href={`/vehicle/${vehicle.slug}`}
              className="group block rounded-lg border border-border bg-bg-elevated p-5 hover:border-accent transition-colors"
            >
              <h3 className="text-base font-semibold text-text-bright group-hover:text-accent transition-colors mb-3">
                {getVehicleLabel(vehicle)}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {vehicle.groundClearance && (
                  <div>
                    <p className="mono text-xs text-text-dim">Clearance</p>
                    <p className="text-sm text-text-muted">
                      {vehicle.groundClearance}&quot;
                    </p>
                  </div>
                )}
                {vehicle.tireSize && (
                  <div>
                    <p className="mono text-xs text-text-dim">Tires</p>
                    <p className="text-sm text-text-muted">{vehicle.tireSize}</p>
                  </div>
                )}
                {vehicle.engineDisplacement && (
                  <div>
                    <p className="mono text-xs text-text-dim">Engine</p>
                    <p className="text-sm text-text-muted">
                      {vehicle.engineDisplacement}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Related news */}
      {relevantNews.length > 0 && (
        <section>
          <h2 className="serif text-2xl font-bold text-text-bright mb-6">
            Related news
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
