"use client";

import Link from "next/link";
import { CheckCircle2, Trophy } from "lucide-react";

import { useProgress } from "@/components/progress-provider";
import { useLanguage } from "@/components/language-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { UITranslationKeys } from "@/lib/ui-translations";
import {
  allExerciseKeys,
  allItemKeys,
  allScenarioKeys,
  allTaskKeys,
  countDone,
  percent,
} from "@/lib/progress";

/** Inline checkbox to mark a single study item complete. Hidden when logged out. */
export function StudyCheck({
  itemKey,
  label,
}: {
  itemKey: string;
  label?: string;
}) {
  const { authenticated, isDone, toggle } = useProgress();
  const { t } = useLanguage();
  if (!authenticated) return null;

  const checked = isDone(itemKey);
  const displayLabel = label || t("markAsCompleted");

  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => toggle(itemKey, v === true)}
        aria-label={displayLabel}
      />
      <span className={checked ? "font-medium text-claude-soft" : "text-muted"}>
        {checked ? t("completedBadge") : displayLabel}
      </span>
    </label>
  );
}

/** Compact overall meter, used in the sidebar. */
export function OverallProgressMeter() {
  const { authenticated, ready, completed } = useProgress();
  const { t, language } = useLanguage();
  if (!authenticated) return null;

  const done = countDone(allItemKeys, completed);
  const pct = percent(done, allItemKeys.length);

  return (
    <div className="rounded-xl border border-border bg-surface/60 p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-cream">{t("yourProgress")}</span>
        <span className="font-semibold text-claude-soft">
          {ready ? `${pct}%` : "…"}
        </span>
      </div>
      <Progress value={ready ? pct : 0} className="mt-2 h-1.5" />
      <p className="mt-2 text-[11px] text-muted">
        {done} {language === "en" ? "of" : "de"} {allItemKeys.length} {t("itemsCompleted")}
      </p>
    </div>
  );
}

function SectionRow({
  label,
  keys,
  href,
}: {
  label: string;
  keys: string[];
  href: string;
}) {
  const { completed } = useProgress();
  const done = countDone(keys, completed);
  const pct = percent(done, keys.length);
  return (
    <Link
      href={href}
      className="block rounded-xl border border-border bg-surface p-4 transition hover:border-claude-dim"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-cream">{label}</span>
        <span className="shrink-0 text-sm text-muted">
          <span className="font-semibold text-claude-soft">{done}</span>/
          {keys.length}
        </span>
      </div>
      <Progress value={pct} className="mt-3 h-2" />
    </Link>
  );
}

/** Full progress dashboard for the Overview page. */
export function ProgressDashboard() {
  const { authenticated, ready, completed } = useProgress();
  const { t, language } = useLanguage();

  if (!authenticated) {
    return (
      <div className="rounded-2xl border border-claude-dim bg-surface p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-claude/15 text-claude-soft">
            <Trophy className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-cream">
              {t("trackYourEvolution")}
            </h2>
            <p className="mt-1 max-w-prose text-sm text-muted">
              {t("createAccountCTAPrompt")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/register">{t("createAccount")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">{t("signIn")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const done = countDone(allItemKeys, completed);
  const pct = percent(done, allItemKeys.length);
  const complete = pct === 100;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="sm:w-56">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold text-claude">
              {ready ? `${pct}%` : "…"}
            </span>
            {complete && <CheckCircle2 className="size-6 text-claude" />}
          </div>
          <p className="mt-1 text-sm text-muted">
            {done} {language === "en" ? "of" : "de"} {allItemKeys.length} {t("itemsCompleted")}
          </p>
          <Progress value={ready ? pct : 0} className="mt-3" />
        </div>

        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          <SectionRow
            label={t("domains")}
            keys={allTaskKeys}
            href="/domains"
          />
          <SectionRow
            label={t("scenarios")}
            keys={allScenarioKeys}
            href="/scenarios"
          />
          <SectionRow
            label={t("exercises")}
            keys={allExerciseKeys}
            href="/exercises"
          />
        </div>
      </div>
    </div>
  );
}

/** Per-section progress bar with a heading, used at the top of section pages. */
export function SectionProgress({
  keys,
  noun,
}: {
  keys: string[];
  noun: string;
}) {
  const { authenticated, ready, completed } = useProgress();
  const { t, language } = useLanguage();
  if (!authenticated) return null;

  const done = countDone(keys, completed);
  const pct = percent(done, keys.length);

  const completedText =
    language === "en"
      ? "completed"
      : language === "es"
        ? "completados"
        : "concluídos";
  const ofText = language === "en" ? "of" : "de";

  return (
    <div className="mb-8 rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-cream">
          {done} {ofText} {keys.length} {t(noun as UITranslationKeys).toLowerCase()} {completedText}
        </span>
        <span className="font-semibold text-claude-soft">
          {ready ? `${pct}%` : "…"}
        </span>
      </div>
      <Progress value={ready ? pct : 0} className="mt-3" />
    </div>
  );
}

/** Subtle hint shown to logged-out users on trackable pages. */
export function LoginToTrackHint() {
  const { authenticated, ready } = useProgress();
  const { t } = useLanguage();
  if (!ready || authenticated) return null;

  return (
    <div className="mb-8 flex flex-col gap-3 rounded-xl border border-claude-dim bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
        <Link href="/login" className="font-medium text-claude-soft hover:underline">
          {t("signIn")}
        </Link>{" "}
        {t("or")}{" "}
        <Link
          href="/register"
          className="font-medium text-claude-soft hover:underline"
        >
          {t("createAccount").toLowerCase()}
        </Link>{" "}
        {t("loginToTrackPrompt").substring(t("loginToTrackPrompt").indexOf(t("or")) + t("or").length)}
      </p>
    </div>
  );
}
