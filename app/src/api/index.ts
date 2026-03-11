import { request } from './request'

export function getInfo() {
  return request.get('info').json<{ message: string }>()
}

export function testAI() {
  return request.get('ai/test').json<{ content: string }>()
}

export function chatStream(content: string) {}
