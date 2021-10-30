import requestAuthorize, { request } from '../index'

import type { AuthorizationError } from '../../types/error'

import { Either, fail, success } from '../../utils/either'
import { mapAuthorizationResponse } from '../../utils/map-checkable-response'

export async function postFavoriteArticle(slug: string): Promise<Either<AuthorizationError, Article>> {
  const result1 = await requestAuthorize.checkablePost<ArticleResponse>(`/blogs/${slug}/favorite`)
  const result2 = mapAuthorizationResponse<ArticleResponse>(result1)

  if (result2.isOk()) return success(result2.value.data)
  return fail(result2.value)
}

export async function deleteFavoriteArticle(slug: string): Promise<Either<AuthorizationError, Article>> {
  const result1 = await requestAuthorize.checkableDelete<ArticleResponse>(`/blogs/${slug}/favorite`)
  const result2 = mapAuthorizationResponse<ArticleResponse>(result1)

  if (result2.isOk()) return success(result2.value.data)
  return fail(result2.value)
}
