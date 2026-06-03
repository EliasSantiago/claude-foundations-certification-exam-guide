"use client";

import { useMemo, useState } from "react";
import { questions } from "@/lib/content";

type Choice = "A" | "B" | "C" | "D";

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, Choice>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const answeredCount = Object.keys(revealed).length;
  const correctCount = useMemo(
    () =>
      questions.reduce(
        (n, q) => (revealed[q.id] && answers[q.id] === q.answer ? n + 1 : n),
        0,
      ),
    [answers, revealed],
  );

  const select = (qid: number, choice: Choice) => {
    if (revealed[qid]) return; // lock after reveal
    setAnswers((a) => ({ ...a, [qid]: choice }));
  };
  const reveal = (qid: number) => {
    if (!answers[qid]) return;
    setRevealed((r) => ({ ...r, [qid]: true }));
  };
  const reset = () => {
    setAnswers({});
    setRevealed({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allDone = answeredCount === questions.length;

  return (
    <div>
      {/* Sticky progress / score bar */}
      <div className="sticky top-0 z-20 -mx-5 mb-8 border-b border-border bg-background/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted">
              Answered{" "}
              <span className="font-semibold text-cream">
                {answeredCount}/{questions.length}
              </span>
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-sm text-muted">
              Score{" "}
              <span
                className={`font-semibold ${
                  allDone && correctCount / questions.length >= 0.72
                    ? "text-claude"
                    : "text-cream"
                }`}
              >
                {correctCount}/{answeredCount || 0}
              </span>
            </span>
          </div>
          <button
            onClick={reset}
            className="rounded-md border border-border px-3 py-1.5 text-xs text-muted transition hover:text-cream"
          >
            Reset
          </button>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-claude transition-all duration-500"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {allDone && (
        <div className="mb-8 animate-fade-up rounded-2xl border border-claude-dim bg-surface p-6 text-center">
          <p className="text-sm text-muted">You scored</p>
          <p className="mt-1 text-4xl font-semibold text-claude">
            {Math.round((correctCount / questions.length) * 100)}%
          </p>
          <p className="mt-2 text-sm text-muted">
            {correctCount} of {questions.length} correct ·{" "}
            {correctCount / questions.length >= 0.72
              ? "Above the 72% passing line on these samples — keep it up."
              : "Below the 72% line on these samples — review the explanations and the domains."}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, i) => {
          const picked = answers[q.id];
          const isRevealed = revealed[q.id];
          const isCorrect = picked === q.answer;
          return (
            <article
              key={q.id}
              className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold text-claude">
                  {i + 1}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  {q.scenario}
                </span>
              </div>

              <p className="text-[15px] leading-relaxed text-cream">{q.prompt}</p>

              <div className="mt-4 space-y-2.5">
                {q.options.map((opt) => {
                  const selected = picked === opt.key;
                  const isAnswer = opt.key === q.answer;

                  let cls =
                    "border-border bg-surface-2/40 hover:border-claude-dim";
                  if (isRevealed) {
                    if (isAnswer)
                      cls = "border-claude bg-claude/10 text-cream";
                    else if (selected)
                      cls = "border-red-500/60 bg-red-500/10";
                    else cls = "border-border opacity-60";
                  } else if (selected) {
                    cls = "border-claude bg-claude/10";
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => select(q.id, opt.key)}
                      disabled={isRevealed}
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${cls} ${
                        isRevealed ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                          isRevealed && isAnswer
                            ? "border-claude bg-claude text-[#1a120e]"
                            : isRevealed && selected
                              ? "border-red-500 text-red-400"
                              : selected
                                ? "border-claude text-claude"
                                : "border-border text-muted"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-muted-foreground text-cream/90">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-3">
                {!isRevealed ? (
                  <button
                    onClick={() => reveal(q.id)}
                    disabled={!picked}
                    className="rounded-lg bg-claude px-4 py-2 text-sm font-medium text-[#1a120e] transition enabled:hover:bg-claude-soft disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Check answer
                  </button>
                ) : (
                  <span
                    className={`text-sm font-semibold ${
                      isCorrect ? "text-claude" : "text-red-400"
                    }`}
                  >
                    {isCorrect
                      ? "✓ Correct"
                      : `✗ Incorrect — correct answer is ${q.answer}`}
                  </span>
                )}
              </div>

              {isRevealed && (
                <div className="mt-4 animate-fade-up rounded-xl border border-border bg-surface-2/50 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-claude">
                    Why
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {q.explanation}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
