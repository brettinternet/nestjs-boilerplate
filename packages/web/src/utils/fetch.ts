type UnknownObject = {
  [key: string]: unknown
}

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export const fetch = (method: Method, url: string, body: UnknownObject) => {
  const withBody = body
    ? {
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    : {}

  return window.fetch(url, {
    method,
    ...withBody,
  })
}
