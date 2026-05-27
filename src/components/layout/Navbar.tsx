import Link from "next/link";
import { SITE_NAME, VEHICLE_CATEGORIES } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="border-b border-border bg-bg-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-accent">{SITE_NAME}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {VEHICLE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-text-muted hover:text-text-bright transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/news"
                className="text-sm text-text-muted hover:text-accent-news transition-colors"
              >
                News
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
            >
              Submit a story
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
