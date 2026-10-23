import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPages } from "content-collections"

import { Mdx } from "@/components/mdx-components"

type Params = { slug: string[] }

interface PageProps {
  params: Promise<Params>
}

async function getPageFromParams(params: PageProps["params"]) {
  const { slug } = await params
  return allPages.find((page) => page.slugAsParams === slug.join("/"))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx code={page.body} />
    </article>
  )
}
