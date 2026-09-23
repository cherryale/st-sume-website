import type { PortableTextBlock } from 'sanity'
import Link from 'next/link'
import Image from 'next/image'

import React from 'react'
import { PortableText, PortableTextReactComponents } from 'next-sanity'
import classNames from 'classnames'
import { urlForImage } from '../../lib/resolvers'
import { ImageAsset } from 'sanity'

interface PortableTextImage {
  asset?: ImageAsset
  alt?: string
  caption?: string
}

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      if (!value?.asset) {
        return null
      }
      return (
        <figure className="flex flex-col items-center w-full mb-12">
          <Image
            alt={value?.alt || ''}
            width={1280}
            height={750}
            src={urlForImage(value).width(1280).height(750).url()}
          />
          {value?.caption && (
            <figcaption className="text-sm text-gray-500 mt-5 w-full">
              {value?.caption}
            </figcaption>
          )}
        </figure>
      )
    }
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    normal: ({ children }) => <p>{children}</p>
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-outside ml-6 my-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-outside ml-6 my-4">{children}</ol>
    )
  },
  marks: {
    strong: ({ children }) => <b>{children}</b>,
    em: ({ children }) => <i>{children}</i>,
    link: ({
      children,
      value
    }: {
      children: React.ReactNode
      value?: {
        href: string
      }
    }) => {
      if (value?.href) {
        return (
          <Link href={value.href} target="_blank">
            {children}
          </Link>
        )
      }
      return children
    }
  }
}

interface Props {
  content: PortableTextBlock[]
  className?: string
}
export const PortableTextRenderer = ({ content, className = '' }: Props) => {
  return (
    <div className={classNames('portable-text', className)}>
      <PortableText value={content} components={components} />
    </div>
  )
}
