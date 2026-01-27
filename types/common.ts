import {
  BlogPostBySlugQueryResult,
  PageBySlugQueryResult
} from '../sanity.types'

export type BlogEntry =
  NonNullable<BlogPostBySlugQueryResult>['related'][number]

export type WorkEntry = NonNullable<PageBySlugQueryResult>['work'][number]
