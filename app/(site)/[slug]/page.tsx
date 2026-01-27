import { notFound } from 'next/navigation'
import { getPageBySlug } from '../../../lib/queries'
import BasicPage from '../../../components/templates/page'

interface PageProps {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: PageProps) {
  const data = await getPageBySlug({ params })

  if (!data) {
    notFound()
  }

  return <BasicPage {...data} />
}
