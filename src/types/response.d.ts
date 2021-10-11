enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

abstract class ApiResponse<T> {
  public statusCode: StatusCode;
  public status: ResponseStatus;
  public message: string;
  public data: T;
}

declare interface UserResponse extends ApiResponse<User> {
}

declare interface TagsResponse extends ApiResponse<Tag[]> {
}

declare interface ProfileResponse {
  profile: Profile
}

declare interface ArticleResponse {
  article: Article
}

declare interface ArticlesResponse extends ApiResponse<{
  articles: Article[]
  articlesCount: number
}> {
}

declare interface CommentResponse {
  comment: ArticleComment
}

declare interface CommentsResponse {
  comments: ArticleComment[]
}
