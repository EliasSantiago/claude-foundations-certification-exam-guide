"use client";

import { PageHeader, PageNav } from "@/components/PageShell";
import {
  LoginToTrackHint,
  SectionProgress,
  StudyCheck,
} from "@/components/progress-ui";
import { useLanguage, PageTitle } from "@/components/language-provider";
import { allExerciseKeys, exerciseKey } from "@/lib/progress";

export default function ExercisesPage() {
  const { content, t } = useLanguage();
  const { exercises, navItems } = content;

  const activeNav = navItems.find((n) => n.href === "/exercises");
  const title = activeNav ? activeNav.label : "Exercícios";

  return (
    <div className="prose-guide">
      <PageTitle title={title} />
      <PageHeader
        eyebrow={t("handsOn")}
        title={title}
        intro={t("exercisesIntro")}
      />

      <LoginToTrackHint />
      <SectionProgress keys={allExerciseKeys} noun="exercises" />

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

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <span className="text-xs text-muted">{t("reinforces")}:</span>
              {ex.domains.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-claude-soft"
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <StudyCheck
                itemKey={exerciseKey(ex.id)}
                label={t("markExerciseCompleted")}
              />
            </div>
          </article>
        ))}
      </div>

      <PageNav current="/exercises" />
    </div>
  );
}
