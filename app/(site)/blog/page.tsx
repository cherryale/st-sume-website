import { notFound } from 'next/navigation'
import { getBlog, getSiteSettings } from '../../../lib/queries'
import Blog from '../../../components/templates/blog'
import { Metadata } from 'next'
import { getPageMetadata } from '../../../lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBlog()
  const settings = await getSiteSettings()

  if (!data || !settings) {
    return {}
  }

  return getPageMetadata({
    title: data.title,
    description: '',
    settings
  })
}

export default async function BlogIndex() {
  const data = await getBlog()

  if (!data) {
    notFound()
  }

  return <Blog {...data} />
}
