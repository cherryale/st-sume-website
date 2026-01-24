// import { draftMode } from 'next/headers'
// import { notFound } from 'next/navigation'

// import { readToken } from 'lib/api'
// import { getPageBySlug } from '../../../lib/queries'

// export async function generateStaticParams() {
//   const slugs = await getAllPostsSlugs()
//   return slugs.map(({ slug }) => ({ slug }))
// }

// export default async function PostRoute({
//   params
// }: {
//   params: Promise<{ slug: string }>
// }) {
//   const { slug } = await params
//   const isDraftMode = draftMode().isEnabled

//   const client = getClient(isDraftMode ? { token: readToken } : undefined)

//   const data = getPageBySlug({ pa })

//   if (!post) {
//     notFound()
//   }

//   // if (isDraftMode) {
//   //   return (
//   //     <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
//   //   )
//   // }

//   return <div>Blog post goes here</div>
// }
