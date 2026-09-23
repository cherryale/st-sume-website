import { PublishIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { portableImage } from '../fields/portable-image'

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  title: 'Blog - All articles',
  name: 'blogPage',
  icon: PublishIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }, portableImage]
    }),
    defineField({
      title: 'Blog posts',
      name: 'text',
      type: 'string',
      readOnly: true,
      initialValue:
        'All blog posts and articles will be automatically rendered on the page.'
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return { title: title || 'Blog', subtitle: '/blog' }
    }
  }
})
