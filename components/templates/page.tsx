import Image from 'next/image'
import {
  BlogPostBySlugQueryResult,
  PageBySlugQueryResult
} from '../../sanity.types'
import { Section } from '../section/section'
import { urlForImage } from '../../lib/resolvers'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-rendered'
import { BlogItem } from '../blog-item/blog-item'
import { WorkItem } from '../work-item/work-item'
import { GridLayout } from '../grid-layout/grid-layout'

const BasicPage = ({
  title,
  content,
  work
}: NonNullable<PageBySlugQueryResult>) => {
  const latest = work || []
  return (
    <>
      <Section>
        <div className="max-w-2xl mx-auto">
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
        </div>
      </Section>
      {latest.length > 0 && (
        <Section className="bg-grey-100" title="Research">
          <GridLayout items={latest} />
        </Section>
      )}
    </>
  )
}

export default BasicPage
