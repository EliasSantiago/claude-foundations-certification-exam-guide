import { PageHeader, PageNav } from "@/components/PageShell";
import DomainSection from "@/components/DomainSection";
import { domains } from "@/lib/content";

export const metadata = { title: "Domains · Foundations Guide" };

export default function DomainsPage() {
  return (
    <div className="prose-guide">
      <PageHeader
        eyebrow="Content outline"
        title="Domains & task statements"
        intro="The five scored domains and their task statements. Expand any task to see the knowledge and skills it tests. Jump to a domain below."
      />

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
