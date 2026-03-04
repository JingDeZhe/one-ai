import { request } from './request'

export function getInfo() {
  return request.get('info').json<{ message: string }>()
}
