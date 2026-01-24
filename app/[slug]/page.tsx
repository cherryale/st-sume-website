import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { getPageBySlug } from '../../lib/queries'

interface PageProps {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: PageProps) {
  const data = await getPageBySlug({ params })
  // const isDraftMode = draftMode().isEnabled

  // const client = getClient(isDraftMode ? { token: readToken } : undefined)

  if (!data) {
    notFound()
  }

  // if (isDraftMode) {
  //   return (
  //     <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
  //   )
  // }

  return <div>Blog post goes here</div>
}
