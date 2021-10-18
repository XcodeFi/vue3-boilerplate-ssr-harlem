declare interface Article {
  title: string
  blogUrl: string
  text: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  description: string
  author: Profile
  favorited: boolean
  favoritesCount: number
}
