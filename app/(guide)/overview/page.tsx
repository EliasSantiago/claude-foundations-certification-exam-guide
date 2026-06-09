"use client";

import Link from "next/link";
import { PageHeader, PageNav } from "@/components/PageShell";
import { ProgressDashboard } from "@/components/progress-ui";
import { useLanguage, PageTitle } from "@/components/language-provider";

export default function OverviewPage() {
  const { content, t } = useLanguage();
  const { meta, intro, domains, navItems } = content;

  const activeNav = navItems.find((n) => n.href === "/overview");
  const title = activeNav ? activeNav.label : "Visão Geral";

  return (
    <div className="prose-guide">
      <PageTitle title={title} />
      <PageHeader
        eyebrow={t("startHere")}
        title={title}
        intro={t("overviewIntro")}
      />

      {/* Personal progress / sign-up CTA */}
      <div className="mb-10">
        <ProgressDashboard />
      </div>

      {/* Quick stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: t("score") === "Pontuação" ? "Pontuação de aprovação" : t("score") === "Puntuación" ? "Puntuación de aprobación" : "Passing score", v: String(meta.passingScore) },
          { k: t("score") === "Pontuação" ? "Faixa de pontuação" : t("score") === "Puntuación" ? "Rango de puntuación" : "Score range", v: meta.scoreRange },
          { k: t("domains"), v: "5" },
          { k: t("scenarios"), v: "4" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-xl border border-border bg-surface p-4 text-center"
          >
            <div className="text-2xl font-semibold text-claude">{s.v}</div>
            <div className="mt-1 text-xs text-muted">{s.k}</div>
          </div>
        ))}
      </div>

      <section className="mt-10 space-y-4">
        {intro.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {/* Domain weighting bars */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-cream">
          {t("score") === "Pontuação" ? "Domínios de conteúdo e peso" : t("score") === "Puntuación" ? "Dominios de contenido y peso" : "Content domains & weighting"}
        </h2>
        <div className="mt-5 space-y-4">
          {domains.map((d) => (
            <Link
              key={d.id}
              href={`/domains#domain-${d.id}`}
              className="block rounded-xl border border-border bg-surface p-4 transition hover:border-claude-dim"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-cream">
                  {t("domains").slice(0, -1)} {d.id}: {d.title}
                </span>
                <span className="shrink-0 text-sm font-semibold text-claude">
                  {d.weight}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-claude"
                  style={{ width: `${(d.weight / 27) * 100}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Target candidate */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-cream">
          {t("score") === "Pontuação" ? "Candidato ideal" : t("score") === "Puntuación" ? "Candidato ideal" : "Target candidate"}
        </h2>
        <p className="mt-3">{intro.candidate.summary}</p>
        <ul className="mt-4 space-y-2">
          {intro.candidate.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-claude" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Exam facts */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-cream">
          {t("score") === "Pontuação" ? "Formato e conteúdo do exame" : t("score") === "Puntuación" ? "Formato y contenido del examen" : "Exam content & format"}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {intro.examFacts.map((f) => (
            <div
              key={f.label}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="text-sm font-semibold text-claude-soft">{f.label}</h3>
              <p className="mt-2 text-sm text-muted">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      <PageNav current="/overview" />
    </div>
  );
}
