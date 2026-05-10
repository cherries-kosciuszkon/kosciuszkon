import { useState } from 'react'
import { useChat } from '../hooks/useChat'
import { useRandomPrompt } from '../hooks/useRandomPrompt'
import type { ChatMessage } from '../types'
import { MessageComposer } from './MessageComposer'
import { MessageList } from './MessageList'

export type VerdictChoice = 'scammer' | 'not_scammer'

export type ChatPanelProps = {
  className?: string
  onVerdict?: (choice: VerdictChoice) => void
}

const OFFER_IMAGE_SRC = '/chat/offer_image.png'

export function ChatPanel({ className = '', onVerdict }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const sessionPrompt = useRandomPrompt()
  const { sendMessage, isSending } = useChat()

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
            src={OFFER_IMAGE_SRC}
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
                Używany rower miejski
              </h2>
              <span className="shrink-0 rounded-md bg-teal-500/15 px-2 py-0.5 text-xs font-semibold tabular-nums text-teal-300 ring-1 ring-teal-500/25">
                450 zł
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
      {messages.length > 1 ? (
        <div
          className="shrink-0 border-t border-zinc-800 bg-zinc-900/70 px-3 py-3 sm:px-4"
          role="group"
          aria-label="Twoja ocena tego ogłoszenia"
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onVerdict?.('scammer')}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-rose-500/80 hover:bg-rose-500/20 hover:text-rose-100 hover:ring-1 hover:ring-rose-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-rose-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900"
            >
              Podejrzana oferta
            </button>
            <button
              type="button"
              onClick={() => onVerdict?.('not_scammer')}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-emerald-500/80 hover:bg-emerald-500/20 hover:text-emerald-100 hover:ring-1 hover:ring-emerald-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900"
            >
              Wygląda wiarygodnie
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
