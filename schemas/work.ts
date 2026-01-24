import { HeartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Work',
  name: 'work',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'subtext',
      type: 'string'
    }),
    defineField({
      title: 'Is it a link or a file?',
      name: 'type',
      type: 'string',
      initialValue: 'link',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Link', value: 'link' },
          { title: 'File', value: 'file' }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      title: 'URL',
      name: 'link',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'link',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { type?: string }
          if (parent?.type === 'link' && !value) {
            return 'URL is required when type is link.'
          }
          return true
        })
    }),
    defineField({
      name: 'file',
      type: 'file',
      hidden: ({ parent }) => parent?.type !== 'file',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { type?: string }
          if (parent?.type === 'file' && !value) {
            return 'File is required when type is file.'
          }
          return true
        })
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label'
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle
    })
  }
})
