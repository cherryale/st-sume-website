import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { internal } from '../fields/link'

export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Menu items',
      type: 'array',
      validation: (rule) => rule.min(1),
      of: [
        defineField({
          ...internal
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu'
      }
    }
  }
})
