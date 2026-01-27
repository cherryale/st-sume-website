import { Lines } from 'components/lines/lines'
import './globals.css'
import { getMenu, getSiteSettings } from '../lib/queries'
import { Header } from '../components/header/header'
import AppProvider from '../contexts/AppProvider'
import { Footer } from '../components/footer/footer'
import Link from 'next/link'
import { Credit } from '../components/credit/credit'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const isDraftMode = draftMode().isEnabled
  const settings = await getSiteSettings()
  const menu = await getMenu()
  // const { isEnabled: isDraftMode } = await draftMode()

  if (!settings) {
    throw new Error('Settings cannot be empty.')
  }

  if (!menu) {
    throw new Error('Menu cannot be empty.')
  }

  const resume = settings?.info?.resume || ''
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header {...menu} resume={resume} />
        <AppProvider context={{ resume: resume }}>{children}</AppProvider>
        <Lines />
        {settings?.info?.social && (
          <Footer social={settings.info.social} email={settings?.info?.email} />
        )}
        <Credit />
        {/* {isDraftMode && <VisualEditing />} */}
      </body>
    </html>
  )
}
