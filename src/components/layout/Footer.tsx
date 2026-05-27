import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-dim">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Pick your rig, get everything you need.
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-text-muted hover:text-text-bright transition-colors">
              About
            </Link>
            <Link href="/api/feed" className="text-sm text-text-muted hover:text-text-bright transition-colors">
              RSS
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
