import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import ArticleThumbnailCard from "@/components/article-thumbnail-card";

export default function Home() {
  return (
    <div className="prose dark:prose-invert prose-h2:mt-2">
      {allPosts.map((post) => (
        <article key={post._id}>
          <ArticleThumbnailCard>
            <Link href={post.slug} className="no-underline ">
              <h2>{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
          </ArticleThumbnailCard>
        </article>
      ))}
    </div>
  );
}
