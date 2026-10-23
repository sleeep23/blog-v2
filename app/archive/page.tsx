import type { Metadata } from "next";
import Link from "next/link";
import { PostListItem } from "@/components/post-list-item";
import { archivedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archive",
  description: "예전에 쓴 글 모음",
  robots: { index: false },
};

export default function ArchivePage() {
  return (
    <div className="prose dark:prose-invert py-6">
      <Link href="/" className="text-sm no-underline text-gray-500">
        ← Home
      </Link>
      <h2 className="mt-4 mb-1">Archive</h2>
      <p className="text-sm text-gray-500 mt-0">
        예전에 쓴 글들입니다. 지금의 생각과는 다를 수 있어요.
      </p>
      <hr className="my-4" />
      {archivedPosts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </div>
  );
}
