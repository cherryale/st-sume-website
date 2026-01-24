import { MetadataRoute } from 'next'

import { getAllPosts, getClient } from 'lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

  const client = getClient()
  const posts = await getAllPosts(client)

  const postUrls: MetadataRoute.Sitemap = posts
    .filter(({ slug }) => slug)
    .map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.5
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    ...postUrls
  ]
}
