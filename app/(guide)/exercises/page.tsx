import { PageHeader, PageNav } from "@/components/PageShell";
import { exercises } from "@/lib/content";

export const metadata = { title: "Exercises · Foundations Guide" };

export default function ExercisesPage() {
  return (
    <div className="prose-guide">
      <PageHeader
        eyebrow="Hands-on"
        title="Preparation exercises"
        intro="Four labs that build practical familiarity across the domains. Work through them with the Agent SDK, Claude Code, and the Claude API to turn knowledge into judgment."
      />

      <div className="space-y-6">
        {exercises.map((ex) => (
          <article
            key={ex.id}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-sm font-semibold text-claude">
                {ex.id}
              </span>
              <h2 className="text-lg font-semibold text-cream">{ex.title}</h2>
            </div>

            <p className="mt-3 text-sm italic text-claude-soft">{ex.objective}</p>

            <ol className="mt-5 space-y-3">
              {ex.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium text-claude">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
              <span className="text-xs text-muted">Reinforces:</span>
              {ex.domains.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-claude-soft"
                >
                  {d}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <PageNav current="/exercises" />
    </div>
  );
}
