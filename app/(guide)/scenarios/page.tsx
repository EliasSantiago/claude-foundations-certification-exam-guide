"use client";

import { PageHeader, PageNav } from "@/components/PageShell";
import {
  LoginToTrackHint,
  SectionProgress,
  StudyCheck,
} from "@/components/progress-ui";
import { useLanguage, PageTitle } from "@/components/language-provider";
import { allScenarioKeys, scenarioKey } from "@/lib/progress";

export default function ScenariosPage() {
  const { content, t } = useLanguage();
  const { scenarios, navItems } = content;

  const activeNav = navItems.find((n) => n.href === "/scenarios");
  const title = activeNav ? activeNav.label : "Cenários";

  return (
    <div className="prose-guide">
      <PageTitle title={title} />
      <PageHeader
        eyebrow={t("examContext")}
        title={title}
        intro={t("scenariosIntro")}
      />

      <LoginToTrackHint />
      <SectionProgress keys={allScenarioKeys} noun="scenarios" />

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
                <div className="mt-5 border-t border-border pt-4">
                  <StudyCheck
                    itemKey={scenarioKey(s.id)}
                    label={t("markScenarioStudied")}
                  />
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
