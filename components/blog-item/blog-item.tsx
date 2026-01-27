import classNames from 'classnames'
import { BlogPostBySlugQueryResult } from '../../sanity.types'
import Link from 'next/link'
import { Arrow } from '../svgs/arrow'
import Image from 'next/image'
import { urlForImage } from '../../lib/resolvers'

type BlogPost = NonNullable<BlogPostBySlugQueryResult>['related'][number]
type BlogItemProps = Omit<BlogPost, 'date'> & {
  date: string
}

export const BlogItem = ({
  title,
  excerpt,
  image,
  date,
  slug
}: BlogItemProps) => {
  const publishedAt = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  return (
    <Link
      href={`blog/${slug}`}
      className={classNames('block', 'group transition no-underline')}
    >
      {image && (
        <figure className="aspect-video overflow-hidden">
          <Image
            alt={image?.alt || ''}
            width={900}
            height={562}
            src={urlForImage(image).width(900).height(562).url()}
            className="transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </figure>
      )}
      <div className="p-5">
        <span className="block eyebrow text-grey-300">{publishedAt}</span>
        <h3 className="text-2xl font-heading letter mt-2 mb-0 group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
        {excerpt && <p className="text-grey-600 text-sm mt-2">{excerpt}</p>}
        <div className="inline-flex items-center gap-2 mt-10 eyebrow-lg text-black-500 group-hover:text-black-500">
          Read more
          <i
            className={classNames(
              'text-black-500 w-4 transition',
              'group-hover:text-black-500 group-hover:rotate-[-45deg]'
            )}
          >
            <Arrow />
          </i>
        </div>
      </div>
    </Link>
  )
}
