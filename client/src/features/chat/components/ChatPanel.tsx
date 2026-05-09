import { useMemo, useState } from 'react'
import type { ChatMessage } from '../types'
import { MessageComposer } from './MessageComposer'
import { MessageList } from './MessageList'

export type ChatPanelProps = {
  className?: string
}

export function ChatPanel({ className = '' }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const sorted = useMemo(
    () => [...messages].sort((a, b) => a.sentAt.localeCompare(b.sentAt)),
    [messages],
  )

  function handleSend(body: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        body,
        sentAt: new Date().toISOString(),
        author: 'me',
      },
    ])
  }

  return (
    <section
      className={`flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 ring-1 ring-white/[0.06] ${className}`}
      aria-labelledby="chat-panel-title"
    >
      <header className="shrink-0 border-b border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-4 sm:px-5 sm:py-4">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-sm font-bold text-white shadow-lg shadow-teal-950/40"
            aria-hidden="true"
          >
            R
          </div>
          <div className="min-w-0">
            <h2
              id="chat-panel-title"
              className="text-base font-semibold tracking-tight text-zinc-50 sm:text-lg"
            >
              Chat with Robert
            </h2>
            <p className="mt-0.5 text-sm leading-snug text-zinc-400">
              Is this scammer or not?
            </p>
          </div>
        </div>
      </header>
      <MessageList messages={sorted} />
      <MessageComposer onSend={handleSend} />
    </section>
  )
}
