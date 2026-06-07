"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";

type ProgressContextValue = {
  /** True once we know the auth state (and, when logged in, have loaded progress). */
  ready: boolean;
  authenticated: boolean;
  completed: Set<string>;
  isDone: (key: string) => boolean;
  toggle: (key: string, next: boolean) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const authenticated = status === "authenticated";
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  // Load the user's completed items whenever they become authenticated.
  useEffect(() => {
    if (status === "loading") {
      setReady(false);
      return;
    }
    if (!authenticated) {
      setCompleted(new Set());
      setReady(true);
      return;
    }

    let active = true;
    setReady(false);
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data: { items?: string[] }) => {
        if (active) {
          setCompleted(new Set(data.items ?? []));
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, [authenticated, status]);

  const toggle = useCallback((key: string, next: boolean) => {
    // Optimistic update.
    setCompleted((prev) => {
      const updated = new Set(prev);
      if (next) updated.add(key);
      else updated.delete(key);
      return updated;
    });

    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemKey: key, completed: next }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to persist progress");
      })
      .catch(() => {
        // Revert on failure.
        setCompleted((prev) => {
          const reverted = new Set(prev);
          if (next) reverted.delete(key);
          else reverted.add(key);
          return reverted;
        });
      });
  }, []);

  const isDone = useCallback((key: string) => completed.has(key), [completed]);

  return (
    <ProgressContext.Provider
      value={{ ready, authenticated, completed, isDone, toggle }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
