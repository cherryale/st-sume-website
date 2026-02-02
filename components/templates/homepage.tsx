'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
import { FollowMe } from '../follow-me/follow-me'
import { revealVariant } from '../../lib/animation'

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
      <div
        className={classNames(
          'relative z-2 min-h-screen py-10 px-5 md:px-10 2xl:px-20',
          'gap-20 2xl:gap-40 flex flex-col lg:flex-row items-center justify-center'
        )}
      >
        <FollowMe
          orientation="vertical"
          className="absolute hidden md:flex md:bottom-10 right-[4.5%]"
        />
        <motion.figure
          variants={revealVariant}
          initial="initial"
          animate="animate"
        >
          <Image
            width={484}
            height={715}
            src={urlForImage(image).url()}
            alt={title}
            className="md:min-w-100 2xl:min-w-121"
          />
        </motion.figure>
        <motion.div
          variants={revealVariant}
          initial="initial"
          animate="animate"
          className="max-w-xl"
        >
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
              className={classNames('button-outline mt-5 group')}
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
        </motion.div>
      </div>
      {work.length > 0 && (
        <Section title={latest?.title} description={latest?.description}>
          <GridLayout items={work} />
        </Section>
      )}
      {blog.length > 0 && (
        <Section title={articles?.title}>
          <GridLayout items={blog} />
        </Section>
      )}
    </>
  )
}
export default Homepage
