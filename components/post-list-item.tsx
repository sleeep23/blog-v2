import Link from "next/link";
import type { Post } from "content-collections";
import { format, parseISO } from "date-fns";
import { ClockIcon, StackIcon } from "@radix-ui/react-icons";
import type { Series } from "@/lib/posts";

const linkClass =
  "text-sm no-underline hover:underline underline-offset-2 decoration-cyan-500 decoration-2";
const metaClass = "text-xs mt-0 text-gray-500 flex items-center gap-2";

export function PostListItem({ post }: { post: Post }) {
  return (
    <article className="mt-4">
      <Link href={post.slug} className={linkClass}>
        <h3 className="font-medium mb-0.5">{post.title}</h3>
        {post.description && (
          <p className="font-medium text-gray-500 mb-2">{post.description}</p>
        )}
        <p className={metaClass}>
          <span>{format(parseISO(post.createdAt), "yyyy-MM-dd")}</span>|
          <span>{post.category}</span>
          {post.timesToRead && (
            <>
              |
              <span className="flex items-center gap-1">
                <ClockIcon />
                <span>{post.timesToRead}min</span>
              </span>
            </>
          )}
        </p>
      </Link>
    </article>
  );
}

export function SeriesListItem({ series }: { series: Series }) {
  const first = series.posts[0];
  return (
    <article className="mt-4">
      <Link href={`/series/${series.slug}`} className={linkClass}>
        <h3 className="font-medium mb-0.5">{series.title}</h3>
        <p className="font-medium text-gray-500 mb-2">{series.description}</p>
        <p className={metaClass}>
          <span className="flex items-center gap-1">
            <StackIcon />
            <span>시리즈 · {series.posts.length}편</span>
          </span>
          |
          <span>
            {format(parseISO(first.createdAt), "yyyy-MM")} –{" "}
            {format(parseISO(series.latest.createdAt), "yyyy-MM")}
          </span>
          |<span>{first.category}</span>
        </p>
      </Link>
    </article>
  );
}
