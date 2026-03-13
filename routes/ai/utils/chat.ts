import type { ChatCompletionMessageParam } from 'openai/resources'
import { client } from './client'

export async function chat(message: string) {
  const completion = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: message },
    ],
  })

  return { content: completion.choices[0]?.message.content || '...' }
}

export interface ChatOptions {
  model?: 'deepseek-chat' | 'deepseek-reasoner'
  temperature?: number
  systemPrompt?: string
}

export async function chatStream(
  userMessage: string,
  onChunk: (chunk: string) => void,
  options: ChatOptions = {},
): Promise<void> {
  const {
    model = 'deepseek-chat',
    temperature = 0.7,
    systemPrompt = '你是一个有用的助手。',
  } = options

  try {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ]

    const stream = await client.chat.completions.create({
      model,
      messages,
      temperature,
      stream: true,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) {
        onChunk(content)
      }
    }
  } catch (error) {
    console.error('DeepSeek Stream Error:', error)
    throw new Error(`AI 流式请求失败: ${(error as Error).message}`)
  }
}
