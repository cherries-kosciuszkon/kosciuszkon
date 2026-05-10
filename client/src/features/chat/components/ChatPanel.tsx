import { useEffect, useRef, useState } from 'react'
import { useChat } from '../hooks/useChat'
import type { ChatMessage } from '../types'
import type { ChatSessionPrompt } from '../types/prompt'
import { MessageComposer } from './MessageComposer'
import { MessageList } from './MessageList'

export type ChatPanelProps = {
  className?: string
  sessionPrompt: ChatSessionPrompt
  /** `true` gdy jest co najmniej jedna wiadomość użytkownika i jedna odpowiedź modelu — można oddać werdykt. */
  onVerdictReadyChange?: (ready: boolean) => void
}

const CHAT_IMAGES_BASE = '/chat/'

function offerImageSrc(imageName: string) {
  return `${CHAT_IMAGES_BASE}${imageName}.jpg`
}

export function ChatPanel({
  className = '',
  sessionPrompt,
  onVerdictReadyChange,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const { sendMessage, isSending } = useChat()

  const onVerdictReadyChangeRef = useRef(onVerdictReadyChange)
  onVerdictReadyChangeRef.current = onVerdictReadyChange

  useEffect(() => {
    setMessages([])
  }, [sessionPrompt.sessionId])

  useEffect(() => {
    onVerdictReadyChangeRef.current?.(messages.length > 1)
  }, [messages.length])

  async function handleSend(body: string) {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      body,
      author: 'me',
    }

    const nextHistory = [...messages, userMessage]
    setMessages(nextHistory)

    try {
      const reply = await sendMessage(nextHistory, sessionPrompt)

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          body: reply,
          author: 'ai',
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          body: 'Nie udało się wysłać wiadomości do sprzedawcy. Spróbuj jeszcze raz.',
          author: 'ai',
        },
      ])
    }
  }

  return (
    <section
      className={`flex flex-col overflow-hidden rounded-xl border border-zinc-700/90 bg-zinc-950 shadow-2xl shadow-black/40 ring-1 ring-white/[0.04] ${className}`}
      aria-labelledby="chat-panel-title"
    >
      <header className="shrink-0 border-b border-zinc-800 bg-zinc-900/90">
        <div className="flex items-start gap-3 px-3 py-3 sm:px-4 sm:py-3.5">
          <img
            src={offerImageSrc(sessionPrompt.imageName)}
            alt="Zdjęcie z ogłoszenia"
            className="mt-0.5 h-11 w-11 shrink-0 rounded-lg object-cover shadow-md ring-1 ring-zinc-700/80 ring-inset"
            width={44}
            height={44}
            decoding="async"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h2
                id="chat-panel-title"
                className="truncate text-sm font-semibold leading-snug text-zinc-50 sm:text-base"
              >
                {sessionPrompt.listedProduct.item}
              </h2>
              <span className="shrink-0 rounded-md bg-teal-500/15 px-2 py-0.5 text-xs font-semibold tabular-nums text-teal-300 ring-1 ring-teal-500/25">
                {sessionPrompt.listedProduct.price}
              </span>
            </div>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500">
              <span>
                Sprzedawca:{' '}
                <span className="font-medium text-zinc-300">
                  {sessionPrompt.sellerName}
                </span>
              </span>
              <span
                className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:inline"
                aria-hidden="true"
              />
              <span className="text-emerald-400/90">Ogłoszenie aktywne</span>
            </p>
          </div>
        </div>
      </header>
      <MessageList messages={messages} isTyping={isSending} />
      <MessageComposer onSend={handleSend} isSending={isSending} />
    </section>
  )
}
