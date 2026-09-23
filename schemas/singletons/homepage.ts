import { HomeIcon } from '@sanity/icons'
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
      title: 'Tagline',
      name: 'subtext',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, portableImage]
    }),
    defineField({
      title: 'Latest work',
      name: 'latest',
      type: 'object',
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
          title: 'Work',
          name: 'items',
          type: 'array',
          of: [
            {
              name: 'reference',
              type: 'reference' as const,
              to: [{ type: 'work' }],
              options: {
                filter: 'type != "progress"'
              }
            }
          ],
          validation: (rule) => rule.min(1).max(6)
        })
      ]
    }),
    defineField({
      title: 'Working papers',
      name: 'wip',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required()
        }),
        defineField({
          title: 'Papers',
          name: 'items',
          type: 'array',
          of: [
            {
              name: 'reference',
              type: 'reference' as const,
              to: [{ type: 'work' }],
              options: {
                filter: 'type == "progress"'
              }
            }
          ],
          validation: (rule) => rule.min(1).max(6)
        })
      ]
    }),
    defineField({
      title: 'Latest articles',
      name: 'articles',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required()
        }),
        defineField({
          title: 'Articles',
          name: 'items',
          type: 'array',
          of: [
            {
              name: 'reference',
              type: 'reference' as const,
              to: [{ type: 'blog' }]
            }
          ],
          validation: (rule) => rule.min(1).max(6)
        })
      ]
    })
  ]
})
