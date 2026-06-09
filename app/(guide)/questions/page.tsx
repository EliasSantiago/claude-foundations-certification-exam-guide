"use client";

import { PageHeader, PageNav } from "@/components/PageShell";
import Quiz from "@/components/Quiz";
import { useLanguage, PageTitle } from "@/components/language-provider";

export default function QuestionsPage() {
  const { content, t } = useLanguage();
  const { navItems } = content;

  const activeNav = navItems.find((n) => n.href === "/questions");
  const title = activeNav ? activeNav.label : "Perguntas de Prática";

  return (
    <div className="prose-guide">
      <PageTitle title={title} />
      <PageHeader
        eyebrow={t("practice")}
        title={title}
        intro={t("questionsIntro")}
      />
      <Quiz />
      <PageNav current="/questions" />
    </div>
  );
}
