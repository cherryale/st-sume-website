import Homepage from 'components/templates/homepage'
import { notFound } from 'next/navigation'
import { getHomepage, getSiteSettings } from '../../lib/queries'
import { Metadata } from 'next'
import { getPageMetadata } from '../../lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage()
  const settings = await getSiteSettings()

  if (!data || !settings) {
    return {}
  }

  return getPageMetadata({
    title: 'Home',
    description: data.subtext,
    settings
  })
}
export default async function Home() {
  const data = await getHomepage()

  if (!data) {
    notFound()
  }

  return <Homepage {...data} />
}
