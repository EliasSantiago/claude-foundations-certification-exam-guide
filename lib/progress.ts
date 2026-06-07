import { domains, scenarios, exercises } from "@/lib/content";

// Stable keys for each trackable study item.
export const domainTaskKey = (code: string) => `domain:${code}`;
export const scenarioKey = (id: number) => `scenario:${id}`;
export const exerciseKey = (id: number) => `exercise:${id}`;

export const allTaskKeys = domains.flatMap((d) =>
  d.tasks.map((t) => domainTaskKey(t.code)),
);
export const allScenarioKeys = scenarios.map((s) => scenarioKey(s.id));
export const allExerciseKeys = exercises.map((e) => exerciseKey(e.id));

export const allItemKeys = [
  ...allTaskKeys,
  ...allScenarioKeys,
  ...allExerciseKeys,
];

export const totalItems = allItemKeys.length;

// Count how many keys in a list are present in a completed set.
export function countDone(keys: string[], completed: Set<string>) {
  return keys.reduce((n, k) => (completed.has(k) ? n + 1 : n), 0);
}

export function percent(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}
