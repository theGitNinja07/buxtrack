export type BaseResponse<T> = {
  status: 'OK' | 'NOT OK'
  message: string
  data: T
}
