"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import * as contentEn from "@/lib/content_en";
import * as contentPt from "@/lib/content_pt";
import * as contentEs from "@/lib/content_es";
import { uiTranslations, UITranslationKeys } from "@/lib/ui-translations";

export type Language = "en" | "pt" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: typeof contentEn;
  t: (key: UITranslationKeys) => string;
  mounted: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Language;
      if (saved === "en" || saved === "pt" || saved === "es") {
        setLanguageState(saved);
      } else {
        // Fallback to browser locale if available
        const locale = navigator.language.slice(0, 2);
        if (locale === "en") {
          setLanguageState("en");
        } else if (locale === "es") {
          setLanguageState("es");
        } else {
          setLanguageState("pt");
        }
      }
    } catch {}
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  };

  const content = useMemo(() => {
    if (!mounted) return contentEn; // Fallback for hydration
    switch (language) {
      case "pt":
        return contentPt;
      case "es":
        return contentEs;
      case "en":
      default:
        return contentEn;
    }
  }, [language, mounted]);

  const t = useMemo(() => {
    return (key: UITranslationKeys): string => {
      const dict = (uiTranslations[language] || uiTranslations.en) as Record<UITranslationKeys, string>;
      return dict[key] || (uiTranslations.en as Record<UITranslationKeys, string>)[key] || key;
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      content,
      t,
      mounted,
    }),
    [language, content, t, mounted]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} · Foundations Guide`;
  }, [title]);
  return null;
}
