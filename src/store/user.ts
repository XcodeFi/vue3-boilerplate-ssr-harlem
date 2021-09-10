import type { ComputedRef } from 'vue'

import { createStore } from '@harlem/core'

import { request } from '../services'
import cookie from '../utils/cookie'

interface State {
  user: User | null
}

const STATE: State = {
  user: null,
}

const { getter, mutation } = createStore<State>('user', STATE, { allowOverwrite: true })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const user = getter('user', (state: any) => state.user)

export const isAuthorized = getter('isAuthorized', () => checkAuthorization(user))

export const checkAuthorization = (user: ComputedRef<User | null>): user is ComputedRef<User> => {
  return user.value !== null
}

export const updateUser = mutation<User | null>('updateUser', (state: any, userData: any) => {
  if (userData === undefined || userData === null) {
    cookie.remove('user')
    request.deleteAuthorizationHeader()
    state.user = null
  } else {
    cookie.set('user', userData)
    request.setAuthorizationHeader(userData.token)
    state.user = userData
  }
})
