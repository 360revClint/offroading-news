import Link from "next/link";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import { SAMPLE_NEWS } from "@/lib/sample-news";
import { NewsCard } from "@/components/articles/NewsCard";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <p className="mono text-lg sm:text-xl uppercase tracking-widest text-accent mb-4">
          Where the pavement ends, we begin
        </p>
        <h1 className="serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text-bright mb-4">
          Pick your rig.
          <br />
          <span className="text-accent">Get everything you need.</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-6">
          Repair guides, upgrade walkthroughs, trail recommendations, and breaking news — filtered to your specific machine.
        </p>
        <p className="text-base text-text-muted max-w-xl mx-auto">
          The off-road starts past the last mile marker. We built offroading.news for the riders and drivers who live out there — real guides, honest specs, and AI-curated news matched to your exact machine.
        </p>
      </section>

      {/* Vehicle category picker */}
      <section className="mb-16">
        <h2 className="mono text-xs uppercase tracking-widest text-text-dim mb-6 text-center">
          Choose your category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VEHICLE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group block rounded-lg border border-border bg-bg-elevated p-6 hover:border-accent transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-bright group-hover:text-accent transition-colors mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-text-muted">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="serif text-2xl font-bold text-text-bright">Latest news</h2>
          <Link
            href="/news"
            className="text-sm text-accent hover:text-accent/80 transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_NEWS.slice(0, 4).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
