import classNames from 'classnames'
import { ReactNode } from 'react'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-rendered'
import type { PortableTextBlock } from 'sanity'

interface Props {
  className?: string
  title?: string
  description?: PortableTextBlock[] | null
  children: ReactNode
}
export const Section = ({
  className = '',
  title,
  description,
  children
}: Props) => {
  return (
    <div className={classNames('px-5 md:px-10 lg:px-20 py-40', className)}>
      <div className="max-w-7xl mx-auto relative z-2">
        {title && (
          <h2 className="mb-10 uppercase text-3xl flex items-center justify-center text-center">
            <span className="hidden md:inline-block w-20 h-1 bg-blue-500 mr-4" />
            <span className="text-blue-500">{title.charAt(0)}</span>
            {title.slice(1)}
            <span className="hidden md:inline-block w-20 h-1 bg-blue-500 ml-4" />
          </h2>
        )}
        {description && (
          <div className="max-w-2xl mx-auto text-center text-lg mt-4 relative z-2">
            <PortableTextRenderer content={description} />
          </div>
        )}
        <div
          className={classNames(
            'relative z-2',
            title || description ? 'mt-20' : ''
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
