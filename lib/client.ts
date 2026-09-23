import { apiVersion, dataset, projectId, studioUrl, useCdn } from 'lib/api'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl
  }
})
