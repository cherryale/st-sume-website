import { BlogEntry, WorkEntry } from '../../types/common'
import { BlogItem } from '../blog-item/blog-item'
import { WorkItem } from '../work-item/work-item'

interface GridLayoutProps {
  items: (BlogEntry | WorkEntry)[]
}
export const GridLayout = ({ items }: GridLayoutProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map((item) => {
        return item._type === 'work' ? (
          <WorkItem key={item._id} {...item} />
        ) : (
          <BlogItem
            {...item}
            key={item._id}
            date={item?.date || item._createdAt}
          />
        )
      })}
    </div>
  )
}
