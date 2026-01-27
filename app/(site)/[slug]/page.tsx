import { notFound } from 'next/navigation'
import { getPageBySlug, getSiteSettings } from '../../../lib/queries'
import BasicPage from '../../../components/templates/page'
import { Metadata } from 'next'
import { getPageMetadata } from '../../../lib/metadata'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPageBySlug({ params })
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

export default async function Page({ params }: Props) {
  const data = await getPageBySlug({ params })

  if (!data) {
    notFound()
  }

  return <BasicPage {...data} />
}
