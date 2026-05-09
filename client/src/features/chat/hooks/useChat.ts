import { useState } from 'react'
import { apiURL } from '../../../api/apiURL'
import type { ChatMessage } from '../types'

type ChatResponse = {
  answer: string
}

type ChatPayloadMessage = Pick<ChatMessage, 'body' | 'author'>

export function useChat() {
  const [isSending, setIsSending] = useState(false)

  async function sendMessage(messageHistory: ChatMessage[]) {
    setIsSending(true)

    try {
      const payloadHistory: ChatPayloadMessage[] = messageHistory.map(
        ({ body, author }) => ({ body, author }),
      )

      const messageString = payloadHistory.map(m => `${m.body}: ${m.author}`).join('\n');

      const response = await fetch(apiURL.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body:  JSON.stringify({ prompt: messageString }),
      })

      if (!response.ok) {
        throw new Error('Chat request failed')
      }

      const data = (await response.json()) as ChatResponse
      return data.answer
    } finally {
      setIsSending(false)
    }
  }

  return {
    sendMessage,
    isSending,
  }
}
