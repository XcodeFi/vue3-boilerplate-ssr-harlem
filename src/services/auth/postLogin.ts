import { request } from '../index'

import type { ValidationError } from '../../types/error'

import { mapValidationResponse } from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'

export interface PostLoginForm {
  email: string
  password: string
}

export type PostLoginErrors = Partial<Record<keyof PostLoginForm | 'message', string[]>>

export async function postLogin(form: PostLoginForm): Promise<Either<ValidationError<PostLoginErrors>, User>> {
  const result1 = await request.checkablePost<UserResponse>('/login', { ...form })
  const result2 = mapValidationResponse<PostLoginErrors, UserResponse>(result1)

  if (result2.isOk()) return success(result2.value.data);
  else return fail(result2.value)
}
