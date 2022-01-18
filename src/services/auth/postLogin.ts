import { GraphqlError } from './../../types/error';
import { request } from '../index'

import type { ValidationError } from '../../types/error'

import { mapGraphqlResponse, mapValidationResponse } from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'
import { useQuery } from 'villus'

export interface PostLoginForm {
  email: string
  password: string
}

export type PostLoginErrors = Partial<Record<keyof PostLoginForm, string[]>>

export async function postLogin (
  form: PostLoginForm,
): Promise<Either<GraphqlError<Error[]>, Login>> {
  const pra = {
    query: `mutation login {
      login(input:{
        email:"${form.email}",
        password:"${form.password}"
      })
      {
        token
        success
        user {
          email
          username
        }
      }
    }`,
  }

  const result3 = await request.checkablePostGraphql<UserResponseGraphql>(pra)

  debugger
  const result2 = mapGraphqlResponse<Error[], UserResponseGraphql>(
    result3,
  )

  if (result2.isOk()) return success(result2.value.data)
  else return fail(result2.value)
}
