import { request } from '../index'

export function getCommentsByArticle (slug: string): Promise<ArticleComment[]> {
  return request.get<CommentsResponse>(`/blogs/${slug}/comments`).then(res => res.comments)
}
