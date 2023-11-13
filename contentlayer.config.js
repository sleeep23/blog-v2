import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

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
      highlight,
    ],
  },
});
