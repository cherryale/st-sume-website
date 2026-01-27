import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getSiteSettings } from '../../../../lib/queries'
import BlogPost from '../../../../components/templates/blog-post'
import { Metadata } from 'next'
import { getPageMetadata } from '../../../../lib/metadata'
import { urlForImage } from '../../../../lib/resolvers'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBlogPostBySlug({ params })
  const settings = await getSiteSettings()

  if (!data || !settings) {
    return {}
  }

  return getPageMetadata({
    title: data.title,
    description: data?.excerpt || '',
    image: data?.image ? urlForImage(data.image).url() : '',
    settings
  })
}

export default async function Page({ params }: Props) {
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
