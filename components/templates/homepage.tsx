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
import { Section } from '../section/section'
import { GridLayout } from '../grid-layout/grid-layout'
import { WorkItem } from '../work-item/work-item'

const Homepage = ({
  title,
  subtext,
  image,
  content,
  latest,
  articles
}: NonNullable<HomepageQueryResult>) => {
  const context = useContext(AppContext)
  const work = latest?.items || []
  const blog = articles?.items || []
  return (
    <>
      <div className="relative z-2 min-h-screen py-40 px-5 md:px-10 lg:px-20">
        <div
          className={classNames(
            'gap-20 2xl:gap-40 flex flex-col lg:flex-row items-center justify-center'
          )}
        >
          <Image
            width={484}
            height={715}
            src={urlForImage(image).url()}
            alt={title}
            className="min-w-100 2xl:min-w-121"
          />
          <div className="max-w-2xl">
            <h1 className="uppercase text-4xl mb-1">
              <span className="text-blue-500">{title.charAt(0)}</span>
              {title.slice(1)}
            </h1>
            <p className="text-grey-300 font-heading text-lg">{subtext}</p>
            {content && (
              <PortableTextRenderer className="mt-5" content={content} />
            )}
            {context?.resume && (
              <Link
                href={context.resume}
                download
                className={classNames(
                  'button-outline mt-5 group',
                  'hover:text-black-500'
                )}
              >
                Download CV{' '}
                <i className="w-4 transition-transform group-hover:rotate-45">
                  <Arrow />
                </i>
              </Link>
            )}
            <h6 className="mt-20 mb-4 relative flex items-center">
              Recent work{' '}
              <span className="h-[2px] w-10 bg-blue-500 absolute right-[calc(100%+1rem)]" />
            </h6>
            <WorkItem {...work[0]} variant="small" />
          </div>
        </div>
      </div>
      {work.length > 0 && (
        <Section
          className="bg-gray-100"
          title={latest?.title}
          description={latest?.description}
        >
          <GridLayout items={work} />
        </Section>
      )}
      {blog.length > 0 && (
        <Section className="bg-gray-100" title={articles?.title}>
          <GridLayout items={blog} />
        </Section>
      )}
    </>
  )
}
export default Homepage
