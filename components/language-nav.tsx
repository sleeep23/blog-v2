"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const isEnglishPath = (path: string) =>
  path === "/en" || path.startsWith("/en/") || path.startsWith("/posts/en/");

// Links in the header that depend on the current language: Home goes to the
// home of that language, and KO / EN jumps to the translation of the current
// post when one exists, otherwise to the other language's home.
export function LanguageNav({
  counterparts,
}: {
  counterparts: Record<string, string>;
}) {
  const pathname = usePathname();
  const english = isEnglishPath(pathname);
  const home = english ? "/en" : "/";
  const other = counterparts[pathname] ?? (english ? "/" : "/en");

  return (
    <nav className="flex gap-4 text-sm">
      <Link href={home}>Home</Link>
      <Link href="/about">About</Link>
      <span className="flex gap-1 text-gray-400">
        {english ? (
          <>
            <Link href={other} hrefLang="ko" className="hover:text-gray-600">
              KO
            </Link>
            /<span className="text-slate-900 dark:text-slate-100">EN</span>
          </>
        ) : (
          <>
            <span className="text-slate-900 dark:text-slate-100">KO</span>/
            <Link href={other} hrefLang="en" className="hover:text-gray-600">
              EN
            </Link>
          </>
        )}
      </span>
    </nav>
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
