import { useState } from 'react'
import type { ChatMessage } from '../types'
import { MessageComposer } from './MessageComposer'
import { MessageList } from './MessageList'

export type VerdictChoice = 'scammer' | 'not_scammer'

export type ChatPanelProps = {
  className?: string
  onVerdict?: (choice: VerdictChoice) => void
}

export function ChatPanel({ className = '', onVerdict }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])

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
              Oszust czy nie — Twoja decyzja.
            </p>
          </div>
        </div>
      </header>
      <MessageList messages={messages} />
      <MessageComposer onSend={handleSend} />
      {messages.length > 1 ? (
        <div
          className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 py-3 sm:px-5"
          role="group"
          aria-label="Oszust czy nie"
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onVerdict?.('scammer')}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-rose-500/80 hover:bg-rose-500/20 hover:text-rose-100 hover:ring-1 hover:ring-rose-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-rose-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900"
            >
              Oszust
            </button>
            <button
              type="button"
              onClick={() => onVerdict?.('not_scammer')}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-emerald-500/80 hover:bg-emerald-500/20 hover:text-emerald-100 hover:ring-1 hover:ring-emerald-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900"
            >
              Uczciwy
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
