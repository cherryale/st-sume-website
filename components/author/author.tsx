'use client'

import { useContext } from 'react'
import AppContext from '../../contexts/AppContext'
import { FollowMe } from '../follow-me/follow-me'
import Image from 'next/image'
import { urlForImage } from '../../lib/resolvers'

export const Author = () => {
  const context = useContext(AppContext)

  if (!context?.title || !context?.description) {
    return null
  }
  return (
    <div className="flex gap-10 mt-20 px-10 pt-20 border-t border-blue-500">
      {context?.thumbnail && (
        <figure className="min-w-20 h-20">
          <Image
            alt=""
            src={urlForImage(context.thumbnail).width(200).height(200).url()}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </figure>
      )}
      <div>
        <h6 className="uppercase text-2xl mb-4">
          <span className="text-blue-500">{context.title.charAt(0)}</span>
          {context.title.slice(1)}
        </h6>
        <p>{context.description}</p>
        <FollowMe className="mt-10 mx-auto" />
      </div>
    </div>
  )
}
