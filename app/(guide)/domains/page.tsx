"use client";

import { PageHeader, PageNav } from "@/components/PageShell";
import DomainSection from "@/components/DomainSection";
import { LoginToTrackHint, SectionProgress } from "@/components/progress-ui";
import { useLanguage, PageTitle } from "@/components/language-provider";
import { allTaskKeys } from "@/lib/progress";

export default function DomainsPage() {
  const { content, t } = useLanguage();
  const { domains, navItems } = content;

  const activeNav = navItems.find((n) => n.href === "/domains");
  const title = activeNav ? activeNav.label : "Domínios";

  return (
    <div className="prose-guide">
      <PageTitle title={title} />
      <PageHeader
        eyebrow={t("contentOutline")}
        title={title}
        intro={t("domainsIntro")}
      />

      <LoginToTrackHint />
      <SectionProgress keys={allTaskKeys} noun="topics" />

      {/* Jump links */}
      <div className="mb-12 flex flex-wrap gap-2">
        {domains.map((d) => (
          <a
            key={d.id}
            href={`#domain-${d.id}`}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:border-claude-dim hover:text-cream"
          >
            <span className="text-claude">{d.id}</span> · {d.title} ({d.weight}%)
          </a>
        ))}
      </div>

      <div className="space-y-14">
        {domains.map((d) => (
          <DomainSection key={d.id} domain={d} />
        ))}
      </div>

      <PageNav current="/domains" />
    </div>
  );
}
