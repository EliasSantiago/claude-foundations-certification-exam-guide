import { PageHeader, PageNav } from "@/components/PageShell";
import { appendix } from "@/lib/content";

export const metadata = { title: "Appendix · Foundations Guide" };

export default function AppendixPage() {
  return (
    <div className="prose-guide">
      <PageHeader
        eyebrow="Reference"
        title="Appendix"
        intro="Technologies and concepts you may see, what's explicitly in and out of scope, and the recommended path to prepare."
      />

      {/* Technologies */}
      <section>
        <h2 className="text-xl font-semibold text-cream">Technologies & concepts</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {appendix.technologies.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <h3 className="text-sm font-semibold text-claude-soft">{t.name}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scope */}
      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-claude-dim/50 bg-surface p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cream">
            <span className="text-claude">✓</span> In scope
          </h2>
          <ul className="mt-4 space-y-2">
            {appendix.inScope.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-claude" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cream">
            <span className="text-muted">✕</span> Out of scope
          </h2>
          <ul className="mt-4 space-y-2">
            {appendix.outOfScope.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted/80">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recommendations */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-cream">
          Exam preparation recommendations
        </h2>
        <ol className="mt-5 space-y-3">
          {appendix.recommendations.map((r, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-muted"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold text-claude">
                {i + 1}
              </span>
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ol>
      </section>

      <PageNav current="/appendix" />
    </div>
  );
}
