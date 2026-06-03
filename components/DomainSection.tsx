"use client";

import { useState } from "react";
import type { Domain } from "@/lib/content";

export default function DomainSection({ domain }: { domain: Domain }) {
  return (
    <section id={`domain-${domain.id}`} className="scroll-mt-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold text-cream">
          <span className="text-claude">Domain {domain.id}.</span> {domain.title}
        </h2>
        <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-sm font-semibold text-claude">
          {domain.weight}%
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{domain.blurb}</p>

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
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-surface-2"
        aria-expanded={open}
      >
        <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-claude-soft">
          {task.code}
        </span>
        <span className="flex-1 text-sm font-medium text-cream">{task.title}</span>
        <span
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="grid gap-6 border-t border-border px-4 py-5 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-claude">
              Knowledge of
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
              Skills in
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
