'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { MenuQueryResult } from '../../sanity.types'

type Props = {
  modifierClasses?: string
  items: NonNullable<NonNullable<MenuQueryResult>['items']>
  resume: string
}
export const DesktopMenu = ({ items, resume }: Props) => {
  const pathname = usePathname()
  return (
    <nav>
      <ul className="flex gap-10 items-center">
        <li>
          <Link
            href="/"
            className={classNames(
              'no-underline text-grey-600',
              '/' === pathname && 'text-black-500'
            )}
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item._key}>
            <Link
              className={classNames(
                'no-underline text-grey-600',
                item.slug === pathname && 'text-black-500'
              )}
              href={item?.slug || ''}
            >
              {item?.label || 'Menu link'}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={resume}
            download
            className={classNames(
              'eyebrow no-underline text-center p-3',
              'flex justify-center border border-black min-w-40'
            )}
          >
            Download CV
          </Link>
        </li>
      </ul>
    </nav>
  )
}
