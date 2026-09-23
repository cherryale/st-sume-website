'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { MenuProps } from './menu'
import { resolveInternalLink } from '../../lib/resolvers'
import { FollowMe } from '../follow-me/follow-me'
import { Lines } from '../lines/lines'

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
      ease: [0.19, 1, 0.22, 1],
      delay: 0.5
    }
  }
}

const contentVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.5
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.3,
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
      {isMobileMenuOpen && (
        <>
          <motion.nav
            key="mobile-menu-wrapper"
            variants={menuWrapperVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-center bg-white h-[calc(100vh/2)] w-screen left-0 fixed top-0 z-4 overflow-hidden"
          >
            <Lines position="absolute" />
            <motion.ul
              variants={contentVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center gap-5 list-none eyebrow !text-base text-gray-500"
            >
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
                        active ? 'text-black-500' : 'text-gray-500'
                      )}
                      href={href}
                      onClick={onMobileMenuToggle}
                    >
                      {item?.label || 'Menu link'}
                    </Link>
                  </li>
                )
              })}
              <li className="mt-10">
                <Link
                  download
                  href={resume}
                  target="_blank"
                  className="button-outline text-xs"
                >
                  Download CV
                </Link>
              </li>
            </motion.ul>
            <motion.div
              key="follow-me"
              variants={contentVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute bottom-10"
            >
              <FollowMe orientation="vertical" />
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
