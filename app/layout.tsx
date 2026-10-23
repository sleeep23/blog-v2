import "katex/dist/katex.min.css";
import "./styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import Github from "@/components/icons/github";
import Homepage from "@/components/icons/homepage";
import Mail from "@/components/icons/mail";
import {
  LanguageNav,
  LanguageToggle,
  SiteTitle,
} from "@/components/language-nav";
import { getCounterparts } from "@/lib/posts";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Dongho Seo · Engineering notes",
    template: "%s · Dongho Seo",
  },
  description:
    "Engineering notes by Dongho Seo — things I built, wrestled with, and studied.",
  authors: [
    {
      name: "Dongho Seo",
      url: "https://dongho-seo.me",
    },
  ],
  creator: "Dongho Seo",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // next-themes sets the theme class on <html> before hydration
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${fontSans.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                <SiteTitle />
                <div className="flex items-center justify-between gap-4">
                  <LanguageNav />
                  <nav className="flex">
                    <Homepage />
                    <Github />
                    <Mail />
                    <LanguageToggle counterparts={getCounterparts()} />
                    <ModeToggle />
                  </nav>
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
