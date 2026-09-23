'use client'
import Image from 'next/image'
import { BlogPostBySlugQueryResult } from '../../sanity.types'
import { Section } from '../section/section'
import { urlForImage } from '../../lib/resolvers'
import { PortableTextRenderer } from '../portable-text-renderer/portable-text-render'
import { GridLayout } from '../grid-layout/grid-layout'
import { motion } from 'framer-motion'
import { revealVariant } from '../../lib/animation'
import { Author } from '../author/author'

const BlogPost = ({
  _createdAt,
  title,
  image,
  excerpt,
  date,
  content,
  related
}: NonNullable<BlogPostBySlugQueryResult>) => {
  const publishedAt = new Date(date || _createdAt).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  const articles = related || []
  return (
    <motion.div variants={revealVariant} initial="initial" animate="animate">
      <Section className="mt-20">
        <div className="max-w-2xl text-center mx-auto">
          <span className="block eyebrow text-gray-700">{publishedAt}</span>
          <h1 className="text-6xl mt-2 font-heading">{title}</h1>
          {excerpt && <p className="text-lg mt-10">{excerpt}</p>}
        </div>
        {image && (
          <figure className="flex flex-col items-center w-full mt-12">
            <Image
              alt={image?.alt || ''}
              width={1280}
              height={750}
              src={urlForImage(image).width(1280).height(750).url()}
            />
            {image?.caption && (
              <figcaption className="text-sm text-gray-500 mt-5 w-full">
                {image?.caption}
              </figcaption>
            )}
          </figure>
        )}
        {content && (
          <div className="max-w-2xl mx-auto mt-12">
            <PortableTextRenderer content={content} />
            <Author />
          </div>
        )}
      </Section>
      {articles.length > 0 && (
        <Section className="bg-gray-100" title="More articles">
          <GridLayout items={articles} />
        </Section>
      )}
    </motion.div>
  )
}

export default BlogPost
