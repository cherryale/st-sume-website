import { Metadata } from 'next'
import PageNotFound from '../components/templates/page-not-found'
import { getPageMetadata } from '../lib/metadata'
import { getSiteSettings } from '../lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  if (!settings) {
    return {}
  }

  const description =
    'The page you were looking for either does not exist or has been delete.'

  return getPageMetadata({
    title: 'Page not found',
    description,
    settings
  })
}

export default async function NotFound() {
  return <PageNotFound />
}
