import type { ChatMessage } from '../types'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

type MessageListProps = {
  messages: ChatMessage[]
  isTyping: boolean
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto bg-gradient-to-b from-zinc-950 via-zinc-900/95 to-black px-6 py-10 text-center"
        role="status"
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-teal-400 shadow-lg shadow-black/40 ring-1 ring-zinc-700/80"
          aria-hidden="true"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01M12 10h.01M16 10h.01" />
          </svg>
        </div>
        <div className="max-w-xs">
          <p className="text-base font-medium text-zinc-100">
            Zacznij rozmowę
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Tu pojawią się Twoje wiadomości i odpowiedzi. Napisz poniżej — bez
            pośpiechu, w swoim tempie nauki.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-zinc-950 via-zinc-900/90 to-black px-4 py-4 sm:px-5">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
    ))}
        {isTyping && <TypingIndicator />}
      
    </div>
  )
}
