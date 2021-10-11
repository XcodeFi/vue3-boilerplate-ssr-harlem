import { request } from '../index'

export function getAllTags(): Promise<Tag[]> {
  return request.get<TagsResponse>('/tags').then(res => res.data)
}
