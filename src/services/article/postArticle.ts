import requestAuthorize, { request } from '../index'

interface PostArticleForm {
  title: string
  description: string
  blogUrl: string
  text: string
  tags: string[]
}

export function postArticle (form: PostArticleForm): Promise<Article> {
  return requestAuthorize.post<ArticleResponse>('/blogs', {
    title: form.title,
    description: form.description,
    text: form.text,
    blogUrl: form.blogUrl,
    imgUrl: 'string',
    score: 1,
    tags: form.tags,
  })
    .then(res => res.data)
}

export function putArticle (slug: string, form: PostArticleForm): Promise<Article> {
  return requestAuthorize.put<ArticleResponse>(`/blogs/${slug}`, {
    title: form.title,
    description: form.description,
    text: form.text,
    blogUrl: form.blogUrl,
    imgUrl: 'string',
    score: 1,
    tags: form.tags,
  })
    .then(res => res.data)
}
