'use client'
import Link from 'next/link'
import Image from 'next/image'
import { HomepageQueryResult } from '../../sanity.types'
import { urlForImage } from '../../lib/resolvers'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-rendered'
import classNames from 'classnames'
import { useContext } from 'react'
import AppContext from '../../contexts/AppContext'
import { Arrow } from '../svgs/arrow'

const Homepage = ({
  title,
  subtext,
  image,
  content,
  latest
}: NonNullable<HomepageQueryResult>) => {
  const context = useContext(AppContext)
  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-10">
      <div className="max-w-7xl flex justify-between items-center gap-20">
        <Image
          width={375}
          height={552}
          src={urlForImage(image).url()}
          alt={title}
          className="min-w-100"
        />
        <div className="max-w-180">
          <h1 className="uppercase text-4xl mb-1">
            <span className="text-blue-500">{title.charAt(0)}</span>
            {title.slice(1)}
          </h1>
          <p className="text-grey-300 font-heading text-lg">{subtext}</p>
          {content && (
            <PortableTextRenderer className="mt-8" content={content} />
          )}
          {context?.resume && (
            <Link
              href={context.resume}
              download
              className={classNames(
                'inline-flex gap-2 items-center text-center py-3 min-w-50 mt-10',
                'text-sm uppercase tracking-[5px] font-medium no-underline group',
                'hover:underline hover:text-black-500'
              )}
            >
              Download CV{' '}
              <i className="transition-transform rotate-45 group-hover:rotate-90">
                <Arrow />
              </i>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
export default Homepage
