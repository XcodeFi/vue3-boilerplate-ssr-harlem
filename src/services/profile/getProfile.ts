import { request } from '../index'

export function getProfile (username: string): Promise<Profile1> {
  return request.get<ProfileResponse>(`/profiles/${username}`).then(res => res.data)
}
