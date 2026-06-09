"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import { useLanguage } from "@/components/language-provider";
import { LanguageSelector } from "@/components/Sidebar";

// Home: the Claude mark, front and center, on warm near-black - with a quiet
// entry point into the guide.
export default function Home() {
  const { content, t } = useLanguage();
  const { meta } = content;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Language switcher top right */}
      <div className="absolute right-6 top-6 z-30 md:hidden">
        <LanguageSelector />
      </div>

      {/* Soft radial glow behind the mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
              "radial-gradient(circle at 50% 42%, rgba(217,119,87,0.18), transparent 55%)",
        }}
      />

      <div className="relative flex flex-col items-center animate-fade-up">
        <BrandLogo
          spin
          priority
          className="h-36 w-36 drop-shadow-[0_0_45px_rgba(217,119,87,0.35)] sm:h-48 sm:w-48"
        />

        <h1 className="mt-10 text-4xl font-semibold tracking-tight text-cream sm:text-6xl">
          Claude
        </h1>
        <p className="mt-3 max-w-md text-base text-muted sm:text-lg">
          {meta.title} - {meta.subtitle}
        </p>
        <p className="mt-4 max-w-sm text-xs text-muted/60">
          {t("loginRequiredHint")}
        </p>

        <Button
          asChild
          className="group mt-10 rounded-full bg-claude px-7 py-6 text-sm font-medium text-on-claude transition hover:bg-claude-soft"
        >
          <Link href="/overview">
            {t("enterGuide")}
          </Link>
        </Button>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Link
            href="/login"
            className="font-medium text-cream transition hover:text-claude-soft"
          >
            {t("signIn")}
          </Link>
          <span className="text-border">·</span>
          <Link
            href="/register"
            className="font-medium text-cream transition hover:text-claude-soft"
          >
            {t("createAccount")}
          </Link>
        </div>
      </div>

      <p className="absolute bottom-6 text-xs text-muted/70">
        Orkestrai 2026
      </p>
    </main>
  );
}
