import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      {/* Soft coral glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(217,119,87,0.16), transparent 55%)",
        }}
      />

      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      <Link
        href="/"
        className="relative mb-8 flex flex-col items-center gap-3 text-center"
      >
        <BrandLogo className="h-12 w-12" />
        <span>
          <span className="block font-display text-sm font-semibold text-cream">
            Claude Certified Architect
          </span>
          <span className="block text-xs text-muted">
            Foundations · Study Guide
          </span>
        </span>
      </Link>

      <div className="relative w-full max-w-md animate-fade-up">{children}</div>
    </div>
  );
}
