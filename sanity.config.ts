'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { apiVersion, dataset, projectId } from 'lib/api'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import post from 'schemas/blog-post'
import page from 'schemas/page'
import settings from 'schemas/singletons/settings'
import menu from './schemas/singletons/menu'
import homepage from './schemas/singletons/homepage'
import blog from './schemas/singletons/blog'
import work from './schemas/work'
import research from './schemas/singletons/research'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Jé St Sume',
  schema: {
    types: [page, work, post, settings, homepage, research, blog, menu]
  },
  plugins: [
    structureTool({
      structure: settingsStructure(settings)
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // defaultDocumentNode: previewDocumentNode(),
    }),
    // presentationTool({
    //   locate,
    //   previewUrl: {
    //     previewMode: {
    //       enable: DRAFT_MODE_ROUTE,
    //     },
    //   },
    // }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settings.name }),
    // Add an image asset source for Unsplash
    unsplashImageAsset()
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    // process.env.NODE_ENV !== 'production' &&
    //   visionTool({ defaultApiVersion: apiVersion })
  ]
})
