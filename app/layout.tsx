import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import MusicPlayer from "@/components/MusicPlayer";
import { LanguageSelector } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

// Body copy: Inter - a clean, modern workhorse.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Titles & subtitles: Space Grotesk - modern with character.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Inline code.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claude Certified Architect · Foundations Guide",
  description:
    "An intuitive study guide for the Claude Certified Architect - Foundations certification: domains, scenarios, interactive practice questions, and hands-on exercises.",
};

// Applied before paint to avoid a flash of the wrong theme. Light is the default.
const themeScript = `
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          {/* Desktop Global Controls Bar */}
          <div className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-2.5">
            <MusicPlayer className="relative" />
            <LanguageSelector />
            <ThemeToggle />
          </div>
          {/* Mobile Music Player (only visible on mobile, positioned bottom-right) */}
          <MusicPlayer className="fixed bottom-4 right-4 md:hidden" />
        </Providers>
      </body>
    </html>
  );
}
