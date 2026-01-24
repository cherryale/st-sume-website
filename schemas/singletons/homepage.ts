import { HomeIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

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
  name: 'homepage',
  title: 'Homepage',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Portrait',
      type: 'image',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      title: 'Subtext',
      name: 'subtext',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      title: 'Latest work',
      name: 'latest',
      type: 'array',
      of: [
        {
          name: 'work',
          type: 'reference' as const,
          to: [{ type: 'work' }]
        }
      ],
      validation: (rule) => rule.min(1).max(3)
    })
  ]
})
