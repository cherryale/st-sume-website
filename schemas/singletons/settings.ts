import { CogIcon } from '@sanity/icons'
import * as demo from 'lib/demo.data'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your website.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'description',
      description: 'Used both for <meta> description tag for SEO.',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.max(180).required()
    }),
    defineField({
      title: 'Open Graph Image',
      name: 'image',
      description:
        'Used for social media previews when linking to the index page.',
      type: 'image',
      validation: (rule) => rule.required()
    })
  ]
})
