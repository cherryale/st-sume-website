import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from 'lib/api'
import { MenuQueryResult } from '../sanity.types'
import { ImageAsset } from 'sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max')

type MenuQueryNonNull = NonNullable<MenuQueryResult>

// Step 2: derive nested types safely
export type MenuLink = NonNullable<MenuQueryNonNull['items']>[number]
export const resolveInternalLink = (link: MenuLink): string => {
  switch (link.document) {
    case 'blogPage':
      return `/blog`
    case 'research':
      return `/research`
    case 'page':
    default:
      return `/${link.slug}`
  }
}
