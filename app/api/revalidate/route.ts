import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const secret = process.env.SANITY_REVALIDATE_SECRET!

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string } | string
    }>(req, secret)

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    const type = body?._type
    const slug =
      typeof body?.slug === 'string' ? body.slug : body?.slug?.current

    if (!type) {
      return new Response('Bad Request: Missing _type', { status: 400 })
    }

    // Revalidate type-wide caches (list pages, etc.)
    revalidateTag(type, 'default')

    // Revalidate slug-specific caches (detail pages)
    if (slug) {
      revalidateTag(`${type}:${slug}`, 'default')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      tags: slug ? [type, `${type}:${slug}`] : [type]
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    )
  }
}
