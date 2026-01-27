import { defineQuery } from 'next-sanity'
import { client } from './client'
import {
  BlogPostBySlugQueryResult,
  BlogQueryResult,
  HomepageQueryResult,
  MenuQueryResult,
  PageBySlugQueryResult,
  SettingsQueryResult,
  WorkQueryResult
} from '../sanity.types'

const settingsQuery = defineQuery(`*[_type == "settings"][0] {
  ...,
  info {
    ...,
    "resume": resume.asset->url
  }
}`)
export const getSiteSettings = async () => {
  return await client.fetch<SettingsQueryResult>(settingsQuery, {}, {
    next: { tags: ['settings'] }
  })
}

const menuQuery = defineQuery(`*[_type == "menu"][0] {
  ...,
  items[] {
    "_key": _key,
    "_type": _type,
    "label": label,
    "slug": select(
      reference->_type == "research" => "research",
      reference->_type == "blogPage" => "blog",
      reference->slug.current
    ),
    "document": reference->_type
  },
}`)
export const getMenu = async () => {
  return await client.fetch<MenuQueryResult>(menuQuery, {}, {
    next: { tags: ['menu'] }
  })
}

const homepageQuery = defineQuery(`
  *[_type == "homepage"][0] {
    ...,
    latest {
      'title': title,
      'description': description,
      'items': items[]-> {
        ...,
        "label": label,
        "title": title,
        "subtext": subtext,
        "type": type,
        "file": file.asset->url,
        "link": link,
      },
    },
    articles {
      'title': title,
      'items': items[]-> {
        ...,
        "title": title,
        "excerpt": excerpt,
        "image": image,
        "date": date,
        "slug": slug.current,
      },
    }
  }
`)
export const getHomepage = async () => {
  return await client.fetch<HomepageQueryResult>(homepageQuery, {}, {
    next: { tags: ['homepage', 'work', 'blog'] }
  })
}

const blogPostBySlugQuery = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] {
    ...,
    "related": *[_type == "blog" && _id != ^._id][0...3] {
      ...,
      "title": title,
      "excerpt": excerpt,
      "image": image,
      "date": date,
      "slug": slug.current,
    }
  }
`)
export async function getBlogPostBySlug({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return await client.fetch<BlogPostBySlugQueryResult>(blogPostBySlugQuery, {
    slug
  }, {
    next: { tags: ['blog', `blog:${slug}`] }
  })
}

const blogQuery = defineQuery(`
  *[_type == "blogPage"][0] {
    ...,
    "items": *[_type == "blog"] {
      ...,
      "title": title,
      "excerpt": excerpt,
      "image": image,
      "date": date,
      "slug": slug.current,
    }
  }
`)
export async function getBlog() {
  return await client.fetch<BlogQueryResult>(blogQuery, {}, {
    next: { tags: ['blogPage', 'blog'] }
  })
}

const workQuery = defineQuery(`
  *[_type == "research"][0] {
    ...,
    "items": *[_type == "work"] {
      ...,
      "label": label,
      "title": title,
      "subtext": subtext,
      "type": type,
      "file": file.asset->url,
      "link": link,
    }
  }
`)
export async function getWork() {
  return await client.fetch<WorkQueryResult>(workQuery, {}, {
    next: { tags: ['research', 'work'] }
  })
}

const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    "work": *[_type == "work"][0...6] {
      ...,
      "label": label,
      "title": title,
      "subtext": subtext,
      "type": type,
      "file": file.asset->url,
      "link": link,
    }
  }
`)
export async function getPageBySlug({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return await client.fetch<PageBySlugQueryResult>(pageBySlugQuery, { slug }, {
    next: { tags: ['page', `page:${slug}`, 'work'] }
  })
}
