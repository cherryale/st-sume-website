import { defineQuery } from 'next-sanity'
import { client } from './client'
import {
  HomepageQueryResult,
  MenuQueryResult,
  PageBySlugQueryResult,
  SettingsQueryResult
} from '../sanity.types'

// const postFields = groq`
//   _id,
//   title,
//   date,
//   _updatedAt,
//   excerpt,
//   coverImage,
//   "slug": slug.current,
//   "author": author->{name, picture},
// `

const settingsQuery = defineQuery(`*[_type == "settings"][0] {
  ...,
}`)
export const getSiteSettings = async () => {
  return await client.fetch<SettingsQueryResult>(settingsQuery)
}

const menuQuery = defineQuery(`*[_type == "menu"][0] {
  ...,
  items[] {
    "_key": _key,
    "_type": _type,
    "label": label,
    "slug": reference->slug.current,
    "document": reference->_type
  },
  "resume": resume.asset->url
}`)
export const getMenu = async () => {
  return await client.fetch<MenuQueryResult>(menuQuery)
}

// export const postSlugsQuery = groq`
// *[_type == "post" && defined(slug.current)][].slug.current
// `

// export async function getSettings(): Promise<Settings> {
//   return (await client.fetch(settingsQuery)) || {}
// }

// export async function getAllPosts(): Promise<Post[]> {
//   return (await client.fetch(indexQuery)) || []
// }

// export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
//   const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
//   return slugs.map((slug) => ({ slug }))
// }

// export async function getPostBySlug(slug: string): Promise<Post> {
//   return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
// }

const homepageQuery = defineQuery(`
  *[_type == "homepage"][0] {
    ...
  }
`)
export const getHomepage = async () => {
  return await client.fetch<HomepageQueryResult>(homepageQuery)
}

const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    ...
  }
`)
export async function getPageBySlug({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return await client.fetch<PageBySlugQueryResult>(pageBySlugQuery, { slug })
}
