'use client'

import { ReactElement, useContext } from 'react'
import AppContext from '../../contexts/AppContext'
import Link from 'next/link'
import { Twitter } from '../svgs/twitter'
import { LinkedIn } from '../svgs/linkedin'
import { Github } from '../svgs/github'
import classNames from 'classnames'

const ICONS: Record<string, ReactElement> = {
  twitter: <Twitter />,
  linkedin: <LinkedIn />,
  github: <Github />
}

interface FollowMeProps {
  color?: 'light' | 'dark'
  orientation?: 'vertical' | 'horizontal'
  className?: string
}
export const FollowMe = ({
  orientation = 'horizontal',
  color = 'dark',
  className = ''
}: FollowMeProps) => {
  const context = useContext(AppContext)

  if (!context?.social) {
    return null
  }

  return (
    <div
      className={classNames(
        'flex items-center gap-5',
        orientation === 'vertical' ? 'md:flex-col justify-center' : '',
        className
      )}
    >
      <span
        className={classNames(
          'eyebrow',
          color === 'light' ? 'text-gray-50' : 'text-blue-500',
          orientation === 'vertical'
            ? 'md:rotate-90 md:absolute whitespace-nowrap top-[-100%]'
            : ''
        )}
      >
        Follow me
      </span>
      <ul
        className={classNames(
          'flex items-center gap-5',
          orientation === 'vertical' ? 'md:flex-col' : ''
        )}
      >
        {Object.entries(context.social).map(([key, value]) => {
          if (!value) {
            return null
          }

          return (
            <li key={key} className="w-5">
              <Link
                href={value}
                target="_blank"
                className={classNames(
                  color === 'light'
                    ? 'text-white hover:text-white'
                    : 'text-black-500 hover:text-blue-500'
                )}
                title={key}
              >
                {ICONS[key]}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
