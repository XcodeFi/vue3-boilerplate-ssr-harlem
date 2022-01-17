import requestAuthorize from '../index'

import type { AuthorizationError } from '../../types/error'

import { mapAuthorizationResponse } from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'

export async function postLogout (form: User | null): Promise<Either<AuthorizationError, User>> {
  const result1 = await requestAuthorize.checkablePost<UserResponse>('/logout', { id: form?.id })
  const result2 = mapAuthorizationResponse<UserResponse>(result1)

  if (result2.isOk()) return success(result2.value.data)
  else return fail(result2.value)
}
