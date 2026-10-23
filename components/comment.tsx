"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comment({ lang = "ko" }: { lang?: string }) {
  // "system" is not a valid giscus theme, so pass the resolved one
  const { resolvedTheme } = useTheme();
  return (
    <div className="pt-5">
      <Giscus
        id="comments"
        repo="sleeep23/blog-v2"
        repoId="R_kgDOKYhYxQ"
        category="General"
        categoryId="DIC_kwDOKYhYxc4CbCAi"
        mapping="title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang={lang}
        loading="lazy"
      />
    </div>
  );
}
