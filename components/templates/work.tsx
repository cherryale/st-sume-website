'use client'
import { WorkQueryResult } from '../../sanity.types'
import { Section } from '../section/section'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-rendered'
import { GridLayout } from '../grid-layout/grid-layout'
import { motion } from 'framer-motion'
import { revealVariant } from '../../lib/animation'

const Blog = ({ title, description, items }: NonNullable<WorkQueryResult>) => {
  return (
    <>
      <Section>
        <motion.div
          variants={revealVariant}
          initial="initial"
          animate="animate"
          className="max-w-2xl mx-auto"
        >
          <h1 className="uppercase flex items-center justify-center text-center mb-10">
            <span className="text-blue-500">{title.charAt(0)}</span>
            {title.slice(1)}
          </h1>
          {description && (
            <PortableTextRenderer
              className="max-w-2xl text-lg mx-auto mt-4"
              content={description}
            />
          )}
        </motion.div>
      </Section>
      {items.length > 0 && (
        <Section className="bg-gray-100">
          <GridLayout items={items} />
        </Section>
      )}
    </>
  )
}

export default Blog
