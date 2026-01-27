'use client'
import { BlogQueryResult } from '../../sanity.types'
import { Section } from '../section/section'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-rendered'
import { GridLayout } from '../grid-layout/grid-layout'
import { motion } from 'framer-motion'
import { revealVariant } from '../../lib/animation'

const Blog = ({ title, description, items }: NonNullable<BlogQueryResult>) => {
  return (
    <Section>
      <motion.div
        variants={revealVariant}
        initial="initial"
        animate="animate"
        className="max-w-2xl mx-auto text-center mb-20"
      >
        <h1 className="uppercase flex items-center justify-center">
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
      {items.length > 0 && <GridLayout items={items} />}
    </Section>
  )
}

export default Blog
