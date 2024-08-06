type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DLETE'

export default class HttpService {
  get<T>(url: string, headers?: Headers): Promise<T> {
    return this.send(url, 'GET', headers)
  }

  post<T, M extends object>(url: string, body: M, headers?: Headers): Promise<T> {
    return this.send(url, 'POST', headers, body)
  }

  private async send<T, M extends object>(
    url: string,
    method: HttpMethod,
    headersParams?: Headers,
    body?: M
  ): Promise<T> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headersParams?.forEach((value, key) => {
      headers.append(key, value)
    })

    try {
      const response = await fetch(url, {
        body: body && JSON.stringify(body),
        headers,
        method,
      })

      if (response.ok) {
        return response.json() as Promise<T>
      }

      throw Error('error')
    } catch (error) {
      console.error(error)
      throw Error(error)
    }
  }
}
