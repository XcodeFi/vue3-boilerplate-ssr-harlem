declare interface Article {
  favorited: boolean
  favoritesCount: number
  favoritedUsers: User[]

  id: string
  title: string
  description: string
  text?: string
  draftText?: string
  tags: string[]
  imgUrl?: string
  blogUrl: string
  likes?: number
  score: number
  isSubmitted: boolean
  isDraft: boolean
  isPublished: boolean
  status?: boolean
  publishedAt?: Date
  createdBy?: User | string
  updatedBy?: User | string
  createdAt?: Date
  updatedAt?: Date
}
