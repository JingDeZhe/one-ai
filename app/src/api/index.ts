import { fetchEventSource } from '@microsoft/fetch-event-source'
import { request } from './request'

export function getInfo() {
  return request.get('info').json<{ message: string }>()
}

export function testAI() {
  return request.get('ai/test').json<{ content: string }>()
}

export function chat(content: string) {
  return request
    .post('ai/chat', { json: { message: content } })
    .json<{ content: string }>()
}

export function chatStream(content: string, cb: (chunk: string) => void) {
  const controller = new AbortController()

  fetchEventSource('/api/ai/chat-stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: content }),

    onopen: async (response) => {
      if (response.status === 401) {
        throw new Error('未授权，请重新登录')
      }
      if (response.status === 429) {
        throw new Error('请求太频繁，请稍后再试')
      }
      if (!response.ok) {
        throw new Error(`HTTP 错误: ${response.status}`)
      }
      console.log('SSE 连接已建立')
    },

    onmessage: (event) => {
      if (!event.data) return

      if (event.data === '[DONE]') {
        console.log('对话结束')
        return
      }

      try {
        const parsed = JSON.parse(event.data)
        if (parsed.content) {
          cb(parsed.content)
        } else if (parsed.message) {
          cb(parsed.message)
        } else {
          cb(event.data)
        }
      } catch {
        cb(event.data)
      }
    },

    onerror: (err) => {
      console.error('SSE 连接错误:', err)

      if (err instanceof Error) {
        if (err.message.includes('401')) {
          throw err
        }
        if (err.message.includes('429')) {
          setTimeout(() => {
            chatStream(content, cb)
          }, 5000)
          return
        }
      }

      controller.abort()
    },

    onclose: () => {
      console.log('SSE 连接已关闭')
    },

    signal: controller.signal,

    openWhenHidden: true,
  }).catch((err) => {
    console.error('无法建立 SSE 连接:', err)
  })

  return () => {
    controller.abort()
    console.log('SSE 连接已取消')
  }
}
