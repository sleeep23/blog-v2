import Image from "next/image"
import { MDXContent } from "@content-collections/mdx/react"

const components = {
  Image,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  return <MDXContent code={code} components={components} />
}
