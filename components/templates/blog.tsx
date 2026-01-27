import { BlogQueryResult } from '../../sanity.types'
import { Section } from '../section/section'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-rendered'
import { GridLayout } from '../grid-layout/grid-layout'

const Blog = ({ title, description, items }: NonNullable<BlogQueryResult>) => {
  return (
    <>
      <Section>
        <div className="max-w-2xl mx-auto text-center mb-20">
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
        </div>
        {items.length > 0 && <GridLayout items={items} />}
      </Section>
    </>
  )
}

export default Blog
