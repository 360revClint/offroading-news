import Link from "next/link";
import type { NewsArticle } from "@/lib/sample-news";

function timeAgo(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  const days = Math.floor(seconds / 86400);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-lg border border-border bg-bg-elevated p-5 hover:border-accent-news transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="mono text-xs uppercase tracking-wide text-accent-news">
            News
          </span>
          {article.sourceName && (
            <>
              <span className="text-text-dim">·</span>
              <span className="mono text-xs text-text-dim">
                {article.sourceName}
              </span>
            </>
          )}
        </div>
        <time
          dateTime={article.publishedAt}
          className="mono text-xs text-text-dim shrink-0"
        >
          {timeAgo(article.publishedAt)}
        </time>
      </div>

      <h3 className="serif text-lg font-semibold text-text-bright group-hover:text-accent-news transition-colors mb-2 leading-snug">
        {article.title}
      </h3>

      <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-3">
        {article.summary}
      </p>

      {article.vehicleTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {article.vehicleTags.map((tag) => (
            <span
              key={tag}
              className="mono text-xs px-2 py-0.5 rounded bg-surface text-text-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
