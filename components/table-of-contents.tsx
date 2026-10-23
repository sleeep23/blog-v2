"use client";

import { Portal } from "next/dist/client/portal";
import { useEffect, useState } from "react";

type HeadingProps = {
  slug: string;
  text: string;
  level: string;
};

export default function TableOfContents({
  headings,
}: {
  headings: HeadingProps[];
}) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    // The active heading is the last one scrolled past the 100px line, so a
    // section stays highlighted while its body is being read.
    const handleScroll = () => {
      let currentHeading: string | null = null;

      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (element && element.getBoundingClientRect().top <= 100) {
          currentHeading = heading.slug;
        }
      });
      setActiveHeading(currentHeading);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  return (
    <Portal type="table-of-contents">
      <div className="hidden sm:block group">
        <div className="fixed top-[20%] right-2 z-10 w-32 p-4">
          <ul className="text-sm leading-6 list-none">
            {headings.map((heading: HeadingProps) => {
              const barWidth =
                heading.level === "one"
                  ? "w-16"
                  : heading.level === "two"
                  ? "w-12"
                  : "w-8";
              const barHeight = "h-[3px]";
              const isActive = activeHeading === heading.slug;
              return (
                <li key={`#${heading.slug}`} className="relative mb-2">
                  <a
                    className={`block ${barHeight} ${barWidth} rounded transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 dark:bg-white shadow-lg"
                        : "bg-gray-300 dark:bg-gray-600"
                    } hover:bg-gray-400`}
                    data-level={heading.level}
                    href={`#${heading.slug}`}
                  >
                    <span className="sr-only">{heading.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="absolute top-0 left-full ml-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
          <ul>
            {headings.map((heading: HeadingProps) => (
              <li key={`menu-${heading.slug}`} className="mb-1">
                <a
                  className="data-[level=two]:ml-4 data-[level=three]:ml-8 hover:underline hover:underline-offset-2 hover:decoration-cyan-500"
                  data-level={heading.level}
                  href={`#${heading.slug}`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Portal>
  );
}
