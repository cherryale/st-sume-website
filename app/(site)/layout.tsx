import { Lines } from 'components/lines/lines'
import { getMenu, getSiteSettings } from '../../lib/queries'
import { Header } from '../../components/header/header'
import AppProvider from '../../contexts/AppProvider'
import { Footer } from '../../components/footer/footer'
import { Credit } from '../../components/credit/credit'

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
      <Header {...menu} resume={resume} />
      <AppProvider context={{ resume: resume, social: settings?.info?.social }}>
        {children}
        {settings?.info?.social && (
          <Footer
            social={settings.info.social}
            email={settings?.info?.email}
          />
        )}
        <Credit />
      </AppProvider>
      <Lines />
    </>
  )
}
