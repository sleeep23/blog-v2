import { allPosts } from "@/.contentlayer/generated";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="prose dark:prose-invert prose-h2:mt-2">
      <section
        id="author"
        className="flex flex-col gap-6 items-center justify-center py-6 mx-auto"
      >
        <Avatar className="h-32 w-32">
          <AvatarImage alt="Author's avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div className="text-center max-w-md mx-auto flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Author Name</h2>
          <p className="text-gray-500 dark:text-gray-200">
            Author bio goes here. This is a short description about the author.
          </p>
        </div>
      </section>
      <section id="posts">
        <h1 className="text-2xl font-bold">Posts</h1>
        {allPosts.map((post) => (
          <article key={post._id} className="mt-4">
            <Link
              href={post.slug}
              className="no-underline hover:underline underline-offset-4"
            >
              <h2 className="font-semibold">{post.title}</h2>
              {post.description && (
                <p className="text-gray-500">{post.description}</p>
              )}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
