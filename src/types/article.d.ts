declare interface Article {
  title: string
  blogUrl: string
  text: string
  createdAt: string
  updatedAt: string
  tags: Tag[]
  description: string
  author: Profile1
  favorited: boolean
  favoritesCount: number
  favoritedUsers: User[]
}
