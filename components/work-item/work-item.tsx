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
  variant = 'default'
}: WorkItemProps) => {
  const href = type === 'file' ? file : link
  const Content = (
    <>
      <span className="eyebrow text-grey-300">{label}</span>
      <h3
        className={classNames(
          variant === 'small' ? 'text-lg mt-1' : 'text-2xl mt-2',
          'font-heading mb-0 transition-colors',
          'group-hover:text-blue-500'
        )}
      >
        {title}
      </h3>
      {subtext && (
        <p
          className={classNames(
            variant === 'small' ? 'text-sm' : '',
            'text-grey-600 mt-2'
          )}
        >
          {subtext}
        </p>
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
        'block group transition no-underline'
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
