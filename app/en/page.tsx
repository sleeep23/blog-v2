import type { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostListItem } from "@/components/post-list-item";
import { englishPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: { absolute: "Dongho Seo · Engineering notes" },
  description:
    "Engineering notes by Dongho Seo — things I built, wrestled with, and studied.",
};

export default function EnglishHome() {
  return (
    <div lang="en" className="prose dark:prose-invert prose-h2:mt-2">
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
          Notes on things I built, wrestled with, and studied. Most posts are in
          Korean; these are the ones available in English. For research, see{" "}
          <a href="https://dongho-seo.me" target="_blank">
            dongho-seo.me
          </a>
          .
        </p>
        {englishPosts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
