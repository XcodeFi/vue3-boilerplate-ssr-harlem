import { request } from '../index'

export function getArticle (slug: string): Promise<Article> {
  return request.get<ArticleResponse>(`/blogs/${slug}`).then(res => res.data)
}
