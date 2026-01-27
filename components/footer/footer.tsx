import Link from 'next/link'
import { Menu, MenuQueryResult, SettingsQueryResult } from '../../sanity.types'
import { DesktopMenu } from '../desktop-menu/desktop-menu'
import { Github } from '../svgs/github'
import { ReactElement } from 'react'
import { Twitter } from '../svgs/twitter'
import { LinkedIn } from '../svgs/linkedin'

const ICONS: Record<string, ReactElement> = {
  twitter: <Twitter />,
  linkedin: <LinkedIn />,
  github: <Github />
}
export const Footer = ({
  social,
  email
}: Omit<NonNullable<SettingsQueryResult>['info'], 'resume'>) => {
  return (
    <footer className="relative z-2 bg-blue-500 text-grey-100 px-5 md:px-10 lg:px-20 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <p className="text-sm max-w-sm">
          If you wish to contact me, please feel free to reach out via email at{' '}
          {email}.
        </p>
        {social && (
          <div className="flex items-center gap-5">
            <span className="eyebrow text-white">Follow me</span>
            <ul className="flex items-center gap-5">
              {Object.entries(social).map(([value, key]) => (
                <li key={key} className="w-5">
                  <Link href={value} target="_blank" className="text-grey-100">
                    {ICONS[value]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  )
}
