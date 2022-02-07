import { checkAuthorization } from './../store/user'
/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CONFIG } from '../config'
import FetchRequest, { FetchRequestOptions } from '../utils/request'
import { user } from '../store/user'
import { Either } from 'src/utils/either'
import { NetworkError } from 'src/types/error'

export const limit = 10

export const request = new FetchRequest({
  prefix: `${CONFIG.API_HOST}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default class requestAuthorize {
  static post<T = unknown>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<T> {
    user.value && request.setAuthorizationHeader(user.value.token)
    return request.post(url, data)
  }

  static checkablePost<T = unknown>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<Either<NetworkError, T>> {
    user.value && request.setAuthorizationHeader(user.value.token)
    return request.checkablePost(url, data)
  }

  static put<T = unknown>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<T> {
    user.value && request.setAuthorizationHeader(user.value.token)
    return request.put(url, data)
  }

  static delete<T = unknown>(url: string, options?: Partial<FetchRequestOptions>): Promise<T> {
    user.value && request.setAuthorizationHeader(user.value.token)
    return request.delete(url)
  }

  static checkableDelete<T = unknown>(url: string, options?: Partial<FetchRequestOptions>): Promise<Either<NetworkError, T>> {
    user.value && request.setAuthorizationHeader(user.value.token)
    return request.checkableDelete(url)
  }

  static async checkablePostGraphql<T = unknown>(data?: unknown, options?: Partial<FetchRequestOptions>): Promise<Either<Error[], T>> {
    user.value && request.setAuthorizationHeader(user.value.token)
    return await request.checkablePostGraphql(data)
  }
}
