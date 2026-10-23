import { notFound } from "next/navigation";
import { allPosts } from "content-collections";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { format, parseISO } from "date-fns";
import { ClockIcon } from "@radix-ui/react-icons";
import Comment from "@/components/comment";
import TableOfContents from "@/components/table-of-contents";
import Link from "next/link";
import { getSeries, getTranslations } from "@/lib/posts";

const LANG_LABELS: Record<string, string> = { ko: "한국어", en: "English" };

type Params = { slug: string[] };

export interface PostProps {
  params: Promise<Params>;
}

async function getPostFromParams(params: PostProps["params"]) {
  const { slug } = await params;
  return allPosts.find((post) => post.slugAsParams === slug.join("/"));
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    ...(post.archived && { robots: { index: false } }),
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }
  const series = post.series ? getSeries(post.series) : undefined;
  const seriesIndex = series?.posts.findIndex((p) => p.slug === post.slug);
  const translations = getTranslations(post);

  return (
    <article className="relative" lang={post.lang}>
      {/* Rendered first so the mobile bar can stick across the whole article */}
      {post.toc && post.headings.length > 0 && (
        <TableOfContents
          headings={post.headings}
          title={post.lang === "en" ? "Contents" : undefined}
        />
      )}
      <div
        className="py-6 prose dark:prose-invert leading-relaxed prose-h1:text-2xl prose-a:break-all prose-code:text-cyan-600 dark:prose-code:text-cyan-500 break-keep prose-img:mx-auto
    prose-code:overflow-auto katex-display:katex prose-a:prose-cyan"
      >
        {post.archived && (
          <p className="not-prose text-xs text-gray-500 border rounded-md px-3 py-2 mb-4">
            보관된 글입니다. 지금의 생각과는 다를 수 있어요.{" "}
            <Link href="/archive" className="underline">
              Archive
            </Link>
          </p>
        )}
        {series && seriesIndex !== undefined && seriesIndex >= 0 && (
          <p className="not-prose text-xs text-gray-500 mb-2">
            <Link href={`/series/${series.slug}`} className="hover:underline">
              {series.title}
            </Link>{" "}
            · {seriesIndex + 1} / {series.posts.length}
          </p>
        )}
        {translations.length > 1 && (
          <nav
            aria-label="Language"
            className="not-prose text-xs text-gray-500 mb-2 flex gap-2"
          >
            {translations.map((t, i) => (
              <span key={t.slug} className="flex gap-2">
                {i > 0 && <span aria-hidden="true">·</span>}
                {t.slug === post.slug ? (
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {LANG_LABELS[t.lang]}
                  </span>
                ) : (
                  <Link
                    href={t.slug}
                    hrefLang={t.lang}
                    className="hover:underline"
                  >
                    {LANG_LABELS[t.lang]}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
        <h2>{post.title}</h2>
        {post.description && (
          <p className="text-sm text-slate-700 dark:text-slate-200">
            {post.description}
          </p>
        )}
        <p className="text-sm flex align-middle gap-2">
          <span>{format(parseISO(post.createdAt), "yyyy-MM-dd")}</span> |{" "}
          <span>{post.category}</span>
          {post.timesToRead && (
            <>
              |{" "}
              <span className="flex flex-col justify-center">
                <ClockIcon />
              </span>
              <span>{post.timesToRead}min</span>
            </>
          )}
        </p>
        <hr className="my-4" />
        <Mdx code={post.body} />
        <Comment lang={post.lang} />
      </div>
    </article>
  );
}
