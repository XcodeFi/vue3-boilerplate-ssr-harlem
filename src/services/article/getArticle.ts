import { request } from '../index'

export async function getArticle (slug: string): Promise<Article> {
  const variables = {
    query: `query GetArticle {
      getArticle(filter:
        {
          slug: "${slug}",
        }) {
          id
          title
          description
          text
          draftText
          tags
          score
          likes
          isSubmitted
          imgUrl
          createdAt
          blogUrl
      }
    }`,
  }

  const rs: Article = {
    favorited: false,
    favoritesCount: 0,
    favoritedUsers: [],
    id: '',
    title: '',
    description: '',
    text: '',
    draftText: '',
    tags: [],
    blogUrl: '',
    score: 0,
    isSubmitted: false,
    isDraft: false,
    isPublished: false
  }

  const result = await request.checkablePostGraphql<{
    getArticle: Article
  }>(variables)

  if (result.isOk()) return result.value.getArticle

  else return rs
}
