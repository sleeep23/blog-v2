"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type HeadingProps = {
  slug: string;
  text: string;
  level: string;
};

const LEVELS = ["one", "two", "three"];
const ACTIVE_LINE = 100;
const INDENTS = ["pl-3", "pl-6", "pl-9"];

// Keep the active item centered inside a scrollable list without moving the page
function scrollIntoList(list: HTMLElement | null, slug: string | null) {
  if (!list || !slug) return;
  const item = list.querySelector<HTMLElement>(
    `[data-slug="${CSS.escape(slug)}"]`,
  );
  if (!item) return;
  list.scrollTo({
    top: item.offsetTop - list.clientHeight / 2 + item.offsetHeight / 2,
    behavior: "instant",
  });
}

function useReadingState(headings: HeadingProps[]) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    // The active heading is the last one scrolled past the line, so a
    // section stays highlighted while its body is being read.
    const handleScroll = () => {
      let current = -1;
      headings.forEach((heading, index) => {
        const element = document.getElementById(heading.slug);
        if (element && element.getBoundingClientRect().top <= ACTIVE_LINE) {
          current = index;
        }
      });
      setActiveIndex(current);

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0,
      );

      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        setScrollingUp(y < lastY);
        lastY = y;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  return { activeIndex, progress, scrollingUp };
}

export default function TableOfContents({
  headings,
}: {
  headings: HeadingProps[];
}) {
  const { activeIndex, progress, scrollingUp } = useReadingState(headings);
  const [open, setOpen] = useState(false);
  const sideListRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barListRef = useRef<HTMLUListElement>(null);

  // Heading levels actually used in this post, shallowest first
  const usedLevels = useMemo(
    () => LEVELS.filter((level) => headings.some((h) => h.level === level)),
    [headings],
  );
  const activeSlug = activeIndex >= 0 ? headings[activeIndex].slug : null;

  // With three levels in use, the deepest one is only expanded inside the
  // section being read so long posts stay short.
  const visible = useMemo(() => {
    if (usedLevels.length < 3) return headings.map(() => true);
    const deepest = usedLevels[usedLevels.length - 1];
    const parentOf: number[] = [];
    let parent = -1;
    headings.forEach((heading, index) => {
      if (heading.level !== deepest) parent = index;
      parentOf.push(heading.level === deepest ? parent : index);
    });
    const activeParent = activeIndex >= 0 ? parentOf[activeIndex] : -1;
    return headings.map(
      (heading, index) =>
        heading.level !== deepest || parentOf[index] === activeParent,
    );
  }, [headings, usedLevels, activeIndex]);

  useEffect(() => {
    scrollIntoList(sideListRef.current, activeSlug);
  }, [activeSlug, visible]);

  useEffect(() => {
    if (open) scrollIntoList(barListRef.current, activeSlug);
  }, [open, activeSlug]);

  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (
        event instanceof KeyboardEvent
          ? event.key === "Escape"
          : !barRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const itemClass = (heading: HeadingProps) => {
    const indent = INDENTS[usedLevels.indexOf(heading.level)] ?? INDENTS[0];
    return `block border-l-2 py-1 pr-2 leading-snug transition-colors ${indent} ${
      heading.slug === activeSlug
        ? "border-slate-900 font-medium text-slate-900 dark:border-slate-100 dark:text-slate-100"
        : "border-slate-200 text-slate-500 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
    }`;
  };

  // The bar only appears once reading has started, and hides while scrolling
  // down so it doesn't cover the text.
  const barVisible = open || (activeIndex >= 0 && scrollingUp);

  return (
    <>
      {/* Wide screens: list in the right margin next to the content */}
      <nav
        aria-label="Table of contents"
        className="fixed left-[calc(50%+23rem)] top-24 hidden w-52 text-xs xl:block"
      >
        <p className="mb-2 font-medium text-slate-900 dark:text-slate-100">
          목차
        </p>
        <ul
          ref={sideListRef}
          className="relative max-h-[calc(100vh-12rem)] list-none overflow-y-auto [scrollbar-width:thin]"
        >
          {headings.map((heading, index) =>
            visible[index] ? (
              <li key={heading.slug} data-slug={heading.slug}>
                <a className={itemClass(heading)} href={`#${heading.slug}`}>
                  {heading.text}
                </a>
              </li>
            ) : null,
          )}
        </ul>
        <div className="mt-3 h-[2px] rounded bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded bg-slate-500 dark:bg-slate-400"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </nav>

      {/* Narrow screens: current-section bar pinned to the top */}
      <div className="sticky top-0 z-20 h-0 xl:hidden">
        <div
          ref={barRef}
          className={`-mx-4 border-b bg-white transition-all duration-200 dark:bg-slate-950 ${
            open ? "shadow-lg" : ""
          } ${
            barVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0"
          }`}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-controls="toc-bar-list"
            onClick={() => setOpen((value) => !value)}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm"
          >
            <span className="flex-1 truncate">
              {activeIndex >= 0 ? headings[activeIndex].text : "목차"}
            </span>
            <ChevronDownIcon
              className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          <div className="h-[2px] bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full bg-slate-500 dark:bg-slate-400"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          {open && (
            <ul
              id="toc-bar-list"
              ref={barListRef}
              className="relative max-h-[60vh] list-none overflow-y-auto px-4 py-3 text-sm"
            >
              {headings.map((heading, index) =>
                visible[index] ? (
                  <li key={heading.slug} data-slug={heading.slug}>
                    <a
                      className={itemClass(heading)}
                      href={`#${heading.slug}`}
                      onClick={() => setOpen(false)}
                    >
                      {heading.text}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
