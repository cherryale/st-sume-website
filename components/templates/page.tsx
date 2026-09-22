'use client'
import { PageBySlugQueryResult } from '../../sanity.types'
import { Section } from '../section/section'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-rendered'
import { GridLayout } from '../grid-layout/grid-layout'
import { motion } from 'framer-motion'
import { revealVariant } from '../../lib/animation'
const BasicPage = ({
  title,
  content,
  work
}: NonNullable<PageBySlugQueryResult>) => {
  const latest = work || []
  return (
    <>
      <Section>
        <motion.div
          className="max-w-2xl mx-auto"
          variants={revealVariant}
          initial="initial"
          animate="animate"
        >
          <h1 className="mb-10 uppercase flex items-center justify-center text-center">
            <span className="text-blue-500">{title.charAt(0)}</span>
            {title.slice(1)}
          </h1>
          {content && (
            <PortableTextRenderer
              className="max-w-2xl mx-auto mt-20"
              content={content}
            />
          )}
        </motion.div>
      </Section>
      {latest.length > 0 && (
        <Section className="bg-gray-100" title="Research">
          <GridLayout
            items={latest.map((item) => ({ ...item, image: undefined }))}
          />
        </Section>
      )}
    </>
  )
}

export default BasicPage
