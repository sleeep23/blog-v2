import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import GithubSlugger from "github-slugger";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { z } from "zod";

const mdxOptions = {
  remarkPlugins: [remarkMath, remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    rehypeKatex,
    [rehypePrettyCode, { theme: "github-dark" }],
    [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
  ],
} satisfies Parameters<typeof compileMDX>[2];

function extractHeadings(raw: string) {
  // Drop fenced code blocks so `#` lines inside them aren't treated as headings
  const source = raw.replace(/^[ \t]*(`{3,}|~{3,})[\s\S]*?^[ \t]*\1/gm, "");
  const headingsRegex = /^(#{1,6})[ \t]+(.+)$/gm;
  const slugger = new GithubSlugger();
  // Every heading goes through the slugger in order so duplicate suffixes
  // (-1, -2, ...) match the ids rehype-slug generates; only h1-h3 are kept.
  return Array.from(source.matchAll(headingsRegex))
    .map(([, flag, content]) => {
      const depth = flag.length;
      // Plain text as rendered: strip links, `*` emphasis and inline code
      // marks (`_` is kept since it appears literally, e.g. node_modules)
      const text = content
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[*`]/g, "")
        .trim();
      return { depth, text, slug: slugger.slug(text) };
    })
    .filter(({ depth }) => depth <= 3)
    .map(({ depth, text, slug }) => ({
      level: depth === 1 ? "one" : depth === 2 ? "two" : "three",
      text,
      slug,
    }));
}

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    createdAt: z.string(),
    category: z.string(),
    thumbnailURL: z.string().optional(),
    timesToRead: z.number().optional(),
    toc: z.boolean().default(true),
    // Archived posts are hidden from the home list and search engines but
    // keep their URLs
    archived: z.boolean().default(false),
    // Posts in a series are grouped into one entry on the home list
    series: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    slug: `/posts/${document._meta.path}`,
    slugAsParams: document._meta.path,
    // Translations live under content/posts/<lang>/ with the same file name
    // as the Korean original, e.g. posts/en/gijol-1.mdx for posts/gijol-1.mdx
    lang: document._meta.path.startsWith("en/") ? "en" : "ko",
    translationKey: document._meta.path.replace(/^en\//, ""),
    headings: extractHeadings(document.content),
    body: await compileMDX(context, document, mdxOptions),
  }),
});

const pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    slug: `/${document._meta.path}`,
    slugAsParams: document._meta.path,
    body: await compileMDX(context, document, mdxOptions),
  }),
});

export default defineConfig({
  content: [posts, pages],
});
