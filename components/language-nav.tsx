"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const isEnglishPath = (path: string) =>
  path === "/en" || path.startsWith("/en/") || path.startsWith("/posts/en/");

// Header links that depend on the current language: Home goes to the home
// of that language
export function LanguageNav() {
  const english = isEnglishPath(usePathname());
  return (
    <nav className="flex gap-4 text-sm">
      <Link href={english ? "/en" : "/"}>Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

// Icon button that switches language: to the translation of the current post
// when one exists, otherwise to the other language's home
export function LanguageToggle({
  counterparts,
}: {
  counterparts: Record<string, string>;
}) {
  const pathname = usePathname();
  const english = isEnglishPath(pathname);
  const other = counterparts[pathname] ?? (english ? "/" : "/en");
  const label = english ? "한국어로 보기" : "View in English";

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href={other} hrefLang={english ? "ko" : "en"} title={label}>
        <span className="sr-only">{label}</span>
        {/* Material Icons "translate" (Apache 2.0) */}
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
        </svg>
      </Link>
    </Button>
  );
}

export function SiteTitle() {
  const english = isEnglishPath(usePathname());
  return (
    <Link href={english ? "/en" : "/"} className="font-medium">
      <div>Dongho Seo</div>
      <div className="text-sm font-light">Engineering notes</div>
    </Link>
  );
}
