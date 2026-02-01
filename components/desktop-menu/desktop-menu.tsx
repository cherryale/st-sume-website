'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { resolveInternalLink } from '../../lib/resolvers'
import { MenuProps } from './menu'

export const DesktopMenu = ({
  items,
  resume
}: Omit<MenuProps, 'isMobileMenuOpen' | 'onMobileMenuToggle'>) => {
  const pathname = usePathname()
  return (
    <nav>
      <ul className="eyebrow flex gap-10 items-center text-sm">
        {items.map((item) => {
          const href = resolveInternalLink(item)
          const active = href === pathname
          return (
            <li
              key={item._key}
              className={classNames(
                'transition py-1',
                active && 'border-b border-blue-500'
              )}
            >
              <Link
                className={classNames(
                  'no-underline hover:text-black-500',
                  active ? 'text-black-500' : 'text-grey-300'
                )}
                href={href}
              >
                {item?.label || 'Menu link'}
              </Link>
            </li>
          )
        })}
        <li>
          <Link href={resume} download className="button-outline text-xs">
            Download CV
          </Link>
        </li>
      </ul>
    </nav>
  )
}
