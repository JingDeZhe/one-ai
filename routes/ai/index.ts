import { Hono } from 'hono'
import { chat, chatStream } from './utils/chat'
import { streamSSE } from 'hono/streaming'

const routes = new Hono()

type ChatRequest = {
  message: string
  model?: 'deepseek-chat' | 'deepseek-reasoner'
}

routes.get('/test', async (c) => {
  const res = await chat('你是谁？')
  return c.json({
    content: res,
  })
})

routes.post('/chat', async (c) => {
  const body = await c.req.json<ChatRequest>()
  const { message, model = 'deepseek-chat' } = body

  if (!message) {
    return c.json({ error: 'Message is required' }, 400)
  }

  const res = await chat(message)

  return c.json({
    content: res,
  })
})

routes.post('/chat-stream', async (c) => {
  const body = await c.req.json<ChatRequest>()
  const { message, model = 'deepseek-chat' } = body

  if (!message) {
    return c.json({ error: 'Message is required' }, 400)
  }

  return streamSSE(c, async (stream) => {
    try {
      await chatStream(message, (chunk) => {
        stream.writeSSE({
          data: JSON.stringify({ content: chunk }),
          event: 'message',
        })
      })

      await stream.writeSSE({
        data: JSON.stringify({ done: true }),
        event: 'end',
      })
    } catch (error) {
      await stream.writeSSE({
        data: JSON.stringify({ error: (error as Error).message }),
        event: 'error',
      })
    }
  })
})

routes.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default routes
