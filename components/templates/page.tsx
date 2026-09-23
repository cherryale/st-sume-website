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
  wip
}: NonNullable<PageBySlugQueryResult>) => {
  const research = items || []
  const papers = wip || []
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
        {research.length > 0 && (
          <div className="pt-10">
            <h4 className="mt-20 mb-5 relative flex items-center gap-2">
              <span className="h-[2px] w-8 bg-blue-500" /> Recent work
            </h4>
            <GridLayout variant="default" items={research} />
          </div>
        )}
      </Section>
      {papers.length > 0 && (
        <Section className="bg-gray-100" title="Works in Progress">
          <GridLayout
            variant="with-image"
            items={[
              ...papers.filter((item) => !!item.page),
              ...papers.filter((item) => !item.page)
            ]}
          />
        </Section>
      )}
    </>
  )
}

export default BasicPage
