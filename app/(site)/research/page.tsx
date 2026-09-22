import { notFound } from 'next/navigation'
import { getSiteSettings, getWork } from '../../../lib/queries'
import Work from '../../../components/templates/work'
import { Metadata } from 'next'
import { getPageMetadata } from '../../../lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWork()
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

export default async function Research() {
  const data = await getWork()

  if (!data) {
    notFound()
  }

  return (
    <Work
      {...data}
      items={data?.items.map((item) => ({ ...item, image: undefined }))}
    />
  )
}
