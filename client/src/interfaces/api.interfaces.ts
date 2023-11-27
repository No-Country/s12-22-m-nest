export interface Response<T> {
  data: T | null
  error: {
    message: string
    code: number
  } | null
}

export type HttpMethod = 'post' | 'put' | 'delete'
