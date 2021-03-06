declare interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

declare interface Profile1 {
  email: string
  profilePicUrl: string,
  following: boolean
}

declare interface User {
  id: number
  email: string
  username: string
  bio: string | undefined
  image: string | undefined
  token: string
}

declare interface Login{
  token: string;
  success: boolean;
  user: User
}