import { Lines } from 'components/lines/lines'
import { getMenu, getSiteSettings } from '../../lib/queries'
import { Header } from '../../components/header/header'
import AppProvider from '../../contexts/AppProvider'
import { Footer } from '../../components/footer/footer'
import { Credit } from '../../components/credit/credit'
import { description } from '../../lib/demo.data'

export default async function SiteLayout({
  children
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const menu = await getMenu()

  if (!settings) {
    throw new Error('Settings cannot be empty.')
  }

  if (!menu) {
    throw new Error('Menu cannot be empty.')
  }

  const resume = settings?.info?.resume || ''
  return (
    <>
      <AppProvider
        context={{
          thumbnail: settings?.info?.thumbnail,
          resume: resume,
          social: settings?.info?.social,
          title: settings.title,
          description: settings.description
        }}
      >
        <Header {...menu} resume={resume} />
        {children}
        {settings?.info?.social && <Footer email={settings?.info?.email} />}
        <Credit />
      </AppProvider>
      <Lines />
    </>
  )
}
