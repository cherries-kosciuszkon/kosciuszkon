import { apiURL } from './apiURL'

export type ChatAskResponse = {
  answer?: string
}

/**
 * Jedno żądanie do tego samego endpointu co czat (@see apiURL.chat).
 */
export async function postChatPrompt(prompt: string): Promise<string> {
  const response = await fetch(apiURL.chat, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Prompt: prompt }),
  })

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.status}`)
  }

  const data = (await response.json()) as ChatAskResponse
  const answer = data.answer?.trim()

  if (!answer) {
    throw new Error('Empty model reply')
  }

  return answer
}
