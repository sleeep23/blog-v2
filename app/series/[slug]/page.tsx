import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PostListItem } from "@/components/post-list-item";
import { getSeries, SERIES } from "@/lib/posts";

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(SERIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const series = getSeries((await params).slug);
  if (!series) return {};
  return { title: series.title, description: series.description };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const series = getSeries((await params).slug);
  if (!series) notFound();

  return (
    <div className="prose dark:prose-invert py-6">
      <Link href="/" className="text-sm no-underline text-gray-500">
        ← Home
      </Link>
      <h2 className="mt-4 mb-1">{series.title}</h2>
      <p className="text-sm text-gray-500 mt-0">
        {series.description} · {series.posts.length}편
      </p>
      <hr className="my-4" />
      <ol className="list-none pl-0">
        {series.posts.map((post) => (
          <li key={post.slug} className="pl-0">
            <PostListItem post={post} />
          </li>
        ))}
      </ol>
    </div>
  );
}
