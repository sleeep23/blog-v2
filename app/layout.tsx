import "./styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import Github from "@/components/icons/github";
import Twitter from "@/components/icons/twitter";
import Link from "next/link";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Sleeep23's space",
  description: "A passionate front-end engineer's blog",
  authors: [
    {
      name: "sleeep23",
      url: "https://sleeep23.vercel.app",
    },
  ],
  creator: "sleeep23",
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
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          crossOrigin="anonymous"
        ></link>
      </head>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${fontSans.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  <div>Sleeep23&apos; space</div>
                  <div className="text-sm font-light">Front-end Engineer</div>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <nav>
                    <Link href="/">Home</Link>
                  </nav>
                  <nav>
                    <Github />
                    <Twitter />
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
