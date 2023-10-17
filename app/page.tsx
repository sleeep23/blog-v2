import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { allPosts } from "@/.contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";

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
            <p>Dongho Seo</p>
          </AvatarFallback>
        </Avatar>
        <div className="text-center max-w-md mx-auto flex flex-col">
          <h3 className="text-2xl font-bold mt-0">Dongho Seo</h3>
          <p className="text-gray-500 dark:text-gray-200">
            A passionate front-end engineer who loves everything that changes
          </p>
        </div>
      </section>
      <section id="posts">
        <h3 className="text-2xl font-bold font-mono">Posts</h3>
        {allPosts.map((post) => (
          <article key={post._id} className="mt-4">
            <Link
              href={post.slug}
              className="text-sm no-underline hover:underline underline-offset-2 decoration-cyan-500 decoration-2"
            >
              <h3 className="font-medium mb-0.5">{post.title}</h3>
              {post.description && (
                <p className="font-medium text-gray-500 mb-2">
                  {post.description}
                </p>
              )}
              {post.date && (
                <p className="text-xs mt-0 text-gray-500">
                  {format(parseISO(post.date), "yyyy-MM-dd")}
                </p>
              )}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
