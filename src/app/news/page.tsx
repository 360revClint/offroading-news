import type { Metadata } from "next";
import { SAMPLE_NEWS } from "@/lib/sample-news";
import { NewsCard } from "@/components/articles/NewsCard";

export const metadata: Metadata = {
  title: "News",
  description:
    "AI-curated off-roading news — recalls, new models, gear drops, and industry moves, tagged to the vehicles that matter to you.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="mono text-xs uppercase tracking-widest text-accent-news mb-2">
          AI-curated
        </p>
        <h1 className="serif text-3xl sm:text-4xl font-bold text-text-bright mb-3">
          Off-road news
        </h1>
        <p className="text-text-muted max-w-2xl">
          Recalls, new models, gear drops, and industry moves — pulled from
          trusted sources, summarized by AI, and tagged to your machine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SAMPLE_NEWS.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
