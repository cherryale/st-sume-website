import classNames from 'classnames'
import Link from 'next/link'
import { Arrow } from '../svgs/arrow'
import { WorkEntry } from '../../types/common'

interface WorkItemProps extends WorkEntry {
  variant?: 'default' | 'small'
}
export const WorkItem = ({
  title,
  subtext,
  label,
  type,
  link,
  file,
  year,
  variant = 'default'
}: WorkItemProps) => {
  const href = type === 'file' ? file : link
  const Content = (
    <>
      <span
        className={classNames(
          type === 'progress' ? 'text-gray-500' : 'text-blue-500',
          'eyebrow'
        )}
      >
        {label}
      </span>
      <h3
        className={classNames(
          variant === 'small' ? 'text-lg mt-1' : 'text-2xl mt-2',
          'font-heading mb-0 transition-colors underline-offset-3 decoration-1 group-hover:underline'
        )}
      >
        {title}
      </h3>

      {year && (
        <div className="text-gray-500 group-hover:text-gray-500">
          <p className={classNames('flex items-center gap-2 mt-2 text-sm')}>
            {year}
            {subtext && (
              <span className="inline-block h-3 w-[1px] bg-blue-500" />
            )}
            {subtext}
          </p>
        </div>
      )}
    </>
  )
  return type === 'progress' ? (
    <div
      className={classNames(
        'block',
        variant === 'default' ? 'p-10 bg-white' : ''
      )}
    >
      {Content}
    </div>
  ) : (
    <Link
      href={href || ''}
      target="_blank"
      download={type === 'file'}
      className={classNames(
        variant === 'small' ? '' : 'p-10 box-shadow bg-white',
        'block group no-underline'
      )}
    >
      {Content}
      <div className="inline-flex items-center gap-2 mt-10 eyebrow-lg text-black-500 group-hover:text-black-500">
        {type === 'file' ? 'Download' : 'Read more'}
        {
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
        }
      </div>
    </Link>
  )
}
