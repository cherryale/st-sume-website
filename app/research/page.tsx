import { notFound } from 'next/navigation'
import { getWork } from '../../lib/queries'
import Work from '../../components/templates/work'

export default async function Research() {
  const data = await getWork()

  if (!data) {
    notFound()
  }

  return <Work {...data} />
}
