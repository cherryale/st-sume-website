import { notFound } from 'next/navigation'
import { getBlog } from '../../lib/queries'
import Blog from '../../components/templates/blog'

export default async function BlogIndex() {
  const data = await getBlog()

  if (!data) {
    notFound()
  }

  return <Blog {...data} />
}
