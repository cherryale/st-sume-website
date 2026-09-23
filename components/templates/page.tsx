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
  work
}: NonNullable<PageBySlugQueryResult>) => {
  const latest = work || []
  return (
    <>
      <Section className="mt-20">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={revealVariant}
          initial="initial"
          animate="animate"
        >
          {eyebrow && <h1 className="eyebrow mb-5 text-center">{eyebrow}</h1>}
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
