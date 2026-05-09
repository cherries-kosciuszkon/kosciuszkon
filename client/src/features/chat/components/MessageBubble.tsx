import type { ChatMessage } from '../types'

type MessageBubbleProps = {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const mine = message.author === 'me'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[min(92%,22rem)] rounded-2xl px-3.5 py-2.5 text-[0.9375rem] leading-relaxed ${
          mine
            ? 'rounded-br-md bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-black/30'
            : 'rounded-bl-md border border-zinc-700 bg-zinc-800/90 text-zinc-100 shadow-md shadow-black/20'
        }`}
      >
        {message.body}
      </div>
    </div>
  )
}
