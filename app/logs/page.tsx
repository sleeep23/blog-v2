import type { Metadata } from "next";
import Link from "next/link";
import { EntryList } from "@/components/entry-list";
import { archivedPosts, getEntries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Logs",
  description: "공부하고 만들면서 남긴 가벼운 기록",
};

export default function LogsPage() {
  return (
    <div className="prose dark:prose-invert py-6">
      <Link href="/" className="text-sm no-underline text-gray-500">
        ← Home
      </Link>
      <h2 className="mt-4 mb-1">Logs</h2>
      <p className="text-sm text-gray-500 mt-0">
        공부하고 만들면서 남긴 가벼운 기록입니다.
      </p>
      <hr className="my-4" />
      <EntryList entries={getEntries("log")} />
      {archivedPosts.length > 0 && (
        <p className="text-sm mt-8">
          <Link
            href="/archive"
            className="text-gray-500 no-underline hover:underline"
          >
            예전 글 보기 ({archivedPosts.length}) →
          </Link>
        </p>
      )}
    </div>
  );
}
