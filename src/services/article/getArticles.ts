import { ArticlePaging } from '../../dto/article.type'
import { ArticleResponseGraphql } from 'src/dto/article.type'
import { limit, request } from '../index'

export async function getArticles (page = 1): Promise<Pagination<Article>> {
  const pra = {
    query: `query {
      allArticles(pageInfo: {
          page: ${page},
          pageSize: ${limit}
      }) {
        totalCount
        hasPreviousPage
        hasNextPage
        page
        totalPages
        nextPage
        prevPage
        results {
          id
          title
          description
          text
          draftText
          tags
          imgUrl
          blogUrl
          likes
          score
          isSubmitted
          createdAt
          createdBy {
            email
            username
            profilePicUrl
          }
        }
      }
    }`,
  }

  const { data } = await request.post<ArticleResponseGraphql>('/', pra)
  return data.allArticles
}

export function getFavoritedArticles (username: string, page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit, favorited: username }
  return request.get<ArticlesResponse>('/blogs', { params })
}

export function getProfileArticles (username: string, page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit, author: username }
  return request.get<ArticlesResponse>('/blogs', { params })
}

export function getFeeds (page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/blogs/feed', { params })
}

export function getArticlesByTag (tagName: string, page = 1): Promise<ArticlesResponse> {
  const params = { tag: tagName, limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/blogs', { params })
}
