'use client'
import { motion } from 'framer-motion'
import { revealVariant } from '../../lib/animation'
import { BlogEntry, WorkEntry } from '../../types/common'
import { BlogItem } from '../blog-item/blog-item'
import { WorkItem } from '../work-item/work-item'

interface GridLayoutProps {
  items: (BlogEntry | WorkEntry)[]
  variant?: 'small' | 'default' | 'with-image'
}
export const GridLayout = ({ items, variant }: GridLayoutProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => {
        return item._type === 'work' ? (
          <WorkItem key={item._id} {...item} variant={variant} />
        ) : (
          <BlogItem {...item} key={item._id} date={item?.date} />
        )
      })}
    </div>
  )
}
