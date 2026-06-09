"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import { OverallProgressMeter } from "./progress-ui";
import { useLanguage, Language } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const flags: Record<Language, string> = {
    en: "🇺🇸",
    pt: "🇧🇷",
    es: "🇪🇸",
  };

  const labelShort: Record<Language, string> = {
    en: "EN",
    pt: "PT",
    es: "ES",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-xs font-semibold text-muted transition hover:text-cream cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            className
          )}
          aria-label="Change language"
        >
          <span className="text-sm shrink-0 leading-none">{flags[language]}</span>
          <span className="uppercase">{labelShort[language]}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-surface border-border">
        <DropdownMenuItem onClick={() => setLanguage("pt")} className="gap-2">
          <span className="text-base shrink-0 leading-none">🇧🇷</span>
          <span>Português (PT)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")} className="gap-2">
          <span className="text-base shrink-0 leading-none">🇺🇸</span>
          <span>English (EN)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")} className="gap-2">
          <span className="text-base shrink-0 leading-none">🇪🇸</span>
          <span>Español (ES)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { content, t } = useLanguage();
  const { navItems } = content;

  const links = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`group rounded-lg px-3 py-2.5 transition ${
              active
                ? "bg-surface-2 text-cream"
                : "text-muted hover:bg-surface hover:text-cream"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`h-1.5 w-1.5 rounded-full transition ${
                  active ? "bg-claude" : "bg-border group-hover:bg-claude-dim"
                }`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </span>
            <span className="ml-4 block text-xs text-muted/70">{item.desc}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo className="h-6 w-6" />
          <span className="text-sm font-semibold text-cream">Claude · Foundations</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="rounded-md border border-border p-2 text-muted hover:text-cream"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-border bg-surface p-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mb-6 flex items-center gap-2"
            >
              <BrandLogo className="h-7 w-7" />
              <span className="text-sm font-semibold text-cream">
                Claude · Foundations
              </span>
            </Link>
            {links}
            <div className="mt-6 space-y-4 border-t border-border pt-6">
              <OverallProgressMeter />
              <div className="flex items-center justify-between gap-3">
                <UserMenu />
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border bg-surface/40 p-5 md:flex">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <BrandLogo className="h-8 w-8" />
          <span>
            <span className="block text-sm font-semibold leading-tight text-cream">
              Claude Certified Architect
            </span>
            <span className="block text-xs text-muted">{t("studyGuideSubtitle")}</span>
          </span>
        </Link>
        {links}
        <div className="mt-auto space-y-4 pt-6">
          <OverallProgressMeter />
          <div className="flex items-center justify-between gap-3">
            <UserMenu />
          </div>
        </div>
      </aside>
    </>
  );
}
