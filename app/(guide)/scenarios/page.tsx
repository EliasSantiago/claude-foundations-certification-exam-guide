import { PageHeader, PageNav } from "@/components/PageShell";
import { scenarios } from "@/lib/content";

export const metadata = { title: "Scenarios · Foundations Guide" };

export default function ScenariosPage() {
  return (
    <div className="prose-guide">
      <PageHeader
        eyebrow="Exam context"
        title="The six scenarios"
        intro="The exam presents 4 scenarios picked at random from these 6. Each frames a realistic production context for a set of questions. Know the moving parts of each."
      />

      <div className="space-y-5">
        {scenarios.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-border bg-surface p-6 transition hover:border-claude-dim"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-semibold text-claude">
                {s.id}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-cream">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.domains.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-claude-soft"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <PageNav current="/scenarios" />
    </div>
  );
}
