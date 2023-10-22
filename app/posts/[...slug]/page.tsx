import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { format, parseISO } from "date-fns";
import { ClockIcon } from "@radix-ui/react-icons";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
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
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert leading-relaxed">
      <h1>{post.title}</h1>
      {post.description && (
        <p className="text-xl text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <p className="text-sm flex align-middle gap-2">
        <span>{format(parseISO(post.createdAt), "yyyy-MM-dd")}</span> |{" "}
        <span>{post.category}</span> |{" "}
        <span className="flex flex-col justify-center">
          <ClockIcon />
        </span>
        <span>{post.timesToRead}min</span>
      </p>
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  );
}
