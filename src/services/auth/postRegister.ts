import { request } from '../index'

import {
  mapGraphqlResponse,
} from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'
import { RegisterReponse, RegisterUser } from 'src/dto/user.type'

export interface PostRegisterForm {
  email: string
  password: string
  username: string
}

export async function postRegister (
  form: PostRegisterForm,
): Promise<Either<Error[], User>> {
  const variables = {
    query: `mutation Register {
      registerUser(input:
        {
          password: "${form.password}",
          email: "${form.email}",
          username: "${form.username}"
        }) {
        id
        email
        username
        profilePicUrl
      }
    }`,
  }

  const result1 = await request.checkablePostGraphql<RegisterUser>(
    variables,
  )

  const result2 = mapGraphqlResponse<Error[], RegisterUser>(
    result1,
  )

  if (result2.isOk()) return success(result2.value.registerUser)
  else return fail(result2.value)
}
