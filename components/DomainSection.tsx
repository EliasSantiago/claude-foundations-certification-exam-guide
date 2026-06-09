"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { Domain } from "@/lib/content";
import { useProgress } from "@/components/progress-provider";
import { useLanguage } from "@/components/language-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { domainTaskKey, countDone, percent } from "@/lib/progress";

export default function DomainSection({ domain }: { domain: Domain }) {
  const { authenticated, completed } = useProgress();
  const { t, language } = useLanguage();
  const keys = domain.tasks.map((t) => domainTaskKey(t.code));
  const done = countDone(keys, completed);
  const pct = percent(done, keys.length);

  const domainLabel =
    language === "pt"
      ? "Domínio"
      : language === "es"
        ? "Dominio"
        : "Domain";

  return (
    <section id={`domain-${domain.id}`} className="scroll-mt-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold text-cream">
          <span className="text-claude">{domainLabel} {domain.id}.</span> {domain.title}
        </h2>
        <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-sm font-semibold text-claude">
          {domain.weight}%
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{domain.blurb}</p>

      {authenticated && (
        <div className="mt-5 flex items-center gap-3">
          <Progress value={pct} className="h-2 flex-1" />
          <span className="shrink-0 text-xs font-medium text-muted">
            {done}/{keys.length} {t("completedBadge").toLowerCase()}
          </span>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {domain.tasks.map((task) => (
          <TaskItem key={task.code} task={task} />
        ))}
      </div>
    </section>
  );
}

function TaskItem({ task }: { task: Domain["tasks"][number] }) {
  const [open, setOpen] = useState(false);
  const { authenticated, isDone, toggle } = useProgress();
  const { t } = useLanguage();
  const key = domainTaskKey(task.code);
  const checked = isDone(key);

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-surface transition-colors ${
        checked ? "border-claude-dim" : "border-border"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {authenticated && (
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => toggle(key, v === true)}
            aria-label={`${t("markTaskCompleted")}: ${task.code}`}
          />
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-center gap-3 text-left"
          aria-expanded={open}
        >
          <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-claude-soft">
            {task.code}
          </span>
          <span
            className={`flex-1 text-sm font-medium ${
              checked ? "text-claude-soft" : "text-cream"
            }`}
          >
            {task.title}
          </span>
          <ChevronDown
            className={`size-4 text-muted transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="grid gap-6 border-t border-border px-4 py-5 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-claude">
              {t("knowledgeOf")}
            </h4>
            <ul className="mt-3 space-y-2">
              {task.knowledge.map((k, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-claude-dim" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-claude">
              {t("skillsIn")}
            </h4>
            <ul className="mt-3 space-y-2">
              {task.skills.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-claude-dim" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
