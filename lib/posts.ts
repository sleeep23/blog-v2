import { allPosts, type Post } from "content-collections";
import { getTime, parseISO } from "date-fns";

export const SERIES: Record<string, { title: string; description: string }> = {
  sicpjs: {
    title: "자바스크립트로 배우는 SICP 읽기 노트",
    description:
      "『자바스크립트로 배우는 SICP』를 읽으며 정리한 노트. 함수와 데이터를 이용한 추상화부터 상태와 환경 모형까지.",
  },
};

const time = (post: Post) => getTime(parseISO(post.createdAt));

export const newestFirst = (posts: Post[]) =>
  [...posts].sort((a, b) => time(b) - time(a));

export const oldestFirst = (posts: Post[]) =>
  [...posts].sort((a, b) => time(a) - time(b));

// The Korean home, series and archive list the Korean originals; /en lists
// the English posts
const originals = allPosts.filter((post) => post.lang === "ko");

export const englishPosts = newestFirst(
  allPosts.filter((post) => post.lang === "en" && !post.archived),
);

export function getTranslations(post: Post) {
  return allPosts
    .filter((p) => p.translationKey === post.translationKey)
    .sort((a, b) => (a.lang === "ko" ? -1 : b.lang === "ko" ? 1 : 0));
}

// Post URL -> URL of its other-language version, for the header switch
export function getCounterparts() {
  const map: Record<string, string> = {};
  for (const post of allPosts) {
    const other = allPosts.find(
      (p) => p.translationKey === post.translationKey && p.lang !== post.lang,
    );
    if (other) map[post.slug] = other.slug;
  }
  return map;
}

export const archivedPosts = newestFirst(
  originals.filter((post) => post.archived),
);

export function getSeries(slug: string) {
  const meta = SERIES[slug];
  if (!meta) return undefined;
  const posts = oldestFirst(
    originals.filter((post) => post.series === slug && !post.archived),
  );
  return { slug, ...meta, posts, latest: posts[posts.length - 1] };
}

export type Series = NonNullable<ReturnType<typeof getSeries>>;

export type HomeEntry =
  { type: "post"; post: Post } | { type: "series"; series: Series };

// Home list: active posts, with each series collapsed into a single entry
// placed at the date of its latest post
export function getHomeEntries(): HomeEntry[] {
  const entries: HomeEntry[] = [];
  const seen = new Set<string>();
  for (const post of newestFirst(originals.filter((p) => !p.archived))) {
    const series = post.series ? getSeries(post.series) : undefined;
    if (!series) {
      entries.push({ type: "post", post });
    } else if (!seen.has(series.slug)) {
      seen.add(series.slug);
      entries.push({ type: "series", series });
    }
  }
  return entries;
}
