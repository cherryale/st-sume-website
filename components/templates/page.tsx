'use client'
import { PageBySlugQueryResult } from '../../sanity.types'
import { Section } from '../section/section'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-render'
import { GridLayout } from '../grid-layout/grid-layout'
import { motion } from 'framer-motion'
import { revealVariant } from '../../lib/animation'
const BasicPage = ({
  eyebrow,
  title,
  content,
  items,
  wip = []
}: NonNullable<PageBySlugQueryResult>) => {
  const research = items || []
  const papers = [
    ...wip.filter((item) => !!item.page),
    ...wip.filter((item) => !item.page)
  ]

  console.log('wip: ', wip)
  return (
    <>
      <Section className="mt-20">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={revealVariant}
          initial="initial"
          animate="animate"
        >
          {eyebrow && (
            <h1 className="eyebrow mb-5 text-center text-gray-500">
              {eyebrow}
            </h1>
          )}
          {eyebrow ? (
            <h2>{title}</h2>
          ) : (
            <h1 className="uppercase flex items-center justify-center text-center">
              <span className="text-blue-500">{title.charAt(0)}</span>
              {title.slice(1)}
            </h1>
          )}
          {content && (
            <PortableTextRenderer className="mt-12" content={content} />
          )}
        </motion.div>
      </Section>
      {research.length > 0 && (
        <Section className="bg-gray-100">
          <h4 className="mb-10 relative flex items-center gap-2">
            <span className="h-[2px] w-10 bg-blue-500 2xl:absolute right-[calc(100%+1rem)]" />
            Research
          </h4>
          <GridLayout variant="default" items={research} />
        </Section>
      )}
      {papers.length > 0 && (
        <Section className="bg-gray-100 pt-0">
          <h4 className="mb-10 relative flex items-center gap-2">
            <span className="h-[2px] w-10 bg-blue-500 2xl:absolute right-[calc(100%+1rem)]" />
            Works in progress
          </h4>
          <GridLayout variant="default" items={papers.slice(0, 3)} />
        </Section>
      )}
    </>
  )
}

export default BasicPage
