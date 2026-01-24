import { apiVersion, dataset, projectId, studioUrl } from 'lib/api'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NEXT_PUBLIC_SANITY_DATASET === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl
  }
})
