import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { meta } from "@/lib/content";

// Home: the Claude mark, front and center, on warm near-black — with a quiet
// entry point into the guide.
export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
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
          {meta.title} — {meta.subtitle}
        </p>

        <Link
          href="/overview"
          className="group mt-12 inline-flex items-center gap-2 rounded-full bg-claude px-7 py-3 text-sm font-medium text-on-claude transition hover:bg-claude-soft"
        >
          Enter the guide
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <p className="absolute bottom-6 text-xs text-muted/70">
        Study guide · v0.1 · Unofficial companion
      </p>
    </main>
  );
}
