import requestAuthorize, { request } from '../index'

interface PostArticleForm {
  title: string
  description: string,
  blogUrl: string,
  body: string
  tagList: string[]
}

export function postArticle(form: PostArticleForm): Promise<Article> {
  return requestAuthorize.post<ArticleResponse>('/blogs', {
    title: form.title,
    description: form.description,
    text: form.body,
    blogUrl: form.blogUrl,
    imgUrl: "string",
    score: 1,
    tags: form.tagList
  })
    .then(res => res.article)
}

export function putArticle(slug: string, form: PostArticleForm): Promise<Article> {
  return request.put<ArticleResponse>(`/blogs/${slug}`, form)
    .then(res => res.article)
}
