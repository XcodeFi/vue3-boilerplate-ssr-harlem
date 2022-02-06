import { Either, fail, success } from 'src/utils/either'
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

export async function postArticleGraphql (form: PostArticleForm):
Promise<Either<Error[], Article>> {
  const variables = {
    query: `mutation CreateArticle {
      createArticle(input:
        {
          title: "${form.title}",
          description: "${form.description}",
          text: "${form.text}",
          blogUrl: "${form.blogUrl}",
          tags: ${JSON.stringify(form.tags)},
        }) {
          id
          title
          description
          draftText
          tags
          text
          imgUrl
          blogUrl
          likes
          score
          isSubmitted
      }
    }`,
  }

  const result = await requestAuthorize.checkablePostGraphql<{
    createArticle: Article
  }>(variables)

  if (result.isOk()) return success(result.value.createArticle)
  else return fail(result.value)
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
