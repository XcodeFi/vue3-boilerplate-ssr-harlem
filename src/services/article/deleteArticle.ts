import requestAuthorize, { request } from '../index'

export function deleteArticle(slug: string): Promise<void> {
  return requestAuthorize.delete(`/blogs/${slug}`)
}
