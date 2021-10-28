import requestAuthorize, { request } from '../index'

export function deleteComment (slug: string, commentId: string): Promise<Record<string, unknown>> {
  return requestAuthorize.delete(`/blogs/${slug}/comments/${commentId}`)
}

export function postComment (slug: string, body: string): Promise<ArticleComment> {
  return requestAuthorize.post<CommentResponse>(`/blogs/${slug}/comments`, { body } )
    .then(res => res.data)
}
