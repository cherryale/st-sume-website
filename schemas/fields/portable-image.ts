import { ImageIcon } from '@sanity/icons'
import { defineArrayMember } from 'sanity'

/**
 * Shared image array member for portable text (block content) fields, so
 * editors can embed an image inline wherever `PortableTextRenderer` is used.
 */
export const portableImage = defineArrayMember({
  type: 'image',
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Image caption',
      description: 'Caption displayed below the image.'
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.'
    }
  ]
})
