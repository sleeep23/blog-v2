import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostListItem, SeriesListItem } from "@/components/post-list-item";
import { archivedPosts, getHomeEntries } from "@/lib/posts";

export default function Home() {
  return (
    <div className="prose dark:prose-invert prose-h2:mt-2">
      <section
        id="author"
        className="flex flex-col gap-6 items-center justify-center py-6 mx-auto"
      >
        <Avatar className="w-32 h-32">
          <AvatarImage
            className="m-0"
            alt="Author's avatar"
            src="https://github.com/sleeep23.png"
          />
          <AvatarFallback>
            <p>DS</p>
          </AvatarFallback>
        </Avatar>
        <div className="text-center max-w-md mx-auto flex flex-col">
          <h3 className="text-2xl font-bold mt-0 mb-1">Dongho Seo</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0 mb-3">
            Researcher at SYMPLE Lab, GIST
          </p>
          <p className="text-gray-600 dark:text-gray-200 my-0">
            Immerse, then simplify.
          </p>
        </div>
      </section>
      <section id="posts">
        <h3 className="text-2xl font-bold font-mono">Posts</h3>
        <p className="text-sm text-gray-500 mt-0">
          만들면서 고민하고 공부한 것들을 기록합니다. 연구 이야기는{" "}
          <a href="https://dongho-seo.me" target="_blank">
            dongho-seo.me
          </a>
          에 있어요.
        </p>
        {getHomeEntries().map((entry) =>
          entry.type === "series" ? (
            <SeriesListItem key={entry.series.slug} series={entry.series} />
          ) : (
            <PostListItem key={entry.post.slug} post={entry.post} />
          ),
        )}
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
      </section>
    </div>
  );
}
