import Homepage from 'components/templates/homepage'
import { getHomepage } from '../lib/queries'
import { notFound } from 'next/navigation'

export default async function Home() {
  const data = await getHomepage()

  if (!data) {
    notFound()
  }

  return <Homepage {...data} />
}
