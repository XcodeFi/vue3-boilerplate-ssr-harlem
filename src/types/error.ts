class CustomNetworkError extends Error {
  response: Response

  constructor (name: string, response: Response) {
    super(name)
    this.response = response
  }
}

export class NetworkError extends CustomNetworkError {
  constructor (response: Response) {
    super('NETWORK_ERROR', response)
  }
}

export class AuthorizationError extends CustomNetworkError {
  constructor (response: Response) {
    super('AUTHORIZATION_ERROR', response)
  }
}

export class ValidationError<T extends Partial<Record<string, string[]>>> extends CustomNetworkError {
  constructor (response: Response) {
    super('VALIDATION_ERROR', response)
  }

  getErrors (): Promise<T> {
    return this.response.json().then(json => json.data as T)
  }
}

export class GraphqlError<T extends Error[]> extends CustomNetworkError {
  constructor (response: Response) {
    super('GRAPHQL_ERROR', response)
  }

  getErrors (): Promise<T> {
    return this.response.json().then(json => {
      // eslint-disable-next-line no-debugger
      debugger
      return json.errors as T
    })
  }
}
