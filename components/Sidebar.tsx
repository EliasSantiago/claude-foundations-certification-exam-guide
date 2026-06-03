"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import { navItems } from "@/lib/content";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            <span className="block text-xs text-muted">Foundations · Study Guide</span>
          </span>
        </Link>
        {links}
        <div className="mt-auto pt-6 text-xs text-muted/60">
          Unofficial companion · v0.1
        </div>
      </aside>
    </>
  );
}
