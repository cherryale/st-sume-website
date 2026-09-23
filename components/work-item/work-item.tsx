import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { Arrow } from '../svgs/arrow'
import { WorkEntry } from '../../types/common'
import { urlForImage } from '../../lib/resolvers'

interface WorkItemProps extends WorkEntry {
  variant?: 'default' | 'small' | 'with-image'
}

const ReadMore = ({ type }: Pick<WorkItemProps, 'type'>) => (
  <div className="inline-flex items-center gap-2 mt-10 eyebrow-lg text-black-500 group-hover:text-black-500">
    {type === 'file' ? 'Download' : 'Read more'}
    <i
      className={classNames(
        'text-black-500 w-4 group-hover:text-black-500 transition',
        type === 'file'
          ? 'group-hover:rotate-45'
          : 'group-hover:rotate-[-45deg]'
      )}
    >
      <Arrow />
    </i>
  </div>
)

/**
 * Compact variant with no card frame, used for a single highlighted item
 * (e.g. the homepage's "Recent work" callout).
 */
const Small = ({
  title,
  subtext,
  label,
  type,
  link,
  file,
  year
}: WorkItemProps) => {
  const href = type === 'file' ? file : link
  return (
    <Link
      href={href || ''}
      target="_blank"
      download={type === 'file'}
      className="block group no-underline"
    >
      <span className="eyebrow text-blue-500">{label}</span>
      <h3 className="text-lg mt-1 font-heading mb-0 transition-colors underline-offset-3 decoration-1 group-hover:underline">
        {title}
      </h3>
      {(year || subtext) && (
        <div className="text-gray-500 group-hover:text-gray-500">
          <p className="flex items-center gap-2 mt-2 text-sm">
            {year}
            {year && subtext && (
              <span className="inline-block h-3 w-[1px] bg-blue-500" />
            )}
            {subtext}
          </p>
        </div>
      )}
      <ReadMore type={type} />
    </Link>
  )
}

/**
 * Standard card variant for link / file / page items — a boxed card with
 * no thumbnail.
 */
const Default = ({
  title,
  subtext,
  label,
  type,
  link,
  file,
  year
}: WorkItemProps) => {
  const href = type === 'file' ? file : link
  return (
    <Link
      href={href || ''}
      target="_blank"
      download={type === 'file'}
      className="p-10 box-shadow bg-white block group no-underline"
    >
      <span
        className={classNames(
          'eyebrow',
          type === 'progress' ? 'text-gray-500' : 'text-blue-500'
        )}
      >
        {label}
      </span>
      <h3 className="text-2xl mt-2 font-heading mb-0 transition-colors underline-offset-3 decoration-1 group-hover:underline">
        {title}
      </h3>
      {(year || subtext) && (
        <div className="text-gray-500 group-hover:text-gray-500">
          <p className="flex items-center gap-2 mt-2 text-sm">
            {year}
            {year && subtext && (
              <span className="inline-block h-3 w-[1px] bg-blue-500" />
            )}
            {subtext}
          </p>
        </div>
      )}
      {(file || link) && <ReadMore type={type} />}
    </Link>
  )
}

/**
 * Card variant for "in progress" items, with an optional thumbnail image.
 * Only links out when an internal page is set — otherwise it's static.
 */
const WithImage = ({
  image,
  title,
  subtext,
  label,
  page,
  year
}: WorkItemProps) => {
  const content = (
    <>
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
      <div
        className={classNames('block', image ? 'p-5' : 'p-10 bg-white h-full')}
      >
        <span className="eyebrow text-gray-500">{label}</span>
        <h3 className="text-2xl mt-2 font-heading mb-0 transition-colors underline-offset-3 decoration-1 group-hover:underline">
          {title}
        </h3>
        {(year || subtext) && (
          <div className="text-gray-500 group-hover:text-gray-500">
            <p className="flex items-center gap-2 mt-2 text-sm">
              {year}
              {year && subtext && (
                <span className="inline-block h-3 w-[1px] bg-blue-500" />
              )}
              {subtext}
            </p>
          </div>
        )}
        {page && (
          <div className="inline-flex items-center gap-2 mt-10 eyebrow-lg text-black-500 group-hover:text-black-500">
            Read more
            <i className="text-black-500 w-4 group-hover:text-black-500 transition group-hover:rotate-[-45deg]">
              <Arrow />
            </i>
          </div>
        )}
      </div>
    </>
  )

  return page ? (
    <Link
      href={`/${page}`}
      className="p-5 box-shadow bg-white block group no-underline"
    >
      {content}
    </Link>
  ) : (
    <div className="h-full p-5">{content}</div>
  )
}

export const WorkItem = (props: WorkItemProps) => {
  // "In progress" items always carry the image-card treatment, whether or
  // not a parent grid explicitly asked for the "with-image" variant.
  if (props.variant === 'with-image') {
    return <WithImage {...props} />
  }
  if (props.variant === 'small') {
    return <Small {...props} />
  }
  return <Default {...props} />
}
