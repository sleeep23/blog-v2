"use client";

import { Post } from "@/contentlayer/generated/types";

type HeadingProps = {
  slug: string;
  text: string;
  level: string;
};

export default function TableOfContents({ post }: { post: Post }) {
  return (
    <div className="fixed left-[calc(50%_+_22rem)]  z-10 w-64 p-4 shadow-lg ">
      <div className="p-4">
        <h3 className="font-semibold mb-4 text-lg leading-6 ">목차 📋</h3>
        <ul className="text-sm  leading-6 list-none">
          {post.headings.map((heading: HeadingProps) => {
            return (
              <li key={`#${heading.slug}`} className="mt-2">
                <a
                  className="data-[level=two]:ml-4 data-[level=three]:ml-8 hover:underline hover:underline-offset-2 hover:decoration-cyan-500"
                  data-level={heading.level}
                  href={`#${heading.slug}`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
