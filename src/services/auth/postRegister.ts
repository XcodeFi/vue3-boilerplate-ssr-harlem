import { request } from '../index'

import type { ValidationError } from '../../types/error'

import { mapValidationResponse } from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'
import { RegisterReponse } from 'src/dto/user.type'

export interface PostRegisterForm {
  email: string
  password: string
  username: string
}

export type PostRegisterErrors = Partial<Record<keyof PostRegisterForm, string[]>>

export async function postRegister(form: PostRegisterForm): Promise<Either<ValidationError<PostRegisterErrors>, User>> {

  const variables = {
    query: `mutation Register {
      registerUser(password: "${form.password}", email: "${form.email}", username: "${form.username}") {
        id
        email
        username
        profilePicUrl
      }
    }`
  }


  const result1 = await request.checkablePostGraphql<RegisterReponse>(variables)

  debugger;

  const result2 = mapValidationResponse<PostRegisterErrors, RegisterReponse>(result1)

  if (result2.isOk()) return success(result2.value.data.registerUser)
  else return fail(result2.value)
}
