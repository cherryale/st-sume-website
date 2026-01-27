import { Metadata } from 'next'
import { SettingsQueryResult } from 'sanity.types'
import { urlForImage } from './resolvers'

interface GenerateMetadataParams {
  title: string
  description: string
  settings: SettingsQueryResult
  image?: string
}

export const getPageMetadata = ({
  title,
  description,
  image,
  settings
}: GenerateMetadataParams): Metadata => {
  const images = image || urlForImage(settings?.image || '').url()
  const fullTitle = `Jé St Stume | ${title}`

  return {
    title: fullTitle,
    description,
    icons: {
      icon: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png'
    },
    openGraph: {
      title: fullTitle,
      description: description || settings?.description,
      siteName: 'Jé St Stume',
      images
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || settings?.description,
      images
    }
  }
}
