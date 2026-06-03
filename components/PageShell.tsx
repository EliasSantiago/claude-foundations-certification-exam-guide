import Link from "next/link";
import { navItems } from "@/lib/content";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-10 animate-fade-up border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-claude">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </header>
  );
}

// Prev / next navigation derived from the sidebar ordering.
export function PageNav({ current }: { current: string }) {
  const idx = navItems.findIndex((n) => n.href === current);
  const prev = idx > 0 ? navItems[idx - 1] : null;
  const next = idx >= 0 && idx < navItems.length - 1 ? navItems[idx + 1] : null;

  return (
    <nav className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex-1 rounded-xl border border-border bg-surface p-4 transition hover:border-claude-dim"
        >
          <span className="text-xs text-muted">← Previous</span>
          <span className="mt-1 block font-medium text-cream group-hover:text-claude-soft">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex-1 rounded-xl border border-border bg-surface p-4 text-right transition hover:border-claude-dim"
        >
          <span className="text-xs text-muted">Next →</span>
          <span className="mt-1 block font-medium text-cream group-hover:text-claude-soft">
            {next.label}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
