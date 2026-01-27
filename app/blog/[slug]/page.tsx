import { notFound } from 'next/navigation'

import { getBlogPostBySlug } from '../../../lib/queries'
import { Section } from '../../../components/section/section'
import Image from 'next/image'
import { urlForImage } from '../../../lib/resolvers'
import BlogPost from '../../../components/templates/blog-post'

interface PageProps {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: PageProps) {
  const data = await getBlogPostBySlug({ params })

  if (!data) {
    notFound()
  }

  // if (isDraftMode) {
  //   return (
  //     <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
  //   )
  // }

  return <BlogPost {...data} />
}
