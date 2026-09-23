'use client'
import classNames from 'classnames'
import { WorkQueryResult } from '../../sanity.types'
import { Section } from '../section/section'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-render'
import { GridLayout } from '../grid-layout/grid-layout'
import { motion } from 'framer-motion'
import { revealVariant } from '../../lib/animation'

const Work = ({
  title,
  description,
  items,
  wip
}: NonNullable<WorkQueryResult>) => {
  const research = items || []
  const papers = wip || []
  return (
    <>
      <Section className="mt-20">
        <motion.div
          variants={revealVariant}
          initial="initial"
          animate="animate"
        >
          <h1 className="uppercase flex items-center justify-center text-center">
            <span className="text-blue-500">{title.charAt(0)}</span>
            {title.slice(1)}
          </h1>
          {description && (
            <PortableTextRenderer
              className="max-w-2xl text-lg mx-auto mt-12"
              content={description}
            />
          )}
        </motion.div>
      </Section>
      {research.length > 0 && (
        <Section className="bg-gray-100" title="Recent work">
          <GridLayout variant="default" items={research} />
        </Section>
      )}
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

export default Work
