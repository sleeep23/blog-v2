"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comment() {
  const { theme } = useTheme();
  return (
    <div className="pt-5">
      <Giscus
        id="comments"
        repo="sleeep23/blog-v2"
        repoId="R_kgDOKYhYxQ"
        category="General"
        categoryId="DIC_kwDOKYhYxc4CbCAi"
        mapping="title"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
