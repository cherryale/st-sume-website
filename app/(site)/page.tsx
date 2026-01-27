import Homepage from 'components/templates/homepage'
import { notFound } from 'next/navigation'
import { getHomepage } from '../../lib/queries'

export default async function Home() {
  const data = await getHomepage()

  if (!data) {
    notFound()
  }

  return <Homepage {...data} />
}
