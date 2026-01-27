'use client'
import Link from 'next/link'
import { MenuQueryResult } from '../../sanity.types'
import { DesktopMenu } from '../desktop-menu/desktop-menu'
import { Lines } from '../lines/lines'
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

export const Header = ({
  items,
  resume
}: NonNullable<MenuQueryResult> & {
  resume: string
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [hasWindow, setHasWindow] = useState(false)
  const checkScreenSize = () => {
    const isSmallScreen = window.innerWidth < 900
    // setIsMobile(isSmallScreen)

    if (!isSmallScreen) {
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)

      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
      return () => window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  const handleScroll = debounce(() => {
    const div = ref?.current
    const scrollY = window.scrollY

    if (div) {
      if (scrollY < 80) {
        div.style.position = 'absolute'
        div.style.transform = 'none'
        div.style.transition = 'none'
        div.style.boxShadow = 'none'
        div.style.background = 'transparent'
        setIsSticky(false)
      }
      // set isSticky to true if the user has scrolled more than 80px
      if (scrollY >= 80 && !isSticky) {
        const height = div.getBoundingClientRect().height
        if (window.scrollY > height) {
          div.style.position = 'fixed'
          div.style.transform = 'translateY(-100%)'
          div.style.background = '#fff'

          setTimeout(() => {
            div.style.transition = 'all 0.4s cubic-bezier(0.83, 0, 0.17, 1)'
          }, 100)

          setTimeout(() => {
            div.style.transform = 'translateY(0)'
            div.style.boxShadow = '0 0 40px rgba(0, 0, 0, 0.1)'
          }, 300)

          setIsSticky(true)
        }
      }
    }
  }, 100)

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return
  }, [handleScroll])

  return (
    <header
      ref={ref}
      className="flex absolute justify-between top-0 left-0 w-full py-5 px-5 md:px-10 lg:px-20 z-5 overflow-hidden"
    >
      <Lines verticalOnly position="absolute" />
      <div className="flex items-center">
        <Link href="/" className="flex gap-2 eyebrow no-underline">
          <span className="text-blue-500">St</span>
          <span className="text-black-500">Sume</span>
        </Link>
      </div>
      {items && resume && <DesktopMenu items={items} resume={resume} />}
    </header>
  )
}
