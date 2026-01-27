'use client'
import { MenuQueryResult } from '../../sanity.types'
import { Lines } from '../lines/lines'
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import { Menu } from '../desktop-menu/menu'
import { Logo } from '../logo/logo'
import { MenuIcon } from '../menu-icon/menu-icon'
import classNames from 'classnames'

export const Header = ({
  items,
  resume
}: NonNullable<MenuQueryResult> & {
  resume: string
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [hasWindow, setHasWindow] = useState(false)
  const checkScreenSize = () => {
    const isSmallScreen = window.innerWidth < 900
    setIsMobile(isSmallScreen)

    if (!isSmallScreen) {
      setIsMobileMenuOpen(false)
    }
  }

  const onMobileMenuToggle = () => {
    setIsMobileMenuOpen((state: boolean) => {
      const newState = !state
      document.documentElement.classList.toggle('overflow-hidden', newState)
      return newState
    })
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
        setIsSticky(false)
      }
      // set isSticky to true if the user has scrolled more than 80px
      if (scrollY >= 80 && !isSticky) {
        const height = div.getBoundingClientRect().height
        if (window.scrollY > height) {
          div.style.position = 'fixed'
          div.style.transform = 'translateY(-100%)'

          setTimeout(() => {
            div.style.transition = 'all 0.4s cubic-bezier(0.83, 0, 0.17, 1)'
          }, 100)

          setTimeout(() => {
            div.style.transform = 'translateY(0)'
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
      className={classNames(
        'absolute top-0 left-0 w-full h-20 z-5 overflow-hidden',
        'bg-white px-5 md:px-10 2xl:px-20',
        'flex justify-between items-center'
      )}
    >
      {(!isMobile || !isMobileMenuOpen) && (
        <Lines verticalOnly position="absolute" />
      )}
      <Logo
        onClick={
          isMobile
            ? () => {
                setIsMobileMenuOpen(() => {
                  document.documentElement.classList.toggle(
                    'overflow-hidden',
                    false
                  )
                  return false
                })
              }
            : undefined
        }
      />
      {items && resume && (
        <Menu
          items={items}
          resume={resume}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={onMobileMenuToggle}
        />
      )}
      {isMobile && (
        <MenuIcon isOpen={isMobileMenuOpen} handleClick={onMobileMenuToggle} />
      )}
    </header>
  )
}
