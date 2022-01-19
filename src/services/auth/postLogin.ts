import { request } from '../index'

import { mapGraphqlResponse } from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'

export interface PostLoginForm {
  email: string
  password: string
}

export type PostLoginErrors = Partial<Record<keyof PostLoginForm, string[]>>

export async function postLogin (
  form: PostLoginForm,
): Promise<Either<Error[], LoginRes>> {
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

  const result3 = await request.checkablePostGraphql<{login: LoginRes}>(pra)

  const result2 = mapGraphqlResponse<Error[], {login: LoginRes}>(
    result3,
  )

  if (result2.isOk()) return success(result2.value.login)
  else return fail(result2.value)
}
