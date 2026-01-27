'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { MenuProps } from './menu'
import { resolveInternalLink } from '../../lib/resolvers'

const menuWrapperVariant: Variants = {
  initial: { height: 0, overflow: 'hidden' },
  animate: {
    height: '100vh',
    transition: {
      duration: 0.75,
      ease: [0.19, 1, 0.22, 1]
    }
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.75,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}

export const MobileMenu = ({
  items,
  resume,
  isMobileMenuOpen,
  onMobileMenuToggle
}: MenuProps) => {
  const pathname = usePathname()

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <AnimatePresence>
      <MenuIcon isOpen={isMobileMenuOpen} handleClick={onMobileMenuToggle} />
      {isMobileMenuOpen && (
        <motion.nav
          key="mobile-menu-wrapper"
          variants={menuWrapperVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center bg-yellow-200 h-screen w-screen left-0 fixed top-0 z-4"
        >
          <ul className="flex flex-col items-center gap-5 list-none m-0 p-3">
            <li
              className={classNames(
                'transition py-1',
                pathname === '/' && 'border-b border-blue-500'
              )}
            >
              <Link
                href="/"
                className={classNames(
                  'no-underline',
                  pathname === '/' ? 'text-black-500' : 'text-grey-600'
                )}
              >
                Home
              </Link>
            </li>
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
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

const MenuIcon = ({
  handleClick,
  isOpen
}: {
  handleClick: () => void
  isOpen: boolean
}) => {
  return (
    <div className="relative z-[5]">
      <button
        className="bg-black rounded-[48px] h-10 w-10 border-none cursor-pointer flex items-center justify-center"
        onClick={handleClick}
        aria-label="Toggle menu"
      >
        <Image
          width="12"
          height="12"
          src={isOpen ? 'images/menu-close.svg' : 'images/menu-open.svg'}
          alt="Mobile menu icon"
        />
      </button>
    </div>
  )
}
