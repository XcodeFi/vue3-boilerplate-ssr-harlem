import { request } from '../index'

import type { GraphqlError, ValidationError } from '../../types/error'

import {
  mapGraphqlResponse,
  mapValidationResponse,
} from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'
import { RegisterReponse } from 'src/dto/user.type'

export interface PostRegisterForm {
  email: string
  password: string
  username: string
}

export type PostRegisterErrors = Error[]

export async function postRegister (
  form: PostRegisterForm,
): Promise<Either<Error[], User>> {
  const variables = {
    query: `mutation Register {
      registerUser(input:{password: "${form.password}", email: "${form.email}", username: "${form.username}"}) {
        id
        email
        username
        profilePicUrl
      }
    }`,
  }

  const result1 = await request.checkablePostGraphql<RegisterReponse>(
    variables,
  )

  const result2 = mapGraphqlResponse<RegisterReponse>(
    result1,
  )

  if (result2.isOk()) return success(result2.value.data.registerUser)
  else return fail(result2.value)
}
