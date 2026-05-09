import { useState } from 'react'
import { apiURL } from '../../../api/apiURL'
import type { ChatSessionPrompt } from '../types/prompt'
import type { ChatMessage } from '../types'

type ChatResponse = {
  answer: string
}

function formatSessionPrompt(p: ChatSessionPrompt): string {
  const roleHint = p.isScammer
    ? 'W tej rozmowie wcielasz się w sprzedawcę-oszusta; rozmówca próbuje ocenić Twoją wiarygodność.'
    : 'W tej rozmowie jesteś uczciwym sprzedawcą; rozmówca próbuje ocenić Twoją wiarygodność.'

  return [
    `Jesteś ${p.sellerName} — sprzedawca na aplikacji aukcyjnej. ${roleHint}`,
    '',
    p.scenario,
  ].join('\n')
}

export function useChat() {
  const [isSending, setIsSending] = useState(false)

  async function sendMessage(
    messageHistory: ChatMessage[],
    sessionPrompt: ChatSessionPrompt,
  ) {
    setIsSending(true)

    try {
      const transcript = messageHistory
        .map((m) => `${m.body}: ${m.author}`)
        .join('\n')

      const promptBlock = formatSessionPrompt(sessionPrompt)
      const messageHistoryString = transcript
        ? `${promptBlock}\n\n${transcript}`
        : promptBlock

      const response = await fetch(apiURL.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Prompt: messageHistoryString }),
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
