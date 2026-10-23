import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  headings: {
    type: "json",
    resolve: async (doc) => {
      // Drop fenced code blocks so `#` lines inside them aren't treated as headings
      const source = doc.body.raw.replace(
        /^[ \t]*(`{3,}|~{3,})[\s\S]*?^[ \t]*\1/gm,
        "",
      );
      const headingsRegex = /^(?<flag>#{1,6})[ \t]+(?<content>.+)$/gm;
      const slugger = new GithubSlugger();
      // Every heading goes through the slugger in order so duplicate suffixes
      // (-1, -2, ...) match the ids rehype-slug generates; only h1-h3 are kept.
      return Array.from(source.matchAll(headingsRegex))
        .map(({ groups }) => {
          const depth = groups.flag.length;
          // Plain text as rendered: strip links, `*` emphasis and inline code
          // marks (`_` is kept since it appears literally, e.g. node_modules)
          const text = groups.content
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
    },
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    createdAt: {
      type: "date",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    thumbnailURL: {
      type: "string",
      required: false,
    },
    timesToRead: {
      type: "number",
      required: false,
    },
    toc: {
      type: "boolean",
      required: false,
      default: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
