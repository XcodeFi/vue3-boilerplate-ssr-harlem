import { request } from '../index'

export function getAllTags(): Promise<Tag[]> {
  return request.get<TagsResponse>('/').then(res => res.data)
}
